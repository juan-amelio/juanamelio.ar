/*
 * Los dos idiomas del sitio (#22). El español vive en «/» y el inglés en
 * «/en». Por dentro las dos versiones son la ruta app/[lang]: «/» llega a
 * «/es» por una reescritura del proxy (src/proxy.ts), que la persona no ve.
 */
export const IDIOMAS = ["es", "en"] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const esIdioma = (valor: string): valor is Idioma => (IDIOMAS as readonly string[]).includes(valor);

/** Dónde empieza cada versión, tal como se ve en la barra del navegador. */
export const INICIO: Record<Idioma, "/" | "/en"> = { es: "/", en: "/en" };

/** La cookie que guarda lo que eligió la persona con el selector ES / EN. */
export const COOKIE_IDIOMA = "idioma";

/** Para formatear números y horas en cada versión. */
export const LOCALE: Record<Idioma, string> = { es: "es-AR", en: "en-US" };
