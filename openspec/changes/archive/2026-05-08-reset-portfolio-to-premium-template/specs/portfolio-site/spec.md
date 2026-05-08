## MODIFIED Requirements

### Requirement: Landing page presentation
El sistema SHALL exponer una pagina principal en `/` como plantilla profesional vacia, centrada en estructura, placeholders explicitos y acceso a secciones de proyectos y contacto.

#### Scenario: User opens the home page
- **GIVEN** a visitor accesses `/`
- **WHEN** the page loads successfully
- **THEN** the visitor sees placeholder-only presentation content instead of real personal information
- **AND** the visitor can navigate to the projects area and the contact area from the main CTA actions

### Requirement: Projects listing
El sistema SHALL exponer una pagina en `/projects` con un listado de proyectos en formato plantilla, preparado para crecer sin depender de contenido real.

#### Scenario: User opens the projects page
- **GIVEN** a visitor accesses `/projects`
- **WHEN** placeholder or published project entries exist in the content collection
- **THEN** the system lists the available projects using reusable cards or rows with placeholder-safe metadata
- **AND** each listed project links to its detail page

### Requirement: Project detail pages
El sistema SHALL generar una pagina individual por proyecto a partir de `src/content/projects/`, mostrando una ficha limpia y consistente con la plantilla base.

#### Scenario: User opens a project detail page
- **GIVEN** a project markdown entry exists in `src/content/projects/`
- **WHEN** a visitor accesses that project's generated slug route
- **THEN** the system renders the project content and metadata using placeholders when real content is not yet defined
- **AND** the page reflects the frontmatter defined for that project without exposing unrelated personal information
