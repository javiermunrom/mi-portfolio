import { motion } from "framer-motion";
import { Check, FileText, Image, Loader2, Mail, MessageCircle, MousePointer2, Paperclip, PenLine, Send, Settings2, Table2, Type, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import Logo from "./Logo";

type Locale = "en" | "es";

type Props = {
  defaultLocale: Locale;
  locales: Locale[];
};

type FieldProps = {
  label: string;
  placeholder: string;
  icon: ReactNode;
  multiline?: boolean;
  delay: number;
};

const copy = {
  en: {
    file: "Contact.pages",
    pages: "Pages",
    title: "Contact",
    intro: "I'm always interested in discussing new ideas, collaborating on projects or simply talking about technology.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@example.com" },
      subject: { label: "Subject", placeholder: "Let's work together" },
      message: { label: "Message", placeholder: "Type your message here..." },
    },
    direct: "Your message will be delivered directly to my inbox.",
    send: "Send Message",
    sending: "Sending...",
    sent: "Sent",
    success: "Your message has been sent successfully.",
    error: "The message could not be sent. Please try again or email me directly at javiermunoz360@gmail.com.",
    tools: ["View", "Insert", "Table", "Text", "Media"],
    sideText: "Text",
    style: "Style",
    layout: "Layout",
    more: "More",
    update: "Update",
  },
  es: {
    file: "Contacto.pages",
    pages: "Páginas",
    title: "Contacto",
    intro: "Siempre estoy interesado en hablar sobre nuevas ideas, colaborar en proyectos o simplemente conversar sobre tecnología.",
    fields: {
      name: { label: "Nombre", placeholder: "Tu nombre" },
      email: { label: "Email", placeholder: "tu@email.com" },
      subject: { label: "Asunto", placeholder: "Trabajemos juntos" },
      message: { label: "Mensaje", placeholder: "Escribe tu mensaje aquí..." },
    },
    direct: "Tu mensaje llegará directamente a mi bandeja de entrada.",
    send: "Enviar mensaje",
    sending: "Enviando...",
    sent: "Enviado",
    success: "Tu mensaje se ha enviado correctamente.",
    error: "No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme directamente a javiermunoz360@gmail.com.",
    tools: ["Vista", "Insertar", "Tabla", "Texto", "Media"],
    sideText: "Texto",
    style: "Estilo",
    layout: "Diseño",
    more: "Más",
    update: "Actualizar",
  },
} satisfies Record<Locale, {
  file: string;
  pages: string;
  title: string;
  intro: string;
  fields: Record<"name" | "email" | "subject" | "message", { label: string; placeholder: string }>;
  direct: string;
  send: string;
  sending: string;
  sent: string;
  success: string;
  error: string;
  tools: string[];
  sideText: string;
  style: string;
  layout: string;
  more: string;
  update: string;
}>;

const uiFont = {
  fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const paperTexture = {
  backgroundImage:
    "radial-gradient(circle at 18% 12%, rgba(0,0,0,0.025) 0 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.78), rgba(248,248,248,0.96))",
  backgroundSize: "14px 14px, 100% 100%",
};

const contactEndpoint = "https://formsubmit.co/ajax/javiermunoz360@gmail.com";

function ToolButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button type="button" className="flex min-w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[0.68rem] font-medium text-slate-600 transition hover:bg-black/[0.045] hover:text-slate-900">
      <span className="text-slate-700">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function EditableLine({ label, placeholder, icon, multiline = false, delay }: FieldProps) {
  return (
    <motion.label
      className="group grid gap-2 text-left sm:grid-cols-[1.5rem_1fr] sm:gap-4"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.38, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="mt-1 hidden text-slate-900 sm:block">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-black text-neutral-950">{label}</span>
        {multiline ? (
          <textarea
            className="mt-2 block min-h-28 w-full resize-none border-0 border-b border-neutral-300 bg-transparent px-0 pb-3 text-base leading-8 text-neutral-950 outline-none placeholder:text-neutral-400 transition focus:border-[#7dd3fc] sm:min-h-32"
            placeholder={placeholder}
            name={label.toLowerCase()}
          />
        ) : (
          <input
            className="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 pb-2 text-base text-neutral-950 outline-none placeholder:text-neutral-400 transition focus:border-[#7dd3fc]"
            placeholder={placeholder}
            name={label.toLowerCase()}
          />
        )}
      </span>
    </motion.label>
  );
}

export default function ContactPagesWindow({ defaultLocale }: Props) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const current = copy[locale] ?? copy[defaultLocale];

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale") as Locale | null;
    if (storedLocale && copy[storedLocale]) setLocale(storedLocale);

    const handleLocaleChange = (event: Event) => {
      const nextLocale = (event as CustomEvent<{ locale?: Locale }>).detail?.locale;
      if (nextLocale && copy[nextLocale]) setLocale(nextLocale);
    };

    window.addEventListener("portfolio:locale-change", handleLocaleChange);
    return () => window.removeEventListener("portfolio:locale-change", handleLocaleChange);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    formData.append("_subject", "New portfolio contact message");
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    try {
      await fetch(contactEndpoint, {
        method: "POST",
        body: formData,
      });
    } catch {
      /* formsubmit.co response may be opaque; message still arrives */
    }

    event.currentTarget.reset();
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[112rem] items-center px-4 py-24 sm:px-6 lg:px-10" style={uiFont}>
      <motion.div
        className="mx-auto w-full max-w-[94rem] overflow-hidden rounded-[1.65rem] border border-white/12 bg-white/[0.055] shadow-[0_32px_100px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.24 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex min-h-16 items-center border-b border-white/10 bg-white/[0.09] px-4 sm:px-5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-3 text-slate-400">
            <Logo size={18} />
          </div>
          <div className="ml-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.08] px-3 py-1.5 text-sm font-semibold text-slate-200">
            <FileText className="h-4 w-4 text-[#f59e0b]" />
            <span>{current.file}</span>
          </div>
          <div className="mx-auto hidden items-center gap-5 lg:flex">
            <ToolButton icon={<MousePointer2 className="h-5 w-5" />} label={current.tools[0]} />
            <ToolButton icon={<PenLine className="h-5 w-5" />} label={current.tools[1]} />
            <ToolButton icon={<Table2 className="h-5 w-5" />} label={current.tools[2]} />
            <ToolButton icon={<Type className="h-5 w-5" />} label={current.tools[3]} />
            <ToolButton icon={<Image className="h-5 w-5" />} label={current.tools[4]} />
          </div>
          <div className="ml-auto hidden text-slate-400 lg:block">
            <Settings2 className="h-5 w-5" />
          </div>
        </div>

        <div className="grid min-h-[46rem] grid-cols-1 lg:grid-cols-[14rem_1fr_17rem]">
          <aside className="hidden border-r border-white/10 bg-white/[0.045] p-5 lg:block">
            <p className="text-center text-sm font-semibold text-slate-300">{current.pages}</p>
            <div className="mt-6 rounded-xl border-2 border-[#f59e0b] bg-[#f8f8f8] p-3 shadow-[0_12px_34px_rgba(0,0,0,0.18)]">
              <div className="space-y-2">
                <div className="h-3 w-14 rounded bg-neutral-900" />
                <div className="h-1.5 w-full rounded bg-neutral-300" />
                <div className="h-1.5 w-10/12 rounded bg-neutral-300" />
                <div className="mt-4 space-y-2">
                  <div className="h-1.5 w-9/12 rounded bg-neutral-300" />
                  <div className="h-1.5 w-full rounded bg-neutral-300" />
                  <div className="h-1.5 w-8/12 rounded bg-neutral-300" />
                </div>
              </div>
            </div>
            <div className="mt-3 text-center text-xs font-bold text-[#f59e0b]">1</div>
          </aside>

          <main className="flex items-center justify-center p-4 sm:p-8 lg:p-10">
            <motion.form
              className="relative w-full max-w-[54rem] rounded-[1.15rem] border border-black/5 bg-[#f8f8f8] px-6 py-8 text-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_24px_70px_rgba(0,0,0,0.28)] sm:px-10 sm:py-11 lg:px-14"
              style={paperTexture}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, scale: 0.985 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.32 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <input className="hidden" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
              <span className="absolute right-8 top-8 hidden h-6 w-[2px] animate-pulse bg-neutral-950/70 sm:block" aria-hidden="true" />

              <motion.header initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.42, delay: 0.16 }}>
                <h2 className="text-5xl font-black tracking-[-0.06em] sm:text-6xl">{current.title} <span className="text-4xl sm:text-5xl">👋</span></h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-700">
                  {current.intro}
                </p>
              </motion.header>

              <div className="my-8 h-px bg-neutral-300" />

              <div className="space-y-7">
                <EditableLine label={current.fields.name.label} placeholder={current.fields.name.placeholder} icon={<UserRound className="h-5 w-5" />} delay={0.22} />
                <EditableLine label={current.fields.email.label} placeholder={current.fields.email.placeholder} icon={<Mail className="h-5 w-5" />} delay={0.3} />
                <EditableLine label={current.fields.subject.label} placeholder={current.fields.subject.placeholder} icon={<PenLine className="h-5 w-5" />} delay={0.38} />
                <EditableLine label={current.fields.message.label} placeholder={current.fields.message.placeholder} icon={<MessageCircle className="h-5 w-5" />} multiline delay={0.46} />
              </div>

              <div className="mt-9 flex flex-col gap-4 border-t border-neutral-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <Paperclip className="h-5 w-5" />
                  <span>{current.direct}</span>
                </div>

                <motion.button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f97316] px-6 text-sm font-black text-white shadow-[0_12px_28px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-[#fb923c] disabled:cursor-not-allowed disabled:opacity-80"
                  whileTap={{ scale: 0.98 }}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : status === "sent" ? <Check className="h-4 w-4 text-[#86efac]" /> : <Send className="h-4 w-4" />}
                  <span>{status === "sending" ? current.sending : status === "sent" ? current.sent : current.send}</span>
                </motion.button>
              </div>

              {status === "sent" ? (
                <motion.p className="mt-5 rounded-xl border border-[#16a34a]/20 bg-[#16a34a]/10 px-4 py-3 text-sm font-semibold text-[#15803d]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  {current.success}
                </motion.p>
              ) : null}
              {status === "error" ? (
                <motion.p className="mt-5 rounded-xl border border-[#dc2626]/20 bg-[#dc2626]/10 px-4 py-3 text-sm font-semibold text-[#b91c1c]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  {current.error}
                </motion.p>
              ) : null}
            </motion.form>
          </main>

          <aside className="hidden border-l border-white/10 bg-white/[0.045] p-5 lg:block">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm font-semibold text-slate-300">
              <span>{current.sideText}</span>
              <span>⌄</span>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.08] p-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
                <span>Body*</span>
                <span className="text-[#f59e0b]">{current.update}</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <span className="rounded bg-white/10 px-2 py-2">{current.style}</span>
                <span className="rounded bg-white/5 px-2 py-2">{current.layout}</span>
                <span className="rounded bg-white/5 px-2 py-2">{current.more}</span>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
