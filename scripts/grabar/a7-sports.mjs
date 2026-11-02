/*
 * Las grabaciones de A7 Sports (#13): la app real con la base de demo (seed
 * `npm run seed:demo` de a7sports, catalogo-xtrust#139), un martes a las
 * 18:30. El catálogo es el de producción —nombres y fotos, que son públicos en
 * la tienda— y todo lo demás es inventado: costos, stock, ventas, clientes.
 *
 * Antes de correrlo:
 *   1. La base `a7_demo` creada y migrada (el encabezado de seed-demo.ts).
 *   2. A7 levantado con el reloj corrido y el login de desarrollo (la entrada
 *      `a7sports-demo` del launch.json de Juan):
 *        RELOJ_DEMO=2026-11-24T18:30:00-03:00 \
 *        NODE_OPTIONS="--require ./scripts/grabar/reloj.cjs" \
 *        DATABASE_URL=… DIRECT_URL=… DEV_LOGIN=true AUTH_URL=http://localhost:3004 \
 *        SUPABASE_URL= VIDRIERA_WHATSAPP=5492610000000 \
 *        npm --prefix <a7sports> run dev
 *   3. A7_DIR=<seiszero>/a7sports node scripts/grabar/a7-sports.mjs [nombre…]
 *
 * Cada toma resiembra la base, así arranca siempre del mismo estado.
 */
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { CELULAR, ESCRITORIO, grabar } from "./grabar.mjs";

const A7 = resolve(process.env.A7_DIR ?? "../seiszero/a7sports");
const BASE_DATOS = process.env.A7_DEMO_DB ?? `postgresql://${process.env.USER}@localhost:5432/a7_demo`;
const RELOJ = "2026-11-24T18:30:00-03:00";
const BASE = "http://localhost:3004";
const CARPETA = resolve("public/grabaciones/a7-sports");

const JUAN = "juan@dev.local";

function resembrar() {
  execFileSync("npm", ["run", "-s", "seed:demo", "--", `--ahora=${RELOJ}`], {
    cwd: A7,
    env: { ...process.env, DATABASE_URL: BASE_DATOS, DIRECT_URL: BASE_DATOS },
    stdio: "ignore",
  });
}

const comun = { base: BASE, reloj: RELOJ, antes: resembrar, carpeta: CARPETA };

const TOMAS = {
  /* Celular: la caja en el mostrador */

  caja: () =>
    grabar("caja", { ...comun, email: JUAN, ruta: "/caja", dispositivo: CELULAR, final: 2200 }, async ({ page, tocar, espera }) => {
      await espera(900);
      await tocar(page.getByRole("button", { name: "Indumentaria", exact: true }).first(), { despues: 1200 });
      await tocar(page.getByRole("button", { name: "Remera Dryfit Zurich: elegir talle y color" }), { despues: 900 });
      await tocar(page.getByRole("button", { name: /^M · \d+$/ }), { despues: 700 });
      await tocar(page.getByRole("dialog").getByRole("button", { name: /^Negro/ }), { despues: 700 });
      await tocar(page.getByRole("button", { name: "Agregar", exact: true }), { despues: 900 });
      await tocar(page.getByRole("button", { name: "Pelotas", exact: true }).first(), { despues: 1100 });
      await tocar(page.getByRole("button", { name: "Sumar Pelotas Padel tubo x 2" }), { despues: 600 });
      await tocar(page.getByRole("button", { name: /^Cobrar/ }).first(), { despues: 1000 });
      // El precio se elige al cobrar: −10 % a la remera.
      await tocar(page.getByRole("button", { name: /Remera Dryfit Zurich/ }).first(), { despues: 800 });
      await tocar(page.getByRole("button", { name: "−10%" }), { despues: 1000 });
      await tocar(page.getByRole("button", { name: "Efectivo" }), { despues: 700 });
      await tocar(page.getByRole("button", { name: /^Cobrar \$/ }), { despues: 1800 });
    }),

  /* Escritorio: Juan en la compu */

  stock: () =>
    grabar("stock", { ...comun, email: JUAN, ruta: "/stock", dispositivo: ESCRITORIO }, async ({ page, tocar, espera }) => {
      await espera(1200);
      // Lo que menos queda, arriba: lo agotado y lo que está por terminarse.
      await tocar(page.locator("button.th-orden", { hasText: /^Stock/ }), { despues: 1800 });
      await tocar(page.getByText("Remera hombre Cotton", { exact: true }).first(), { despues: 2200 });
    }),

  compras: () =>
    grabar("compras", { ...comun, email: JUAN, ruta: "/compras", dispositivo: ESCRITORIO, final: 2200 }, async ({ page, tocar, apuntar, espera }) => {
      await espera(1200);
      await tocar(page.getByRole("button", { name: "Copiar instrucciones para Claude" }), { despues: 1400 });
      await tocar(page.getByRole("button", { name: "Importar CSV" }), { despues: 900 });
      await apuntar(page.getByRole("dialog").locator("label.archivo"));
      await page.getByRole("dialog").locator('input[type="file"]').setInputFiles(resolve(A7, "prisma/demo/compra-demo.csv"));
      await espera(1000);
      await tocar(page.getByRole("button", { name: "Revisar" }), { despues: 2200 });
      // Cargar pide confirmar con un confirm() del navegador, que no sale en el video.
      page.once("dialog", (d) => d.accept());
      await tocar(page.getByRole("button", { name: "Cargar en el catálogo" }), { despues: 2200 });
    }),

  tienda: () =>
    grabar("tienda", { ...comun, ruta: "/tienda", dispositivo: ESCRITORIO }, async ({ page, tocar, apuntar, espera }) => {
      await espera(1500);
      await tocar(page.locator('a[href="/tienda?cat=mujer&tipo=remeras"]'), { despues: 1200 });
      await apuntar(page.getByRole("combobox", { name: /Talle/ }).first());
      await page.getByRole("combobox", { name: /Talle/ }).first().selectOption("M");
      await espera(1300);
      await tocar(page.locator(".v-tarjeta, article").filter({ hasText: "Remera Florida" }).first(), { despues: 1400 });
      await tocar(page.getByRole("dialog").getByRole("button", { name: /^(Celeste|Rosa|Lila|Negro)/i }).first(), { despues: 1200 });
      await apuntar(page.getByRole("dialog").getByRole("link", { name: /WhatsApp/i }).first(), { despues: 1200 });
    }),

  numeros: () =>
    grabar("numeros", { ...comun, email: JUAN, ruta: "/resumen", dispositivo: ESCRITORIO }, async ({ page, tocar, espera }) => {
      await espera(1600);
      await tocar(page.getByRole("link", { name: "Análisis" }), { despues: 1600, traer: false });
      await tocar(page.getByRole("button", { name: "Por semana" }), { despues: 1800 });
      await tocar(page.getByRole("link", { name: "Eventos" }), { despues: 2000, traer: false });
    }),
};

const pedidas = process.argv.slice(2);
for (const [nombre, toma] of Object.entries(TOMAS)) {
  if (pedidas.length && !pedidas.includes(nombre)) continue;
  await toma();
}
