/*
 * La imagen para compartir y los íconos del sitio (#17).
 *
 *   node scripts/compartir/generar.mjs
 *
 * Arma cada imagen como una página HTML con las fuentes, la foto y los logos
 * reales, y la saca con Chrome (Playwright): así lleva los degradés y la
 * Bricolage tal cual, cosa que el ImageResponse de Next no dibuja bien. Los
 * íconos van a src/app/, donde Next los toma solo:
 *
 *   public/compartir/es.png y en.png  1200×630, lo que muestran LinkedIn y
 *                        WhatsApp, una por idioma (#22). Las declara
 *                        src/app/[lang]/layout.tsx, con su texto alternativo
 *   icon.png             512×512, la pestaña
 *   apple-icon.png       180×180, el acceso directo del iPhone
 *   favicon.ico          16, 32 y 48, para quien pida /favicon.ico (necesita
 *                        Python con Pillow)
 *
 * Si cambia la foto, los productos o el texto de abajo, se vuelve a correr.
 * Necesita internet: las fuentes vienen de Google Fonts.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const RAIZ = resolve(import.meta.dirname, "../..");
const APP = resolve(RAIZ, "src/app");
const dato = (ruta, tipo) => `data:${tipo};base64,${readFileSync(resolve(RAIZ, "public", ruta)).toString("base64")}`;

const FOTO = dato("juan.jpg", "image/jpeg");
const LOGOS = [
  ["Global Fit", dato("logos/global-fit.png", "image/png")],
  ["A7 Sports", dato("logos/a7-sports.svg", "image/svg+xml")],
  ["Forge Studio", dato("logos/forge-studio.svg", "image/svg+xml")],
];

// Los colores del sitio (globals.css): el grafito y el halo de los tres
// productos que ya usa el monograma de Foto.tsx.
const BASE = `
  @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,800&display=block");
  *{margin:0;box-sizing:border-box}
  html,body{background:#0e1012;color:#eceef0;font-family:"Bricolage Grotesque",sans-serif;-webkit-font-smoothing:antialiased}
  .halo{background:
    radial-gradient(60% 80% at 8% 0%,rgb(0 181 181/.30),transparent 60%),
    radial-gradient(55% 75% at 70% 110%,rgb(190 222 20/.20),transparent 60%),
    radial-gradient(45% 60% at 100% 0%,rgb(214 0 108/.16),transparent 65%),
    #0e1012}
`;

/* La frase de abajo del nombre, en cada idioma. */
const FRASE = {
  es: "Desarrollador de software en Mendoza. Apps que se usan todos los días.",
  en: "Software developer in Mendoza, Argentina. Apps people use every day.",
};

const COMPARTIR = (idioma) => `
  <style>${BASE}
    body{width:1200px;height:630px;overflow:hidden}
    .lienzo{position:relative;width:100%;height:100%;padding:72px 80px;display:flex;gap:64px;align-items:center}
    .texto{flex:1;min-width:0}
    h1{font-size:112px;line-height:.92;font-weight:800;letter-spacing:-.045em}
    p{margin-top:28px;font-size:34px;line-height:1.25;color:#bfc4ca;font-weight:500;letter-spacing:-.01em;max-width:21ch}
    ul{list-style:none;padding:0;margin-top:44px;display:flex;gap:28px}
    li{display:flex;align-items:center;gap:12px;font-size:24px;font-weight:500;color:#eceef0}
    li img{width:40px;height:40px;border-radius:10px;object-fit:contain}
    .foto{width:340px;height:425px;flex:none;border-radius:36px;overflow:hidden;box-shadow:inset 0 0 0 1px #3a3f45,0 40px 90px -30px rgb(0 0 0/.7)}
    .foto img{width:100%;height:100%;object-fit:cover;display:block}
    .dominio{position:absolute;left:80px;bottom:40px;font-size:24px;color:#8a9097;font-weight:500}
  </style>
  <div class="lienzo halo">
    <div class="texto">
      <h1>Juan<br>Amelio</h1>
      <p>${FRASE[idioma]}</p>
      <ul>${LOGOS.map(([n, src]) => `<li><img src="${src}" alt="">${n}</li>`).join("")}</ul>
    </div>
    <div class="foto"><img src="${FOTO}" alt=""></div>
    <span class="dominio">juanamelio.ar</span>
  </div>`;

// El ícono: el monograma de Foto.tsx en un cuadrado redondeado. Sin degradé
// adentro de las letras: a 16 px se vuelve barro.
const ICONO = (lado) => `
  <style>${BASE}
    html,body{background:transparent}
    body{width:${lado}px;height:${lado}px;overflow:hidden}
    .marco{width:100%;height:100%;border-radius:22%;display:grid;place-items:center}
    span{font-size:${lado * 0.56}px;line-height:1;font-weight:800;letter-spacing:-.06em;margin-left:-.04em}
  </style>
  <div class="marco halo"><span>JA</span></div>`;

const navegador = await chromium.launch({ channel: "chrome" });
async function sacar(html, ancho, alto, archivo, transparente = false, carpeta = APP) {
  const pagina = await navegador.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: 1 });
  await pagina.setContent(html, { waitUntil: "networkidle" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.screenshot({ path: resolve(carpeta, archivo), omitBackground: transparente });
  await pagina.close();
  console.log("✓", archivo);
}

for (const idioma of ["es", "en"]) {
  await sacar(COMPARTIR(idioma), 1200, 630, `${idioma}.png`, false, resolve(RAIZ, "public/compartir"));
}
await sacar(ICONO(512), 512, 512, "icon.png", true);
// En el iPhone el sistema redondea solo: el apple-icon va lleno, sin esquinas.
await sacar(ICONO(180).replace("border-radius:22%", "border-radius:0"), 180, 180, "apple-icon.png");
await navegador.close();

execFileSync("python3", [
  "-c",
  "import sys;from PIL import Image;Image.open(sys.argv[1]).save(sys.argv[2],sizes=[(16,16),(32,32),(48,48)])",
  resolve(APP, "icon.png"),
  resolve(APP, "favicon.ico"),
]);
console.log("✓ favicon.ico");
