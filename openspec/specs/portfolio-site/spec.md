# portfolio-site Specification

## Purpose

Describir el comportamiento actual del portfolio personal y sus rutas publicas.
## Requirements
### Requirement: Landing page presentation
El sistema SHALL exponer `/` como una landing de presentacion personal inspirada en una composicion editorial monocromatica con navegacion lateral, gran imagen placeholder y CTA hacia `/projects` y contacto.

#### Scenario: User opens the home page
- **GIVEN** a visitor accesses `/`
- **WHEN** the page loads successfully
- **THEN** the visitor sees a personal landing with lateral navigation, strong typographic hierarchy, a large portrait-style placeholder and short personal placeholder copy
- **AND** the page does not render embedded project listings in the hero area

### Requirement: Projects listing
El sistema SHALL exponer `/projects` como una pantalla de proyectos inspirada en una grid editorial limpia, aireada y preparada para crecer con placeholders.

#### Scenario: User opens the projects page
- **GIVEN** a visitor accesses `/projects`
- **WHEN** placeholder or published project entries exist in the content collection
- **THEN** the system lists them using minimal cards with visual placeholder, title, description and technologies
- **AND** the layout preserves generous spacing and monochrome visual balance

### Requirement: Project detail pages
El sistema SHALL generar una pagina individual por proyecto con el mismo lenguaje visual editorial y monocromatico del resto del portfolio.

#### Scenario: User opens a project detail page
- **GIVEN** a project markdown entry exists in `src/content/projects/`
- **WHEN** a visitor accesses that project's generated slug route
- **THEN** the system renders the detail page with placeholder-safe content and consistent premium visual presentation

