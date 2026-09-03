"use client";

import type { Course } from "@/lib/course/courses";
import { useTranslation } from "@/hooks/useTranslations";

interface DetailBannerProps {
  course: Course;
}

export function DetailBanner({ course }: DetailBannerProps) {
  const t = useTranslation();
  const access = t.courses.card.access;
  const accessLabel =
    course.accessType === "PREMIUM"
      ? access.premium
      : course.accessType === "PRIVATE"
        ? access.private
        : course.accessType === "FREE"
          ? access.free
          : course.accessType;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary-color shadow-sm transition-colors duration-300 dark:bg-slate-900">
      <div className="absolute inset-0">
        <img src={course.image || "/assets/images/HTML & CSS.jpg"} alt="" className="h-full w-full object-cover opacity-25 dark:opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-primary-color/85 to-primary-color/75 backdrop-blur-[2px] dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/80" />
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
        <div className="mb-4 flex flex-wrap gap-2">
          {course.category && <span className="rounded-full border border-primary-color/30 bg-primary-color/20 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">{course.category}</span>}
          {course.accessType && <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white">{accessLabel}</span>}
        </div>
        <h1 className="max-w-2xl text-2xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl">{course.title}</h1>
        {course.description && <p className="mt-4 max-w-2xl line-clamp-3 text-sm leading-6 text-slate-200 sm:text-base">{course.description}</p>}
      </div>
    </div>
  );
}
