import Link from "next/link";

// Lugar provisorio: el inicio de verdad, con la dirección C, es la #10.
export default function Inicio() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-14">
      <h1 className="max-w-[12ch] text-5xl font-extrabold leading-none tracking-tight sm:text-7xl">
        Apps que la gente abre todos los días.
      </h1>
      <p className="mt-8 max-w-prose text-xl leading-relaxed text-tinta-suave">
        Soy Juan Amelio. Este sitio está en construcción.
      </p>
      <p className="mt-6">
        <Link href="/casos/global-fit" className="font-semibold underline">
          Ver el primer caso
        </Link>
      </p>
    </main>
  );
}
