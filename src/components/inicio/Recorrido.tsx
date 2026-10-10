"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CASOS, ORDEN, type Slug } from "@/components/casos/casos";
import { Marca } from "@/components/casos/Marca";

const FUENTE: Record<Slug, string> = {
  "global-fit": "font-gf",
  "a7-sports": "font-a7",
  "forge-studio": "font-fs",
};

/*
 * El recorrido de los casos (#23). En vez de tres bloques apilados, una sola
 * escena: el texto de cada caso pasa por la izquierda y, a la derecha, la
 * pantalla se queda fija y se transforma de una app a la otra. El fondo de
 * toda la escena toma la marca del caso que está en el centro de la pantalla
 * (data-caso, ver globals.css), así que bajar ES cambiar de producto.
 *
 * En el celular no hay columna fija: cada caso lleva su pantalla abajo del
 * texto, y el fondo cambia igual.
 */
export function Recorrido() {
  const [activo, setActivo] = useState<Slug>("global-fit");
  const pasos = useRef<Partial<Record<Slug, HTMLElement | null>>>({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setActivo((e.target as HTMLElement).dataset.paso as Slug);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const el of Object.values(pasos.current)) if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="trabajos"
      data-caso={activo}
      aria-label="Trabajos"
      className="recorrido relative bg-(--caso-fondo) text-(--caso-texto) transition-[background-color,color] duration-700 ease-out"
    >
      <div className="mx-auto grid max-w-7xl px-4 sm:px-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-20">
        <div>
          {ORDEN.map((slug) => {
            const caso = CASOS[slug];
            return (
              <article
                key={slug}
                data-paso={slug}
                ref={(el) => {
                  pasos.current[slug] = el;
                }}
                className={`${FUENTE[slug]} flex min-h-svh flex-col justify-center py-20 transition-opacity duration-500 lg:py-28 ${
                  activo === slug ? "opacity-100" : "lg:opacity-30"
                }`}
              >
                <p className="text-[22px]">
                  <Marca caso={slug} />
                </p>
                <h2 className="mt-5 max-w-[14ch] text-[clamp(34px,4.4vw,60px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
                  {caso.titular}
                </h2>
                <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-(--caso-texto-medio)">{caso.bajada}</p>
                <div className="mt-8 rounded-2xl bg-(--caso-superficie) px-6 py-5 shadow-[inset_4px_0_0_var(--caso-cita),inset_0_0_0_1px_var(--caso-borde)] transition-colors duration-700">
                  <p className="text-xl font-bold">{caso.decision}</p>
                  <p className="mt-2 max-w-[52ch] leading-normal text-(--caso-texto-medio)">{caso.decisionDetalle}</p>
                </div>
                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 text-[15px]">
                  {/* Desde cuándo y con qué: los dos datos que se leen de un vistazo. */}
                  {caso.datos.slice(2, 4).map(([etiqueta, valor]) => (
                    <div key={etiqueta} className="max-w-[30ch]">
                      <dt className="text-(--caso-suave)">{etiqueta}</dt>
                      <dd className="mt-1 text-[17px] leading-snug font-semibold">{valor}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={`/casos/${slug}`}
                  className="boton mt-9 self-start bg-(--caso-acento) text-(--caso-sobre-acento) transition-colors duration-700 hover:bg-(--caso-acento-hover)"
                >
                  Ver el caso de {caso.nombre}
                </Link>
                <div className={`mx-auto mt-14 w-full lg:hidden ${caso.maquetaAncha ? "max-w-140" : "max-w-80"}`}>
                  {caso.maqueta}
                </div>
              </article>
            );
          })}
        </div>

        {/* La pantalla fija: las tres apiladas, se ve la del caso activo. */}
        <div className="hidden lg:block" aria-hidden="true">
          <div className="sticky top-0 flex h-svh items-center justify-center">
            <div className="relative h-[680px] w-full max-w-[560px]">
              {ORDEN.map((slug) => (
                <div
                  key={slug}
                  className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                    activo === slug
                      ? "opacity-100 [transform:none]"
                      : `pointer-events-none opacity-0 ${
                          ORDEN.indexOf(slug) < ORDEN.indexOf(activo)
                            ? "[transform:translateY(-60px)_scale(.94)_rotateX(8deg)]"
                            : "[transform:translateY(80px)_scale(.94)_rotateX(-8deg)]"
                        }`
                  }`}
                >
                  <div className={CASOS[slug].maquetaAncha ? "w-full" : ""}>{CASOS[slug].maqueta}</div>
                </div>
              ))}
            </div>
            <p className="absolute bottom-8 text-[13px] text-(--caso-suave)">Datos de demo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
