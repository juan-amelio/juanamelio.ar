const PASOS = [
  "Cada trabajo empieza como una tarjeta en el tablero.",
  "Una tarjeta, una rama, un pull request.",
  "Antes de entregar corren lint, tipos, pruebas y build.",
  "Una persona revisa y aprueba.",
  "Recién ahí sale a producción.",
];

export function Metodo() {
  return (
    <section id="metodo" className="mx-auto w-full max-w-7xl px-4 pt-24 sm:px-14 sm:pt-40">
      <h2 className="text-[clamp(32px,4.4vw,64px)] leading-none font-extrabold tracking-[-0.035em]">Cómo trabajo</h2>
      <ol className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PASOS.map((paso, i) => (
          <li key={paso} className="rounded-2xl bg-superficie p-5.5">
            <span className="block text-4xl leading-none font-extrabold">{i + 1}</span>
            <span className="mt-3.5 block text-[17px] leading-snug">{paso}</span>
          </li>
        ))}
      </ol>
      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-x-18 gap-y-6">
        <p className="max-w-[54ch] text-[19px] leading-relaxed text-tinta-media">
          Trabajo con IA todos los días, con candados: no puede escribir en la rama principal ni saltarse la
          revisión. La velocidad es de la herramienta; la responsabilidad sigue siendo mía.
        </p>
        <p className="max-w-[54ch] text-[19px] leading-relaxed text-tinta-media">
          Al cliente le entrego por escrito lo que el producto no hace y los riesgos que conozco, cada uno con su
          plan. Así nadie firma sorpresas.
        </p>
      </div>
    </section>
  );
}
