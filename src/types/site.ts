export interface NavigationItem {
  href: string;
  label: string;
}

export interface ActionLink {
  href: string;
  label: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  locale: string;
  url: string;
}

export interface HeroContent {
  eyebrow: string;
  name: string;
  role: string;
  description: string;
  primaryAction: ActionLink;
  secondaryAction: ActionLink;
  visualLabel: string;
  socialLinks: ActionLink[];
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  description: string;
  visualLabel: string;
  bioTitle: string;
  bio: string;
  detailsTitle: string;
  details: Array<{ label: string; value: string }>;
  technologiesTitle: string;
  technologies: string[];
  experienceTitle: string;
  experience: string[];
}

export interface StackCategory {
  title: string;
  items: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  links: ContactLink[];
  mapLabel: string;
  formTitle: string;
  fields: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
}

export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterContent {
  copyright: string;
  note: string;
  links: FooterLink[];
}

export interface HomeContent {
  hero: HeroContent;
  about: AboutContent;
  stackEyebrow: string;
  stackTitle: string;
  stackDescription: string;
  stackCategories: StackCategory[];
  contact: ContactContent;
}
