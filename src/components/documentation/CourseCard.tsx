"use client";

import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white font-khmer transition-all duration-300 ease-in-out hover:border-blue-200 hover:bg-slate-50/30 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:bg-slate-800/80">
      {/* Top Media Section */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900 dark:bg-slate-950">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badge with subtle hover lifting */}
        <span className="absolute left-3 top-3 z-10 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white tracking-wide shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
          ឥតគិតថ្លៃ
        </span>
      </div>

      {/* Main Details Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title with fluid color swap */}
        <h3 className="mb-2 line-clamp-1 text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-blue-900 dark:text-slate-100 dark:group-hover:text-blue-300">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mb-5 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400 dark:text-slate-300">
          {course.description}
        </p>

        {/* Action Button Link */}
        <Link
          href={course.href}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          <span>{course.ctaLabel}</span>
          {/* Micro-arrow icon that glides rightwards on hover */}
          <svg
            className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
