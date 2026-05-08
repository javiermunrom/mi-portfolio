## Why

La base actual ya separa la home de los proyectos, pero todavia no reproduce la direccion visual concreta que marcan las referencias en `C:\Dev\ideas`. Las capturas comparten un lenguaje muy definido: navegacion lateral fija, composicion aireada, monocromo, imagen protagonista, jerarquia tipografica editorial y formularios o grids muy contenidos. Hace falta rehacer la presentacion del portfolio para reinterpretar claramente ese sistema visual sin copiarlo literalmente.

## What Changes

- **BREAKING** Rehacer la direccion visual de `/`, la seccion o vista de sobre mi, `/projects` y `#contacto` tomando como referencia directa las imagenes de `C:\Dev\ideas`.
- Introducir una navegacion lateral minimalista y consistente con una composicion editorial de mucho aire.
- Reforzar un sistema tipografico mas elegante, monocromatico y premium para todo el portfolio.
- Mantener placeholders explicitos y arquitectura reusable para que el contenido real pueda anadirse despues.

## Capabilities

### Modified Capabilities
- `portfolio-site`: actualiza la presentacion de home, proyectos y contacto para seguir una direccion visual inspirada en las referencias externas.
- `portfolio-template-sections`: redefine la composicion permitida de home y sobre mi, incluyendo navegacion lateral, imagenes placeholder protagonistas y bloques editoriales mas limpios.

## Impact

- Afecta a `src/pages/index.astro`, `src/pages/projects/*`, componentes de layout y componentes de seccion.
- Afecta al sistema visual global y a la tipografia en `src/styles/global.css` y `src/layouts/MainLayout.astro`.
- Puede requerir nuevos placeholders visuales y simplificacion de componentes existentes para encajar con el lenguaje de las referencias.
