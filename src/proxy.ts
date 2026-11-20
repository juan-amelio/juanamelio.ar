import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_IDIOMA, type Idioma } from "@/idioma/idiomas";

/*
 * Qué versión ve cada visita (#22).
 *
 * - «/en» (y lo de adentro) pasa derecho: un link al inglés es siempre inglés.
 * - «/es» no se usa como dirección: redirige a «/», que es la del español.
 * - Todo lo demás es el español, salvo que la persona prefiera el inglés: si
 *   lo eligió con el selector (la cookie), o si no eligió nada y su navegador
 *   pone el inglés antes que el español. Ahí se la manda a «/en».
 *
 * El español se sirve reescribiendo a «/es», la página ya armada en el build:
 * el proxy sólo decide, no arma nada.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/" && preferido(request) === "en") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    // 307: depende de quién pregunta, no se puede guardar como definitiva.
    return NextResponse.redirect(url, 307);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

/* Lo que eligió la persona manda; si no eligió, el orden de idiomas de su
   navegador (Accept-Language). Un navegador en francés, o un buscador que no
   manda nada, ve el español. */
function preferido(request: NextRequest): Idioma {
  const elegido = request.cookies.get(COOKIE_IDIOMA)?.value;
  if (elegido === "es" || elegido === "en") return elegido;

  const pedidos = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((parte) => {
      const [etiqueta, ...params] = parte.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { idioma: etiqueta.split("-")[0], q: q ? Number(q.slice(2)) || 0 : 1 };
    })
    // q=0 quiere decir «este no»: no cuenta como preferencia.
    .filter((p) => (p.idioma === "es" || p.idioma === "en") && p.q > 0)
    .sort((a, b) => b.q - a.q);

  return pedidos[0]?.idioma === "en" ? "en" : "es";
}

export const config = {
  // Ni lo interno de Next ni los archivos (fotos, videos, íconos, robots.txt,
  // sitemap.xml): sólo las páginas. Se reconocen por el punto, así un archivo
  // nuevo en public/ anda sin tocar esto. A cambio, una dirección con punto
  // que no existe (/cv.pdf) da el 404 de Next y no el del sitio.
  matcher: ["/((?!_next/|_vercel/|.*\\.[^/]+$).*)"],
};
