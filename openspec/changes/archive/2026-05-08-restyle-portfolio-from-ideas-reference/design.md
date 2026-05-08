## Context

Las referencias de `C:\Dev\ideas` muestran cuatro vistas coherentes entre si:

- `pantalla inicio.png`: sidebar minima a la izquierda, mucho espacio en blanco, retrato circular grande y bloque central de identidad.
- `sobre mi.png`: misma navegacion lateral, gran imagen en blanco y negro y contenido editorial a dos columnas con bio y datos.
- `proyectos.png`: reticula muy limpia de tarjetas con imagen superior, texto corto y ritmo vertical calmado.
- `ponte en contacto.png`: misma estructura base con encabezado sobrio, mapa oscuro y formulario lineal muy limpio.

La propuesta debe reinterpretar esos patrones en el portfolio actual, manteniendo placeholders y escalabilidad.

## Goals / Non-Goals

**Goals:**

- Acercar visualmente el portfolio a las referencias sin copiar maquetacion exacta ni branding.
- Usar sidebar lateral, monocromo, composicion editorial y tipografia refinada como reglas del sistema.
- Dar a cada area una inspiracion clara: home, sobre mi, proyectos y contacto.
- Mantener componentes reutilizables y placeholders faciles de sustituir despues.

**Non-Goals:**

- No convertir el proyecto en una clonacion literal de las capturas.
- No introducir contenido real, branding real ni textos finales.
- No anadir dependencias visuales pesadas ni animaciones llamativas.

## Decisions

### 1. Usar un layout base con navegacion lateral fija o semiestatica
La sidebar sera el ancla visual principal en desktop, inspirada en las referencias. Debe contener marca placeholder, navegacion minima y enlaces de apoyo sin competir con el contenido principal.

Alternativa considerada: mantener cabecera superior sticky. Se descarta porque las referencias comparten una identidad lateral muy marcada.

### 2. Reintroducir una seccion editorial de sobre mi
Ademas del hero y del stack, la experiencia debe incluir una seccion de sobre mi inspirada en `sobre mi.png`, con gran imagen placeholder, bio corta, datos y tecnologia/experiencia organizados con ritmo editorial.

Alternativa considerada: mantener solo hero, stack y contacto. Se descarta porque el usuario pide inspiracion directa para una seccion de sobre mi especifica.

### 3. Mantener proyectos fuera del hero y de la narrativa principal de la home
La home puede contener un CTA hacia `/projects`, pero no cards ni previews de proyectos en la primera experiencia. La pantalla de proyectos si adopta la referencia de grid minimalista de `proyectos.png`.

Alternativa considerada: volver a incrustar previews de proyectos en `/`. Se descarta porque contradice el objetivo previo y la referencia indicada para home.

### 4. Sistema visual monocromatico con placeholders fotografico-editoriales
Las imagenes placeholder deben sentirse elegantes: blanco y negro, bloques limpios, radios comedidos y contraste tipografico alto. Los acentos cromaticos deben ser minimos o inexistentes.

Alternativa considerada: mantener gradientes o acentos frios actuales. Se descarta porque alejan la estetica de las referencias.

### 5. Contacto con estructura sobria y opcionalmente un mapa placeholder
La referencia de contacto sugiere un encabezado simple, un mapa oscuro y campos lineales. La implementacion debe decidir entre un mapa placeholder o un bloque visual equivalente si simplifica mejor la base.

Alternativa considerada: solo links de contacto sin formulario. Se descarta porque la referencia de contacto pide una pieza de formulario elegante.

## Risks / Trade-offs

- [La sidebar puede complicar responsive] -> Resolver una version compacta en movil manteniendo la misma jerarquia.
- [La home puede ganar demasiados bloques] -> Mantener el tono aireado y el contenido corto para que siga sintiendose landing, no dashboard.
- [La reinterpretacion puede quedarse corta respecto a la referencia] -> Traducir rasgos concretos y visibles: sidebar, monocromo, foto protagonista, grid editorial y formulario sobrio.

## Migration Plan

1. Ajustar specs para reflejar sidebar, sobre mi editorial y direccion monocromatica.
2. Rehacer layout y estilos tipograficos globales.
3. Adaptar home, sobre mi, proyectos y contacto siguiendo la inspiracion de cada captura.
4. Verificar responsividad, placeholders y build.

Rollback: revertir el change completo si la nueva direccion visual pierde claridad, escalabilidad o separacion entre home y proyectos.

## Open Questions

- Ninguna bloqueante. El criterio visual esta suficientemente definido por las cuatro referencias.
