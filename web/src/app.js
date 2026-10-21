const data = JSON.parse(document.querySelector('#page-data').textContent);
const t = data.copy;
const body = document.body;
body.classList.add('js');

const reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactMedia = window.matchMedia('(max-width: 540px)');
const story = document.querySelector('.product-story');
const scene = document.querySelector('.avocado-scene');
let reduced = reducedMedia.matches;
let frame = 0;
let ready = false;
let failed = false;
let avocadoRenderer = null;
let preparing = false;
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (start, end, p) => { const x = clamp((p - start) / (end - start)); return x * x * (3 - 2 * x); };

function applyMotionPreference() {
  body.classList.toggle('static-scene', reduced || failed);
  body.classList.toggle('motion-ready', !reduced && !failed);
  body.classList.toggle('reduced-motion', reduced);
  avocadoRenderer?.setActive?.(!reduced && !failed);
  document.documentElement.style.scrollBehavior = reduced ? 'auto' : '';
  if (!reduced && story && !avocadoRenderer && !preparing && !failed) prepareScene();
  scheduleFrame();
}
reducedMedia.addEventListener('change', event => { reduced = event.matches; applyMotionPreference(); });

function renderScene() {
  frame = 0;
  if (story && !ready && !reduced && !failed && story.getBoundingClientRect().top < innerHeight + 200) prepareScene();
  if (!story || !ready || reduced) return;
  const rect = story.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > innerHeight) return;
  const stage = story.querySelector('.product-stage');
  const travel = Math.max(1, story.offsetHeight - stage.offsetHeight);
  const p = clamp(-rect.top / travel);
  const intro = 1 - smooth(.025, .22, p);
  const labels = smooth(.64, .82, p);
  const small = compactMedia.matches;
  scene.style.left = small ? `50%` : `${70 - 5 * smooth(.04,.4,p)}%`;
  avocadoRenderer?.render(p, small);
  const introEl = story.querySelector('.hero-intro');
  introEl.style.opacity = String(intro);
  introEl.style.transform = `translateY(${-30 * (1 - intro)}px)`;
  introEl.style.visibility = intro === 0 ? 'hidden' : 'visible';
  introEl.style.pointerEvents = intro > .3 ? '' : 'none';
  const anatomy = story.querySelector('.anatomy-copy');
  anatomy.style.opacity = String(smooth(.2,.4,p));
  anatomy.style.transform = `translateY(${20 * (1 - smooth(.2,.4,p))}px)`;
  story.querySelector('.fruit-label').style.opacity = String(1 - smooth(.04,.2,p));
  story.querySelectorAll('.annotation').forEach(el => { el.style.opacity = String(labels); });
  story.querySelector('.scene-progress span').style.width = `${p * 100}%`;
  const cue = story.querySelector('.scroll-cue');
  const nextSection = p > .55;
  cue.firstChild.textContent = nextSection ? t.sceneSkip.toUpperCase() : t.scroll;
  cue.setAttribute('href', nextSection ? '#origin' : '#inside');
}
function scheduleFrame() { if (!frame) frame = requestAnimationFrame(renderScene); }
window.addEventListener('scroll', scheduleFrame, { passive: true });
window.addEventListener('resize', scheduleFrame, { passive: true });
applyMotionPreference();
if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' }));

async function prepareScene() {
  if (!scene || preparing || failed || reduced) return;
  preparing = true;
  try {
    const { createAvocado } = await import('./avocado-video.js');
    avocadoRenderer = await createAvocado(scene, () => {
      failed = true; ready = false; body.dataset.scene = 'failed';
      applyMotionPreference();
    });
    ready = true;
    body.dataset.scene = 'ready';
    applyMotionPreference();
  } catch (error) {
    ready = false; failed = true;
    body.dataset.scene = 'failed';
    applyMotionPreference();
  }
}

const menu = document.querySelector('#mobile-nav');
const menuToggle = document.querySelector('.menu-toggle');
function closeMenu() { menu.hidden = true; body.classList.remove('menu-open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label', t.menu); }
menuToggle.addEventListener('click', () => {
  const opening = menu.hidden;
  menu.hidden = !opening;
  body.classList.toggle('menu-open', opening);
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? t.closeMenu : t.menu);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuToggle.focus(); }
});
document.addEventListener('click', event => {
  if (!menu.hidden && !menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// Section shortcuts move immediately; the commercial presentation never has
// to replay the opening. The exploratory scroll itself stays entirely native.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const hash = link.getAttribute('href');
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', hash);
    target.scrollIntoView({ behavior: hash === '#inside' && !reduced ? 'smooth' : 'instant' });
    if (hash !== '#inside') {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});
document.querySelectorAll('.language-link').forEach(link => {
  link.addEventListener('click', event => {
    if (link.lang === data.lang) { event.preventDefault(); return; }
    let section = '';
    if (data.page === 'product' || data.page === 'warm') {
      for (const node of document.querySelectorAll('main>section[id]')) {
        if (node.getBoundingClientRect().top <= innerHeight * .45) section = node.id;
      }
      if (section === 'product') section = ready && !reduced && story.getBoundingClientRect().top < -200 ? 'inside' : '';
    } else if (document.querySelector('#contact')?.getBoundingClientRect().top < innerHeight * .5) section = 'contact';
    const destination = new URL(link.href);
    if (data.page === 'contact') destination.search = location.search;
    destination.hash = section;
    link.href = destination.href;
  });
});

const tabs = [...document.querySelectorAll('[data-tab]')];
if (tabs.length) {
  document.querySelector('.pack-tabs').setAttribute('role','tablist');
  tabs.forEach(tab => tab.setAttribute('role','tab'));
  function selectTab(next, focus = false) {
    tabs.forEach(tab => {
      const selected = tab === next;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      panel.hidden = !selected;
      panel.setAttribute('role','tabpanel');
      panel.tabIndex = 0;
    });
    if (focus) next.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = tabs[(i+1)%tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(i+tabs.length-1)%tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs.at(-1);
      if (next) { event.preventDefault(); selectTab(next,true); }
    });
  });
  selectTab(tabs[0]);
}

const dialog = document.querySelector('#inquiry-dialog');
const form = document.querySelector('#inquiry-form');
const summaryStatus = document.querySelector('.summary-status');
document.querySelectorAll('[data-inquiry]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.format) form.elements.format.value = button.dataset.format;
  summaryStatus.textContent = '';
  closeMenu();
  dialog.showModal();
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
form.addEventListener('submit', event => event.preventDefault());
function summary() {
  const fields = new FormData(form);
  const rows = [t.inquiry, '', `${t.destination}: ${fields.get('destination').trim() || t.unknown}`, `${t.format}: ${t[fields.get('format')] || t.unknown}`, `${t.volume}: ${fields.get('volume').trim() || t.unknown}`];
  if (fields.get('notes').trim()) rows.push('', `${t.notes}\n${fields.get('notes').trim()}`);
  rows.push('', new URL(data.productUrl, location.origin).href);
  return rows.join('\n');
}
document.querySelector('[data-copy-summary]').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(summary()); summaryStatus.textContent = t.summaryCopied; }
  catch { summaryStatus.textContent = t.summaryError; }
});
document.querySelector('[data-download-summary]').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([summary()], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url; link.download = `SURFRUIT-${data.lang}-enquiry.txt`; link.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
});
document.querySelector('[data-copy-link]')?.addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try { await navigator.clipboard.writeText(new URL(data.productUrl, location.origin).href); status.textContent = t.copied; }
  catch { status.textContent = t.copyFallback; }
});

// One-shot entrance motion extends the approved scroll story to editorial pages.
// Content is visible by default and remains visible with reduced motion or no JS.
const reveals = [...document.querySelectorAll('[data-reveal], .section-heading, .selection-heading, .recipe-heading')];
reveals.forEach(el => el.setAttribute('data-reveal',''));
if ('IntersectionObserver' in window && !reducedMedia.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold:0.08, rootMargin:'0px 0px -24px 0px' });
  body.classList.add('reveal-enabled');
  reveals.forEach(el => observer.observe(el));
  reducedMedia.addEventListener('change', event => {
    if (event.matches) { body.classList.remove('reveal-enabled'); observer.disconnect(); }
  });
}

const commercialForm = document.querySelector('#commercial-form');
if (commercialForm) {
  const labels = data.contactCopy;
  const status = document.querySelector('#contact-status');
  const requested = new URLSearchParams(location.search).get('product');
  if ([...commercialForm.elements.product.options].some(option => option.value === requested)) commercialForm.elements.product.value = requested;
  function commercialSummary() {
    const values = new FormData(commercialForm);
    const selected = commercialForm.elements.product.selectedOptions[0].textContent;
    return `${labels.name}: ${values.get('name').trim()}\n${labels.company}: ${values.get('company').trim()}\nEmail: ${values.get('email').trim()}\n${labels.interest}: ${selected}\n\n${labels.message}:\n${values.get('message').trim()}`;
  }
  commercialForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!commercialForm.reportValidity()) return;
    const product = commercialForm.elements.product.selectedOptions[0].textContent;
    const subject = `${data.lang==='es'?'Consulta comercial':'Commercial enquiry'} · ${product} · SURFRUIT`;
    location.href = `mailto:${commercialForm.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(commercialSummary())}`;
    status.textContent = labels.status;
  });
  document.querySelector('[data-copy-contact]').addEventListener('click', async () => {
    if (!commercialForm.reportValidity()) return;
    try { await navigator.clipboard.writeText(commercialSummary());status.textContent=labels.copied; }
    catch { status.textContent=labels.copyError; }
  });
}
