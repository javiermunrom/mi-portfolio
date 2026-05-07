import type { NavigationItem, SiteConfig } from "@types/site";

export const siteConfig: SiteConfig = {
  title: "Mi Portfolio",
  description:
    "Portfolio profesional creado con Astro y preparado para escalar.",
  locale: "es-ES",
  url: "https://example.com",
};

export const navigationItems: NavigationItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Proyectos" },
];
