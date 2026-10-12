# Recursos visuales

## Fotografías reales

Se inspeccionaron 63 candidatas mediante una hoja de contacto, de una colección de 773 imágenes. Se seleccionaron siete fotografías para campo, fruto en árbol, selección, instalaciones y tres presentaciones. Una octava fotografía de detalle se utiliza en el bloque de características de la segunda propuesta. La lista completa está en [photo-sources.md](photo-sources.md).

Los originales permanecen en la carpeta de WeTransfer, excluida de la aplicación y del futuro repositorio por `.gitignore`. La aplicación solo incluye derivados WebP a dos tamaños. Se conserva el contenido de las fotografías y sus marcas. La fecha de las fotos no acredita disponibilidad comercial actual.

## Escena actual desde vídeo

Las dos demos, en ambos idiomas, usan los fotogramas del vídeo verde aportado por el usuario. El primer fotograma cerrado sirve también como imagen inicial y alternativa estática. [Fuente y derivados](video-proof.md).

## Escena 3D anterior (archivo)

La animación de capas se ha sustituido por `src/avocado-3d.js`, con Three.js 0.180.0 servido desde el propio sitio. Las dos mitades comparten una superficie exterior paramétrica: tienen dorso curvo, caras de corte, una cavidad cóncava y un hueso esférico. Son materiales opacos con prueba de profundidad; no hay fundido entre imágenes del fruto. La separación y el giro se calculan desde el scroll natural. El sombreado es una ilustración 3D, no una captura fotogramétrica de un aguacate de la empresa.

Mapas actuales generados con la herramienta integrada `image_gen`, optimizados a WebP de 1254 × 1254. Piel y hueso toman como referencia la lámina fotográfica original:

- `assets/avocado-skin-natural.webp`: piel oscura con grano marcado. Original `exec-f3ffdcce-6d17-4635-94da-119a77ed854e.png`.
- `assets/avocado-stone-natural.webp`: moteado castaño del hueso. Original `exec-0ecbe582-488c-4223-84ed-e48fc19f697b.png`.
- `assets/avocado-pulp-natural.webp`: fibras y poros finos de la pulpa. Original `exec-c88a2e61-a498-4e8e-901e-6b0b759deb5b.png`.

Los originales están en `/home/pep/.codex/generated_images/01a12f89-5209-7300-b096-51d8abfb2d50/`. La piel combina textura, microrelieve del material y desplazamiento geométrico muestreado del mismo mapa. El desplazamiento se atenúa en la unión de las mitades para mantener el cierre. La pulpa combina mapa fotográfico y un degradado verde junto a la piel. Los reflejos amplios de estudio, la rugosidad individual y la sombra del hueso dan volumen durante el giro. [Prompts completos y variantes](generated-prompts-v3.md). El motor y estos mapas ya no se incluyen en `dist/`; las fuentes históricas se conservan.

Los mapas anteriores `avocado-*-texture.webp` se conservan como antecedentes y no se cargan en la escena. La primera variante de pulpa de esta revisión (`exec-e887dc31-8ce7-4bf0-bd2e-43f000dc832a.png`) se descartó porque tenía fibras demasiado grandes.

## Fotografías de recetas

Tres fotografías generadas para la demo, no fotografías suministradas por SURFRUIT. Derivados locales `assets/recipe-{toast,salad,tacos}-{700,1400}.webp`. La tostada se reutiliza en la portada de la propuesta 02.

| Receta | Original generado |
|---|---|
| Tostadas de aguacate y tomate | `exec-76a6dd86-377d-460d-8807-0301b44a05c1.png` |
| Ensalada de aguacate, tomate y pepino | `exec-0510c9b5-1ccf-471b-9b88-9df812db9575.png` |
| Tacos de aguacate y coliflor | `exec-ee3d3958-c8f2-4d39-87da-112d0433ae15.png` |

[Prompts completos de las cinco imágenes](generated-prompts-v2.md). Los derivados finales están dentro del proyecto; el sitio no depende de la carpeta de generación.

## Lámina anterior y alternativa estática

Herramienta: herramienta integrada `image_gen`, sin API/CLI adicional. Referencia observada antes de generar: `NEW JULIO PHOTOS - RAFA APPROVED/julio2023/LAS_LOMAS_JGF6314.jpg`.

Se generó una única lámina RGBA de 1536 × 1024 para mantener escala, silueta e iluminación compartidas. Se comprobó su transparencia sobre un fondo claro. De ella se extrajeron tres columnas y se optimizaron a WebP con alfa, 512 × 765 cada una:

- `assets/avocado-whole.webp`: exterior.
- `assets/avocado-pit.webp`: mitad con hueso.
- `assets/avocado-empty.webp`: mitad con cavidad vacía.

Original generado, conservado en su ubicación de la herramienta:
`/home/pep/.codex/generated_images/01a12f89-5209-7300-b096-51d8abfb2d50/exec-dc527b46-3a3f-4695-ac1f-1d5132ec3ab0.png`.

Los tres archivos finales residen en este proyecto y el sitio no depende de esa ruta externa. La mitad con hueso se conserva como alternativa estática sin JavaScript, con movimiento reducido o ante un fallo de WebGL; también se usa en la home. Los otros dos recortes quedan como fuentes históricas y no se cargan en la animación actual.

La técnica anterior de caras fotográficas giratorias ha sido retirada.

### Prompt usado (herramienta integrada)

```text
Use case: product-mockup. Create a photorealistic avocado animation asset sheet on a TRUE TRANSPARENT BACKGROUND with alpha, landscape 1536x1024. Input reference: use ONLY as botanical texture, flesh color and pit realism reference. EXACTLY THREE isolated avocado objects in three equal columns, no overlaps, lots of transparent space between each. All represent the SAME avocado, identical outer pear silhouette, vertical orientation with narrower neck upward, identical scale, height about 720px. Left column: a WHOLE uncut dark green Hass avocado, front view, beautifully textured natural pebble skin, subtly green highlights, short natural stem. Center column: the corresponding avocado HALF with its rich brown rounded pit intact, flesh cut face directly facing camera, bright natural creamy yellow flesh with green rim and thin dark skin edge. Right column: the other HALF of the identical fruit, empty seed cavity, flesh cut face facing camera. Both halves match each other and the whole in silhouette and size. Premium studio food photography, soft directional light from upper left, natural surface moisture, no plastic gloss, ultra detailed, credible proportions and shallow cavity. Orthographic frontal view, NO perspective mismatch, centered in each equal third, no extra avocado, no sliced wedges, no leaves, no text, no logos, no background color, no checkerboard, no ground or cast shadows. These will be individually cropped and used as front/back faces of an opening fruit on a dark forest green website. Critical: actually transparent background and consistent lighting and silhouette across three isolated assets.
```

## Marca

Se revisaron los nombres y formatos disponibles entre los materiales y las imágenes PNG candidatas. No apareció una versión maestra de SURFRUIT. Se utiliza `surfruit-logo-referencia.png`, sin redibujar, en `assets/surfruit-logo.png`. El modo de mezcla CSS integra su fondo negro en la cabecera oscura. En la propuesta clara, un filtro SVG elimina visualmente el negro sin redibujar ni modificar el archivo original. Se presenta a tamaño pequeño (90–138 px CSS), sin ampliar artificialmente. La letra pequeña del original no es nítida: sustituir por un SVG oficial o PNG transparente de alta resolución aprobado por SURFRUIT.

## Tipografías locales

La propuesta cálida utiliza Georgia / Times New Roman del sistema para titulares; su apariencia puede variar ligeramente entre sistemas.

- Nimbus Sans Narrow Bold: `display.woff2`, comprimido desde el OTF instalado. [Fuente original de Artifex](https://github.com/ArtifexSoftware/urw-base35-fonts). Licencia y excepción originales en `font-nimbus-LICENSE.txt` y `font-nimbus-COPYING.txt`.
- Adwaita Sans: `sans.woff2`, comprimido desde el TTF instalado. Licencia original en `font-adwaita-LICENSE.txt`.

No se modificaron los dibujos de las fuentes. Los archivos de origen OTF/TTF se conservan en `assets/` para mantenimiento y se omiten de la compilación. No se cargan Google Fonts, CDNs ni fuentes externas en la presentación.

## Referencia de dirección visual

Se abrió y observó [landonorris.com](https://landonorris.com/). Se tomó como referencia la presencia del protagonista, la escala tipográfica, los cambios de escena y el contraste entre fondos. No se incorporaron su identidad, código ni recursos.
