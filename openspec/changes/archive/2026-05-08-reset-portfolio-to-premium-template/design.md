## Context

La base actual ya usa Astro, Tailwind y Content Collections, pero conviven dos capas de implementacion: una mas generica y otra mas editorial (`Home*`) con contenido real, imagenes concretas y estilos muy acoplados al portfolio actual. El cambio es transversal porque afecta estructura de pagina, datos, componentes y estilo visual de las rutas publicas.

## Goals / Non-Goals

**Goals:**

- Dejar una landing limpia con secciones fijas y componentes reutilizables.
- Sustituir cualquier dato real por placeholders cortos y evidentes.
- Reducir componentes duplicados y estilos especificos que no aportan a la nueva base.
- Mantener la arquitectura preparada para seguir creciendo con proyectos y contenido despues.

**Non-Goals:**

- No anadir CMS, backend, integraciones de formulario ni nuevas dependencias.
- No cerrar el diseno final del portfolio relleno con contenido real.
- No introducir animaciones complejas ni patron visual experimental.

## Decisions

### 1. Reutilizar la arquitectura Astro actual y simplificarla
Se mantendran `MainLayout`, `Container`, las rutas publicas existentes y la capa de Content Collections. Se eliminaran o dejaran de usar los componentes `Home*` y cualquier pieza antigua redundante.

Alternativa considerada: rehacer toda la estructura de `src/` desde cero. Se descarta porque la base actual ya tiene layout, aliases, routing y colecciones utiles.

### 2. Centralizar placeholders y configuracion base en datos tipados
Los textos visibles, enlaces placeholder, categorias de stack y bloques de contacto deben salir de una unica fuente tipada en `src/data/` para evitar texto hardcodeado repartido por secciones.

Alternativa considerada: dejar placeholders incrustados en cada componente. Se descarta porque dificulta el futuro relleno del portfolio y rompe consistencia.

### 3. Convertir la home en una composicion de secciones pequenas y reutilizables
Cada bloque principal sera un componente de seccion independiente: hero, about, featured project, projects grid, stack y contact. Las tarjetas y badges se resolveran con componentes pequenos donde compense reutilizacion real.

Alternativa considerada: una unica pagina grande con markup inline. Se descarta porque dificulta el mantenimiento y la escalabilidad pedida.

### 4. Mantener `/projects` y `/projects/[slug]` como extension natural de la plantilla
Las rutas de proyectos seguiran existiendo, pero mostraran contenido placeholder coherente con la plantilla vacia. El schema de proyectos puede simplificarse para soportar tarjetas y fichas base sin datos reales.

Alternativa considerada: eliminar las rutas de proyectos y dejar solo la home. Se descarta porque el usuario quiere una base escalable centrada en proyectos tecnologicos.

### 5. Reducir el sistema visual a tokens y patrones minimos
Se consolidaran colores, bordes, radios, espaciados y animaciones suaves en `global.css`, eliminando estilos editoriales ligados a imagenes concretas, overlays complejos y textos demasiado narrativos.

Alternativa considerada: mantener la capa visual actual y solo cambiar los textos. Se descarta porque seguiria sintiendose como un portfolio terminado y no como una plantilla premium vacia.

## Risks / Trade-offs

- [Las rutas de proyectos dependen de contenido existente] -> Sustituir el markdown real por entradas placeholder validas y coherentes con el schema final.
- [Eliminar demasiado puede romper estilos compartidos] -> Mantener `MainLayout`, `Container` y clases base antes de borrar componentes antiguos.
- [Exceso de abstraccion temprana] -> Crear solo componentes reutilizables donde ya haya al menos dos usos claros.
- [La plantilla puede quedar demasiado vacia o fria] -> Usar jerarquia tipografica, bloques visuales placeholder y espaciado generoso para que se vea premium sin inventar contenido.

## Migration Plan

1. Sustituir los datos y contenido real por placeholders tipados.
2. Rehacer la home con nuevas secciones base y limpiar imports/componentes no usados.
3. Adaptar `/projects` y `/projects/[slug]` a la nueva presentacion placeholder.
4. Consolidar estilos globales y verificar build/lint.

Rollback: revertir el change completo en git si la nueva plantilla no cumple con la estructura esperada.

## Open Questions

- Ninguna critica para empezar: el alcance funcional y visual esta suficientemente definido para implementar.
