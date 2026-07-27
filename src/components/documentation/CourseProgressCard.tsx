"use client";

import Link from "next/link";
import Image from "next/image";
import { CourseProgress } from "@/types/course";

interface CourseProgressCardProps {
  progress: CourseProgress;
}

export default function CourseProgressCard({ progress }: CourseProgressCardProps) {
  // Helper to get matching dev icons from web CDN based on course titles (e.g., Java, JavaScript, Python)
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
  // Fallback initial abbreviation (e.g., "Java Programming" -> "JV")
  const fallbackText = progress.courseTitle.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="font-khmer text-primary-color group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 ease-in-out hover:border-blue-200 hover:bg-slate-50/50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4 sm:items-center">
        {/* Dynamic Logo/Avatar Badge */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2.5 transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:bg-white border border-transparent group-hover:border-slate-100">
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
            <span className="text-xs font-bold text-slate-500">{fallbackText}</span>
          )}
        </div>

        {/* Course Details */}
        <div className="flex flex-col gap-1.5">
          <p className="text-[16px] font-semibold text-slate-800 transition-colors duration-300 group-hover:text-blue-900 sm:text-[18px]">
            {progress.courseTitle}
          </p>
          
          <p className="text-[14px] text-slate-400 sm:text-[15px]">
            {progress.lessonLabel}
          </p>
          
          <div className="flex items-center gap-3 mt-0.5">
            {/* Progress Bar Track */}
            <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-100 sm:w-48">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
            <p className="text-[14px] font-medium text-slate-500">
              {progress.percent}% បានបញ្ចប់
            </p>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <Link
        href={progress.href}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-blue-800 px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 group-hover:translate-x-0.5 active:scale-[0.98] sm:w-auto"
      >
        បន្តរៀន
      </Link>
    </div>
  );
}