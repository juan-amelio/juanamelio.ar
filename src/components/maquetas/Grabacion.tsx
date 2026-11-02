"use client";

import { useEffect, useRef, useState } from "react";
import { Iphone } from "./Iphone";
import type { Animable } from "./useCiclo";
import { Ventana } from "./Ventana";

/*
 * Una pantalla grabada de la app real (#44), en vez de dibujada: el MP4 y su
 * póster salen de scripts/grabar/ y viven en public/grabaciones/. Datos de
 * demo, siempre (el gimnasio de demo de gym-app).
 *
 * Se porta como las maquetas animadas (useCiclo): corre sólo mientras está
 * activa y a la vista, arranca de cero cada vez que vuelve a estar activa y,
 * con `alTerminar`, avisa al terminar en vez de dar la vuelta (el recorrido
 * pasa a la función siguiente). Sin `alTerminar` da vueltas (la portada).
 * Con «reducir movimiento» queda el póster quieto: el último cuadro, que es
 * el que cuenta qué pasó.
 */
function Video({ src, activo = true, alTerminar }: Animable & { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [quieto, setQuieto] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setQuieto(consulta.matches);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Al volver a estar activa, de cero, para que se vea entera.
  useEffect(() => {
    const el = ref.current;
    if (el && activo) el.currentTime = 0;
  }, [activo]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (quieto || !activo || !visible) {
      el.pause();
      return;
    }
    // El navegador puede negarse (ahorro de batería): queda el póster.
    el.play().catch(() => {});
  }, [quieto, activo, visible]);

  const aviso = useRef(alTerminar);
  useEffect(() => {
    aviso.current = alTerminar;
  });

  return (
    <video
      ref={ref}
      aria-hidden="true"
      className="block h-full w-full object-cover"
      poster={`${src}.jpg`}
      muted
      playsInline
      loop={alTerminar === undefined}
      preload={activo ? "auto" : "metadata"}
      onEnded={() => aviso.current?.()}
    >
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}

/** El fondo de la app de Global Fit, medido en la grabación: llena la barra
    de estado del iPhone para que no se vea el corte. */
const FONDO_GF = "bg-[#0d1313] text-[#eef1f1]";

export function TelefonoGrabado({ src, etiqueta, activo, alTerminar }: Animable & { src: string; etiqueta: string }) {
  return (
    <Iphone
      etiqueta={etiqueta}
      pantalla={`${FONDO_GF} font-gf`}
      contenido=""
      brillo="shadow-[0_40px_90px_-30px_rgba(0,181,181,.45)]"
    >
      <Video src={src} activo={activo} alTerminar={alTerminar} />
    </Iphone>
  );
}

export function VentanaGrabada({
  src,
  etiqueta,
  ruta,
  activo,
  alTerminar,
}: Animable & { src: string; etiqueta: string; ruta: string }) {
  return (
    <div role="img" aria-label={etiqueta}>
      <Ventana
        titulo="Global Fit · Admin"
        logo="/logos/global-fit.png"
        direccion={["globalfit.ar", ruta]}
        marco={`${FONDO_GF} shadow-[0_0_0_1px_#4a4b50,0_40px_90px_-34px_rgba(0,181,181,.4)]`}
      >
        <Video src={src} activo={activo} alTerminar={alTerminar} />
      </Ventana>
    </div>
  );
}
