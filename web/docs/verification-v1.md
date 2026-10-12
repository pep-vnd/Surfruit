# Verificación de la demo

Realizada el 12 de octubre de 2026 en el navegador integrado de Codex (Chromium).

## Comprobaciones realizadas

- Construcción sin dependencias (`npm run build`) y comprobador de las cuatro rutas (`npm run check`): correctos tanto con `/` como con `/Surfruit/`. Se verifican idiomas, un H1 por documento, IDs únicos, destinos de anclas, textos alternativos y 98 referencias a archivos/enlaces.
- Sintaxis del JavaScript: `node --check src/app.js`.
- Vista previa HTTP local: respuesta 200 para la página principal de producto.
- Revisión visual de producto y home, en español e inglés; tamaños de escritorio 1280 × 720/800 y 1440 × 900, y móvil 390 × 844 y 320 × 740.
- Scroll de apertura: observados el fruto cerrado, estados intermedios de separación y la presentación de ambas mitades. Se han recolocado las anotaciones para no cubrir el fruto.
- Saltos a origen, presentación y contacto. Se corrigió un doble margen en las anclas y un desplazamiento durante la carga de la escena.
- Navegación móvil: abrir, seleccionar sección y cerrar menú. Sin desbordamiento horizontal a 320 px (medido contra `documentElement.clientWidth`, incluyendo la barra de desplazamiento).
- Cambio ES → EN desde presentación: conserva la página y `#presentation`. Recarga directa correcta también bajo `/Surfruit/`.
- Tres pestañas de formatos: selección por clic y por flecha de teclado. Panel correspondiente visible y estado ARIA actualizado.
- Consulta: formato preseleccionado desde Malla, campos editables, copia del resumen comprobada en portapapeles, descarga `.txt` comprobada en disco y cierre con Escape. El ejemplo de prueba queda en `~/Downloads/SURFRUIT-es-enquiry.txt`; contiene únicamente datos ficticios de QA (Francia y 2 palés por semana), no información comercial del sitio.
- Movimiento reducido manual: alternativa estática, vuelta a la animación y persistencia durante la sesión. Se corrigió la posición de la mitad al cambiar de modo durante la apertura.
- Alternativa sin JavaScript: comprobada con una copia temporal del documento sin el script; mantiene el producto estático, la navegación por enlaces y los tres formatos visibles. Los controles que dependen de JavaScript se ocultan.
- Fallo de un recurso de la animación: probado con una URL de imagen inexistente en una copia temporal. La página pasa a la alternativa estática y conserva el fruto con hueso. Las páginas temporales de QA no forman parte del paquete final.
- Sin imágenes rotas ni errores/avisos de consola en las rutas normales revisadas. La prueba de fallo genera deliberadamente un 404 que no existe en la compilación final.
- Foco visible observado en los campos del diálogo; controles principales de la cabecera de al menos 44 × 44 px en móvil. Las pestañas y acciones comerciales superan esa altura.
- Contrastes calculados de las combinaciones principales: crema/verde 13,18:1; texto secundario sobre crema 4,69:1; idioma secundario 7,07:1; verde sobre lima 8,62:1; placeholders 5,26:1; foco oscuro sobre crema 5,64:1. No equivale a una auditoría completa de accesibilidad.
- Paquete estático final de aproximadamente 2,8 MB. Fuentes y fotografías locales; sin peticiones a CDNs, bibliotecas remotas, analítica ni servicios de formularios durante el uso.

## Límites reales

- La apertura es una composición en perspectiva de capas fotográficas generadas. No es 3D volumétrico y puede verse una cara plana durante parte del giro. Mantiene las mismas tres imágenes y no salta entre fotografías independientes.
- La preferencia del sistema `prefers-reduced-motion` se lee con `matchMedia` y tiene reglas CSS específicas. Se verificó el mismo estado mediante el control manual; no se cambió la preferencia global del sistema operativo durante la revisión.
- No se ha probado en dispositivos físicos ni en Safari/Firefox. Se recomienda esa revisión para producción.
- La imagen pequeña de marca sigue limitando su nitidez. El modo de mezcla integra su fondo en la cabecera; sustituir por el maestro oficial cuando esté disponible.
- El contenido no confirma oferta actual, formatos disponibles, certificaciones ni contacto. Los pendientes están documentados en `pending.md` y `src/config.mjs`.
- No se ha desplegado públicamente. Se han probado la salida estática y la ruta base local; la configuración final del proveedor de hosting queda fuera de esta demo.

El servidor principal de vista previa se conserva activo para poder enseñar el resultado. El servidor auxiliar utilizado para `/Surfruit/` se detuvo al terminar esa comprobación.
