"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CASOS, ORDEN } from "@/components/casos/casos";
import { CajaA7 } from "@/components/maquetas/A7";
import { PantallaForge } from "@/components/maquetas/ForgeEscritorio";
import { TelefonoGlobalFit } from "@/components/maquetas/GlobalFit";
import { ADENTRO } from "@/components/transiciones/Transiciones";

/* Cada pantalla en la ronda, con su tamaño. La ventana de Forge es más ancha y
   más baja que los teléfonos: va más abajo para quedar centrada con ellos. */
const PANTALLAS: { maqueta: ReactNode; ancho: string; escala: string }[] = [
  { maqueta: <TelefonoGlobalFit />, ancho: "w-80", escala: "[--escala:.5] sm:[--escala:.72]" },
  { maqueta: <CajaA7 />, ancho: "w-80", escala: "[--escala:.5] sm:[--escala:.72]" },
  { maqueta: <PantallaForge />, ancho: "w-[560px] [--arriba:80px] sm:[--arriba:110px]", escala: "[--escala:.34] sm:[--escala:.66]" },
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

  return (
    <section ref={ref} className="portada relative isolate overflow-hidden">
      <div className="mx-auto grid min-h-svh max-w-7xl items-center gap-x-12 gap-y-6 px-4 pt-24 pb-16 sm:px-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:pb-20">
        <div className="portada-texto relative z-10">
          <h1 className="animate-subir max-w-[11ch] text-[clamp(44px,7.2vw,112px)] leading-[0.94] font-extrabold tracking-[-0.04em]">
            Apps que la gente abre todos los días.
          </h1>
          <p className="animate-subir mt-7 max-w-[34ch] text-xl leading-normal text-tinta-media [animation-delay:.12s]">
            Soy Juan Amelio. Las diseño, las construyo y las sostengo en producción. Estas tres se usan hoy.
          </p>
          <a href="#trabajos" className="animate-subir group mt-10 inline-flex items-center gap-3 text-base font-semibold [animation-delay:.24s]">
            <span className="indicador" aria-hidden="true" />
            Bajá y miralas por dentro
          </a>
        </div>

        <div className="portada-ronda flex flex-col items-center">
          <div
            role="group"
            aria-roledescription="carrusel"
            aria-label="Mis proyectos"
            className="escenario relative h-[380px] w-full max-w-[680px] cursor-grab touch-pan-y select-none active:cursor-grabbing [--radio:105px] sm:h-[520px] sm:[--radio:220px]"
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
            <div className="anillo" style={{ "--angulo": `${angulo}deg` } as CSSProperties}>
              {PANTALLAS.map((p, i) => {
                const adelante = i === frente;
                return (
                  <div key={ORDEN[i]} className={`orbita ${p.ancho} ${p.escala}`} style={{ "--i": i } as CSSProperties}>
                    <div className="animate-subir" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                      {adelante ? (
                        <div className="flotar" aria-hidden="true">
                          {p.maqueta}
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="atras block w-full cursor-pointer text-left"
                          aria-label={`Traer ${CASOS[ORDEN[i]].nombre} adelante`}
                          onClick={() => tocarYTraer(i)}
                        >
                          <span className="block" aria-hidden="true">
                            {p.maqueta}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* La tarjeta del proyecto que está adelante, vestida con su marca. */}
          <div data-caso={caso.slug === "forge-studio" ? "forge-oscuro" : caso.slug} className="relative z-10 w-full max-w-[460px]">
            <div
              key={caso.slug}
              aria-live="polite"
              className="entrar flex items-center gap-4 rounded-2xl bg-(--caso-superficie) p-4 font-(family-name:--caso-fuente) text-(--caso-texto) shadow-[inset_0_0_0_1px_var(--caso-borde),0_24px_48px_-24px_rgb(0_0_0/.6)]"
            >
              <Image src={caso.logo} alt={`Logo de ${caso.nombre}`} width={48} height={48} className="size-12 shrink-0 rounded-xl object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-lg leading-tight font-bold">{caso.nombre}</p>
                <p className="mt-0.5 text-sm leading-snug text-(--caso-suave)">{caso.corto}</p>
              </div>
              <Link
                href={`/casos/${caso.slug}`}
                transitionTypes={ADENTRO}
                className="shrink-0 rounded-full bg-(--caso-acento) px-4 py-2.5 text-sm font-bold text-(--caso-sobre-acento) hover:bg-(--caso-acento-hover)"
              >
                Ver el proyecto
              </Link>
            </div>
            <div className="mt-3 flex justify-center gap-1">
              {ORDEN.map((slug, i) => (
                <button
                  key={slug}
                  type="button"
                  aria-label={`Mostrar ${CASOS[slug].nombre}`}
                  aria-pressed={i === frente}
                  onClick={() => tocarYTraer(i)}
                  className="grid size-7 cursor-pointer place-items-center"
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
