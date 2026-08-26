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
  CheckCircle2,
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
    topics: ["Semantic HTML", "Forms & Inputs", "Accessibility"],
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
    topics: ["Selectors", "Layout", "Responsive Design"],
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
    topics: ["Variables", "Functions", "Async"],
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
    topics: ["Servers", "APIs", "Runtime"],
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
    topics: ["Syntax", "Functions", "Automation"],
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
    topics: ["Classes", "OOP", "Concurrency"],
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
    topics: ["Utilities", "Components", "Responsive UI"],
  },
];

export default function LanguageCards() {
  const { lang } = useLanguage();
  const t = lang === "km" ? km : en;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
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

          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t.languageCards.titlePrefix}{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
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
            <Link
              key={language.name}
              href={`/playground/editor?language=${language.query}`}
              className={`group block focus:outline-none ${
                isFeatured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <Card
                className={`
                  relative flex h-full w-full flex-col justify-between overflow-hidden
                  rounded-xl border border-slate-200/80 dark:border-slate-800
                  bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm
                  p-4 shadow-xs

                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-xl
                  ${language.hoverBg}
                `}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`
                          flex items-center justify-center rounded-xl border
                          transition-all duration-300 group-hover:scale-105
                          group-hover:bg-white/20 group-hover:border-white/40
                          ${language.iconBg}
                          ${isFeatured ? "size-10" : "size-8"}
                        `}
                      >
                        <Icon
                          className={`
                            ${language.color}
                            ${isFeatured ? "size-5" : "size-4"}
                          `}
                        />
                      </div>

                      <span className="font-mono text-xs font-bold text-slate-400 transition-colors duration-300 group-hover:text-white/80 dark:text-slate-500">
                        {language.number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-3">
                      {isFeatured && (
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 transition-colors group-hover:text-white dark:text-orange-400">
                            {t.languageCards.startHere}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-slate-300 transition-colors group-hover:bg-white/80 dark:bg-slate-700" />
                          <span className="text-[11px] font-semibold text-slate-500 transition-colors group-hover:text-white/90 dark:text-slate-400">
                            {t.languageCards.beginner}
                          </span>
                        </div>
                      )}

                      <h3
                        className={`font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-white dark:text-white ${
                          isFeatured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                        }`}
                      >
                        {language.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-white/90 dark:text-slate-300 line-clamp-2 sm:text-[15px]">
                        {description}
                      </p>
                    </div>

                    {/* Featured HTML Code Box */}
                    {isFeatured && (
                      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 dark:border-slate-800 dark:bg-black group-hover:border-white/20">
                        <div className="flex items-center gap-1.5 border-b border-slate-800/80 px-2.5 py-1">
                          <span className="size-1.5 rounded-full bg-red-500/80" />
                          <span className="size-1.5 rounded-full bg-amber-500/80" />
                          <span className="size-1.5 rounded-full bg-emerald-500/80" />
                          <span className="ml-auto font-mono text-[9px] font-semibold text-slate-400">
                            index.html
                          </span>
                        </div>

                        <div className="space-y-0.5 px-2.5 py-2 font-mono text-[11px] font-bold leading-tight">
                          <div>
                            <span className="text-purple-400">&lt;</span>
                            <span className="text-red-400">h1</span>
                            <span className="text-purple-400">&gt;</span>
                            <span className="text-white">Hello World</span>
                            <span className="text-purple-400">&lt;/h1&gt;</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Featured Topic Badges */}
                    {isFeatured && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {language.topics?.map((topic) => (
                          <span
                            key={topic}
                            className="flex items-center gap-1 rounded-full border border-orange-200/80 bg-orange-50/50 px-2 py-0.5 text-[10px] font-semibold text-orange-700 transition-colors group-hover:bg-white/20 group-hover:border-white/30 group-hover:text-white dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300"
                          >
                            <CheckCircle2 className="size-2.5 text-orange-500 group-hover:text-white" />
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
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