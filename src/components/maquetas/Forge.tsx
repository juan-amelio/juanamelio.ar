"use client";

import { useCiclo } from "./useCiclo";

const CHEQUEOS = ["Lint", "Tipos", "Pruebas", "Build"];

/* Una tarjeta de Forge Studio con datos de demo. Viva: pasan los chequeos,
   la aprueba una persona y recién ahí llega a producción. */
export function TableroForge({ activo = true }: { activo?: boolean }) {
  const { ref, paso } = useCiclo(7, 1100, activo);
  const chequeos = Math.min(paso, 4);
  const aprobada = paso >= 5;
  const enProduccion = paso >= 6;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Una tarjeta del tablero de Forge Studio pasando de En revisión a En producción, con datos de demo"
      className="overflow-hidden rounded-[14px] bg-fs-panel font-fs text-fs-tinta shadow-[0_0_0_1px_var(--color-fs-borde),0_40px_80px_-40px_rgba(32,30,29,.35)]"
    >
      <div className="flex items-center gap-2 border-b border-fs-borde bg-fs-panel-2 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-fs-borde" />
        ))}
        <span className="ml-3 text-[13px] text-fs-gris-suave">Tablero del proyecto demo</span>
      </div>
      <div className="flex flex-col gap-3 p-4.5">
        <div className="flex items-baseline justify-between">
          <span key={String(enProduccion)} className="entrar font-semibold">
            {enProduccion ? "En producción" : "En revisión"}
          </span>
          <span className="text-[13px] text-fs-gris-suave">#42</span>
        </div>
        <div
          className={`rounded-[10px] bg-white p-4 transition-shadow duration-500 ${
            aprobada ? "shadow-[0_0_0_2px_#2f8f4e]" : "shadow-[0_0_0_1px_var(--color-fs-borde)]"
          }`}
        >
          <div className="flex justify-between gap-3">
            <span className="text-[13px] text-fs-gris-suave">#42</span>
            <span className="rounded-md bg-fs-cian-suave px-2 py-0.5 text-xs font-semibold text-fs-cian-texto">Producto/UI</span>
          </div>
          <p className="mt-1.5 text-lg font-semibold">Pantalla de pagos del socio</p>
          <p className="mt-2.5 text-[13px] text-fs-gris-suave">Rama tarea/42-pantalla-de-pagos y pull request abierto</p>
          <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] text-fs-gris">
            {CHEQUEOS.map((c, i) => (
              <span key={c} className={`flex items-center gap-1 transition-opacity duration-300 ${i < chequeos ? "" : "opacity-35"}`}>
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={i < chequeos ? "var(--color-fs-cian-texto)" : "currentColor"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  {i < chequeos ? <path d="M5 12l5 5L20 7" /> : <circle cx="12" cy="12" r="6" />}
                </svg>
                {c}
              </span>
            ))}
          </div>
          <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-fs-hairline pt-3">
            <span className="text-[13px] text-fs-gris">
              {enProduccion ? "Publicada" : aprobada ? "Aprobada por su revisor" : "Falta la aprobación de 1 revisor"}
            </span>
            <span
              key={enProduccion ? "p" : aprobada ? "a" : "e"}
              className={`entrar rounded-full px-3 py-1.5 text-xs font-semibold text-white ${
                enProduccion ? "bg-[#2f8f4e]" : aprobada ? "bg-fs-cian-texto" : "bg-fs-magenta-oscuro"
              }`}
            >
              {enProduccion ? "En producción" : aprobada ? "Aprobada" : "Esperando"}
            </span>
          </div>
        </div>
        <div className="rounded-[10px] bg-white p-4 opacity-70 shadow-[0_0_0_1px_var(--color-fs-borde)]">
          <div className="flex justify-between gap-3">
            <span className="text-[13px] text-fs-gris-suave">#43</span>
            <span className="rounded-md bg-fs-panel-2 px-2 py-0.5 text-xs font-semibold text-fs-gris">Seguridad</span>
          </div>
          <p className="mt-1.5 text-lg font-semibold">Límite de intentos en el login</p>
        </div>
      </div>
    </div>
  );
}
