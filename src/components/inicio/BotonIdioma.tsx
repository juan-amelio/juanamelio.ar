"use client";

import type { MouseEvent } from "react";
import { useIdioma, useTextos } from "@/idioma/Idioma";
import { COOKIE_IDIOMA, IDIOMAS, INICIO, type Idioma } from "@/idioma/idiomas";

const NOMBRE: Record<Idioma, string> = { es: "Español", en: "English" };

/*
 * ES / EN en la barra (#22). Elegir guarda la cookie que lee el proxy: desde
 * ahí, «/» abre en ese idioma aunque el navegador diga otra cosa. Se navega
 * con la página entera (un <a>, no un Link) porque cada idioma es su propia
 * página armada, y se conserva la sección en la que se estaba.
 */
export function BotonIdioma() {
  const actual = useIdioma();
  const t = useTextos().barra;

  const elegir = (idioma: Idioma) => (e: MouseEvent<HTMLAnchorElement>) => {
    // La cookie va siempre, también si se abre en otra pestaña: si no, el
    // proxy aplicaría la elección anterior y la pestaña nueva saldría en el otro idioma.
    document.cookie = `${COOKIE_IDIOMA}=${idioma}; path=/; max-age=31536000; samesite=lax`;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (idioma !== actual) window.location.assign(INICIO[idioma] + window.location.hash);
  };

  return (
    <nav aria-label={t.idioma} className="flex items-center rounded-full p-0.5 text-[13px] font-semibold shadow-[inset_0_0_0_1px_var(--color-borde-oscuro)]">
      {IDIOMAS.map((idioma) => {
        const on = idioma === actual;
        return (
          <a
            key={idioma}
            href={INICIO[idioma]}
            hrefLang={idioma}
            lang={idioma}
            aria-label={NOMBRE[idioma]}
            aria-current={on ? "page" : undefined}
            onClick={elegir(idioma)}
            className={`grid h-7 min-w-9 place-items-center rounded-full px-2 no-underline transition-colors duration-300 ${
              on ? "bg-tinta text-fondo" : "text-tinta-media hover:text-tinta"
            }`}
          >
            {idioma.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
}
