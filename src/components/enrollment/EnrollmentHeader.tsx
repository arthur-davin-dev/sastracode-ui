"use client";

import Image from "next/image";
import { Heart, Lock, BarChart2 } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface EnrollmentHeaderProps {
  course: Course;
}

const defaultInstructor = {
  name: "Chhay Davin",
  avatar: "/assets/images/Davin.DNG",
  tags: ["Premium Access", "Intermediate Level"],
};

export function EnrollmentHeader({ course }: EnrollmentHeaderProps) {
  const instructor = course.instructor ?? defaultInstructor;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 font-khmer transition-colors duration-300">
      
      {/* Title & Wishlist Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">
            {course.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 font-sans">
            {course.description}
          </p>
        </div>

        <button
          type="button"
          aria-label="Save to wishlist"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-red-500 dark:border-slate-800 dark:text-slate-500 dark:hover:border-slate-700 dark:hover:text-red-400"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Instructor Meta & Badges */}
      <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-slate-100 dark:border-slate-800/80 pt-5">
        
        {/* Instructor Info */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 ring-2 ring-slate-100 dark:ring-slate-800">
            <Image 
              src={instructor.avatar} 
              alt={instructor.name} 
              fill 
              className="object-cover" 
            />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-sans">Instructor</p>
            <p className="text-sm font-semibold text-gray-900">{instructor.name}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {instructor.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-xl bg-[#eef2ff] dark:bg-blue-950/60 px-3 py-1.5 text-xs font-medium text-[#002455] dark:text-blue-300"
            >
              {tag.toLowerCase().includes("premium") ? (
                <Lock className="h-3 w-3" />
              ) : (
                <BarChart2 className="h-3 w-3" />
              )}
              <span>{tag}</span>
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}