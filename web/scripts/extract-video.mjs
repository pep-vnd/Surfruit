import { mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Requires ffmpeg with libwebp. The supplied source is kept outside assets so
// the web build only ships the selected, silent photographic sequence.
const root = fileURLToPath(new URL('..', import.meta.url));
for (const [variant, scale, quality] of [['desktop','',83],['mobile',',scale=560:394:flags=lanczos',80]]) {
  const dir = path.join(root,'assets/avocado-sequence',variant);
  await mkdir(dir,{recursive:true});
  const args = ['-hide_banner','-loglevel','error','-ss','0.5','-i',path.join(root,'media/avocado-opening.mp4'),'-an',
    '-vf',`crop=1024:720:128:0,fps=24${scale}`,'-frames:v','96','-c:v','libwebp','-quality',String(quality),
    '-compression_level','6','-start_number','0','-y',path.join(dir,'frame-%03d.webp')];
  const result = spawnSync('ffmpeg',args,{stdio:'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${variant}`);
}
console.log('96 frames extracted for desktop and mobile. Run npm run build to update the preview.');
