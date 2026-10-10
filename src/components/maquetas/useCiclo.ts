"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Avanza un paso cada `ms` mientras `activo` y el elemento esté a la vista.
 * Con «reducir movimiento» se queda quieto en el último paso, que es el que
 * mejor cuenta qué hace la app.
 */
export function useCiclo(pasos: number, ms: number, activo = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState(0);
  const [visible, setVisible] = useState(false);
  const [quieto, setQuieto] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setQuieto(consulta.matches);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (quieto || !activo || !visible) return;
    const t = setInterval(() => setPaso((p) => (p + 1) % pasos), ms);
    return () => clearInterval(t);
  }, [quieto, activo, visible, pasos, ms]);

  return { ref, paso: quieto ? pasos - 1 : paso };
}

/** Un número que llega a su valor contando, en vez de saltar. */
export function useContador(valor: number, ms = 600) {
  const [mostrado, setMostrado] = useState(valor);
  const desde = useRef(valor);
  useEffect(() => {
    const inicio = performance.now();
    const origen = desde.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - inicio) / ms);
      const suave = 1 - Math.pow(1 - k, 3);
      setMostrado(Math.round(origen + (valor - origen) * suave));
      if (k < 1) raf = requestAnimationFrame(tick);
      else desde.current = valor;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [valor, ms]);
  return mostrado;
}
