import Link from "next/link";
import { Datos } from "./Datos";
import { Planchas } from "./Portada";

export function CasoForge() {
  return (
    <section id="forge" className="bg-fs-fondo font-fs text-fs-tinta">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-20 gap-y-14 px-4 py-20 sm:px-14 sm:py-34">
        <div className="min-w-0 flex-[1_1_420px]">
          <p className="flex items-center gap-3 text-[22px] font-semibold">
            Forge Studio
            <Planchas tamano={10} />
          </p>
          <h2 className="mt-5 max-w-[16ch] text-[clamp(34px,4.4vw,60px)] leading-[1.04] font-semibold tracking-[-0.02em]">
            Del Trello a un tablero con revisión humana.
          </h2>
          <p className="mt-5 max-w-[50ch] text-[19px] leading-relaxed text-fs-gris">
            El tablero donde trabaja mi equipo: proyectos, tareas, revisiones y entornos. Ninguna tarea llega a
            producción sin que una persona la apruebe. Tiene un agente que corre en la máquina de cada
            desarrollador y un plugin para Claude Code con el método de trabajo.
          </p>
          <div className="mt-8 rounded-xl bg-white px-6 py-5 shadow-[inset_0_0_0_1px_var(--color-fs-borde)]">
            <p className="text-[21px] font-semibold">Por la red viaja un verbo, nunca un comando.</p>
            <p className="mt-2 max-w-[52ch] text-[17px] leading-normal text-fs-gris">
              Qué significa cada pedido lo decide la configuración local. Aunque el servidor cayera en malas
              manos, no puede hacer que tu compu ejecute otra cosa.
            </p>
          </div>
          <Datos
            claseEtiqueta="text-fs-gris-suave"
            items={[
              ["En uso", "Desde el 09/09/2026"],
              ["Para", "Todos mis proyectos"],
              ["Con", "Next.js, Postgres, Node"],
            ]}
          />
          <Link href="/casos/forge-studio" className="boton mt-9 bg-fs-cian-texto text-fs-fondo hover:bg-fs-cian-fuerte">
            Ver el caso de Forge Studio
          </Link>
        </div>
        <div className="mx-auto w-full max-w-140 min-w-0 flex-[1_1_440px]">
          <TableroForge />
          <p className="mt-3.5 text-center text-[13px] text-fs-gris-suave">Datos de demo</p>
        </div>
      </div>
    </section>
  );
}

const CHEQUEOS = ["Lint", "Tipos", "Pruebas", "Build"];

export function TableroForge() {
  return (
    <div
      role="img"
      aria-label="Una columna del tablero de Forge Studio con dos tarjetas en revisión, con datos de demo"
      className="overflow-hidden rounded-[14px] bg-fs-panel shadow-[0_0_0_1px_var(--color-fs-borde),0_40px_80px_-40px_rgba(32,30,29,.35)]"
    >
      <div className="flex items-center gap-2 border-b border-fs-borde bg-fs-panel-2 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2.5 rounded-full bg-fs-borde" />
        ))}
        <span className="ml-3 text-[13px] text-fs-gris-suave">Tablero del proyecto demo</span>
      </div>
      <div className="flex flex-col gap-3 p-4.5">
        <div className="flex items-baseline justify-between">
          <span className="font-semibold">En revisión</span>
          <span className="text-[13px] text-fs-gris-suave">2 tarjetas</span>
        </div>
        <div className="rounded-[10px] bg-white p-4 shadow-[0_0_0_1px_var(--color-fs-borde)]">
          <div className="flex justify-between gap-3">
            <span className="text-[13px] text-fs-gris-suave">#42</span>
            <span className="rounded-md bg-fs-cian-suave px-2 py-0.5 text-xs font-semibold text-fs-cian-texto">Producto/UI</span>
          </div>
          <p className="mt-1.5 text-lg font-semibold">Pantalla de pagos del socio</p>
          <p className="mt-2.5 text-[13px] text-fs-gris-suave">Rama tarea/42-pantalla-de-pagos y pull request abierto</p>
          <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1.5 text-[13px] text-fs-gris">
            {CHEQUEOS.map((c) => (
              <span key={c} className="flex items-center gap-1">
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-fs-cian-texto)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {c}
              </span>
            ))}
          </div>
          <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-fs-hairline pt-3">
            <span className="text-[13px] text-fs-gris">Falta la aprobación de 1 revisor</span>
            <span className="rounded-full bg-fs-magenta-oscuro px-3 py-1.5 text-xs font-semibold text-white">Esperando</span>
          </div>
        </div>
        <div className="rounded-[10px] bg-white p-4 opacity-70 shadow-[0_0_0_1px_var(--color-fs-borde)]">
          <div className="flex justify-between gap-3">
            <span className="text-[13px] text-fs-gris-suave">#43</span>
            <span className="rounded-md bg-fs-panel-2 px-2 py-0.5 text-xs font-semibold text-fs-gris">Seguridad</span>
          </div>
          <p className="mt-1.5 text-lg font-semibold">Límite de intentos en el login</p>
        </div>
      </div>
    </div>
  );
}
