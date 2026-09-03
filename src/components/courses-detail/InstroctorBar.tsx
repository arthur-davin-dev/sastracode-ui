"use client";

import Image from "next/image";
import { BookOpen, Users } from "lucide-react";
import type { Course } from "@/lib/course/courses";
import { useTranslation } from "@/hooks/useTranslations";

interface InstructorBarProps {
  course: Course;
}

export function InstructorBar({ course }: InstructorBarProps) {
  const t = useTranslation();
  const card = t.courses.card;
  const instructor = course.instructor;

  const accessLabel =
    course.accessType === "PREMIUM"
      ? card.access.premium
      : course.accessType === "PRIVATE"
        ? card.access.private
        : course.accessType === "FREE"
          ? card.access.free
          : course.accessType;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/80 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <Image src={instructor?.avatar || "/images/sastra_code_logo.png"} alt={instructor?.name || card.instructorAlt} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400">{card.instructorAlt}</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{instructor?.name || card.defaultInstructor}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
        {course.level && <span className="rounded-full bg-primary-color/10 px-3 py-1 font-medium text-primary-color">{card.level[course.level]}</span>}
        {course.accessType && <span className="rounded-full bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800">{accessLabel}</span>}
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800"><BookOpen className="h-3.5 w-3.5" />{course.lessons} {card.lessonsUnit}</span>
        {course.enrollmentCount !== undefined && <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800"><Users className="h-3.5 w-3.5" />{course.enrollmentCount}</span>}
      </div>
    </div>
  );
}
