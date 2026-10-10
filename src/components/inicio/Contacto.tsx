import { contacto, hrefEmail, hrefLinkedin } from "@/lib/contacto";

export function Contacto() {
  return (
    <section id="contacto" className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-14 sm:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-x-16 gap-y-8 rounded-[28px] bg-superficie px-6 py-8 shadow-[inset_0_0_0_1px_var(--color-borde-oscuro)] sm:px-20 sm:py-20">
        <div className="flex-[1_1_420px]">
          <h2 className="max-w-[14ch] text-[clamp(36px,5.6vw,84px)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            ¿La próxima la hacemos juntos?
          </h2>
          <p className="mt-5 max-w-[44ch] text-[19px] leading-normal text-tinta-media">
            Abierto a un puesto o a un proyecto. Contame qué necesitás.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={hrefEmail} className="boton bg-tinta text-fondo hover:bg-white">
            Escribime
          </a>
          <a href={hrefLinkedin} className="boton border-[1.5px] border-borde-oscuro hover:border-tinta">
            LinkedIn
          </a>
          <a href={contacto.github} className="boton border-[1.5px] border-borde-oscuro hover:border-tinta">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export function Pie() {
  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-x-6 gap-y-2 px-4 pt-12 pb-14 text-[15px] text-tinta-suave sm:px-14">
      <span>juanamelio.ar</span>
      <span>Hecho por mí, con el mismo método que mis proyectos.</span>
    </footer>
  );
}
