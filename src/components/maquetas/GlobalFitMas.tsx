"use client";

import type { ReactNode } from "react";
import { useCiclo, type Animable } from "./useCiclo";

/* Más pantallas de Global Fit para la galería del caso (#27), con datos de
   demo y el mismo marco que el inicio del socio. */

function Telefono({ etiqueta, children, refCiclo }: { etiqueta: string; children: ReactNode; refCiclo: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={refCiclo}
      role="img"
      aria-label={etiqueta}
      className="w-80 max-w-full rounded-[46px] bg-gf-bisel p-2.5 font-gf text-gf-texto shadow-[0_40px_90px_-30px_rgba(0,181,181,.45),0_0_0_1px_#3a4245]"
    >
      <div className="flex min-h-155 flex-col gap-3.5 rounded-[37px] bg-gf-fondo px-4.5 pt-5.5 pb-4">{children}</div>
    </div>
  );
}

const DIAS = ["Lun 13", "Mar 14", "Mié 15", "Jue 16", "Vie 17"];
const CLASES = [
  { h: "08:00", n: "Funcional", p: "Lucas", lugares: 2 },
  { h: "12:30", n: "Cross", p: "Sofía", lugares: 0 },
  { h: "18:00", n: "Funcional", p: "Lucas", lugares: 5 },
  { h: "19:00", n: "Movilidad", p: "Ana", lugares: 4 },
];

export function ReservarGF({ activo = true, alTerminar }: Animable) {
  const { ref, paso } = useCiclo(5, 1300, activo, alTerminar);
  const dia = paso >= 1 ? 2 : 1;
  const reservada = paso >= 3;
  return (
    <Telefono refCiclo={ref} etiqueta="Global Fit: el socio elige un día y reserva una clase, con datos de demo">
      <p className="text-[22px] font-bold">Reservar</p>
      <div className="flex gap-1.5">
        {DIAS.map((d, i) => (
          <span
            key={d}
            className={`flex-1 rounded-xl py-2 text-center text-[11px] leading-tight transition-colors duration-300 ${
              i === dia ? "bg-gf-turquesa font-bold text-gf-fondo" : "bg-gf-tarjeta text-gf-texto-medio"
            }`}
          >
            {d.split(" ")[0]}
            <span className="block text-[15px] font-bold">{d.split(" ")[1]}</span>
          </span>
        ))}
      </div>
      <div key={dia} className="entrar flex flex-col gap-2.5">
        {CLASES.map((c, i) => {
          const elegida = i === 2;
          const lugares = elegida && reservada ? c.lugares - 1 : c.lugares;
          const llena = c.lugares === 0;
          return (
            <div
              key={c.h}
              className={`flex items-center gap-3 rounded-2xl p-3.5 transition-shadow duration-300 ${
                elegida && paso >= 2 ? "bg-[#182728] shadow-[0_0_0_1.5px_var(--color-gf-turquesa)]" : "bg-gf-tarjeta"
              }`}
            >
              <span className="text-xl font-extrabold tabular-nums">{c.h}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold">{c.n}</p>
                <p className="text-[11px] text-gf-suave">
                  Con {c.p} · {llena ? "Sin lugares" : `${lugares} lugares`}
                </p>
              </div>
              {llena ? (
                <span className="text-[11px] text-gf-suave">Llena</span>
              ) : elegida && reservada ? (
                <span className="entrar rounded-full px-3 py-1.5 text-[11px] font-bold text-gf-turquesa shadow-[inset_0_0_0_1.5px_var(--color-gf-turquesa)]">
                  Reservada
                </span>
              ) : (
                <span className="rounded-full bg-gf-turquesa px-3 py-1.5 text-[11px] font-bold text-gf-fondo">Reservar</span>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-auto rounded-2xl bg-gf-tarjeta px-4 py-3 text-[11px] leading-snug text-gf-suave">
        Se reserva hasta 48 h antes y se cancela hasta 1 h antes sin perder el día. Lo define el gimnasio.
      </p>
    </Telefono>
  );
}

const ALUMNOS = [
  { n: "Martina R.", dolor: false },
  { n: "Diego P.", dolor: true },
  { n: "Carla M.", dolor: false },
  { n: "Tomás G.", dolor: false },
  { n: "Lucía F.", dolor: false },
];

export function AsistenciaGF({ activo = true, alTerminar }: Animable) {
  const { ref, paso } = useCiclo(7, 900, activo, alTerminar);
  const presentes = Math.min(paso, ALUMNOS.length);
  return (
    <Telefono refCiclo={ref} etiqueta="Global Fit: el profesor toma asistencia y ve quién reportó dolor, con datos de demo">
      <div>
        <p className="text-[13px] text-gf-suave">Hoy, 18:00 · Sala 2</p>
        <p className="text-[22px] font-bold">Funcional</p>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-gf-tarjeta px-4 py-3 text-[13px]">
        <span className="text-gf-suave">Asistieron</span>
        <span className="font-bold tabular-nums">
          {presentes} de {ALUMNOS.length}
        </span>
      </div>
      {ALUMNOS.map((a, i) => {
        const ok = i < presentes;
        return (
          <div
            key={a.n}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${a.dolor ? "bg-[#2a1717] shadow-[inset_0_0_0_1px_rgba(255,106,77,.45)]" : "bg-gf-tarjeta"}`}
          >
            <span
              className={`grid size-6 place-items-center rounded-full transition-colors duration-300 ${
                ok ? "bg-gf-turquesa text-gf-fondo" : "shadow-[inset_0_0_0_1.5px_#4a5254]"
              }`}
            >
              {ok && (
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              )}
            </span>
            <span className="flex-1 text-[14px] font-semibold">{a.n}</span>
            {a.dolor && <span className="text-[11px] font-semibold text-[#ff8a70]">Reportó dolor de rodilla</span>}
          </div>
        );
      })}
      <span className="mt-auto rounded-full bg-gf-turquesa py-3 text-center text-[13px] font-bold text-gf-fondo">Todos asistieron</span>
    </Telefono>
  );
}

const ZONAS = ["Piernas", "Glúteos", "Core", "Espalda", "Pecho", "Hombros", "Brazos", "Cardio"];

export function EntrenoGF({ activo = true, alTerminar }: Animable) {
  const { ref, paso } = useCiclo(6, 1000, activo, alTerminar);
  const marcadas = ["Piernas", "Core", "Cardio"].slice(0, Math.max(0, paso - 1));
  return (
    <Telefono refCiclo={ref} etiqueta="Global Fit: el socio anota qué trabajó en la clase, con datos de demo">
      <p className="text-[22px] font-bold">Entreno</p>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-linear-160 from-[#1d3132] to-[#14191a] p-4 shadow-[0_0_0_1px_rgba(0,181,181,.25)]">
          <p className="text-[34px] leading-none font-extrabold text-[#e9fffe] [text-shadow:0_0_18px_rgba(0,181,181,.7)]">6</p>
          <p className="mt-1 text-[11px] text-[#8fd9d8]">semanas seguidas</p>
        </div>
        <div className="rounded-2xl bg-gf-tarjeta p-4">
          <p className="text-[34px] leading-none font-extrabold">48</p>
          <p className="mt-1 text-[11px] text-gf-suave">clases en total</p>
        </div>
      </div>
      <div className="rounded-2xl bg-gf-tarjeta p-4">
        <p className="text-[11px] text-gf-suave">Últimos meses</p>
        <div className="mt-2 flex h-14 items-end gap-1.5">
          {[5, 7, 6, 9, 8, 11, 10, 12].map((v, i) => (
            <span key={i} className="flex-1 rounded-t-sm bg-gf-turquesa/70" style={{ height: `${v * 8}%` }} />
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-gf-tarjeta p-4">
        <p className="text-[13px] font-semibold">Funcional · ayer</p>
        <p className="mt-0.5 text-[11px] text-gf-suave">¿Qué trabajaste?</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {ZONAS.map((z) => {
            const on = marcadas.includes(z);
            return (
              <span
                key={z}
                className={`rounded-full px-2.5 py-1 text-[11px] transition-colors duration-300 ${
                  on ? "bg-gf-turquesa font-bold text-gf-fondo" : "text-gf-texto-medio shadow-[inset_0_0_0_1px_#3a4245]"
                }`}
              >
                {z}
              </span>
            );
          })}
        </div>
        <p className={`mt-3 text-[11px] transition-opacity duration-300 ${paso >= 5 ? "opacity-100" : "opacity-0"}`}>
          Nota: sentadilla con 40 kg, 4×10.
        </p>
      </div>
      <p className="mt-auto text-center text-[10px] text-gf-suave">Es un diario personal: lo ve solo el socio.</p>
    </Telefono>
  );
}

const PAGOS = [
  { n: "Martina R.", plan: "3 días" },
  { n: "Diego P.", plan: "Libre" },
  { n: "Carla M.", plan: "3 días" },
  { n: "Tomás G.", plan: "Libre" },
];

export function PagosGF({ activo = true, alTerminar }: Animable) {
  const { ref, paso } = useCiclo(6, 1000, activo, alTerminar);
  const confirmados = Math.max(0, Math.min(paso - 1, PAGOS.length));
  return (
    <Telefono refCiclo={ref} etiqueta="Global Fit: el dueño confirma los pagos que avisaron los socios, con datos de demo">
      <div>
        <p className="text-[13px] text-gf-suave">Panel del gimnasio</p>
        <p className="text-[22px] font-bold">Pagos de octubre</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-gf-tarjeta p-3.5">
          <p className="text-[26px] leading-none font-extrabold tabular-nums">{PAGOS.length - confirmados}</p>
          <p className="mt-1 text-[11px] text-gf-suave">por confirmar</p>
        </div>
        <div className="rounded-2xl bg-linear-160 from-[#1d3132] to-[#14191a] p-3.5 shadow-[0_0_0_1px_rgba(0,181,181,.25)]">
          <p className="text-[26px] leading-none font-extrabold text-[#e9fffe] tabular-nums">{22 + confirmados}</p>
          <p className="mt-1 text-[11px] text-[#8fd9d8]">al día</p>
        </div>
      </div>
      <p className="mt-1 text-[12px] text-gf-suave">Avisaron que pagaron</p>
      {PAGOS.map((p, i) => {
        const ok = i < confirmados;
        return (
          <div key={p.n} className="flex items-center gap-3 rounded-2xl bg-gf-tarjeta px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold">{p.n}</p>
              <p className="text-[11px] text-gf-suave">Plan {p.plan} · transferencia</p>
            </div>
            {ok ? (
              <span className="entrar rounded-full px-3 py-1.5 text-[11px] font-bold text-gf-turquesa shadow-[inset_0_0_0_1.5px_var(--color-gf-turquesa)]">
                Confirmado
              </span>
            ) : (
              <span className="rounded-full bg-gf-turquesa px-3 py-1.5 text-[11px] font-bold text-gf-fondo">Confirmar</span>
            )}
          </div>
        );
      })}
      <p className="mt-auto rounded-2xl bg-gf-tarjeta px-4 py-3 text-[11px] leading-snug text-gf-suave">
        La app no cobra: el socio transfiere y avisa, y el dueño confirma.
      </p>
    </Telefono>
  );
}
