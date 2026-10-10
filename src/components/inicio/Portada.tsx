"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CajaA7 } from "@/components/maquetas/A7";
import { TableroForge } from "@/components/maquetas/Forge";
import { TelefonoGlobalFit } from "@/components/maquetas/GlobalFit";

/*
 * La portada (#23): las tres apps, vivas, flotando en perspectiva.
 *
 * Tres variables CSS mueven todo sin re-renderizar React:
 *   --mx, --my   dónde está el mouse (-1 a 1): parallax de las pantallas y la luz
 *   --salida     cuánto de la portada ya se scrolleó (0 a 1): las pantallas
 *                bajan y se abren, y dejan paso al recorrido de los casos
 * Con «reducir movimiento» no se escriben, y todo queda en su lugar.
 */
/** `encabezado` va adentro para que la luz de la portada lo cubra también. */
export function Portada({ encabezado }: { encabezado: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let mx = 0;
    let my = 0;
    const pintar = () => {
      raf = 0;
      const alto = el.offsetHeight || 1;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--salida", Math.min(1, Math.max(0, window.scrollY / alto)).toFixed(3));
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

  return (
    <section ref={ref} className="portada relative isolate overflow-hidden">
      {encabezado}
      <div className="mx-auto grid min-h-[calc(100svh-84px)] max-w-7xl items-center gap-x-12 gap-y-6 px-4 pb-16 sm:px-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:pb-24">
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

        <div className="escenario relative mx-auto h-[440px] w-full max-w-[680px] sm:h-[560px] lg:h-[640px]" aria-hidden="true">
          <div className="pantalla [--z:-140px] [--prof:10px] left-[calc(34%-280px)] top-[34%] w-[560px] [--giro:22deg] [--escala:.48] sm:[--escala:.55]">
            <div className="animate-subir [animation-delay:.35s]">
              <div className="flotar [animation-delay:-2s]">
                <TableroForge />
              </div>
            </div>
          </div>
          <div className="pantalla [--z:-70px] [--prof:18px] left-[calc(90%-160px)] top-[12%] w-80 [--giro:-24deg] [--escala:.56] sm:[--escala:.7]">
            <div className="animate-subir [animation-delay:.5s]">
              <div className="flotar [animation-delay:-4s]">
                <CajaA7 />
              </div>
            </div>
          </div>
          <div className="pantalla [--z:40px] [--prof:30px] left-[calc(58%-160px)] top-[5%] w-80 [--giro:-8deg] [--escala:.62] sm:[--escala:.78]">
            <div className="animate-subir [animation-delay:.2s]">
              <div className="flotar">
                <TelefonoGlobalFit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
