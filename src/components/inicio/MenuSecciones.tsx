"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EnlaceSeccion } from "@/components/EnlaceSeccion";
import { AFUERA } from "@/components/transiciones/Transiciones";

const SECCIONES = [
  { id: "proyectos", nombre: "Proyectos", visible: "hidden sm:inline-block" },
  { id: "sobre-mi", nombre: "Sobre mí", visible: "hidden sm:inline-block" },
  { id: "proceso", nombre: "Proceso", visible: "hidden md:inline-block" },
  { id: "contacto", nombre: "Contacto", visible: "inline-block" },
] as const;

/*
 * Las secciones del inicio en la barra, con la que se está mirando marcada,
 * para saber siempre dónde se está parado. En un caso no se marca ninguna.
 */
export function MenuSecciones({ className }: { className: string }) {
  const actual = useSeccionActual();

  return (
    <nav aria-label="Secciones" className={className}>
      {SECCIONES.map(({ id, nombre, visible }) => {
        const activa = id === actual;
        return (
          <EnlaceSeccion
            key={id}
            href={`/#${id}`}
            transitionTypes={AFUERA}
            aria-current={activa ? "location" : undefined}
            className={`relative py-1.5 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-current after:transition-transform after:duration-300 ${
              activa ? "text-tinta after:scale-x-100" : "text-tinta-media after:scale-x-0 hover:text-tinta"
            } ${visible}`}
          >
            {nombre}
          </EnlaceSeccion>
        );
      })}
    </nav>
  );
}

/* La sección activa es la última cuyo comienzo ya pasó el 40 % de la pantalla.
   Al llegar al final de la página gana la última, aunque no alcance esa
   línea: el contacto es corto y si no nunca se marcaría. En la portada, o
   fuera del inicio, ninguna. */
function useSeccionActual() {
  const ruta = usePathname();
  const [actual, setActual] = useState<string | null>(null);

  useEffect(() => {
    if (ruta !== "/") return;
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
  }, [ruta]);

  return ruta === "/" ? actual : null;
}
