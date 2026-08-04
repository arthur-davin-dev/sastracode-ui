import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface CourseCardProps {
  course: Course;
}
export function CourseCard({ course }: CourseCardProps) {
  const isFree = Number(course.id) % 2 === 1;
  const buttonLabel = isFree ? "ឥតគិតថ្លៃ" : "ថ្នាក់បង់ថ្លៃ";
  
  const buttonClass = isFree
    ? "h-8 rounded-md bg-indigo-800 dark:bg-indigo-600 hover:bg-indigo-900 dark:hover:bg-indigo-500 text-white px-3 text-[13px] font-medium transition-colors"
    : "h-8 rounded-md bg-amber-400 dark:bg-amber-500 text-slate-950 hover:bg-amber-300 dark:hover:bg-amber-400 px-3 text-[13px] font-medium transition-colors";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:border-slate-700"
    >
      <div className="relative h-37.5 w-full ">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="p-5">
        <Badge
          variant="secondary"
          className="mb-3 bg-transparent p-0 text-[12px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 hover:bg-transparent"
        >
          {course.category}
        </Badge>

        <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-800 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {course.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors">
          {course.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-indigo-800 dark:text-indigo-400" />
            {course.lessons} មេរៀន
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-800 dark:text-indigo-400" />
            {course.duration}
          </span>
        </div>

        <Separator className="my-4 bg-slate-200/80 dark:bg-slate-800" />

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-0">
          <Button size="sm" className={buttonClass} tabIndex={-1}>
            {buttonLabel}
          </Button>

          <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-400 transition-transform group-hover:translate-x-0.5">
            ចាប់ផ្តើមរៀន →
          </span>
        </div>
      </div>
    </Link>
  );
}