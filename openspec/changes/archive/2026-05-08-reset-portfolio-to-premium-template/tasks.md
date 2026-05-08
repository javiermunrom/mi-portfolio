## 1. Datos y modelo base

- [x] 1.1 Reorganizar `src/data/site.ts` y `src/types/site.ts` para centralizar placeholders de home, contacto, stack, navegacion y footer.
- [x] 1.2 Revisar `src/content.config.ts` y `src/content/projects/*` para dejar proyectos placeholder coherentes con la nueva plantilla.

## 2. Estructura de componentes

- [x] 2.1 Crear o adaptar componentes de seccion para `hero`, `about`, `featured-project`, `projects-grid`, `stack` y `contact`.
- [x] 2.2 Crear componentes reutilizables minimos para tarjetas, badges o bloques visuales donde exista reutilizacion real.
- [x] 2.3 Eliminar del flujo de la app los componentes antiguos `Home*` y cualquier pieza duplicada que ya no aporte.

## 3. Rutas publicas

- [x] 3.1 Rehacer `src/pages/index.astro` para componer la nueva landing premium vacia con placeholders.
- [x] 3.2 Adaptar `src/pages/projects/index.astro` para listar proyectos placeholder con una presentacion consistente.
- [x] 3.3 Adaptar `src/pages/projects/[slug].astro` para mostrar fichas de proyecto limpias y coherentes con la base vacia.

## 4. Sistema visual y limpieza

- [x] 4.1 Consolidar `src/styles/global.css` con tokens, espaciados y animaciones suaves, eliminando estilos editoriales redundantes.
- [x] 4.2 Ajustar `MainLayout`, `Navbar` y `Footer` para que reflejen el tono minimalista y placeholder-only del nuevo sistema.
- [x] 4.3 Retirar imagenes, textos y referencias reales que dejen de usarse tras el rehacer.

## 5. Verificacion

- [x] 5.1 Ejecutar `npm run build` y corregir errores de integracion.
- [x] 5.2 Ejecutar `npm run lint` y resolver incidencias antes de cerrar el cambio.
