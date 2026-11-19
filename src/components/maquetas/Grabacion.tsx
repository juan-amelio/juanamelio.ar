"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { IntroA7 } from "./IntroA7";
import { Iphone } from "./Iphone";
import { Ventana } from "./Ventana";

/** Lo que recibe toda pantalla animada. */
export type Animable = { activo?: boolean; alTerminar?: () => void };

/*
 * Una pantalla grabada de la app real (#44), en vez de dibujada: el MP4 y su
 * póster salen de scripts/grabar/ y viven en public/grabaciones/. Datos de
 * demo, siempre: el gimnasio de demo de gym-app, la base de demo de A7 (el
 * catálogo y las fotos de verdad, lo demás inventado) y el tablero de demo de
 * Forge.
 *
 * Se porta como las maquetas dibujadas de antes (useCiclo, que se fue con
 * la última, la de A7): corre sólo mientras está activa y a la vista,
 * arranca de cero cada vez que vuelve a estar activa y, con `alTerminar`,
 * avisa al terminar en vez de dar la vuelta (el recorrido pasa a la función
 * siguiente). Sin `alTerminar` da vueltas (la portada). Con «reducir
 * movimiento» queda el póster quieto: el último cuadro, que es el que cuenta
 * qué pasó.
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

/** El fondo de cada app, medido en la grabación: llena la barra de estado
    del iPhone para que no se vea el corte. */
const FONDO_GF = "bg-[#0d1313] text-[#eef1f1]";
const FONDO_A7 = "bg-[#171717] text-[#f0ecdf]";

/** Cómo se presenta cada app en el iPhone: su fondo y el brillo de su marca. */
const TELEFONOS = {
  "global-fit": { pantalla: `${FONDO_GF} font-gf`, brillo: "shadow-[0_40px_90px_-30px_rgba(0,181,181,.45)]" },
  "a7-sports": { pantalla: `${FONDO_A7} font-a7`, brillo: "shadow-[0_40px_90px_-30px_rgba(190,222,20,.35)]" },
} as const;

export function TelefonoGrabado({
  src,
  etiqueta,
  app = "global-fit",
  activo = true,
  alTerminar,
  intro = false,
}: Animable & { src: string; etiqueta: string; app?: keyof typeof TELEFONOS; intro?: boolean }) {
  const { pantalla, brillo } = TELEFONOS[app];
  const marco = useRef<HTMLDivElement>(null);
  const fase = useFaseIntro(intro, activo, marco);
  return (
    <Iphone refCiclo={marco} etiqueta={etiqueta} pantalla={pantalla} contenido="" brillo={brillo}>
      {/* Mientras corre la intro la grabación espera: arranca de cero cuando termina. */}
      <Video src={src} activo={activo && fase.estado === "hecha"} alTerminar={alTerminar} />
      {fase.estado === "corriendo" ? <IntroA7 alTerminar={fase.terminar} /> : null}
    </Iphone>
  );
}

/*
 * La intro se ve una vez por visita (#49): la primera vez que el teléfono está
 * activo y a la vista, y entera. Una vez vista, si se sigue bajando y se
 * vuelve, va directo a la grabación. Queda en sessionStorage, así recargar la página tampoco la
 * repite; una visita nueva (otra pestaña, otro día) la vuelve a mostrar. Con
 * «reducir movimiento» no aparece.
 *
 * En la página hay dos teléfonos de A7: el de la columna fija (escritorio) y
 * el de abajo de la lista (celular). Uno de los dos está escondido y nunca
 * queda a la vista, así que la intro corre en el que se ve, y la marca en
 * memoria evita que el otro la repita.
 */
const CLAVE_INTRO = "intro-a7-vista";
let introVista = false;

function yaSeVio() {
  if (introVista) return true;
  try {
    return sessionStorage.getItem(CLAVE_INTRO) === "1";
  } catch {
    return false;
  }
}

function marcarVista() {
  introVista = true;
  try {
    sessionStorage.setItem(CLAVE_INTRO, "1");
  } catch {}
}

type FaseIntro = { estado: "espera" | "corriendo" | "hecha"; terminar: () => void };

function useFaseIntro(intro: boolean, activo: boolean, marco: RefObject<HTMLDivElement | null>): FaseIntro {
  const [estado, setEstado] = useState<FaseIntro["estado"]>(intro ? "espera" : "hecha");

  // Se decide cuando el teléfono, activo, queda a la vista. El observador se
  // rearma al cambiar `activo`, y al empezar a observar avisa cómo está.
  useEffect(() => {
    const el = marco.current;
    if (estado !== "espera" || !activo || !el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setEstado(yaSeVio() || quieto ? "hecha" : "corriendo");
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [estado, activo, marco]);

  // Cuenta como vista recién al terminar (o al saltearla tocando). Si se va
  // del caso a mitad de camino —o sólo pasó por él bajando rápido— vuelve a
  // esperar, y al volver se ve entera.
  if (estado === "corriendo" && !activo) setEstado("espera");

  return {
    estado,
    terminar: () => {
      marcarVista();
      setEstado("hecha");
    },
  };
}

/** Cómo se presenta cada app en la ventana de Chrome. Global Fit muestra su
    dominio real; Forge sólo su nombre, para no inventar uno (11/10), y la
    pestaña dice ADJ Forge porque así se llama la app que se ve grabada.
    Forge va con su tema claro (01/11): el fondo es el papel de Broadsheet.
    A7 muestra su dominio real y la marca como se escribe en la app. */
const APPS = {
  "global-fit": {
    titulo: "Global Fit · Admin",
    logo: "/logos/global-fit.png",
    dominio: "globalfit.ar",
    marco: `${FONDO_GF} shadow-[0_0_0_1px_#4a4b50,0_40px_90px_-34px_rgba(0,181,181,.4)]`,
  },
  "a7-sports": {
    titulo: "A7 sports",
    logo: "/logos/a7-sports.svg",
    dominio: "a7sports.com.ar",
    marco: `${FONDO_A7} shadow-[0_0_0_1px_#4a4b50,0_40px_90px_-34px_rgba(190,222,20,.3)]`,
  },
  "forge-studio": {
    titulo: "ADJ Forge",
    logo: "/logos/forge-studio.svg",
    dominio: "ADJ Forge",
    marco: "bg-fs-fondo text-fs-tinta shadow-[0_0_0_1px_#4a4b50,0_40px_80px_-40px_rgba(0,0,0,.6)]",
  },
} as const;

export function VentanaGrabada({
  src,
  etiqueta,
  ruta,
  app = "global-fit",
  activo,
  alTerminar,
  enlace,
}: Animable & { src: string; etiqueta: string; ruta: string; app?: keyof typeof APPS; enlace?: string }) {
  const { titulo, logo, dominio, marco } = APPS[app];
  return (
    <div role="img" aria-label={etiqueta}>
      <Ventana titulo={titulo} logo={logo} direccion={[dominio, ruta]} marco={marco} enlace={enlace}>
        <Video src={src} activo={activo} alTerminar={alTerminar} />
      </Ventana>
    </div>
  );
}
