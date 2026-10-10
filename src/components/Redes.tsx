import { contacto, hrefEmail, hrefWhatsapp } from "@/lib/contacto";
import { IconoGithub, IconoLinkedin, IconoMail, IconoWhatsapp } from "./Iconos";

/*
 * Los contactos que están en todas las páginas (#28).
 *
 * A la izquierda, en escritorio, una columna fina con LinkedIn, GitHub y el
 * mail, en blanco. Lleva mix-blend-difference para que sobre el papel de Forge
 * se vea en negro sin tener que saber de qué color es el fondo.
 * Abajo a la derecha, el botón de WhatsApp, como en halfpipe.dev.
 */
export function Redes() {
  const redes = [
    contacto.linkedin && { href: contacto.linkedin, nombre: "LinkedIn", Icono: IconoLinkedin },
    { href: contacto.github, nombre: "GitHub", Icono: IconoGithub },
    contacto.email && { href: hrefEmail, nombre: "Mail", Icono: IconoMail },
  ].filter(Boolean) as { href: string; nombre: string; Icono: typeof IconoGithub }[];

  return (
    <>
      <nav
        aria-label="Redes"
        className="fixed bottom-0 left-2.5 z-40 hidden flex-col items-center gap-4 text-white mix-blend-difference lg:flex 2xl:left-8"
      >
        {redes.map(({ href, nombre, Icono }) => (
          <a
            key={nombre}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={nombre}
            title={nombre}
            className="grid size-9 place-items-center rounded-full opacity-70 transition-[opacity,translate] duration-200 hover:-translate-y-0.5 hover:opacity-100"
          >
            <Icono className="size-[18px]" />
          </a>
        ))}
        <span aria-hidden="true" className="h-20 w-px bg-white/60" />
      </nav>

      {hrefWhatsapp && (
        <a
          href={hrefWhatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribime por WhatsApp"
          className="whatsapp group fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/.55)] transition-transform duration-200 hover:scale-105 sm:right-7 sm:bottom-7"
        >
          <IconoWhatsapp className="size-7" />
          <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-tinta px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-fondo opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            Escribime por WhatsApp
          </span>
        </a>
      )}
    </>
  );
}
