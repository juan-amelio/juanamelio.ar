import type { MDXComponents } from "mdx/types";

/* El relato de cada caso. Los colores salen del tema del caso (data-caso en
   MarcoCaso): el mismo MDX se lee en negro y turquesa, en negro y lima o en
   papel y tinta, según de qué producto se trate. */
const components: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-20 text-[clamp(28px,3vw,36px)] leading-tight font-extrabold tracking-[-0.02em] first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h3
      className="mt-12 border-t border-(--caso-borde) pt-6 text-[22px] leading-snug font-bold text-(--caso-texto)"
      {...props}
    />
  ),
  p: (props) => <p className="mt-5 text-[19px] leading-[1.7] text-(--caso-texto-medio)" {...props} />,
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-[19px] leading-[1.7] text-(--caso-texto-medio) marker:text-(--caso-acento)"
      {...props}
    />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-[19px] leading-[1.7] text-(--caso-texto-medio)" {...props} />
  ),
  strong: (props) => <strong className="font-bold text-(--caso-texto)" {...props} />,
  a: (props) => (
    <a className="font-semibold text-(--caso-texto) underline decoration-(--caso-acento) underline-offset-3" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-12 rounded-2xl bg-(--caso-superficie) px-7 py-6 shadow-[inset_4px_0_0_var(--caso-cita),inset_0_0_0_1px_var(--caso-borde)] [&>p]:mt-0 [&>p]:text-[clamp(22px,2.4vw,28px)] [&>p]:leading-snug [&>p]:font-semibold [&>p]:text-(--caso-texto)"
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
