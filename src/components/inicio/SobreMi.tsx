import { Foto } from "@/components/Foto";
import type { Idioma } from "@/idioma/idiomas";
import { TEXTOS } from "@/idioma/textos";

/* Todo sale del CV de Juan: nada se inventó. Los textos están en src/idioma. */
export function SobreMi({ idioma }: { idioma: Idioma }) {
  const textos = TEXTOS[idioma];
  const t = textos.sobreMi;
  return (
    <section id="sobre-mi" className="mx-auto w-full max-w-7xl snap-start px-4 pt-24 pb-8 sm:px-14 sm:pt-40 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:scroll-mt-0! lg:pt-20 lg:pb-10">
      {/* En escritorio, el título y el texto a la izquierda y la foto grande a
          la derecha. En el celular (#63), una ficha arriba: la foto chica y al
          lado el título, el nombre y el puesto; el texto, debajo y a todo el
          ancho. Los datos van al final, en los dos. */}
      <div className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-x-5 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-start lg:gap-x-20">
        <Foto
          tamanos="(min-width: 1024px) 340px, 96px"
          className="aspect-[4/5] w-full rounded-2xl lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:rounded-[28px]"
        />
        <div className="min-w-0 lg:col-start-1 lg:row-start-1">
          <h2 className="text-[clamp(32px,4.4vw,64px)] leading-none font-extrabold tracking-[-0.035em]">{t.titulo}</h2>
          <p className="mt-3 text-[17px] leading-snug font-semibold lg:hidden">{t.nombre}</p>
          <p className="mt-0.5 text-[15px] leading-snug text-tinta-suave lg:hidden">{textos.meta.puesto}</p>
        </div>
        <div className="col-span-2 space-y-5 text-[17px] leading-relaxed text-tinta-media lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:text-[18px]">
          {t.parrafos.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      {/* En el celular, un renglón por dato (etiqueta y valor). El final de la
          lista es un punto de encaje del scroll: si no, el proyecto que viene
          lo tapaba al acercarse al último (#63). */}
      <dl className="mt-12 grid gap-x-8 gap-y-4 border-t border-borde-oscuro pt-6 max-lg:snap-end max-lg:scroll-mb-24 sm:grid-cols-2 sm:gap-y-7 sm:pt-8 lg:mt-10 lg:grid-cols-5 lg:pt-6">
        {t.datos.map(([etiqueta, valor]) => (
          <div key={etiqueta} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 sm:block">
            <dt className="pt-0.5 text-[14px] text-tinta-suave sm:pt-0 sm:text-[15px]">{etiqueta}</dt>
            <dd className="text-base leading-snug font-semibold sm:mt-1 sm:text-lg">{valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
