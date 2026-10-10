import { hrefCv, hrefEmail } from "@/lib/contacto";

/* Las tres puertas adelantan lo que pasa más abajo: cada una ya tiene la marca
   de su producto, y lleva a su sección. Su entrada es el único movimiento que
   arranca solo en toda la página. */
export function Portada() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 pb-20 sm:px-14 sm:pt-20 sm:pb-32">
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-7">
        <h1 className="max-w-[12ch] text-[clamp(44px,8vw,124px)] leading-[0.94] font-extrabold tracking-[-0.04em]">
          Apps que la gente abre todos los días.
        </h1>
        <div className="flex-[0_1_380px]">
          <p className="text-xl leading-normal text-tinta-media">
            Soy Juan Amelio. Las diseño, las construyo y las sostengo en producción. Estoy abierto a un
            puesto o a un proyecto.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={hrefEmail} className="boton bg-tinta text-white hover:bg-[#363b41]">
              Escribime
            </a>
            <a href={hrefCv} className="boton border-[1.5px] border-tinta hover:bg-tinta hover:text-white">
              Descargar CV
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 sm:mt-20">
        <a href="#global-fit" className="puerta animate-subir bg-gf-fondo font-gf text-gf-texto [animation-delay:.15s]">
          <span className="text-[34px] font-extrabold tracking-[-1px]">
            GLOBAL<span className="text-gf-turquesa">FIT</span>
          </span>
          <span className="block">
            <span className="block text-[17px] text-gf-suave line-through decoration-gf-turquesa">
              Era un cuaderno de reservas.
            </span>
            <span className="mt-1.5 block text-2xl leading-tight font-semibold">Es la app del gimnasio.</span>
          </span>
        </a>
        <a href="#a7" className="puerta animate-subir bg-a7-fondo font-a7 text-a7-hueso [animation-delay:.3s]">
          <span className="text-[34px] font-extrabold tracking-[-0.01em] [font-stretch:125%]">
            A7 <span className="text-a7-lima">sports</span>
          </span>
          <span className="block">
            <span className="block text-[17px] text-a7-suave line-through decoration-a7-lima">
              Era una planilla de Google.
            </span>
            <span className="mt-1.5 block text-2xl leading-tight font-semibold">Es la caja de la tienda.</span>
          </span>
        </a>
        <a
          href="#forge"
          className="puerta animate-subir bg-fs-fondo font-fs text-fs-tinta shadow-[inset_0_0_0_1px_var(--color-fs-borde)] [animation-delay:.45s]"
        >
          <span className="flex items-center justify-between gap-3">
            <span className="text-[clamp(28px,2.6vw,34px)] font-semibold tracking-[-0.01em] whitespace-nowrap">Forge Studio</span>
            <Planchas tamano={12} />
          </span>
          <span className="block">
            <span className="block text-[17px] text-fs-gris-suave line-through decoration-fs-magenta">Era un Trello.</span>
            <span className="mt-1.5 block text-2xl leading-tight font-semibold">Es el tablero de mi equipo.</span>
          </span>
        </a>
      </div>
    </section>
  );
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
