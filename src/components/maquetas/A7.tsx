"use client";

import { Iphone } from "./Iphone";
import { useCiclo, useContador, type Animable } from "./useCiclo";

const LINEAS = [
  { producto: "Paleta de control", total: 180000, detalle: "1 unidad" },
  { producto: "Tubo de pelotas", total: 27000, detalle: "4 unidades, se cobran 3", promo: "4x3" },
  { producto: "Overgrip", total: 10800, detalle: "3 unidades, lista $ 12.000", descuento: "−10%" },
];

const DESCUENTOS = ["Lista", "−10%", "−20%", "Al costo", "Regalo"];
const pesos = (n: number) => `$ ${n.toLocaleString("es-AR")}`;

/* La caja de A7 Sports con datos de demo. Viva: entran las líneas de una
   venta y el total sube contando. */
export function CajaA7({ activo = true, alTerminar }: Animable) {
  const { ref, paso } = useCiclo(4, 1500, activo, alTerminar);
  const cuantas = Math.min(paso + 1, LINEAS.length);
  const total = useContador(LINEAS.slice(0, cuantas).reduce((s, l) => s + l.total, 0));

  return (
    <Iphone
      refCiclo={ref}
      etiqueta="La caja de A7 Sports con una venta en curso, con datos de demo"
      pantalla="bg-a7-fondo font-a7 text-a7-hueso"
      contenido="gap-2.5 px-4 pt-1 pb-2"
      brillo="shadow-[0_40px_90px_-34px_rgba(190,222,20,.35)]"
    >
        <div className="flex items-center justify-between px-1 pb-1.5">
          <p className="text-2xl font-extrabold [font-stretch:112%]">Caja</p>
          <span className="rounded-full border border-a7-control px-3 py-1.5 text-xs text-a7-suave">Local</span>
        </div>
        {LINEAS.slice(0, cuantas).map((l) => (
          <div key={l.producto} className="entrar rounded-[14px] bg-a7-superficie p-3.5">
            <div className="flex justify-between gap-2 text-[15px] font-semibold">
              <span>{l.producto}</span>
              <span>{pesos(l.total)}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="text-xs text-a7-suave">{l.detalle}</span>
              {l.promo && <span className="rounded-md bg-a7-lima px-2 py-0.5 text-[11px] font-extrabold text-a7-fondo">{l.promo}</span>}
              {l.descuento && (
                <span className="rounded-md border border-a7-lima px-2 py-0.5 text-[11px] font-bold text-a7-lima">{l.descuento}</span>
              )}
            </div>
          </div>
        ))}
        <p className="mx-1 mt-2 text-xs text-a7-suave">Aplicar descuento</p>
        <div className="flex flex-wrap gap-1.5 px-0.5">
          {DESCUENTOS.map((d) =>
            d === "−10%" && cuantas === 3 ? (
              <span key={d} className="rounded-full bg-a7-hueso px-3 py-2 text-xs font-bold text-a7-fondo">{d}</span>
            ) : (
              <span key={d} className="rounded-full border border-a7-control px-3 py-2 text-xs">{d}</span>
            ),
          )}
        </div>
        <div className="mt-auto flex items-baseline justify-between rounded-2xl bg-a7-lima px-4.5 py-4 text-a7-fondo">
          <span className="font-extrabold">Cobrar</span>
          <span className="text-[26px] font-extrabold tracking-[-0.5px] tabular-nums [font-stretch:112%]">{pesos(total)}</span>
        </div>
    </Iphone>
  );
}
