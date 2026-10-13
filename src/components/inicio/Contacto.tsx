import type { CSSProperties } from "react";
import { IconoGithub, IconoLinkedin, IconoMail, IconoWhatsapp } from "@/components/Iconos";
import { contacto, hrefEmail, hrefWhatsapp } from "@/lib/contacto";
import { HoraMendoza } from "./HoraMendoza";

type Canal = { href: string; nombre: string; Icono: typeof IconoGithub; color: string };

/*
 * El cierre de la página (#34, la «firma gigante»): sin tarjeta, «Hablemos.»
 * a todo el ancho, y los mismos canales que flotan en los costados (Redes),
 * acá grandes y con su nombre, para que no haya que buscar cómo escribir.
 */
export function Contacto() {
  const canales = [
    contacto.email && { href: hrefEmail, nombre: "Mail", Icono: IconoMail, color: "var(--color-canal-mail)" },
    hrefWhatsapp && { href: hrefWhatsapp, nombre: "WhatsApp", Icono: IconoWhatsapp, color: "var(--color-canal-whatsapp)" },
    contacto.linkedin && { href: contacto.linkedin, nombre: "LinkedIn", Icono: IconoLinkedin, color: "var(--color-canal-linkedin)" },
    { href: contacto.github, nombre: "GitHub", Icono: IconoGithub, color: "var(--color-tinta)" },
  ].filter(Boolean) as Canal[];

  return (
    <section
      id="contacto"
      className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-14 sm:pt-40 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:scroll-mt-0! lg:pt-20"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-tinta-media">
        <span className="inline-flex items-center gap-2.5 font-semibold text-tinta">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-60 motion-reduce:animate-none" />
            <span className="relative size-2.5 rounded-full bg-[#25d366]" />
          </span>
          Disponible para un puesto o un proyecto
        </span>
        <HoraMendoza />
      </div>

      <h2 className="mt-6 -ml-[0.05em] text-[clamp(64px,15vw,232px)] leading-[0.86] font-extrabold tracking-[-0.055em]">Hablemos.</h2>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-10 lg:mt-12">
        <p className="max-w-[40ch] text-[19px] leading-normal text-tinta-media">
          Si buscás a alguien para tu equipo o tenés una idea que querés ver funcionando, escribime por donde te quede
          más cómodo.
        </p>
        <ul className="flex flex-wrap gap-4 sm:gap-6">
          {canales.map(({ href, nombre, Icono, color }) => (
            <li key={nombre}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-col items-center gap-2.5 no-underline"
                style={{ "--c": color } as CSSProperties}
              >
                <span className="grid size-16 place-items-center rounded-full bg-superficie text-(--c) shadow-[inset_0_0_0_1px_var(--color-borde-oscuro)] transition-[translate,box-shadow] duration-200 group-hover:-translate-y-1 group-hover:shadow-[inset_0_0_0_1.5px_var(--c)] group-focus-visible:shadow-[inset_0_0_0_1.5px_var(--c)] sm:size-[72px]">
                  <Icono className="size-7" />
                </span>
                <span className="text-sm text-tinta-suave transition-colors duration-200 group-hover:text-tinta">{nombre}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Pie() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-7xl px-4 pb-14 sm:px-14 lg:mt-16 lg:pb-8">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-tinta/[.08] pt-6 text-[15px] text-tinta-suave">
        <span>juanamelio.ar</span>
        <span>Hecho por mí, con el mismo método que mis proyectos.</span>
      </div>
    </footer>
  );
}
