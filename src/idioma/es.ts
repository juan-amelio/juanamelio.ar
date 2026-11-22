import type { Dispositivo, Slug } from "@/components/casos/casos";

/** Lo que dice cada función de un proyecto: el nombre, qué logra y la
    descripción de la grabación para los lectores de pantalla. */
export type TextoFuncion = { titulo: string; texto: string; etiqueta: string };

export type TextosCaso = {
  /** Una línea: qué es, para la tarjeta de la portada. */
  corto: string;
  titular: string;
  bajada: string;
  /** El texto del enlace a lo real, si el caso tiene uno (casos.tsx). */
  enlace?: string;
  /** Las etiquetas de los números, en el orden de casos.tsx. */
  numeros: string[];
  /** Las funciones, en el orden de las grabaciones de casos.tsx. */
  funciones: Record<Dispositivo, TextoFuncion[]>;
};

/*
 * Todos los textos del sitio en español (#22). La versión en inglés (en.ts)
 * tiene la misma forma: si acá se suma un texto, TypeScript pide el otro.
 */
export const es = {
  meta: {
    titulo: "Juan Amelio · Desarrollador de software en Mendoza",
    descripcion: "Hago apps para negocios reales y las sostengo en producción.",
    puesto: "Desarrollador de software",
    locale: "es_AR",
    imagenAlt: "Juan Amelio, desarrollador de software en Mendoza, con Global Fit, A7 Sports y Forge Studio",
  },
  barra: {
    secciones: "Secciones",
    menu: "Menú",
    sobreMi: "Sobre mí",
    proyectos: "Proyectos",
    contacto: "Contacto",
    pasarATema: (tema: "claro" | "oscuro") => `Pasar a modo ${tema}`,
    tema: (tema: "claro" | "oscuro") => `Modo ${tema}`,
    idioma: "Idioma",
  },
  portada: {
    titulo: "Apps que trabajan para vos.",
    bajada: "Soy Juan Amelio. Las diseño, las construyo y las sostengo en producción. Hoy son parte del día a día de alguien.",
    bajar: "Bajá y miralas por dentro",
    carrusel: "carrusel",
    misProyectos: "Mis proyectos",
    traer: (nombre: string) => `Traer ${nombre} adelante`,
    mostrar: (nombre: string) => `Mostrar ${nombre}`,
    logo: (nombre: string) => `Logo de ${nombre}`,
    verProyecto: "Ver proyecto",
    pantallas: [
      "Global Fit: una socia reserva una clase",
      "A7 Sports: una venta en la caja",
      "Forge Studio: el inicio de una persona del equipo",
    ],
  },
  sobreMi: {
    titulo: "Sobre mí",
    parrafos: [
      "Soy Juan Bautista Amelio, desarrollador de software en Mendoza. Desde 2023 trabajo en el equipo de Soluciones de Slingr, haciendo aplicaciones a medida para empresas de Estados Unidos. Me reúno cada semana con los clientes, en inglés, para mostrar avances, ajustar requisitos y planear lo que sigue. Hoy soy team leader: lidero un equipo chico, con un desarrollador y una QA, en un proyecto para uno de esos clientes.",
      "Ahí hice de punta a punta un ERP para una empresa industrial: inventario, compras, producción, ventas y envíos, integración con su tienda online y reportes. También construí agentes de IA que automatizan procesos en industrias reguladas: revisar documentos contra una normativa, responder consultas de soporte técnico y extraer datos de documentos.",
      "En 2026 empecé a construir mis propios productos. Hoy son tres, y los tres los usan personas todos los días.",
    ],
    /* Todo sale del CV de Juan: nada de acá se inventó, y lo que cambie de su
       carrera se cambia acá y en en.ts. */
    datos: [
      ["Base", "Guaymallén, Mendoza, Argentina"],
      ["Desde 2023", "Slingr, equipo de Soluciones; hoy team leader"],
      ["Idiomas", "Español nativo; inglés profesional, todos los días con clientes"],
      ["Formación", "Programa Full Stack (Java), Egg, 2022"],
      ["IA aplicada", "Agentes con Gemini en Slingr; Claude Code en mis productos"],
    ] as [string, string][],
  },
  recorrido: {
    proyectos: "Proyectos",
    otraPestana: " (se abre en otra pestaña)",
    queHace: (nombre: string) => `Qué hace ${nombre}`,
    datosDeDemo: "Datos de demo",
    anterior: "Anterior",
    siguiente: "Siguiente",
    dispositivo: { celular: "Celular", escritorio: "Escritorio" } as Record<Dispositivo, string>,
    solo: (dispositivo: string) => `Solo en ${dispositivo.toLowerCase()}`,
    desdeDonde: "Desde dónde se usa",
  },
  casos: {
    "global-fit": {
      corto: "La app de un gimnasio de Mendoza",
      titular: "Del cuaderno al celular.",
      bajada:
        "La app de un gimnasio de Mendoza. Los socios reservan desde el celular, los profesores toman asistencia en la clase y el dueño maneja socios, pagos y horarios desde un panel.",
      numeros: ["socios activos", "clases por semana"],
      funciones: {
        celular: [
          {
            titulo: "Su semana, de un vistazo",
            texto: "La próxima clase, cuántos días lleva usados en la semana y si tiene la cuota pendiente.",
            etiqueta: "Global Fit: el inicio de una socia, grabado con datos de demo",
          },
          {
            titulo: "Reservar una clase",
            texto: "El socio elige el día y la clase, y ve cuántos lugares quedan. El cupo se respeta aunque dos reserven en el mismo segundo.",
            etiqueta: "Global Fit: la socia elige el jueves y reserva la clase de las 19, grabado con datos de demo",
          },
          {
            titulo: "Tomar asistencia",
            texto: "El profesor ve solo a sus alumnos, los marca en la clase, y sabe antes de empezar quién reportó dolor.",
            etiqueta: "Global Fit: el profesor abre su clase, mira la ficha del alumno que avisó dolor y confirma la asistencia, grabado con datos de demo",
          },
          {
            titulo: "Cargar el entrenamiento",
            texto: "El socio anota qué trabajó y ve su racha. Es un diario personal: no lo ven ni el profe ni el dueño.",
            etiqueta: "Global Fit: la socia marca las zonas que trabajó y deja una nota, grabado con datos de demo",
          },
          {
            titulo: "Avisar el pago",
            texto: "El socio transfiere, toca «Ya pagué» y el dueño lo confirma de un toque: sabe quién está al día sin cruzar mensajes.",
            etiqueta: "Global Fit: la socia avisa que pagó la cuota y queda en espera de la confirmación, grabado con datos de demo",
          },
        ],
        escritorio: [
          {
            titulo: "Lo que pide atención hoy",
            texto: "Al entrar, el dueño ve qué espera de él: socios para dar de alta, pagos para confirmar y clases sin asistencia. Lo resuelve ahí mismo.",
            etiqueta: "Global Fit: el dueño confirma los cuatro pagos pendientes desde el inicio del panel, grabado con datos de demo",
          },
          {
            titulo: "Los socios",
            texto: "Quién está al día, quién debe y quién pidió entrar. Se aprueba y se confirma desde la misma lista.",
            etiqueta: "Global Fit: el dueño filtra los socios, confirma un pago y aprueba a una socia nueva, grabado con datos de demo",
          },
          {
            titulo: "Armar la semana",
            texto: "La plantilla de horarios y cupos se arma una vez; cada semana se genera con un botón y los socios ya pueden reservar.",
            etiqueta: "Global Fit: de la plantilla de horarios al calendario, y la semana siguiente generada con un botón, grabado con datos de demo",
          },
          {
            titulo: "Las métricas",
            texto: "Asistencias, ocupación de cada horario y cómo se reparten los planes, sin abrir una planilla.",
            etiqueta: "Global Fit: el tablero de métricas del dueño, grabado con datos de demo",
          },
        ],
      },
    },
    "a7-sports": {
      corto: "Ventas, stock y caja de una tienda de pádel",
      titular: "De la planilla a la caja.",
      bajada:
        "Ventas, stock, caja y una tienda pública para un emprendimiento familiar de pádel. La usan cinco personas desde el celular, en el local y en los eventos.",
      enlace: "Ver la tienda",
      numeros: ["ventas", "eventos en el último año"],
      funciones: {
        celular: [
          {
            titulo: "Vender en la caja",
            texto: "Desde el celular, en el local o en un evento: las líneas entran, el descuento se elige y el total se cuenta solo.",
            etiqueta: "A7 Sports: una remera en talle M negra y un tubo de pelotas, la remera con 10 % de descuento, cobrado en efectivo, grabado con datos de demo",
          },
        ],
        escritorio: [
          {
            titulo: "Manejar el stock",
            texto: "Cada venta descuenta al momento. Lo que se está por terminar se marca antes de que falte.",
            etiqueta: "A7 Sports: el stock ordenado por lo que menos queda, y la ficha de una remera con lo que hay de cada talle, grabado con datos de demo",
          },
          {
            titulo: "Cargar las compras",
            texto: "Claude lee el PDF del proveedor y devuelve un archivo; la app lo revisa antes de cargarlo y recalcula el costo.",
            etiqueta: "A7 Sports: se importa el archivo de una factura, la app muestra el stock y los costos que cambian, y se carga, grabado con datos de demo",
          },
          {
            titulo: "La tienda para los clientes",
            texto: "Una vidriera pública que se filtra por categoría y talle, y termina en una consulta por WhatsApp.",
            etiqueta: "A7 Sports: en la tienda, remeras de mujer en talle M, y la ficha de una remera con su color y la consulta por WhatsApp, grabado con datos de demo",
          },
          {
            titulo: "Ver los números",
            texto: "Lo que se vendió en el mes, semana por semana, y cuánto dejó cada evento, sin abrir una planilla.",
            etiqueta: "A7 Sports: el resumen, las ventas del mes por semana y lo que dejó cada evento, grabado con datos de demo",
          },
        ],
      },
    },
    "forge-studio": {
      corto: "El tablero donde trabaja mi equipo",
      titular: "De Trello a un tablero con revisión humana.",
      bajada:
        "El tablero donde trabaja mi equipo, con un agente que corre en la máquina de cada desarrollador y un plugin para trabajar con IA sin perder el control.",
      numeros: ["proyectos", "tareas en el tablero", "en producción"],
      funciones: {
        celular: [],
        escritorio: [
          {
            titulo: "Lo que te espera hoy",
            texto: "Al entrar, el Inicio dice qué tarjetas esperan tu revisión, qué tenés en curso y si tu agente está reportando.",
            etiqueta: "Forge Studio: el inicio de una persona del equipo, con sus revisiones pendientes, sus tareas y la agenda, grabado con datos de demo",
          },
          {
            titulo: "El tablero",
            texto: "Seis columnas, de Backlog a En producción. Las tarjetas avanzan con el trabajo y el magenta marca lo que espera a una persona.",
            etiqueta: "Forge Studio: el tablero de un proyecto recorrido de Backlog a En producción, grabado con datos de demo",
          },
          {
            titulo: "La revisión",
            texto: "Lint, tipos, pruebas y build antes de entregar, y la aprobación de una persona antes de llegar a producción.",
            etiqueta: "Forge Studio: una tarjeta en revisión con el resultado de lint, tipos, pruebas y build, y la persona que la aprueba, grabado con datos de demo",
          },
          {
            titulo: "El calendario",
            texto: "Las salidas y las fechas de todos los proyectos en un mes, cada uno con su color.",
            etiqueta: "Forge Studio: el calendario del mes con las fechas de cada proyecto en su color, grabado con datos de demo",
          },
        ],
      },
    },
  } as Record<Slug, TextosCaso>,
  proceso: {
    titulo: "Proceso",
    bajada: "Del primer mensaje a la app funcionando, y después también. Del otro lado está siempre la misma persona.",
    paso: (n: number) => `Paso ${n}`,
    pasos: [
      { titulo: "Contacto", texto: "Me escribís por donde te quede cómodo y me contás qué tenés en mente." },
      { titulo: "Relevamiento", texto: "Nos reunimos, me contás tu idea y veo cómo se trabaja hoy: qué falta, qué sobra y qué duele." },
      { titulo: "Solución a medida", texto: "Con lo relevado armo la solución para tu caso: qué se construye, cómo y en qué orden." },
      { titulo: "Cotización", texto: "Precio y plazos por escrito, junto con lo que el producto no hace y los riesgos que conozco. Sin sorpresas." },
      { titulo: "Implementación y seguimiento", texto: "Lo pongo en marcha con tu equipo y sigo cerca después: ajustes, mejoras y soporte." },
    ],
    cierre:
      "Trabajo con IA todos los días, con candados: no puede escribir en la rama principal ni saltarse la revisión. La velocidad es de la herramienta; la responsabilidad sigue siendo mía.",
  },
  contacto: {
    disponible: "Disponible",
    /** Lo que va antes y después de la hora: «En Mendoza son las 21:02». */
    hora: ["En Mendoza son las ", ""] as [string, string],
    titulo: "Hablemos.",
    texto: "Si tenés una idea que querés ver funcionando, o te interesa algo de lo que hice, escribime por donde te quede más cómodo.",
    pie: "Hecho por mí, con el mismo método que mis proyectos.",
  },
  redes: {
    redes: "Redes",
    whatsapp: "Escribime por WhatsApp",
    /** El mensaje que llega escrito al abrir WhatsApp desde el sitio. */
    mensajeWhatsapp: "Hola Juan, vi tu sitio y te quería consultar por",
  },
  noEncontrada: {
    titulo: "Esta página no existe.",
    volver: "Volver al inicio",
  },
};

export type Textos = typeof es;
