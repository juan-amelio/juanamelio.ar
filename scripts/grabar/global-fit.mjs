/*
 * Las grabaciones de Global Fit (#44): gym-app real, con el gimnasio de demo
 * (seed `seed:gimnasio-demo` de gym-app), un martes a las 19:05.
 *
 * Antes de correrlo:
 *   1. gym-app con DEV_LOGIN=true en su .env y el servidor levantado con el
 *      reloj corrido (la entrada `gym-app-demo` del launch.json de Juan):
 *        RELOJ_DEMO=2026-11-24T19:05:00-03:00 \
 *        NODE_OPTIONS="--require ./scripts/grabar/reloj.cjs" npm --prefix <gym-app> run dev
 *   2. node scripts/grabar/global-fit.mjs [nombre…]   (sin nombres, todas)
 *
 * Cada toma resiembra la base, así arranca siempre del mismo estado.
 */
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { CELULAR, ESCRITORIO, grabar } from "./grabar.mjs";

const GYM_APP = resolve(process.env.GYM_APP_DIR ?? "../gym-app");
const RELOJ = "2026-11-24T19:05:00-03:00";
const BASE = "http://globalfit-demo.localhost:3000";
const CARPETA = resolve("public/grabaciones/global-fit");

const SOCIA = "demo.martina.rossi@dev.local";
const PROFE = "demo.nicolas.videla@dev.local";
const DUENO = "demo.ramiro.ortiz@dev.local";

function resembrar() {
  execFileSync("npm", ["--prefix", GYM_APP, "run", "-s", "seed:gimnasio-demo", "--", `--ahora=${RELOJ}`], {
    stdio: "ignore",
  });
}

const comun = { base: BASE, reloj: RELOJ, antes: resembrar, carpeta: CARPETA };

/** El botón (por su texto o su aria-label) de la tarjeta o fila que tiene
    ese texto: la hora de una clase, el nombre de un socio. */
const enTarjeta = (page, texto, boton) => {
  const b = `button[normalize-space()="${boton}" or @aria-label="${boton}"]`;
  return page.locator(`xpath=//*[normalize-space(text())="${texto}"]/ancestor::*[.//${b}][1]//${b}`).first();
};

const TOMAS = {
  /* Celular: la socia y el profe */

  inicio: () =>
    grabar("inicio", { ...comun, email: SOCIA, ruta: "/inicio", dispositivo: CELULAR, final: 2500 }, async ({ espera }) => {
      await espera(1500);
    }),

  reservar: () =>
    grabar("reservar", { ...comun, email: SOCIA, ruta: "/calendario", dispositivo: CELULAR }, async ({ page, tocar, espera }) => {
      await espera(700);
      await tocar(page.getByText("JUE", { exact: true }).first(), { despues: 1300 });
      await tocar(enTarjeta(page, "19:00", "Reservar"), { despues: 2000 });
    }),

  asistencia: () =>
    grabar("asistencia", { ...comun, email: PROFE, ruta: "/clase", dispositivo: CELULAR }, async ({ page, tocar, espera }) => {
      await espera(600);
      await tocar(page.getByText("Martes, 24 de noviembre, 18:00"), { despues: 1400 });
      // Antes de marcar, la ficha del que avisó dolor.
      await tocar(page.getByRole("button", { name: "Ficha de salud de Diego Pereyra" }), { despues: 2600 });
      await page.keyboard.press("Escape");
      await espera(700);
      await tocar(page.getByRole("button", { name: "Todos asistieron" }), { despues: 900 });
      await tocar(page.getByRole("button", { name: /Confirmar asistencia/ }), { despues: 1600 });
    }),

  entreno: () =>
    grabar("entreno", { ...comun, email: SOCIA, ruta: "/entreno", dispositivo: CELULAR }, async ({ page, tocar, escribir, espera }) => {
      await espera(1200);
      await tocar(page.getByText("Anotar qué entrenaste").first(), { despues: 900 });
      for (const zona of ["Cuádriceps", "Glúteos", "Abdomen"]) {
        await tocar(page.getByRole("dialog").getByText(zona, { exact: true }), { despues: 350 });
      }
      await tocar(page.getByRole("dialog").locator("textarea"), { despues: 300 });
      await escribir("Sentadilla con 40 kg, 4×10.");
      await espera(500);
      await tocar(page.getByRole("button", { name: "Guardar" }), { despues: 1800 });
    }),

  pagos: () =>
    grabar("pagos", { ...comun, email: SOCIA, ruta: "/pagos", dispositivo: CELULAR }, async ({ page, tocar, espera }) => {
      await espera(1000);
      await tocar(page.getByRole("button", { name: "Ya pagué" }), { despues: 2000 });
    }),

  /* Escritorio: el dueño */

  "panel-inicio": () =>
    grabar("panel-inicio", { ...comun, email: DUENO, ruta: "/admin", dispositivo: ESCRITORIO }, async ({ page, tocar, espera }) => {
      await espera(1000);
      for (const socio of ["Diego Pereyra", "Carla Molina", "Tomás Giménez", "Matías Lucero"]) {
        await tocar(enTarjeta(page, socio, "Confirmar"), { despues: 900 });
      }
      await espera(800);
    }),

  socios: () =>
    grabar("socios", { ...comun, email: DUENO, ruta: "/admin/socios", dispositivo: ESCRITORIO }, async ({ page, tocar, espera }) => {
      await espera(1000);
      await tocar(page.getByRole("button", { name: /Pagos por confirmar/ }), { despues: 1100 });
      await tocar(
        page.locator(`xpath=//*[normalize-space(text())="Diego Pereyra"]/ancestor::*[.//button[starts-with(@aria-label,"Aprobar pago")]][1]//button[starts-with(@aria-label,"Aprobar pago")]`).first(),
        { despues: 1300 },
      );
      await tocar(page.getByRole("button", { name: /Esperan aprobación/ }), { despues: 1100 });
      await tocar(enTarjeta(page, "Abril Domínguez", "Aprobar"), { despues: 1500 });
    }),

  semana: () =>
    grabar("semana", { ...comun, email: DUENO, ruta: "/admin/clases", dispositivo: ESCRITORIO }, async ({ page, tocar, espera }) => {
      await espera(1200);
      await tocar(page.getByRole("link", { name: "Calendario" }), { despues: 1000 });
      await tocar(page.getByRole("link", { name: "Semana siguiente" }).or(page.getByRole("button", { name: "Semana siguiente" })), { despues: 1200 });
      await tocar(page.getByRole("button", { name: "Generar semana" }), { despues: 2200 });
    }),

  metricas: () =>
    grabar("metricas", { ...comun, email: DUENO, ruta: "/admin/estadisticas", dispositivo: ESCRITORIO }, async ({ desplazar, espera }) => {
      await espera(1500);
      await desplazar(400, { ms: 1500, despues: 1300 });
      await desplazar(420, { ms: 1500, despues: 1300 });
    }),
};

const pedidas = process.argv.slice(2);
for (const [nombre, toma] of Object.entries(TOMAS)) {
  if (pedidas.length && !pedidas.includes(nombre)) continue;
  await toma();
}
