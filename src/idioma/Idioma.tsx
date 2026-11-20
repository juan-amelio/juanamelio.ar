"use client";

import { createContext, useContext, type ReactNode } from "react";
import { INICIO, type Idioma } from "./idiomas";
import { TEXTOS } from "./textos";

const Contexto = createContext<Idioma>("es");

/* El idioma de la página, para los componentes que corren en el navegador. Lo
   pone el layout con el de la ruta (app/[lang]). */
export function ConIdioma({ idioma, children }: { idioma: Idioma; children: ReactNode }) {
  return <Contexto.Provider value={idioma}>{children}</Contexto.Provider>;
}

export const useIdioma = () => useContext(Contexto);
export const useTextos = () => TEXTOS[useContext(Contexto)];
/** Dónde empieza la versión que se está mirando: «/» o «/en». */
export const useInicio = () => INICIO[useContext(Contexto)];
