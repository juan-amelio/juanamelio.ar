"use client";

import { Iphone } from "./Iphone";
import { useCiclo, type Animable } from "./useCiclo";

/* El inicio del socio en Global Fit, con datos de demo. Vivo: el socio
   reserva, el cupo baja y la semana se completa. */
export function TelefonoGlobalFit({ activo = true, alTerminar }: Animable) {
  const { ref, paso } = useCiclo(4, 1700, activo, alTerminar);
  const reservada = paso >= 2;
  const lugares = reservada ? 3 : 4;
  const hechas = reservada ? 4 : 3;

  return (
    <Iphone
      refCiclo={ref}
      etiqueta="Pantalla de inicio de un socio en la app de Global Fit, con datos de demo"
      pantalla="bg-gf-fondo font-gf text-gf-texto"
      contenido="gap-4 px-4.5 pt-1 pb-1.5"
      brillo="shadow-[0_40px_90px_-30px_rgba(0,181,181,.45)]"
    >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-gf-suave">Martes 14 de octubre</p>
            <p className="mt-0.5 text-[22px] font-bold">Hola, Martina</p>
          </div>
          <span className="flex size-10.5 items-center justify-center rounded-full bg-linear-145 from-gf-turquesa-claro to-[#008e8e] text-[15px] font-bold text-gf-fondo">
            MR
          </span>
        </div>
        <div className="rounded-[20px] bg-linear-160 from-[#1d3132] to-[#14191a] p-5 shadow-[0_0_0_1px_rgba(0,181,181,.25),0_10px_30px_-10px_rgba(0,181,181,.45)]">
          <p className="text-[13px] text-[#8fd9d8]">Tu próxima clase</p>
          <p className="mt-1.5 text-lg font-semibold">Funcional</p>
          <p className="latido mt-0.5 text-[64px] leading-none font-extrabold tracking-[-2px] text-[#e9fffe] [text-shadow:0_0_24px_rgba(0,181,181,.75)]">
            19:00
          </p>
          <p className="mt-2 text-[13px] text-[#a9b0b1]">Con Lucas, en la sala 2</p>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span key={lugares} className="entrar text-[13px] text-gf-texto-medio">
              Quedan {lugares} lugares
            </span>
            <span
              className={`rounded-full px-3.5 py-2 text-[13px] font-bold transition-all duration-300 ${
                reservada
                  ? "bg-transparent text-gf-turquesa shadow-[inset_0_0_0_1.5px_var(--color-gf-turquesa)]"
                  : `bg-gf-turquesa text-gf-fondo ${paso === 1 ? "scale-95" : ""}`
              }`}
            >
              {reservada ? "Reservada" : "Reservar"}
            </span>
          </div>
        </div>
        <div className="rounded-2xl bg-gf-tarjeta p-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-gf-suave">Esta semana</span>
            <span className="font-semibold">{hechas} de 4 clases</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-sm transition-colors duration-500 ${i < hechas ? "bg-gf-turquesa" : "bg-[#2c3234]"}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#2a2616] px-4 py-3.5 shadow-[inset_0_0_0_1px_rgba(232,190,80,.35)]">
          <span className="text-[13px] text-gf-aviso">Tu cuota vence el 20/10</span>
          <span className="text-[13px] font-bold text-[#f6e2a8]">Pagar</span>
        </div>
        <div className="mt-auto grid grid-cols-4 border-t border-white/8 pt-3 text-center text-[11px] text-[#8c9192]">
          <Pestana activa nombre="Inicio" d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
          <Pestana nombre="Reservar" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M8 3v4M16 3v4" />
          <Pestana nombre="Pagos" d="M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 10h20" />
          <Pestana nombre="Perfil" d="M8 8a4 4 0 1 0 8 0a4 4 0 1 0-8 0M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </div>
    </Iphone>
  );
}

function Pestana({ nombre, d, activa = false }: { nombre: string; d: string; activa?: boolean }) {
  return (
    <span className={activa ? "font-semibold text-gf-turquesa" : undefined}>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1 block">
        <path d={d} />
      </svg>
      {nombre}
    </span>
  );
}
