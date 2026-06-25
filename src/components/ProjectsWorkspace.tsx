import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

type Locale = "en" | "es";

type Project = {
  id: string;
  file: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  images?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  workflow?: string[];
  results?: string[];
  features: string[];
  challenges: string[];
  learnings: string[];
  links: {
    demo: string;
    github: string;
  };
};

type Props = {
  defaultLocale: Locale;
  projects: Record<Locale, Project[]>;
  assetBase: string;
};

const labels = {
  en: {
    workspace: "mi-portfolio",
    explorer: "Explorer",
    folder: "PROJECTS",
    preview: "Preview",
    overview: "Overview",
    technologies: "Technologies",
    features: "Key features",
    challenges: "Challenges",
    learnings: "Learnings",
    demo: "View demo",
    openVisualization: "Open Visualization",
    github: "GitHub",
    thesis: "Thesis PDF",
    unavailable: "Coming soon",
    select: "Select project",
    status: "Markdown Preview",
    welcome: "Welcome",
    welcomeTitle: "Explore the projects you want",
    welcomeText:
      "Open any Markdown file from the workspace to preview the technical documentation for each project.",
    featured: "Featured",
    openFeatured: "Open Bachelor's Thesis",
  },
  es: {
    workspace: "mi-portfolio",
    explorer: "Explorador",
    folder: "PROYECTOS",
    preview: "Previsualización",
    overview: "Resumen",
    technologies: "Tecnologías",
    features: "Características principales",
    challenges: "Dificultades encontradas",
    learnings: "Aprendizajes",
    demo: "Ver demo",
    openVisualization: "Abrir visualización",
    github: "GitHub",
    thesis: "Memoria PDF",
    unavailable: "Próximamente",
    select: "Seleccionar proyecto",
    status: "Markdown Preview",
    welcome: "Bienvenida",
    welcomeTitle: "Explora los proyectos que quieras",
    welcomeText:
      "Abre cualquier archivo Markdown del workspace para previsualizar la documentación técnica de cada proyecto.",
    featured: "Destacado",
    openFeatured: "Abrir TFG",
  },
} satisfies Record<Locale, Record<string, string>>;

const menuItems = [
  "File",
  "Edit",
  "Selection",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
];
const iconItems = ["files", "search"];

const terminalFont = {
  fontFamily:
    '"JetBrains Mono", "SFMono-Regular", "Cascadia Code", "Roboto Mono", Menlo, monospace',
};

const uiFont = {
  fontFamily:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const technologyIcons: Record<string, string> = {
  Astro:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "D3.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Pandas:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  NumPy:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  OpenCV:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "Scikit-learn":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
  Matplotlib:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "GitHub Pages":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "GitHub Actions":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
};

function TechBadge({ technology }: { technology: string }) {
  const icon = technologyIcons[technology];
  const fallback = technology
    .split(/[\s.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-semibold text-slate-300">
      {icon ? (
        <img
          className="h-4 w-4 object-contain"
          src={icon}
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      ) : (
        <span
          className="flex h-4 w-4 items-center justify-center rounded bg-white/10 text-[0.55rem] text-slate-400"
          aria-hidden="true"
        >
          {fallback}
        </span>
      )}
      {technology}
    </span>
  );
}

function TechBadges({ technologies }: { technologies: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <TechBadge key={technology} technology={technology} />
      ))}
    </div>
  );
}

function IconMark({ name }: { name: string }) {
  if (name === "files") {
    return (
      <span className="relative block h-5 w-4 rounded-[3px] border border-current before:absolute before:-right-1 before:top-1 before:h-5 before:w-4 before:rounded-[3px] before:border before:border-current" />
    );
  }

  if (name === "search") {
    return (
      <span className="relative block h-5 w-5 rounded-full border border-current after:absolute after:-bottom-1 after:-right-1 after:h-2 after:w-px after:rotate-[-45deg] after:bg-current" />
    );
  }

  if (name === "branch") {
    return (
      <span className="relative block h-5 w-3 border-l border-current before:absolute before:left-[-0.25rem] before:top-0 before:h-2 before:w-2 before:rounded-full before:border before:border-current after:absolute after:left-[-0.25rem] after:bottom-0 after:h-2 after:w-2 after:rounded-full after:border after:border-current" />
    );
  }

  if (name === "run") {
    return (
      <span className="ml-0.5 block h-0 w-0 border-y-[0.45rem] border-l-[0.75rem] border-y-transparent border-l-current" />
    );
  }

  return (
    <span className="grid h-5 w-5 grid-cols-2 gap-1">
      <span className="border border-current" />
      <span className="border border-current" />
      <span className="border border-current" />
      <span className="border border-current" />
    </span>
  );
}

function ProjectMockup({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#fb7185]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#86efac]" />
        </div>
        <span className="text-xs text-slate-500" style={terminalFont}>
          {project.id}.preview
        </span>
      </div>
      <div className="grid min-h-[13rem] gap-4 p-4 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-xl border border-white/8 bg-[#111827]/70 p-4">
          <div className="mb-4 h-3 w-28 rounded-full bg-white/14" />
          <div className="space-y-2">
            <div className="h-2.5 w-full rounded-full bg-white/8" />
            <div className="h-2.5 w-10/12 rounded-full bg-white/8" />
            <div className="h-2.5 w-7/12 rounded-full bg-white/8" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-xl border border-[#60a5fa]/16 bg-[#60a5fa]/8" />
            <div className="h-16 rounded-xl border border-[#86efac]/16 bg-[#86efac]/8" />
            <div className="h-16 rounded-xl border border-[#c084fc]/16 bg-[#c084fc]/8" />
          </div>
        </div>
        <div className="rounded-xl border border-white/8 bg-[#0d1117] p-4">
          <div className="mb-3 flex items-end gap-2">
            <div className="h-16 flex-1 rounded-t-lg bg-white/10" />
            <div className="h-24 flex-1 rounded-t-lg bg-[#60a5fa]/20" />
            <div className="h-12 flex-1 rounded-t-lg bg-white/10" />
            <div className="h-20 flex-1 rounded-t-lg bg-[#86efac]/18" />
          </div>
          <div className="h-px bg-white/10" />
          <div className="mt-4 space-y-2">
            <div className="h-2 w-11/12 rounded-full bg-white/8" />
            <div className="h-2 w-8/12 rounded-full bg-white/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-t border-white/10 pt-7">
      <h3
        className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
        style={terminalFont}
      >
        {title}
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function ActionIcon({ type }: { type: "pdf" | "github" | "external" }) {
  if (type === "github") {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.8c-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.1-1.49-1.1-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 7.04c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92v2.69c0 .27.18.59.69.49A10.1 10.1 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }

  if (type === "pdf") {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6.75 3.75h7.1l3.4 3.55v12.95H6.75V3.75Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M13.75 3.75V7.5h3.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.75 14.25h6.5M8.75 17h4.25M8.75 11.5h6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 16 16 8M10 7h7v7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectImage({
  image,
  priority = false,
  assetBase,
}: {
  image: NonNullable<Project["images"]>[number];
  priority?: boolean;
  assetBase: string;
}) {
  const src = `${assetBase}${image.src}`;

  return (
    <figure className="mt-6">
      <img
        className={`mx-auto block w-full max-w-4xl rounded-xl object-contain ${priority ? "max-h-[25rem]" : "max-h-[19rem]"}`}
        src={src}
        alt={image.alt}
        loading="lazy"
      />
      <figcaption
        className="mt-3 text-center text-xs font-medium text-slate-500"
        style={terminalFont}
      >
        {image.caption}
      </figcaption>
    </figure>
  );
}

function WorkflowStrip({ title, steps }: { title: string; steps: string[] }) {
  return (
    <section className="mt-8 border-t border-white/10 pt-7">
      <h3
        className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
        style={terminalFont}
      >
        {title}
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-slate-300"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 text-xs text-slate-500">
              {index + 1}
            </span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResultsTable({ rows, locale }: { rows: string[]; locale: Locale }) {
  const parsedRows = rows.map((row) =>
    row.split("|").map((cell) => cell.trim()),
  );
  const headers =
    locale === "es"
      ? ["Patología", "Modelo", "τs", "τc", "Prec.", "Recall", "F1", "AUC"]
      : ["Pathology", "Model", "τs", "τc", "Prec.", "Recall", "F1", "AUC"];

  const cleanMetric = (value: string) =>
    value.replace(
      /^Precision\s|^Precisión\s|^τs\s|^τc\s|^Recall\s|^F1\s|^AUC\s/,
      "",
    );

  return (
    <section className="mt-8 border-t border-white/10 pt-7">
      <h3
        className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
        style={terminalFont}
      >
        {locale === "es" ? "Resultados" : "Results"}
      </h3>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[54rem] border-collapse text-left text-sm">
          <thead
            className="bg-white/[0.035] text-xs uppercase tracking-[0.12em] text-slate-500"
            style={terminalFont}
          >
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8 text-slate-300">
            {parsedRows.map((cells) => (
              <tr
                key={cells.join("-")}
                className="transition hover:bg-white/[0.025]"
              >
                <td className="px-4 py-3 font-semibold text-white">
                  {cells[0]}
                </td>
                <td className="px-4 py-3">{cells[1]}</td>
                <td className="px-4 py-3" style={terminalFont}>
                  {cleanMetric(cells[2] ?? "")}
                </td>
                <td className="px-4 py-3" style={terminalFont}>
                  {cleanMetric(cells[3] ?? "")}
                </td>
                <td className="px-4 py-3" style={terminalFont}>
                  {cleanMetric(cells[4] ?? "")}
                </td>
                <td className="px-4 py-3" style={terminalFont}>
                  {cleanMetric(cells[5] ?? "")}
                </td>
                <td className="px-4 py-3" style={terminalFont}>
                  {cleanMetric(cells[6] ?? "")}
                </td>
                <td
                  className="px-4 py-3 font-semibold text-[#86efac]"
                  style={terminalFont}
                >
                  {cleanMetric(cells[7] ?? "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LinkButton({
  href,
  label,
  unavailable,
  icon = "external",
}: {
  href: string;
  label: string;
  unavailable: string;
  icon?: "pdf" | "github" | "external";
}) {
  if (!href) {
    return (
      <button
        className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-500"
        type="button"
        disabled
      >
        {label} · {unavailable}
      </button>
    );
  }

  return (
    <a
      className="inline-flex items-center gap-2 rounded-xl border border-white/12 px-4 py-2.5 text-sm font-semibold text-slate-300 no-underline transition duration-200 hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/[0.04] hover:text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <ActionIcon type={icon} />
      {label}
    </a>
  );
}

function TfgPreview({
  project,
  labels,
  locale,
  assetBase,
}: {
  project: Project;
  labels: Record<string, string>;
  locale: Locale;
  assetBase: string;
}) {
  const images = project.images ?? [];
  const contextTitle = locale === "es" ? "De qué va" : "What it is about";
  const buildTitle = locale === "es" ? "Qué construí" : "What I built";
  const moreTitle = locale === "es" ? "Más información" : "More information";
  const moreText =
    locale === "es"
      ? "La presentación está pensada para una lectura rápida. Si quieres ver la metodología completa, resultados, validación y memoria técnica, puedes abrir el PDF o el repositorio."
      : "This preview is designed for quick reading. For the full methodology, results, validation and technical report, open the PDF or the repository.";

  return (
    <motion.article
      className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="mb-8 flex flex-wrap items-center gap-3 text-xs text-slate-500"
        style={terminalFont}
      >
        <span>{labels.preview}</span>
        <span>/</span>
        <span>{project.file}</span>
      </div>

      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-slate-300">
            10/10
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-slate-300">
            University of Seville
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-slate-300">
            Medical AI
          </span>
        </div>
        <h2 className="text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
          {project.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
          {project.summary}
        </p>
      </header>

      {images[0] ? <ProjectImage image={images[0]} priority assetBase={assetBase} /> : null}

      <section className="mt-10 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {contextTitle}
        </h3>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          {project.description}
        </p>
      </section>

      <section className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {labels.technologies}
        </h3>
        <TechBadges technologies={project.technologies} />
      </section>

      <section className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {buildTitle}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {project.features.slice(0, 4).map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-slate-300"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      {images[1] ? <ProjectImage image={images[1]} assetBase={assetBase} /> : null}

      {project.workflow?.length ? (
        <WorkflowStrip
          title={
            locale === "es"
              ? "Flujo de Machine Learning"
              : "Machine Learning workflow"
          }
          steps={project.workflow}
        />
      ) : null}

      {project.results?.length ? (
        <ResultsTable rows={project.results} locale={locale} />
      ) : null}

      <footer className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {moreTitle}
        </h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
          {moreText}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton
            href={project.links.demo}
            label={labels.thesis}
            unavailable={labels.unavailable}
            icon="pdf"
          />
          <LinkButton
            href={project.links.github}
            label={labels.github}
            unavailable={labels.unavailable}
            icon="github"
          />
        </div>
      </footer>
    </motion.article>
  );
}

function SpaceVisualizationPreview({
  project,
  labels,
  locale,
}: {
  project: Project;
  labels: Record<string, string>;
  locale: Locale;
}) {
  const contextTitle = locale === "es" ? "De qué va" : "What it is about";
  const buildTitle = locale === "es" ? "Qué construí" : "What I built";
  const workflowTitle = locale === "es" ? "Flujo de datos" : "Data Workflow";
  const keyNumbersTitle = locale === "es" ? "Cifras clave" : "Key Numbers";
  const insightsTitle = locale === "es" ? "Ideas principales" : "Main Insights";
  const ctaTitle =
    locale === "es"
      ? "Algunos proyectos se entienden mejor viviéndolos"
      : "Some projects are better experienced than explained";
  const ctaText =
    locale === "es"
      ? "Esta visualización fue diseñada para recorrerse haciendo scroll y ver cómo los datos cambian a lo largo del tiempo."
      : "This visualization was designed to be experienced by scrolling and watching how the data changes across time.";

  return (
    <motion.article
      className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="mb-8 flex flex-wrap items-center gap-3 text-xs text-slate-500"
        style={terminalFont}
      >
        <span>{labels.preview}</span>
        <span>/</span>
        <span>{project.file}</span>
      </div>

      <header className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-slate-300">
            UOC
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-slate-300">
            Data Visualization
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-slate-300">
            Interactive Data Storytelling
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-slate-300">
            Space Economy
          </span>
        </div>
        <h2 className="text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
          {project.title}
        </h2>
        <p className="mt-4 text-xl font-semibold tracking-[-0.04em] text-slate-300 sm:text-2xl">
          {locale === "es"
            ? "De la carrera espacial a la economía orbital"
            : "From the space race to the orbital economy"}
        </p>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
          {project.summary}
        </p>
      </header>

      {project.images?.[0] ? (
        <ProjectImage image={project.images[0]} priority />
      ) : null}

      <section className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {contextTitle}
        </h3>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          {project.description}
        </p>
      </section>

      <section className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {labels.technologies}
        </h3>
        <TechBadges technologies={project.technologies} />
      </section>

      <section className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {buildTitle}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {project.features.slice(0, 4).map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm leading-6 text-slate-300"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      {project.workflow?.length ? (
        <WorkflowStrip title={workflowTitle} steps={project.workflow} />
      ) : null}

      <section className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {keyNumbersTitle}
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {(project.results ?? []).map((number) => (
            <div
              key={number}
              className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-4 text-sm font-semibold leading-6 text-slate-300"
            >
              {number}
            </div>
          ))}
        </div>
      </section>

      <SectionList
        title={insightsTitle}
        items={project.learnings.slice(0, 3)}
      />

      <footer className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
        <h3 className="text-2xl font-black tracking-[-0.04em] text-white">
          {ctaTitle}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
          {ctaText}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton
            href={project.links.demo}
            label={labels.openVisualization}
            unavailable={labels.unavailable}
          />
          <LinkButton
            href={project.links.github}
            label={labels.github}
            unavailable={labels.unavailable}
            icon="github"
          />
        </div>
      </footer>
    </motion.article>
  );
}

function WelcomePreview({
  projects,
  labels,
  onOpen,
}: {
  projects: Project[];
  labels: Record<string, string>;
  onOpen: (id: string) => void;
}) {
  const featuredProject = projects[0];

  return (
    <motion.article
      className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="mb-8 flex flex-wrap items-center gap-3 text-xs text-slate-500"
        style={terminalFont}
      >
        <span>{labels.preview}</span>
        <span>/</span>
        <span>{labels.welcome}</span>
      </div>

      <header className="mb-9">
        <p
          className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#7dd3fc]"
          style={terminalFont}
        >
          Workspace · Projects
        </p>
        <h2 className="text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
          {labels.welcomeTitle}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
          {labels.welcomeText}
        </p>
      </header>

      <button
        className="group w-full rounded-2xl border border-[#7dd3fc]/22 bg-[#7dd3fc]/[0.035] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#7dd3fc]/38 hover:bg-[#7dd3fc]/[0.055]"
        type="button"
        onClick={() => onOpen(featuredProject.id)}
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#7dd3fc]/24 bg-[#7dd3fc]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#7dd3fc]">
            {labels.featured}
          </span>
          <span className="text-sm text-slate-500" style={terminalFont}>
            {featuredProject.file}
          </span>
        </div>
        <h3 className="text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
          {featuredProject.title}
        </h3>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
          {featuredProject.summary}
        </p>
        <span className="mt-5 inline-flex text-sm font-semibold text-[#7dd3fc] transition group-hover:translate-x-1">
          {labels.openFeatured} ↓
        </span>
      </button>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {projects.slice(1).map((project) => (
          <button
            key={project.id}
            className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.04]"
            type="button"
            onClick={() => onOpen(project.id)}
          >
            <span className="text-xs text-slate-500" style={terminalFont}>
              {project.file}
            </span>
            <h3 className="mt-3 text-xl font-bold tracking-[-0.035em] text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {project.summary}
            </p>
          </button>
        ))}
      </div>
    </motion.article>
  );
}

function ProjectPreview({
  project,
  labels,
  locale,
  assetBase,
}: {
  project: Project;
  labels: Record<string, string>;
  locale: Locale;
  assetBase: string;
}) {
  if (project.id === "tfg-medical-ai") {
    return <TfgPreview project={project} labels={labels} locale={locale} assetBase={assetBase} />;
  }

  if (project.id === "space-visualization") {
    return (
      <SpaceVisualizationPreview
        project={project}
        labels={labels}
        locale={locale}
      />
    );
  }

  const primaryActionLabel =
    project.id === "tfg-medical-ai" ? labels.thesis : labels.demo;

  return (
    <motion.article
      key={`${locale}-${project.id}`}
      className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="mb-8 flex flex-wrap items-center gap-3 text-xs text-slate-500"
        style={terminalFont}
      >
        <span>{labels.preview}</span>
        <span>/</span>
        <span>{project.file}</span>
      </div>

      <header className="mb-8">
        <h2 className="text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
          {project.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
          {project.summary}
        </p>
      </header>

      {project.id === "portfolio" ? null : <ProjectMockup project={project} />}

      <section className="mt-9 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {labels.overview}
        </h3>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">
          {project.description}
        </p>
      </section>

      <section className="mt-8 border-t border-white/10 pt-7">
        <h3
          className="text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]"
          style={terminalFont}
        >
          {labels.technologies}
        </h3>
        <TechBadges technologies={project.technologies} />
      </section>

      {project.workflow?.length ? (
        <WorkflowStrip
          title={
            locale === "es"
              ? "Flujo de Machine Learning"
              : "Machine Learning workflow"
          }
          steps={project.workflow}
        />
      ) : null}
      {project.results?.length ? (
        <SectionList
          title={locale === "es" ? "Resultados" : "Results"}
          items={project.results}
        />
      ) : null}

      <div className="mt-8 space-y-8">
        <SectionList title={labels.features} items={project.features} />
        {project.challenges.length ? (
          <SectionList title={labels.challenges} items={project.challenges} />
        ) : null}
        {project.learnings.length ? (
          <SectionList title={labels.learnings} items={project.learnings} />
        ) : null}
      </div>

      <footer className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-7">
        <LinkButton
          href={project.links.demo}
          label={primaryActionLabel}
          unavailable={labels.unavailable}
        />
        <LinkButton
          href={project.links.github}
          label={labels.github}
          unavailable={labels.unavailable}
          icon="github"
        />
      </footer>
    </motion.article>
  );
}

export default function ProjectsWorkspace({ defaultLocale, projects, assetBase }: Props) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const currentProjects = projects[locale]?.length
    ? projects[locale]
    : projects[defaultLocale];
  const [activeId, setActiveId] = useState("welcome");
  const activeProject = currentProjects.find(
    (project) => project.id === activeId,
  );
  const currentLabels = labels[locale] ?? labels[defaultLocale];
  const openTabs = activeProject ? ["welcome", activeProject.id] : ["welcome"];

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(
      "portfolio-locale",
    ) as Locale | null;
    if (storedLocale && projects[storedLocale]) setLocale(storedLocale);

    const handleLocaleChange = (event: Event) => {
      const nextLocale = (event as CustomEvent<{ locale?: Locale }>).detail
        ?.locale;
      if (nextLocale && projects[nextLocale]) setLocale(nextLocale);
    };

    window.addEventListener("portfolio:locale-change", handleLocaleChange);
    return () =>
      window.removeEventListener("portfolio:locale-change", handleLocaleChange);
  }, [projects]);

  useEffect(() => {
    if (
      activeId !== "welcome" &&
      !currentProjects.some((project) => project.id === activeId)
    ) {
      setActiveId("welcome");
    }
  }, [activeId, currentProjects]);

  return (
    <div
      className="mx-auto flex w-full max-w-[112rem] items-center px-4 py-8 sm:px-6 lg:px-10"
      style={uiFont}
    >
      <div className="mx-auto h-auto min-h-[44rem] w-full max-w-[95vw] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b111b]/94 shadow-[0_30px_90px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:h-[62rem]">
        <div className="flex h-10 items-center border-b border-white/10 bg-[#111111] px-3 text-xs text-slate-400">
          <div className="mr-3 flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="mr-3 text-slate-500">
            <Logo size={16} />
          </div>
          <div className="hidden items-center gap-4 lg:flex">
            {menuItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="mx-auto flex h-6 min-w-0 max-w-[24rem] flex-1 items-center justify-center rounded-md border border-white/8 bg-white/[0.045] px-4 text-slate-500 lg:flex-none">
            <span className="truncate">{currentLabels.workspace}</span>
          </div>
          <div
            className="ml-4 hidden items-center gap-3 text-slate-500 sm:flex"
            aria-hidden="true"
          >
            <span>□</span>
            <span>▢</span>
            <span>···</span>
          </div>
        </div>

        <div className="flex h-[calc(100%-2.5rem)] min-h-[41.5rem] flex-col lg:flex-row">
          <aside className="hidden w-12 shrink-0 flex-col items-center border-r border-white/10 bg-[#181818] py-3 lg:flex">
            <div className="flex w-full flex-col items-center text-slate-500">
              {iconItems.map((item, index) => (
                <button
                  key={item}
                  className={`relative flex h-12 w-full items-center justify-center border-l-2 transition ${index === 0 ? "border-l-slate-200 text-slate-200" : "border-l-transparent hover:text-slate-300"}`}
                  type="button"
                  aria-label={item}
                >
                  <IconMark name={item} />
                </button>
              ))}
            </div>
          </aside>

          <aside className="hidden w-[19rem] shrink-0 border-r border-white/10 bg-[#181818] lg:block">
            <div className="flex h-9 items-center justify-between px-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-slate-300">
                {currentLabels.explorer}
              </p>
              <span className="text-slate-500">...</span>
            </div>
            <div className="px-3 pb-4" style={terminalFont}>
              <p className="mb-1 px-2 text-xs font-bold uppercase tracking-[0.04em] text-slate-200">
                ⌄ MI-PORTFOLIO
              </p>
              <div className="space-y-0.5 text-sm">
                <div className="px-3 py-1.5 text-slate-500">› data</div>
                <div className="px-3 py-1.5 text-slate-500">› public</div>
                <div className="px-3 py-1.5 text-slate-500">⌄ src</div>
                <div className="px-6 py-1.5 text-slate-500">⌄ components</div>
                <div className="px-9 py-1.5 text-slate-500">⌄ projects</div>
                {currentProjects.map((project) => {
                  const isActive = project.id === activeProject?.id;
                  return (
                    <button
                      key={project.id}
                      className={`group flex w-full items-center justify-between rounded-md py-1.5 pl-12 pr-2 text-left transition duration-200 ${isActive ? "bg-[#37373d] text-white" : "text-slate-300 hover:bg-[#2a2d2e]"}`}
                      type="button"
                      onClick={() => setActiveId(project.id)}
                    >
                      <span className="min-w-0 truncate">
                        <span className="text-[#7dd3fc]">◇</span> {project.file}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="border-b border-white/10 bg-[#181818]">
              <div className="flex min-h-11 items-center overflow-x-auto">
                {openTabs.map((tabId) => {
                  const project = currentProjects.find(
                    (item) => item.id === tabId,
                  );
                  const label =
                    tabId === "welcome"
                      ? currentLabels.welcome
                      : (project?.file ?? tabId);
                  const isActive = activeId === tabId;
                  return (
                    <button
                      key={tabId}
                      className={`shrink-0 border-r border-white/10 px-4 py-3 text-sm transition duration-200 ${isActive ? "bg-[#0d1117] text-white" : "bg-[#181818] text-slate-500 hover:bg-[#202020] hover:text-slate-300"}`}
                      type="button"
                      onClick={() => setActiveId(tabId)}
                      style={terminalFont}
                    >
                      {tabId === "welcome" ? "◆ " : "◇ "}
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-white/10 p-3 lg:hidden">
                <label className="sr-only" htmlFor="project-select">
                  {currentLabels.select}
                </label>
                <select
                  id="project-select"
                  className="w-full rounded-xl border border-white/10 bg-[#0b111b] px-3 py-3 text-sm text-slate-200 outline-none"
                  value={activeId}
                  onChange={(event) => setActiveId(event.target.value)}
                >
                  <option value="welcome">{currentLabels.welcome}</option>
                  {currentProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.file}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-[#181818]">
              <AnimatePresence mode="wait">
                {activeProject ? (
                  <ProjectPreview
                    key={`${locale}-${activeProject.id}`}
                    project={activeProject}
                    labels={currentLabels}
                    locale={locale}
                    assetBase={assetBase}
                  />
                ) : (
                  <WelcomePreview
                    key={`${locale}-welcome`}
                    projects={currentProjects}
                    labels={currentLabels}
                    onOpen={setActiveId}
                  />
                )}
              </AnimatePresence>
            </div>

            <div
              className="hidden h-8 items-center justify-between border-t border-white/10 bg-[#181818] px-4 text-xs text-slate-500 lg:flex"
              style={terminalFont}
            >
              <span>main</span>
              <span>{currentLabels.status}</span>
              <span>UTF-8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
