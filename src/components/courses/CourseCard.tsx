import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock } from "lucide-react";
import { Course } from "./Types";


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
    <div className="group w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md">
      {/* Card image */}
      <div className="relative h-[110px] w-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="rounded-t-xl object-cover"
        />
      </div>

      {/* Card content */}
      <div className="p-4">
        <Badge
          variant="secondary"
          className="mb-3 bg-transparent p-0 text-[12px] font-semibold uppercase tracking-wider text-pink-600 hover:bg-transparent"
        >
          {course.category}
        </Badge>

        <h3 className="mb-2 text-[16px] font-semibold text-gray-900 font-khmer">
          {course.title}
        </h3>

        <p className="line-clamp-2 text-[14px] leading-[1.7] text-gray-500 font-khmer">
          {course.description}
        </p>

        {/* Metadata row */}
        <div className="mt-4 flex items-center justify-between text-[12px] text-gray-400">
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

        {/* Footer */}
        <div className="flex items-center justify-between pt-0">
          <Button size="sm" className={buttonClass}>
            {buttonLabel}
          </Button>

          <a
            href={course.href ?? "#"}
            className="text-[13px] font-medium text-[#06295c] hover:underline font-khmer"
          >
            ចាប់ផ្តើមរៀន →
          </a>
        </div>
      </div>
      

    </div>
  
  );
}