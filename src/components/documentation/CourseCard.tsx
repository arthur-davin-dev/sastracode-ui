import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[16px] border border-slate-100 bg-white font-khmer">
      <div className="relative h-36 w-full bg-slate-900">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-md bg-primary-color px-2 py-1 text-[16px] font-medium text-white">
          ឥតគិតថ្លៃ
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-[24px] font-semibold text-slate-800 mt-1 mb-2">{course.title}</h3>
        <p className="line-clamp-3 flex-1 text-[18px] leading-relaxed text-slate-500 mb-2">
          {course.description}
        </p>

        <Link
          href={course.href}
          className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#002455] px-4 py-2 text-[16px] font-medium text-white transition-colors hover:bg-[#001738]"
        >
          {course.ctaLabel}
        </Link>
      </div>
    </article>
  );
}