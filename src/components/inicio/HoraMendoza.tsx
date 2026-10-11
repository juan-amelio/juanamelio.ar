"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const tic = () => setHora(FORMATO.format(new Date()));
    tic();
    const t = setInterval(tic, 15_000);
    return () => clearInterval(t);
  }, []);

  if (!hora) return null;
  return (
    <span>
      En Mendoza son las <time className="font-semibold text-tinta tabular-nums">{hora}</time>
    </span>
  );
}
