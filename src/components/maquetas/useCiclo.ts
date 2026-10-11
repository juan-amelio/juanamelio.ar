"use client";

import { useEffect, useRef, useState } from "react";

/** Lo que recibe toda maqueta animada. */
export type Animable = { activo?: boolean; alTerminar?: () => void };

/**
 * Avanza un paso cada `ms` mientras `activo` y el elemento esté a la vista.
 * Con «reducir movimiento» se queda quieto en el último paso, que es el que
 * mejor cuenta qué hace la app.
 *
 * Sin `alTerminar`, da vueltas sin fin (la portada). Con `alTerminar` (el
 * recorrido, #33), se detiene en el último paso y avisa cuando ya se vio:
 * quien la muestra decide qué viene después. Cada vez que vuelve a estar
 * activa arranca de cero, para que la animación se vea entera.
 */
export function useCiclo(pasos: number, ms: number, activo = true, alTerminar?: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState(0);
  const [visible, setVisible] = useState(false);
  const [quieto, setQuieto] = useState(false);

  // Al volver a estar activa, de cero (ajuste durante el render, sin efecto).
  const [estabaActiva, setEstabaActiva] = useState(activo);
  if (activo !== estabaActiva) {
    setEstabaActiva(activo);
    if (activo) setPaso(0);
  }

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

  const conFin = alTerminar !== undefined;
  useEffect(() => {
    if (quieto || !activo || !visible) return;
    const t = setInterval(() => setPaso((p) => (conFin ? Math.min(p + 1, pasos - 1) : (p + 1) % pasos)), ms);
    return () => clearInterval(t);
  }, [quieto, activo, visible, pasos, ms, conFin]);

  // El último paso también se deja ver su tiempo antes de avisar.
  const aviso = useRef(alTerminar);
  useEffect(() => {
    aviso.current = alTerminar;
  });
  useEffect(() => {
    if (!conFin || quieto || !activo || !visible || paso !== pasos - 1) return;
    const t = setTimeout(() => aviso.current?.(), ms);
    return () => clearTimeout(t);
  }, [conFin, quieto, activo, visible, paso, pasos, ms]);

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
