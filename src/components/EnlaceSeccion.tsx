"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

/*
 * Un enlace a una sección del inicio ("/#proceso"). Si ya se está en el
 * inicio, la página se desliza hasta la sección en vez de saltar; desde un
 * caso, navega como cualquier Link.
 *
 * No alcanza con scroll-behavior: smooth en el CSS: Next envuelve la
 * navegación en una transición de vista y el deslizamiento se cancela.
 */
export function EnlaceSeccion({ href, onClick, ...resto }: ComponentProps<typeof Link> & { href: `/#${string}` }) {
  const ruta = usePathname();

  const deslizar = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (ruta !== "/" || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const id = href.slice(2);
    const destino = document.getElementById(id);
    if (!destino) return;
    e.preventDefault();
    history.pushState(null, "", `#${id}`);
    irA(destino);
  };

  return <Link href={href} onClick={deslizar} {...resto} />;
}

/* Desliza con una curva suave (lenta al salir y al llegar) y un tiempo que
   crece con la distancia, entre 0,6 y 1,2 s. Si la persona toca la rueda o la
   pantalla en el camino, se le devuelve el control. Con «reducir movimiento»,
   salta. */
function irA(destino: HTMLElement) {
  const margen = parseFloat(getComputedStyle(destino).scrollMarginTop) || 0;
  const desde = window.scrollY;
  const hasta = Math.min(
    desde + destino.getBoundingClientRect().top - margen,
    document.documentElement.scrollHeight - window.innerHeight,
  );
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: hasta, behavior: "instant" });
    return;
  }

  const distancia = hasta - desde;
  const duracion = Math.min(1200, Math.max(600, Math.abs(distancia) * 0.25));
  const inicio = performance.now();
  let raf = 0;
  const soltar = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", soltar);
    window.removeEventListener("touchstart", soltar);
  };
  window.addEventListener("wheel", soltar, { passive: true });
  window.addEventListener("touchstart", soltar, { passive: true });

  const paso = (ahora: number) => {
    const t = Math.min(1, (ahora - inicio) / duracion);
    const curva = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
    window.scrollTo({ top: desde + distancia * curva, behavior: "instant" });
    if (t < 1) raf = requestAnimationFrame(paso);
    else soltar();
  };
  raf = requestAnimationFrame(paso);
}
