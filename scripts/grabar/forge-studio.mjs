/*
 * Las grabaciones de Forge Studio (#14): la app real con el tablero de demo
 * (seed `seed:demo` de forge-studio, #103), con su tema claro, un martes a las
 * 10:15. El board de verdad tiene proyectos de clientes y no sale de su base.
 *
 * Antes de correrlo:
 *   1. La base `forge_demo` creada y migrada (CLAUDE.md de forge-studio, «Una
 *      base de demo»).
 *   2. Forge levantado con el reloj corrido y el login de desarrollo (la
 *      entrada `forge-studio-demo` del launch.json de Juan):
 *        RELOJ_DEMO=2026-11-10T10:15:00-03:00 \
 *        NODE_OPTIONS="--require ./scripts/grabar/reloj.cjs" \
 *        DATABASE_URL=… DIRECT_URL=… DEV_LOGIN=true AUTH_URL=http://localhost:3013 \
 *        npm --prefix <forge-studio> run dev -- -p 3013
 *   3. FORGE_DIR=<forge-studio> node scripts/grabar/forge-studio.mjs [nombre…]
 *
 * Cada toma resiembra la base, así arranca siempre del mismo estado.
 */
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { ESCRITORIO, grabar } from "./grabar.mjs";

const FORGE = resolve(process.env.FORGE_DIR ?? "../forge-studio");
const BASE_DATOS = process.env.FORGE_DEMO_DB ?? `postgresql://${process.env.USER}@localhost:5432/forge_demo`;
const PUERTO = 3013;
const RELOJ = "2026-11-10T10:15:00-03:00";
const BASE = `http://localhost:${PUERTO}`;
const CARPETA = resolve("public/grabaciones/forge-studio");

const LUCIA = "lucia@dev.local";

/*
 * La hora del servidor. reloj.cjs lo corre a RELOJ en el momento en que
 * arranca y lo deja andar, así que a esta altura ya va unos minutos más
 * adelante. El agente se ve prendido sólo si latió hace menos de 90 s según
 * ESE reloj: se siembra con la hora del servidor, sacada de cuándo arrancó el
 * proceso que escucha en el puerto.
 */
function ahoraDelServidor() {
  const pid = execFileSync("lsof", ["-tiTCP:" + PUERTO, "-sTCP:LISTEN"], { encoding: "utf8" }).trim().split("\n")[0];
  const arranco = Date.parse(execFileSync("ps", ["-o", "lstart=", "-p", pid], { encoding: "utf8" }).trim());
  return new Date(Date.parse(RELOJ) + (Date.now() - arranco));
}

function resembrar() {
  execFileSync("npm", ["--prefix", FORGE, "run", "-s", "seed:demo"], {
    stdio: "ignore",
    env: { ...process.env, DATABASE_URL: BASE_DATOS, DIRECT_URL: BASE_DATOS, DEMO_AHORA: ahoraDelServidor().toISOString() },
  });
}

const comun = {
  base: BASE,
  email: LUCIA,
  reloj: RELOJ,
  antes: resembrar,
  carpeta: CARPETA,
  dispositivo: ESCRITORIO,
  // El tema claro de la app (pedido de Juan, 01/11), y el lateral plegado para
  // que el tablero y el calendario tengan lugar a 1120 px.
  esquema: "light",
  cookies: [
    { name: "forge_tema", value: "claro" },
    { name: "forge_lateral", value: "plegado" },
  ],
};

const COLUMNAS = ".columnas-tareas";

const TOMAS = {
  inicio: () =>
    grabar("inicio", { ...comun, ruta: "/inicio", final: 2200 }, async ({ page, apuntar, espera }) => {
      // Sólo lo que entra sin desplazar: el saludo y el agente no se van de
      // cuadro (el grabador centra lo que queda pegado al borde).
      await espera(1400);
      await apuntar(page.getByText("Esperan tu revisión"), { despues: 1100 });
      await apuntar(page.getByText("P0 sin cerrar"), { despues: 900 });
      await apuntar(page.getByText("Reunión de relevamiento"), { despues: 900 });
    }),

  tablero: () =>
    grabar("tablero", { ...comun, ruta: "/tareas?proyecto=cava-andina", final: 1800 }, async ({ page, apuntar, desplazar, espera }) => {
      await espera(1300);
      await desplazar(700, { dentro: COLUMNAS, eje: "x", ms: 2200, despues: 900 });
      // Lo que espera a una persona: la revisión que le toca a Lucía.
      await apuntar(page.getByRole("button", { name: "Cobro con Mercado Pago en el checkout" }), { despues: 1000 });
      await desplazar(700, { dentro: COLUMNAS, eje: "x", ms: 2000, despues: 900 });
    }),

  revision: () =>
    grabar("revision", { ...comun, ruta: "/tareas?proyecto=cava-andina&tarea=7", final: 2000 }, async ({ page, tocar, apuntar, espera }) => {
      // La ficha abre sola por la dirección. La nota de lint y pruebas es la
      // que deja la skill `revisar` al entregar.
      await espera(1200);
      await apuntar(page.getByText("lint ✅ · tsc ✅ · 38 tests ✅ · build ✅", { exact: true }).first(), { despues: 1300 });
      await apuntar(page.getByText("te toca a vos"), { despues: 900 });
      await tocar(page.getByRole("button", { name: "Aprobar", exact: true }), { despues: 1800 });
    }),

  calendario: () =>
    grabar("calendario", { ...comun, ruta: "/calendario", final: 1800 }, async ({ page, apuntar, espera }) => {
      await espera(1300);
      for (const evento of ["Demo con el dueño de la vinoteca", "Salida del cobro en línea", "Vacaciones de la Dra. Paz"]) {
        await apuntar(page.getByText(evento).first(), { despues: 800 });
      }
    }),
};

const pedidas = process.argv.slice(2);
for (const [nombre, toma] of Object.entries(TOMAS)) {
  if (pedidas.length && !pedidas.includes(nombre)) continue;
  await toma();
}
