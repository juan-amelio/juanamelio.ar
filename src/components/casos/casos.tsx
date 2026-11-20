import type { ReactNode } from "react";
import { TelefonoGrabado, VentanaGrabada } from "@/components/maquetas/Grabacion";
import type { Idioma } from "@/idioma/idiomas";
import { TEXTOS } from "@/idioma/textos";
import type { IconoFuncion } from "./IconosFuncion";

export type Slug = "global-fit" | "a7-sports" | "forge-studio";

export type Caso = {
  slug: Slug;
  nombre: string;
  /** Una línea: qué es, para la tarjeta de la portada. */
  corto: string;
  /** El logo real del producto, copiado de su repo a public/logos. */
  logo: string;
  /** La versión para fondo claro, si la marca tiene una distinta. */
  logoClaro?: string;
  /** Un enlace a lo real, cuando es público: la tienda de A7 (#51). Se ve
      siempre en el encabezado del caso. */
  enlace?: { texto: string; href: string };
  titular: string;
  bajada: string;
  /** Lo que muestra que la app está viva: números reales de producción. */
  numeros: Numero[];
  /** Lo que logra la app, pantalla por pantalla, según desde dónde se use. Un
      dispositivo sin pantallas no aparece en el selector (Forge no tiene celular). */
  funciones: Record<Dispositivo, Pantalla[]>;
};

export type Dispositivo = "celular" | "escritorio";
export type Ancho = "telefono" | "ventana";
/** `maqueta` recibe si está a la vista (las que no se ven no animan) y a quién
    avisar cuando terminó su animación, para pasar a la siguiente (#33). */
export type Pantalla = {
  titulo: string;
  texto: string;
  icono: IconoFuncion;
  maqueta: (activo: boolean, alTerminar?: () => void) => ReactNode;
};

/** Un número de uso real, sacado de la base de producción de cada app. */
/** `valor` en cifras: el sitio lo cuenta desde 0 al mostrarlo (#52). */
export type Numero = { valor: number; etiqueta: string };

/** El ancho máximo de cada dispositivo, en clases. */
export const MAX_ANCHO: Record<Dispositivo, string> = {
  celular: "max-w-80",
  escritorio: "max-w-140",
};

export const ORDEN: Slug[] = ["global-fit", "a7-sports", "forge-studio"];

/** Las grabaciones de Global Fit (scripts/grabar/global-fit.mjs). */
const GF = "/grabaciones/global-fit";
/** Las de A7 Sports (scripts/grabar/a7-sports.mjs). */
const A7 = "/grabaciones/a7-sports";
const FS = "/grabaciones/forge-studio";

/* Una función, sin texto: el ícono y cómo se dibuja su grabación. La
   etiqueta (lo que leen los lectores de pantalla) llega del idioma. */
type Grabada = {
  icono: IconoFuncion;
  dibujar: (etiqueta: string, activo: boolean, alTerminar?: () => void) => ReactNode;
};

const telefono = (icono: IconoFuncion, src: string, extra: { app?: "a7-sports"; intro?: boolean } = {}): Grabada => ({
  icono,
  dibujar: (etiqueta, activo, alTerminar) => (
    <TelefonoGrabado {...extra} src={src} etiqueta={etiqueta} activo={activo} alTerminar={alTerminar} />
  ),
});

const ventana = (
  icono: IconoFuncion,
  src: string,
  ruta: string,
  extra: { app?: "a7-sports" | "forge-studio"; enlace?: string } = {},
): Grabada => ({
  icono,
  dibujar: (etiqueta, activo, alTerminar) => (
    <VentanaGrabada {...extra} src={src} ruta={ruta} etiqueta={etiqueta} activo={activo} alTerminar={alTerminar} />
  ),
});

/* Lo que no cambia con el idioma: nombre, logos, enlaces, números y
   grabaciones. Los textos están en src/idioma, en el mismo orden.

   Los números de cada caso salen de la base de producción de cada app,
   contados el 19/11/2026 (#30) con consultas de sólo lectura, salvo donde el
   comentario dice otra cosa. Son una foto: se actualizan a mano. */
const BASE: Record<
  Slug,
  {
    nombre: string;
    logo: string;
    logoClaro?: string;
    enlace?: string;
    numeros: number[];
    funciones: Record<Dispositivo, Grabada[]>;
  }
> = {
  "global-fit": {
    nombre: "Global Fit",
    logo: "/logos/global-fit.png",
    // Socios: valor fijado por Juan el 19/11/2026, no sale del conteo.
    // Clases: las de la semana, sin las canceladas.
    numeros: [97, 48],
    funciones: {
      celular: [
        telefono("semana", `${GF}/inicio`),
        telefono("reservar", `${GF}/reservar`),
        telefono("asistencia", `${GF}/asistencia`),
        telefono("entreno", `${GF}/entreno`),
        telefono("pagos", `${GF}/pagos`),
      ],
      escritorio: [
        ventana("inicio", `${GF}/panel-inicio`, "/admin"),
        ventana("socios", `${GF}/socios`, "/admin/socios"),
        ventana("calendario", `${GF}/semana`, "/admin/calendario"),
        ventana("numeros", `${GF}/metricas`, "/admin/estadisticas"),
      ],
    },
  },
  "a7-sports": {
    nombre: "A7 Sports",
    logo: "/logos/a7-sports.svg",
    logoClaro: "/logos/a7-sports-claro.svg",
    enlace: "https://a7sports.com.ar/tienda",
    // Todas las ventas registradas, sin las canceladas (desde el 29/07/2026); eventos de los últimos 12 meses.
    numeros: [366, 10],
    funciones: {
      celular: [telefono("caja", `${A7}/caja`, { app: "a7-sports", intro: true })],
      escritorio: [
        ventana("stock", `${A7}/stock`, "/stock", { app: "a7-sports" }),
        ventana("compras", `${A7}/compras`, "/compras", { app: "a7-sports" }),
        ventana("tienda", `${A7}/tienda`, "/tienda", { app: "a7-sports", enlace: "https://a7sports.com.ar/tienda" }),
        ventana("numeros", `${A7}/numeros`, "/analisis", { app: "a7-sports" }),
      ],
    },
  },
  "forge-studio": {
    nombre: "Forge Studio",
    logo: "/logos/forge-studio.svg",
    // Proyectos activos del board; todas las tarjetas; las que están En producción.
    numeros: [5, 467, 294],
    funciones: {
      celular: [],
      escritorio: [
        ventana("inicio", `${FS}/inicio`, " · Inicio", { app: "forge-studio" }),
        ventana("tablero", `${FS}/tablero`, " · Tareas", { app: "forge-studio" }),
        ventana("revision", `${FS}/revision`, " · Tareas · #7", { app: "forge-studio" }),
        ventana("calendario", `${FS}/calendario`, " · Calendario", { app: "forge-studio" }),
      ],
    },
  },
};

function armar(idioma: Idioma): Record<Slug, Caso> {
  const textos = TEXTOS[idioma].casos;
  return Object.fromEntries(
    ORDEN.map((slug): [Slug, Caso] => {
      const base = BASE[slug];
      const t = textos[slug];
      return [
        slug,
        {
          slug,
          nombre: base.nombre,
          corto: t.corto,
          logo: base.logo,
          logoClaro: base.logoClaro,
          enlace: base.enlace && t.enlace ? { texto: t.enlace, href: base.enlace } : undefined,
          titular: t.titular,
          bajada: t.bajada,
          numeros: base.numeros.map((valor, i) => ({ valor, etiqueta: t.numeros[i] })),
          funciones: {
            celular: base.funciones.celular.map((g, i) => pantalla(g, t.funciones.celular[i])),
            escritorio: base.funciones.escritorio.map((g, i) => pantalla(g, t.funciones.escritorio[i])),
          },
        },
      ];
    }),
  ) as Record<Slug, Caso>;
}

function pantalla(g: Grabada, t: { titulo: string; texto: string; etiqueta: string }): Pantalla {
  return { titulo: t.titulo, texto: t.texto, icono: g.icono, maqueta: (activo, alTerminar) => g.dibujar(t.etiqueta, activo, alTerminar) };
}

/** Los casos con los textos de cada idioma. */
export const CASOS_EN: Record<Idioma, Record<Slug, Caso>> = { es: armar("es"), en: armar("en") };

/** Para lo que no depende del idioma (los logos de Marca.tsx). */
export const CASOS = CASOS_EN.es;
