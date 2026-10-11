import { EnlaceSeccion } from "@/components/EnlaceSeccion";
import { MenuSecciones } from "./MenuSecciones";

/*
 * La barra de arriba (#29): fija, translúcida y en grafito siempre, aunque
 * abajo pase la marca de cada proyecto, para que el sitio tenga un solo marco.
 */
export function Encabezado() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#0e1012]/60 text-tinta backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-14">
        <EnlaceSeccion href="/#inicio" className="shrink-0 text-[19px] font-extrabold no-underline">
          Juan Amelio
        </EnlaceSeccion>
        <MenuSecciones className="flex items-center gap-x-7 text-[15px] font-medium" />
      </div>
    </header>
  );
}
