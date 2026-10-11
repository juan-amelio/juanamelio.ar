import Image from "next/image";
import Link from "next/link";
import { CASOS, ORDEN, type Slug } from "@/components/casos/casos";
import { EnlaceSeccion } from "@/components/EnlaceSeccion";
import { ADENTRO, AFUERA } from "@/components/transiciones/Transiciones";

/*
 * La barra de arriba (#29): fija, translúcida y en grafito siempre, aunque la
 * página de abajo sea de papel (Forge), para que el sitio tenga un solo marco.
 * En un caso, además, los tres proyectos: se pasa de uno a otro de un toque.
 * Durante una transición entre páginas no se mueve (view-transition-name).
 */
export function Encabezado({ caso }: { caso?: Slug }) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#0e1012]/60 text-tinta backdrop-blur-xl backdrop-saturate-150"
      style={{ viewTransitionName: "encabezado" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-14">
        <Link href="/" transitionTypes={AFUERA} className="shrink-0 text-[19px] font-extrabold no-underline">
          Juan Amelio
        </Link>

        {caso && (
          <nav aria-label="Proyectos" className="flex items-center gap-1 rounded-full bg-white/[.06] p-1">
            {ORDEN.map((slug) => {
              const actual = slug === caso;
              return (
                <Link
                  key={slug}
                  href={`/casos/${slug}`}
                  transitionTypes={ADENTRO}
                  aria-current={actual ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5 text-sm font-semibold transition-colors ${
                    actual ? "bg-white/[.14] text-tinta" : "text-tinta-media hover:bg-white/[.08] hover:text-tinta"
                  }`}
                >
                  <Image src={CASOS[slug].logo} alt="" width={22} height={22} className="size-[22px] rounded-md object-contain" />
                  <span className="hidden md:inline">{CASOS[slug].nombre}</span>
                </Link>
              );
            })}
          </nav>
        )}

        <nav aria-label="Secciones" className={`items-center gap-x-7 text-[15px] font-medium ${caso ? "hidden xl:flex" : "flex"}`}>
          <EnlaceSeccion href="/#proyectos" transitionTypes={AFUERA} className="hidden sm:inline">
            Proyectos
          </EnlaceSeccion>
          <EnlaceSeccion href="/#sobre-mi" transitionTypes={AFUERA} className="hidden sm:inline">
            Sobre mí
          </EnlaceSeccion>
          <EnlaceSeccion href="/#proceso" transitionTypes={AFUERA} className="hidden md:inline">
            Proceso
          </EnlaceSeccion>
          <EnlaceSeccion href="/#contacto" transitionTypes={AFUERA}>
            Contacto
          </EnlaceSeccion>
        </nav>
      </div>
    </header>
  );
}
