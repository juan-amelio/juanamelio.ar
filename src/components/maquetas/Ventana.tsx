"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

const ANCHO = 560;
const ALTO = 397; // la barra (37) más el contenido (360)

/* El marco de una app de escritorio: la barra de la ventana y el contenido.
   Se dibuja siempre a 560 px y, si el lugar donde cae es más angosto, se
   achica entera para entrar (sin esto se salía de la columna a 1024 px). */
export function Ventana({
  titulo,
  tono,
  children,
}: {
  titulo: string;
  tono: { marco: string; barra: string; texto: string; punto: string };
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
        className={`absolute top-0 left-0 w-[560px] origin-top-left overflow-hidden rounded-[14px] ${tono.marco}`}
        style={{ transform: escala < 1 ? `scale(${escala})` : undefined }}
      >
        <div className={`flex items-center gap-2 px-4 py-2.5 ${tono.barra}`}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={`size-2.5 rounded-full ${tono.punto}`} />
          ))}
          <span className={`ml-3 truncate text-[12px] ${tono.texto}`}>{titulo}</span>
        </div>
        <div className="relative h-[360px] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
