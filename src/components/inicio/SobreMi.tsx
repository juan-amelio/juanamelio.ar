import { Foto } from "@/components/Foto";
import type { Idioma } from "@/idioma/idiomas";
import { TEXTOS } from "@/idioma/textos";

/* Todo sale del CV de Juan: nada se inventó. Los textos están en src/idioma. */
export function SobreMi({ idioma }: { idioma: Idioma }) {
  const t = TEXTOS[idioma].sobreMi;
  return (
    <section id="sobre-mi" className="mx-auto w-full max-w-7xl snap-start px-4 pt-24 sm:px-14 sm:pt-40 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:scroll-mt-0! lg:pt-20 lg:pb-10">
      {/* El texto y la foto, arriba a la derecha (en el celular, la foto primero).
          Los datos van debajo, a todo el ancho, para que las columnas queden parejas. */}
      <div className="grid gap-x-20 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
        <Foto tamanos="(min-width: 1024px) 340px, 220px" className="aspect-[4/5] w-full max-w-[220px] rounded-[28px] lg:col-start-2 lg:row-start-1 lg:max-w-none" />
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <h2 className="text-[clamp(32px,4.4vw,64px)] leading-none font-extrabold tracking-[-0.035em]">{t.titulo}</h2>
          <div className="mt-11 space-y-5 text-[19px] leading-relaxed text-tinta-media lg:mt-8 lg:text-[18px]">
            {t.parrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
      <dl className="mt-16 grid lg:mt-10 lg:pt-6 gap-x-8 gap-y-7 border-t border-borde-oscuro pt-8 sm:grid-cols-2 lg:grid-cols-5">
        {t.datos.map(([etiqueta, valor]) => (
          <div key={etiqueta}>
            <dt className="text-[15px] text-tinta-suave">{etiqueta}</dt>
            <dd className="mt-1 text-lg leading-snug font-semibold">{valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
