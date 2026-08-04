import Image from "next/image";
import { Course } from "@/lib/course/courses";

interface DetailBannerProps {
  course: Course;
}

export function DetailBanner({ course }: DetailBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#002455] dark:bg-slate-900 font-khmer shadow-sm transition-colors duration-300">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <Image
          src={course.image || "/assets/images/HTML & CSS.jpg"}
          alt={course.title}
          fill
          className="object-cover opacity-25 dark:opacity-20"
          priority
        />
      </div>

      {/* Gradient Overlay for Readable Text */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-[#002455]/85 to-indigo-950/75 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/80 backdrop-blur-[2px]" />

      {/* Hero Content */}
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
        {course.category && (
          <span className="mb-3.5 inline-block rounded-full bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1 text-xs font-semibold text-indigo-200 dark:text-indigo-300 backdrop-blur-md">
            {course.category}
          </span>
        )}
        <h1 className="max-w-2xl text-2xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl">
          {course.title}
        </h1>
      </div>

    </div>
  );
}
