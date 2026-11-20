import type { Textos } from "./es";

const TEMA = { claro: "light", oscuro: "dark" } as const;

/*
 * Todos los textos del sitio en inglés (#22), con la misma forma que es.ts.
 * Los nombres de botones de las apps quedan en español entre comillas
 * («Ya pagué»): las apps son en español y así se ven en las grabaciones.
 */
export const en: Textos = {
  meta: {
    titulo: "Juan Amelio · Software developer in Mendoza",
    descripcion: "I build apps for real businesses and keep them running in production.",
    puesto: "Software developer",
    locale: "en_US",
    imagenAlt: "Juan Amelio, software developer in Mendoza, Argentina, with Global Fit, A7 Sports and Forge Studio",
  },
  barra: {
    secciones: "Sections",
    sobreMi: "About me",
    proyectos: "Projects",
    contacto: "Contact",
    pasarATema: (tema) => `Switch to ${TEMA[tema]} mode`,
    tema: (tema) => `${TEMA[tema] === "light" ? "Light" : "Dark"} mode`,
    idioma: "Language",
  },
  portada: {
    titulo: "Apps that work for you.",
    bajada: "I'm Juan Amelio. I design them, build them and keep them running in production. Today they're part of someone's everyday work.",
    bajar: "Scroll down and see them from the inside",
    carrusel: "carousel",
    misProyectos: "My projects",
    traer: (nombre) => `Bring ${nombre} to the front`,
    mostrar: (nombre) => `Show ${nombre}`,
    logo: (nombre) => `${nombre} logo`,
    verProyecto: "See project",
    pantallas: [
      "Global Fit: a member books a class",
      "A7 Sports: a sale at the register",
      "Forge Studio: a team member's home screen",
    ],
  },
  sobreMi: {
    titulo: "About me",
    parrafos: [
      "I'm Juan Bautista Amelio, a software developer in Mendoza, Argentina. Since 2023 I've been on the Solutions team at Slingr, building custom applications for US companies. I meet with clients every week, in English, to demo progress, refine requirements and plan what comes next. Today I'm a team leader: I lead a small team, with one developer and one QA, on a project for a US client.",
      "There I built an ERP end to end for an industrial company: inventory, purchasing, production, sales and shipping, integration with their online store, and reporting. I've also built AI agents that automate processes in regulated industries: checking documents against regulations, answering technical support questions and extracting data from documents.",
      "In 2026 I started building my own products. There are three today, and people use all three every day.",
    ],
    datos: [
      ["Based in", "Guaymallén, Mendoza, Argentina"],
      ["Since 2023", "Slingr, Solutions team; now team leader"],
      ["Languages", "Native Spanish; professional English, every day with clients"],
      ["Education", "Full Stack Program (Java), Egg, 2022"],
      ["Applied AI", "Gemini agents at Slingr; Claude Code in my products"],
    ],
  },
  recorrido: {
    proyectos: "Projects",
    otraPestana: " (opens in a new tab)",
    queHace: (nombre) => `What ${nombre} does`,
    datosDeDemo: "Demo data",
    anterior: "Previous",
    siguiente: "Next",
    dispositivo: { celular: "Phone", escritorio: "Desktop" },
    solo: (dispositivo) => `${dispositivo} only`,
    desdeDonde: "Where it's used",
  },
  casos: {
    "global-fit": {
      corto: "The app for a gym in Mendoza",
      titular: "From the notebook to the phone.",
      bajada:
        "The app for a gym in Mendoza. Members book classes from their phones, coaches take attendance in class, and the owner manages members, payments and schedules from a dashboard.",
      numeros: ["active members", "classes per week"],
      funciones: {
        celular: [
          {
            titulo: "Their week at a glance",
            texto: "Their next class, how many days they've used this week and whether their fee is due.",
            etiqueta: "Global Fit: a member's home screen, recorded with demo data",
          },
          {
            titulo: "Book a class",
            texto: "Members pick the day and the class, and see how many spots are left. Capacity holds even if two people book in the same second.",
            etiqueta: "Global Fit: the member picks Thursday and books the 7 p.m. class, recorded with demo data",
          },
          {
            titulo: "Take attendance",
            texto: "Coaches see only their own students, check them in during class, and know before starting who reported pain.",
            etiqueta: "Global Fit: the coach opens their class, checks the profile of the student who reported pain and confirms attendance, recorded with demo data",
          },
          {
            titulo: "Log a workout",
            texto: "Members note what they worked on and see their streak. It's a personal journal: neither the coach nor the owner can see it.",
            etiqueta: "Global Fit: the member marks the areas she worked on and leaves a note, recorded with demo data",
          },
          {
            titulo: "Report a payment",
            texto: "Members make the transfer, tap «Ya pagué» (I've paid) and the owner confirms it in one tap. They know who's up to date without chasing messages.",
            etiqueta: "Global Fit: the member reports she paid her fee and waits for confirmation, recorded with demo data",
          },
        ],
        escritorio: [
          {
            titulo: "What needs attention today",
            texto: "When the owner logs in, they see what's waiting on them: members to approve, payments to confirm and classes without attendance. They handle it right there.",
            etiqueta: "Global Fit: the owner confirms the four pending payments from the dashboard home, recorded with demo data",
          },
          {
            titulo: "Members",
            texto: "Who's up to date, who owes and who asked to join. Approvals and confirmations happen from the same list.",
            etiqueta: "Global Fit: the owner filters members, confirms a payment and approves a new member, recorded with demo data",
          },
          {
            titulo: "Set up the week",
            texto: "The schedule and capacity template is built once; each week is generated with one click and members can start booking.",
            etiqueta: "Global Fit: from the schedule template to the calendar, with next week generated in one click, recorded with demo data",
          },
          {
            titulo: "Metrics",
            texto: "Attendance, how full each time slot is and how plans are split, without opening a spreadsheet.",
            etiqueta: "Global Fit: the owner's metrics dashboard, recorded with demo data",
          },
        ],
      },
    },
    "a7-sports": {
      corto: "Sales, stock and checkout for a padel shop",
      titular: "From the spreadsheet to the register.",
      bajada:
        "Sales, stock, checkout and a public storefront for a family padel business. Five people use it from their phones, in the shop and at events.",
      enlace: "Visit the store",
      numeros: ["sales", "events in the last year"],
      funciones: {
        celular: [
          {
            titulo: "Sell at the register",
            texto: "From a phone, in the shop or at an event: items go in, the discount is picked and the total adds itself up.",
            etiqueta: "A7 Sports: a black T-shirt in size M and a can of balls, the T-shirt with a 10% discount, paid in cash, recorded with demo data",
          },
        ],
        escritorio: [
          {
            titulo: "Manage stock",
            texto: "Every sale is deducted on the spot. Whatever is running low gets flagged before it runs out.",
            etiqueta: "A7 Sports: stock sorted by what's running lowest, and a T-shirt's page with what's left in each size, recorded with demo data",
          },
          {
            titulo: "Load purchases",
            texto: "Claude reads the supplier's PDF and returns a file; the app checks it before loading it and recalculates the cost.",
            etiqueta: "A7 Sports: an invoice file is imported, the app shows the stock and costs that change, and it's loaded, recorded with demo data",
          },
          {
            titulo: "The customer store",
            texto: "A public storefront that filters by category and size, and ends in an inquiry over WhatsApp.",
            etiqueta: "A7 Sports: women's T-shirts in size M in the store, and a T-shirt's page with its color and the WhatsApp inquiry, recorded with demo data",
          },
          {
            titulo: "See the numbers",
            texto: "What was sold this month, week by week, and how much each event brought in, without opening a spreadsheet.",
            etiqueta: "A7 Sports: the summary, this month's sales by week and what each event brought in, recorded with demo data",
          },
        ],
      },
    },
    "forge-studio": {
      corto: "The board where my team works",
      titular: "From Trello to a board with human review.",
      bajada:
        "The board where my team works, with an agent that runs on each developer's machine and a plugin for working with AI without losing control.",
      numeros: ["projects", "tasks on the board", "in production"],
      funciones: {
        celular: [],
        escritorio: [
          {
            titulo: "What's waiting for you today",
            texto: "When you log in, the Home screen shows which cards are waiting for your review, what you have in progress and whether your agent is reporting.",
            etiqueta: "Forge Studio: a team member's home screen, with their pending reviews, their tasks and the calendar, recorded with demo data",
          },
          {
            titulo: "The board",
            texto: "Six columns, from Backlog to In production. Cards move along with the work, and magenta marks what's waiting on a person.",
            etiqueta: "Forge Studio: a project's board walked through from Backlog to In production, recorded with demo data",
          },
          {
            titulo: "The review",
            texto: "Lint, types, tests and build before delivery, and a person's approval before anything reaches production.",
            etiqueta: "Forge Studio: a card in review with the lint, types, tests and build results, and the person who approves it, recorded with demo data",
          },
          {
            titulo: "The calendar",
            texto: "Every project's releases and dates in one month, each in its own color.",
            etiqueta: "Forge Studio: the month's calendar with each project's dates in its own color, recorded with demo data",
          },
        ],
      },
    },
  },
  proceso: {
    titulo: "Process",
    bajada: "From the first message to the app up and running, and beyond. On the other side, it's always the same person.",
    paso: (n) => `Step ${n}`,
    pasos: [
      { titulo: "Contact", texto: "You reach out however suits you and tell me what you have in mind." },
      { titulo: "Discovery", texto: "We meet, you tell me your idea and I look at how things work today: what's missing, what's extra and what hurts." },
      { titulo: "Tailored solution", texto: "From what I've learned, I put together the solution for your case: what gets built, how and in what order." },
      { titulo: "Quote", texto: "Price and timeline in writing, along with what the product won't do and the risks I know of. No surprises." },
      { titulo: "Rollout and follow-up", texto: "I launch it with your team and stay close afterwards: adjustments, improvements and support." },
    ],
    cierre:
      "I work with AI every day, with guardrails: it can't write to the main branch or skip review. The speed comes from the tool; the responsibility is still mine.",
  },
  contacto: {
    disponible: "Available",
    hora: ["It's ", " in Mendoza"],
    titulo: "Let's talk.",
    texto: "If you have an idea you'd like to see up and running, or something I've built caught your interest, reach out wherever suits you best.",
    pie: "Built by me, with the same method as my projects.",
  },
  redes: {
    redes: "Links",
    whatsapp: "Message me on WhatsApp",
    mensajeWhatsapp: "Hi Juan, I saw your website and wanted to ask about",
  },
  noEncontrada: {
    titulo: "This page doesn't exist.",
    volver: "Back to home",
  },
};
