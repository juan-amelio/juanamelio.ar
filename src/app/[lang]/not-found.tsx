"use client";

import Link from "next/link";
import { useInicio, useTextos } from "@/idioma/Idioma";

/* Una dirección que no existe, en el idioma de la versión desde la que se
   llegó (el layout de [lang] ya puso el idioma). */
export default function NoEncontrada() {
  const t = useTextos().noEncontrada;
  const inicio = useInicio();
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-center px-4 sm:px-14">
      <p className="text-[15px] font-semibold text-tinta-suave">404</p>
      <h1 className="mt-4 text-[clamp(40px,7vw,96px)] leading-[0.94] font-extrabold tracking-[-0.04em]">{t.titulo}</h1>
      <Link href={inicio} className="mt-10 text-lg font-semibold">
        {t.volver} →
      </Link>
    </main>
  );
}
