import { Contacto, Pie } from "@/components/inicio/Contacto";
import { Encabezado } from "@/components/inicio/Encabezado";
import { Metodo } from "@/components/inicio/Metodo";
import { Portada } from "@/components/inicio/Portada";
import { Recorrido } from "@/components/inicio/Recorrido";
import { SobreMi } from "@/components/inicio/SobreMi";

export default function Inicio() {
  return (
    <>
      {/* Afuera de la portada: ella lleva isolate y la barra quedaba debajo del recorrido. */}
      <Encabezado />
      <main>
        <Portada />
        {/* Primero la persona y después los proyectos (#36): desde la portada se
            puede ir directo a uno, y el que baja conoce a quién los hizo. */}
        <SobreMi />
        <Recorrido />
        <Metodo />
        {/* El contacto y el pie son la última pantalla: así el encaje no deja
            el pie colgando abajo. */}
        <div className="flex flex-col snap-start lg:min-h-svh">
          <Contacto />
          <Pie />
        </div>
      </main>
    </>
  );
}
