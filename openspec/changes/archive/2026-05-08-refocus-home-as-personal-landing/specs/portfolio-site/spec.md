## MODIFIED Requirements

### Requirement: Landing page presentation
El sistema SHALL exponer `/` como una landing de presentacion personal enfocada en identidad profesional, habilidades y contacto, sin proyectos incrustados en la propia home.

#### Scenario: User opens the home page
- **GIVEN** a visitor accesses `/`
- **WHEN** the page loads successfully
- **THEN** the visitor sees a personal presentation landing built around hero, stack or skills, and contact content
- **AND** the page includes a clear CTA that navigates to `/projects`
- **AND** the page does not render embedded project previews, project cards, project grids or project sliders

### Requirement: Projects listing
El sistema SHALL exponer `/projects` como el unico espacio publico de navegacion y exploracion de proyectos del portfolio.

#### Scenario: User opens the projects page
- **GIVEN** a visitor accesses `/projects`
- **WHEN** published or placeholder project entries exist in the content collection
- **THEN** the system lists the available projects on that route
- **AND** the home page remains free of project listing UI patterns

### Requirement: Project detail pages
El sistema SHALL generar una pagina individual por proyecto a partir de `src/content/projects/`, manteniendo la separacion entre la landing personal y el area de proyectos.

#### Scenario: User opens a project detail page
- **GIVEN** a project markdown entry exists in `src/content/projects/`
- **WHEN** a visitor accesses that project's generated slug route
- **THEN** the system renders the project detail in the `/projects` area without requiring any mirrored preview on `/`
