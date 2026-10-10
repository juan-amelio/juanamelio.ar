import { CasoA7 } from "@/components/inicio/CasoA7";
import { CasoForge } from "@/components/inicio/CasoForge";
import { CasoGlobalFit } from "@/components/inicio/CasoGlobalFit";
import { Contacto, Pie } from "@/components/inicio/Contacto";
import { Encabezado } from "@/components/inicio/Encabezado";
import { Metodo } from "@/components/inicio/Metodo";
import { Portada } from "@/components/inicio/Portada";

export default function Inicio() {
  return (
    <>
      <Encabezado />
      <main>
        <Portada />
        <CasoGlobalFit />
        <CasoA7 />
        <CasoForge />
        <Metodo />
        <Contacto />
      </main>
      <Pie />
    </>
  );
}
