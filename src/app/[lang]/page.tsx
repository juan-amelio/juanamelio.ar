import { notFound } from "next/navigation";
import { Contacto, Pie } from "@/components/inicio/Contacto";
import { Encabezado } from "@/components/inicio/Encabezado";
import { Portada } from "@/components/inicio/Portada";
import { Recorrido } from "@/components/inicio/Recorrido";
import { SobreMi } from "@/components/inicio/SobreMi";
import { esIdioma } from "@/idioma/idiomas";

export default async function Inicio({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();

  return (
    <>
      {/* Afuera de la portada: ella lleva isolate y la barra quedaba debajo del recorrido. */}
      <Encabezado />
      <main>
        <Portada />
        {/* Primero la persona y después los proyectos (#36): desde la portada se
            puede ir directo a uno, y el que baja conoce a quién los hizo. */}
        <SobreMi idioma={lang} />
        <Recorrido />
        {/* Proceso (Metodo.tsx) apagado a pedido de Juan (#58): el componente
            queda en el repo; para volver, se importa acá (con idioma={lang}) y
            se suma al menú. */}
        {/* El contacto y el pie son la última pantalla: así el encaje no deja
            el pie colgando abajo. */}
        <div className="flex flex-col snap-start lg:min-h-svh">
          <Contacto idioma={lang} />
          <Pie idioma={lang} />
        </div>
      </main>
    </>
  );
}
