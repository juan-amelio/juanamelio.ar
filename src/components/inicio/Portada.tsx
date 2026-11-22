"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CASOS_EN, ORDEN } from "@/components/casos/casos";
import { Halos, Logo } from "@/components/casos/Marca";
import { EnlaceSeccion } from "@/components/EnlaceSeccion";
import { TelefonoGrabado, VentanaGrabada } from "@/components/maquetas/Grabacion";
import { useIdioma, useTextos } from "@/idioma/Idioma";

/* Cada pantalla en la ronda, con su tamaño. La ventana de Forge es más ancha y
   más baja que los teléfonos: va más abajo para quedar centrada con ellos. */
const PANTALLAS: { maqueta: (etiqueta: string) => ReactNode; ancho: string; escala: string }[] = [
  { maqueta: (e) => <TelefonoGrabado src="/grabaciones/global-fit/reservar" etiqueta={e} />, ancho: "w-80", escala: "[--escala:.5] sm:[--escala:.72]" },
  { maqueta: (e) => <TelefonoGrabado app="a7-sports" src="/grabaciones/a7-sports/caja" etiqueta={e} />, ancho: "w-80", escala: "[--escala:.5] sm:[--escala:.72]" },
  { maqueta: (e) => <VentanaGrabada app="forge-studio" src="/grabaciones/forge-studio/inicio" ruta=" · Inicio" etiqueta={e} />, ancho: "w-[560px] [--arriba:80px] sm:[--arriba:110px]", escala: "[--escala:.34] sm:[--escala:.66]" },
];

const PASO = 360 / ORDEN.length;
const GIRO_SOLO_MS = 5500;

/*
 * La portada (#23, #24): las tres apps, vivas, en una ronda que gira.
 *
 * El giro es una sola variable, --angulo (registrada con @property en
 * globals.css para que se pueda animar): el anillo gira para un lado y cada
 * pantalla para el otro, así orbitan sin dejar de mirar de frente. Adelante
 * queda la pantalla `frente`; tocar una de atrás la trae. También se gira con
 * las flechas, deslizando el dedo, o solo, cada tanto, hasta que alguien toca.
 *
 * Además, como antes: --mx y --my (el mouse) inclinan la ronda y mueven la
 * luz, y --salida (cuánto se scrolleó) la hace bajar y desvanecerse.
 */
export function Portada() {
  const t = useTextos().portada;
  const CASOS = CASOS_EN[useIdioma()];
  // Las pantallas se arman una vez por idioma, no en cada giro de la ronda.
  const maquetas = useMemo(() => PANTALLAS.map((p, i) => p.maqueta(t.pantallas[i])), [t]);
  const ref = useRef<HTMLElement>(null);
  const [angulo, setAngulo] = useState(0);
  const [tocado, setTocado] = useState(false);
  const n = ORDEN.length;
  const frente = (((Math.round(angulo / PASO) % n) + n) % n) as number;
  const caso = CASOS[ORDEN[frente]];

  /* Ir a una pantalla por el camino más corto. */
  const traer = useCallback(
    (i: number) => {
      const delta = (((i - frente) % n) + n) % n;
      if (delta === 0) return;
      setAngulo((a) => a + (delta <= n / 2 ? delta : delta - n) * PASO);
    },
    [frente, n],
  );
  const tocarYTraer = (i: number) => {
    setTocado(true);
    traer(i);
  };
  const girar = (sentido: 1 | -1) => {
    setTocado(true);
    setAngulo((a) => a + sentido * PASO);
  };

  // Mouse y scroll: variables CSS, sin re-renderizar.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let mx = 0;
    let my = 0;
    const pintar = () => {
      raf = 0;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--salida", Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight || 1))).toFixed(3));
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(pintar);
    };
    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
      pedir();
    };
    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("scroll", pedir, { passive: true });
    pedir();
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("scroll", pedir);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Gira sola mientras nadie la toque, esté a la vista y no se pida quietud.
  useEffect(() => {
    if (tocado || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (window.scrollY < window.innerHeight * 0.5 && !document.hidden) setAngulo((a) => a + PASO);
    }, GIRO_SOLO_MS);
    return () => clearInterval(t);
  }, [tocado]);

  /* Arrastrar (mouse o dedo) y el scroll horizontal del trackpad giran la
     ronda. Un arrastre corto sigue siendo un clic; uno largo no deja que el
     clic traiga además la pantalla que quedó abajo del puntero. */
  const arrastre = useRef<{ x: number; movio: boolean } | null>(null);
  const ruedaAcumulada = useRef(0);
  const ruedaEspera = useRef(0);
  const escenarioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = escenarioRef.current;
    if (!el) return;
    const rueda = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical: es para bajar la página
      e.preventDefault();
      if (performance.now() < ruedaEspera.current) return;
      ruedaAcumulada.current += e.deltaX;
      if (Math.abs(ruedaAcumulada.current) > 60) {
        setTocado(true);
        setAngulo((a) => a + Math.sign(ruedaAcumulada.current) * PASO);
        ruedaAcumulada.current = 0;
        ruedaEspera.current = performance.now() + 650; // un gesto, un paso
      }
    };
    el.addEventListener("wheel", rueda, { passive: false });
    return () => el.removeEventListener("wheel", rueda);
  }, []);

  /* Si el escenario quedó más bajo que su alto de diseño (el max-height: 380
     o 520 px), la ronda entera se achica para entrar (#65). Las pantallas
     ocupan el 92 % de ese alto (el resto es aire para que floten): se
     achica sólo lo que haga falta para que entren ellas. */
  useEffect(() => {
    const el = escenarioRef.current;
    if (!el) return;
    const medir = () => {
      const base = parseFloat(getComputedStyle(el).maxHeight) * 0.92;
      const ajuste = base > 0 ? Math.min(1, el.clientHeight / base) : 1;
      el.style.setProperty("--ajuste", ajuste.toFixed(3));
    };
    const observador = new ResizeObserver(medir);
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <section ref={ref} id="inicio" className="portada relative isolate overflow-hidden lg:snap-start lg:scroll-mt-0!">
      {/* En el celular la portada es justo una pantalla (#65): titular,
          ronda y tarjeta, sin que la tarjeta quede cortada abajo. La ronda
          toma el lugar que sobra y se achica si no le alcanza (--ajuste). Con
          menos de 34rem de alto (un celular acostado) se deja scrollear. */}
      <div className="mx-auto flex h-svh min-h-[34rem] max-w-7xl flex-col justify-center gap-x-12 gap-y-3 px-4 pt-20 pb-3 sm:px-14 lg:grid lg:h-auto lg:min-h-svh lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-y-6 lg:pt-24 lg:pb-20">
        {/* En el celular el orden es otro (#63): titular y la ronda, y nada
            más (#64): la bajada y «Bajá y miralas por dentro» no van, después
            sigue Sobre mí. La caja del texto se disuelve (contents) para que
            la ronda quede entre las piezas. */}
        <div className="portada-texto relative z-10 max-lg:contents">
          <h1 className="animate-subir max-w-[11ch] text-[clamp(44px,7.2vw,112px)] leading-[0.94] font-extrabold tracking-[-0.04em]">
            {t.titulo}
          </h1>
          <p className="animate-subir max-w-[34ch] text-xl leading-normal text-tinta-media [animation-delay:.12s] max-lg:hidden lg:mt-7">
            {t.bajada}
          </p>
          <EnlaceSeccion href="/#proyectos" className="animate-subir group inline-flex items-center gap-3 text-base font-semibold [animation-delay:.24s] max-lg:hidden lg:mt-10">
            <span className="indicador" aria-hidden="true" />
            {t.bajar}
          </EnlaceSeccion>
        </div>

        <div className="portada-ronda flex flex-col items-center max-lg:order-2 max-lg:min-h-0 max-lg:flex-1 max-lg:justify-center">
          <div
            role="group"
            aria-roledescription={t.carrusel}
            aria-label={t.misProyectos}
            className="escenario relative max-h-[380px] min-h-0 w-full max-w-[680px] flex-1 cursor-grab touch-pan-y select-none active:cursor-grabbing [--radio:105px] sm:max-h-[520px] sm:[--radio:220px] lg:h-[520px] lg:flex-none"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") girar(1);
              if (e.key === "ArrowLeft") girar(-1);
            }}
            ref={escenarioRef}
            onPointerDown={(e) => {
              arrastre.current = { x: e.clientX, movio: false };
            }}
            onPointerMove={(e) => {
              if (arrastre.current && Math.abs(e.clientX - arrastre.current.x) > 8) arrastre.current.movio = true;
            }}
            onPointerUp={(e) => {
              const a = arrastre.current;
              if (!a) return;
              const dx = e.clientX - a.x;
              if (Math.abs(dx) > 40) girar(dx < 0 ? 1 : -1);
              setTimeout(() => (arrastre.current = null), 0);
            }}
            onClickCapture={(e) => {
              if (arrastre.current?.movio) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            {/* El color de la app que está adelante, detrás de la ronda. */}
            <Halos activo={caso.slug} className="-inset-x-16 -inset-y-12" />
            <div className="anillo" style={{ "--angulo": `${angulo}deg` } as CSSProperties}>
              {PANTALLAS.map((p, i) => {
                const adelante = i === frente;
                return (
                  <div key={ORDEN[i]} className={`orbita ${p.ancho} ${p.escala}`} style={{ "--i": i } as CSSProperties}>
                    <div className="animate-subir" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                      {adelante ? (
                        <div className="flotar" aria-hidden="true">
                          {maquetas[i]}
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="atras block w-full cursor-pointer text-left"
                          aria-label={t.traer(CASOS[ORDEN[i]].nombre)}
                          onClick={() => tocarYTraer(i)}
                        >
                          <span className="block" aria-hidden="true">
                            {maquetas[i]}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* La tarjeta del proyecto que está adelante, vestida con su marca. En el
              celular el botón va abajo, a todo el ancho: al lado le dejaba al
              texto una columna de una palabra por renglón (#60). */}
          <div data-caso={caso.slug} className="relative z-10 w-full max-w-[460px]">
            <div
              key={caso.slug}
              aria-live="polite"
              className="entrar flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl bg-(--caso-superficie) p-4 font-(family-name:--caso-fuente) text-(--caso-texto) shadow-[inset_0_0_0_1px_var(--caso-borde),0_24px_48px_-24px_rgb(0_0_0/.6)] sm:flex-nowrap"
            >
              <Logo caso={caso.slug} alt={t.logo(caso.nombre)} tamano={48} className="size-12 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-lg leading-tight font-bold">{caso.nombre}</p>
                {/* Dos renglones siempre en el celular: si la tarjeta cambiara de
                    alto con cada proyecto, la ronda se achicaría y crecería al girar (#65). */}
                <p className="mt-0.5 text-sm leading-snug text-(--caso-suave) max-sm:min-h-[2lh]">{caso.corto}</p>
              </div>
              <EnlaceSeccion
                href={`/#${caso.slug}`}
                className="w-full shrink-0 rounded-full bg-(--caso-acento) px-4 py-2.5 text-center text-sm font-bold text-(--caso-sobre-acento) hover:bg-(--caso-acento-hover) sm:w-auto"
              >
                {t.verProyecto}
              </EnlaceSeccion>
            </div>
            {/* Puntos chicos, pero de 44 px para el dedo (#61). */}
            <div className="mt-1 flex justify-center">
              {ORDEN.map((slug, i) => (
                <button
                  key={slug}
                  type="button"
                  aria-label={t.mostrar(CASOS[slug].nombre)}
                  aria-pressed={i === frente}
                  onClick={() => tocarYTraer(i)}
                  className="grid size-11 cursor-pointer place-items-center"
                >
                  <span className={`block h-1.5 rounded-full bg-tinta transition-all duration-300 ${i === frente ? "w-5" : "w-1.5 opacity-35"}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
