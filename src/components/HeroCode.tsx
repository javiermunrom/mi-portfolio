import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Locale = "en" | "es";

type HeroLocaleContent = {
  languageName: string;
  switchLanguageLabel: string;
  ctaLabel: string;
  ctaSuffix: string;
  ctaAriaLabel: string;
};

type Props = {
  defaultLocale: Locale;
  locales: Locale[];
  content: Record<Locale, HeroLocaleContent>;
};

type Token = {
  text: string;
  className?: string;
};

const syntax = {
  keyword: "text-[#c084fc]",
  module: "text-[#93c5fd]",
  className: "text-[#e5e7eb] font-semibold",
  functionName: "text-[#7dd3fc]",
  string: "text-[#86efac]",
  property: "text-[#fbbf24]",
  muted: "text-[#7b8496]",
  operator: "text-[#a1a1aa]",
};

const line = (tokens: Token[]) => tokens;

const codeByLocale = {
  en: [
    line([{ text: "# professional profile", className: syntax.muted }]),
    line([{ text: "from", className: syntax.keyword }, { text: " ai ", className: syntax.muted }, { text: "import", className: syntax.keyword }, { text: " ML", className: syntax.module }, { text: ", ", className: syntax.operator }, { text: "LLMs", className: syntax.module }]),
    line([{ text: "from", className: syntax.keyword }, { text: " software ", className: syntax.muted }, { text: "import", className: syntax.keyword }, { text: " Engineer", className: syntax.module }]),
    line([]),
    line([{ text: "class", className: syntax.keyword }, { text: " Javier", className: syntax.className }, { text: "(", className: syntax.operator }, { text: "Engineer", className: syntax.module }, { text: "):", className: syntax.operator }]),
    line([]),
    line([{ text: "    role", className: syntax.property }, { text: " = ", className: syntax.operator }, { text: '"AI Engineer"', className: syntax.string }]),
    line([]),
    line([{ text: "    stack", className: syntax.property }, { text: " = [", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"Machine Learning"', className: syntax.string }, { text: ",", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"Deep Learning"', className: syntax.string }, { text: ",", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"LLMs"', className: syntax.string }, { text: ",", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"Computer Vision"', className: syntax.string }]),
    line([{ text: "    ]", className: syntax.operator }]),
    line([]),
    line([{ text: "    " }, { text: "def", className: syntax.keyword }, { text: " build", className: syntax.functionName }, { text: "(self):", className: syntax.operator }]),
    line([{ text: "        " }, { text: "return", className: syntax.keyword }, { text: " ", className: syntax.operator }, { text: '"Intelligent products powered by code and data"', className: syntax.string }]),
    line([]),
    line([{ text: "javier", className: syntax.className }, { text: " = ", className: syntax.operator }, { text: "Javier", className: syntax.module }, { text: "()", className: syntax.operator }]),
    line([{ text: "javier", className: syntax.className }, { text: ".build", className: syntax.functionName }, { text: "()", className: syntax.operator }]),
  ],
  es: [
    line([{ text: "# perfil profesional", className: syntax.muted }]),
    line([{ text: "from", className: syntax.keyword }, { text: " ia ", className: syntax.muted }, { text: "import", className: syntax.keyword }, { text: " AprendizajeAutomatico", className: syntax.module }, { text: ", ", className: syntax.operator }, { text: "ModelosDeLenguaje", className: syntax.module }]),
    line([{ text: "from", className: syntax.keyword }, { text: " ingenieria ", className: syntax.muted }, { text: "import", className: syntax.keyword }, { text: " Ingeniero", className: syntax.module }]),
    line([]),
    line([{ text: "class", className: syntax.keyword }, { text: " Javier", className: syntax.className }, { text: "(", className: syntax.operator }, { text: "Ingeniero", className: syntax.module }, { text: "):", className: syntax.operator }]),
    line([]),
    line([{ text: "    rol", className: syntax.property }, { text: " = ", className: syntax.operator }, { text: '"Ingeniero de IA"', className: syntax.string }]),
    line([]),
    line([{ text: "    tecnologias", className: syntax.property }, { text: " = [", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"Aprendizaje Automático"', className: syntax.string }, { text: ",", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"Aprendizaje Profundo"', className: syntax.string }, { text: ",", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"Modelos de Lenguaje"', className: syntax.string }, { text: ",", className: syntax.operator }]),
    line([{ text: "        ", className: syntax.operator }, { text: '"Visión por Computador"', className: syntax.string }]),
    line([{ text: "    ]", className: syntax.operator }]),
    line([]),
    line([{ text: "    " }, { text: "def", className: syntax.keyword }, { text: " construir", className: syntax.functionName }, { text: "(self):", className: syntax.operator }]),
    line([{ text: "        " }, { text: "return", className: syntax.keyword }, { text: " ", className: syntax.operator }, { text: '"Productos inteligentes impulsados por código y datos"', className: syntax.string }]),
    line([]),
    line([{ text: "javier", className: syntax.className }, { text: " = ", className: syntax.operator }, { text: "Javier", className: syntax.module }, { text: "()", className: syntax.operator }]),
    line([{ text: "javier", className: syntax.className }, { text: ".construir", className: syntax.functionName }, { text: "()", className: syntax.operator }]),
  ],
} satisfies Record<Locale, Token[][]>;

const copy = {
  es: {
    greeting: "¡Hola! Soy",
    name: "Javier",
    role: "AI Engineer & Developer",
    description: "Creo soluciones inteligentes combinando código y datos para construir el futuro.",
  },
  en: {
    greeting: "Hi, I'm",
    name: "Javier",
    role: "AI Engineer & Developer",
    description: "I create intelligent solutions by combining code and data to build the future.",
  },
} satisfies Record<Locale, { greeting: string; name: string; role: string; description: string }>;

const terminalFont = {
  fontFamily: '"JetBrains Mono", "SFMono-Regular", "Cascadia Code", "Roboto Mono", Menlo, monospace',
};

const uiFont = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

function CodeLine({ tokens, index }: { tokens: Token[]; index: number }) {
  return (
    <motion.div
      className="grid grid-cols-[2.15rem_minmax(max-content,1fr)] gap-4 px-4 leading-7 sm:grid-cols-[2.5rem_minmax(max-content,1fr)] sm:px-6"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="select-none text-right text-[#636b7d]">{index + 1}</span>
      <pre className="m-0 min-h-7 whitespace-pre bg-transparent p-0 font-[inherit] leading-7 text-[inherit]">
        {tokens.map((token, tokenIndex) => (
          <span key={`${index}-${tokenIndex}-${token.text}`} className={token.className}>{token.text}</span>
        ))}
      </pre>
    </motion.div>
  );
}

export default function HeroCode({ defaultLocale, locales, content }: Props) {
  const editorRef = useRef<HTMLElement>(null);
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const current = content[locale] ?? content[defaultLocale];
  const currentCopy = copy[locale] ?? copy[defaultLocale];
  const codeLines = codeByLocale[locale] ?? codeByLocale[defaultLocale];
  const { scrollYProgress } = useScroll({ target: editorRef, offset: ["start end", "end start"] });
  const editorY = useTransform(scrollYProgress, [0, 1], [-10, 32]);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale") as Locale | null;
    if (storedLocale && content[storedLocale]) setLocale(storedLocale);
  }, [content]);

  const selectLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    setIsLanguageOpen(false);
    document.documentElement.lang = nextLocale;
    window.localStorage.setItem("portfolio-locale", nextLocale);
    window.dispatchEvent(new CustomEvent("portfolio:locale-change", { detail: { locale: nextLocale } }));
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("about");
    if (!nextSection) return;

    nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative isolate min-h-svh overflow-hidden bg-[#0d1117] text-[#f8fafc]" style={uiFont}>
      <style>{`
        @keyframes hero-cursor {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0; }
        }
      `}</style>

      <div
        className="absolute right-4 top-20 z-30 sm:right-8 sm:top-24"
        onMouseEnter={() => setIsLanguageOpen(true)}
        onMouseLeave={() => setIsLanguageOpen(false)}
      >
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-[0.12em] text-slate-300 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/22 hover:bg-white/[0.07] hover:text-white"
          onClick={() => setIsLanguageOpen((value) => !value)}
          aria-expanded={isLanguageOpen}
          aria-label={current.switchLanguageLabel}
        >
          {locale.toUpperCase()}
        </button>

        <AnimatePresence>
          {isLanguageOpen ? (
            <motion.div
              className="absolute right-0 mt-3 w-52 rounded-2xl border border-white/10 bg-[#111827]/94 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
              initial={{ opacity: 0, scale: 0.97, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              {locales.map((item) => {
                const isActive = item === locale;
                return (
                  <button
                    key={item}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition duration-200 hover:bg-white/[0.06] hover:text-white"
                    onClick={() => selectLocale(item)}
                  >
                    <span>{content[item].languageName}</span>
                    <span className={isActive ? "text-[#86efac]" : "text-slate-600"}>{item.toUpperCase()}</span>
                  </button>
                );
              })}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <main className="mx-auto grid min-h-svh w-full max-w-[92rem] grid-cols-1 items-center gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[42%_58%] lg:gap-8 lg:px-14 lg:py-10 xl:px-20">
        <motion.section
          className="max-w-xl pt-10 lg:pt-0"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-5 w-fit border-b border-[#a78bfa]/70 pb-2 text-lg font-medium tracking-[0.04em] text-slate-400 sm:text-xl" style={terminalFont}>
            {currentCopy.greeting}
          </p>
          <h1 className="text-[clamp(5rem,18vw,9.5rem)] font-black leading-[0.84] tracking-[-0.085em] text-white sm:text-[clamp(6.5rem,13vw,11rem)] lg:text-[clamp(6.8rem,9vw,11.5rem)]">
            {currentCopy.name}
          </h1>
          <p className="mt-8 text-2xl font-semibold tracking-[-0.045em] text-slate-300 sm:text-3xl" style={terminalFont}>
            {currentCopy.role}
          </p>
          <p className="mt-7 max-w-[34rem] text-lg leading-8 text-slate-400 sm:text-xl">
            {currentCopy.description}
          </p>
          <motion.button
            type="button"
            className="mt-10 inline-flex min-h-14 min-w-[13.5rem] items-center justify-center gap-3 rounded-xl border border-[#a78bfa]/70 bg-transparent px-7 text-base font-semibold text-[#c4b5fd] transition duration-300 hover:-translate-y-0.5 hover:border-[#c4b5fd] hover:bg-white/[0.035] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]/60"
            onClick={scrollToNextSection}
            aria-label={current.ctaAriaLabel}
            whileTap={{ scale: 0.99 }}
          >
            <span>{current.ctaLabel}</span>
            <span aria-hidden="true">{current.ctaSuffix}</span>
          </motion.button>
        </motion.section>

        <motion.section ref={editorRef} className="relative w-full lg:pl-8" style={{ y: editorY }} aria-label="Code editor preview">
          <div className="absolute -right-8 top-8 z-20 hidden text-2xl text-[#a78bfa]/80 lg:block" aria-hidden="true">+</div>

          <motion.div
            className="relative overflow-hidden rounded-[1.45rem] border border-white/12 bg-[#0B1120]/78 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-14 items-center border-b border-white/10 bg-white/[0.025] px-4 sm:px-5">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#fb7185]" />
                <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
                <span className="h-3 w-3 rounded-full bg-[#86efac]" />
              </div>
              <div className="ml-auto rounded-lg border border-white/7 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-400" style={terminalFont}>
                javier.py
              </div>
            </div>

            <div className="overflow-x-auto py-5 text-[0.78rem] text-slate-300 sm:py-6 sm:text-[0.9rem] lg:text-[0.95rem]" style={terminalFont}>
              {codeLines.map((tokens, index) => (
                <CodeLine key={`${locale}-${index}`} tokens={tokens} index={index} />
              ))}
              <motion.div
                className="grid grid-cols-[2.15rem_minmax(max-content,1fr)] gap-4 px-4 leading-7 sm:grid-cols-[2.5rem_minmax(max-content,1fr)] sm:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: 1.3 }}
              >
                <span className="select-none text-right text-[#636b7d]">{codeLines.length + 1}</span>
                <span className="min-h-7">
                  <span className="inline-block h-[1.08em] w-[0.52em] translate-y-0.5 rounded-[1px] bg-slate-300 [animation:hero-cursor_1.1s_steps(1,end)_infinite]" />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}
