import type { ReactNode, Ref } from "react";

/*
 * El marco de las pantallas de celular (#35): un iPhone en titanio oscuro,
 * con sus botones, la isla y la barra de estado, para que se vea como un
 * teléfono de verdad y no como una caja con bordes redondos. Genérico: sin
 * logo ni nombre de Apple.
 *
 * `pantalla` viste el fondo, la letra y el color del texto de cada app;
 * `contenido`, el espaciado de adentro; `brillo`, la sombra con el color del
 * producto.
 */
export function Iphone({
  etiqueta,
  refCiclo,
  pantalla,
  contenido,
  brillo,
  children,
}: {
  etiqueta: string;
  refCiclo?: Ref<HTMLDivElement>;
  pantalla: string;
  contenido: string;
  brillo: string;
  children: ReactNode;
}) {
  return (
    <div ref={refCiclo} role="img" aria-label={etiqueta} className="relative w-80 max-w-full">
      {/* Los botones: acción y volumen a la izquierda, encendido a la derecha. */}
      <span aria-hidden="true" className="absolute top-[118px] -left-[2px] h-[30px] w-[3px] rounded-l-sm bg-[#3d3e43]" />
      <span aria-hidden="true" className="absolute top-[168px] -left-[2px] h-[56px] w-[3px] rounded-l-sm bg-[#3d3e43]" />
      <span aria-hidden="true" className="absolute top-[234px] -left-[2px] h-[56px] w-[3px] rounded-l-sm bg-[#3d3e43]" />
      <span aria-hidden="true" className="absolute top-[196px] -right-[2px] h-[88px] w-[3px] rounded-r-sm bg-[#3d3e43]" />

      <div className={`rounded-[55px] bg-[#2c2d31] p-[3px] shadow-[inset_0_0_0_1px_#5a5d63] ${brillo}`}>
        <div className="rounded-[52px] bg-black p-[9px]">
          <div className={`relative flex min-h-[650px] flex-col overflow-hidden rounded-[43px] ${pantalla}`}>
            <BarraDeEstado />
            <span aria-hidden="true" className="absolute top-[11px] left-1/2 h-[30px] w-[100px] -translate-x-1/2 rounded-full bg-black" />
            <div className={`flex flex-1 flex-col ${contenido}`}>{children}</div>
            <span aria-hidden="true" className="mx-auto mt-1 mb-2 h-[5px] w-[120px] shrink-0 rounded-full bg-current opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BarraDeEstado() {
  return (
    <div aria-hidden="true" className="flex h-12 shrink-0 items-center justify-between px-7 pt-1 text-[15px] font-semibold tracking-[-0.01em]">
      <span className="w-[52px] text-center">9:41</span>
      <span className="flex items-center gap-[5px]">
        {/* Señal */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="0.8" />
          <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
          <rect x="9.2" y="2.6" width="3" height="8.4" rx="0.8" />
          <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
          <path d="M7.5 2.3c2.1 0 4 .8 5.5 2.1l1.1-1.1A9.3 9.3 0 0 0 7.5.7 9.3 9.3 0 0 0 .9 3.3L2 4.4a7.7 7.7 0 0 1 5.5-2.1z" />
          <path d="M7.5 5.4c1.3 0 2.4.5 3.3 1.3l1.1-1.1a6.3 6.3 0 0 0-8.8 0l1.1 1.1c.9-.8 2-1.3 3.3-1.3z" />
          <path d="M7.5 8.4c.5 0 .9.2 1.2.5L7.5 10.1 6.3 8.9c.3-.3.7-.5 1.2-.5z" />
        </svg>
        {/* Batería */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.2" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="16" height="8" rx="1.8" fill="currentColor" />
          <path d="M24 4v4c.8-.3 1.3-1.1 1.3-2S24.8 4.3 24 4z" fill="currentColor" opacity="0.45" />
        </svg>
      </span>
    </div>
  );
}
