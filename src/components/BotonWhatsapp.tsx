"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

/*
 * El botón flotante de WhatsApp (#28), que se va mientras se ve Contacto
 * (#61): ahí ya está el de WhatsApp con los demás, y el flotante tapaba el
 * texto y el pie. En una página sin Contacto (la 404) se queda siempre.
 * Se vuelve a buscar la sección en cada ruta: el botón vive en el layout, y
 * de la 404 al inicio se llega sin recargar.
 */
export function BotonWhatsapp({ className, children, ...enlace }: { href: string; "aria-label": string; className: string; children: ReactNode }) {
  const ruta = usePathname();
  const [enContacto, setEnContacto] = useState(false);

  useEffect(() => {
    const seccion = document.getElementById("contacto");
    if (!seccion) return;
    const obs = new IntersectionObserver(([e]) => setEnContacto(e.isIntersecting), { threshold: 0.15 });
    obs.observe(seccion);
    return () => {
      obs.disconnect();
      setEnContacto(false);
    };
  }, [ruta]);

  return (
    <a
      {...enlace}
      target="_blank"
      rel="noreferrer"
      inert={enContacto}
      className={`${className} transition-[scale,opacity,translate] duration-300 ${enContacto ? "pointer-events-none translate-y-4 opacity-0" : ""}`}
    >
      {children}
    </a>
  );
}
