"use client";

import { useEffect, useRef, useState } from "react";
import { useIdioma } from "@/idioma/Idioma";
import { LOCALE } from "@/idioma/idiomas";

const DURACION_MS = 1100;
/* Los separadores de miles de cada idioma: 1.234 en español, 1,234 en inglés. */
const FORMATO = {
  es: new Intl.NumberFormat(LOCALE.es),
  en: new Intl.NumberFormat(LOCALE.en),
};

/*
 * Un número de uso que cuenta desde 0 hasta su valor cuando aparece (#52):
 * rápido al principio y frenando al llegar. Cada vez que el caso sale de la
 * vista vuelve a 0, así al volver cuenta de nuevo.
 *
 * El HTML del servidor trae el valor final (buscadores, sin JavaScript). Al
 * empezar a observar, si el número no está a la vista pasa a 0 sin que se
 * note; si está, cuenta. Con «reducir movimiento» queda quieto en el valor.
 *
 * Abajo, invisible, va el valor final: reserva el ancho para que la
 * etiqueta de al lado no se corra mientras suben las cifras.
 */
export function Contador({ valor, className = "" }: { valor: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [actual, setActual] = useState(valor);
  const formato = FORMATO[useIdioma()];

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        cancelAnimationFrame(raf);
        if (!e.isIntersecting) {
          setActual(0);
          return;
        }
        const inicio = performance.now();
        const paso = (ahora: number) => {
          const t = Math.min(1, (ahora - inicio) / DURACION_MS);
          setActual(Math.round(valor * (1 - (1 - t) ** 3)));
          if (t < 1) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor]);

  return (
    <span ref={ref} className={`inline-grid tabular-nums ${className}`}>
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {formato.format(valor)}
      </span>
      <span aria-hidden="true" className="[grid-area:1/1]">
        {formato.format(actual)}
      </span>
      <span className="sr-only">{formato.format(valor)}</span>
    </span>
  );
}
