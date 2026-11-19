import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Redes } from "@/components/Redes";
import { contacto } from "@/lib/contacto";
import { variablesDeFuentes } from "./fuentes";
import "./globals.css";

const DESCRIPCION = "Hago apps para negocios reales y las sostengo en producción.";

/*
 * La ficha de persona para Google (#57): junta «Juan Amelio» y «Juan Bautista
 * Amelio» en la misma persona y le dice que este sitio, LinkedIn y GitHub son
 * de ella. No se ve en la página.
 */
const PERSONA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juan Amelio",
  alternateName: "Juan Bautista Amelio",
  url: "https://juanamelio.ar",
  image: contacto.foto ? `https://juanamelio.ar${contacto.foto}` : undefined,
  jobTitle: "Desarrollador de software",
  address: { "@type": "PostalAddress", addressLocality: "Mendoza", addressCountry: "AR" },
  sameAs: [contacto.linkedin, contacto.github].filter(Boolean),
};

/*
 * Lo que leen los buscadores y lo que muestran LinkedIn y WhatsApp al
 * compartir el link (#17). La imagen y los íconos son archivos de esta
 * carpeta (opengraph-image.png, icon.png, apple-icon.png, favicon.ico) que
 * Next toma solo; se regeneran con scripts/compartir/generar.mjs.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://juanamelio.ar"),
  title: "Juan Amelio · Desarrollador de software en Mendoza",
  description: DESCRIPCION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Juan Amelio",
    title: "Juan Amelio",
    description: DESCRIPCION,
  },
  twitter: { card: "summary_large_image", title: "Juan Amelio", description: DESCRIPCION },
};

/* El tema, antes de pintar (ver BotonTema): lo guardado si la persona eligió,
   si no lo que diga el sistema, y lo sigue si el sistema cambia (addListener
   para Safari anterior al 14). Va en línea y no en un efecto para que no haya
   un parpadeo oscuro en cada carga. */
const TEMA = `(function(){var r=document.documentElement,m=matchMedia("(prefers-color-scheme: light)");function g(){try{return localStorage.getItem("tema")}catch(e){}}function p(){var t=g();r.dataset.tema=t==="claro"||t==="oscuro"?t:m.matches?"claro":"oscuro"}p();m.addEventListener?m.addEventListener("change",p):m.addListener(p)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      // El script de TEMA le pone data-tema antes de que React lo hidrate.
      suppressHydrationWarning
      // Al scrollear, la página encaja de sección en sección (#33). Sólo en
      // escritorio: en el celular cada proyecto es más alto que la pantalla.
      className={`${variablesDeFuentes} h-full antialiased lg:motion-safe:snap-y lg:motion-safe:snap-mandatory`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: TEMA }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSONA).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Redes />
        {/* Las visitas (#17), sin cookies. Sólo cuenta en Vercel: en local no manda nada. */}
        <Analytics />
      </body>
    </html>
  );
}
