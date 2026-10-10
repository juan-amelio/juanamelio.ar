"use client";

import { useState } from "react";
import { CajaA7 } from "./A7";
import { GestionA7, TiendaA7 } from "./A7Escritorio";

const VISTAS = [
  { clave: "caja", nombre: "Caja", donde: "en el celular" },
  { clave: "gestion", nombre: "Gestión", donde: "en la compu" },
  { clave: "tienda", nombre: "Tienda", donde: "para los clientes" },
] as const;

/*
 * A7 en sus tres caras (#25): la caja en el teléfono, la gestión y la tienda
 * en escritorio. La flecha gira el dispositivo: la vista actual se va de
 * costado en 3D y la siguiente entra desde el otro lado.
 */
export function DispositivosA7() {
  const [actual, setActual] = useState(0);
  const ir = (i: number) => setActual(((i % VISTAS.length) + VISTAS.length) % VISTAS.length);

  return (
    <div className="font-a7">
      <div className="relative flex items-center gap-3">
        <Flecha sentido={-1} onClick={() => ir(actual - 1)} etiqueta={`Ver ${VISTAS[(actual + 2) % 3].nombre}`} />
        <div className="relative h-[640px] w-full min-w-0 flex-1 [perspective:1600px]">
          {VISTAS.map((v, i) => {
            const rel = (((i - actual) % 3) + 3) % 3; // 0 adelante, 1 la que sigue, 2 la anterior
            const estilo =
              rel === 0
                ? "opacity-100 [transform:none]"
                : rel === 1
                  ? "pointer-events-none opacity-0 [transform:translateX(30%)_rotateY(-70deg)_scale(.85)]"
                  : "pointer-events-none opacity-0 [transform:translateX(-30%)_rotateY(70deg)_scale(.85)]";
            return (
              <div
                key={v.clave}
                inert={rel !== 0}
                className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(.3,.7,.2,1)] ${estilo}`}
              >
                {v.clave === "caja" ? (
                  <CajaA7 activo={rel === 0} />
                ) : (
                  <div className="w-full max-w-[560px]">
                    {v.clave === "gestion" ? <GestionA7 activo={rel === 0} /> : <TiendaA7 activo={rel === 0} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <Flecha sentido={1} onClick={() => ir(actual + 1)} etiqueta={`Ver ${VISTAS[(actual + 1) % 3].nombre}`} />
      </div>
      <div className="mt-3 flex justify-center gap-1.5" role="tablist" aria-label="Pantallas de A7 Sports">
        {VISTAS.map((v, i) => (
          <button
            key={v.clave}
            type="button"
            role="tab"
            aria-selected={i === actual}
            title={`${v.nombre}, ${v.donde}`}
            onClick={() => ir(i)}
            className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] whitespace-nowrap transition-colors ${
              i === actual ? "bg-a7-hueso font-bold text-a7-fondo" : "text-a7-texto-medio hover:text-a7-hueso"
            }`}
          >
            {v.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

function Flecha({ sentido, onClick, etiqueta }: { sentido: 1 | -1; onClick: () => void; etiqueta: string }) {
  return (
    <button
      type="button"
      aria-label={etiqueta}
      onClick={onClick}
      className="relative z-10 hidden size-11 shrink-0 sm:grid cursor-pointer place-items-center rounded-full border border-a7-control bg-a7-superficie text-a7-hueso transition-colors hover:border-a7-lima hover:text-a7-lima"
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d={sentido === 1 ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
      </svg>
    </button>
  );
}
