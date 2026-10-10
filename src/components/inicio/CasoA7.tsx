import Link from "next/link";
import { Datos } from "./Datos";

export function CasoA7() {
  return (
    <section id="a7" className="border-t border-a7-linea bg-a7-fondo font-a7 text-a7-hueso">
      <div className="mx-auto flex max-w-7xl flex-wrap-reverse items-center gap-x-20 gap-y-14 px-4 py-20 sm:px-14 sm:py-34">
        <div className="mx-auto flex-[0_1_330px]">
          <CajaA7 />
          <p className="mt-3.5 text-center text-[13px] text-a7-suave">Datos de demo</p>
        </div>
        <div className="min-w-0 flex-[1_1_460px]">
          <p className="text-[22px] font-extrabold [font-stretch:125%]">
            A7 <span className="text-a7-lima">sports</span>
          </p>
          <h2 className="mt-5 max-w-[14ch] text-[clamp(34px,4.4vw,60px)] leading-[1.02] font-extrabold tracking-[-0.02em] [font-stretch:112%]">
            De la planilla a la caja.
          </h2>
          <p className="mt-5 max-w-[50ch] text-lg leading-relaxed text-a7-texto-medio">
            Ventas, stock, caja y una vidriera pública para una tienda de pádel. Reemplazó a una planilla de
            Google con un script encima, y la usan cinco personas desde el celular, en el local y en los eventos.
          </p>
          <div className="mt-8 rounded-[14px] bg-a7-superficie px-6 py-5 shadow-[inset_0_0_0_1px_var(--color-a7-linea)]">
            <p className="text-xl font-bold">Tocar dos veces −10% sigue siendo −10%.</p>
            <p className="mt-2 max-w-[52ch] leading-normal text-a7-suave">
              El descuento se calcula siempre contra el precio de lista y nunca contra el de pantalla. El precio
              que se cobró queda guardado, aunque coincida con el de lista.
            </p>
          </div>
          <Datos
            claseEtiqueta="text-a7-suave"
            items={[
              ["En producción", "Desde el 04/10/2026"],
              ["La usan", "Cinco personas"],
              ["Con", "Next.js, Postgres, Prisma"],
            ]}
          />
          <Link href="/casos/a7-sports" className="boton mt-9 bg-a7-lima text-a7-fondo hover:bg-a7-lima-claro">
            Ver el caso de A7 Sports
          </Link>
        </div>
      </div>
    </section>
  );
}

const LINEAS = [
  { producto: "Paleta de control", total: "$ 180.000", detalle: "1 unidad" },
  { producto: "Tubo de pelotas", total: "$ 27.000", detalle: "4 unidades, se cobran 3", promo: "4x3" },
  { producto: "Overgrip", total: "$ 10.800", detalle: "3 unidades, lista $ 12.000", descuento: "−10%" },
];

const DESCUENTOS = ["Lista", "−10%", "−20%", "Al costo", "Regalo"];

export function CajaA7() {
  return (
    <div
      role="img"
      aria-label="La caja de A7 Sports con una venta en curso, con datos de demo"
      className="w-80 max-w-full rounded-[46px] bg-a7-superficie-alta p-2.5 shadow-[0_40px_90px_-34px_rgba(190,222,20,.35),0_0_0_1px_#3a3a40]"
    >
      <div className="flex min-h-155 flex-col gap-2.5 rounded-[37px] bg-a7-fondo px-4 pt-5.5 pb-4">
        <div className="flex items-center justify-between px-1 pb-1.5">
          <p className="text-2xl font-extrabold [font-stretch:112%]">Caja</p>
          <span className="rounded-full border border-a7-control px-3 py-1.5 text-xs text-a7-suave">Local</span>
        </div>
        {LINEAS.map((l) => (
          <div key={l.producto} className="rounded-[14px] bg-a7-superficie p-3.5">
            <div className="flex justify-between gap-2 text-[15px] font-semibold">
              <span>{l.producto}</span>
              <span>{l.total}</span>
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
            d === "−10%" ? (
              <span key={d} className="rounded-full bg-a7-hueso px-3 py-2 text-xs font-bold text-a7-fondo">{d}</span>
            ) : (
              <span key={d} className="rounded-full border border-a7-control px-3 py-2 text-xs">{d}</span>
            ),
          )}
        </div>
        <div className="mt-auto flex items-baseline justify-between rounded-2xl bg-a7-lima px-4.5 py-4 text-a7-fondo">
          <span className="font-extrabold">Cobrar</span>
          <span className="text-[26px] font-extrabold tracking-[-0.5px] [font-stretch:112%]">$ 217.800</span>
        </div>
      </div>
    </div>
  );
}
