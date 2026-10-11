import Link from "next/link";
import { AFUERA } from "@/components/transiciones/Transiciones";

export function Encabezado() {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-7 sm:px-14">
      <Link href="/" transitionTypes={AFUERA} className="text-[19px] font-extrabold no-underline">
        Juan Amelio
      </Link>
      <nav aria-label="Secciones" className="flex flex-wrap gap-x-7 gap-y-2 text-base font-medium">
        <Link href="/#trabajos" transitionTypes={AFUERA}>Trabajos</Link>
        <Link href="/#sobre-mi" transitionTypes={AFUERA}>Sobre mí</Link>
        <Link href="/#metodo" transitionTypes={AFUERA}>Cómo trabajo</Link>
        <Link href="/#contacto" transitionTypes={AFUERA}>Contacto</Link>
      </nav>
    </header>
  );
}
