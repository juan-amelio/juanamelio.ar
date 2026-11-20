import type { Idioma } from "@/idioma/idiomas";
import { TEXTOS } from "@/idioma/textos";

/**
 * Los datos de contacto, en un solo lugar.
 *
 * El repo es público: lo que se escriba acá queda en internet. Mientras un dato
 * no esté decidido queda en null y el botón lleva a la sección de contacto.
 */
export const contacto = {
  email: "juanb.amelio@gmail.com" as string | null,
  linkedin: "https://www.linkedin.com/in/juan-b-amelio" as string | null,
  cv: null as string | null,
  /** La foto de Juan, dentro de public/ (por ejemplo "/juan.jpg"). En null, va el monograma. */
  foto: "/juan.jpg" as string | null,
  github: "https://github.com/juan-amelio",
  /** Con código de país y sin espacios ni signos (549261…). En null, el botón no aparece. */
  whatsapp: "5492613679513" as string | null,
};

/** WhatsApp con el mensaje ya escrito en el idioma del sitio (src/idioma).
    En null si no hay número. */
export const hrefWhatsapp = (idioma: Idioma) =>
  contacto.whatsapp
    ? `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(TEXTOS[idioma].redes.mensajeWhatsapp)}`
    : null;

export const hrefEmail = contacto.email ? `mailto:${contacto.email}` : "#contacto";
export const hrefLinkedin = contacto.linkedin ?? "#contacto";
export const hrefCv = contacto.cv ?? "#contacto";
