/* Corre el reloj de Node a `RELOJ_DEMO` (una fecha ISO) y lo deja andar desde
   ahí. Se carga con NODE_OPTIONS="--require …/reloj.cjs" en el servidor de la
   app que se graba, para que la demo sea un martes a la tarde aunque se grabe
   un domingo. Sin la variable no hace nada.

   Es una función y no `class extends Date`: Next ejecuta código en otros
   contextos donde la subclase perdía los estáticos (`Date.UTC`, `Date.parse`). */
const destino = process.env.RELOJ_DEMO && Date.parse(process.env.RELOJ_DEMO);
if (destino) {
  const Real = Date;
  const corrimiento = destino - Real.now();
  const ahora = () => Real.now() + corrimiento;
  function Reloj(...args) {
    if (!new.target) return new Real(ahora()).toString();
    return args.length === 0 ? new Real(ahora()) : new Real(...args);
  }
  Object.setPrototypeOf(Reloj, Real);
  Reloj.prototype = Real.prototype;
  Reloj.now = ahora;
  Reloj.UTC = Real.UTC;
  Reloj.parse = Real.parse;
  globalThis.Date = Reloj;
}
