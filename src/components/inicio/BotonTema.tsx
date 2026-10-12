"use client";

import { useSyncExternalStore } from "react";
import { IconoLuna, IconoSol } from "@/components/Iconos";

type Tema = "claro" | "oscuro";

/* El tema vive en el <html> (data-tema): lo pone el script de layout.tsx antes
   de pintar y lo cambia este botón. Se lo lee de ahí, así el botón nunca
   muestra algo distinto de lo que se ve. */
function suscribir(avisar: () => void) {
  const obs = new MutationObserver(avisar);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
  return () => obs.disconnect();
}
const leer = (): Tema => (document.documentElement.dataset.tema === "claro" ? "claro" : "oscuro");
// En el servidor no se sabe: el botón sale sin ícono y lo completa el navegador.
const leerEnServidor = () => null;

/*
 * Claro u oscuro. Hasta que la persona elige, manda el sistema; cuando elige,
 * se guarda y ya no sigue al sistema. Cambia el sitio y el fondo de cada
 * proyecto, no las pantallas de las apps.
 */
export function BotonTema() {
  const tema = useSyncExternalStore(suscribir, leer, leerEnServidor);
  const otro: Tema = tema === "claro" ? "oscuro" : "claro";

  const cambiar = () => {
    document.documentElement.dataset.tema = otro;
    try {
      localStorage.setItem("tema", otro);
    } catch {
      // Sin almacenamiento (navegación privada) cambia igual, sólo que no se recuerda.
    }
  };

  return (
    <button
      type="button"
      onClick={cambiar}
      aria-label={`Pasar a modo ${otro}`}
      title={`Modo ${otro}`}
      className="-mr-2 grid size-10 shrink-0 cursor-pointer place-items-center rounded-full text-tinta-media transition-colors duration-300 hover:bg-tinta/[.07] hover:text-tinta"
    >
      {tema && (tema === "claro" ? <IconoLuna className="size-5" /> : <IconoSol className="size-5" />)}
    </button>
  );
}
