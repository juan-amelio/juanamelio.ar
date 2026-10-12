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
  Bricolage Grotesque sobre **grafito oscuro** (desde la #23), y **cada caso se
  viste con la marca real de su producto** en su sección: Global Fit (negro + turquesa, Geist), A7 Sports
  (negro + lima, Archivo) y Forge Studio (su tema oscuro real, Source Serif 4 y
  los colores de imprenta). El prototipo está en
  https://claude.ai/artifact/EMLjqPagbSz9YcC64oPbv3 (`EnVivo.dc.html`).
- **Modo claro** (12/10/2026): botón en la barra; hasta que la persona elige,
  sigue al sistema. Cambia el sitio y el fondo de cada caso (con el tema claro
  real de cada marca), **nunca las pantallas de las apps**: las maquetas leen
  sólo `--color-gf-*`, `-a7-*` y `-fs-*`, que no cambian con el tema. Si algún
  día una maqueta va en claro, se decide caso por caso. El tema lo pone el
  script del `<head>` en `layout.tsx` (`data-tema` en el `<html>`) y se guarda
  en `localStorage`, para que la página siga siendo estática.
- **La portada son las tres apps vivas** (#23): flotan en perspectiva, se mueven
  solas y siguen al mouse; al bajar, una escena fija cambia el fondo a la marca
  de cada caso. Sin botones de contacto en la portada: eso va al menú y al final.
  Todo movimiento respeta «reducir movimiento».
- **Una sola página** (#32, 11/10/2026): no hay páginas de caso ni relato. Cada
  proyecto muestra en el inicio qué hace, con un selector **Celular /
  Escritorio** (lo que se usa desde el teléfono y lo que se usa desde el
  panel) y la lista de funciones; se cambia tocando, el scroll sólo pasa de un
  proyecto al otro. Forge Studio no tiene versión de celular.
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
| `src/components/casos/casos.tsx` | Los datos de cada proyecto y sus funciones, por celular y escritorio |
| `src/components/inicio/Recorrido.tsx` | La escena de los proyectos, con el selector y la lista de funciones |
| `src/components/maquetas/` | Las pantallas de cada app, dibujadas y con datos de demo |
| `src/app/globals.css` | Tokens del sitio (se fijan en la #6) |

## Gotchas

- **El servidor de desarrollo puede quedarse con CSS viejo.** Pasó varias veces
  con `globals.css`: la página carga, pero sin las reglas nuevas (se ve en que
  falta una clase que sí está en el archivo). Suele pasar después de editar el
  archivo reemplazándolo (`sed -i` en la Mac) o de correr `next build` con el
  servidor prendido. Se arregla bajándolo, borrando `.next/dev` y levantándolo
  de nuevo. `npm run build` no tiene el problema: si el build sale bien y el dev
  no, es esto.
- **La ronda de la portada usa `@property --angulo`** para poder animar el giro.
  La caja del anillo lleva `pointer-events: none`: en 3D queda delante de las
  pantallas de atrás y se comía el clic.
