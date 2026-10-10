import type { MDXComponents } from "mdx/types";

/* Tipografía de lectura para los casos mientras no tengan su diseño propio
   (#7 y #15). Sólo lo justo para que un borrador se lea bien. */
const components: MDXComponents = {
  h1: (props) => (
    <h1 className="text-[clamp(40px,6vw,80px)] leading-[0.98] font-extrabold tracking-[-0.035em]" {...props} />
  ),
  h2: (props) => <h2 className="mt-16 text-3xl leading-tight font-extrabold tracking-[-0.02em]" {...props} />,
  h3: (props) => <h3 className="mt-10 text-xl font-bold" {...props} />,
  p: (props) => <p className="mt-5 text-[19px] leading-relaxed text-tinta-media" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[19px] leading-relaxed text-tinta-media" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[19px] leading-relaxed text-tinta-media" {...props} />,
  strong: (props) => <strong className="font-bold text-tinta" {...props} />,
  a: (props) => <a className="font-semibold underline underline-offset-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-8 border-l-4 border-tinta pl-6 text-2xl leading-snug font-semibold [&>p]:text-tinta" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
