import { en } from "./en";
import { es, type Textos } from "./es";
import type { Idioma } from "./idiomas";

export type { Textos };

/** Los textos de cada versión. Para los componentes del servidor; los del
    navegador los toman de useTextos() (Idioma.tsx). */
export const TEXTOS: Record<Idioma, Textos> = { es, en };
