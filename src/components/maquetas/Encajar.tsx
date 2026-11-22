"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/*
 * Achica lo de adentro, entero, hasta que entre en el lugar que le toca (#62).
 * Es para el iPhone en el celular: está dibujado a 320 px de ancho y unos
 * 675 de alto, y en la pantalla de un teléfono no entraba junto con el
 * titular y los controles. Ocupa lo que le deje su contenedor (flex-1) y
 * nunca agranda.
 */
export function Encajar({ children }: { children: ReactNode }) {
  const caja = useRef<HTMLDivElement>(null);
  const hijo = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);

  // Antes de pintar, para que el primer cuadro ya salga del tamaño justo.
  useLayoutEffect(() => {
    const c = caja.current;
    const h = hijo.current;
    if (!c || !h) return;
    // offsetWidth/Height son el tamaño sin la escala: no se persigue a sí misma.
    const medir = () => setEscala(Math.min(1, c.clientWidth / h.offsetWidth, c.clientHeight / h.offsetHeight));
    const obs = new ResizeObserver(medir);
    obs.observe(c);
    obs.observe(h);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={caja} className="relative min-h-0 flex-1">
      <div
        ref={hijo}
        className="absolute top-1/2 left-1/2 w-max"
        style={{ transform: `translate(-50%, -50%) scale(${escala})` }}
      >
        {children}
      </div>
    </div>
  );
}
