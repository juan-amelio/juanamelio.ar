import Link from "next/link";

export function Encabezado() {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-7 sm:px-14">
      <Link href="/" className="text-[19px] font-extrabold no-underline">
        Juan Amelio
      </Link>
      <nav aria-label="Secciones" className="flex flex-wrap gap-x-7 gap-y-2 text-base font-medium">
        <Link href="/#trabajos">Trabajos</Link>
        <Link href="/#sobre-mi">Sobre mí</Link>
        <Link href="/#metodo">Cómo trabajo</Link>
        <Link href="/#contacto">Contacto</Link>
      </nav>
    </header>
  );
}
