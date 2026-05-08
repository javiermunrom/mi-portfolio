## Why

La home actual mezcla una base estructural valida con contenido real, componentes duplicados y decisiones visuales muy ligadas al portfolio actual. Hace falta convertirla en una plantilla vacia, consistente y escalable para poder reconstruir el portfolio desde una base premium sin arrastrar contenido ni complejidad innecesaria.

## What Changes

- **BREAKING** Sustituir el contenido real de la pagina principal y de la seccion de proyectos por placeholders explicitos y reutilizables.
- **BREAKING** Reorganizar la landing en secciones base fijas: hero, sobre mi, proyecto destacado, mas proyectos, stack, contacto y footer.
- Eliminar componentes, estilos y contenido editorial que ya no aporten a una plantilla limpia y mantenible.
- Consolidar una arquitectura de componentes mas modular para permitir crecer despues sin rehacer la base.
- Mantener las rutas publicas necesarias, pero adaptadas a una presentacion de plantilla vacia en lugar de un portfolio ya rellenado.

## Capabilities

### New Capabilities
- `portfolio-template-sections`: Plantilla vacia con secciones reutilizables y placeholders claros para contenido futuro.

### Modified Capabilities
- `portfolio-site`: Cambia la experiencia de `/`, `/projects` y las fichas de proyecto para sustituir contenido real por una base profesional vacia y estructurada.

## Impact

- Afecta a `src/pages/index.astro`, `src/pages/projects/*`, `src/components/sections/*`, `src/components/layout/*`, `src/components/projects/*`, `src/data/site.ts`, `src/types/site.ts` y `src/styles/global.css`.
- Afecta al contenido de `src/content/projects/` y al schema de `src/content.config.ts` si se simplifican los datos necesarios para placeholders.
- No requiere nuevas dependencias, pero si limpieza de codigo y estilos redundantes.
