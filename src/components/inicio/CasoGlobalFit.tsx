import Link from "next/link";
import { Datos } from "./Datos";

export function CasoGlobalFit() {
  return (
    <section
      id="global-fit"
      className="bg-gf-fondo font-gf text-gf-texto [background-image:radial-gradient(60%_50%_at_78%_40%,rgba(0,181,181,.16),transparent_70%)]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-20 gap-y-14 px-4 py-20 sm:px-14 sm:py-34">
        <div className="min-w-0 flex-[1_1_460px]">
          <p className="text-[22px] font-extrabold tracking-[-0.5px]">
            GLOBAL<span className="text-gf-turquesa">FIT</span>
          </p>
          <h2 className="mt-5 max-w-[14ch] text-[clamp(34px,4.4vw,60px)] leading-[1.02] font-bold tracking-[-0.03em]">
            Del cuaderno al celular.
          </h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-gf-texto-medio">
            La app de un gimnasio de Mendoza. Los socios reservan desde el celular, los profesores toman
            asistencia en la clase y el dueño aprueba socios y confirma pagos desde un panel. Las reglas
            —anticipación, cancelación, cupos— las cambia él, sin llamarme.
          </p>
          <div className="mt-8 rounded-2xl bg-[#182021] px-6 py-5 shadow-[inset_0_0_0_1px_rgba(0,181,181,.28)]">
            <p className="text-xl font-bold">Los datos de salud no son un campo más.</p>
            <p className="mt-2 max-w-[52ch] leading-normal text-[#b4babb]">
              Consentimiento antes de guardar nada, cada profesor ve solo a sus alumnos y al año de la baja se
              borran solos, como pide la Ley 25.326.
            </p>
          </div>
          <Datos
            claseEtiqueta="text-gf-suave"
            items={[
              ["En producción", "Desde el 12/09/2026"],
              ["Dónde", "globalfit.ar"],
              ["Con", "Next.js, Postgres, Prisma"],
            ]}
          />
          <Link href="/casos/global-fit" className="boton mt-9 bg-gf-turquesa text-gf-fondo hover:bg-gf-turquesa-claro">
            Ver el caso de Global Fit
          </Link>
        </div>
        <div className="mx-auto flex-[0_1_330px]">
          <TelefonoGlobalFit />
          <p className="mt-3.5 text-center text-[13px] text-[#8c9192]">Datos de demo</p>
        </div>
      </div>
    </section>
  );
}

function TelefonoGlobalFit() {
  return (
    <div
      role="img"
      aria-label="Pantalla de inicio de un socio en la app de Global Fit, con datos de demo"
      className="w-80 max-w-full rounded-[46px] bg-gf-bisel p-2.5 shadow-[0_40px_90px_-30px_rgba(0,181,181,.45),0_0_0_1px_#3a4245]"
    >
      <div className="flex min-h-155 flex-col gap-4 rounded-[37px] bg-gf-fondo px-4.5 pt-5.5 pb-3.5">
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
          <p className="mt-0.5 text-[64px] leading-none font-extrabold tracking-[-2px] text-[#e9fffe] [text-shadow:0_0_24px_rgba(0,181,181,.75)]">
            19:00
          </p>
          <p className="mt-2 text-[13px] text-[#a9b0b1]">Con Lucas, en la sala 2</p>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="text-[13px] text-gf-texto-medio">Quedan 4 lugares</span>
            <span className="rounded-full bg-gf-turquesa px-3.5 py-2 text-[13px] font-bold text-gf-fondo">Ver reserva</span>
          </div>
        </div>
        <div className="rounded-2xl bg-gf-tarjeta p-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-gf-suave">Esta semana</span>
            <span className="font-semibold">3 de 4 clases</span>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {[true, true, true, false].map((hecha, i) => (
              <span key={i} className={`h-1.5 rounded-sm ${hecha ? "bg-gf-turquesa" : "bg-[#2c3234]"}`} />
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
      </div>
    </div>
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
