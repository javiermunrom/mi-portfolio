## Why

La home actual sigue presentando proyectos incrustados como parte de la narrativa principal. Esa estructura ya no encaja con la nueva direccion del portfolio: la pagina de inicio debe actuar como una landing de presentacion personal, mas limpia, mas aspiracional y centrada en identidad, capacidades y contacto.

## What Changes

- **BREAKING** Redefinir `/` como una landing de presentacion personal sin previews, cards, grids ni sliders de proyectos.
- **BREAKING** Consolidar `/projects` como la unica ruta donde viven y se exploran los proyectos.
- Mantener en la home solo los bloques `hero`, `stack/habilidades` y `contacto`, con un CTA explicito hacia `/projects`.
- Ajustar la direccion visual de la home hacia un lenguaje premium minimalista, con tipografia mas elegante y mucho aire.

## Capabilities

### Modified Capabilities
- `portfolio-site`: Cambia el rol funcional de `/` para que deje de ser un escaparate mixto con proyectos incrustados y pase a ser una landing personal enfocada en presentacion y conversion hacia `/projects`.
- `portfolio-template-sections`: Reestructura las secciones permitidas de la home y elimina cualquier patron de preview de proyectos dentro de esa ruta.

## Impact

- Afecta a `src/pages/index.astro` y a cualquier componente de home que hoy renderice proyectos embebidos.
- Afecta a estilos globales y a la tipografia si la implementacion visual necesita reforzar el tono premium minimalista.
- Mantiene `/projects` y sus detalles como area independiente de exploracion de proyectos.
