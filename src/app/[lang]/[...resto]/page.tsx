import { notFound } from "next/navigation";

/*
 * Cualquier dirección que no es una página del sitio (#60). Sin esta ruta, una
 * dirección desconocida no llegaba a [lang]/not-found.tsx: Next mostraba su 404
 * genérico, en blanco y en inglés. El proxy ya reescribió el español a «/es»,
 * así que acá llegan «/es/lo-que-sea» y «/en/lo-que-sea», cada una con su idioma.
 */

/* No hay nada que validar: la página sólo existe para cortar con el 404. Sin
   esto, `next dev` avisa que no pudo validar la navegación instantánea. */
export const instant = false;

export default function Resto() {
  notFound();
}
