# SURFRUIT · Demo de escaparate B2B

Demo estática en español e inglés, con inicio, empresa, cuatro categorías de producto, fichas comerciales y contacto. La página de aguacate conserva la experiencia de vídeo vinculada al scroll y se puede abrir directamente desde un QR. No hay backend, cuentas, precios ni carrito.

## Ejecutar

Requisito: Node.js 20 o posterior. Instalar las dependencias con `npm ci`.

```bash
cd /home/pep/Projects/Surfruit/web
npm ci
npm run dev
```

- Cítricos: http://127.0.0.1:4173/es/citricos/
- Citrus: http://127.0.0.1:4173/en/citrus/
- Aguacate, Esencia: http://127.0.0.1:4173/es/aguacate/
- Avocado: http://127.0.0.1:4173/en/avocado/
- Home: http://127.0.0.1:4173/es/
- English home: http://127.0.0.1:4173/en/

`npm run dev` construye el sitio y arranca la vista previa. Tras cambiar archivos, ejecutar `npm run build` y recargar el navegador. `npm run preview` sirve una compilación existente. El servidor se limita a la interfaz local `127.0.0.1`. Ctrl+C lo detiene.

## Preparar el alojamiento

Dominio o subdominio con raíz `/`:

```bash
npm run build
npm run check
```

GitHub Pages de un repositorio llamado `Surfruit`, o un hosting con esa subcarpeta:

```bash
BASE=/Surfruit/ npm run build
npm run check
npm run preview
```

Subir **el contenido de `dist/`** a la raíz de publicación o subcarpeta elegida. `dist/` incluye los directorios reales y sus `index.html`, una página 404 y `.nojekyll`. No requiere reescrituras de una SPA. Se puede usar como artefacto de GitHub Pages. La configuración de `BASE` queda incorporada durante la construcción; debe coincidir con la ruta donde se sirve el contenido. `npm run preview` lee esa configuración al arrancar.

Para recuperar la configuración local inicial tras probar otra base:

```bash
npm run build
```

Reiniciar la vista previa si se ha cambiado `BASE`. La demo está publicada en [GitHub Pages](https://pep-vnd.github.io/Surfruit/); el workflow del repositorio la actualiza al subir cambios a `main`. Tiene `noindex,nofollow` y un `robots.txt` que desaconseja indexarla. Revisarlos al aprobar la publicación comercial definitiva; no sustituyen a un control de acceso.

La página de producto usa únicamente los recursos comunes de `assets/`. Para trasladarla a un subdominio, construir con `BASE=/`, servir el mismo paquete y dirigir el QR a `/es/aguacate/` o `/en/avocado/`. Si se desea el producto en la raíz del subdominio, cambiar el documento raíz en `scripts/build.mjs` y las entradas de `routes` de forma coordinada.

## Versión actual: catálogo completo

El aguacate conserva la primera propuesta. Cítricos utiliza la estética de la segunda. Se incorporan Surfruit, Verduras, Otros (boniato), Contacta y fichas individuales. Los enlaces antiguos de la segunda demo redirigen a cítricos.

El formulario de Contacta abre la aplicación de correo con una consulta revisable y permite copiarla. No transmite datos a un backend.

[Fuentes, mantenimiento y pendientes](docs/catalogue-review.md).

## Antecedentes de diseño

Originalmente se presentaron dos propuestas de aguacate: **01 · Esencia**, oscura y tipográfica, y **02 · A la mesa**, con colores cálidos y tipografía serif. El cliente eligió la primera para aguacate y la segunda para cítricos. El selector de demos se ha retirado.

El aguacate utiliza el segundo vídeo aportado por el usuario. Una secuencia fotográfica de 96 imágenes avanza y retrocede con el scroll, con recursos más ligeros en móvil y una alternativa estática para movimiento reducido. Solo la página de aguacate carga esta secuencia; ninguna página carga Three.js. El primer fotograma está en el HTML y aparece sin necesidad de scroll. [Fuente, generación y límites](docs/video-proof.md).

## Editar y ampliar

- `src/copy.mjs`: textos completos en ambos idiomas.
- `src/config.mjs`: rutas y datos comerciales pendientes. Un `null` no se publica como afirmación.
- `src/render.mjs`: HTML estático de producto, home, contacto y consulta.
- `src/style.css`: tipografía local, composición, móvil y movimiento reducido.
- `src/app.js`: progreso de apertura, navegación, pestañas accesibles y consulta local.
- `src/avocado-3d.js`: fuente histórica de la propuesta 3D; no se incluye en la compilación ni se carga en la web.
- `src/avocado-video.js` y `src/video.css`: reproducción por fotogramas y composición compartidas por las dos propuestas.
- `scripts/extract-video.mjs`: extrae las variantes WebP desde `media/avocado-opening.mp4`, con FFmpeg.
- `src/warm.mjs` y `src/warm.css`: composición y textos de la segunda propuesta.
- `src/recipes.mjs`: recetas bilingües con ingredientes, tiempos aproximados y pasos; desplegables nativos que funcionan sin JavaScript.
- `scripts/build.mjs`: generador estático; excluye el motor 3D y sus mapas del paquete.
- `scripts/check.mjs`: validación de rutas, enlaces internos, anclas, idiomas e imágenes.

El catálogo editable está en `src/catalog.mjs`. Para añadir un producto, completar los textos y datos documentados en ambos idiomas, añadir su ruta y sus fotografías. Las categorías y fichas reutilizan cabecera, presentación y contacto.

## Recursos, pendientes y verificación

- [Fotografías originales seleccionadas](docs/photo-sources.md).
- [Recursos generados, logotipo y tipografías](docs/assets.md).
- [Datos pendientes de confirmar](docs/pending.md).
- [Comprobaciones y límites reales](docs/verification.md).

Las consultas se copian al portapapeles o se descargan como `.txt`. No se envían ni se guardan en el servidor. La escena respeta automáticamente la preferencia de movimiento reducido del sistema. Los campos del formulario viven en memoria mientras está abierta la página. Si el navegador bloquea el portapapeles, se ofrece la descarga como alternativa.
