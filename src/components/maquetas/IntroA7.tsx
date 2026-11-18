"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/*
 * La intro de A7 Sports (#49): la pelota cruza la cancha desde el fondo, pica
 * en el pie de la A y, al rebotar, dibuja la barra de la A y la parte de arriba
 * del 7. Después aparece «A7 sports / Definí tu juego» y el logo hace un rebote
 * leve.
 *
 * Es la intro del login de la app real (src/components/marca/IntroLogin.tsx de
 * a7sports, en seiszero): la misma geometría, los mismos tiempos y las mismas
 * curvas. Acá corre adentro del iPhone, antes de la grabación de la caja, como
 * si se abriera la app. Se dejó afuera lo que es del login: el aterrizaje de la
 * página de links y saltearla con el teclado. Tocarla sí la saltea.
 *
 * Quién decide cuándo se ve es TelefonoGrabado: la primera vez de la visita.
 */

const W = 1080, H = 1920;
const LIMA = "#D1D600", HUESO = "#F0ECDF";

// Escenas: Golpe 1,4 s · Trazo 0,9 s · Logo 1 s · Cierre 1,5 s. Cada marca es
// el comienzo de su escena.
const C = { Golpe: 0, Trazo: 1.4, Logo: 2.3, Cierre: 3.3 };
const TOTAL = 4.8;
const SALIDA = 0.35; // el fundido a la grabación

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lin = (a: number, b: number, t: number) => a + (b - a) * t;
type Curva = (t: number) => number;
const Easing: Record<string, Curva> = {
  easeInQuad: (t) => t * t,
  easeOutCubic: (t) => (t - 1) ** 3 + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeOutBack: (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2,
};
const prog = (T: number, s: number, e: number, ease: Curva = (x) => x) => ease(clamp((T - s) / (e - s), 0, 1));

// Del sistema del isotipo (el de a7-isotipo.svg) al escenario.
const LS = 3.8, LC = [444.9, 152.6], LP = [540, 860];
const S = (x: number, y: number): [number, number] => [LP[0] + (x - LC[0]) * LS, LP[1] + (y - LC[1]) * LS];
const A_PATH = "M 420.089844 154.695312 C 416.222656 157.464844 412.355469 160.46875 408.664062 163.464844 C 404.875 166.542969 401.289062 169.898438 397.4375 172.882812 L 402.066406 165.210938 C 411.460938 150.882812 420.742188 136.484375 430.5625 122.441406 C 430.742188 122.183594 432.675781 119.4375 432.8125 119.558594 L 433.472656 145.578125 C 429.117188 148.765625 424.480469 151.550781 420.089844 154.695312 M 446.300781 138.679688 C 446.066406 135.773438 446.132812 132.851562 446.121094 129.9375 C 446.085938 121.921875 446.839844 112.8125 446.296875 104.976562 C 445.886719 99.027344 442.953125 93.121094 436.019531 95.320312 C 433.582031 96.09375 431.660156 98.394531 430.207031 100.378906 C 425.710938 106.511719 421.304688 113.324219 417.03125 119.660156 C 399.675781 145.402344 383.3125 171.707031 367.765625 198.589844 C 366.902344 200.085938 365.800781 201.429688 365.039062 203.003906 C 363.890625 205.363281 362.59375 209.292969 365.851562 210.5625 C 369.558594 212.003906 373.425781 207.644531 375.867188 205.347656 C 381.710938 199.847656 387.269531 194.046875 393.199219 188.628906 C 405.773438 177.132812 419.257812 166.550781 433.761719 157.566406 C 433.984375 158.402344 433.941406 159.339844 433.960938 160.203125 C 434.132812 167.171875 433.734375 174.292969 434.058594 181.214844 C 434.207031 184.421875 434.316406 191.0625 438.644531 191.449219 C 443.652344 191.894531 444.289062 186.300781 444.839844 182.640625 C 446.417969 172.183594 445.796875 161.265625 446.359375 150.710938 L 446.359375 138.648438 C 446.339844 138.660156 446.320312 138.667969 446.300781 138.679688 Z";
const SEVEN_PATH = "M 513.117188 107.121094 C 506.800781 108.761719 499.691406 111.894531 493.664062 114.488281 C 478.476562 121.023438 463.980469 128.941406 449.53125 136.902344 L 449.53125 148.75 C 457.597656 143.929688 466.085938 139.769531 474.621094 135.84375 C 485.035156 131.054688 495.644531 126.550781 506.546875 122.972656 L 506.402344 123.539062 C 497.457031 138.898438 486.792969 153.308594 478.386719 168.980469 C 475.789062 173.820312 469.585938 185.765625 470.898438 191.050781 C 471.691406 194.230469 474.542969 194.941406 477.246094 193.457031 C 478.953125 192.523438 481 189.175781 482.097656 187.480469 C 489.402344 176.230469 495.722656 164.292969 502.75 152.867188 C 508.164062 144.066406 514.054688 135.550781 519.492188 126.769531 C 521.246094 123.9375 526.777344 115.566406 526.894531 112.71875 C 527.214844 104.941406 518.214844 105.796875 513.117188 107.121094 Z";
// Lo que arranca escondido: la barra de la A y la de arriba del 7.
const HIDE_A = "399.6,170.5 432.6,141 433.8,159.5 393,190.5 385,214 371.3,214";
const HIDE_7 = "447,155 447,131 499,105 505,123.5";
// La curva del rebote: la línea que dibuja la pelota.
const ARC: [number, number][] = [[368, 206], [418, 164], [471, 130], [526, 110]];
const ARC_D = `M${ARC[0]} C${ARC[1]} ${ARC[2]} ${ARC[3]}`;
const bez = (t: number): [number, number] => {
  const m = 1 - t;
  const k = (i: 0 | 1) => m * m * m * ARC[0][i] + 3 * m * m * t * ARC[1][i] + 3 * m * t * t * ARC[2][i] + t * t * t * ARC[3][i];
  return [k(0), k(1)];
};
const ARC_LEN = (() => {
  let L = 0, p = bez(0);
  for (let i = 1; i <= 200; i++) { const q = bez(i / 200); L += Math.hypot(q[0] - p[0], q[1] - p[1]); p = q; }
  return L;
})();

// La cancha, vista desde atrás de la línea de fondo.
const HZ = 380, NY = 1700, HN = 760;
const P = (u: number, v: number) => { const z = 1 + 3 * v; return [540 + (u * HN) / z, HZ + (NY - HZ) / z, z]; };
const R = 26;
const FOOT = S(...ARC[0]);
const GB = FOOT[1] + R;
const ZB = (NY - HZ) / (GB - HZ);
const BOUNCE = { u: ((FOOT[0] - 540) * ZB) / HN, v: (ZB - 1) / 3 };
const START = { u: 0.8, v: 1.04 };

// El logo vertical oficial, ubicado para que su A caiga sobre la A animada:
// de ahí sale «A7 sports / Definí tu juego» sin redibujar nada.
const VERT = { x: 223.14, y: 262.73, w: 99.14, h: 113.61, ax: 226.004, ay: 265.716 };
const ISO_A = { x: 363.788, y: 94.85 };
const K = 82.706 / 47.308; // ancho de la A en el isotipo / en el logo vertical
const PIE_Y = 338; // desde acá, en el logo vertical, está todo lo que no es el isotipo

type Bola = { x: number; y: number; r: number; gx: number; gy: number; h: number; rot: number; op: number; arc?: number };

function flight(s: number): Omit<Bola, "rot" | "op"> {
  const u = lin(START.u, BOUNCE.u, s), v = lin(START.v, BOUNCE.v, s);
  const h = 0.25 * (1 - s) + 2.2 * s * (1 - s) * (1 - 0.35 * s);
  const [gx, gy, z] = P(u, v);
  const r = (R * ZB) / z;
  return { x: gx, y: gy - (h * (NY - HZ)) / z - r, r, gx, gy, h };
}

function ballAt(T: number): Bola | null {
  const t0 = C.Golpe + 0.3, tb = C.Trazo, ta = C.Trazo + 0.7, te = C.Trazo + 1.05;
  if (T < t0) return null;
  if (T <= tb) return { ...flight(prog(T, t0, tb)), rot: T * 900, op: prog(T, t0, t0 + 0.12) };
  if (T <= ta) {
    const p = prog(T, tb, ta, Easing.easeOutSine);
    const [x, y] = S(...bez(p));
    return { x, y, r: lin(R, R * 0.92, p), gx: x, gy: GB, h: p, rot: T * 700, op: 1, arc: p };
  }
  if (T <= te) {
    const p = prog(T, ta, te, Easing.easeInQuad);
    const [x0, y0] = S(...ARC[3]);
    return { x: x0 + p * 420, y: y0 - p * 170, r: lin(R * 0.92, R * 0.7, p), gx: 0, gy: GB, h: 1, rot: T * 700, op: 1 - p, arc: 1 };
  }
  return null;
}

function Pelota({ b, opacity = 1, squash = 0 }: { b: Bola; opacity?: number; squash?: number }) {
  const sx = 1 + 0.32 * squash, sy = 1 - 0.32 * squash, r = b.r;
  return (
    <g transform={`translate(${b.x},${b.y + r * 0.32 * squash}) scale(${sx},${sy})`} opacity={opacity * b.op}>
      <circle r={r} fill={LIMA} />
      <g transform={`rotate(${b.rot})`} fill="none" stroke={HUESO} strokeWidth={Math.max(1.5, r * 0.11)} strokeLinecap="round">
        <path d={`M${-r * 0.92},${-r * 0.38} Q0,${r * 0.42} ${r * 0.92},${-r * 0.38}`} />
      </g>
    </g>
  );
}

function Escena({ T, id }: { T: number; id: string }) {
  const b = ballAt(T);
  const logoIn = prog(T, 0, 0.45, Easing.easeOutCubic);
  const settle = prog(T, C.Logo + 0.05, C.Logo + 0.6, Easing.easeOutBack);
  const cam = T < C.Trazo
    ? lin(1.08, 1, prog(T, C.Golpe, C.Trazo, Easing.easeInOutCubic))
    : lin(1, 1.03, prog(T, C.Trazo, C.Cierre + 1.5, Easing.easeOutSine));
  const pulso = Math.sin(Math.PI * settle) * 0.035;
  const d = T - C.Trazo;
  const squash = Math.abs(d) < 0.07 ? 1 - Math.abs(d) / 0.07 : 0;
  const estela: ReactNode[] = [];
  if (b) for (let i = 1; i <= 4; i++) {
    const g = ballAt(T - i * 0.022);
    if (g) estela.push(<Pelota key={i} b={g} opacity={0.22 * (1 - i / 5)} />);
  }

  // El impacto en el pie de la A.
  const pi = prog(T, C.Trazo, C.Trazo + 0.5, Easing.easeOutCubic);
  // El trazo de la pelota que destapa la barra de la A y la del 7.
  const p = prog(T, C.Trazo, C.Trazo + 0.7, Easing.easeOutSine);
  const fin = p >= 1;
  // «A7 sports / Definí tu juego» entra de izquierda a derecha.
  const pw = prog(T, C.Trazo + 0.7, C.Logo + 0.45, Easing.easeInOutCubic);
  const corte = lin(320, 920, pw);

  const glifos = <><path d={A_PATH} fill={LIMA} fillRule="evenodd" /><path d={SEVEN_PATH} fill={HUESO} /></>;
  return (
    <g transform={`translate(${LP[0]},${LP[1]}) scale(${cam}) translate(${-LP[0]},${-LP[1]})`}>
      {pi > 0 && pi < 1 ? (
        <ellipse cx={FOOT[0]} cy={GB} rx={lin(16, 120, pi)} ry={lin(5, 30, pi)} fill="none" stroke={LIMA} strokeWidth={lin(6, 1, pi)} opacity={1 - pi} />
      ) : null}
      <g opacity={logoIn} transform={`translate(${LP[0]},${LP[1]}) scale(${1 + pulso}) translate(${-LP[0]},${-LP[1]})`}>
        <g transform={`translate(${LP[0]},${LP[1]}) scale(${LS}) translate(${-LC[0]},${-LC[1]})`}>
          <defs>
            <clipPath id={`${id}-hide`}><polygon points={HIDE_A} /><polygon points={HIDE_7} /></clipPath>
            <mask id={`${id}-base`} maskUnits="userSpaceOnUse" x="340" y="80" width="210" height="150">
              <rect x="340" y="80" width="210" height="150" fill="#fff" />
              <polygon points={HIDE_A} fill="#000" stroke="#000" strokeWidth="0.6" /><polygon points={HIDE_7} fill="#000" />
            </mask>
            <mask id={`${id}-rev`} maskUnits="userSpaceOnUse" x="340" y="80" width="210" height="150">
              <path d={ARC_D} fill="none" stroke="#fff" strokeWidth="30" strokeDasharray={`${ARC_LEN * p} ${ARC_LEN + 40}`} />
            </mask>
            <clipPath id={`${id}-pie`}>
              <rect x={VERT.x} y={PIE_Y} width={VERT.w} height={VERT.y + VERT.h - PIE_Y} />
            </clipPath>
          </defs>
          {fin ? glifos : <g mask={`url(#${id}-base)`}>{glifos}</g>}
          {p > 0 && !fin ? <g clipPath={`url(#${id}-hide)`}><g mask={`url(#${id}-rev)`}>{glifos}</g></g> : null}
        </g>
        {pw > 0 ? (
          <g transform={`translate(${(1 - pw) * -24},0)`} opacity={Math.min(1, pw * 2.5)}>
            <defs>
              <clipPath id={`${id}-barrido`}><polygon points={`0,0 ${corte + 40},0 ${corte - 40},${H} 0,${H}`} /></clipPath>
            </defs>
            <g clipPath={`url(#${id}-barrido)`}>
              <g transform={`translate(${LP[0]},${LP[1]}) scale(${LS}) translate(${-LC[0]},${-LC[1]}) translate(${ISO_A.x},${ISO_A.y}) scale(${K}) translate(${-VERT.ax},${-VERT.ay})`}>
                <image href="/logos/a7-logo-vertical-negativo.svg" x={VERT.x} y={VERT.y} width={VERT.w} height={VERT.h}
                  preserveAspectRatio="none" clipPath={`url(#${id}-pie)`} />
              </g>
            </g>
          </g>
        ) : null}
      </g>
      {estela}
      {b ? <Pelota b={b} squash={squash} /> : null}
    </g>
  );
}

/** Corre una vez, se funde y avisa. Tocarla la saltea. */
export function IntroA7({ alTerminar }: { alTerminar: () => void }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [T, setT] = useState(0);
  const [saliendo, setSaliendo] = useState(false);
  const cuadro = useRef(0);

  useEffect(() => {
    let inicio: number | null = null;
    const paso = (ahora: number) => {
      if (inicio === null) inicio = ahora;
      const t = (ahora - inicio) / 1000;
      setT(Math.min(t, TOTAL));
      if (t < TOTAL) cuadro.current = requestAnimationFrame(paso);
      else setSaliendo(true);
    };
    cuadro.current = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(cuadro.current);
  }, []);

  const aviso = useRef(alTerminar);
  useEffect(() => {
    aviso.current = alTerminar;
  });

  useEffect(() => {
    if (!saliendo) return;
    cancelAnimationFrame(cuadro.current);
    const t = setTimeout(() => aviso.current(), SALIDA * 1000);
    return () => clearTimeout(t);
  }, [saliendo]);

  return (
    <div
      aria-hidden="true"
      onPointerDown={() => setSaliendo(true)}
      className={`absolute inset-x-0 top-12 bottom-0 z-10 cursor-pointer bg-[#171717] transition-opacity duration-[350ms] ease-out ${saliendo ? "opacity-0" : ""}`}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="block h-full w-full">
        <Escena T={T} id={id} />
      </svg>
    </div>
  );
}
