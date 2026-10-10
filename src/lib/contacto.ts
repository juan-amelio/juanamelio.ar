/**
 * Los datos de contacto, en un solo lugar.
 *
 * El repo es público: lo que se escriba acá queda en internet. Mientras un dato
 * no esté decidido queda en null y el botón lleva a la sección de contacto.
 */
export const contacto = {
  email: null as string | null,
  linkedin: null as string | null,
  cv: null as string | null,
  github: "https://github.com/juan-amelio",
};

export const hrefEmail = contacto.email ? `mailto:${contacto.email}` : "#contacto";
export const hrefLinkedin = contacto.linkedin ?? "#contacto";
export const hrefCv = contacto.cv ?? "#contacto";
