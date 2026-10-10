"use client";

import { useEffect, useRef, useState } from "react";
import { MAX_ANCHO, type Pantalla } from "./casos";
import { Icono, IconoDispositivo } from "./IconosFuncion";

/* Cuánto scroll toma cada pantalla, en alturas de ventana. */
const TRAMO = 0.75;

/*
 * La galería de un caso (#27, #29): qué logra la app, pantalla por pantalla.
 *
 * En escritorio avanza con el scroll: la galería se queda fija y cada tramo
 * de scroll pasa a la pantalla siguiente, en vez de saltar al final. Tocar
 * una de la lista lleva el scroll a su tramo. En el celular no hay tramos:
 * se elige tocando.
 * Cada fila dice con un ícono qué es y con otro si es celular o escritorio.
 */
export function Galeria({ pantallas }: { pantallas: Pantalla[] }) {
  const [actual, setActual] = useState(0);
  const [avance, setAvance] = useState(0); // dentro del tramo actual, de 0 a 1
  const [escritorio, setEscritorio] = useState(false);
  const zona = useRef<HTMLDivElement>(null);
  const n = pantallas.length;

  useEffect(() => {
    const consulta = window.matchMedia("(min-width: 1024px)");
    const aplicar = () => setEscritorio(consulta.matches);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    if (!escritorio) return;
    let raf = 0;
    const medir = () => {
      raf = 0;
      const el = zona.current;
      if (!el) return;
      const recorrido = el.offsetHeight - window.innerHeight;
      const p = Math.min(0.9999, Math.max(0, -el.getBoundingClientRect().top / Math.max(1, recorrido)));
      setActual(Math.floor(p * n));
      setAvance((p * n) % 1);
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    medir();
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(raf);
    };
  }, [escritorio, n]);

  const elegir = (i: number) => {
    const el = zona.current;
    if (!escritorio || !el) return setActual(i);
    const recorrido = el.offsetHeight - window.innerHeight;
    const arriba = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: arriba + ((i + 0.35) / n) * recorrido, behavior: "smooth" });
  };

  return (
    <section aria-label="Pantallas" className="mx-auto max-w-7xl px-4 sm:px-14">
      <h2 className="text-[clamp(28px,3vw,40px)] leading-tight font-extrabold tracking-[-0.02em]">Pantalla por pantalla</h2>
      <div ref={zona} className="relative" style={escritorio ? { height: `${(n * TRAMO + 1) * 100}svh` } : undefined}>
        <div className="grid gap-8 pt-10 pb-24 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:py-0">
          <div role="tablist" aria-label="Qué hace la app" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {pantallas.map((p, i) => {
              const on = i === actual;
              const deEscritorio = p.ancho !== "telefono";
              return (
                <button
                  key={p.titulo}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => elegir(i)}
                  className={`relative flex shrink-0 cursor-pointer items-start gap-3.5 overflow-hidden rounded-2xl px-4 py-3.5 text-left transition-colors duration-300 lg:shrink ${
                    on ? "bg-(--caso-superficie) shadow-[inset_0_0_0_1px_var(--caso-borde)]" : "hover:bg-(--caso-superficie)/60"
                  }`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                      on ? "bg-(--caso-acento) text-(--caso-sobre-acento)" : "bg-(--caso-superficie) text-(--caso-texto-medio)"
                    }`}
                  >
                    <Icono nombre={p.icono} className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1 pt-1.5">
                    <span className={`block text-[16px] leading-tight font-bold ${on ? "" : "text-(--caso-texto-medio)"}`}>{p.titulo}</span>
                    <span className={`mt-1.5 max-w-[44ch] text-[14.5px] leading-relaxed text-(--caso-texto-medio) ${on ? "hidden lg:block" : "hidden"}`}>
                      {p.texto}
                    </span>
                  </span>
                  <span className="hidden pt-2 text-(--caso-suave) lg:block" title={deEscritorio ? "Pantalla de escritorio" : "Pantalla de celular"}>
                    <IconoDispositivo escritorio={deEscritorio} className="size-[18px]" />
                    <span className="sr-only">{deEscritorio ? "En escritorio" : "En el celular"}</span>
                  </span>
                  {on && escritorio && (
                    <span aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 bg-(--caso-acento)" style={{ width: `${avance * 100}%` }} />
                  )}
                </button>
              );
            })}
          </div>
          <div>
            <p className="mb-6 max-w-[52ch] text-[17px] leading-relaxed text-(--caso-texto-medio) lg:hidden">{pantallas[actual].texto}</p>
            <div className="relative grid place-items-center lg:min-h-[640px]">
              {pantallas.map((p, i) => (
                <div
                  key={p.titulo}
                  inert={i !== actual}
                  className={`col-start-1 row-start-1 w-full ${MAX_ANCHO[p.ancho]} transition-[opacity,transform] duration-500 ease-out ${
                    i === actual
                      ? "opacity-100 [transform:none]"
                      : `pointer-events-none opacity-0 ${i < actual ? "[transform:translateY(-28px)_scale(.97)]" : "[transform:translateY(28px)_scale(.97)]"}`
                  }`}
                >
                  {p.maqueta}
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[13px] text-(--caso-suave)">Datos de demo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
