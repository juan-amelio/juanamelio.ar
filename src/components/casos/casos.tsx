import type { ReactNode } from "react";
import { CajaA7 } from "@/components/inicio/CasoA7";
import { TableroForge } from "@/components/inicio/CasoForge";
import { TelefonoGlobalFit } from "@/components/inicio/CasoGlobalFit";

export type Slug = "global-fit" | "a7-sports" | "forge-studio";

export type Caso = {
  slug: Slug;
  nombre: string;
  titular: string;
  bajada: string;
  datos: [string, string][];
  maqueta: ReactNode;
  /** La maqueta de Forge es una ventana, más ancha que un teléfono. */
  maquetaAncha?: boolean;
  siguiente: Slug;
};

/* La portada de cada caso. El relato —antes, qué construí, las decisiones—
   vive en el MDX de su página; acá sólo lo que va arriba de todo. */
export const CASOS: Record<Slug, Caso> = {
  "global-fit": {
    slug: "global-fit",
    nombre: "Global Fit",
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
    maqueta: <TelefonoGlobalFit />,
    siguiente: "a7-sports",
  },
  "a7-sports": {
    slug: "a7-sports",
    nombre: "A7 Sports",
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
    maqueta: <CajaA7 />,
    siguiente: "forge-studio",
  },
  "forge-studio": {
    slug: "forge-studio",
    nombre: "Forge Studio",
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
    maqueta: <TableroForge />,
    maquetaAncha: true,
    siguiente: "global-fit",
  },
};
