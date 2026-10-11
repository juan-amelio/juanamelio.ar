import type { CSSProperties } from "react";
import { Foto } from "@/components/Foto";
import { IconoGithub, IconoLinkedin, IconoMail, IconoWhatsapp } from "@/components/Iconos";
import { contacto, hrefEmail, hrefWhatsapp } from "@/lib/contacto";
import { HoraMendoza } from "./HoraMendoza";

type Canal = { href: string; nombre: string; Icono: typeof IconoGithub; color: string };

/*
 * El cierre de la página. Los mismos canales que flotan en los costados
 * (Redes), acá grandes y solos: el ícono alcanza, y el nombre aparece al pasar
 * el mouse. El fondo junta las luces de los tres productos.
 */
export function Contacto() {
  const canales = [
    contacto.email && { href: hrefEmail, nombre: "Mail", Icono: IconoMail, color: "#3bd0cf" },
    hrefWhatsapp && { href: hrefWhatsapp, nombre: "WhatsApp", Icono: IconoWhatsapp, color: "#25d366" },
    contacto.linkedin && { href: contacto.linkedin, nombre: "LinkedIn", Icono: IconoLinkedin, color: "#4f9ff0" },
    { href: contacto.github, nombre: "GitHub", Icono: IconoGithub, color: "#eceef0" },
  ].filter(Boolean) as Canal[];

  return (
    <section id="contacto" className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-14 sm:pt-40">
      <div className="relative isolate flex flex-col items-center overflow-hidden rounded-[32px] bg-superficie px-6 py-14 text-center shadow-[inset_0_0_0_1px_var(--color-borde-oscuro)] sm:px-16 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_0%_0%,rgb(0_181_181/.16),transparent_70%),radial-gradient(50%_70%_at_100%_100%,rgb(190_222_20/.12),transparent_70%),radial-gradient(40%_50%_at_100%_0%,rgb(214_0_108/.10),transparent_70%)]"
        />

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[15px] text-tinta-media">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[.06] py-1.5 pr-4 pl-3 font-semibold text-tinta">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-60 motion-reduce:animate-none" />
              <span className="relative size-2.5 rounded-full bg-[#25d366]" />
            </span>
            Disponible para un puesto o un proyecto
          </span>
          <HoraMendoza />
        </div>

        <Foto tamanos="128px" className="mt-12 size-24 rounded-full sm:size-32" />
        <h2 className="mt-8 text-[clamp(48px,8vw,120px)] leading-[0.92] font-extrabold tracking-[-0.045em]">Hablemos.</h2>
        <p className="mt-6 max-w-[44ch] text-[19px] leading-normal text-tinta-media">
          Si buscás a alguien para tu equipo o tenés una idea que querés ver funcionando, escribime por donde te quede
          más cómodo.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-5">
          {canales.map(({ href, nombre, Icono, color }) => (
            <li key={nombre}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={nombre}
                className="group relative grid size-16 place-items-center rounded-full bg-fondo/70 text-tinta shadow-[inset_0_0_0_1px_var(--color-borde-oscuro)] transition-[translate,color,box-shadow] duration-200 hover:-translate-y-1 hover:text-(--c) hover:shadow-[inset_0_0_0_1px_var(--c)] focus-visible:text-(--c) sm:size-[72px]"
                style={{ "--c": color } as CSSProperties}
              >
                <Icono className="size-7" />
                <span className="pointer-events-none absolute top-full mt-3 rounded-full bg-tinta px-3 py-1 text-sm font-semibold whitespace-nowrap text-fondo opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {nombre}
                </span>
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
    <footer className="mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-x-6 gap-y-2 px-4 pt-12 pb-14 text-[15px] text-tinta-suave sm:px-14">
      <span>juanamelio.ar</span>
      <span>Hecho por mí, con el mismo método que mis proyectos.</span>
    </footer>
  );
}
