"use client";

import { useEffect, useState } from "react";
import { MAX_ANCHO, type Pantalla } from "./casos";

const AVANCE_MS = 7000;

/*
 * La galería de un caso (#27): qué logra la app, pantalla por pantalla.
 * A la izquierda la lista, a la derecha la pantalla elegida, viva. Avanza sola
 * hasta que alguien elige una; en el celular la lista pasa a ser una fila de
 * pestañas arriba de la pantalla. Los colores salen del tema del caso.
 */
export function Galeria({ pantallas }: { pantallas: Pantalla[] }) {
  const [actual, setActual] = useState(0);
  const [tocado, setTocado] = useState(false);

  useEffect(() => {
    if (tocado || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActual((a) => (a + 1) % pantallas.length), AVANCE_MS);
    return () => clearInterval(t);
  }, [tocado, pantallas.length]);

  const elegir = (i: number) => {
    setTocado(true);
    setActual(i);
  };

  return (
    <section aria-label="Pantallas" className="mx-auto max-w-7xl px-4 pb-24 sm:px-14 sm:pb-32">
      <h2 className="text-[clamp(28px,3vw,40px)] leading-tight font-extrabold tracking-[-0.02em]">Pantalla por pantalla</h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div role="tablist" aria-label="Qué hace la app" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {pantallas.map((p, i) => {
            const on = i === actual;
            return (
              <button
                key={p.titulo}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => elegir(i)}
                className={`relative shrink-0 cursor-pointer overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors duration-300 lg:shrink ${
                  on ? "bg-(--caso-superficie) shadow-[inset_0_0_0_1px_var(--caso-borde)]" : "hover:bg-(--caso-superficie)/60"
                }`}
              >
                <span className={`block text-[17px] font-bold ${on ? "" : "text-(--caso-texto-medio)"}`}>{p.titulo}</span>
                <span className={`mt-1.5 hidden max-w-[46ch] text-[15px] leading-relaxed text-(--caso-texto-medio) lg:block ${on ? "" : "lg:hidden"}`}>
                  {p.texto}
                </span>
                {on && !tocado && (
                  <span
                    key={actual}
                    aria-hidden="true"
                    className="avance absolute bottom-0 left-0 h-0.5 bg-(--caso-acento)"
                    style={{ animationDuration: `${AVANCE_MS}ms` }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <div>
          <p className="mb-6 max-w-[52ch] text-[17px] leading-relaxed text-(--caso-texto-medio) lg:hidden">{pantallas[actual].texto}</p>
          <div className="relative grid place-items-center lg:min-h-[660px]">
            {pantallas.map((p, i) => (
              <div
                key={p.titulo}
                inert={i !== actual}
                className={`col-start-1 row-start-1 w-full ${MAX_ANCHO[p.ancho]} transition-[opacity,transform] duration-600 ease-out ${
                  i === actual ? "opacity-100 [transform:none]" : "pointer-events-none opacity-0 [transform:translateY(24px)_scale(.97)]"
                }`}
              >
                {p.maqueta}
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[13px] text-(--caso-suave)">Datos de demo</p>
        </div>
      </div>
    </section>
  );
}
