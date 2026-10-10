@AGENTS.md

# juanamelio.ar — contexto para Claude Code

El sitio personal de Juan Amelio: quién es, sus proyectos y cómo trabaja. Sirve
para conseguir **trabajo y también proyectos**: los dos caminos, siempre.

El repo es **público**. Nada que no se pueda leer en internet entra acá: ni
`.env` con valores, ni capturas con datos reales, ni textos de clientes sin su OK.

## Cómo se trabaja

- El tablero es el proyecto **`juanamelio`** de Forge Studio (épicas E1–E6). Una
  tarjeta, una rama, un PR (skill `la-forja:rama`). A `main` se llega por PR.
- Antes de entregar: `npm run listo` (lint, tipos y build).
- Local: `npm run dev`, en **http://localhost:3010** (3000, 3002, 3003 y 4321 ya
  los usan otros proyectos de la Mac de Juan).

## Decisiones que no se rediscuten

- **Idioma:** español primero; el inglés se suma después (#11 deja las rutas listas, #22 traduce).
- **Dominio:** `juanamelio.ar` (lo compra Juan, #18).
- **Dirección visual: la C · En vivo**, elegida el 10/10/2026. El sitio habla con
  Bricolage Grotesque sobre gris claro, y **cada caso se viste con la marca real
  de su producto** en su sección: Global Fit (negro + turquesa, Geist), A7 Sports
  (negro + lima, Archivo) y Forge Studio (gris claro, Source Serif 4 y los
  colores de imprenta). El prototipo está en
  https://claude.ai/artifact/EMLjqPagbSz9YcC64oPbv3 (`EnVivo.dc.html`).
- **A7 Sports se llama siempre así**, nunca X-Trust.
- **Capturas y videos, siempre con datos de demo.** Global Fit guarda fichas de
  salud (Ley 25.326) y A7 Sports nombres de clientes. Al gimnasio se lo puede
  nombrar: Juan tiene el OK del dueño (10/10/2026).
- **Forge Studio hoy se llama ADJ Forge** (#237 de su repo) y es producto de ADJ
  Solutions. Cómo se lo nombra acá lo decide Juan.

## Estructura

| Dónde | Qué |
|---|---|
| `src/app/page.tsx` | El inicio |
| `src/app/casos/<caso>/page.mdx` | Cada caso, en MDX |
| `src/mdx-components.tsx` | Los componentes que usa el MDX (obligatorio con App Router) |
| `src/app/globals.css` | Tokens del sitio (se fijan en la #6) |
