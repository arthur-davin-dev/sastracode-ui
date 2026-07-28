"use client";

import { GraduationCap, CheckCircle2, Hourglass, Lock, Award, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCard = {
  icon: React.ElementType;
  value: number;
  label: string;
  badge: string;
  color: "yellow" | "red" | "orange" | "gray";
};

const stats: StatCard[] = [
  { icon: GraduationCap, value: 12, label: "វិញ្ញាបនបត្រដែលទទួលបាន", badge: "សរុប", color: "yellow" },
  { icon: CheckCircle2, value: 8, label: "វគ្គសិក្សាបានបញ្ចប់", badge: "ទទួលបានហើយ", color: "red" },
  { icon: Hourglass, value: 2, label: "វគ្គសិក្សាកំពុងបន្ត", badge: "កំពុងសិក្សា", color: "orange" },
  { icon: Lock, value: 2, label: "វគ្គសិក្សាជាប់សោ", badge: "មិនទាន់ចាប់ផ្តើម", color: "gray" },
];

const colorMap = {
  yellow: {
    badge: "bg-yellow-400/20 text-primary-color dark:text-yellow-300 border border-yellow-400/50",
    bar: "bg-yellow-400",
    iconBg: "bg-yellow-400/20 text-slate-900 dark:text-yellow-400 border border-yellow-400/50",
  },
  red: {
    badge: "bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/30",
    bar: "bg-red-600",
    iconBg: "bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/30",
  },
  orange: {
    badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30",
    bar: "bg-orange-500",
    iconBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30",
  },
  gray: {
    badge: "bg-slate-200/60 dark:bg-slate-800 text-primary-color opacity-70 border border-slate-300 dark:border-slate-700",
    bar: "bg-slate-400 dark:bg-slate-600",
    iconBg: "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700",
  },
};

export function CertificateStats() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-8 border-2 border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
      
      {/* Top Accent Gradient Ribbon (Red Secondary & Yellow Accent) */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          {/* Title (text-2xl) */}
          <h1 className="text-2xl font-bold text-primary-color flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary-color/20 border border-primary-color/50 flex items-center justify-center">
              <Award className="h-7 w-7 text-secondary-color" />
            </div>
            វិញ្ញាបនបត្រ
          </h1>
          
          {/* Description (text-lg) */}
          <p className="text-lg text-primary-color opacity-80 pl-1">
            មើល និងគ្រប់គ្រងវិញ្ញាបនបត្រនិងស្ថានភាពសិក្សារបស់អ្នក
          </p>
        </div>

        {/* Decorative Sparkle Badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-yellow-400/10 border border-yellow-400/40 text-primary-color font-bold text-lg">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          <span>បច្ចុប្បន្នភាពចុងក្រោយ</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
        {stats.map((s) => {
          const c = colorMap[s.color];
          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Card Header with Icon & Badge */}
              <div className="mb-4 flex items-start justify-between">
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-110", c.iconBg)}>
                  <s.icon className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <span className={cn("rounded-full px-3 py-1 text-lg font-bold shadow-xs", c.badge)}>
                  {s.badge}
                </span>
              </div>

              {/* Stat Value (text-2xl / 3xl) */}
              <div className="text-3xl font-extrabold text-primary-color">
                {s.value}
              </div>

              {/* Stat Label (text-lg) */}
              <div className="mt-1 text-lg font-medium text-primary-color opacity-80 leading-snug">
                {s.label}
              </div>

              {/* Bottom Colored Accent Bar */}
              <span className={cn("absolute inset-x-0 bottom-0 h-1.5 transition-all duration-300 group-hover:h-2", c.bar)} />
            </div>
          );
        })}
      </div>
    </section>
  );
}