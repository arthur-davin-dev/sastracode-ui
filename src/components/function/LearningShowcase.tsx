"use client";

import { Award, Code2, MessageSquare, PlayCircle, Search, Users } from "lucide-react";

import PlatformShowcase from "@/components/home/PlatformShowcase";
import { useTranslation } from "@/hooks/useTranslations";

const CAPABILITY_ICONS = [Code2, PlayCircle, MessageSquare, Award, Users, Search];

export default function LearningShowcase() {
  const t = useTranslation();
  const section = t.learningShowcase;

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden py-10 transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-khmer text-[24px] font-extrabold leading-tight tracking-tight text-primary-color dark:text-white sm:text-3xl lg:text-[40px]">
            {section.titleLead}
            <span className="text-secondary-color dark:text-blue-400">
              {section.titleHighlight}
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl font-khmer text-[14px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            <span className="block">{section.subtitleLine1}</span>
            <span className="block">{section.subtitleLine2}</span>
          </p>
        </div>

        {/* Central hub + feature cards */}
        <div className="mt-5 sm:mt-7">
          <PlatformShowcase features={section.cards} variant="section" />
        </div>

        {/* Bottom capability bar */}
        <div className="mt-5 sm:mt-7 rounded-2xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm transition-colors dark:border-white/10 dark:bg-white/[0.03] sm:px-6">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
            {section.capabilities.map((cap, i) => {
              const Icon = CAPABILITY_ICONS[i] ?? Code2;

              return (
                <li key={`${cap.line1}-${cap.line2}`} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="font-khmer text-[12px] font-medium leading-snug text-slate-700 dark:text-slate-200">
                    {cap.line1}
                    <br />
                    {cap.line2}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
