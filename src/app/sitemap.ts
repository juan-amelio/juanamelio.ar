import type { MetadataRoute } from "next";

/* Una sola página (#32), en dos idiomas (#22): cada una dice dónde está la
   otra. Es lo que se carga en Google Search Console (#57). */
export default function sitemap(): MetadataRoute.Sitemap {
  const idiomas = { es: "https://juanamelio.ar", en: "https://juanamelio.ar/en" };
  return [
    { url: idiomas.es, changeFrequency: "monthly", priority: 1, alternates: { languages: idiomas } },
    { url: idiomas.en, changeFrequency: "monthly", priority: 1, alternates: { languages: idiomas } },
  ];
}
