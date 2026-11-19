import type { MetadataRoute } from "next";

/* Los buscadores pueden leer todo; el sitemap les dice qué hay (#57). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://juanamelio.ar/sitemap.xml",
  };
}
