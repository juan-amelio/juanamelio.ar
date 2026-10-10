import { Archivo, Bricolage_Grotesque, Geist, Source_Serif_4 } from "next/font/google";

// La voz del sitio.
export const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });

// Las de cada marca: se usan sólo adentro de la sección de su caso.
export const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
export const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
export const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"] });

export const variablesDeFuentes = [bricolage, geist, archivo, sourceSerif].map((f) => f.variable).join(" ");
