import Image from "next/image";
import { contacto } from "@/lib/contacto";

/*
 * La foto de Juan, en el sobre mí y en el contacto. Mientras no haya foto
 * (contacto.foto en null) va un monograma con los colores de los tres
 * productos, para que el lugar ya tenga su peso en la página.
 */
export function Foto({ className = "", tamanos }: { className?: string; tamanos: string }) {
  return (
    <div className={`relative overflow-hidden bg-superficie shadow-[inset_0_0_0_1px_var(--color-borde-oscuro)] ${className}`}>
      {contacto.foto ? (
        <Image src={contacto.foto} alt="Juan Amelio" fill sizes={tamanos} className="object-cover" />
      ) : (
        <div
          aria-hidden="true"
          className="grid size-full place-items-center [container-type:size] bg-[radial-gradient(120%_90%_at_15%_10%,rgb(0_181_181/.35),transparent_60%),radial-gradient(110%_90%_at_90%_95%,rgb(190_222_20/.28),transparent_60%),radial-gradient(80%_70%_at_95%_5%,rgb(214_0_108/.22),transparent_65%)]"
        >
          <span className="text-[length:40cqmin] leading-none font-extrabold tracking-[-0.06em] text-tinta/90">
            JA
          </span>
        </div>
      )}
    </div>
  );
}
