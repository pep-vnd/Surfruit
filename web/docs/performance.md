# Revisión de carga · 6 de noviembre de 2026

- Fotos WebP responsive con dimensiones reales y candidatos intermedios de 480, 700 y 1000 px. Primeras fotos con prioridad alta; fotos inferiores con carga diferida; las tres presentaciones de aguacate se preparan con prioridad baja.
- Comparación agregada de la variante mayor de las 38 fotos: 9.947.912 -> 7.039.274 bytes (29,2 % menos). No equivale a un porcentaje de mejora del tiempo de carga: depende de la red, el servidor y el tamaño elegido por el navegador.
- Fuentes locales recortadas para caracteres latinos, puntuación y símbolos del sitio: 401.904 -> 134.736 bytes (66,5 % menos). Se conservan los originales y las licencias; `scripts/subset-fonts.py` permite regenerar los derivados con fonttools[woff].
- La descarga de fotogramas se pausa al salir de la escena o esconder la pestaña. El fotograma inicial sigue presente en el HTML. No se cambia la resolución ni se recomprime la secuencia.
- Las fotos y las fuentes nuevas usan rutas diferentes; CSS y JavaScript tienen nueva versión para evitar archivos antiguos en caché.
- El paquete de actualización de IONOS incluye la configuración pendiente de caché privada. Fotos/fuentes: siete días; CSS/JS: una hora; HTML: revalidación. La activación se hace mediante access.php y conserva la autenticación existente.
- Otros y Boniato no se ofrecen en navegación, catálogo ni formulario. Sus cuatro direcciones antiguas ES/EN redirigen a Inicio.

Validación: compilación de 28 páginas ES/EN, enlaces, imágenes responsive y redirecciones; revisión visual de Verduras en escritorio/móvil y de las tres presentaciones de aguacate. La latencia de IONOS solo se podrá medir tras aplicar el paquete allí.
