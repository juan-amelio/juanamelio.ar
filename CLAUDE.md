@AGENTS.md

# juanamelio.ar — contexto para Claude Code

El sitio personal de Juan Amelio: quién es, sus proyectos y cómo trabaja.

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
  (negro + lima, Archivo) y Forge Studio (Source Serif 4 y los colores de
  imprenta; sus pantallas, con el tema **claro** de la app, pedido de Juan el
  01/11/2026). El prototipo está en
  https://claude.ai/artifact/EMLjqPagbSz9YcC64oPbv3 (`EnVivo.dc.html`).
- **Modo claro** (12/10/2026): botón en la barra; hasta que la persona elige,
  sigue al sistema. Cambia el sitio y el fondo de cada caso (con el tema claro
  real de cada marca), **nunca las pantallas de las apps**: las maquetas leen
  sólo `--color-gf-*`, `-a7-*` y `-fs-*`, que no cambian con el tema. Cada
  app se muestra en un tema fijo, decidido caso por caso: Global Fit y A7 en
  oscuro, Forge en claro. El tema lo pone el
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
- **El sitio presenta, no pide** (#43). Los textos muestran quién es Juan y lo
  que hizo; no se agregan «Busco», «Abierto a…» ni llamados parecidos (en el
  Sobre mí, la descripción del `<head>` o donde sea) sin preguntarle. La
  etiqueta de Contacto queda como está, por decisión suya.
- **A7 Sports se llama siempre así**, nunca X-Trust.
- **Capturas y videos, siempre con datos de demo.** Global Fit guarda fichas de
  salud (Ley 25.326) y A7 Sports nombres de clientes. Al gimnasio se lo puede
  nombrar: Juan tiene el OK del dueño (10/10/2026).
- **Forge Studio hoy se llama ADJ Forge** (#237 de su repo) y es producto de ADJ
  Solutions. **Acá se llama Forge Studio** (Juan, 01/11/2026); la app grabada y
  la pestaña de su ventana dicen ADJ Forge, porque es lo que se ve.

## Estructura

| Dónde | Qué |
|---|---|
| `src/app/page.tsx` | El inicio |
| `src/components/casos/casos.tsx` | Los datos de cada proyecto y sus funciones, por celular y escritorio |
| `src/components/inicio/Recorrido.tsx` | La escena de los proyectos, con el selector y la lista de funciones |
| `src/components/maquetas/` | Las pantallas de cada app: dibujadas (A7) o grabadas (`Grabacion.tsx`, Global Fit y Forge Studio) |
| `scripts/grabar/` | El grabador de las apps reales y el guion de cada una (ver «Pantallas grabadas») |
| `public/grabaciones/` | Los MP4 y sus pósters, uno por función |
| `src/app/globals.css` | Tokens del sitio (se fijan en la #6) |

## Pantallas grabadas (#44)

Global Fit ya no se dibuja: sus pantallas son **grabaciones de gym-app real**,
corriendo en local con el gimnasio de demo (`npm run seed:gimnasio-demo` de
gym-app: un tenant aparte, `globalfit-demo.localhost`, todo ficticio). Para
regrabar:

1. gym-app con `DEV_LOGIN=true` y el reloj corrido a la hora de la demo:
   `RELOJ_DEMO=2026-11-24T19:05:00-03:00 NODE_OPTIONS="--require <este repo>/scripts/grabar/reloj.cjs" npm run dev`
   (la entrada `gym-app-demo` del `launch.json` de Juan).
2. `GYM_APP_DIR=<gym-app> node scripts/grabar/global-fit.mjs [toma…]`. Cada
   toma resiembra la base, así arranca siempre igual.
3. Mirar cada MP4 entero antes de commitear: que no aparezca nada real.

**Forge Studio** (#14) se graba igual, con el tablero de demo de su repo
(`npm run seed:demo`, forge-studio#103: base `forge_demo` local, todo
inventado; el board real tiene proyectos de clientes y no se graba nunca):

1. Forge con la base de demo, `DEV_LOGIN=true` y el reloj en
   `2026-11-10T10:15:00-03:00`, en el 3013 (la entrada `forge-studio-demo` del
   `launch.json`; los comandos están en el CLAUDE.md de forge-studio, «Una base
   de demo»).
2. `FORGE_DIR=<forge-studio> node scripts/grabar/forge-studio.mjs [toma…]`.
   Graba en claro (cookie `forge_tema`) con el lateral plegado, y siembra con
   la hora del servidor para que el agente se vea prendido: reloj.cjs lo deja
   andar desde que arrancó, y la app lo da por apagado a los 90 s.

El grabador usa el screencast de Chrome cuadro a cuadro (el video de
Playwright sale borroso) y ffmpeg. Muestra el dedo o la flecha en cada toque.
`Grabacion.tsx` se porta como `useCiclo`: corre activa y a la vista, avisa al
terminar y con «reducir movimiento» queda el póster (el último cuadro).

## Gotchas

- **El screencast toma la ventana de Chrome, no el viewport emulado**, y a 1×.
  Por eso el grabador lanza Chrome con `--window-size` y
  `--force-device-scale-factor`; sin eso sale recortado y borroso. Y se corta
  al cambiar de documento: se lo vuelve a pedir en cada navegación.
- **El reloj de la demo no puede ser `class extends Date`**: adentro de Next
  pierde `Date.UTC` y `Date.parse`. `reloj.cjs` es una función a propósito.
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
