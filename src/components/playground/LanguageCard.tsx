"use client";

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
  CheckCircle2,
} from "lucide-react";

const languagesData = [
  {
    id: "html",
    name: "HTML",
    number: "01",
    icon: Layout,
    color: "text-orange-600 dark:text-orange-400 group-hover:text-white",
    iconBg:
      "bg-orange-50 border-orange-200/80 dark:bg-orange-500/10 dark:border-orange-500/30",
    hoverBg: "hover:bg-orange-600 hover:border-orange-600",
    topics: ["Semantic HTML", "Forms & Inputs", "SEO & Meta", "Accessibility"],
  },
  {
    id: "css",
    name: "CSS",
    number: "02",
    icon: FileCode2,
    color: "text-blue-600 dark:text-blue-400 group-hover:text-white",
    iconBg:
      "bg-blue-50 border-blue-200/80 dark:bg-blue-500/10 dark:border-blue-500/30",
    hoverBg: "hover:bg-blue-600 hover:border-blue-600",
  },
  {
    id: "javascript",
    name: "JavaScript",
    number: "03",
    icon: Code2,
    color: "text-amber-600 dark:text-amber-400 group-hover:text-white",
    iconBg:
      "bg-amber-50 border-amber-200/80 dark:bg-amber-500/10 dark:border-amber-500/30",
    hoverBg: "hover:bg-amber-600 hover:border-amber-600",
  },
  {
    id: "python",
    name: "Python",
    number: "04",
    icon: Terminal,
    color: "text-emerald-600 dark:text-emerald-400 group-hover:text-white",
    iconBg:
      "bg-emerald-50 border-emerald-200/80 dark:bg-emerald-500/10 dark:border-emerald-500/30",
    hoverBg: "hover:bg-emerald-600 hover:border-emerald-600",
  },
  {
    id: "java",
    name: "Java",
    number: "05",
    icon: Cpu,
    color: "text-rose-600 dark:text-rose-400 group-hover:text-white",
    iconBg:
      "bg-rose-50 border-rose-200/80 dark:bg-rose-500/10 dark:border-rose-500/30",
    hoverBg: "hover:bg-rose-600 hover:border-rose-600",
  },
];

export default function LanguageCards() {
  const { lang } = useLanguage();
  const t = lang === "km" ? km : en;

  return (
    <section className="font-sans mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-12">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="h-0.5 w-5 bg-indigo-600 dark:bg-indigo-400" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300">
              {languagesData.length.toString().padStart(2, "0")}{" "}
              {t.languageCards.badge}
            </span>
          </div>

          <h2 className="max-w-2xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {t.languageCards.titlePrefix}{" "}
            <span className="text-indigo-700 dark:text-indigo-400">
              {t.languageCards.titleHighlight}
            </span>
          </h2>

          <p className="mt-1.5 max-w-xl text-xs sm:text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
            {t.languageCards.description}
          </p>
        </div>

        <button
          type="button"
          className="group flex w-fit items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800 transition-colors hover:text-indigo-700 dark:text-white dark:hover:text-indigo-300"
        >
          {t.languageCards.viewAll}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {languagesData.map((language, index) => {
          const Icon = language.icon;
          const isFeatured = index === 0;
          const description =
            t.languageCards.items[
              language.id as keyof typeof t.languageCards.items
            ];

          return (
            <Card
              key={language.name}
              className={`
                group relative flex flex-col justify-between overflow-hidden
                rounded-2xl border border-indigo-100 dark:border-slate-800
                bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm
                p-4 sm:p-5 shadow-xs

                transition-all duration-300 ease-out
                hover:-translate-y-1 hover:shadow-lg
                ${language.hoverBg}

                ${isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:p-6" : ""}
              `}
            >
              <div className="relative flex h-full flex-col">
                {/* Card Top Header */}
                <div className="flex items-start justify-between">
                  <div
                    className={`
                      flex items-center justify-center rounded-xl border
                      transition-all duration-300 group-hover:scale-105
                      group-hover:bg-white/20 group-hover:border-white/40
                      ${language.iconBg}
                      ${isFeatured ? "size-11" : "size-9"}
                    `}
                  >
                    <Icon
                      className={`
                        ${language.color}
                        ${isFeatured ? "size-5" : "size-4"}
                      `}
                    />
                  </div>

                  <span className="font-mono text-xs font-bold text-slate-400 transition-colors duration-300 group-hover:text-white/90 dark:text-slate-500">
                    {language.number}
                  </span>
                </div>

                {/* FEATURED HTML CARD */}
                {isFeatured ? (
                  <div className="flex flex-1 flex-col">
                    <div className="mt-3">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 transition-colors group-hover:text-white dark:text-orange-400">
                          {t.languageCards.startHere}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300 transition-colors group-hover:bg-white/80 dark:bg-slate-700" />
                        <span className="text-[11px] font-semibold text-slate-500 transition-colors group-hover:text-white/90 dark:text-slate-400">
                          {t.languageCards.beginner}
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-white dark:text-white">
                        {language.name}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-white/90 dark:text-slate-300">
                        {description}
                      </p>
                    </div>

                    {/* Code Editor Box */}
                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-800 dark:bg-black group-hover:border-white/20">
                      <div className="flex items-center gap-1.5 border-b border-slate-800/80 px-3 py-1.5">
                        <span className="size-2 rounded-full bg-red-500/80" />
                        <span className="size-2 rounded-full bg-amber-500/80" />
                        <span className="size-2 rounded-full bg-emerald-500/80" />
                        <span className="ml-auto font-mono text-[10px] font-semibold text-slate-400">
                          index.html
                        </span>
                      </div>

                      <div className="space-y-0.5 px-3 py-2.5 font-mono text-xs font-bold leading-tight">
                        <div>
                          <span className="text-purple-400">&lt;</span>
                          <span className="text-red-400">html</span>
                          <span className="text-purple-400">&gt;</span>
                        </div>
                        <div className="pl-3">
                          <span className="text-purple-400">&lt;</span>
                          <span className="text-red-400">h1</span>
                          <span className="text-purple-400">&gt;</span>
                          <span className="text-white">Hello World</span>
                          <span className="text-purple-400">&lt;/h1&gt;</span>
                        </div>
                        <div>
                          <span className="text-purple-400">&lt;/</span>
                          <span className="text-red-400">html</span>
                          <span className="text-purple-400">&gt;</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Output Preview */}
                    <div className="mt-2.5 rounded-xl border border-indigo-100/70 bg-white/70 p-2.5 transition-colors group-hover:bg-white/10 group-hover:border-white/30 dark:border-slate-800 dark:bg-slate-950/60">
                      <div className="mb-1 flex items-center justify-between text-[10px] font-bold text-slate-500 transition-colors group-hover:text-white/90 dark:text-slate-400">
                        <span>{t.languageCards.outputPreview}</span>
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700 transition-colors group-hover:bg-white/20 group-hover:text-white dark:bg-emerald-500/20 dark:text-emerald-400">
                          {t.languageCards.rendered}
                        </span>
                      </div>
                      <div className="rounded-lg border border-slate-200/60 bg-white p-2 text-xs font-bold text-slate-900 shadow-2xs group-hover:bg-white group-hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                        Hello World
                      </div>
                    </div>

                    {/* Topic Badges */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {language.topics?.map((topic) => (
                        <span
                          key={topic}
                          className="flex items-center gap-1 rounded-full border border-indigo-100 bg-white/80 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700 transition-colors group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white dark:border-indigo-900/40 dark:bg-indigo-950/40 dark:text-indigo-300"
                        >
                          <CheckCircle2 className="size-2.5 text-orange-500 group-hover:text-white" />
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 transition-colors group-hover:border-white/30 dark:border-slate-800/80">
                        <span className="text-xs font-bold text-slate-800 transition-colors duration-300 group-hover:text-white dark:text-slate-200">
                          {t.languageCards.exploreLessons}
                        </span>
                        <ArrowUpRight className="size-3.5 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* NORMAL CARDS */
                  <div className="flex flex-1 flex-col">
                    <div className="mt-3">
                      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-white dark:text-white">
                        {language.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium leading-relaxed text-slate-600 transition-colors group-hover:text-white/90 dark:text-slate-300">
                        {description}
                      </p>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 transition-colors group-hover:border-white/30 dark:border-slate-800/80">
                        <span className="text-xs font-bold text-slate-800 transition-colors group-hover:text-white dark:text-slate-200">
                          {t.languageCards.exploreLessons}
                        </span>

                        <ArrowUpRight className="size-3.5 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}