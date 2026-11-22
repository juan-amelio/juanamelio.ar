"use client";

import { useEffect, useRef, useState } from "react";
import { EnlaceSeccion } from "@/components/EnlaceSeccion";
import { useTextos } from "@/idioma/Idioma";

/* En el orden de la página: la sección activa se busca recorriéndolas así. */
const SECCIONES = [
  { id: "sobre-mi", nombre: "sobreMi" },
  { id: "proyectos", nombre: "proyectos" },
  { id: "contacto", nombre: "contacto" },
] as const;

/*
 * Las secciones del inicio en la barra, con la que se está mirando marcada,
 * para saber siempre dónde se está parado.
 */
export function MenuSecciones({ className }: { className: string }) {
  const actual = useSeccionActual();
  const t = useTextos().barra;

  return (
    <nav aria-label={t.secciones} className={className}>
      {SECCIONES.map(({ id, nombre }) => {
        const activa = id === actual;
        return (
          <EnlaceSeccion
            key={id}
            href={`/#${id}`}
            aria-current={activa ? "location" : undefined}
            className={`relative py-1.5 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-current after:transition-transform after:duration-300 ${
              activa ? "text-tinta after:scale-x-100" : "text-tinta-media after:scale-x-0 hover:text-tinta"
            }`}
          >
            {t[nombre]}
          </EnlaceSeccion>
        );
      })}
    </nav>
  );
}

/*
 * En el celular las tres secciones no entran en la barra (#61): antes quedaba
 * sólo Contacto, y Sobre mí y Proyectos no tenían cómo llegarse. El botón de
 * tres rayas las abre debajo de la barra, con la actual marcada. Se cierra al elegir, con
 * Escape o tocando afuera.
 */
export function MenuCelular() {
  const actual = useSeccionActual();
  const t = useTextos().barra;
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    const afuera = (e: PointerEvent) => {
      if (!caja.current?.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("keydown", tecla);
    document.addEventListener("pointerdown", afuera);
    return () => {
      document.removeEventListener("keydown", tecla);
      document.removeEventListener("pointerdown", afuera);
    };
  }, [abierto]);

  return (
    <div ref={caja} className="sm:hidden">
      {/* Sólo el ícono: con el texto y la flecha no entraba a 320 px. */}
      <button
        type="button"
        aria-label={t.menu}
        aria-expanded={abierto}
        aria-controls="menu-celular"
        onClick={() => setAbierto((a) => !a)}
        className="grid size-10 cursor-pointer place-items-center rounded-full text-tinta-media transition-colors hover:bg-tinta/[.07] hover:text-tinta aria-expanded:text-tinta"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-5">
          <path d={abierto ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
        </svg>
      </button>
      <nav
        id="menu-celular"
        aria-label={t.secciones}
        hidden={!abierto}
        className="fixed inset-x-0 top-16 border-b border-tinta/[.07] bg-fondo/95 px-4 pt-2 pb-4 backdrop-blur-xl"
      >
        {SECCIONES.map(({ id, nombre }) => (
          <EnlaceSeccion
            key={id}
            href={`/#${id}`}
            aria-current={id === actual ? "location" : undefined}
            onClick={() => setAbierto(false)}
            className="flex h-12 items-center justify-between border-b border-tinta/[.07] text-lg font-semibold text-tinta-media last:border-b-0 aria-[current]:text-tinta"
          >
            {t[nombre]}
            {id === actual && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
          </EnlaceSeccion>
        ))}
      </nav>
    </div>
  );
}

/* La sección activa es la última cuyo comienzo ya pasó el 40 % de la pantalla.
   Al llegar al final de la página gana la última, aunque no alcance esa
   línea: el contacto es corto y si no nunca se marcaría. En la portada,
   ninguna. Fuera del inicio (una página que no existe) las secciones no
   están y no se marca nada. */
function useSeccionActual() {
  const [actual, setActual] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      const linea = window.innerHeight * 0.4;
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let encontrada: string | null = null;
      for (const { id } of SECCIONES) {
        const el = document.getElementById(id);
        if (el && (el.getBoundingClientRect().top <= linea || (alFinal && id === SECCIONES.at(-1)?.id))) encontrada = id;
      }
      setActual(encontrada);
    };
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(medir);
    };
    pedir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir, { passive: true });
    return () => {
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
      cancelAnimationFrame(raf);
    };
  }, []);

  return actual;
}
