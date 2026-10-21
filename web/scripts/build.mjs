import { mkdir, cp, writeFile, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { render } from '../src/render.mjs';
import { routes, legacyRoutes } from '../src/config.mjs';

export const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
export function normalizeBase(value = '/') {
  if (!/^\/[a-zA-Z0-9/_-]*\/?$/.test(value) || value.includes('//')) throw new Error('BASE debe ser una ruta absoluta, por ejemplo /Surfruit/');
  return value === '/' ? '/' : `${value.replace(/\/$/, '')}/`;
}
export async function build(base = normalizeBase(process.env.BASE || '/')) {
  const dist = path.join(root, 'dist');
  // Only disposable build output is removed. Originals are never traversed.
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  await cp(path.join(root, 'assets'), path.join(dist, 'assets'), { recursive: true, filter: source => !/\.(ttf|otf)$|avocado-(skin|stone|pulp)-(texture|natural)\.webp$/.test(source) });
  await cp(path.join(root, 'src/style.css'), path.join(dist, 'assets/style.css'));
  await cp(path.join(root, 'src/app.js'), path.join(dist, 'assets/app.js'));
  for (const name of ['avocado-video.js', 'warm.css', 'video.css', 'catalogue.css']) await cp(path.join(root, 'src', name), path.join(dist, 'assets', name));
  await mkdir(path.join(dist, 'licenses'), { recursive: true });
  for (const name of ['font-adwaita-LICENSE.txt','font-nimbus-LICENSE.txt','font-nimbus-COPYING.txt']) {
    await cp(path.join(root, 'docs', name), path.join(dist, 'licenses', name));
  }
  for (const lang of ['es', 'en']) {
    for (const page of Object.keys(routes[lang])) {
      const dir = path.join(dist, routes[lang][page]);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'index.html'), render(lang, page, base));
    }
  }
  // Keep bookmarks working when categories or catalogue products change.
  for (const [lang, oldRoute, targetPage] of legacyRoutes) {
    const target = `${base}${routes[lang][targetPage]}`;
    const dir = path.join(dist,oldRoute);
    await mkdir(dir,{recursive:true});
    await writeFile(path.join(dir,'index.html'), `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta http-equiv="refresh" content="0;url=${target}"><title>SURFRUIT</title></head><body><a href="${target}">${lang==='es'?'Ver catálogo':'View catalogue'}</a></body></html>`);
  }
  await writeFile(path.join(dist, 'index.html'), render('es', 'home', base));
  await writeFile(path.join(dist, '404.html'), render('es', '404', base));
  await writeFile(path.join(dist, '.nojekyll'), '');
  await writeFile(path.join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  await writeFile(path.join(dist, 'build.json'), JSON.stringify({ base, routes, generated: new Date().toISOString() }, null, 2));
  console.log(`SURFRUIT construido en web/dist · BASE=${base}`);
  return { dist, base };
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
