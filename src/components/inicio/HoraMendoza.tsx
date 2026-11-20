"use client";

import { useEffect, useState } from "react";
import { useTextos } from "@/idioma/Idioma";

/* En 24 horas en los dos idiomas: es la hora de allá, como se lee allá. */
const FORMATO = new Intl.DateTimeFormat("es-AR", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/Argentina/Mendoza",
});

/* La hora de Mendoza, para quien escribe desde otro huso. Se pinta recién en
   el navegador: en el servidor no hay «ahora» que coincida con el del visitante. */
export function HoraMendoza() {
  const [hora, setHora] = useState<string | null>(null);
  const [antes, despues] = useTextos().contacto.hora;

  useEffect(() => {
    const tic = () => setHora(FORMATO.format(new Date()));
    tic();
    const t = setInterval(tic, 15_000);
    return () => clearInterval(t);
  }, []);

  if (!hora) return null;
  return (
    <span>
      {antes}
      <time className="font-semibold text-tinta tabular-nums">{hora}</time>
      {despues}
    </span>
  );
}
