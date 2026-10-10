"use client";

import { useLayoutEffect, ViewTransition, type ReactNode } from "react";

/*
 * Las transiciones entre el inicio y los casos (#28), con las View Transitions
 * del navegador a través del <ViewTransition> de React.
 *
 * - Entrar a un caso es un zoom hacia adentro (tipo «adentro»); volver al
 *   inicio, hacia afuera («afuera»). Las animaciones están en globals.css.
 * - La pantalla del producto es la misma de los dos lados (nombre
 *   «maqueta-<caso>»): el navegador la lleva de su lugar en el recorrido a su
 *   lugar en la portada del caso.
 * Sin soporte del navegador, o con «reducir movimiento», se navega sin más.
 */
export const ADENTRO = ["adentro"];
export const AFUERA = ["afuera"];

export function Pagina({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ adentro: "zoom-adentro", afuera: "zoom-afuera", default: "none" }}
      exit={{ adentro: "zoom-adentro", afuera: "zoom-afuera", default: "none" }}
      default="none"
    >
      <div className="flex flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}

/** La pantalla de un producto que viaja de una página a la otra. */
export function MaquetaQueViaja({ caso, children }: { caso: string; children: ReactNode }) {
  return (
    <ViewTransition name={`maqueta-${caso}`} share="viaje" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/* Un caso se lee desde arriba: sin esto, se llegaba con el scroll que traía el
   inicio y la página nueva aparecía por la mitad. */
export function ArribaDeTodo() {
  useLayoutEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);
  return null;
}
