import type { ReactNode } from "react";
import { CajaA7 } from "@/components/maquetas/A7";
import { GestionA7, TiendaA7 } from "@/components/maquetas/A7Escritorio";
import { TableroForge } from "@/components/maquetas/Forge";
import { PantallaForge } from "@/components/maquetas/ForgeEscritorio";
import { TelefonoGlobalFit } from "@/components/maquetas/GlobalFit";
import { PanelGF } from "@/components/maquetas/GlobalFitEscritorio";
import { AsistenciaGF, EntrenoGF, PagosGF, ReservarGF } from "@/components/maquetas/GlobalFitMas";
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
export type Numero = { valor: string; etiqueta: string };

/** El ancho máximo de cada dispositivo, en clases. */
export const MAX_ANCHO: Record<Dispositivo, string> = {
  celular: "max-w-80",
  escritorio: "max-w-140",
};

/* Los números de cada caso son de ejemplo hasta que se junten los reales de
   producción (#30). */
export const ORDEN: Slug[] = ["global-fit", "a7-sports", "forge-studio"];

export const CASOS: Record<Slug, Caso> = {
  "global-fit": {
    slug: "global-fit",
    nombre: "Global Fit",
    corto: "La app de un gimnasio de Mendoza",
    logo: "/logos/global-fit.png",
    titular: "Del cuaderno al celular.",
    bajada:
      "La app de un gimnasio de Mendoza. Los socios reservan desde el celular, los profesores toman asistencia en la clase y el dueño maneja socios, pagos y horarios desde un panel.",
    numeros: [
      { valor: "XX", etiqueta: "socios activos" },
      { valor: "XX", etiqueta: "clases por semana" },
      { valor: "XX", etiqueta: "reservas en el último mes" },
    ],
    funciones: {
      celular: [
        {
          titulo: "Su semana, de un vistazo",
          icono: "semana",
          texto: "La próxima clase, cuántas lleva en la semana y si la cuota está por vencer.",
          maqueta: (activo, alTerminar) => <TelefonoGlobalFit activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Reservar una clase",
          icono: "reservar",
          texto: "El socio elige el día y la clase, y ve cuántos lugares quedan. El cupo se respeta aunque dos reserven en el mismo segundo.",
          maqueta: (activo, alTerminar) => <ReservarGF activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Tomar asistencia",
          icono: "asistencia",
          texto: "El profesor ve solo a sus alumnos, los marca en la clase, y sabe antes de empezar quién reportó dolor.",
          maqueta: (activo, alTerminar) => <AsistenciaGF activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Cargar el entrenamiento",
          icono: "entreno",
          texto: "El socio anota qué trabajó y ve su racha. Es un diario personal: no lo ven ni el profe ni el dueño.",
          maqueta: (activo, alTerminar) => <EntrenoGF activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Confirmar los pagos",
          icono: "pagos",
          texto: "El socio avisa que transfirió y el dueño lo confirma de un toque. Sabe quién está al día sin cruzar mensajes.",
          maqueta: (activo, alTerminar) => <PagosGF activo={activo} alTerminar={alTerminar} />,
        },
      ],
      escritorio: [
        {
          titulo: "Lo que pide atención hoy",
          icono: "inicio",
          texto: "Al entrar, el dueño ve qué espera de él: socios para aprobar, pagos para confirmar y si falta generar la semana.",
          maqueta: (activo, alTerminar) => <PanelGF vista="inicio" activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Los socios",
          icono: "socios",
          texto: "Quién está al día, quién debe y quién pidió entrar. Se aprueba y se confirma desde la misma lista.",
          maqueta: (activo, alTerminar) => <PanelGF vista="socios" activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Armar la semana",
          icono: "calendario",
          texto: "La plantilla de horarios y cupos se arma una vez; cada semana se genera con un botón y los socios ya pueden reservar.",
          maqueta: (activo, alTerminar) => <PanelGF vista="plantilla" activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Las métricas",
          icono: "numeros",
          texto: "Asistencias, ocupación de cada horario y cómo se reparten los planes, sin abrir una planilla.",
          maqueta: (activo, alTerminar) => <PanelGF vista="metricas" activo={activo} alTerminar={alTerminar} />,
        },
      ],
    },
  },
  "a7-sports": {
    slug: "a7-sports",
    nombre: "A7 Sports",
    corto: "Ventas, stock y caja de una tienda de pádel",
    logo: "/logos/a7-sports.svg",
    logoClaro: "/logos/a7-sports-claro.svg",
    titular: "De la planilla a la caja.",
    bajada:
      "Ventas, stock, caja y una tienda pública para un emprendimiento familiar de pádel. La usan cinco personas desde el celular, en el local y en los eventos.",
    numeros: [
      { valor: "XX", etiqueta: "ventas en el último mes" },
      { valor: "XX", etiqueta: "eventos en el último año" },
    ],
    funciones: {
      celular: [
        {
          titulo: "Vender en la caja",
          icono: "caja",
          texto: "Desde el celular, en el local o en un evento: las líneas entran, la promo se elige y el total se cuenta solo.",
          maqueta: (activo, alTerminar) => <CajaA7 activo={activo} alTerminar={alTerminar} />,
        },
      ],
      escritorio: [
        {
          titulo: "Manejar el stock",
          icono: "stock",
          texto: "Cada venta descuenta al momento. Lo que se está por terminar se marca antes de que falte.",
          maqueta: (activo, alTerminar) => <GestionA7 vista="stock" activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Cargar las compras",
          icono: "compras",
          texto: "Claude lee el PDF del proveedor y devuelve un archivo; la app lo revisa antes de cargarlo y recalcula el costo.",
          maqueta: (activo, alTerminar) => <GestionA7 vista="compras" activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "La tienda para los clientes",
          icono: "tienda",
          texto: "Una vidriera pública que se filtra por categoría y talle, y termina en una consulta por WhatsApp.",
          maqueta: (activo, alTerminar) => <TiendaA7 activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "Ver los números",
          icono: "numeros",
          texto: "Lo que se vendió en el mes, por semana y cuánto salió de los eventos, sin abrir una planilla.",
          maqueta: (activo, alTerminar) => <GestionA7 vista="resumen" activo={activo} alTerminar={alTerminar} />,
        },
      ],
    },
  },
  "forge-studio": {
    slug: "forge-studio",
    nombre: "Forge Studio",
    corto: "El tablero donde trabaja mi equipo",
    logo: "/logos/forge-studio.svg",
    titular: "Del Trello a un tablero con revisión humana.",
    bajada:
      "El tablero donde trabaja mi equipo, con un agente que corre en la máquina de cada desarrollador y un plugin para trabajar con IA sin perder el control.",
    numeros: [
      { valor: "XX", etiqueta: "proyectos" },
      { valor: "XX", etiqueta: "tareas en el tablero" },
      { valor: "XX", etiqueta: "llegaron a producción" },
    ],
    funciones: {
      celular: [],
      escritorio: [
        {
          titulo: "Lo que te espera hoy",
          icono: "inicio",
          texto: "Al entrar, el Inicio dice qué tarjetas esperan tu revisión, qué tenés en curso y si tu agente está reportando.",
          maqueta: (activo, alTerminar) => <PantallaForge vista="inicio" activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "El tablero",
          icono: "tablero",
          texto: "Seis columnas, de Backlog a En producción. Las tarjetas avanzan con el trabajo y el magenta marca lo que espera a una persona.",
          maqueta: (activo, alTerminar) => <PantallaForge vista="tablero" activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "La revisión",
          icono: "revision",
          texto: "Lint, tipos, pruebas y build antes de entregar, y la aprobación de una persona antes de llegar a producción.",
          maqueta: (activo, alTerminar) => <TableroForge activo={activo} alTerminar={alTerminar} />,
        },
        {
          titulo: "El calendario",
          icono: "calendario",
          texto: "Las salidas y las fechas de todos los proyectos en un mes, cada uno con su color.",
          maqueta: (activo, alTerminar) => <PantallaForge vista="calendario" activo={activo} alTerminar={alTerminar} />,
        },
      ],
    },
  },
};
