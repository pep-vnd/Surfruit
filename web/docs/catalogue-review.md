# Ampliación de catálogo · 21 de octubre de 2026

## Decisiones del encargo

- El aguacate conserva la plantilla 1 y su secuencia de 96 fotogramas, sin cambiar el renderer ni las imágenes. Se añade información comercial bajo los envases.
- La plantilla 2 se adapta a Cítricos. Sus antiguos enlaces redirigen a la nueva categoría. Se retira el selector de demos.
- Menú: Inicio, Surfruit, Aguacate, Cítricos, Verduras, Otros, Contacta. 16 rutas por idioma (32 en total), además de los redireccionamientos anteriores.
- «Otros» contiene solo boniato, confirmado por el usuario. No se anuncia pistacho.
- El usuario ha autorizado actualizar la demo pública de GitHub Pages; no equivale a aprobar la web comercial definitiva.

## Fuentes corporativas consultadas

| Contenido | Fuente | Decisión |
|---|---|---|
| Catálogo y contactos | https://laslomas.eu/surfruit/products/ | Aguacate, pomelo, puerro, zanahoria, coliflor, brócoli y boniato. Email sales@surfruit.es; teléfono +34 956 438 123. |
| Empresa y ubicación | https://laslomas.eu/surfruit/about-us/ | Finca Las Lomas, Vejer de la Frontera, Cádiz, y actividad orientada a Europa. |
| Variedades de aguacate | https://laslomas.eu/surfruit/products/avocado/ | Hass, Maluma, Carmen, Gem y Lamb Hass como referencia de catálogo. Sin cifras de producción ni promesas de stock. |
| Pomelo | https://laslomas.eu/products/grapefruit/ | Star Ruby; confecciones publicadas; noviembre–mayo como orientación. |
| Puerro | https://laslomas.eu/surfruit/products/leeks/ | Linkton, Shafton, Duraton; granel, preenvasado, industria. Sin inferir fechas del calendario gráfico. |
| Zanahoria | https://laslomas.eu/surfruit/products/carrots/ | Santorin, Namur, Bangor, Naval. Enero–junio distingue en texto las ventanas convencional y ecológica. |
| Coliflor | https://laslomas.eu/surfruit/products/cauliflower/ | Ovindoli, Kornalu, Cercy. Diciembre–febrero propia; noviembre–mayo otros orígenes. |
| Brócoli | https://laslomas.org/ | Partenón; granel, preenvasado y floretes. Sin afirmar plazos logísticos ni disponibilidad actual. |
| Boniato | https://laslomas.eu/products/sweet-potato/ | Beauregard y Covington; selección por calibre e industria. Sin calendario inventado. |
| Prácticas ambientales | https://laslomas.org/ | Uso de energía solar para autoconsumo y mejora de procesos; sin cifras ni sellos de certificación. |

Las fichas contienen redacción nueva. La información de referencia se presenta como orientativa, con confirmación por campaña, lote y pedido. Los meses no documentados se mantienen como `null` en `src/catalog.mjs`; nunca significan suministro durante todo el año.

## Pendiente de la empresa antes del lanzamiento comercial

1. Confirmar variedades, semanas de campaña, formatos, calibres, peso y oferta convencional/ecológica actual.
2. Validar la organización vigente de Surfruit, Lomasfruit y Lomasgreen. La web de origen asigna convencional a Lomasfruit y ecológico a Lomasgreen, pero no se publica esa relación como actual hasta confirmarla.
3. Aportar certificados vigentes y su alcance. La demo ofrece solicitar documentación; no presenta sellos antiguos como certificados actuales.
4. Validar razón social, identificación fiscal, datos registrales y textos legales. Las tres páginas del pie describen el funcionamiento de la demo y señalan la información pendiente.
5. Confirmar los contactos corporativos recuperados de la web oficial y los derechos sobre imágenes para el lanzamiento definitivo.

## Formulario

No existe backend ni proveedor nuevo. Nombre, empresa, email, producto y mensaje se preparan en la aplicación de correo del visitante; este revisa y envía. Hay copia alternativa, validación HTML y preselección del producto desde cada ficha. No se informa falsamente de un envío. Sin JavaScript se ofrece el correo directo y se oculta el formulario para evitar un GET accidental de datos.

## Mantenimiento

- `src/catalog.mjs`: productos, textos ES/EN, variedades, opciones de envasado y calendario.
- `src/config.mjs`: rutas y contacto corporativo.
- `src/sections.mjs`: plantillas de categoría, fichas, empresa, contacto y páginas legales.
- `src/catalogue.css`: estilos adicionales; el diseño de aguacate sigue en `style.css` y `video.css`.
- `src/app.js`: aparición progresiva de textos y preparación local de consultas. Respeta movimiento reducido; el contenido permanece legible sin JavaScript.
