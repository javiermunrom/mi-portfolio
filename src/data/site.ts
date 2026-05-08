import type {
  FooterContent,
  HomeContent,
  NavigationItem,
  SiteConfig,
} from "@types/site";

export const siteConfig: SiteConfig = {
  title: "NOMBRE",
  description: "ROL · DESCRIPCION",
  locale: "es-ES",
  url: "https://URL_PORTFOLIO",
};

export const navigationItems: NavigationItem[] = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "/projects", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export const homeContent: HomeContent = {
  hero: {
    eyebrow: "LANDING_EDITORIAL",
    name: "NOMBRE",
    role: "ROL",
    description: "DESCRIPCION",
    primaryAction: {
      href: "/projects",
      label: "VER_PROYECTOS",
    },
    secondaryAction: {
      href: "#contacto",
      label: "CONTACTAR",
    },
    visualLabel: "FOTO_PERFIL",
    socialLinks: [
      { href: "#", label: "LINKEDIN" },
      { href: "#", label: "GITHUB" },
      { href: "#", label: "EMAIL" },
    ],
  },
  about: {
    eyebrow: "PERFIL_EDITORIAL",
    title: "SOBRE_MI",
    description: "BIOGRAFIA_PLACEHOLDER",
    visualLabel: "IMAGEN_EDITORIAL_BN",
    bioTitle: "PERFIL",
    bio: "DESCRIPCION_BIOGRAFICA_CORTA",
    detailsTitle: "DATOS",
    details: [
      { label: "BASE", value: "CIUDAD_PAIS" },
      { label: "DISPONIBILIDAD", value: "DISPONIBLE_PARA_PROYECTOS" },
      { label: "ENFOQUE", value: "SOFTWARE_IA_PRODUCTO" },
    ],
    technologiesTitle: "TECNOLOGIAS",
    technologies: ["TECNOLOGIA_01", "TECNOLOGIA_02", "TECNOLOGIA_03"],
    experienceTitle: "EXPERIENCIA_Y_ESTUDIOS",
    experience: ["EXPERIENCIA_01", "ESTUDIOS_01", "LOGRO_01"],
  },
  stackEyebrow: "STACK_Y_HABILIDADES",
  stackTitle: "TECNOLOGIAS_Y_CAPACIDADES",
  stackDescription: "CATEGORIAS_VISUALES_LIMPIAS_PARA_MOSTRAR_EL_PERFIL_TECNOLOGICO",
  stackCategories: [
    {
      title: "FRONTEND",
      items: ["FRONTEND_01", "FRONTEND_02", "FRONTEND_03"],
    },
    {
      title: "BACKEND",
      items: ["BACKEND_01", "BACKEND_02", "BACKEND_03"],
    },
    {
      title: "IA_DATA",
      items: ["IA_DATA_01", "IA_DATA_02", "IA_DATA_03"],
    },
    {
      title: "HERRAMIENTAS",
      items: ["HERRAMIENTA_01", "HERRAMIENTA_02", "HERRAMIENTA_03"],
    },
  ],
  contact: {
    eyebrow: "CONTACTO",
    title: "PONTE_EN_CONTACTO",
    description: "EMAIL_Y_ENLACES_PROFESIONALES_PARA_CONTACTO_DIRECTO",
    links: [
      {
        label: "EMAIL",
        value: "EMAIL",
        href: "#",
      },
      {
        label: "LINKEDIN",
        value: "LINKEDIN",
        href: "#",
      },
      {
        label: "GITHUB",
        value: "GITHUB",
        href: "#",
      },
    ],
    mapLabel: "MAPA_PLACEHOLDER",
    formTitle: "FORMULARIO_CONTACTO",
    fields: {
      name: "NOMBRE",
      email: "EMAIL",
      message: "MENSAJE",
      submit: "ENVIAR_MENSAJE",
    },
  },
};

export const footerContent: FooterContent = {
  copyright: "COPYRIGHT_PLACEHOLDER",
  note: "BASE_EDITORIAL_LISTA_PARA_RELLENAR",
  links: [
    { href: "#", label: "ENLACE_01" },
    { href: "#", label: "ENLACE_02" },
    { href: "#", label: "ENLACE_03" },
  ],
};
