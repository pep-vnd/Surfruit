import { copy } from './copy.mjs';
import { renderRecipes } from './recipes.mjs';
import { catalog, siteCopy } from './catalog.mjs';
import { navigation, footer as siteFooter, contactBand, categoryLinks, renderSection, avocadoFacts } from './sections.mjs';
import { routes, business } from './config.mjs';

const escape = value => String(value).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]));
const lines = value => escape(value).replaceAll('\n', '<br>');
const arrow = '<span aria-hidden="true">↗</span>';

export function render(lang, page, base) {
  const t = { ...copy[lang] };
  const ui = siteCopy[lang];
  const isWarm = page === 'citrus' || page === 'grapefruit';
  const hasScene = page === 'product';
  const productPage = 'product';
  const title = page === 'home' ? t.homeTitle : `${catalog[page]?.[lang].name || ui.nav[page] || 'SURFRUIT'} · SURFRUIT`;
  const a = file => `${base}assets/${file}`;
  const href = (type, section = '') => `${base}${routes[lang][type]}${section ? `#${section}` : ''}`;
  const photo = (name, widths, alt, cls = '', eager = false, sizes = '(max-width: 700px) 100vw, 70vw') => `<img class="${cls}" src="${a(`${name}-${widths[0]}.webp`)}" srcset="${widths.map(w => `${a(`${name}-${w}.webp`)} ${w}w`).join(', ')}" sizes="${sizes}" alt="${escape(alt)}" width="${widths.at(-1)}" height="${Math.round(widths.at(-1) * 2 / 3)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const logo = `<img src="${a('surfruit-logo.png')}" alt="SURFRUIT" width="170" height="88">`;
  const chapter = (n, text) => `<p class="eyebrow chapter"><span>${n}</span><span>${text}</span></p>`;
  const langLink = other => `<a href="${base}${routes[other][page === '404' ? 'home' : page]}" lang="${other}" hreflang="${other}" class="language-link ${other === lang ? 'is-current' : ''}" ${other === lang ? 'aria-current="true"' : ''}>${other.toUpperCase()}</a>`;
  const contact = contactBand(lang,href,page === 'product' ? 'product' : '');
  const footer = siteFooter(lang,href,logo);
  const inquiry = `<dialog id="inquiry-dialog" aria-labelledby="inquiry-title" aria-describedby="inquiry-intro"><button class="dialog-close" aria-label="${t.dialogClose}">×</button><p class="eyebrow">SURFRUIT / ${t.product.toUpperCase()}</p><h2 id="inquiry-title">${t.dialogTitle}</h2><p id="inquiry-intro">${t.dialogIntro}</p>
    <form id="inquiry-form"><div class="form-grid"><label>${t.destination}<input name="destination" placeholder="${t.destinationPlaceholder}" maxlength="160" autocomplete="off"></label><label>${t.format}<select name="format"><option value="">${t.choose}</option>${['box','tray','bag'].map(k=>`<option value="${k}">${t[k]}</option>`).join('')}</select></label><label class="form-full">${t.volume}<input name="volume" placeholder="${t.volumePlaceholder}" maxlength="160" autocomplete="off"></label><label class="form-full">${t.notes}<textarea name="notes" placeholder="${t.notesPlaceholder}" maxlength="1200" rows="3"></textarea></label></div><div class="form-actions"><button class="button button-dark" type="button" data-copy-summary>${t.copySummary}${arrow}</button><button class="text-link" type="button" data-download-summary>${t.downloadSummary} ↓</button></div><p class="summary-status" role="status" aria-live="polite"></p></form></dialog>`;
  let content;
  if (page === 'product') content = `<main id="main">
    <section id="product" class="product-story section-anchor" aria-label="${t.product}">
      <div class="product-stage">
        <div class="stage-grid" aria-hidden="true"></div><div class="orbit orbit-one" aria-hidden="true"></div><div class="orbit orbit-two" aria-hidden="true"></div>
        <div class="hero-intro"><p class="eyebrow"><span class="small-dot"></span>${t.eyebrow}</p><h1 aria-label="${t.product}"><span>${t.heroTitle[0]}</span><span>${t.heroTitle[1]}<i>.</i></span></h1><p class="hero-line">${t.heroLine}</p><a href="#presentation" class="text-link hero-trade">${t.commercial}${arrow}</a></div>
        <div class="anatomy-copy"><p class="eyebrow">${t.sceneCaption}</p><h2>${lines(t.anatomyTitle)}</h2><p>${lines(t.anatomyCopy)}</p></div>
        <div class="avocado-scene" role="img" aria-label="${t.cutAlt}"><picture><source media="(max-width: 600px)" srcset="${a('avocado-sequence/mobile/frame-000.webp')}"><img class="scene-poster" src="${a('avocado-sequence/desktop/frame-000.webp')}" alt="" width="1024" height="720" loading="eager" fetchpriority="high"></picture></div>
        <div class="fruit-label"><span class="label-line"></span><p>01 / ${t.product.toUpperCase()}<small>SURFRUIT</small></p></div>
        <p class="annotation annotation-flesh"><span>01</span>${t.flesh}<i></i></p><p class="annotation annotation-seed"><span>02</span>${t.seed}<i></i></p>
        <div class="hero-bottom"><span class="eyebrow">01 — ${t.chapterProduct}</span><a class="scroll-cue" href="#inside">${t.scroll}<span aria-hidden="true">↓</span></a><a class="skip-scene" href="#origin">${t.sceneSkip} ↘</a></div>
        <div class="scene-progress" aria-hidden="true"><span></span></div>
      </div><span id="inside" class="inside-anchor" aria-hidden="true"></span>
    </section>
    <section id="origin" class="origin section-anchor" aria-labelledby="origin-title"><div class="section-heading">${chapter('02',t.chapterOrigin)}<div><h2 id="origin-title">${lines(t.originTitle)}</h2><p>${t.originCopy}</p></div></div>
      <figure class="landscape">${photo('orchard',[900,1800],t.orchardAlt,'',false,'100vw')}<figcaption><span>${t.originCaption}</span><span aria-hidden="true">↗</span></figcaption></figure>
      <div class="origin-detail"><p class="origin-quote">${t.originDetail}</p><div class="origin-inset">${photo('on-tree',[600,1000],t.treeAlt,'',false,'(max-width: 700px) 55vw, 24vw')}<p>${t.originSub}</p></div><span class="origin-word" aria-hidden="true">SUR</span></div>
    </section>
    <section id="selection" class="selection section-anchor" aria-labelledby="selection-title"><div class="selection-heading">${chapter('03',t.chapterSelection)}<h2 id="selection-title">${lines(t.selectionTitle)}</h2><p>${t.selectionCopy}</p></div><figure class="selection-photo">${photo('selection',[800,1400],t.selectionAlt)}<figcaption>${t.selectionCaption}</figcaption></figure><figure class="facility-photo">${photo('facilities',[800,1400],t.facilityAlt,'',false,'(max-width: 700px) 78vw, 30vw')}<figcaption>${t.facilityCaption}</figcaption></figure></section>
    <section id="presentation" class="presentation section-anchor" aria-labelledby="pack-title"><div class="section-heading">${chapter('04',t.chapterPack)}<div><h2 id="pack-title">${lines(t.packTitle)}</h2><p>${t.packCopy}</p></div></div>
      <div class="pack-tabs" aria-label="${t.formats}">${['box','tray','bag'].map((k,i)=>`<button id="tab-${k}" data-tab="${k}" aria-controls="panel-${k}"><span>0${i+1}</span>${t[k]}<span class="tab-arrow" aria-hidden="true">↗</span></button>`).join('')}</div>
      <div class="pack-panels">${['box','tray','bag'].map((k,i)=>`<div id="panel-${k}" class="pack-panel" aria-labelledby="tab-${k}"><figure>${photo(k==='bag'?'avocado-bag':k,[700,1200],t[`${k}Alt`],'',false,'(max-width: 700px) 100vw, 60vw')}</figure><div class="pack-description"><span class="pack-index">0${i+1} / 03</span><h3>${t[`${k}Title`]}</h3><p>${t[`${k}Copy`]}</p><button class="text-link" data-inquiry data-format="${k}">${t.askFormat}${arrow}</button></div></div>`).join('')}</div><p class="pack-note">${t.packNote}</p>
    </section>${avocadoFacts(lang,href)}${renderRecipes(lang,photo)}${contact}</main>`;
  else if (page === 'home') content = `<main id="main"><section class="home-hero"><div class="home-hero-image">${photo('orchard',[900,1800],t.orchardAlt,'',true,'100vw')}</div><div class="home-hero-copy"><p class="eyebrow"><span class="small-dot"></span>${t.homeEyebrow}</p><h1>${lines(t.homeHeading)}</h1><p>${t.homeCopy}</p><a class="button button-lime" href="${href('product')}">${t.viewProduct}${arrow}</a></div><div class="home-hero-bottom"><span>SURFRUIT</span><span>${t.originCaption}</span></div></section>
    <section class="home-product"><div><p class="eyebrow">01 / ${t.product.toUpperCase()}</p><h2>${lines(t.homeProductTitle)}</h2><p>${t.homeProductCopy}</p><a class="button button-dark" href="${href('product')}">${t.viewProduct}${arrow}</a></div><a class="home-product-visual" href="${href('product')}" aria-label="${t.viewProduct}"><span aria-hidden="true">01</span><img src="${a('avocado-pit.webp')}" width="512" height="765" alt="${t.cutAlt}" loading="lazy"><span class="round-link" aria-hidden="true">↗</span></a></section>
    ${categoryLinks(lang,photo,href)}<section class="home-origin">${photo('on-tree',[600,1000],t.treeAlt)}<div><p class="eyebrow">LAS LOMAS</p><h2>${lines(t.homeOriginTitle)}</h2><p>${t.homeOriginCopy}</p><a class="text-link" href="${href('company')}">${t.seeOrigin}${arrow}</a></div></section>${contact}</main>`;
  else if (page !== '404') content = renderSection(lang,page,photo,href);
  else content = `<main id="main" class="not-found"><p class="eyebrow">SURFRUIT / 404</p><h1>${lines(t.notFound)}</h1><p>${t.notFoundCopy}</p><a href="${href('home')}" class="button button-lime">${t.home}${arrow}</a><a href="${base}${routes.en.home}" class="text-link">English →</a></main>`;
  const data = JSON.stringify({ lang, page, productUrl: href(productPage), contactCopy: {name:ui.name,company:ui.company,interest:ui.interest,message:ui.message,status:ui.formStatus,copied:ui.copied,copyError:ui.copyError}, copy: { ...Object.fromEntries(['scroll','sceneSkip','menu','closeMenu','copied','copyFallback','inquiry','destination','format','volume','notes','unknown','box','tray','bag','summaryCopied','summaryError'].map(k=>[k,t[k]])) } }).replaceAll('<','\\u003c');
  return `<!doctype html><html lang="${lang}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${t.description}"><meta name="theme-color" content="#122b20"><meta name="robots" content="noindex,nofollow"><link rel="icon" href="${a('surfruit-logo.png')}" type="image/png"><link rel="preload" href="${a('display.woff2')}" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="${a('style.css')}">${isWarm?`<link rel="stylesheet" href="${a('warm.css')}">`: ''}<link rel="stylesheet" href="${a('catalogue.css')}">${hasScene?`<link rel="stylesheet" href="${a('video.css')}"><link rel="preload" as="image" href="${a('avocado-sequence/desktop/frame-000.webp')}" media="(min-width: 601px)"><link rel="preload" as="image" href="${a('avocado-sequence/mobile/frame-000.webp')}" media="(max-width: 600px)">`: ''}<link rel="alternate" hreflang="es" href="${base}${routes.es[page==='404'?'home':page]}"><link rel="alternate" hreflang="en" href="${base}${routes.en[page==='404'?'home':page]}"><script type="module" src="${a('app.js')}"></script></head><body class="page-${page}${isWarm?' page-warm':''}${!hasScene&&page!=='home'?' page-catalogue':''}${hasScene?' uses-video':''}" id="top"><a href="#main" class="skip-link">${t.skip}</a>
    <header class="site-header"><a class="brand" href="${href('home')}" aria-label="SURFRUIT · ${t.home}">${logo}</a><nav class="main-nav" aria-label="${t.navLabel}">${navigation(lang,page,href)}</nav><div class="header-controls"><div class="languages" aria-label="${t.langLabel}">${langLink('es')}<span aria-hidden="true">/</span>${langLink('en')}</div><button class="menu-toggle" aria-label="${t.menu}" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button></div></header>
    <nav id="mobile-nav" class="mobile-nav" aria-label="${t.navLabel}" hidden>${navigation(lang,page,href,true)}</nav>
    ${!hasScene&&page!=='home'?'<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs><filter id="logo-alpha" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 4 4 4 0 -0.05"/></filter></defs></svg>':''}${content}${footer}${inquiry}<script type="application/json" id="page-data">${data}</script></body></html>`;
}
