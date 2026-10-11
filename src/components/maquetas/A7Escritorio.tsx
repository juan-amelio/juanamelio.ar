"use client";

import { useCiclo, type Animable } from "./useCiclo";
import { Ventana } from "./Ventana";

/* A7 Sports en escritorio, con datos de demo: la gestión (stock y compras) y
   la tienda pública. Mismos colores y tipografía que la app real. */

const TONO = {
  marco: "bg-a7-fondo font-a7 text-a7-hueso shadow-[0_0_0_1px_#3a3a40,0_40px_90px_-34px_rgba(190,222,20,.3)]",
  barra: "bg-a7-superficie border-b border-a7-linea",
  texto: "text-a7-suave",
  punto: "bg-a7-superficie-alta",
};

const MENU: [string, string[]][] = [
  ["Vender", ["Caja", "Registro"]],
  ["Mercadería", ["Stock", "Compras", "Precios"]],
  ["Números", ["Resumen", "Más vendidos"]],
];

const STOCK = [
  { p: "Paleta de control", s: 4, precio: "$180.000", cat: "Paletas", sku: "PD-001" },
  { p: "Remera dry fit", s: 12, precio: "$24.000", cat: "Indumentaria", sku: "PD-014" },
  { p: "Calza larga dama", s: 6, precio: "$43.000", cat: "Indumentaria", sku: "PD-036" },
  { p: "Overgrip", s: 48, precio: "$4.000", cat: "Accesorios", sku: "PD-042" },
  { p: "Tubo de pelotas", s: 2, precio: "$9.000", cat: "Pelotas", sku: "PD-050" },
  { p: "Gorra dry cap", s: 16, precio: "$19.000", cat: "Accesorios", sku: "PD-027" },
];

const COMPRAS = [
  { f: "02/10", c: "0001-00000214", t: "$1.240.000", u: 82 },
  { f: "24/09", c: "0001-00000198", t: "$386.500", u: 31 },
  { f: "11/09", c: "0001-00000176", t: "$2.110.300", u: 164 },
  { f: "30/08", c: "0001-00000151", t: "$94.700", u: 10 },
];

export function GestionA7({ vista, activo = true, alTerminar }: Animable & { vista?: "stock" | "compras" | "resumen" }) {
  // Sin vista fija, alterna: una venta descuenta stock, después entra una compra.
  const { ref, paso } = useCiclo(vista ? 3 : 6, 1300, activo, alTerminar); // con vista fija, una sola vuelta
  const actual = vista ?? (paso < 3 ? "stock" : "compras");
  const vendio = vista === "stock" ? paso % 3 >= 1 : actual === "stock" && paso >= 1;
  const entro = vista === "compras" ? paso % 3 >= 1 : actual === "compras" && paso >= 4;

  return (
    <div ref={ref} role="img" aria-label="La gestión de A7 Sports en escritorio, con datos de demo">
      <Ventana titulo="A7 sports · Gestión" tono={TONO}>
        <div className="flex h-full">
          <nav className="w-[132px] shrink-0 border-r border-a7-linea bg-a7-superficie px-2.5 py-3">
            <p className="mb-3 px-1.5 text-[13px] font-extrabold [font-stretch:115%]">
              A7 <span className="text-a7-lima">sports</span>
            </p>
            {MENU.map(([grupo, items]) => (
              <div key={grupo} className="mb-2">
                <p className="px-1.5 text-[9px] text-a7-suave">{grupo}</p>
                {items.map((it) => {
                  const on = it.toLowerCase() === actual;
                  return (
                    <p
                      key={it}
                      className={`mt-0.5 rounded-md px-1.5 py-1 text-[11px] transition-colors duration-300 ${on ? "bg-a7-superficie-alta font-semibold" : "text-a7-texto-medio"}`}
                    >
                      {it}
                    </p>
                  );
                })}
              </div>
            ))}
          </nav>
          <div className="min-w-0 flex-1 p-4">
            {actual === "resumen" ? (
              <Resumen paso={paso} />
            ) : actual === "stock" ? (
              <div key="stock" className="entrar">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-extrabold">Stock</p>
                  <span className="text-[10px] text-a7-suave">62 productos</span>
                </div>
                <span className="mt-2 inline-block rounded-full border border-a7-control px-2.5 py-1 text-[10px]">+ Agregar stock</span>
                <div className="mt-3 overflow-hidden rounded-lg bg-a7-superficie">
                  <div className="grid grid-cols-[1fr_38px_64px_74px] gap-2 border-b border-a7-linea px-3 py-1.5 text-[9px] text-a7-suave">
                    <span>Producto</span>
                    <span className="text-right">Stock</span>
                    <span className="text-right">Precio</span>
                    <span>Categoría</span>
                  </div>
                  {STOCK.map((r, i) => {
                    const s = vendio && i === 1 ? r.s - 1 : r.s;
                    const bajo = s <= 3;
                    return (
                      <div
                        key={r.sku}
                        className={`grid grid-cols-[1fr_38px_64px_74px] items-center gap-2 border-b border-a7-linea/60 px-3 py-[7px] text-[10.5px] transition-colors duration-500 ${vendio && i === 1 ? "bg-a7-lima/10" : ""}`}
                      >
                        <span className="truncate">{r.p}</span>
                        <span key={s} className={`entrar text-right font-semibold tabular-nums ${bajo ? "text-[#ff6a4d]" : ""}`}>
                          {s}
                        </span>
                        <span className="text-right tabular-nums">{r.precio}</span>
                        <span className="truncate text-a7-suave">{r.cat}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div key="compras" className="entrar">
                <p className="text-lg font-extrabold">Compras</p>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px]">
                  <span className="rounded-md bg-a7-hueso px-2.5 py-1 font-bold text-a7-fondo">Importar CSV</span>
                  <span className="rounded-md border border-a7-control px-2.5 py-1">Copiar instrucciones para Claude</span>
                </div>
                <p className="mt-2 text-[9.5px] leading-snug text-a7-suave">
                  1. Copiás las instrucciones y se las pasás a Claude con el PDF del proveedor. 2. Devuelve un .csv. 3. Lo
                  importás: se revisa antes de cargar.
                </p>
                <div className="mt-2.5 overflow-hidden rounded-lg bg-a7-superficie">
                  <div className="grid grid-cols-[44px_1fr_78px_34px] gap-2 border-b border-a7-linea px-3 py-1.5 text-[9px] text-a7-suave">
                    <span>Fecha</span>
                    <span>Comprobante</span>
                    <span className="text-right">Total</span>
                    <span className="text-right">Unid.</span>
                  </div>
                  {entro && (
                    <div className="entrar grid grid-cols-[44px_1fr_78px_34px] items-center gap-2 border-b border-a7-linea/60 bg-a7-lima/12 px-3 py-[7px] text-[10.5px]">
                      <span>10/10</span>
                      <span className="flex items-center gap-1.5 truncate">
                        0001-00000231
                        <span className="rounded bg-a7-lima px-1 text-[8px] font-extrabold text-a7-fondo">Nueva</span>
                      </span>
                      <span className="text-right tabular-nums">$512.800</span>
                      <span className="text-right tabular-nums">44</span>
                    </div>
                  )}
                  {COMPRAS.map((r) => (
                    <div key={r.c} className="grid grid-cols-[44px_1fr_78px_34px] items-center gap-2 border-b border-a7-linea/60 px-3 py-[7px] text-[10.5px]">
                      <span className="text-a7-suave">{r.f}</span>
                      <span className="truncate">{r.c}</span>
                      <span className="text-right tabular-nums">{r.t}</span>
                      <span className="text-right tabular-nums">{r.u}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Ventana>
    </div>
  );
}

const PRODUCTOS = {
  todo: ["Paleta de control", "Remera dry fit", "Overgrip", "Calza larga", "Tubo de pelotas", "Gorra dry cap"],
  mujer: ["Calza larga", "Musculosa", "Pollera short", "Buzo dama", "Remera dama", "Vestido"],
};

export function TiendaA7({ activo = true, alTerminar }: Animable) {
  const { ref, paso } = useCiclo(4, 1600, activo, alTerminar);
  const mujer = paso >= 2;
  const lista = mujer ? PRODUCTOS.mujer : PRODUCTOS.todo;

  return (
    <div ref={ref} role="img" aria-label="La tienda pública de A7 Sports, con datos de demo">
      <Ventana titulo="A7 sports · Tienda" tono={TONO}>
        <div
          aria-hidden="true"
          className="absolute -top-2 right-0 h-24 w-20 [background:repeating-linear-gradient(-55deg,var(--color-a7-lima)_0_6px,transparent_6px_14px)]"
        />
        <div className="flex h-full gap-4 p-4">
          <div className="w-[118px] shrink-0">
            <p className="text-[13px] font-extrabold [font-stretch:115%]">
              A7 <span className="text-a7-lima">sports</span>
            </p>
            <p className="mt-3 text-[22px] leading-[0.95] font-extrabold">
              Definí tu <span className="text-a7-lima">juego.</span>
            </p>
            <p className="mt-1.5 text-[9px] text-a7-suave">Indumentaria y accesorios de pádel</p>
            <p className="mt-3 text-[9px] text-a7-suave">Categorías</p>
            {["Todo", "Mujer", "Hombre", "Accesorios", "Paletas"].map((c) => {
              const on = (c === "Todo" && !mujer) || (c === "Mujer" && mujer);
              return (
                <p
                  key={c}
                  className={`mt-1 rounded-md px-1.5 py-1 text-[10.5px] transition-colors duration-300 ${on ? "bg-a7-hueso font-bold text-a7-fondo" : "text-a7-texto-medio"}`}
                >
                  {c}
                </p>
              );
            })}
          </div>
          <div className="min-w-0 flex-1 pt-8">
            <div className="rounded-full bg-a7-superficie px-3 py-1.5 text-[10px] text-a7-suave">Buscar remera, paleta, medias…</div>
            <div className="mt-2 flex gap-1.5 text-[9.5px]">
              <span className={`rounded-full border px-2 py-0.5 transition-colors ${mujer ? "border-a7-hueso bg-a7-hueso font-bold text-a7-fondo" : "border-a7-control"}`}>Mujer</span>
              <span className="rounded-full border border-a7-control px-2 py-0.5">Hombre</span>
              <span className="rounded-full border border-a7-control px-2 py-0.5">Talle: todos</span>
            </div>
            <div key={String(mujer)} className="entrar mt-2.5 grid grid-cols-3 gap-2">
              {lista.map((p) => (
                <div key={p} className="overflow-hidden rounded-lg bg-a7-superficie">
                  <div className="grid h-[58px] place-items-center bg-a7-superficie-alta">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/a7-sports.svg" alt="" className="h-6 opacity-30" />
                  </div>
                  <p className="truncate px-2 pt-1.5 text-[10px] font-semibold">{p}</p>
                  <p className="px-2 pb-1.5 text-[8.5px] text-a7-suave">Disponible</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 -skew-x-12 bg-a7-lima px-5 py-1.5 text-[10.5px] font-extrabold text-a7-fondo">
          Consultar por WhatsApp
        </span>
      </Ventana>
    </div>
  );
}

/* El resumen del mes: lo que se vendió, por semana y por dónde. Datos de demo. */
function Resumen({ paso }: { paso: number }) {
  const semanas = [38, 52, 44, 71];
  const crecio = paso % 3 >= 1;
  return (
    <div className="entrar">
      <p className="text-lg font-extrabold">Resumen</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          ["Ventas del mes", crecio ? "42" : "41"],
          ["Unidades", crecio ? "99" : "96"],
          ["En eventos", "38%"],
        ].map(([e, v]) => (
          <div key={e} className="rounded-lg bg-a7-superficie p-2.5">
            <p className="text-[9px] text-a7-suave">{e}</p>
            <p key={v} className="entrar mt-1 text-xl font-extrabold tabular-nums [font-stretch:110%]">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-a7-superficie p-3">
        <p className="text-[9px] text-a7-suave">Ventas por semana</p>
        <div className="mt-2 flex h-[120px] items-end gap-3">
          {semanas.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={`w-full rounded-t-md transition-all duration-500 ${i === semanas.length - 1 ? "bg-a7-lima" : "bg-a7-superficie-alta"}`}
                style={{ height: `${(i === semanas.length - 1 && crecio ? v + 6 : v) * 1.4}px` }}
              />
              <span className="text-[8.5px] text-a7-suave">Sem {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
