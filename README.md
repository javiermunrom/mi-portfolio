# Mi Portfolio

Base profesional para un portfolio personal construido con Astro, TypeScript y Tailwind CSS.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- Content Collections de Astro
- ESLint
- Prettier

## Scripts

- `npm run dev`: arranca el entorno de desarrollo
- `npm run build`: genera la build de producción
- `npm run preview`: previsualiza la build localmente
- `npm run lint`: ejecuta ESLint sobre el proyecto
- `npm run format`: formatea el código con Prettier

## Instalación

```bash
npm install
npm run dev
```

## Estructura

```text
src/
├── components/
│   ├── layout/
│   ├── projects/
│   ├── sections/
│   └── ui/
├── content/
│   ├── education/
│   ├── experience/
│   └── projects/
├── content.config.ts
├── data/
├── layouts/
├── pages/
│   ├── projects/
│   │   ├── [slug].astro
│   │   └── index.astro
│   └── index.astro
├── styles/
├── types/
└── utils/
```

## Routing preparado

- `/`: home con presentación y proyectos destacados
- `/projects`: listado completo de proyectos
- `/projects/[slug]`: página individual generada desde content collections

## Content Collections

Los proyectos viven en `src/content/projects/` como archivos Markdown con frontmatter tipado.

Campos actuales del schema:

- `title`
- `description`
- `technologies`
- `featured`
- `githubUrl`
- `demoUrl`
- `date`

## Añadir un nuevo proyecto

1. Crear un archivo `.md` en `src/content/projects/`.
2. Añadir el frontmatter siguiendo el schema.
3. Escribir el contenido largo del proyecto en Markdown.
4. La ruta se generará automáticamente en `/projects/[slug]`.

## Git recomendado

- Rama principal: `master`
- Nueva funcionalidad: crear rama desde `master`
- Nombres sugeridos: `feature/nombre`, `fix/nombre`, `chore/nombre`
- Abrir PRs pequeñas y enfocadas para mantener el histórico limpio

## Preparado para crecer

- Alias de imports configurados
- Layout y componentes reutilizables
- Colecciones listas para ampliar contenido
- Modo oscuro preparado a nivel de estructura
- Base compatible con futura integración de React si hiciera falta
