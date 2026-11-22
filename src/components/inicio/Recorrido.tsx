"use client";

import { useEffect, useRef, useState } from "react";
import { CASOS_EN, MAX_ANCHO, ORDEN, type Caso, type Dispositivo, type Pantalla, type Slug } from "@/components/casos/casos";
import { Icono, IconoDispositivo, IconoFlecha } from "@/components/casos/IconosFuncion";
import { Contador } from "@/components/casos/Contador";
import { Halos, Logo, Marca } from "@/components/casos/Marca";
import { Encajar } from "@/components/maquetas/Encajar";
import { useIdioma, useTextos } from "@/idioma/Idioma";

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
function enOrden(CASOS: Record<Slug, Caso>, slug: Slug): Eleccion[] {
  return DISPOSITIVOS.flatMap((dispositivo) => CASOS[slug].funciones[dispositivo].map((_, indice) => ({ dispositivo, indice })));
}

/* La función de al lado en ese orden, dando la vuelta en las puntas. */
function vecina(CASOS: Record<Slug, Caso>, slug: Slug, en: Eleccion, paso: 1 | -1): Eleccion {
  const orden = enOrden(CASOS, slug);
  const ahora = orden.findIndex((o) => o.dispositivo === en.dispositivo && o.indice === en.indice);
  return orden[(ahora + paso + orden.length) % orden.length];
}

/* Cada caso arranca en el primer dispositivo que tenga pantallas (igual en
   los dos idiomas: lo que cambia es el texto, no las funciones). */
const INICIAL = Object.fromEntries(
  ORDEN.map((slug) => [slug, { dispositivo: CASOS_EN.es[slug].funciones.celular.length ? "celular" : "escritorio", indice: 0 }]),
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
  const t = useTextos().recorrido;
  const CASOS = CASOS_EN[useIdioma()];
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
      setEleccion((e) => (e[slug] !== en ? e : { ...e, [slug]: vecina(CASOS, slug, en, 1) }));
    }, PAUSA_MS);
    return () => clearTimeout(t);
  }, [terminada, CASOS]);

  /* Las flechas recorren todas las funciones del caso, celular y escritorio,
     y como cualquier elección hecha a mano, frenan la rotación. */
  const pasar = (slug: Slug, paso: 1 | -1) => elegir(slug, vecina(CASOS, slug, eleccion[slug], paso));

  return (
    <section
      id="proyectos"
      data-caso={activo}
      aria-label={t.proyectos}
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
                className={`${FUENTE[slug]} flex min-h-svh scroll-mt-0! flex-col justify-center pt-16 pb-20 lg:snap-start transition-opacity duration-500 lg:pt-20 lg:pb-8 apretado:pb-5 ${
                  activo === slug ? "opacity-100" : "lg:opacity-30"
                }`}
              >
                {/* En el celular, la escena del caso entra en una pantalla (#62):
                    logo, titular, los números, el selector, los controles y la
                    grabación achicada al lugar que sobra (#63). La bajada queda
                    después. En escritorio esta caja no existe (lg:contents) y
                    todo sigue en la columna de la izquierda, en su orden (order).
                    En el celular el encaje del scroll va a esta caja y no al caso
                    entero: mide una pantalla, así se acomoda pasándose o no. */}
                <div className="flex h-[calc(100svh-4rem)] snap-start scroll-mt-16 flex-col pt-4 pb-2 lg:contents">
                <p className="flex items-center gap-3 text-[19px] lg:gap-3.5 lg:text-[22px] apretado:text-[19px]">
                  <Logo caso={slug} alt="" tamano={56} className="size-10 lg:size-14 apretado:size-11" />
                  <Marca caso={slug} />
                  {/* Lo que se puede visitar de verdad (#51), a la vista mientras se
                      mira el caso. Borde y texto del caso, no el acento: el lima
                      no se lee sobre el tema claro de A7. */}
                  {caso.enlace && (
                    <a
                      href={caso.enlace.href}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold text-(--caso-texto) no-underline shadow-[inset_0_0_0_1px_var(--caso-borde)] transition-colors duration-200 hover:bg-(--caso-acento) hover:text-(--caso-sobre-acento) hover:shadow-none"
                    >
                      {caso.enlace.texto}
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                      <span className="sr-only">{t.otraPestana}</span>
                    </a>
                  )}
                </p>
                <h2 className="mt-3 max-w-[16ch] text-[28px] leading-[1.02] font-extrabold tracking-[-0.03em] sm:text-[clamp(32px,3.6vw,52px)] lg:mt-4 apretado:mt-3 apretado:text-[clamp(28px,2.9vw,40px)]">
                  {caso.titular}
                </h2>
                <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-2 max-[359px]:gap-x-3 sm:gap-x-6 lg:order-1 lg:mt-5 apretado:mt-3">
                  {/* Los números de uso real: que se vea que la app está viva. En
                      el celular, debajo del titular (#63); en escritorio, debajo
                      de la bajada. Los tres de Forge entran en un renglón desde
                      320 px (#64): por eso la separación y, en los más chicos,
                      la letra se achican. */}
                  {caso.numeros.map((n) => (
                    <div key={n.etiqueta} className="flex items-baseline gap-2 max-[359px]:gap-1.5">
                      <dd className="text-xl leading-none font-extrabold max-[359px]:text-lg apretado:text-lg">
                        <Contador valor={n.valor} />
                      </dd>
                      <dt className="text-[13px] text-(--caso-suave) max-[359px]:text-[12px]">{n.etiqueta}</dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-4 flex items-center justify-between gap-3 lg:hidden">
                  <Selector
                    compacto
                    disponibles={disponibles}
                    actual={dispositivo}
                    onElegir={(d) => elegir(slug, { dispositivo: d, indice: 0 })}
                  />
                  <p className="text-[13px] text-(--caso-suave)">{t.datosDeDemo}</p>
                </div>
                {/* Los controles, pegados a la grabación: cuál se ve, cuántas
                    hay y las flechas. Reemplazan la tira de funciones, que en el
                    celular corría de costado y quedaba cortada. Van arriba y sin
                    la descripción (#63): abajo los tapaba el botón de WhatsApp,
                    y así la grabación gana el lugar. */}
                <div className="mt-3 flex items-center gap-2 lg:hidden">
                  <Flecha slug={slug} hacia={vecina(CASOS, slug, eleccion[slug], -1)} onPasar={() => pasar(slug, -1)} />
                  <p className="flex min-w-0 flex-1 items-baseline justify-center gap-2">
                    <span className="truncate text-[16px] font-bold">{pantallas[indice].titulo}</span>
                    {/* Con una sola (A7 en el celular), «1/1» no dice nada. */}
                    {pantallas.length > 1 && (
                      <span className="shrink-0 text-[13px] text-(--caso-suave) tabular-nums">
                        {indice + 1}/{pantallas.length}
                      </span>
                    )}
                  </p>
                  <Flecha slug={slug} hacia={vecina(CASOS, slug, eleccion[slug], 1)} siguiente onPasar={() => pasar(slug, 1)} />
                </div>
                <div className="relative isolate mt-3 flex min-h-0 flex-1 flex-col lg:hidden">
                  <div aria-hidden="true" data-caso={slug} className="halo pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10" />
                  {/* Las dos se dibujan a su tamaño (el iPhone a 320 px, la
                      ventana a 560) y se achican enteras para entrar. */}
                  <Encajar>
                    <div key={`${dispositivo}-${indice}`} className={`entrar ${dispositivo === "celular" ? "w-80" : "w-140"}`}>
                      {pantallas[indice].maqueta(true, alTerminar(slug))}
                    </div>
                  </Encajar>
                </div>
                </div>

                {/* En el celular la bajada es un punto de encaje (su final): si no, la
                    escena de al lado la tapaba al querer leerla (#63). */}
                <p className="mt-6 max-w-[50ch] text-[17px] leading-relaxed text-(--caso-texto-medio) max-lg:snap-end max-lg:scroll-mb-24 lg:mt-4 apretado:mt-3 apretado:text-[15px]">{caso.bajada}</p>

                <div className="mt-7 hidden lg:order-2 lg:block apretado:mt-4">
                  <Selector
                    disponibles={disponibles}
                    actual={dispositivo}
                    onElegir={(d) => elegir(slug, { dispositivo: d, indice: 0 })}
                  />
                  {/* La lista cambia de alto según cuál está abierta (la descripción
                      ocupa de una a tres líneas) y según el dispositivo (5 o 4
                      funciones). Como el caso está centrado en vertical, eso movía
                      toda la columna (#46). Abajo, en la misma celda, van copias
                      invisibles de cada estado posible: la celda toma el alto del
                      más alto y la lista real ya no la hace crecer ni achicar. */}
                  <div className="mt-3 grid grid-cols-[minmax(0,1fr)] apretado:mt-2">
                    {enOrden(CASOS, slug).map((e) => (
                      <div
                        key={`${e.dispositivo}-${e.indice}`}
                        aria-hidden="true"
                        inert
                        className="invisible hidden flex-col gap-1 [grid-area:1/1] lg:flex"
                      >
                        {caso.funciones[e.dispositivo].map((p, i) => (
                          <Funcion key={p.titulo} pantalla={p} on={i === e.indice} />
                        ))}
                      </div>
                    ))}
                    <div
                      key={dispositivo}
                      role="tablist"
                      aria-label={t.queHace(caso.nombre)}
                      className="entrar flex flex-col gap-1 self-start [grid-area:1/1]"
                    >
                      {pantallas.map((p, i) => (
                        <Funcion key={p.titulo} pantalla={p} on={i === indice} onElegir={() => elegir(slug, { indice: i })} />
                      ))}
                    </div>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* La pantalla fija: la elegida de cada caso, apiladas; se ve la del caso activo. */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-svh items-center justify-center pt-16">
            <div className="relative h-[690px] w-full max-w-[600px]">
              {/* No más de 64 px a los costados: es el hueco entre las columnas, y
                  más allá teñiría el texto de la izquierda. */}
              <Halos activo={activo} className="-inset-x-16 -inset-y-10" />
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

              {/* Las flechas, a los costados de la pantalla del caso activo, siempre
                  al ancho de la ventana de escritorio aunque se vea el celular:
                  si se acomodaran a cada uno, al pasar de la ventana al teléfono
                  la flecha se iría de abajo del cursor y habría que ir a buscarla
                  para seguir (#46). */}
              <div className="pointer-events-none absolute inset-0 flex justify-center">
                <div className={`relative w-full ${MAX_ANCHO.escritorio}`}>
                  <Flecha
                    slug={activo}
                    hacia={vecina(CASOS, activo, eleccion[activo], -1)}
                    onPasar={() => pasar(activo, -1)}
                    className="pointer-events-auto absolute top-1/2 -left-12 -translate-y-1/2"
                  />
                  <Flecha
                    slug={activo}
                    hacia={vecina(CASOS, activo, eleccion[activo], 1)}
                    siguiente
                    onPasar={() => pasar(activo, 1)}
                    className="pointer-events-auto absolute top-1/2 -right-12 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>
            <p className="absolute bottom-3 text-[13px] text-(--caso-suave)">{t.datosDeDemo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Una función de la lista. Sin onElegir es una de las copias invisibles que
   reservan el alto: tiene que medir exactamente lo mismo que la real. */
function Funcion({ pantalla: p, on, onElegir }: { pantalla: Pantalla; on: boolean; onElegir?: () => void }) {
  return (
    <button
      type="button"
      role={onElegir ? "tab" : undefined}
      aria-selected={onElegir ? on : undefined}
      tabIndex={onElegir ? undefined : -1}
      onClick={onElegir}
      className={`flex shrink-0 cursor-pointer items-start gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors duration-300 lg:shrink lg:py-2.5 apretado:py-1.5 ${
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
        <span className={`block text-[15px] leading-tight font-bold ${on ? "" : "text-(--caso-texto-medio)"}`}>{p.titulo}</span>
        <span
          className={`mt-1.5 max-w-[46ch] text-[14px] leading-relaxed text-(--caso-texto-medio) apretado:mt-1 apretado:text-[13.5px] ${on ? "hidden lg:block" : "hidden"}`}
        >
          {p.texto}
        </span>
      </span>
    </button>
  );
}

/* Pasa a la función anterior o a la siguiente del caso; dice a cuál va. */
function Flecha({
  slug,
  hacia,
  siguiente = false,
  onPasar,
  className = "",
}: {
  slug: Slug;
  hacia: Eleccion;
  siguiente?: boolean;
  onPasar: () => void;
  className?: string;
}) {
  const t = useTextos().recorrido;
  const destino = CASOS_EN[useIdioma()][slug].funciones[hacia.dispositivo][hacia.indice].titulo;
  return (
    <button
      type="button"
      onClick={onPasar}
      aria-label={`${siguiente ? t.siguiente : t.anterior}: ${destino}`}
      title={destino}
      className={`grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-(--caso-superficie) text-(--caso-texto-medio) shadow-[inset_0_0_0_1px_var(--caso-borde)] transition-colors duration-300 hover:bg-(--caso-acento) hover:text-(--caso-sobre-acento) ${className}`}
    >
      <IconoFlecha siguiente={siguiente} className="size-5" />
    </button>
  );
}

/* Celular o escritorio. Con uno solo (Forge no tiene versión de celular) se
   muestra igual, como rótulo, para que se sepa desde dónde se usa.
   `compacto` es el del celular (#62): más bajo, y el nombre sólo del elegido. */
function Selector({
  disponibles,
  actual,
  onElegir,
  compacto = false,
}: {
  disponibles: Dispositivo[];
  actual: Dispositivo;
  onElegir: (d: Dispositivo) => void;
  compacto?: boolean;
}) {
  const t = useTextos().recorrido;
  const NOMBRE = t.dispositivo;
  if (disponibles.length === 1) {
    return (
      <p className={`inline-flex items-center gap-2 rounded-full bg-(--caso-superficie) font-semibold text-(--caso-texto-medio) ${compacto ? "px-3 py-1.5 text-[13px]" : "px-3.5 py-2 text-[13px]"}`}>
        <IconoDispositivo escritorio={disponibles[0] === "escritorio"} className="size-4" />
        {t.solo(NOMBRE[disponibles[0]])}
      </p>
    );
  }
  return (
    <div role="radiogroup" aria-label={t.desdeDonde} className="inline-flex rounded-full bg-(--caso-superficie) p-1 shadow-[inset_0_0_0_1px_var(--caso-borde)]">
      {disponibles.map((d) => {
        const on = d === actual;
        return (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={compacto ? NOMBRE[d] : undefined}
            onClick={() => onElegir(d)}
            className={`flex cursor-pointer items-center gap-2 rounded-full font-semibold transition-colors duration-300 ${
              compacto ? "h-9 px-3 text-[13px]" : "px-4 py-2 text-[14px] apretado:py-1.5"
            } ${on ? "bg-(--caso-acento) text-(--caso-sobre-acento)" : "text-(--caso-texto-medio) hover:text-(--caso-texto)"}`}
          >
            <IconoDispositivo escritorio={d === "escritorio"} className="size-4" />
            {(!compacto || on) && <span aria-hidden={compacto || undefined}>{NOMBRE[d]}</span>}
          </button>
        );
      })}
    </div>
  );
}
