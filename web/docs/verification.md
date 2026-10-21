# Verificación · catálogo completo

## Segunda revisión del titular y cabecera de Surfruit

- El usuario seguía percibiendo temblor en la M después del ajuste anterior. El bloque de origen queda ahora totalmente fuera del observador de apariciones: sin `data-reveal`, opacidad 1, transformación `none` y duración de transición 0 s.
- Solo este titular cambia de Nimbus Sans Narrow a Adwaita Sans (la otra familia local ya utilizada), con peso 750 y sin espaciado negativo. El resto de los titulares y las animaciones se conservan.
- Cabecera de Surfruit reorganizada en dos columnas: presentación a la izquierda y fotografía de hasta 560 × 420 px a la derecha. En móvil se apilan y la imagen usa proporción 3:2. Ajustado `sizes` al espacio real de la foto.
- Revisión visual local en escritorio de 1440 × 900 y móviles de 390 × 844 / 320 × 740, español e inglés. Desplazamiento arriba y abajo en el titular, sin efectos activos en el bloque. Sin desbordamiento ni avisos de consola en las vistas comprobadas.


## Revisión de inicio, fotografías y catálogo · 21 de octubre de 2026

- Inicio: el botón principal enlaza al catálogo y se conservan las cuatro fotos aprobadas. Eliminada la introducción duplicada de aguacate. Verificado el titular de origen antes y después de bajar y volver: opacidad final 1, transformación `none`, sin distorsión observada.
- Nueva panorámica de Surfruit revisada en 1440 × 900 y 320 × 740: versiones responsive hasta 2600 px, proporción 16:9 en escritorio y 4:3 en móvil. Se sustituye la foto aérea anterior en esta sección.
- Cítricos: foto final reemplazada por un primer plano de pomelos de piel dorada y pulpa rosada. Fotografías reales de caja y malla, revisadas en escritorio y móvil.
- Catálogo de Verduras: puerro, zanahoria, chirivía y coles. Fichas y nombres en español e inglés; consulta de chirivía en inglés con el producto preseleccionado. Los enlaces antiguos de coliflor y brócoli redirigen a la categoría, sin atribuirlos a otro producto.
- Presentaciones de puerro y zanahoria en categoría y ficha; galería individual de puerro revisada a 320 px. Sin imágenes rotas ni desbordamiento en las vistas medidas. Consola de la revisión sin errores ni avisos.
- Build y comprobaciones correctos con `/Surfruit/` y `/`: 32 rutas, 1306 referencias y seis redirecciones. Las comprobaciones de sustitución se limitan al catálogo y las consultas; la coliflor de una receta de aguacate se conserva como ingrediente.
- La animación de vídeo y los envases del aguacate no se modifican en esta revisión.

## Ampliación del 21 de octubre de 2026

- 32 rutas ES/EN, menú de siete secciones, seis fichas nuevas y redirección de la antigua demo cálida a cítricos. «Otros» contiene únicamente boniato, según confirmación del usuario.
- Build y comprobaciones correctos con base `/` y `/Surfruit/`: 1282 referencias locales, idiomas, anclas, IDs, imágenes y variantes responsive. Se comprueban también las consultas preseleccionadas, los calendarios y la ausencia del vídeo en las demás páginas.
- Vista de escritorio de 1440 × 900: inicio, empresa, cítricos, verduras, ficha de pomelo, calendario y contacto. Fotografías cargadas, navegación y enlaces a fichas operativos, sin errores o avisos observados en consola.
- Móvil de 390 × 844: cítricos, menú de siete entradas y aguacate. Entrada directa en aguacate con `scrollY=0`, fotograma 0 visible y avance al 95 mediante el acceso a la escena abierta.
- Móvil de 320 × 740: ficha de pomelo en inglés, boniato y formulario con producto preseleccionado. Sin desbordamiento horizontal en las vistas medidas.
- Consulta preparada con datos ficticios: validación, casilla de privacidad y copia al portapapeles correctas. El cambio de idioma conserva el producto. No se ha enviado ningún mensaje externo.
- Apariciones de texto verificadas al navegar y desplazarse. Revisión de código de las alternativas sin JavaScript y con movimiento reducido: contenido visible, formulario oculto sin JavaScript y correo directo disponible.
- Se mantiene intacto el renderer de vídeo y la secuencia aprobada del aguacate. Se conservan las recetas y presentaciones de la primera plantilla.
- La publicación de la demo ampliada en GitHub Pages está autorizada por el usuario. Los datos de campaña, marcas, certificados y textos legales pendientes están documentados en `catalogue-review.md`.

Las siguientes secciones son históricas: sus referencias a tres demos, controles retirados, contactos pendientes o ausencia de publicación no describen la versión actual.

## Archivo · vídeo compartido

Revisión local del 12 de octubre de 2026, navegador integrado de Codex (Chromium). Las comprobaciones están ordenadas de más recientes a anteriores; la revisión inicial está archivada en `verification-v1.md` y sus observaciones sobre capas fotográficas ya no describen la animación actual.

## Vídeo en todas las propuestas y carga inicial

- Las seis rutas de producto (tres propuestas × dos idiomas) comparten el renderer fotográfico. La compilación excluye Three.js y sus mapas de material.
- Primer fotograma cerrado en el HTML, responsive, precargado y con prioridad alta. El poster se oculta únicamente después de decodificar y dibujar el primer frame en canvas. La inicialización comienza sin esperar al scroll.
- Entrada directa en español e inglés: `scrollY=0`, canvas en frame 0 y escena visible. Fixture sin JavaScript: imagen inicial cargada y visible, sin canvas ni scroll. Fixture retirado al reconstruir.
- Demo cálida revisada cerrada y abierta en 1440 × 900; escena abierta revisada en 390 × 844, sin desbordamiento horizontal. Fondo verde y textos claros integrados entre las secciones crema.
- Consola de la página principal sin errores ni avisos. Recargadas las pestañas que conservaban versiones anteriores.
- Build y comprobaciones correctos con `/` y `/Surfruit/`: 8 rutas y 268 referencias. Nuevas comprobaciones para el primer frame en HTML y ausencia del renderer 3D. Sintaxis de app, renderer y plantillas correcta. Restaurada la compilación local con base `/`.

## Prueba 03 · Secuencia de vídeo (revisión anterior)

- Nueva ruta en español e inglés con 96 fotogramas del vídeo de fondo verde aportado por el usuario. Variantes de 1024 × 720 y 560 × 394; no se utiliza el vídeo de cuadros.
- Navegación local revisada en 1440 × 900, 390 × 844 y 320 × 740. Escena cerrada, intermedia y abierta. Se corrigió el borde rectangular que aparecía cuando el canvas tenía espacio vacío alrededor de la imagen.
- Avance comprobado al fotograma 48 con scroll de 640 px, retroceso al fotograma 23 al volver a 320 px y llegada al 95 al abrir la escena completa. El fotograma dibujado coincide con el solicitado cuando está cargado.
- Cambio ES → EN desde la escena abierta conserva la ruta de vídeo y `#inside`. Sin desbordamiento horizontal en los tamaños medidos.
- Movimiento reducido manual: imagen fija; tras recargar en ese modo no se crea canvas. Reactivación y enlace «Desliza para descubrir» comprobados.
- Consola sin errores ni avisos durante la prueba normal. El selector añade «03 · Vídeo» en escritorio, menú y pie móvil.

## Revisión de materiales y fotografía de bolsa

- Sustituidos los materiales de piel, pulpa y hueso por tres mapas locales nuevos. La piel tiene relieve geométrico y microrelieve; se conservan las dos mitades cerradas y la apertura 3D.
- Inspección visual del fruto cerrado, a mitad de apertura y abierto en escritorio (1440 × 900), sobre las dos direcciones de diseño. Revisión de la escena abierta en móvil de 390 × 844: sin desbordamiento horizontal ni recorte del fruto.
- Ajustados reflejos, luz y sombra del hueso. Corregido el aviso inicial de PMREM por un desenfoque excesivo; no se observaron nuevos errores ni avisos en las navegaciones posteriores.
- Sustituida JGF6193 (brócoli) por JGF6254 (aguacates en bolsas transparentes junto a cajas). «Bolsa / Bag», descripción, texto alternativo y opciones de consulta coherentes en español e inglés. La imagen está compartida por las dos propuestas.
- Pestaña Bag comprobada en escritorio e inglés; Bolsa en móvil y español. Foto cargada y sin imágenes rotas en la página revisada.
- `npm run build`, `npm run check` correctos con `/` y `/Surfruit/`; se validan ahora los tres nuevos mapas requeridos por la escena. `node --check src/avocado-3d.js` correcto. Se restauró la compilación local con base `/`.
- 6,4 MB en `dist/`. Los mapas antiguos se conservan en las fuentes, pero se excluyen del paquete. La foto errónea se retiró de los recursos de la aplicación; su original no se modificó.
- Tamaño temporal del navegador restaurado al finalizar. No se ha publicado el sitio.

## Comprobaciones de la revisión anterior (3D y segunda propuesta)

- `npm run build` y `npm run check`: correctos con base `/` y `/Surfruit/`. Se verifican las seis rutas, idiomas, un H1 por documento, IDs únicos, anclas, textos alternativos, 180 referencias locales y dependencias del motor 3D.
- `node --check` sobre `src/app.js`, `src/avocado-3d.js` y `src/render.mjs`.
- Escena observada cerrada, en dos puntos intermedios de separación/giro y abierta. Las mitades son mallas opacas con profundidad; no hay planos de fotografía giratorios. Se ajustó el ángulo final para mostrar el dorso curvo en ambas mitades.
- Revisión visual de las dos propuestas en 1440 × 900 y móvil 390 × 844 / 320 × 740. También se observó la alternativa estática en el tamaño nativo de portátil. Se corrigieron recortes del modelo y solapamientos del texto a 320 px. No se detectó desbordamiento horizontal en las vistas medidas.
- Segunda propuesta en español e inglés. Cambio de idioma desde la escena y recetas conserva propuesta y sección. Ruta directa y recarga en `/Surfruit/en/at-the-table/#inside`: escena lista e imágenes cargadas.
- Selector de propuestas: visible en escritorio, accesible desde el menú y el pie de página en móvil. El menú abre, permite saltar a recetas/presentación y se cierra al elegir.
- Tres recetas con imagen, ingredientes y pasos. Apertura de la tostada verificada a 320 px. Se utilizan elementos `details` nativos; también funcionan sin JavaScript.
- Presentaciones: cambio a Bandeja por clic y a Malla con flecha de teclado. Panel y estado ARIA correctos.
- Consulta local: formato Malla preseleccionado, edición de destino y volumen con datos ficticios de QA, diálogo sin desbordamiento a 320 px y cierre con Escape. La copia y descarga permanecen como en la versión inicial; no se ha añadido envío de datos.
- Movimiento reducido manual: alternativa estática, persistencia en la sesión, ausencia de carga del renderer al entrar en ese modo y reactivación. Se corrigió el estilo inline que impedía ocultar el canvas.
- Fallo del renderer: fixture temporal que lanza una excepción al inicializar `createAvocado`. Se comprobó `data-scene=failed`, fotografía alternativa y navegación disponible. Es una prueba de recuperación de error, no un ensayo en una GPU averiada.
- Sin JavaScript: fixture sin el módulo de aplicación. Producto estático, tres formatos visibles, controles dependientes de JS ocultos y recetas desplegables operativas. Los fixtures se eliminaron al reconstruir `dist/`.
- Sin imágenes rotas ni errores o avisos de consola en las rutas normales revisadas. Three.js, sus módulos y texturas se sirven desde el sitio, sin CDN.
- Contrastes calculados de la propuesta cálida: texto verde/crema 9,74:1; idioma secundario/crema 5,75:1; texto de recetas/fondo melocotón 7,79:1; verde/fondo de producto 8,65:1. No equivale a una auditoría integral de accesibilidad.
- Paquete de aquella revisión: 5,5 MB incluyendo ambos idiomas, ambas propuestas, home, todas las variantes de imagen y el motor. Es el tamaño total del paquete, no la descarga inicial de una página. La escena carga cerca de su sección y solo dibuja al cambiar el scroll o el tamaño; no dibuja fuera de la sección visible.

## Límites reales

- La escena utiliza el vídeo generado aportado por el usuario. Conserva su resolución y artefactos; no es una filmación de una pieza real de SURFRUIT.
- Se respeta `prefers-reduced-motion` con `matchMedia`. Se ha probado el control manual equivalente; no se cambió la preferencia global del sistema.
- No se ha probado en dispositivos físicos ni en Safari o Firefox. Georgia puede variar entre sistemas; el resto de fuentes se sirve localmente.
- Las fotos de recetas son generadas y las recetas tienen tiempos orientativos. Los textos sensoriales son una propuesta editorial, pendiente de aprobación comercial.
- El logotipo sigue limitado por la resolución del original. El filtro de transparencia de la propuesta clara no sustituye un maestro oficial.
- Continúan pendientes los contactos, oferta actual y demás datos detallados en `pending.md`.
- Sin publicación pública. Se conserva el servidor principal local; el servidor auxiliar de la prueba bajo `/Surfruit/` se ha detenido.
