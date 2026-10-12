import Image from "next/image";
import { CASOS, ORDEN, type Slug } from "./casos";

/** El nombre de cada producto escrito como lo escribe su propia marca. En
    claro, «sports» va en tinta, como en el logo positivo de A7: el lima sobre
    hueso no se lee. */
export function Marca({ caso, className = "" }: { caso: Slug; className?: string }) {
  if (caso === "global-fit")
    return (
      <span className={`font-extrabold tracking-[-0.5px] ${className}`}>
        GLOBAL<span className="text-gf-turquesa">FIT</span>
      </span>
    );
  if (caso === "a7-sports")
    return (
      <span className={`font-extrabold [font-stretch:125%] ${className}`}>
        A7 <span className="text-a7-lima claro:text-inherit">sports</span>
      </span>
    );
  return (
    <span className={`inline-flex items-center gap-3 font-semibold ${className}`}>
      Forge Studio
      <Planchas tamano={10} />
    </span>
  );
}

/** El logo del producto. Con versión para fondo claro, van las dos y el CSS
    muestra la que corresponde al tema, así no hay salto al cargar. */
export function Logo({ caso, alt, tamano, className = "" }: { caso: Slug; alt: string; tamano: number; className?: string }) {
  const { logo, logoClaro } = CASOS[caso];
  const imagen = (src: string, visible = "") => (
    <Image src={src} alt={alt} width={tamano} height={tamano} className={`rounded-xl object-contain ${visible} ${className}`} />
  );
  if (!logoClaro) return imagen(logo);
  return (
    <>
      {imagen(logo, "claro:hidden")}
      {imagen(logoClaro, "hidden claro:block")}
    </>
  );
}

/** El color de cada marca detrás de su pantalla, sólo en claro (ver .halo en
    globals.css): una capa por caso, y se ve la del activo, para que al cambiar
    de caso el color se funda en vez de saltar. Las ubica quien las usa. */
export function Halos({ activo, className }: { activo: Slug; className: string }) {
  return ORDEN.map((slug) => (
    <div
      key={slug}
      aria-hidden="true"
      data-caso={slug}
      className={`halo pointer-events-none absolute hidden transition-opacity duration-700 claro:block ${
        activo === slug ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  ));
}

/** Los tres puntos de la marca de Forge Studio: las planchas cian, magenta y amarilla. */
export function Planchas({ tamano }: { tamano: number }) {
  const punto = { width: tamano, height: tamano };
  return (
    <span aria-hidden="true" className="flex gap-1">
      <span style={punto} className="rounded-full bg-fs-cian" />
      <span style={punto} className="rounded-full bg-fs-magenta" />
      <span style={punto} className="rounded-full bg-fs-amarillo" />
    </span>
  );
}
