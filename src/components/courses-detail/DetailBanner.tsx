import Image from "next/image";
import { Course } from "@/lib/course/courses";

interface DetailBannerProps {
  course: Course;
}

export function DetailBanner({ course }: DetailBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary-color mt-15">
      <div className="absolute inset-0">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary-color via-primary-color/95 to-blue-900/60" />
      <div className="relative px-8 py-10 sm:py-14">
        <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-200 font-(family-name:--font-sans)">
          {course.category}
        </span>
        <h1 className="max-w-2xl text-xl font-bold leading-relaxed text-white sm:text-5xl font-(family-name:--font-sans)">
          {course.title}
        </h1>
      </div>
    </div>
  );
}