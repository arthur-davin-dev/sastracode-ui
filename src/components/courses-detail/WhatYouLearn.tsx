"use client";

import { CheckCircle2 } from "lucide-react";
import type { Course } from "@/lib/course/courses";
import { useTranslation } from "@/hooks/useTranslations";

interface WhatYouLearnProps {
  course: Course;
}

export function WhatYouLearn({ course }: WhatYouLearnProps) {
  const t = useTranslation();
  const points = course.learningPoints?.filter(Boolean) ?? [];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold leading-snug text-primary-color sm:text-2xl">{t.courses.detail.summary.heading}</h2>
      <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{course.description || t.courses.card.noDescription}</p>
      {points.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{point}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
