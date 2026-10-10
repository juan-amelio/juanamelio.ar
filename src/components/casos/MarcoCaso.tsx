import Link from "next/link";
import type { ReactNode } from "react";
import { Contacto, Pie } from "@/components/inicio/Contacto";
import { Encabezado } from "@/components/inicio/Encabezado";
import { CASOS, type Slug } from "./casos";
import { Marca } from "./Marca";

/* La página de un caso, vestida entera con la marca de su producto (#7).
   Arriba la portada con la maqueta, en el medio el relato del MDX, y al final
   el caso siguiente, ya en SU marca: el cambio de color es la transición. */
export function MarcoCaso({ slug, children }: { slug: Slug; children: ReactNode }) {
  const caso = CASOS[slug];
  return (
    <div
      data-caso={slug}
      className="flex flex-1 flex-col bg-(--caso-fondo) font-(family-name:--caso-fuente) text-(--caso-texto) [background-image:var(--caso-brillo)] bg-no-repeat"
    >
      <Encabezado />
      <main className="flex-1">
        <section className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-20 gap-y-14 px-4 pt-6 pb-20 sm:px-14 sm:pt-12 sm:pb-28">
          <div className="min-w-0 flex-[1_1_480px]">
            <p className="text-[22px]">
              <Marca caso={slug} />
            </p>
            <h1 className="mt-5 max-w-[15ch] text-[clamp(40px,6vw,84px)] leading-[0.98] font-extrabold tracking-[-0.035em]">
              {caso.titular}
            </h1>
            <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-(--caso-texto-medio)">{caso.bajada}</p>
            <dl className="mt-10 grid gap-x-10 gap-y-5 border-t border-(--caso-borde) pt-8 sm:grid-cols-[auto_1fr]">
              {caso.datos.map(([etiqueta, valor]) => (
                <div key={etiqueta} className="contents">
                  <dt className="text-[15px] text-(--caso-suave) sm:pt-0.5">{etiqueta}</dt>
                  <dd className="-mt-4 text-[17px] leading-snug font-semibold sm:mt-0">{valor}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={`mx-auto min-w-0 ${caso.maquetaAncha ? "w-full max-w-140 flex-[1_1_440px]" : "flex-[0_1_330px]"}`}>
            {caso.maqueta}
            <p className="mt-3.5 text-center text-[13px] text-(--caso-suave)">Datos de demo</p>
          </div>
        </section>

        <article className="mx-auto w-full max-w-3xl px-4 pb-24 sm:pb-32">{children}</article>

        <Siguiente slug={caso.siguiente} />
      </main>
      <CierreCaso />
    </div>
  );
}

function Siguiente({ slug }: { slug: Slug }) {
  const caso = CASOS[slug];
  return (
    <section data-caso={slug} className="border-t border-(--caso-borde) bg-(--caso-fondo) font-(family-name:--caso-fuente) text-(--caso-texto)">
      <Link
        href={`/casos/${slug}`}
        className="group mx-auto block max-w-7xl px-4 py-16 no-underline sm:px-14 sm:py-24"
      >
        <span className="block text-[15px] text-(--caso-suave)">Siguiente caso</span>
        <span className="mt-4 block text-[22px]">
          <Marca caso={slug} />
        </span>
        <span className="mt-3 block max-w-[18ch] text-[clamp(32px,4.4vw,60px)] leading-[1.02] font-extrabold tracking-[-0.03em] decoration-(--caso-acento) decoration-[0.08em] underline-offset-[0.12em] group-hover:underline">
          {caso.titular}
        </span>
      </Link>
    </section>
  );
}

/* Contacto y pie, en neutro: después de los casos, el que habla es el sitio. */
export function CierreCaso() {
  return (
    <div className="bg-fondo text-tinta">
      <Contacto />
      <Pie />
    </div>
  );
}
