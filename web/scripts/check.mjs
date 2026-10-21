import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { catalog, navPages } from '../src/catalog.mjs';
import { legacyRoutes } from '../src/config.mjs';
import { root } from './build.mjs';
const dist = path.join(root,'dist');
const { base, routes } = JSON.parse(await readFile(path.join(dist,'build.json'),'utf8'));
let checkedLinks = 0;
const app = await readFile(path.join(dist,'assets/app.js'),'utf8');
assert(app.includes("import('./avocado-video.js')"), 'Shared video renderer');
assert(!app.includes('avocado-3d'), 'No 3D renderer import');
assert.equal(await stat(path.join(dist,'assets/avocado-3d.js')).catch(() => null), null, 'No 3D renderer in build');
for (const name of ['app.js','avocado-video.js','video.css','warm.css','catalogue.css']) {
  assert((await stat(path.join(dist,'assets',name))).isFile(), `Missing scene dependency: ${name}`);
}
for (const variant of ['desktop','mobile']) {
  for (let index=0;index<96;index++) {
    const frame=`assets/avocado-sequence/${variant}/frame-${String(index).padStart(3,'0')}.webp`;
    assert((await stat(path.join(dist,frame))).size>0,`Missing video frame: ${frame}`);
  }
}
for (const [lang, pages] of Object.entries(routes)) {
  for (const [page, route] of Object.entries(pages)) {
    const file = path.join(dist,route,'index.html');
    const html = await readFile(file,'utf8');
    assert(html.includes(`<html lang="${lang}">`), `${route}: language`);
    if (page === 'product') {
      assert(html.includes(' uses-video'), `${route}: shared video scene`);
      assert(html.includes('assets/video.css'), `${route}: video styles`);
      assert(/class="scene-poster"[^>]*src="[^"]+desktop\/frame-000.webp"/.test(html), `${route}: initial frame in HTML`);
      assert(html.includes('mobile/frame-000.webp'), `${route}: mobile initial frame`);
      assert(html.includes('fetchpriority="high"'), `${route}: eager initial image`);
    }
    assert(!/class="(?:demo-switch|motion-toggle)/.test(html), `${route}: retired demo controls`);
    const navigation = html.match(/<nav class="main-nav"[^>]*>(.*?)<\/nav>/s)[1];
    for (const key of navPages) assert(navigation.includes(`href="${base}${pages[key]}"`), `${route}: navigation ${key}`);
    if (page !== 'product') assert(!html.includes('class="avocado-scene"'), `${route}: video only on avocado`);
    if (catalog[page]) {
      assert(html.includes(`?product=${page}#contact-form`), `${route}: enquiry product`);
      const monthCount = (html.match(/<ol class="season-calendar"[^>]*>(.*?)<\/ol>/s)?.[1].match(/<li /g)||[]).length;
      assert.equal(monthCount, catalog[page].months ? 12 : 0, `${route}: honest seasonal calendar`);
    }
    assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${route}: one h1`);
    if (page === 'vegetables' || page === 'contact') {
      assert(!/coliflor|brócoli|cauliflower|broccoli/i.test(html), `${route}: retired vegetables absent from catalogue and enquiries`);
      assert(html.includes(lang==='es'?'Chirivía':'Parsnip') && html.includes(lang==='es'?'Coles':'Cabbage'), `${route}: replacement vegetables available`);
    }
    if (page === 'home') {
      assert(!html.includes('class="home-product"'), `${route}: no duplicate avocado introduction`);
      assert.equal((html.match(/class="category-card"/g)||[]).length,4,`${route}: four category photos preserved`);
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
    assert.equal(new Set(ids).size,ids.length,`${route}: unique IDs`);
    for (const match of html.matchAll(/(?:href|src|data-src)="([^"]+)"/g)) {
      const url=match[1];
      if (/^(mailto:|tel:|https?:)/.test(url)) continue;
      if (url.startsWith('#')) { assert(ids.includes(url.slice(1)),`${route}: anchor ${url}`); continue; }
      assert(url.startsWith(base),`${route}: wrong base ${url}`);
      const [pathQuery, hash]=url.slice(base.length).split('#');
      const pathname=pathQuery.split('?')[0];
      const target=path.join(dist,pathname,pathname.endsWith('/')?'index.html':'');
      assert((await stat(target)).isFile(),`${route}: missing ${url}`);
      if (hash) assert((await readFile(target,'utf8')).includes(`id="${hash}"`),`${route}: missing target anchor ${url}`);
      checkedLinks++;
    }
    for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
      for (const candidate of match[1].split(',')) {
        const source = candidate.trim().split(/\s+/)[0];
        assert(source.startsWith(base), `${route}: srcset base`);
        assert((await stat(path.join(dist,source.slice(base.length)))).isFile(), `${route}: responsive image ${source}`);
      }
    }
    for (const match of html.matchAll(/<img\b[^>]*>/g)) assert(/\balt="/.test(match[0]),`${route}: image alt`);
    assert(!/lorem ipsum|mercadona|GLOBALG.A.P/i.test(html),`${route}: unsupported copy`);
  }
}
console.log(`OK · ${Object.values(routes).reduce((sum, pages) => sum + Object.keys(pages).length, 0)} rutas, idiomas, IDs, anclas, imágenes y ${checkedLinks} recursos/enlaces · BASE=${base}`);

for (const [lang,old,target] of legacyRoutes) {
  const redirect = await readFile(path.join(dist,old,'index.html'),'utf8');
  assert(redirect.includes(`url=${base}${routes[lang][target]}`),`${old}: redirects to current category`);
}
