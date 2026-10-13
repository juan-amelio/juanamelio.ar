import type { Metadata } from "next";
import { Redes } from "@/components/Redes";
import { variablesDeFuentes } from "./fuentes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Amelio",
  description: "Hago apps para negocios reales y las sostengo en producción. Abierto a un puesto o a un proyecto.",
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
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Redes />
      </body>
    </html>
  );
}
