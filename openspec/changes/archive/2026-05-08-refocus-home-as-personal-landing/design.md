## Context

La direccion actual del sitio deja que la home mezcle presentacion personal con modulos de proyectos. El nuevo objetivo pide una separacion mas clara entre identidad personal y catalogo de trabajo: la home presenta a la persona y deriva hacia proyectos; `/projects` concentra toda la exploracion de proyectos.

## Goals / Non-Goals

**Goals:**

- Hacer de `/` una landing personal enfocada en presentacion, habilidades y contacto.
- Eliminar por completo de la home cualquier preview visual de proyectos incrustados.
- Reforzar una experiencia visual premium minimalista con tipografia mas elegante y espaciado generoso.
- Mantener un CTA claro hacia `/projects` como unico punto de entrada a proyectos.

**Non-Goals:**

- No redisenar el comportamiento funcional de `/projects` mas alla de reforzar su rol como destino unico de proyectos.
- No introducir nuevas secciones en la home fuera de `hero`, `stack/habilidades` y `contacto`.
- No anadir nuevas integraciones, dependencias ni animaciones complejas.

## Decisions

### 1. La home se limita a tres bloques funcionales
La pagina `/` debe componer solo `hero`, `stack/habilidades` y `contacto`. Esto evita ambiguedad narrativa y fuerza que el area de proyectos viva fuera de la home.

Alternativa considerada: mantener una seccion resumen de proyectos con menos peso visual. Se descarta porque seguiria contradiciendo el objetivo de sacar los proyectos de la home.

### 2. Los proyectos solo existen como destino navegable
La home puede mencionar proyectos unicamente mediante un CTA textual o visual hacia `/projects`, pero no mediante cards, grids, carruseles, sliders ni previews destacadas.

Alternativa considerada: mantener un proyecto destacado unico. Se descarta porque sigue siendo una forma de incrustar proyectos en la home.

### 3. El tono visual prioriza aire y refinamiento tipografico
La implementacion debe favorecer composiciones con mucho espacio negativo, jerarquia tipografica mas elegante y menos densidad de elementos. Esto define la sensacion premium minimalista sin necesidad de sumar complejidad visual.

Alternativa considerada: apoyarse en componentes decorativos o motion para transmitir premium. Se descarta porque el objetivo habla de minimalismo y de reducir ruido.

### 4. La especificacion debe prohibir explicitamente previews de proyectos en `/`
La restriccion funcional debe quedar escrita en las specs para evitar futuras regresiones en las que reaparezcan cards o grids de proyectos en la home.

Alternativa considerada: dejarlo como preferencia de diseno en vez de requerimiento. Se descarta porque el objetivo lo define como una condicion central del cambio.

## Risks / Trade-offs

- [La home puede quedar demasiado escueta] -> La jerarquia tipografica, el espaciado y el bloque de contacto deben sostener la presencia de la landing sin depender de modulos extra.
- [Pueden quedar componentes de proyectos todavia conectados a `/`] -> Hay que revisar la composicion de la home y retirar cualquier import o seccion antigua relacionada con previews.
- [La direccion visual puede interpretarse de forma subjetiva] -> La spec debe fijar senales visibles concretas: tipografia mas elegante, mucho aire y CTA hacia `/projects`.

## Migration Plan

1. Actualizar la composicion y requisitos de la home en las specs.
2. Reflejar que `/projects` es el unico espacio de exploracion de proyectos.
3. Implementar la home sin modulos de proyectos incrustados y verificar que el CTA principal derive a `/projects`.

Rollback: revertir el change completo si la nueva home pierde claridad o si reaparece contenido de proyectos incrustado en `/`.

## Open Questions

- Ninguna: el objetivo funcional y editorial esta suficientemente delimitado.
