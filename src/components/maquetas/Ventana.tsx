"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const ANCHO = 560;
const BARRAS = 76; // la fila de pestañas (38) y la de la barra de direcciones (38)
const ALTO = BARRAS + 360;

/* Los grises de Chrome en tema oscuro, y la letra del sistema: la ventana es
   del navegador, no de la app. */
const CHROME = {
  marco: "bg-[#202124]",
  barra: "bg-[#35363a]",
  campo: "bg-[#202124]",
  texto: "text-[#e8eaed]",
  suave: "text-[#9aa0a6]",
  letra: "[font-family:system-ui,-apple-system,'Segoe_UI',Roboto,sans-serif]",
};

/*
 * Las pantallas de escritorio, dentro de una ventana de Chrome (#35): los
 * botones de la Mac, la pestaña con el ícono de la app, la barra de
 * direcciones. Sin el lujo de detalle del Chrome de verdad, pero con lo que
 * cualquiera espera ver en su compu.
 *
 * `direccion` es lo que se lee en la barra: lo primero en blanco (el dominio)
 * y lo demás en gris. Global Fit muestra su dominio real; A7 y Forge sólo su
 * nombre, para no inventar dominios (decisión de Juan, 11/10/2026).
 *
 * Se dibuja siempre a 560 px y, si el lugar donde cae es más angosto, se
 * achica entera para entrar.
 */
export function Ventana({
  titulo,
  logo,
  direccion,
  marco,
  children,
}: {
  titulo: string;
  logo: string;
  direccion: [string, string?];
  /** El fondo, la letra y el color del texto de la app, y la sombra: el
      borde de la ventana (#4a4b50) y el brillo del producto. */
  marco: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);

  // Antes de pintar, para que el primer cuadro ya salga del tamaño justo.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => setEscala(Math.min(1, e.contentRect.width / ANCHO)));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-[560px] min-w-0" style={{ height: ALTO * escala }}>
      {/* Fuera del flujo: dibujada a 560 px, no tiene que empujar el ancho de nadie. */}
      <div
        className={`absolute top-0 left-0 w-[560px] origin-top-left overflow-hidden rounded-[11px] ${marco}`}
        style={{ transform: escala < 1 ? `scale(${escala})` : undefined }}
      >
        <div aria-hidden="true" className={`${CHROME.letra} ${CHROME.texto}`}>
          {/* Pestañas */}
          <div className={`flex h-[38px] items-end gap-2 pr-3 pl-3.5 ${CHROME.marco}`}>
            <div className="flex h-full items-center gap-2 pr-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div className={`flex h-[31px] w-[210px] items-center gap-2 rounded-t-[9px] px-3 ${CHROME.barra}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" className="size-[14px] rounded-[3px] object-contain" />
              <span className="min-w-0 flex-1 truncate text-[11.5px]">{titulo}</span>
              <Trazo d="M7 7l10 10M17 7L7 17" className={`size-3 ${CHROME.suave}`} />
            </div>
            <Trazo d="M12 5v14M5 12h14" className={`mb-[7px] size-[15px] ${CHROME.suave}`} />
          </div>
          {/* Barra de direcciones */}
          <div className={`flex h-[38px] items-center gap-3 border-b border-black/40 px-3 ${CHROME.barra}`}>
            <Trazo d="M19 12H5M11 6l-6 6 6 6" className={`size-[15px] ${CHROME.suave}`} />
            <Trazo d="M5 12h14M13 6l6 6-6 6" className="size-[15px] text-[#5f6368]" />
            <Trazo d="M19 12a7 7 0 1 1-2.1-5M19 4v4h-4" className={`size-[14px] ${CHROME.suave}`} />
            <div className={`flex h-[27px] flex-1 items-center gap-2 rounded-full px-3 text-[12px] ${CHROME.campo}`}>
              <Trazo d="M4 8h10M18 8h2M4 16h2M10 16h10M14 6v4M8 14v4" className={`size-[13px] ${CHROME.suave}`} />
              <span className="min-w-0 flex-1 truncate">
                {direccion[0]}
                {direccion[1] && <span className={CHROME.suave}>{direccion[1]}</span>}
              </span>
              <Trazo d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" className={`size-[13px] ${CHROME.suave}`} />
            </div>
            <span className="grid size-[22px] place-items-center rounded-full bg-[#8ab4f8] text-[10px] font-semibold text-[#202124]">J</span>
            <Trazo d="M12 5.5v.01M12 12v.01M12 18.5v.01" className={`size-[15px] ${CHROME.suave}`} ancho={3} />
          </div>
        </div>
        <div className="relative h-[360px] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function Trazo({ d, className, ancho = 2 }: { d: string; className: string; ancho?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`}>
      <path d={d} />
    </svg>
  );
}
