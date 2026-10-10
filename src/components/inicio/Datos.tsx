/** La fila de datos de un caso: desde cuándo, dónde, con qué. */
export function Datos({ items, claseEtiqueta }: { items: [string, string][]; claseEtiqueta: string }) {
  return (
    <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 text-[15px]">
      {items.map(([etiqueta, valor]) => (
        <div key={etiqueta}>
          <dt className={claseEtiqueta}>{etiqueta}</dt>
          <dd className="mt-1 text-lg font-semibold">{valor}</dd>
        </div>
      ))}
    </dl>
  );
}
