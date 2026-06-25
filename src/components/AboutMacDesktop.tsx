import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./Logo";

type Locale = "en" | "es";

type TerminalContent = {
  intro: string[];
  specializationTitle: string;
  specializations: string[];
  experienceTitle: string;
  experience: string[];
  thesisTitle: string;
  thesis: string[];
  interestsTitle: string;
  interests: string[];
};

type AboutContent = {
  title: string;
  subtitle: string;
  imageAlt: string;
  terminal: TerminalContent;
};

type Props = {
  defaultLocale: Locale;
  content: Record<Locale, AboutContent>;
  assetBase: string;
  contacts: {
    email: string;
    github: string;
    linkedin: string;
  };
};

const techStack = [
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
];

const contactItems = [
  {
    name: "LinkedIn",
    key: "linkedin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    name: "GitHub",
    key: "github",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Gmail",
    key: "email",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  },
] as const;

const windowVariants = {
  hiddenLeft: { opacity: 0, x: -42, y: 16, scale: 0.985, filter: "blur(8px)" },
  hiddenRight: { opacity: 0, x: 42, y: 16, scale: 0.985, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
};

const windowTransition = {
  duration: 0.95,
  ease: [0.16, 1, 0.3, 1] as const,
};

const terminalFont = {
  fontFamily:
    '"SFMono-Regular", "Cascadia Code", "Roboto Mono", "Liberation Mono", Menlo, monospace',
};

function TrafficLights() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

export default function AboutMacDesktop({ defaultLocale, content, contacts, assetBase }: Props) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const current = content[locale] ?? content[defaultLocale];
  const terminal = current.terminal;
  const cvLabel = locale === "es" ? "Descargar CV" : "Download CV";
  const assetPath = (path: string) => `${assetBase}${path}`;

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(
      "portfolio-locale",
    ) as Locale | null;
    if (storedLocale && content[storedLocale]) setLocale(storedLocale);

    const handleLocaleChange = (event: Event) => {
      const nextLocale = (event as CustomEvent<{ locale?: Locale }>).detail
        ?.locale;
      if (nextLocale && content[nextLocale]) setLocale(nextLocale);
    };

    window.addEventListener("portfolio:locale-change", handleLocaleChange);
    return () =>
      window.removeEventListener("portfolio:locale-change", handleLocaleChange);
  }, [content]);

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[118rem] flex-col px-4 pb-12 pt-[5.2rem] sm:px-6 lg:px-10 lg:pb-16 lg:pt-[6rem]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#8b949e]"></p>
        <h2 className="font-sans text-5xl font-black tracking-[-0.055em] text-[#f0f6fc] sm:text-6xl lg:text-7xl">
          {current.title}
        </h2>
        <p className="mt-4 text-base font-medium text-[#8b949e] sm:text-lg">
          {current.subtitle}
        </p>
      </div>

      <div className="relative mt-12 flex flex-1 flex-col gap-6 lg:mt-14 lg:min-h-[37rem]">
        <motion.div
          className="order-1 z-20 overflow-hidden rounded-[1.55rem] border border-white/70 bg-white/72 shadow-[0_24px_70px_rgba(0,0,0,0.16)] backdrop-blur-2xl lg:absolute lg:left-[3%] lg:top-0 lg:h-[40rem] lg:w-[40%]"
          initial="hiddenLeft"
          whileInView="visible"
          whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          viewport={{ once: true, amount: 0.35 }}
          transition={windowTransition}
          variants={windowVariants}
        >
          <div className="flex h-12 items-center border-b border-black/10 bg-white/64 px-4">
            <TrafficLights />
            <div className="ml-3 text-[#5f6368]">
              <Logo size={16} />
            </div>
            <div className="flex-1 text-center text-sm font-semibold text-[#5f6368]">
              javier.jpg
            </div>
            <div className="w-[3.75rem]" aria-hidden="true" />
          </div>

          <div className="grid min-h-[31.5rem] grid-cols-1 bg-white/50 md:grid-cols-[11.5rem_1fr] lg:h-[calc(100%-3rem)]">
            <aside className="border-b border-black/10 bg-[#eef0f4]/82 p-4 md:border-b-0 md:border-r">
              <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8b8f98]">
                Stack
              </p>
              <div className="grid grid-cols-2 gap-1.5 md:grid-cols-1">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-[#303136] transition-colors hover:bg-white/70"
                  >
                    <img
                      className="h-5 w-5 object-contain"
                      src={tech.icon}
                      alt={`${tech.name} icon`}
                      loading="lazy"
                    />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>

              <div className="my-4 h-px bg-black/10" aria-hidden="true" />

              <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8b8f98]">
                Contact
              </p>
              <div className="grid grid-cols-3 gap-1.5 md:grid-cols-1">
                {contactItems.map((contact) => {
                  const href = contact.key === "email" ? `mailto:${contacts.email}` : contacts[contact.key];

                  return (
                    <a
                      key={contact.name}
                      className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-[#303136] no-underline transition-colors hover:bg-white/70"
                      href={href}
                      target={contact.key === "email" ? undefined : "_blank"}
                      rel={contact.key === "email" ? undefined : "noreferrer"}
                      aria-label={`Contact via ${contact.name}`}
                    >
                      <img
                        className="h-5 w-5 object-contain"
                        src={contact.icon}
                        alt=""
                        loading="lazy"
                        aria-hidden="true"
                      />
                      <span>{contact.name}</span>
                    </a>
                  );
                })}
              </div>
            </aside>

            <main className="flex min-h-[26rem] flex-col bg-[#f8f8fb] p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between rounded-xl border border-black/5 bg-white/70 px-4 py-2 text-sm text-[#6e6e73]">
                <span className="font-semibold">Preview</span>
                <span className="font-mono text-xs">javier.jpg</span>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl bg-white p-3 sm:p-4">
                <img
                  className="h-[76vw] max-h-[26rem] min-h-[20rem] w-[68%] max-w-[18rem] rounded-xl object-cover object-[50%_22%] sm:h-[26rem] lg:h-[26rem] lg:w-[68%]"
                  src={assetPath("/images/profile/profile.png")}
                  alt={current.imageAlt}
                  loading="lazy"
                />
                <a
                  className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-[#f2f3f5] px-4 py-2.5 text-sm font-bold text-[#303136] no-underline shadow-[0_8px_18px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)]"
                  href={assetPath("/cv/javier-munoz-romero-cv.pdf")}
                  download
                >
                  <span aria-hidden="true">▾</span>
                  <span>{cvLabel}</span>
                </a>
              </div>
            </main>
          </div>
        </motion.div>

        <motion.div
          className="order-2 z-10 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0d1117] shadow-[0_22px_62px_rgba(0,0,0,0.22)] lg:absolute lg:right-[3%] lg:top-[-3rem] lg:h-[40rem] lg:w-[58%]"
          initial="hiddenRight"
          whileInView="visible"
          whileHover={{ y: -5, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ ...windowTransition, delay: 0.1 }}
          variants={windowVariants}
        >
          <div className="flex h-12 items-center border-b border-white/10 bg-[#161b22] px-4">
            <TrafficLights />
            <div className="ml-3 text-white/56">
              <Logo size={16} />
            </div>
            <div
              className="flex-1 text-center text-xs text-white/56 sm:text-sm"
              style={terminalFont}
            >
              javier@MacBook-Pro ~
            </div>
            <div className="w-[3.75rem]" aria-hidden="true" />
          </div>

          <div
            className="h-[calc(100%-3rem)] overflow-auto px-5 py-5 text-[0.82rem] leading-7 text-[#c9d1d9] sm:px-7 sm:py-6 sm:text-[0.9rem] lg:pl-30"
            style={terminalFont}
          >
            <p>
              <span className="text-[#58a6ff]">~/about</span>{" "}
              <span className="text-[#7ee787]">cat</span>{" "}
              <span className="text-[#d2a8ff]">summary.md</span>
            </p>
            <div className="mt-5 space-y-4 whitespace-pre-line">
              <div>
                <p className="text-[#8b949e]">// education</p>
                <p>{terminal.intro.join("\n")}</p>
              </div>
              <div>
                <p><span className="text-[#ff7b72]">const</span> <span className="text-[#ffa657]">{terminal.specializationTitle}</span> <span className="text-[#8b949e]">=</span></p>
                <p className="pl-4 text-[#f0f6fc]">{terminal.specializations.join("\n")}</p>
              </div>
              <div>
                <p><span className="text-[#ff7b72]">const</span> <span className="text-[#ffa657]">{terminal.experienceTitle}</span> <span className="text-[#8b949e]">=</span></p>
                <p className="pl-4">{terminal.experience.join("\n")}</p>
              </div>
              <div>
                <p><span className="text-[#ff7b72]">const</span> <span className="text-[#ffa657]">{terminal.thesisTitle}</span> <span className="text-[#8b949e]">=</span></p>
                <p className="pl-4">{terminal.thesis.join("\n")}</p>
              </div>
              <div>
                <p><span className="text-[#ff7b72]">const</span> <span className="text-[#ffa657]">{terminal.interestsTitle}</span> <span className="text-[#8b949e]">=</span></p>
                <p className="pl-4">{terminal.interests.join("\n")}</p>
              </div>
            </div>
            <p className="mt-5">
              <span className="text-[#58a6ff]">~/about</span>{" "}
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[#c9d1d9]" />
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
