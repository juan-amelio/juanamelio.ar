"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CASOS, MAX_ANCHO, ORDEN, type Dispositivo, type Slug } from "@/components/casos/casos";
import { Icono, IconoDispositivo } from "@/components/casos/IconosFuncion";
import { Marca } from "@/components/casos/Marca";

/* Forge va en su tema oscuro real: después de dos marcas negras, pasar al
   papel era un salto brusco (#26). */
const TEMA: Record<Slug, string> = {
  "global-fit": "global-fit",
  "a7-sports": "a7-sports",
  "forge-studio": "forge-oscuro",
};

const FUENTE: Record<Slug, string> = {
  "global-fit": "font-gf",
  "a7-sports": "font-a7",
  "forge-studio": "font-fs",
};

const DISPOSITIVOS: Dispositivo[] = ["celular", "escritorio"];

type Eleccion = { dispositivo: Dispositivo; indice: number };

/* Cuánto se queda quieta una pantalla terminada antes de pasar a la siguiente. */
const PAUSA_MS = 1600;

/* Todas las funciones de un caso en el orden en que rotan: las del celular y
   después las del escritorio, así la rotación también muestra el selector. */
function enOrden(slug: Slug): Eleccion[] {
  return DISPOSITIVOS.flatMap((dispositivo) => CASOS[slug].funciones[dispositivo].map((_, indice) => ({ dispositivo, indice })));
}

/* Cada caso arranca en el primer dispositivo que tenga pantallas. */
const INICIAL = Object.fromEntries(
  ORDEN.map((slug) => [slug, { dispositivo: CASOS[slug].funciones.celular.length ? "celular" : "escritorio", indice: 0 }]),
) as Record<Slug, Eleccion>;

/*
 * Los proyectos, en una sola escena (#23, #32). El texto de cada caso pasa
 * por la izquierda y, a la derecha, la pantalla se queda fija. El fondo de
 * toda la escena toma la marca del caso que está en el centro de la pantalla
 * (data-caso, ver globals.css), así que bajar ES cambiar de producto.
 *
 * Adentro de cada caso, qué logra la app: un selector Celular / Escritorio
 * (lo que se hace desde el teléfono y lo que se hace desde el panel) y la
 * lista de funciones. Rotan solas (#33): cuando la animación de una termina y
 * pasa un momento, se marca la siguiente. Tocar el selector o la lista de un
 * caso detiene su rotación: desde ahí manda la persona.
 *
 * En el celular no hay columna fija: cada caso lleva su pantalla abajo de la
 * lista, y el fondo cambia igual.
 */
export function Recorrido() {
  const [activo, setActivo] = useState<Slug>("global-fit");
  const [eleccion, setEleccion] = useState(INICIAL);
  const [tocados, setTocados] = useState<Partial<Record<Slug, true>>>({});
  const pasos = useRef<Partial<Record<Slug, HTMLElement | null>>>({});
  const [terminada, setTerminada] = useState<{ slug: Slug; en: Eleccion } | null>(null);

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

  const elegir = (slug: Slug, cambio: Partial<Eleccion>) => {
    setTocados((t) => ({ ...t, [slug]: true }));
    setEleccion((e) => ({ ...e, [slug]: { ...e[slug], ...cambio } }));
  };

  /* La maqueta avisa que terminó; tras la pausa se marca la siguiente del mismo
     caso. Si en el medio la persona eligió otra, la elección ya no es la misma
     y no se salta. */
  const alTerminar = (slug: Slug) => (tocados[slug] ? undefined : () => setTerminada({ slug, en: eleccion[slug] }));

  useEffect(() => {
    if (!terminada) return;
    const { slug, en } = terminada;
    const t = setTimeout(() => {
      setEleccion((e) => {
        if (e[slug] !== en) return e;
        const orden = enOrden(slug);
        const ahora = orden.findIndex((o) => o.dispositivo === en.dispositivo && o.indice === en.indice);
        return { ...e, [slug]: orden[(ahora + 1) % orden.length] };
      });
    }, PAUSA_MS);
    return () => clearTimeout(t);
  }, [terminada]);

  return (
    <section
      id="proyectos"
      data-caso={TEMA[activo]}
      aria-label="Proyectos"
      className="recorrido relative bg-(--caso-fondo) text-(--caso-texto) transition-[background-color,color] duration-700 ease-out"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] px-4 sm:px-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-16">
        <div className="min-w-0">
          {ORDEN.map((slug) => {
            const caso = CASOS[slug];
            const { dispositivo, indice } = eleccion[slug];
            const pantallas = caso.funciones[dispositivo];
            const disponibles = DISPOSITIVOS.filter((d) => caso.funciones[d].length > 0);
            return (
              <article
                key={slug}
                id={slug}
                data-paso={slug}
                ref={(el) => {
                  pasos.current[slug] = el;
                }}
                className={`${FUENTE[slug]} flex min-h-svh snap-start scroll-mt-0! flex-col justify-center py-20 transition-opacity duration-500 lg:pt-20 lg:pb-8 ${
                  activo === slug ? "opacity-100" : "lg:opacity-30"
                }`}
              >
                <p className="flex items-center gap-3.5 text-[22px]">
                  <Image src={caso.logo} alt="" width={44} height={44} className="size-11 rounded-xl object-contain" />
                  <Marca caso={slug} />
                </p>
                <h2 className="mt-4 max-w-[16ch] text-[clamp(32px,3.6vw,52px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
                  {caso.titular}
                </h2>
                <p className="mt-4 max-w-[50ch] text-[17px] leading-relaxed text-(--caso-texto-medio)">{caso.bajada}</p>

                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {/* Los números de uso real: que se vea que la app está viva. */}
                  {caso.numeros.map((n) => (
                    <div key={n.etiqueta} className="flex items-baseline gap-2">
                      <dd className="text-xl leading-none font-extrabold tabular-nums">{n.valor}</dd>
                      <dt className="text-[13px] text-(--caso-suave)">{n.etiqueta}</dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-7">
                  <Selector
                    disponibles={disponibles}
                    actual={dispositivo}
                    onElegir={(d) => elegir(slug, { dispositivo: d, indice: 0 })}
                  />
                  <div
                    key={dispositivo}
                    role="tablist"
                    aria-label={`Qué hace ${caso.nombre}`}
                    className="entrar -mx-4 mt-3 flex gap-1 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
                  >
                    {pantallas.map((p, i) => {
                      const on = i === indice;
                      return (
                        <button
                          key={p.titulo}
                          type="button"
                          role="tab"
                          aria-selected={on}
                          onClick={() => elegir(slug, { indice: i })}
                          className={`flex shrink-0 cursor-pointer items-start gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors duration-300 lg:shrink lg:py-2.5 ${
                            on ? "bg-(--caso-superficie) shadow-[inset_0_0_0_1px_var(--caso-borde)]" : "hover:bg-(--caso-superficie)/60"
                          }`}
                        >
                          <span
                            className={`grid size-8 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                              on ? "bg-(--caso-acento) text-(--caso-sobre-acento)" : "bg-(--caso-superficie) text-(--caso-texto-medio)"
                            }`}
                          >
                            <Icono nombre={p.icono} className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1 pt-1">
                            <span className={`block text-[15px] leading-tight font-bold ${on ? "" : "text-(--caso-texto-medio)"}`}>
                              {p.titulo}
                            </span>
                            <span
                              className={`mt-1.5 max-w-[46ch] text-[14px] leading-relaxed text-(--caso-texto-medio) ${on ? "hidden lg:block" : "hidden"}`}
                            >
                              {p.texto}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* En el celular, la pantalla elegida va acá abajo. */}
                <div className="mt-6 lg:hidden">
                  <p className="max-w-[52ch] text-[15px] leading-relaxed text-(--caso-texto-medio)">{pantallas[indice].texto}</p>
                  <div key={`${dispositivo}-${indice}`} className={`entrar mx-auto mt-8 w-full ${MAX_ANCHO[dispositivo]}`}>
                    {pantallas[indice].maqueta(true, alTerminar(slug))}
                  </div>
                  <p className="mt-3 text-center text-[13px] text-(--caso-suave)">Datos de demo</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* La pantalla fija: la elegida de cada caso, apiladas; se ve la del caso activo. */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-svh items-center justify-center pt-16">
            <div className="relative h-[660px] w-full max-w-[600px]">
              {ORDEN.map((slug) => {
                const caso = CASOS[slug];
                const visible = activo === slug;
                return (
                  <div
                    key={slug}
                    inert={!visible}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                      visible
                        ? "opacity-100 [transform:none]"
                        : `pointer-events-none opacity-0 ${
                            ORDEN.indexOf(slug) < ORDEN.indexOf(activo)
                              ? "[transform:translateY(-60px)_scale(.94)_rotateX(8deg)]"
                              : "[transform:translateY(80px)_scale(.94)_rotateX(-8deg)]"
                          }`
                    }`}
                  >
                    {DISPOSITIVOS.flatMap((d) =>
                      caso.funciones[d].map((p, i) => {
                        const elegida = eleccion[slug].dispositivo === d && eleccion[slug].indice === i;
                        return (
                          <div
                            key={`${d}-${p.titulo}`}
                            inert={!elegida}
                            className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform] duration-500 ease-out ${
                              elegida ? "opacity-100 [transform:none]" : "pointer-events-none opacity-0 [transform:translateY(24px)_scale(.97)]"
                            }`}
                          >
                            <div className={`w-full ${MAX_ANCHO[d]}`}>{p.maqueta(visible && elegida, alTerminar(slug))}</div>
                          </div>
                        );
                      }),
                    )}
                  </div>
                );
              })}
            </div>
            <p className="absolute bottom-3 text-[13px] text-(--caso-suave)">Datos de demo</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Celular o escritorio. Con uno solo (Forge no tiene versión de celular) se
   muestra igual, como rótulo, para que se sepa desde dónde se usa. */
function Selector({
  disponibles,
  actual,
  onElegir,
}: {
  disponibles: Dispositivo[];
  actual: Dispositivo;
  onElegir: (d: Dispositivo) => void;
}) {
  const NOMBRE: Record<Dispositivo, string> = { celular: "Celular", escritorio: "Escritorio" };
  if (disponibles.length === 1) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-(--caso-superficie) px-3.5 py-2 text-[13px] font-semibold text-(--caso-texto-medio)">
        <IconoDispositivo escritorio={disponibles[0] === "escritorio"} className="size-4" />
        Solo en {NOMBRE[disponibles[0]].toLowerCase()}
      </p>
    );
  }
  return (
    <div role="radiogroup" aria-label="Desde dónde se usa" className="inline-flex rounded-full bg-(--caso-superficie) p-1 shadow-[inset_0_0_0_1px_var(--caso-borde)]">
      {disponibles.map((d) => {
        const on = d === actual;
        return (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onElegir(d)}
            className={`flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${
              on ? "bg-(--caso-acento) text-(--caso-sobre-acento)" : "text-(--caso-texto-medio) hover:text-(--caso-texto)"
            }`}
          >
            <IconoDispositivo escritorio={d === "escritorio"} className="size-4" />
            {NOMBRE[d]}
          </button>
        );
      })}
    </div>
  );
}
