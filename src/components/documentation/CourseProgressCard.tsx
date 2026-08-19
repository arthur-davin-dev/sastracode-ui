"use client";

import Link from "next/link";
import Image from "next/image";
import { CourseProgress } from "@/types/course";

interface CourseProgressCardProps {
  progress: CourseProgress;
}

<<<<<<< HEAD
export default function CourseProgressCard({ progress }: CourseProgressCardProps) {
  // Helper to get matching dev icons from web CDN based on course titles
=======
export default function CourseProgressCard({
  progress,
}: CourseProgressCardProps) {
  // Helper to get matching dev icons from web CDN based on course titles (e.g., Java, JavaScript, Python)
>>>>>>> origin/narea
  const getIconUrl = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("java") && !lowerTitle.includes("script")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
    }
    if (lowerTitle.includes("javascript") || lowerTitle.includes("js")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    }
    if (lowerTitle.includes("python")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    }
    if (lowerTitle.includes("html")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg";
    }
    if (lowerTitle.includes("css")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg";
    }
    return null;
  };

  const iconUrl = getIconUrl(progress.courseTitle);
<<<<<<< HEAD
  const fallbackText = progress.courseTitle.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="font-khmer group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 ease-in-out hover:border-blue-200 hover:bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-slate-700 dark:hover:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4 sm:items-center">
        {/* Dynamic Logo/Avatar Badge */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 p-2.5 transition-all duration-300 ease-in-out border border-transparent group-hover:scale-105 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:border-slate-100 dark:group-hover:border-slate-600">
=======
  // Fallback initial abbreviation (e.g., "Java Programming" -> "JV")
  const fallbackText = progress.courseTitle
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 font-khmer text-primary-color transition-all duration-300 ease-in-out hover:border-blue-200 hover:bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4 sm:items-center">
        {/* Dynamic Logo/Avatar Badge */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-transparent bg-slate-50 p-2.5 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:border-slate-100 group-hover:bg-white dark:bg-slate-800 dark:group-hover:border-slate-700 dark:group-hover:bg-slate-900">
>>>>>>> origin/narea
          {iconUrl ? (
            <div className="relative h-full w-full">
              <Image
                src={iconUrl}
                alt={progress.courseTitle}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ) : (
<<<<<<< HEAD
            <span className="text-xs font-bold text-slate-500 dark:text-slate-300">{fallbackText}</span>
=======
            <span className="text-xs font-bold text-slate-500">
              {fallbackText}
            </span>
>>>>>>> origin/narea
          )}
        </div>

        {/* Course Details */}
        <div className="flex flex-col gap-1.5">
<<<<<<< HEAD
          <p className="text-[16px] font-semibold text-slate-800 dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-indigo-400 sm:text-[18px]">
            {progress.courseTitle}
          </p>
          
          <p className="text-[14px] text-slate-400 dark:text-slate-400 sm:text-[15px]">
=======
          <p className="text-[16px] font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-900 dark:text-slate-100 dark:group-hover:text-blue-300 sm:text-[18px]">
            {progress.courseTitle}
          </p>

          <p className="text-[14px] text-slate-400 dark:text-slate-300 sm:text-[15px]">
>>>>>>> origin/narea
            {progress.lessonLabel}
          </p>

          <div className="mt-0.5 flex items-center gap-3">
            {/* Progress Bar Track */}
            <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 sm:w-48">
              <div
                className="h-full rounded-full bg-blue-600 dark:bg-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
<<<<<<< HEAD
            <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
=======
            <p className="text-[14px] font-medium text-slate-500 dark:text-slate-300">
>>>>>>> origin/narea
              {progress.percent}% បានបញ្ចប់
            </p>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <Link
        href={progress.href}
<<<<<<< HEAD
        className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-blue-800 dark:bg-indigo-600 hover:bg-blue-900 dark:hover:bg-indigo-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out group-hover:translate-x-0.5 active:scale-[0.98] sm:w-auto"
=======
        className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-blue-800 px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 group-hover:translate-x-0.5 active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
>>>>>>> origin/narea
      >
        បន្តរៀន
      </Link>
    </div>
  );
}
