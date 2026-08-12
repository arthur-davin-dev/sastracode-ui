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
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {languagesData.map((langItem) => {
          const Icon = langItem.icon;
          return (
            <Card
              key={langItem.name}
              className="group relative p-5 flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Ambient Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Icon Container */}
                <div
                  className={`h-12 w-12 rounded-xl border flex items-center justify-center ${langItem.bg} mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-6 w-6 ${langItem.color}`} />
                </div>

                {/* Language Title */}
                <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {langItem.name}
                </h3>

                {/* Description - Updated to 18px */}
                <p className="text-[18px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed transition-colors duration-300">
                  {langItem.desc[lang] || langItem.desc.en}
                </p>
              </div>

              {/* Bottom Subtle Indicator Bar */}
              <div className="w-full h-0.5 mt-5 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-500/50 transition-colors duration-300" />
            </Card>
          );
        })}
      </div>
    </section>
  );
}