import { Planchas } from "@/components/inicio/Portada";
import type { Slug } from "./casos";

/** El nombre de cada producto escrito como lo escribe su propia marca. */
export function Marca({ caso, className = "" }: { caso: Slug; className?: string }) {
  if (caso === "global-fit")
    return (
      <span className={`font-extrabold tracking-[-0.5px] ${className}`}>
        GLOBAL<span className="text-gf-turquesa">FIT</span>
      </span>
    );
  if (caso === "a7-sports")
    return (
      <span className={`font-extrabold [font-stretch:125%] ${className}`}>
        A7 <span className="text-a7-lima">sports</span>
      </span>
    );
  return (
    <span className={`inline-flex items-center gap-3 font-semibold ${className}`}>
      Forge Studio
      <Planchas tamano={10} />
    </span>
  );
}
