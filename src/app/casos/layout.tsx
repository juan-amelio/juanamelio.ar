import Link from "next/link";
import { Encabezado } from "@/components/inicio/Encabezado";

export default function LayoutCaso({ children }: LayoutProps<"/casos">) {
  return (
    <>
      <Encabezado />
      <main className="mx-auto w-full max-w-3xl px-4 pt-10 pb-28 sm:pt-16">
        <p className="mb-8 text-[15px] text-tinta-suave">
          <Link href="/#global-fit">Volver a los trabajos</Link>
        </p>
        <article>{children}</article>
      </main>
    </>
  );
}
