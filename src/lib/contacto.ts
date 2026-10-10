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
  github: "https://github.com/juan-amelio",
  /** Con código de país y sin espacios ni signos (549261…). En null, el botón no aparece. */
  whatsapp: null as string | null,
};

/** El mensaje que llega escrito al abrir WhatsApp desde el sitio. */
const MENSAJE_WHATSAPP = "Hola Juan, vi tu sitio y te quería consultar por";

export const hrefWhatsapp = contacto.whatsapp
  ? `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(MENSAJE_WHATSAPP)}`
  : null;

export const hrefEmail = contacto.email ? `mailto:${contacto.email}` : "#contacto";
export const hrefLinkedin = contacto.linkedin ?? "#contacto";
export const hrefCv = contacto.cv ?? "#contacto";
