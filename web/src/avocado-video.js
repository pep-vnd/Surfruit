// A photographic sequence extracted from the supplied video. Scroll selects
// an exact frame in either direction; no playback clock or autoplay is used.
export async function createAvocado(container, onFailure) {
  const mobile = matchMedia('(max-width: 600px)').matches;
  const total = 96;
  const canvas = document.createElement('canvas');
  canvas.width = mobile ? 560 : 1024;
  canvas.height = mobile ? 394 : 720;
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) throw new Error('Canvas unavailable');
  const frames = new Map();
  const pending = new Set();
  const broken = new Set();
  const queue = [];
  let target = 0, displayed = -1, workers = 0, active = true, disposed = false;
  const url = index => new URL(`avocado-sequence/${mobile ? 'mobile' : 'desktop'}/frame-${String(index).padStart(3,'0')}.webp`, import.meta.url).href;

  function load(index) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.decoding = 'async';
      // Loading bytes is not enough: keep the HTML first frame visible until
      // its decoded replacement has actually been painted into the canvas.
      image.onload = async () => {
        try { await image.decode(); resolve(image); }
        catch (error) { reject(error); }
      };
      image.onerror = () => reject(new Error(`Frame unavailable: ${index}`));
      image.src = url(index);
    });
  }
  function draw() {
    if (!active || disposed || !frames.size) return;
    let index = target;
    if (!frames.has(index)) {
      // Retain the closest available frame while the exact target loads.
      index = [...frames.keys()].reduce((best, next) => Math.abs(next-target)<Math.abs(best-target)?next:best);
    }
    if (index === displayed) return;
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(frames.get(index),0,0,canvas.width,canvas.height);
    canvas.dataset.frame = String(index);
    container.dataset.frameReady = 'true';
    displayed = index;
  }
  function prioritize(index) {
    if (index < 0 || index >= total || frames.has(index) || pending.has(index) || broken.has(index)) return;
    const position = queue.indexOf(index);
    if (position !== -1) queue.splice(position,1);
    queue.unshift(index);
  }
  function pump() {
    while (active && !disposed && workers < 4 && queue.length) {
      const index = queue.shift();
      if (frames.has(index) || pending.has(index) || broken.has(index)) continue;
      workers++; pending.add(index);
      load(index).then(image => {
        if (disposed) return;
        frames.set(index,image);
        container.dataset.framesLoaded = String(frames.size);
        draw();
      }).catch(() => {
        broken.add(index);
        // A failed intermediate image is skipped; multiple failures fall back
        // to the static poster rather than leaving an unusable animation.
        if (broken.size >= 6 && !disposed) { disposed = true; onFailure(); }
      }).finally(() => { workers--;pending.delete(index);pump(); });
    }
  }

  frames.set(0, await load(0));
  container.append(canvas);
  draw();
  // Coarse coverage first, then fill in every intermediate frame.
  queue.push(95,12,24,36,48,60,72,84);
  for (let index=1;index<total;index++) if (!queue.includes(index)) queue.push(index);
  pump();
  return {
    render(progress=0) {
      const fraction = Math.max(0, Math.min(1, (progress-.025)/.88));
      target = Math.round(fraction*(total-1));
      canvas.dataset.targetFrame = String(target);
      for (const offset of [2,-2,1,-1,0]) prioritize(target+offset);
      draw();pump();
    },
    setActive(value) { active=value;if (active) { draw();pump(); } },
    dispose() { disposed=true;queue.length=0;frames.clear();canvas.remove(); }
  };
}
