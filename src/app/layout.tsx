import type { Metadata } from "next";
import { Redes } from "@/components/Redes";
import { variablesDeFuentes } from "./fuentes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Amelio",
  description: "Hago apps para negocios reales y las sostengo en producción. Abierto a un puesto o a un proyecto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${variablesDeFuentes} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Redes />
      </body>
    </html>
  );
}
