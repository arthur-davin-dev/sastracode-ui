"use client";

import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { Code2, Layout, FileCode2, Terminal, Cpu } from "lucide-react";

const languagesData = [
  {
    name: "HTML",
    desc: {
      en: "Structure & Markup",
      km: "រចនាសម្ព័ន្ធ និង ម៉ាកអាប់",
    },
    icon: Layout,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10 dark:bg-orange-500/15 border-orange-200 dark:border-orange-500/30",
  },
  {
    name: "CSS",
    desc: {
      en: "Styles & Layouts",
      km: "រចនាប័ទ្ម និង ប្លង់ទំព័រ",
    },
    icon: FileCode2,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-500/15 border-blue-200 dark:border-blue-500/30",
  },
  {
    name: "JavaScript",
    desc: {
      en: "Logic & Interactivity",
      km: "លូជិក និង អន្តរកម្ម",
    },
    icon: Code2,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-200 dark:border-amber-500/30",
  },
  {
    name: "Python",
    desc: {
      en: "Data & Automation",
      km: "ទិន្នន័យ និង អូតូម៉ាតកម្ម",
    },
    icon: Terminal,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-200 dark:border-emerald-500/30",
  },
  {
    name: "Java",
    desc: {
      en: "Enterprise & Backend",
      km: "ប្រព័ន្ធសហគ្រាស និង Backend",
    },
    icon: Cpu,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10 dark:bg-rose-500/15 border-rose-200 dark:border-rose-500/30",
  },
];

export default function LanguageCards() {
  const { lang } = useLanguage();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 transition-colors duration-300">
      {/* Section header */}
      <div className="mb-10 flex items-end justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 dark:text-indigo-400">
            {languagesData.length.toString().padStart(2, "0")} Languages
          </span>
          <h2 className="mt-2 font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100 tracking-tight">
            Built for how you write code
          </h2>
        </div>
      </div>

      {/* Layout: featured first tile + staggered rhythm grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-fr">
        {languagesData.map((langItem, i) => {
          const Icon = langItem.icon;
          const isFeatured = i === 0;
          // gentle vertical rhythm on desktop so the grid doesn't feel like a flat wall
          const offset =
            i > 0 ? (i % 3 === 1 ? "lg:mt-6" : i % 3 === 2 ? "lg:mt-3" : "") : "";

          return (
            <Card
              key={langItem.name}
              className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden ${offset} ${
                isFeatured
                  ? "p-7 sm:col-span-2 lg:row-span-2 lg:col-span-2"
                  : "p-5"
              }`}
            >
              {/* Gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none [background:linear-gradient(135deg,theme(colors.indigo.400/.5),transparent_40%,transparent_60%,theme(colors.fuchsia.400/.4))] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] p-px" />

              {/* Ambient glow */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative">
                <div
                  className={`flex items-center justify-center rounded-xl border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:-rotate-3 ${
                    langItem.bg
                  } ${isFeatured ? "h-16 w-16 mb-6" : "h-12 w-12 mb-4"}`}
                >
                  <Icon className={`${langItem.color} ${isFeatured ? "h-8 w-8" : "h-6 w-6"}`} />
                </div>

                <h3
                  className={`font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${
                    isFeatured ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  {langItem.name}
                </h3>

                <p
                  className={`text-slate-500 dark:text-slate-400 mt-2 leading-relaxed transition-colors duration-300 ${
                    isFeatured ? "text-base max-w-md" : "text-[15px]"
                  }`}
                >
                  {langItem.desc[lang] || langItem.desc.en}
                </p>
              </div>

              <div className="relative w-full h-0.5 mt-5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="absolute inset-y-0 left-1/2 w-0 group-hover:w-full group-hover:left-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500 ease-out rounded-full" />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}