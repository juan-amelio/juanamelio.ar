import type { ReactNode } from "react";
import { CajaA7 } from "@/components/maquetas/A7";
import { GestionA7, TiendaA7 } from "@/components/maquetas/A7Escritorio";
import { DispositivosA7 } from "@/components/maquetas/DispositivosA7";
import { TableroForge } from "@/components/maquetas/Forge";
import { PantallaForge } from "@/components/maquetas/ForgeEscritorio";
import { TelefonoGlobalFit } from "@/components/maquetas/GlobalFit";
import { AsistenciaGF, EntrenoGF, ReservarGF } from "@/components/maquetas/GlobalFitMas";

export type Slug = "global-fit" | "a7-sports" | "forge-studio";

export type Caso = {
  slug: Slug;
  nombre: string;
  /** Una línea: qué es, para la tarjeta de la portada. */
  corto: string;
  /** El logo real del producto, copiado de su repo a public/logos. */
  logo: string;
  titular: string;
  bajada: string;
  datos: [string, string][];
  /** La decisión que se destaca en el recorrido del inicio. */
  decision: string;
  decisionDetalle: string;
  maqueta: ReactNode;
  /** Cuánto ocupa la maqueta: un teléfono, una ventana, o A7 con sus flechas. */
  ancho: Ancho;
  /** Las pantallas de la galería de su página, una por cosa que logra la app. */
  galeria: Pantalla[];
  siguiente: Slug;
};

export type Ancho = "telefono" | "ventana" | "dispositivos";
export type Pantalla = { titulo: string; texto: string; maqueta: ReactNode; ancho: Ancho };

/** El ancho máximo de cada tipo de maqueta, en clases. */
export const MAX_ANCHO: Record<Ancho, string> = {
  telefono: "max-w-80",
  ventana: "max-w-140",
  dispositivos: "max-w-[680px]",
};

/* La portada de cada caso. El relato —antes, qué construí, las decisiones—
   vive en el MDX de su página; acá sólo lo que va arriba de todo. */
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
    datos: [
      ["Para", "Global Fit, un gimnasio de Mendoza"],
      ["Mi rol", "De punta a punta: relevamiento con el dueño, diseño, desarrollo, deploy y soporte"],
      ["En producción", "Desde el 12/09/2026, en globalfit.ar"],
      ["Con", "Next.js, TypeScript, PostgreSQL, Prisma, Auth.js, Tailwind, Vercel y Sentry"],
      ["Pruebas", "Más de 500 casos automáticos, con concurrencia contra un Postgres real"],
    ],
    decision: "Los datos de salud no son un campo más.",
    decisionDetalle:
      "Consentimiento antes de guardar nada, cada profesor ve solo a sus alumnos y al año de la baja se borran solos, como pide la Ley 25.326.",
    maqueta: <TelefonoGlobalFit />,
    ancho: "telefono",
    galeria: [
      {
        titulo: "Reservar una clase",
        texto: "El socio elige el día y la clase, y ve cuántos lugares quedan. El cupo se respeta aunque dos reserven en el mismo segundo.",
        maqueta: <ReservarGF />,
        ancho: "telefono",
      },
      {
        titulo: "Su semana, de un vistazo",
        texto: "La próxima clase, cuántas lleva en la semana y si la cuota está por vencer.",
        maqueta: <TelefonoGlobalFit />,
        ancho: "telefono",
      },
      {
        titulo: "Tomar asistencia",
        texto: "El profesor ve solo a sus alumnos, los marca en la clase, y sabe antes de empezar quién reportó dolor.",
        maqueta: <AsistenciaGF />,
        ancho: "telefono",
      },
      {
        titulo: "Cargar el entrenamiento",
        texto: "El socio anota qué trabajó y ve su racha. Es un diario personal: no lo ven ni el profe ni el dueño.",
        maqueta: <EntrenoGF />,
        ancho: "telefono",
      },
    ],
    siguiente: "a7-sports",
  },
  "a7-sports": {
    slug: "a7-sports",
    nombre: "A7 Sports",
    corto: "Ventas, stock y caja de una tienda de pádel",
    logo: "/logos/a7-sports.svg",
    titular: "De la planilla a la caja.",
    bajada:
      "Ventas, stock, caja y una tienda pública para un emprendimiento familiar de pádel. La usan cinco personas desde el celular, en el local y en los eventos.",
    datos: [
      ["Para", "A7 Sports, el emprendimiento de pádel de mi familia"],
      ["Mi rol", "De punta a punta, y además soy uno de los que vende"],
      ["En producción", "Desde el 04/10/2026; antes, sobre una planilla de Google"],
      ["Con", "Next.js, TypeScript, PostgreSQL, Prisma, Auth.js, Vitest, Vercel y Sentry"],
      ["Pruebas", "Más de 150 casos automáticos"],
    ],
    decision: "Tocar dos veces −10% sigue siendo −10%.",
    decisionDetalle:
      "El descuento se calcula siempre contra el precio de lista y nunca contra el de pantalla. El precio que se cobró queda guardado.",
    maqueta: <DispositivosA7 />,
    ancho: "dispositivos",
    galeria: [
      {
        titulo: "Vender en la caja",
        texto: "Desde el celular, en el local o en un evento: las líneas entran, la promo se elige y el total se cuenta solo.",
        maqueta: <CajaA7 />,
        ancho: "telefono",
      },
      {
        titulo: "Manejar el stock",
        texto: "Cada venta descuenta al momento. Lo que se está por terminar se marca antes de que falte.",
        maqueta: <GestionA7 vista="stock" />,
        ancho: "ventana",
      },
      {
        titulo: "Cargar las compras",
        texto: "Claude lee el PDF del proveedor y devuelve un archivo; la app lo revisa antes de cargarlo y recalcula el costo.",
        maqueta: <GestionA7 vista="compras" />,
        ancho: "ventana",
      },
      {
        titulo: "La tienda para los clientes",
        texto: "Una vidriera pública que se filtra por categoría y talle, y termina en una consulta por WhatsApp.",
        maqueta: <TiendaA7 />,
        ancho: "ventana",
      },
    ],
    siguiente: "forge-studio",
  },
  "forge-studio": {
    slug: "forge-studio",
    nombre: "Forge Studio",
    corto: "El tablero donde trabaja mi equipo",
    logo: "/logos/forge-studio.svg",
    titular: "Del Trello a un tablero con revisión humana.",
    bajada:
      "El tablero donde trabaja mi equipo, con un agente que corre en la máquina de cada desarrollador y un plugin para trabajar con IA sin perder el control.",
    datos: [
      ["Para", "El equipo de ADJ Solutions"],
      ["Mi rol", "Lo diseñé, lo construí y lo uso todos los días"],
      ["En uso", "Desde el 09/09/2026, para todos los proyectos"],
      ["Con", "Next.js, TypeScript, PostgreSQL, Prisma, Auth.js, un agente en Node y un plugin de Claude Code"],
      ["Pruebas", "Más de 150 casos automáticos, incluidos los candados del plugin"],
    ],
    decision: "Por la red viaja un verbo, nunca un comando.",
    decisionDetalle:
      "Qué significa cada pedido lo decide la configuración local. Aunque el servidor cayera en malas manos, no puede hacer que tu compu ejecute otra cosa.",
    maqueta: <PantallaForge />,
    ancho: "ventana",
    galeria: [
      {
        titulo: "Lo que te espera hoy",
        texto: "Al entrar, el Inicio dice qué tarjetas esperan tu revisión, qué tenés en curso y si tu agente está reportando.",
        maqueta: <PantallaForge vista="inicio" />,
        ancho: "ventana",
      },
      {
        titulo: "El tablero",
        texto: "Seis columnas, de Backlog a En producción. Las tarjetas avanzan con el trabajo y el magenta marca lo que espera a una persona.",
        maqueta: <PantallaForge vista="tablero" />,
        ancho: "ventana",
      },
      {
        titulo: "La revisión",
        texto: "Lint, tipos, pruebas y build antes de entregar, y la aprobación de una persona antes de llegar a producción.",
        maqueta: <TableroForge />,
        ancho: "ventana",
      },
      {
        titulo: "El calendario",
        texto: "Las salidas y las fechas de todos los proyectos en un mes, cada uno con su color.",
        maqueta: <PantallaForge vista="calendario" />,
        ancho: "ventana",
      },
    ],
    siguiente: "global-fit",
  },
};
