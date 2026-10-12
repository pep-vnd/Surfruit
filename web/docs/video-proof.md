# Apertura desde vídeo · Todas las demos

Las propuestas 01 y 02 utilizan la misma secuencia, en español e inglés. La tercera demo y sus rutas se han retirado porque duplicaban la primera.

## Fuente y derivados

Vídeo aportado por el usuario: `gemini_generated_video_3253671d.mp4`, el de fondo verde. Copia de trabajo en `web/media/avocado-opening.mp4`; el original de Downloads no se modifica. El vídeo de cuadros no se utiliza.

La fuente es 1280 × 720 a 24 fps. Se extraen 96 fotogramas desde 0,5 s hasta aproximadamente 4,5 s, conservando la apertura y omitiendo la larga pose final. Solo se recorta espacio lateral: 1024 × 720 desde x=128. No se elimina ni se genera el fondo. Un fundido suave de los bordes integra el fondo verde en la escena oscura.

- `assets/avocado-sequence/desktop/frame-000.webp` a `frame-095.webp`: 1024 × 720, calidad WebP 83.
- `assets/avocado-sequence/mobile/frame-000.webp` a `frame-095.webp`: 560 × 394, calidad WebP 80.
- Regeneración: `node scripts/extract-video.mjs` desde `web/` (requiere FFmpeg con libwebp), seguida de `npm run build`.

## Comportamiento

`src/avocado-video.js` dibuja el fotograma correspondiente al scroll en un canvas. No usa reproducción automática, sonido ni temporizador de vídeo. Bajar avanza, subir retrocede y detener el scroll conserva la imagen. Se carga primero el exterior; después se completa la secuencia con cuatro peticiones simultáneas, priorizando el fotograma solicitado y sus vecinos. La variante ligera se elige al cargar en pantallas de hasta 600 px.

El primer fotograma se incluye como imagen responsive en el HTML, con precarga y prioridad alta. Permanece visible hasta que el canvas ha dibujado su reemplazo decodificado. La inicialización no requiere un evento de scroll, tampoco en la propuesta cálida cuya escena está más abajo.

Ninguna ruta importa Three.js; el motor y sus mapas se excluyen de la compilación. La preferencia de movimiento reducido del sistema pausa las cargas pendientes y muestra el primer fotograma cerrado. No hay un botón de pausa ni se guarda una preferencia manual. Si se entra con esa preferencia, o sin JavaScript, se muestra directamente la imagen fija. Si falla la primera imagen de la secuencia o varias intermedias, se conserva la presentación estática. El resto de la web, idiomas, envases y recetas se comparte con las propuestas anteriores.

## Límites

La prueba conserva la resolución y los pequeños defectos del vídeo original; no inventa detalle adicional. La ampliación de escritorio permite valorar la dirección visual, pero una fuente de mayor resolución mejoraría la versión definitiva. La secuencia está preparada para el fondo oscuro; no se ha generado una transparencia ni una versión para fondo crema. En la propuesta cálida, la escena mantiene el fondo verde y la tipografía clara, rodeada por las secciones crema. La demo permanece local.
