import { catalog } from './catalog.mjs';

// Only include presentations actually visible in the supplied photo archive.
export const packaging = [
  { product:'grapefruit', image:'grapefruit-box', widths:[600,1200],
    es:{ title:'Pomelo en caja', description:'Fruta presentada por piezas, con el producto a la vista. Concreta con nosotros el calibre, la disposición y el tipo de caja.', alt:'Pomelos enteros y etiquetados, colocados en una caja de cartón negra' },
    en:{ title:'Grapefruit in boxes', description:'Fruit presented by piece, with the produce on show. Discuss sizes, arrangement and box type with our team.', alt:'Whole labelled grapefruit arranged in a black cardboard box' } },
  { product:'grapefruit', image:'grapefruit-net', widths:[700,1400],
    es:{ title:'Pomelo en malla', description:'Una presentación agrupada que deja ver el color de la fruta. Consulta las opciones de peso y etiquetado para tu punto de venta.', alt:'Pomelos en una malla roja con etiqueta, sobre una mesa de madera' },
    en:{ title:'Grapefruit in net bags', description:'A grouped presentation that shows the colour of the fruit. Ask about weight and labelling options for your point of sale.', alt:'Grapefruit in a red labelled net bag on a wooden table' } },
  { product:'leek', image:'leek-box', widths:[700,1400],
    es:{ title:'Puerros en manojos', description:'Tallos agrupados y colocados en caja. Una presentación ordenada para facilitar la preparación y la exposición del producto.', alt:'Manojos de puerros sujetos con bandas rosas y colocados en una caja verde' },
    en:{ title:'Bunched leeks', description:'Stems grouped and arranged in a crate. A tidy presentation for preparing and displaying the produce.', alt:'Leek bunches tied with pink bands and arranged in a green crate' } },
  { product:'carrot', image:'carrot-box', widths:[700,1400],
    es:{ title:'Zanahorias con hoja', description:'Manojos con sus hojas verdes, presentados en caja. Una forma de mostrar la frescura y el color desde el primer vistazo.', alt:'Zanahorias con hojas verdes presentadas en una caja verde' },
    en:{ title:'Carrots with leafy tops', description:'Bunches with their green tops, presented in a crate. A way to show freshness and colour at first glance.', alt:'Carrots with leafy green tops presented in a green crate' } }
];

export function renderPackaging(lang,scope,photo,href) {
  const items = packaging.filter(p => p.product===scope || catalog[p.product].category===scope);
  if (!items.length) return '';
  const es=lang==='es';
  return `<section id="packing-gallery" class="packing-gallery section-anchor" aria-labelledby="packing-gallery-title">
    <div class="packing-heading" data-reveal><p class="eyebrow">SURFRUIT / ${es?'PRESENTACIONES':'PACKING OPTIONS'}</p><h2 id="packing-gallery-title">${es?'La presentación<br>también cuenta.':'Presentation<br>matters too.'}</h2><p>${es?'Cada mercado tiene su forma de elegir. Descubre algunas de nuestras presentaciones y cuéntanos cómo necesitas recibir tu producto.':'Every market has its way of choosing. Explore some of our presentations and tell us how you need to receive your produce.'}</p></div>
    <div class="packing-gallery-grid ${items.length===1?'packing-single':''}">${items.map(p=>{const v=p[lang];return `<article class="packing-card" data-reveal><figure>${photo(p.image,p.widths,v.alt,'',false,'(max-width:700px) 90vw, 45vw')}</figure><div><p class="eyebrow">${catalog[p.product][lang].name.toUpperCase()}</p><h3>${v.title}</h3><p>${v.description}</p><a class="text-link" href="${href('contact')}?product=${p.product}#contact-form">${es?'Consultar este formato':'Enquire about this format'} <span aria-hidden="true">↗</span></a></div></article>`;}).join('')}</div>
    <p class="catalogue-note packing-note">${es?'Presentaciones de referencia. Envase, peso, etiquetado y disponibilidad a confirmar para cada pedido.':'Reference presentations. Packaging, weight, labelling and availability to be agreed for each order.'}</p>
  </section>`;
}
