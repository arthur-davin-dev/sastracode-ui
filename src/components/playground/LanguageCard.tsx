"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { en } from "@/locale/en";
import { km } from "@/locale/km";
import {
  ArrowRight,
  Code2,
  FileCode2,
  Layout,
  Terminal,
  Cpu,
  Sparkles,
} from "lucide-react";

const languagesData = [
  {
    id: "html",
    name: "HTML",
    query: "html",
    number: "01",
    icon: Layout,
    topics: ["Semantic HTML", "Forms & Inputs", "Accessibility"],
    learners: "3.2k",
    rotate: "-rotate-2",
    brandBg: "bg-orange-600 dark:bg-orange-500",
    brandShadow: "shadow-orange-500/25",
  },
  {
    id: "javascript",
    name: "JavaScript",
    query: "javascript",
    number: "03",
    icon: Code2,
    topics: ["Variables", "Functions", "Async"],
    learners: "4.1k",
    rotate: "-rotate-1",
    brandBg: "bg-amber-500 dark:bg-amber-400",
    brandShadow: "shadow-amber-500/25",
  },
  {
    id: "nodejs",
    name: "Node.js",
    query: "nodejs",
    number: "04",
    icon: Terminal,
    topics: ["Servers", "APIs", "Runtime"],
    learners: "1.6k",
    rotate: "rotate-2",
    brandBg: "bg-emerald-600 dark:bg-emerald-500",
    brandShadow: "shadow-emerald-500/25",
  },
  {
    id: "python",
    name: "Python",
    query: "python",
    number: "05",
    icon: Terminal,
    topics: ["Syntax", "Functions", "Automation"],
    learners: "5.4k",
    rotate: "-rotate-2",
    brandBg: "bg-sky-600 dark:bg-sky-500",
    brandShadow: "shadow-sky-500/25",
  },
  {
    id: "java",
    name: "Java",
    query: "java",
    number: "06",
    icon: Cpu,
    topics: ["Classes", "OOP", "Concurrency"],
    learners: "2.1k",
    rotate: "rotate-1",
    brandBg: "bg-red-600 dark:bg-red-500",
    brandShadow: "shadow-red-500/25",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    query: "tailwind%20css",
    number: "07",
    icon: Layout,
    topics: ["Utilities", "Components", "Responsive UI"],
    learners: "3.9k",
    rotate: "-rotate-1",
    brandBg: "bg-cyan-500 dark:bg-cyan-400",
    brandShadow: "shadow-cyan-500/25",
  },
];

export default function LanguageCards() {
  const { lang } = useLanguage();
  const t = lang === "km" ? km : en;

  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-8 sm:px-6 lg:py-10">
      {/* Background ambient lights */}
      <div className="pointer-events-none absolute -left-10 top-0 -z-10 size-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-20 -z-10 size-64 rounded-full bg-primary/10 blur-3xl" />

      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2.5 flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 w-fit">
            <Sparkles className="size-3 text-primary" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              {languagesData.length.toString().padStart(2, "0")}{" "}
              {t.languageCards.badge}
            </span>
          </div>

          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t.languageCards.titlePrefix}{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t.languageCards.titleHighlight}
            </span>
          </h2>

          <p className="mt-1.5 max-w-xl text-sm font-medium leading-relaxed text-slate-500 sm:text-base dark:text-slate-400">
            {t.languageCards.description}
          </p>
        </div>
      </div>

      {/* Tilted Card Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              className={`group block focus:outline-none transition-transform duration-300 ease-out hover:z-10 hover:scale-105 ${language.rotate} hover:rotate-0`}
            >
              <Card className="relative flex min-h-[220px] w-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-none dark:hover:border-primary/40">
                <div>
                  {/* Technology Brand Color Rounded Container */}
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${language.brandBg} ${language.brandShadow}`}
                  >
                    <Icon className="size-6 stroke-[2.2]" />
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {language.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2 dark:text-slate-400">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Topics & Metadata */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <div className="flex flex-wrap gap-1">
                    {language.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <span className="text-[11px] font-medium text-slate-400">
                    {language.learners} learners
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}