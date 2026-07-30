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
    ? "h-8 rounded-md bg-[#06295c] px-3 text-[13px] hover:bg-[#082f6e] font-khmer"
    : "h-8 rounded-md bg-amber-400 px-3 text-[13px] font-khmer text-slate-950 hover:bg-amber-300";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
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

      <div className="p-4">
        <Badge
          variant="secondary"
          className="mb-3 bg-transparent p-0 text-[12px] font-semibold uppercase tracking-wider text-pink-600 hover:bg-transparent"
        >
          {course.category}
        </Badge>

        <h3 className="mb-2 text-[16px] font-semibold text-gray-900--font-google-sans">
          {course.title}
        </h3>

        <p className="line-clamp-2 text-[14px] leading-[1.7] text-gray-500--font-google-sans">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-[12px] text-primary-color">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessons} មេរៀន
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between pt-0">
          <Button size="sm" className={buttonClass} tabIndex={-1}>
            {buttonLabel}
          </Button>

          {/* was: <a href={course.href ?? "#"}>...</a> — replaced with a span since the whole card is already the link */}
          <span className="text-[13px] font-medium text-[#06295c] group-hover:underline--font-google-sans">
            ចាប់ផ្តើមរៀន →
          </span>
        </div>
      </div>
    </Link>
  );
}
