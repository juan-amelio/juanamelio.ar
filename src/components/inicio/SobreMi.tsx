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
    <section id="sobre-mi" className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-14 sm:pt-40">
      <h2 className="text-[clamp(32px,4.4vw,64px)] leading-none font-extrabold tracking-[-0.035em]">Sobre mí</h2>
      <div className="mt-11 flex flex-wrap gap-x-20 gap-y-12">
        <div className="min-w-0 flex-[1_1_520px] space-y-5 text-[19px] leading-relaxed text-tinta-media">
          <p>
            Soy Juan Bautista Amelio, desarrollador de software en Mendoza. Desde 2023 trabajo en el equipo de
            Soluciones de Slingr, haciendo aplicaciones a medida para empresas de Estados Unidos. Me reúno cada
            semana con los clientes, en inglés, para mostrar avances, ajustar requisitos y planear lo que sigue.
          </p>
          <p>
            Ahí hice de punta a punta el ERP de una planta industrial de Utah: inventario por lotes, compras,
            producción con listas de materiales y órdenes de trabajo, ventas y envíos, asignación FIFO de lotes,
            integración con su tienda online y reportes. También construí agentes de IA con Gemini: uno que audita
            liquidaciones de sueldo contra la normativa laboral de Estados Unidos, un chatbot de soporte para
            instrumentos de laboratorio y otros que extraen datos de documentos.
          </p>
          <p>
            En 2026 empecé a construir mis propios productos, y los tres de esta página están en producción. Los hago
            con Claude Code como herramienta principal y con una regla que no cambio: ningún cambio llega a la gente
            sin que una persona lo revise.
          </p>
        </div>
        <dl className="grid flex-[1_1_300px] content-start gap-y-5">
          {DATOS.map(([etiqueta, valor]) => (
            <div key={etiqueta}>
              <dt className="text-[15px] text-tinta-suave">{etiqueta}</dt>
              <dd className="mt-1 text-lg leading-snug font-semibold">{valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
