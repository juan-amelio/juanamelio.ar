/* Los íconos de cada cosa que hace una app, en el selector de cada proyecto (#29, #32).
   Trazo fino, currentColor: toman el color del tema del caso. */
const TRAZOS = {
  reservar: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M8 3v4M16 3v4M9 15l2 2 4-4",
  semana: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  asistencia: "M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",
  entreno: "M6 7v10M18 7v10M3 9v6M21 9v6M6 12h12",
  pagos: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 10h20M6 15h4",
  caja: "M4 9h16l-1.5 11h-13zM8 9V6a4 4 0 0 1 8 0v3",
  stock: "M3 8l9-5 9 5-9 5zM3 8v8l9 5 9-5V8M12 13v8",
  compras: "M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v5h5M9 13h6M9 17h6",
  tienda: "M4 10v10h16V10M3 6l2-3h14l2 3v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0zM10 20v-5h4v5",
  numeros: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  inicio: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  tablero: "M4 4h4v16H4zM10 4h4v10h-4zM16 4h4v7h-4z",
  revision: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5M8 11l2 2 4-4",
  socios: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  calendario: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M8 3v4M16 3v4M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2",
} as const;

export type IconoFuncion = keyof typeof TRAZOS;

export function Icono({ nombre, className }: { nombre: IconoFuncion; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={TRAZOS[nombre]} />
    </svg>
  );
}

/** Celular o escritorio: qué pantalla se va a ver. */
export function IconoDispositivo({ escritorio, className }: { escritorio: boolean; className?: string }) {
  return escritorio ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M11 18.5h2" />
    </svg>
  );
}
