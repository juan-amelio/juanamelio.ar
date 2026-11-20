import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Redes } from "@/components/Redes";
import { ConIdioma } from "@/idioma/Idioma";
import { IDIOMAS, INICIO, esIdioma, type Idioma } from "@/idioma/idiomas";
import { TEXTOS } from "@/idioma/textos";
import { contacto } from "@/lib/contacto";
import { variablesDeFuentes } from "../fuentes";
import "../globals.css";

/* Las dos versiones se arman en el build (#22): «/es» (que se ve como «/»)
   y «/en». El proxy elige cuál ve cada visita. */
export function generateStaticParams() {
  return IDIOMAS.map((lang) => ({ lang }));
}

/*
 * La ficha de persona para Google (#57): junta «Juan Amelio» y «Juan Bautista
 * Amelio» en la misma persona y le dice que este sitio, LinkedIn y GitHub son
 * de ella. No se ve en la página.
 */
const persona = (idioma: Idioma) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Juan Amelio",
  alternateName: "Juan Bautista Amelio",
  url: `https://juanamelio.ar${INICIO[idioma] === "/" ? "" : INICIO[idioma]}`,
  image: contacto.foto ? `https://juanamelio.ar${contacto.foto}` : undefined,
  jobTitle: TEXTOS[idioma].meta.puesto,
  address: { "@type": "PostalAddress", addressLocality: "Mendoza", addressCountry: "AR" },
  sameAs: [contacto.linkedin, contacto.github].filter(Boolean),
});

/*
 * Lo que leen los buscadores y lo que muestran LinkedIn y WhatsApp al
 * compartir el link (#17), en el idioma de la versión. La imagen de cada
 * idioma está en public/compartir y se regenera con
 * scripts/compartir/generar.mjs; los íconos (icon.png, apple-icon.png,
 * favicon.ico) son los de src/app, que Next toma solo.
 *
 * hreflang: cada versión le dice a Google dónde está la otra, así muestra la
 * que corresponde al idioma de quien busca. La de por defecto es el español.
 */
export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const { meta } = TEXTOS[lang];
  return {
    metadataBase: new URL("https://juanamelio.ar"),
    title: meta.titulo,
    description: meta.descripcion,
    alternates: {
      canonical: INICIO[lang],
      languages: { es: INICIO.es, en: INICIO.en, "x-default": INICIO.es },
    },
    openGraph: {
      type: "website",
      locale: meta.locale,
      alternateLocale: lang === "es" ? TEXTOS.en.meta.locale : TEXTOS.es.meta.locale,
      url: INICIO[lang],
      siteName: "Juan Amelio",
      title: "Juan Amelio",
      description: meta.descripcion,
      images: [{ url: `/compartir/${lang}.png`, width: 1200, height: 630, alt: meta.imagenAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Juan Amelio",
      description: meta.descripcion,
      images: [{ url: `/compartir/${lang}.png`, alt: meta.imagenAlt }],
    },
  };
}

/* El tema, antes de pintar (ver BotonTema): lo guardado si la persona eligió,
   si no lo que diga el sistema, y lo sigue si el sistema cambia (addListener
   para Safari anterior al 14). Va en línea y no en un efecto para que no haya
   un parpadeo oscuro en cada carga. */
const TEMA = `(function(){var r=document.documentElement,m=matchMedia("(prefers-color-scheme: light)");function g(){try{return localStorage.getItem("tema")}catch(e){}}function p(){var t=g();r.dataset.tema=t==="claro"||t==="oscuro"?t:m.matches?"claro":"oscuro"}p();m.addEventListener?m.addEventListener("change",p):m.addListener(p)})()`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();

  return (
    <html
      lang={lang}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(persona(lang)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ConIdioma idioma={lang}>
          {children}
          <Redes idioma={lang} />
        </ConIdioma>
        {/* Las visitas (#17), sin cookies. Sólo cuenta en Vercel: en local no manda nada. */}
        <Analytics />
      </body>
    </html>
  );
}
