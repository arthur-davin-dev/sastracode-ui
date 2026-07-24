import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-36 w-full bg-slate-900">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-md bg-purple-600/90 px-2 py-1 text-[11px] font-medium text-white">
          កាតម្រង
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-slate-800">{course.title}</h3>
        <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-slate-500">
          {course.description}
        </p>

        <Link
          href={course.href}
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-900"
        >
          {course.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
