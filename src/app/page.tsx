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
        <Recorrido />
        <SobreMi />
        <Metodo />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}
