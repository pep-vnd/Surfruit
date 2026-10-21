# SURFRUIT

Demo web bilingüe con catálogo de aguacate, cítricos, verduras y boniato. Conserva la propuesta **Esencia** para aguacate y adapta **A la mesa** a cítricos. Apertura del aguacate mediante una secuencia de vídeo vinculada al scroll, fotografías del campo y presentaciones, y recetas.

- [Ver la web](https://pep-vnd.github.io/Surfruit/)
- [Aguacate](https://pep-vnd.github.io/Surfruit/es/aguacate/)
- [Cítricos](https://pep-vnd.github.io/Surfruit/es/citricos/)
- [Verduras](https://pep-vnd.github.io/Surfruit/es/verduras/)
- [Surfruit](https://pep-vnd.github.io/Surfruit/es/surfruit/)

## Desarrollo

Requiere Node.js 20 o posterior.

```sh
npm ci --prefix web
npm --prefix web run dev
```

## Publicación

GitHub Actions compila, comprueba y publica `web/dist` en GitHub Pages al subir cambios a `main`. También se puede ejecutar manualmente el workflow **Publish SURFRUIT to GitHub Pages**. La ruta base se obtiene de la configuración de Pages.

La demo mantiene `noindex` y no tiene backend: las consultas se preparan localmente, sin envío a un servidor.

[Documentación y recursos](web/README.md).

[Fuentes, decisiones y datos pendientes de validación](web/docs/catalogue-review.md).
