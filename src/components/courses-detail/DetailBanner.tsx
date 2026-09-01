import type { Course } from "@/lib/course/courses";
import { TranslatedText } from "@/components/i18n/TranslatedText";

interface DetailBannerProps {
  course: Course;
}

export function DetailBanner({ course }: DetailBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#002455] shadow-sm transition-colors duration-300 dark:bg-slate-900">
      <div className="absolute inset-0">
        <img src={course.image || "/assets/images/HTML & CSS.jpg"} alt="" className="h-full w-full object-cover opacity-25 dark:opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-[#002455]/85 to-indigo-950/75 backdrop-blur-[2px] dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/80" />
      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14">
        <div className="mb-4 flex flex-wrap gap-2">
          {course.category && <span className="rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3.5 py-1 text-xs font-semibold text-indigo-100 backdrop-blur-md">{course.category}</span>}
          {course.accessType && <span className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white">{course.accessType}</span>}
        </div>
        <TranslatedText as="h1" className="max-w-2xl text-2xl font-bold leading-snug text-white sm:text-4xl lg:text-5xl">{course.title}</TranslatedText>
        {course.description && <TranslatedText as="p" className="mt-4 max-w-2xl line-clamp-3 text-sm leading-6 text-slate-200 sm:text-base">{course.description}</TranslatedText>}
      </div>
    </div>
  );
}
