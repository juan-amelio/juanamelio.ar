/*
 * El grabador de las pantallas de los proyectos (#44): abre la app real en
 * Chrome, entra con un usuario de demo, hace lo que dice el guion y guarda un
 * MP4 y su póster en public/grabaciones/.
 *
 * Graba con el screencast de Chrome (CDP) cuadro a cuadro, con su hora, y
 * ffmpeg los arma a 30 cuadros por segundo. El video que trae Playwright sale
 * a 1 Mbps en VP8 y la letra chica se vuelve borrosa.
 *
 * Cada guion vive en su archivo (global-fit.mjs, …) y usa lo de acá:
 * `grabar(nombre, opciones, guion)`.
 */
import { spawnSync } from "node:child_process";
import { linkSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright";

/* Lo que se mide en los marcos del sitio: la pantalla del iPhone deja
   296×586 para la app y la ventana de Chrome 560×360. Se graba a esa
   proporción, y al doble de la ventana para que en pantallas retina se lea. */
export const CELULAR = { width: 390, height: 772, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true };
export const ESCRITORIO = { width: 1120, height: 720, deviceScaleFactor: 1, isMobile: false, hasTouch: false };

/* El dedo (celular) y la flecha del mouse (escritorio): sin eso el video
   muestra cosas que cambian solas y no se entiende quién las tocó. Y fuera el
   indicador de Next, que en desarrollo se dibuja en una esquina. */
const MANO = `
(() => {
  const css = document.createElement("style");
  css.textContent = \`
    nextjs-portal { display: none !important; }
    #grabar-dedo { position: fixed; z-index: 2147483647; pointer-events: none; width: 44px; height: 44px;
      margin: -22px 0 0 -22px; border-radius: 50%; background: rgba(255,255,255,.35);
      box-shadow: 0 0 0 2px rgba(255,255,255,.55); opacity: 0; transform: scale(.6);
      transition: opacity .18s, transform .18s; }
    #grabar-dedo.toca { opacity: 1; transform: scale(1); }
    #grabar-flecha { position: fixed; z-index: 2147483647; pointer-events: none; width: 22px; height: 22px;
      left: 0; top: 0; transition: transform .55s cubic-bezier(.4,0,.2,1); }
    #grabar-flecha.aprieta svg { transform: scale(.85); transform-origin: 3px 2px; }
  \`;
  const poner = () => {
    document.head.appendChild(css);
    const dedo = document.createElement("div");
    dedo.id = "grabar-dedo";
    document.body.appendChild(dedo);
    if (!matchMedia("(pointer: coarse)").matches) {
      const flecha = document.createElement("div");
      flecha.id = "grabar-flecha";
      flecha.innerHTML = '<svg viewBox="0 0 22 22" width="22" height="22"><path d="M3 2l14 8.2-6.1 1.3L8 17.6z" fill="#fff" stroke="#000" stroke-width="1.3" stroke-linejoin="round"/></svg>';
      const pos = window.__grabarFlecha || { x: innerWidth * 0.62, y: innerHeight * 0.7 };
      flecha.style.transition = "none";
      flecha.style.transform = \`translate(\${pos.x}px, \${pos.y}px)\`;
      document.body.appendChild(flecha);
      requestAnimationFrame(() => (flecha.style.transition = ""));
    }
  };
  if (document.body) poner(); else addEventListener("DOMContentLoaded", poner);
})();
`;

const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/** Lo que el guion tiene a mano. */
function herramientas(page, celular) {
  async function centro(objetivo, traer = true) {
    const loc = typeof objetivo === "string" ? page.locator(objetivo).first() : objetivo;
    await loc.waitFor({ state: "visible", timeout: 15000 });
    // Si queda fuera de la pantalla (o pegado al borde), se lo trae con un
    // desplazamiento suave: un salto seco no lo haría nadie con el dedo.
    const afuera = traer && await loc.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top < 70 || r.bottom > innerHeight - 90;
    });
    if (afuera) {
      await loc.evaluate((el) => el.scrollIntoView({ behavior: "smooth", block: "center" }));
      await espera(900);
    }
    const caja = await loc.boundingBox();
    if (!caja) throw new Error(`No se ve: ${objetivo}`);
    return { loc, x: caja.x + caja.width / 2, y: caja.y + caja.height / 2 };
  }

  return {
    page,
    espera,
    /** Toca (celular) o hace clic (escritorio) mostrando dónde. Con
        `traer: false` no lo centra antes aunque esté cerca del borde (un
        link al pie del menú: centrarlo corre el menú entero). */
    async tocar(objetivo, { despues = 700, traer = true } = {}) {
      const { x, y } = await centro(objetivo, traer);
      if (celular) {
        await page.evaluate(({ x, y }) => {
          const d = document.getElementById("grabar-dedo");
          d.style.left = `${x}px`;
          d.style.top = `${y}px`;
          d.classList.add("toca");
        }, { x, y });
        await espera(260);
        await page.mouse.click(x, y);
        await espera(140);
        await page.evaluate(() => document.getElementById("grabar-dedo")?.classList.remove("toca"));
      } else {
        await page.evaluate(({ x, y }) => {
          window.__grabarFlecha = { x, y };
          document.getElementById("grabar-flecha").style.transform = `translate(${x}px, ${y}px)`;
        }, { x, y });
        await espera(650);
        await page.evaluate(() => document.getElementById("grabar-flecha").classList.add("aprieta"));
        await page.mouse.click(x, y);
        await espera(120);
        await page.evaluate(() => document.getElementById("grabar-flecha")?.classList.remove("aprieta"));
      }
      await espera(despues);
    },
    /** Lleva la flecha a un lugar sin hacer clic (escritorio). */
    async apuntar(objetivo, { despues = 400 } = {}) {
      const { x, y } = await centro(objetivo);
      await page.evaluate(({ x, y }) => {
        window.__grabarFlecha = { x, y };
        const f = document.getElementById("grabar-flecha");
        if (f) f.style.transform = `translate(${x}px, ${y}px)`;
      }, { x, y });
      await page.mouse.move(x, y);
      await espera(650 + despues);
    },
    /** Escribe de a una letra, como una persona. */
    async escribir(texto, { cada = 70 } = {}) {
      await page.keyboard.type(texto, { delay: cada });
    },
    /** Desplaza la página (o un contenedor) suave, como con el dedo. Con
        `eje: "x"`, al costado (el tablero de Forge corre sus columnas). */
    async desplazar(dy, { dentro = null, eje = "y", ms = 900, despues = 500 } = {}) {
      await page.evaluate(
        async ({ dy, dentro, eje, ms }) => {
          const el = dentro ? document.querySelector(dentro) : document.scrollingElement;
          const prop = eje === "x" ? "scrollLeft" : "scrollTop";
          const desde = el[prop];
          const t0 = performance.now();
          await new Promise((fin) => {
            const paso = (t) => {
              const k = Math.min(1, (t - t0) / ms);
              const suave = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
              el[prop] = desde + dy * suave;
              if (k < 1) requestAnimationFrame(paso);
              else fin();
            };
            requestAnimationFrame(paso);
          });
        },
        { dy, dentro, eje, ms },
      );
      await espera(despues);
    },
  };
}

/** Los cuadros del screencast, con su hora, para armar el video después. */
async function filmar(page, ancho, alto) {
  const cdp = await page.context().newCDPSession(page);
  const cuadros = [];
  cdp.on("Page.screencastFrame", async ({ data, metadata, sessionId }) => {
    cuadros.push({ data, t: metadata.timestamp });
    await cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
  });
  const arrancar = () =>
    cdp.send("Page.startScreencast", { format: "jpeg", quality: 92, everyNthFrame: 1, maxWidth: ancho, maxHeight: alto });
  await arrancar();
  // Chrome corta el screencast cuando cambia el documento (un goto, un
  // redirect): se lo vuelve a pedir en cada navegación del marco principal.
  page.on("framenavigated", (marco) => {
    if (marco === page.mainFrame()) arrancar().catch(() => {});
  });
  return {
    cuadros,
    async cortar() {
      await cdp.send("Page.stopScreencast");
      await espera(200);
    },
  };
}

/** Arma el MP4 desde `desde` hasta `hasta` (horas del screencast) y deja de
    póster el último cuadro. A 30 cuadros fijos: en cada instante va el último
    cuadro que había llegado (el screencast sólo manda cuando algo cambia). */
function armar(cuadros, desde, hasta, salida) {
  const tmp = mkdtempSync(join(tmpdir(), "grabar-"));
  const FPS = 30;
  const archivos = cuadros.map((c, i) => {
    const archivo = join(tmp, `c${i}.jpg`);
    writeFileSync(archivo, Buffer.from(c.data, "base64"));
    return archivo;
  });
  let j = 0;
  const total = Math.round((hasta - desde) * FPS);
  for (let n = 0; n < total; n++) {
    const t = desde + n / FPS;
    while (j + 1 < cuadros.length && cuadros[j + 1].t <= t) j++;
    linkSync(archivos[j], join(tmp, `${String(n).padStart(5, "0")}.jpg`));
  }

  const ff = (args) => {
    const r = spawnSync("ffmpeg", ["-y", "-loglevel", "error", ...args], { stdio: "inherit" });
    if (r.status !== 0) throw new Error(`ffmpeg falló: ${args.join(" ")}`);
  };
  ff([
    "-framerate", String(FPS), "-i", join(tmp, "%05d.jpg"),
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p",
    "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-tune", "animation",
    "-movflags", "+faststart", "-an", `${salida}.mp4`,
  ]);
  ff(["-i", archivos[j], "-q:v", "3", `${salida}.jpg`]);
  rmSync(tmp, { recursive: true });
}

/**
 * Graba un guion. `opciones`:
 * - base, email, ruta: dónde entra y con quién (por el login de desarrollo).
 *   Sin email entra derecho, sin sesión (la tienda de A7 es pública).
 * - dispositivo: CELULAR o ESCRITORIO.
 * - reloj: la hora que ve el navegador (la del servidor la corre reloj.cjs).
 * - antes: lo que hay que hacer antes de cada toma (resembrar la base).
 * - esquema: "dark" (default) o "light", lo que el navegador dice preferir.
 * - cookies: [{ name, value }] puestas antes de entrar (el tema de Forge).
 * - carpeta: dónde dejar el MP4 y el póster.
 * - final: cuánto se queda quieto el último cuadro.
 */
export async function grabar(nombre, opciones, guion) {
  const { base, email, ruta, dispositivo, reloj, antes, carpeta, final = 1500, esquema = "dark", cookies = [] } = opciones;
  antes?.();
  // El screencast toma la ventana y no el viewport emulado, y a 1x: la ventana
  // va del tamaño del viewport y la densidad se fuerza desde afuera.
  const navegador = await chromium.launch({
    channel: "chrome",
    args: [
      `--window-size=${dispositivo.width},${dispositivo.height}`,
      `--force-device-scale-factor=${dispositivo.deviceScaleFactor}`,
    ],
  });
  try {
    const contexto = await navegador.newContext({
      viewport: { width: dispositivo.width, height: dispositivo.height },
      deviceScaleFactor: dispositivo.deviceScaleFactor,
      isMobile: dispositivo.isMobile,
      hasTouch: dispositivo.hasTouch,
      locale: "es-AR",
      timezoneId: "America/Argentina/Buenos_Aires",
      colorScheme: esquema,
    });
    if (cookies.length) await contexto.addCookies(cookies.map((c) => ({ ...c, url: base })));
    if (reloj) await contexto.clock.install({ time: new Date(reloj) });
    await contexto.addInitScript(MANO);
    const page = await contexto.newPage();

    // Entrar y dejar la app caliente (el dev server compila al primer pedido).
    await page.goto(email ? `${base}/api/dev-login?email=${encodeURIComponent(email)}&next=${encodeURIComponent(ruta)}` : `${base}${ruta}`);
    await page.waitForLoadState("networkidle");

    const pelicula = await filmar(
      page,
      Math.round(dispositivo.width * dispositivo.deviceScaleFactor),
      Math.round(dispositivo.height * dispositivo.deviceScaleFactor),
    );
    await espera(300);
    // Se arranca de cero en la pantalla del guion, con su animación de entrada.
    await page.goto(`${base}${ruta}`);
    await page.waitForLoadState("domcontentloaded");
    // Con la hora de acá y no la de la página: el reloj del navegador está corrido.
    const desde = Date.now() / 1000;
    await page.waitForLoadState("networkidle");
    await espera(900);

    await guion(herramientas(page, dispositivo.isMobile));

    await espera(final);
    const hasta = Date.now() / 1000;
    await pelicula.cortar();

    mkdirSync(carpeta, { recursive: true });
    armar(pelicula.cuadros, desde, hasta, join(carpeta, nombre));
    console.log(`✓ ${nombre} (${(hasta - desde).toFixed(1)} s, ${pelicula.cuadros.length} cuadros)`);
  } finally {
    await navegador.close();
  }
}
