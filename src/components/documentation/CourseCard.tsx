import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const coverFileId = course.coverFileId.trim();
  const coverSrc = !coverFileId
    ? "/images/html.png"
    : coverFileId.startsWith("/") || /^https?:\/\//i.test(coverFileId)
      ? coverFileId
      : `/api/files/${encodeURIComponent(coverFileId)}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 font-khmer transition-all duration-300 ease-in-out hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none">
      
      {/* Top Media Section */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={coverSrc}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* Badge */}
        <span className="absolute left-3 top-3 z-10 rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white tracking-wide shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
          ឥតគិតថ្លៃ
        </span>
      </div>

      {/* Main Details Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1 mb-2">
          {course.title}
        </h3>
        
        {/* Description */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-5">
          {course.description}
        </p>

        {/* Action Button Link */}
        <Link
          href={course.href}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98]"
        >
          <span>{course.ctaLabel}</span>
          
          {/* Micro-arrow icon */}
          <svg 
            className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
      </div>
    </article>
  );
}
