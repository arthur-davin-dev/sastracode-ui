"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { en } from "@/locale/en";
import { km } from "@/locale/km";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  FileCode2,
  Layout,
  Terminal,
  Cpu,
  Sparkles,
  Flame,
} from "lucide-react";

const languagesData = [
  {
    id: "html",
    name: "HTML",
    query: "html",
    number: "01",
    icon: Layout,
    color: "text-orange-500 dark:text-orange-400 group-hover:text-white",
    iconBg: "bg-orange-500/10 border-orange-500/20 dark:bg-orange-500/20 dark:border-orange-500/30",
    hoverBg: "hover:bg-orange-500 hover:border-orange-500 dark:hover:bg-orange-600 dark:hover:border-orange-600",
    glow: "hover:shadow-orange-500/25",
    chip: "bg-orange-50 text-orange-700 border-orange-200/80 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/30 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30",
    topics: ["Semantic HTML", "Forms & Inputs", "Accessibility"],
    learners: "3.2k",
  },
  {
    id: "css",
    name: "CSS",
    query: "css",
    number: "02",
    icon: FileCode2,
    color: "text-blue-500 dark:text-blue-400 group-hover:text-white",
    iconBg: "bg-blue-500/10 border-blue-500/20 dark:bg-blue-500/20 dark:border-blue-500/30",
    hoverBg: "hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:border-blue-600",
    glow: "hover:shadow-blue-500/25",
    chip: "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/30 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30",
    topics: ["Selectors", "Layout", "Responsive Design"],
    learners: "2.8k",
  },
  {
    id: "javascript",
    name: "JavaScript",
    query: "javascript",
    number: "03",
    icon: Code2,
    color: "text-amber-500 dark:text-amber-400 group-hover:text-white",
    iconBg: "bg-amber-500/10 border-amber-500/20 dark:bg-amber-500/20 dark:border-amber-500/30",
    hoverBg: "hover:bg-amber-500 hover:border-amber-500 dark:hover:bg-amber-600 dark:hover:border-amber-600",
    glow: "hover:shadow-amber-500/25",
    chip: "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30",
    topics: ["Variables", "Functions", "Async"],
    learners: "4.1k",
  },
  {
    id: "nodejs",
    name: "Node.js",
    query: "nodejs",
    number: "04",
    icon: Terminal,
    color: "text-emerald-500 dark:text-emerald-400 group-hover:text-white",
    iconBg: "bg-emerald-500/10 border-emerald-500/20 dark:bg-emerald-500/20 dark:border-emerald-500/30",
    hoverBg: "hover:bg-emerald-600 hover:border-emerald-600 dark:hover:bg-emerald-600 dark:hover:border-emerald-600",
    glow: "hover:shadow-emerald-500/25",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30",
    topics: ["Servers", "APIs", "Runtime"],
    learners: "1.6k",
  },
  {
    id: "python",
    name: "Python",
    query: "python",
    number: "05",
    icon: Terminal,
    color: "text-violet-500 dark:text-violet-400 group-hover:text-white",
    iconBg: "bg-violet-500/10 border-violet-500/20 dark:bg-violet-500/20 dark:border-violet-500/30",
    hoverBg: "hover:bg-violet-600 hover:border-violet-600 dark:hover:bg-violet-600 dark:hover:border-violet-600",
    glow: "hover:shadow-violet-500/25",
    chip: "bg-violet-50 text-violet-700 border-violet-200/80 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/30 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30",
    topics: ["Syntax", "Functions", "Automation"],
    learners: "5.4k",
  },
  {
    id: "java",
    name: "Java",
    query: "java",
    number: "06",
    icon: Cpu,
    color: "text-rose-500 dark:text-rose-400 group-hover:text-white",
    iconBg: "bg-rose-500/10 border-rose-500/20 dark:bg-rose-500/20 dark:border-rose-500/30",
    hoverBg: "hover:bg-rose-600 hover:border-rose-600 dark:hover:bg-rose-600 dark:hover:border-rose-600",
    glow: "hover:shadow-rose-500/25",
    chip: "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30",
    topics: ["Classes", "OOP", "Concurrency"],
    learners: "2.1k",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    query: "tailwind%20css",
    number: "07",
    icon: Layout,
    color: "text-teal-500 dark:text-teal-400 group-hover:text-white",
    iconBg: "bg-teal-500/10 border-teal-500/20 dark:bg-teal-500/20 dark:border-teal-500/30",
    hoverBg: "hover:bg-teal-600 hover:border-teal-600 dark:hover:bg-teal-600 dark:hover:border-teal-600",
    glow: "hover:shadow-teal-500/25",
    chip: "bg-teal-50 text-teal-700 border-teal-200/80 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/30 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/30",
    topics: ["Utilities", "Components", "Responsive UI"],
    learners: "3.9k",
  },
];

export default function LanguageCards() {
  const { lang } = useLanguage();
  const t = lang === "km" ? km : en;

  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-8 sm:px-6 lg:py-10">
      {/* Ambient floating blobs for a livelier, less corporate backdrop */}
      <div className="pointer-events-none absolute -left-10 top-0 -z-10 size-56 rounded-full bg-indigo-500/10 blur-3xl animate-float-slow dark:bg-indigo-500/15" />
      <div className="pointer-events-none absolute -right-10 top-20 -z-10 size-64 rounded-full bg-fuchsia-500/10 blur-3xl animate-float-medium dark:bg-fuchsia-500/10" />

      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2.5 flex items-center gap-1.5 rounded-full border border-indigo-200/70 bg-indigo-50 px-3 py-1 w-fit dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <Sparkles className="size-3 text-indigo-600 dark:text-indigo-300" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300">
              {languagesData.length.toString().padStart(2, "0")}{" "}
              {t.languageCards.badge}
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t.languageCards.titlePrefix}{" "}
            <span className="bg-linear-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-fuchsia-400">
              {t.languageCards.titleHighlight}
            </span>
          </h2>

          <p className="mt-1.5 max-w-xl text-sm font-medium leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            {t.languageCards.description}
          </p>
        </div>

        <button
          type="button"
          className="group flex w-fit items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300"
        >
          {t.languageCards.viewAll}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Language Grid — every card shares the same size, no featured/oversized tile */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {languagesData.map((language) => {
          const Icon = language.icon;
          const description =
            t.languageCards.items[
              language.id as keyof typeof t.languageCards.items
            ];

          return (
            <Link
              key={language.name}
              href={`/playground/editor?language=${language.query}`}
              className="group block focus:outline-none"
            >
              <Card
                className={`
                  relative flex h-full w-full flex-col justify-between overflow-hidden
                  rounded-2xl border border-slate-200/80 dark:border-slate-800
                  bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm
                  p-4 shadow-xs

                  transition-all duration-300 ease-out
                  hover:-translate-y-1.5 hover:shadow-2xl
                  ${language.glow}
                  ${language.hoverBg}
                `}
              >
                {/* Ghost numeral watermark — playful dashboard-style identity */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -top-4 select-none font-mono text-8xl font-black text-slate-900/4 transition-colors duration-300 group-hover:text-white/10 dark:text-white/4"
                >
                  {language.number}
                </span>

                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`
                          flex size-9 items-center justify-center rounded-xl border
                          transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110
                          group-hover:bg-white/20 group-hover:border-white/40
                          ${language.iconBg}
                        `}
                      >
                        <Icon className={`size-4.5 ${language.color}`} />
                      </div>

                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 transition-colors duration-300 group-hover:text-white/80 dark:text-slate-500">
                        <Flame className="size-3" />
                        {language.learners}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-white sm:text-xl dark:text-white">
                        {language.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-white/90 dark:text-slate-300 line-clamp-2">
                        {description}
                      </p>
                    </div>

                    {/* Topic Badges — every card reads as a real catalog entry */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {language.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors duration-300 ${language.chip}`}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-4 border-t border-slate-100 pt-2.5 transition-colors group-hover:border-white/30 dark:border-slate-800/80">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800 transition-colors duration-300 group-hover:text-white dark:text-slate-200">
                        {t.languageCards.exploreLessons}
                      </span>
                      <ArrowUpRight className="size-3.5 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
