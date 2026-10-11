"use client";

import { useCiclo, type Animable } from "./useCiclo";
import { Ventana } from "./Ventana";

/*
 * Forge Studio en su tema oscuro real (marca.css: el papel como texto, la
 * tinta como piso, el cian y el magenta un escalón más claros), con datos de
 * demo. Recorre solo: el Inicio, el tablero y el calendario.
 */

const C = {
  fondo: "bg-[#1a1918]",
  panel: "bg-[#242221]",
  panel2: "bg-[#2d2b2a]",
  borde: "border-[#403d3c]",
  tinta: "text-[#f3f2f2]",
  gris: "text-[#d0cccc]",
  suave: "text-[#a9a5a5]",
  cian: "text-[#62c5ee]",
  magenta: "text-[#ff90b1]",
};

const MARCO = `${C.fondo} ${C.tinta} font-fs shadow-[0_0_0_1px_#4a4b50,0_40px_90px_-30px_rgba(0,0,0,.7)]`;

type Vista = "inicio" | "tablero" | "calendario";
const SECCION: Record<Vista, string> = { inicio: "Inicio", tablero: "Tablero", calendario: "Calendario" };
const ORDEN: Vista[] = ["inicio", "tablero", "calendario"];

export function PantallaForge({ vista, activo = true, alTerminar }: Animable & { vista?: Vista }) {
  const { ref, paso } = useCiclo(vista ? 3 : 9, 1250, activo, alTerminar); // con vista fija, una sola vuelta
  const actual = vista ?? ORDEN[Math.floor(paso / 3)];
  const sub = paso % 3; // dentro de cada vista: lo que se mueve

  return (
    <div ref={ref} role="img" aria-label="Forge Studio: el inicio, el tablero y el calendario, con datos de demo">
      <Ventana titulo="ADJ Forge" logo="/logos/forge-studio.svg" direccion={["ADJ Forge", ` · ${SECCION[actual]}`]} marco={MARCO}>
        <div className="flex h-full">
          <nav className={`flex w-11 shrink-0 flex-col items-center gap-3 border-r ${C.borde} ${C.panel} pt-3`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/forge-studio.svg" alt="" className="size-6" />
            {(["inicio", "tablero", "calendario"] as Vista[]).map((v) => (
              <span
                key={v}
                className={`h-1.5 w-5 rounded-full transition-colors duration-300 ${v === actual ? "bg-[#62c5ee]" : "bg-[#403d3c]"}`}
              />
            ))}
          </nav>
          <div className="min-w-0 flex-1 p-5">
            {actual === "inicio" && <Inicio resaltar={sub === 2} />}
            {actual === "tablero" && <Tablero paso={sub} />}
            {actual === "calendario" && <Calendario paso={sub} />}
          </div>
        </div>
      </Ventana>
    </div>
  );
}

function Inicio({ resaltar }: { resaltar: boolean }) {
  const filas: [string, string, boolean?][] = [
    ["Proyectos con acceso", "7"],
    ["Esperan tu revisión", "2", true],
    ["Tus tareas en curso", "3"],
    ["Próxima salida", "17 oct"],
  ];
  return (
    <div className="entrar">
      <p className={`text-[9px] tracking-wide ${C.suave}`}>SÁBADO, 17 DE OCTUBRE</p>
      <p className="mt-1.5 text-[30px] leading-none font-semibold">Buenas tardes, Juan.</p>
      <p className={`mt-2 text-[11.5px] ${C.gris}`}>Dos tarjetas esperan tu revisión y tu agente está reportando.</p>
      <div className="mt-4 grid grid-cols-[1.3fr_1fr] gap-5">
        <div className="border-t-[3px] border-double border-[#a9a5a5] pt-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[14px] font-semibold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/forge-studio.svg" alt="" className="size-5" />
              ADJ Forge
            </span>
            <span
              className={`rounded-[3px] bg-[#0088b0] px-2 py-1 text-[9.5px] font-semibold text-[#f3f2f2] transition-shadow duration-300 ${
                resaltar ? "shadow-[0_0_0_3px_rgba(98,197,238,.45)]" : ""
              }`}
            >
              Abrir el tablero
            </span>
          </div>
          {filas.map(([e, v, alerta]) => (
            <div key={e} className={`mt-2 flex items-end gap-2 text-[10.5px] ${C.gris}`}>
              <span>{e}</span>
              <span className="mb-1 flex-1 border-b border-dotted border-[#6e6a6a]" />
              <span className={`font-semibold ${alerta ? C.magenta : C.tinta}`}>{v}</span>
            </div>
          ))}
        </div>
        <div className="pt-1">
          <p className={`text-[9px] tracking-wide ${C.suave}`}>TUS MÁQUINAS</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px]">
            <span className="size-1.5 rounded-full bg-[#3fb46a]" /> MacBook de Juan
          </p>
          <p className={`mt-4 text-[9px] tracking-wide ${C.suave}`}>GUÍA</p>
          <p className={`mt-1.5 text-[10.5px] ${C.cian}`}>Instalar el agente</p>
          <p className={`mt-1 text-[10.5px] ${C.cian}`}>El método: /forja</p>
        </div>
      </div>
    </div>
  );
}

const COLUMNAS = [
  { nombre: "Planeado", filete: "border-[#6e6a6a]" },
  { nombre: "En curso", filete: "border-[#62c5ee]" },
  { nombre: "En revisión", filete: "border-[#ff458e]" },
];

function Tablero({ paso }: { paso: number }) {
  // La tarjeta #42 viaja de En curso a En revisión.
  const enRevision = paso >= 1;
  return (
    <div className="entrar">
      <div className="flex items-baseline justify-between">
        <p className="text-[22px] leading-none font-semibold">Proyecto demo</p>
        <span className={`rounded-[3px] border ${C.borde} px-2 py-1 text-[9.5px]`}>Integrar</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {COLUMNAS.map((col, ci) => (
          <div key={col.nombre}>
            <p className={`border-b-2 ${col.filete} pb-1 text-[11px] font-semibold`}>{col.nombre}</p>
            <div className="mt-2 flex flex-col gap-2">
              {ci === 0 && <Tarjeta n="#45" titulo="Exportar el resumen" etiqueta="Reportes" />}
              {ci === 0 && <Tarjeta n="#46" titulo="Fotos de producto" etiqueta="Stock" />}
              {ci === 1 && !enRevision && <Tarjeta n="#42" titulo="Pantalla de pagos" etiqueta="UI" mueve />}
              {ci === 1 && <Tarjeta n="#44" titulo="Límite de intentos" etiqueta="Seguridad" />}
              {ci === 2 && enRevision && <Tarjeta n="#42" titulo="Pantalla de pagos" etiqueta="UI" mueve revision />}
              {ci === 2 && <Tarjeta n="#39" titulo="Calendario por proyecto" etiqueta="UI" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tarjeta({ n, titulo, etiqueta, mueve, revision }: { n: string; titulo: string; etiqueta: string; mueve?: boolean; revision?: boolean }) {
  return (
    <div className={`${C.panel} rounded-[4px] p-2 shadow-[0_1px_2px_rgba(0,0,0,.35)] ${mueve ? "entrar" : ""}`}>
      <div className="flex items-center justify-between">
        <span className={`text-[9px] ${C.suave}`}>{n}</span>
        {revision && <span className="rounded-[3px] bg-[#4b1528] px-1 text-[8px] text-[#ff90b1]">te espera</span>}
      </div>
      <p className="mt-1 text-[10.5px] leading-tight font-semibold">{titulo}</p>
      <span className={`mt-1.5 inline-block rounded-[3px] ${C.panel2} px-1.5 text-[8.5px] ${C.gris}`}>{etiqueta}</span>
    </div>
  );
}

const EVENTOS: Record<number, [string, string]> = {
  3: ["Salida Global Fit", "bg-[#0a303e] text-[#62c5ee]"],
  9: ["Demo al cliente", "bg-[#4b1528] text-[#ff90b1]"],
  17: ["Salida A7", "bg-[#3a3410] text-[#e8d36a]"],
  22: ["Revisión de sprint", "bg-[#0a303e] text-[#62c5ee]"],
};

function Calendario({ paso }: { paso: number }) {
  const hoy = 17;
  return (
    <div className="entrar">
      <div className="flex items-baseline justify-between">
        <p className="text-[22px] leading-none font-semibold">Octubre 2026</p>
        <span className={`text-[9.5px] ${C.gris}`}>Anterior · Hoy · Siguiente</span>
      </div>
      <div className={`mt-3 grid grid-cols-7 overflow-hidden rounded-[4px] border ${C.borde} text-[9px]`}>
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={i} className={`border-b ${C.borde} ${C.panel} py-1 text-center ${C.suave}`}>
            {d}
          </span>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const dia = i - 2;
          const ev = EVENTOS[dia];
          const visible = ev && (dia <= hoy || paso >= 1);
          return (
            <div key={i} className={`h-[52px] border-r border-b ${C.borde} p-1 ${dia < 1 || dia > 31 ? "opacity-30" : ""}`}>
              <span
                className={`inline-grid size-4 place-items-center rounded-full ${dia === hoy ? "bg-[#0088b0] font-semibold text-[#f3f2f2]" : C.gris}`}
              >
                {dia < 1 ? 28 + dia + 2 : dia > 31 ? dia - 31 : dia}
              </span>
              {visible && <p className={`entrar mt-0.5 truncate rounded-[2px] px-1 text-[8px] ${ev[1]}`}>{ev[0]}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
