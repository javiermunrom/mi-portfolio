# Javier Muñoz Romero · Portfolio

[![Deploy to GitHub Pages](https://github.com/javiermunrom/mi-portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/javiermunrom/mi-portfolio/actions/workflows/deploy.yml)

Portfolio personal diseñado como un workspace de desarrollo. Cada sección está inspirada en herramientas que uso a diario: editor de código, terminal y documentación.

**→ [javiermunrom.github.io/mi-portfolio](https://javiermunrom.github.io/mi-portfolio)**

---

## Stack

- **Astro** — generación estática y partial hydration
- **React** — componentes interactivos
- **TypeScript** — tipos en todo el proyecto
- **Tailwind CSS v4** — estilos utilitarios
- **Framer Motion** — animaciones declarativas
- **GSAP** — animaciones complementarias
- **Lucide React** — iconografía

## Estructura

```
src/
├── components/
│   ├── HeroCode.tsx          # Hero como editor de código
│   ├── AboutMacDesktop.tsx   # About como ventanas macOS
│   ├── ProjectsWorkspace.tsx # Proyectos como VS Code workspace
│   ├── ContactPagesWindow.tsx# Contacto como Pages document
│   ├── SiteNavbar.astro      # Barra de navegación
│   ├── SiteFooter.astro      # Footer
│   └── Logo.tsx / Logo.astro # Componentes del logo
├── data/                     # Contenido JSON (bilingüe)
├── pages/
│   └── index.astro           # Página única
├── styles/
│   └── global.css            # Estilos base
└── utils/                    # Utilidades
```

## Desarrollo

```bash
npm install
npm run dev       # localhost:4321
npm run build     # genera en dist/
npm run preview   # sirve dist/ localmente
```

## Despliegue

El push a `master` activa automáticamente el workflow de GitHub Actions que construye y despliega en GitHub Pages.

---

Hecho con ☕ por Javier Muñoz Romero
