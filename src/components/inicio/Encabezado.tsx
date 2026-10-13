import { EnlaceSeccion } from "@/components/EnlaceSeccion";
import { BotonTema } from "./BotonTema";
import { MenuSecciones } from "./MenuSecciones";

/*
 * La barra de arriba (#29): fija, translúcida y con el fondo del sitio siempre,
 * aunque abajo pase la marca de cada proyecto, para que el sitio tenga un solo
 * marco. A la derecha, el cambio entre claro y oscuro.
 */
export function Encabezado() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-tinta/[.07] bg-fondo/60 text-tinta backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-14">
        <EnlaceSeccion href="/#inicio" className="shrink-0 text-[19px] font-extrabold no-underline">
          Juan Amelio
        </EnlaceSeccion>
        <div className="flex items-center gap-x-5 sm:gap-x-7">
          <MenuSecciones className="flex items-center gap-x-7 text-[15px] font-medium" />
          <BotonTema />
        </div>
      </div>
    </header>
  );
}
