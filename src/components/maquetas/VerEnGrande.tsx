"use client";

import { useRef } from "react";
import { useTextos } from "@/idioma/Idioma";

/** Lo que Safari del iPhone agrega al <video>: ahí no hay requestFullscreen
    para un elemento cualquiera, sólo el reproductor propio del video. */
type VideoIOS = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

/** Lo que trae TypeScript no incluye `lock` (es de Chrome en Android). */
type OrientacionConLock = ScreenOrientation & { lock?: (o: "landscape") => Promise<void> };

/*
 * La grabación de escritorio, a pantalla completa (#61). En el celular la
 * ventana de Chrome se achica a un tercio de lo grabado y la letra no se lee;
 * en grande, con el teléfono de costado, llega a dos tercios.
 *
 * Usa la pantalla completa del navegador y no un visor propio: en el iPhone
 * es el reproductor del sistema, que gira solo. En Android, además, se pide
 * girar a horizontal (si el navegador no deja, se gira a mano).
 *
 * Mientras está en grande el video da vueltas: en el recorrido, al terminar
 * pasa a la función siguiente, y eso cerraba la pantalla completa de golpe.
 *
 * Va abajo a la izquierda: a la derecha lo puede tapar el botón de WhatsApp.
 */
export function VerEnGrande() {
  const t = useTextos().recorrido;
  const ref = useRef<HTMLButtonElement>(null);

  const abrir = async () => {
    // El video es el de la maqueta que comparte el contenedor con el botón.
    const video: VideoIOS | null | undefined = ref.current?.parentElement?.querySelector("video");
    if (!video) return;
    const orientacion = screen.orientation as OrientacionConLock | undefined;

    // Al salir de la pantalla completa vuelve a avisar al terminar, como antes.
    const salir = () => {
      if (document.fullscreenElement === video) return;
      video.loop = false;
      orientacion?.unlock?.();
      document.removeEventListener("fullscreenchange", salir);
      video.removeEventListener("webkitendfullscreen", salir);
    };
    document.addEventListener("fullscreenchange", salir);
    video.addEventListener("webkitendfullscreen", salir);

    video.loop = true;
    video.play().catch(() => {});
    try {
      if (video.requestFullscreen) {
        await video.requestFullscreen();
        await orientacion?.lock?.("landscape").catch(() => {});
      } else {
        video.webkitEnterFullscreen?.();
      }
    } catch {
      salir();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={abrir}
      className="absolute bottom-2 left-2 z-10 flex cursor-pointer items-center gap-1.5 rounded-full bg-black/70 px-3 py-2 text-[13px] font-semibold text-white backdrop-blur-sm"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
      </svg>
      {t.verEnGrande}
    </button>
  );
}
