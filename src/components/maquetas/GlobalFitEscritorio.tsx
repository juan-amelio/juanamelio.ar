"use client";

import { useCiclo } from "./useCiclo";
import { Ventana } from "./Ventana";

/* El panel del dueño de Global Fit en escritorio (#32), con datos de demo.
   Copia la forma del panel real (gym-app/src/app/admin): el menú arriba,
   la cola de lo que pide atención, los socios, la plantilla y las métricas. */

const TONO = {
  marco: "bg-gf-fondo font-gf text-gf-texto shadow-[0_0_0_1px_#3a4245,0_40px_90px_-34px_rgba(0,181,181,.4)]",
  barra: "bg-gf-tarjeta border-b border-gf-bisel",
  texto: "text-gf-suave",
  punto: "bg-gf-bisel",
};

const MENU = ["Inicio", "Socios", "Plantilla", "Calendario", "Métricas"] as const;
type Vista = "inicio" | "socios" | "plantilla" | "metricas";
const EN_MENU: Record<Vista, (typeof MENU)[number]> = {
  inicio: "Inicio",
  socios: "Socios",
  plantilla: "Plantilla",
  metricas: "Métricas",
};

export function PanelGF({ vista, activo = true }: { vista: Vista; activo?: boolean }) {
  const { ref, paso } = useCiclo(6, 1200, activo);
  return (
    <div ref={ref} role="img" aria-label="El panel del dueño de Global Fit en escritorio, con datos de demo">
      <Ventana titulo="Global Fit · Admin" tono={TONO}>
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-5 border-b border-gf-bisel px-4 py-2.5">
            <span className="flex items-center gap-1.5 text-[12px] font-bold">
              <span className="grid size-5 place-items-center rounded-md bg-gf-turquesa text-[10px] font-extrabold text-gf-fondo">G</span>
              <span className="text-gf-turquesa">Admin</span>
            </span>
            {MENU.map((m) => (
              <span
                key={m}
                className={`text-[11px] ${m === EN_MENU[vista] ? "font-semibold text-gf-texto" : "text-gf-suave"}`}
              >
                {m}
              </span>
            ))}
            <span className="ml-auto grid size-6 place-items-center rounded-full bg-linear-145 from-gf-turquesa-claro to-[#008e8e] text-[9px] font-bold text-gf-fondo">
              JP
            </span>
          </div>
          <div className="min-h-0 flex-1 px-5 py-4">
            {vista === "inicio" && <Inicio paso={paso} />}
            {vista === "socios" && <Socios paso={paso} />}
            {vista === "plantilla" && <Plantilla paso={paso} />}
            {vista === "metricas" && <Metricas paso={paso} />}
          </div>
        </div>
      </Ventana>
    </div>
  );
}

function Boton({ hecho, texto, listo }: { hecho: boolean; texto: string; listo: string }) {
  return hecho ? (
    <span className="entrar rounded-full px-2.5 py-1 text-[10px] font-bold text-gf-turquesa shadow-[inset_0_0_0_1.5px_var(--color-gf-turquesa)]">
      {listo}
    </span>
  ) : (
    <span className="rounded-full bg-gf-turquesa px-2.5 py-1 text-[10px] font-bold text-gf-fondo">{texto}</span>
  );
}

/* Lo que pide atención hoy: se va resolviendo de a uno y el titular cuenta lo que queda. */
const COLA = [
  { que: "Diego P. pidió entrar", detalle: "Plan Libre · se anotó ayer", texto: "Aprobar", listo: "Aprobado" },
  { que: "Lucía F. pidió entrar", detalle: "Plan 3 días · se anotó hoy", texto: "Aprobar", listo: "Aprobado" },
  { que: "Martina R. avisó que pagó", detalle: "Octubre · transferencia", texto: "Confirmar", listo: "Confirmado" },
  { que: "La semana del 20/10 no está generada", detalle: "Los socios todavía no pueden reservar", texto: "Generar", listo: "Generada" },
];

function Inicio({ paso }: { paso: number }) {
  const hechos = Math.max(0, Math.min(paso - 1, COLA.length));
  const quedan = COLA.length - hechos;
  return (
    <div>
      <p className="text-[10px] text-gf-suave">Martes 14 de octubre</p>
      <p key={quedan} className="entrar mt-0.5 text-[19px] leading-tight font-bold">
        {quedan === 0 ? "Todo al día. Buen entrenamiento." : `${quedan} ${quedan === 1 ? "cosa pide" : "cosas piden"} tu atención`}
      </p>
      <div className="mt-3 flex flex-col gap-1.5">
        {COLA.map((c, i) => (
          <div
            key={c.que}
            className={`flex items-center gap-3 rounded-xl bg-gf-tarjeta px-3.5 py-2.5 transition-opacity duration-500 ${i < hechos ? "opacity-55" : ""}`}
          >
            <span className={`size-1.5 shrink-0 rounded-full ${i < hechos ? "bg-gf-suave" : "bg-gf-aviso"}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold">{c.que}</p>
              <p className="text-[10px] text-gf-suave">{c.detalle}</p>
            </div>
            <Boton hecho={i < hechos} texto={c.texto} listo={c.listo} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-[10px] text-gf-suave">Lo que ven los socios: «Feriado del lunes: abrimos de 9 a 13».</p>
    </div>
  );
}

const SOCIOS = [
  { n: "Martina R.", plan: "3 días", pago: "02/10", estado: "dia" },
  { n: "Diego P.", plan: "Libre", pago: "—", estado: "pendiente" },
  { n: "Carla M.", plan: "3 días", pago: "05/10", estado: "dia" },
  { n: "Tomás G.", plan: "Libre", pago: "08/09", estado: "debe" },
  { n: "Ana L.", plan: "2 días", pago: "01/10", estado: "dia" },
  { n: "Bruno S.", plan: "3 días", pago: "04/10", estado: "dia" },
] as const;

function Socios({ paso }: { paso: number }) {
  const aprobado = paso >= 2;
  const pago = paso >= 4;
  const estado = (e: (typeof SOCIOS)[number]["estado"]) =>
    e === "pendiente" ? (aprobado ? "dia" : "pendiente") : e === "debe" ? (pago ? "dia" : "debe") : e;
  const CHIP = {
    dia: ["Al día", "text-gf-turquesa bg-gf-turquesa/12"],
    pendiente: ["Pendiente", "text-gf-aviso bg-gf-aviso/12"],
    debe: ["Debe octubre", "text-[#ff8a70] bg-[#ff8a70]/12"],
  } as const;
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[19px] leading-tight font-bold">Socios</p>
          <p className="text-[10px] text-gf-suave">
            {aprobado ? 87 : 86} activos · 4 profesores · {aprobado ? 0 : 1} pendiente{aprobado ? "s" : ""}
          </p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[10px] text-gf-texto-medio shadow-[inset_0_0_0_1px_#3a4245]">Buscar socio…</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-xl bg-gf-tarjeta text-[11px]">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1.1fr] px-3.5 py-2 text-[9px] text-gf-suave">
          <span>Socio</span>
          <span>Plan</span>
          <span>Último pago</span>
          <span>Estado</span>
        </div>
        {SOCIOS.map((s) => {
          const e = estado(s.estado);
          const [texto, clase] = CHIP[e];
          return (
            <div key={s.n} className="grid grid-cols-[1.4fr_1fr_1fr_1.1fr] items-center border-t border-gf-bisel px-3.5 py-[7px]">
              <span className="font-semibold">{s.n}</span>
              <span className="text-gf-texto-medio">{s.plan}</span>
              <span className="text-gf-texto-medio tabular-nums">{s.estado === "debe" && pago ? "14/10" : s.estado === "pendiente" && aprobado ? "14/10" : s.pago}</span>
              <span key={e} className={`entrar justify-self-start rounded-full px-2 py-0.5 text-[9.5px] font-bold ${clase}`}>
                {texto}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const HORAS = ["08:00", "12:30", "18:00", "19:00"];
const GRILLA: Record<string, (string | null)[]> = {
  "08:00": ["Funcional", null, "Funcional", null, "Funcional", "Cross"],
  "12:30": ["Cross", "Cross", null, "Cross", "Cross", null],
  "18:00": ["Funcional", "Movilidad", "Funcional", "Movilidad", "Funcional", null],
  "19:00": [null, "Funcional", null, "Funcional", null, null],
};

function Plantilla({ paso }: { paso: number }) {
  const nueva = paso >= 2; // aparece una clase nueva el sábado a la tarde
  const generada = paso >= 4;
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[19px] leading-tight font-bold">Plantilla</p>
          <p className="text-[10px] text-gf-suave">Horarios y cupos de cada semana</p>
        </div>
        <Boton hecho={generada} texto="Generar la semana del 20/10" listo="Semana del 20/10 generada" />
      </div>
      <div className="mt-3 grid grid-cols-[44px_repeat(6,1fr)] gap-1 text-[9.5px]">
        <span />
        {DIAS.map((d) => (
          <span key={d} className="pb-0.5 text-center text-gf-suave">
            {d}
          </span>
        ))}
        {HORAS.map((h) => (
          <Fila key={h} hora={h} clases={h === "18:00" && nueva ? [...GRILLA[h].slice(0, 5), "Movilidad"] : GRILLA[h]} nueva={h === "18:00" && nueva} />
        ))}
      </div>
      <p className="mt-3 text-[10px] text-gf-suave">Cupo por clase: 12 lugares. Se reserva hasta 48 h antes, lo define el gimnasio.</p>
    </div>
  );
}

function Fila({ hora, clases, nueva }: { hora: string; clases: (string | null)[]; nueva: boolean }) {
  return (
    <>
      <span className="py-2 text-gf-suave tabular-nums">{hora}</span>
      {clases.map((c, i) =>
        c ? (
          <span
            key={i}
            className={`rounded-lg px-1.5 py-2 text-center font-semibold ${
              nueva && i === 5 ? "entrar bg-[#182728] text-gf-turquesa-claro shadow-[0_0_0_1px_var(--color-gf-turquesa)]" : "bg-gf-tarjeta"
            }`}
          >
            {c}
          </span>
        ) : (
          <span key={i} className="rounded-lg shadow-[inset_0_0_0_1px_#23292b]" />
        ),
      )}
    </>
  );
}

const POR_HORARIO = [
  { h: "08", v: 7 },
  { h: "12", v: 5 },
  { h: "18", v: 11 },
  { h: "19", v: 9 },
  { h: "20", v: 6 },
];
const POR_PLAN = [
  { p: "Libre", v: 38 },
  { p: "3 días", v: 41 },
  { p: "2 días", v: 21 },
];

function Metricas({ paso }: { paso: number }) {
  const lleno = paso >= 1;
  return (
    <div>
      <p className="text-[19px] leading-tight font-bold">Métricas</p>
      <p className="text-[10px] text-gf-suave">Octubre, hasta hoy</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["412", "asistencias"],
          ["78 %", "ocupación de las clases"],
          ["87", "socios activos"],
        ].map(([v, e]) => (
          <div key={e} className="rounded-xl bg-gf-tarjeta px-3 py-2.5">
            <p className="text-[20px] leading-none font-extrabold tabular-nums">{v}</p>
            <p className="mt-1 text-[9.5px] text-gf-suave">{e}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-[1.3fr_1fr] gap-2">
        <div className="rounded-xl bg-gf-tarjeta px-3 pt-2.5 pb-2">
          <p className="text-[10px] text-gf-suave">Asistencia promedio por horario</p>
          <div className="mt-2 flex h-[92px] items-end gap-2">
            {POR_HORARIO.map((b) => (
              <div key={b.h} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span
                  className="w-full rounded-t-md bg-gf-turquesa/80 transition-[height] duration-700 ease-out"
                  style={{ height: lleno ? `${(b.v / 12) * 100}%` : "4%" }}
                />
                <span className="text-[9px] text-gf-suave">{b.h} h</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-gf-tarjeta px-3 py-2.5">
          <p className="text-[10px] text-gf-suave">Socios por plan</p>
          <div className="mt-2.5 flex flex-col gap-2.5">
            {POR_PLAN.map((p) => (
              <div key={p.p}>
                <div className="flex justify-between text-[10px]">
                  <span>{p.p}</span>
                  <span className="text-gf-suave tabular-nums">{p.v} %</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-gf-bisel">
                  <div
                    className="h-full rounded-full bg-gf-turquesa transition-[width] duration-700 ease-out"
                    style={{ width: lleno ? `${p.v}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
