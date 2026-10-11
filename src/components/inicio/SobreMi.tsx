import { Foto } from "@/components/Foto";

/* Borrador de la #1. Todo sale del CV de Juan: nada de acá se inventó, y lo
   que cambie de su carrera se cambia acá. */
const DATOS: [string, string][] = [
  ["Base", "Guaymallén, Mendoza, Argentina"],
  ["Desde 2023", "Desarrollador en Slingr, equipo de Soluciones"],
  ["Idiomas", "Español nativo; inglés profesional, todos los días con clientes"],
  ["Formación", "Programa Full Stack (Java), Egg, 2022"],
  ["Busco", "Un puesto o un proyecto"],
];

export function SobreMi() {
  return (
    <section id="sobre-mi" className="snap-start mx-auto w-full max-w-7xl px-4 pt-24 sm:px-14 sm:pt-40">
      {/* El texto y la foto, arriba a la derecha (en el celular, la foto primero).
          Los datos van debajo, a todo el ancho, para que las columnas queden parejas. */}
      <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
        <Foto tamanos="(min-width: 1024px) 340px, 220px" className="aspect-[4/5] w-full max-w-[220px] rounded-[28px] lg:col-start-2 lg:row-start-1 lg:max-w-none" />
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <h2 className="text-[clamp(32px,4.4vw,64px)] leading-none font-extrabold tracking-[-0.035em]">Sobre mí</h2>
          <div className="mt-11 space-y-5 text-[19px] leading-relaxed text-tinta-media">
            <p>
              Soy Juan Bautista Amelio, desarrollador de software en Mendoza. Desde 2023 trabajo en el equipo de
              Soluciones de Slingr, haciendo aplicaciones a medida para empresas de Estados Unidos. Me reúno cada
              semana con los clientes, en inglés, para mostrar avances, ajustar requisitos y planear lo que sigue.
            </p>
            <p>
              Ahí hice de punta a punta un ERP para una empresa industrial: inventario, compras, producción, ventas y
              envíos, integración con su tienda online y reportes. También construí agentes de IA que automatizan
              procesos en industrias reguladas: revisar documentos contra una normativa, responder consultas de soporte
              técnico y extraer datos de documentos.
            </p>
            <p>
              En 2026 empecé a construir mis propios productos, y los tres de esta página están en producción. Los hago
              con Claude Code como herramienta principal y con una regla que no cambio: en mis productos, ningún cambio
              llega a la gente sin que una persona lo revise.
            </p>
          </div>
        </div>
      </div>
      <dl className="mt-16 grid gap-x-8 gap-y-7 border-t border-borde-oscuro pt-8 sm:grid-cols-2 lg:grid-cols-5">
        {DATOS.map(([etiqueta, valor]) => (
          <div key={etiqueta}>
            <dt className="text-[15px] text-tinta-suave">{etiqueta}</dt>
            <dd className="mt-1 text-lg leading-snug font-semibold">{valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
