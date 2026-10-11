/* Cómo es trabajar conmigo, del primer mensaje al después de la entrega.
   Íconos de trazo fino en currentColor, como los de la galería de los casos
   (el cohete es el de Lucide, licencia ISC). */
const PASOS = [
  {
    titulo: "Contacto",
    texto: "Me escribís por donde te quede cómodo y me contás qué tenés en mente.",
    trazo: "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01",
  },
  {
    titulo: "Relevamiento",
    texto: "Nos reunimos, me contás tu idea y veo cómo se trabaja hoy: qué falta, qué sobra y qué duele.",
    trazo: "M9 3h6v3H9zM9 4.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1h-3M8.5 11h7M8.5 15h4.5",
  },
  {
    titulo: "Solución a medida",
    texto: "Con lo relevado armo la solución para tu caso: qué se construye, cómo y en qué orden.",
    trazo: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5.5l-3 13",
  },
  {
    titulo: "Cotización",
    texto: "Precio y plazos por escrito, junto con lo que el producto no hace y los riesgos que conozco. Sin sorpresas.",
    trazo:
      "M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5M14.25 11.5H12a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.25M12.5 10v1.5M12.5 17.5V19",
  },
  {
    titulo: "Implementación y seguimiento",
    texto: "Lo pongo en marcha con tu equipo y sigo cerca después: ajustes, mejoras y soporte.",
    trazo:
      "M5 15.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1zM12 15l-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2zM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5",
  },
];

export function Metodo() {
  return (
    <section id="proceso" className="snap-start mx-auto w-full max-w-7xl px-4 pt-24 sm:px-14 sm:pt-40">
      <h2 className="text-[clamp(32px,4.4vw,64px)] leading-none font-extrabold tracking-[-0.035em]">Proceso</h2>
      <p className="mt-6 max-w-[52ch] text-[19px] leading-relaxed text-tinta-media">
        Del primer mensaje a la app funcionando, y después también. Del otro lado está siempre la misma persona.
      </p>

      <ol className="relative mt-14 grid gap-10 lg:grid-cols-5 lg:gap-6">
        {/* La línea que une los pasos: horizontal en escritorio, vertical en el celular. */}
        <span
          aria-hidden="true"
          className="absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-gf-turquesa via-a7-lima to-fs-magenta opacity-50 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto lg:bg-gradient-to-r"
        />
        {PASOS.map(({ titulo, texto, trazo }, i) => (
          <li key={titulo} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
            <span className="relative grid size-14 shrink-0 place-items-center rounded-full bg-superficie text-tinta shadow-[inset_0_0_0_1px_var(--color-borde-oscuro),0_0_0_8px_var(--color-fondo)]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-6">
                <path d={trazo} />
              </svg>
            </span>
            <div className="pt-1 lg:pt-0">
              <span className="block text-sm font-semibold tracking-wide text-tinta-suave">Paso {i + 1}</span>
              <h3 className="mt-1 text-xl leading-tight font-bold">{titulo}</h3>
              <p className="mt-2 text-[17px] leading-snug text-tinta-media">{texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-16 max-w-[60ch] text-[17px] leading-relaxed text-tinta-suave">
        Trabajo con IA todos los días, con candados: no puede escribir en la rama principal ni saltarse la revisión. La
        velocidad es de la herramienta; la responsabilidad sigue siendo mía.
      </p>
    </section>
  );
}
