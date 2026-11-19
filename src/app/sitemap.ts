import type { MetadataRoute } from "next";

/* Es una sola página (#32). Es lo que se carga en Google Search Console (#57). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://juanamelio.ar", changeFrequency: "monthly", priority: 1 }];
}
