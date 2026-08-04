import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface InstructorBarProps {
  course: Course;
}

const defaultInstructor = {
  name: "Dr. Davin Chhay",
  avatar: "/assets/images/Davin.png",
  rating: 4.9,
  reviewCount: 1240,
  tags: ["Premium Access", "Advanced Level"],
};

export function InstructorBar({ course }: InstructorBarProps) {
  const instructor = course.instructor ?? defaultInstructor;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between transition-colors duration-300">
      {/* Instructor Info */}
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 shrink-0">
          <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Instructor</p>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{instructor.name}</p>
        </div>
      </div>

      {/* Rating & Tags */}
      <div className="flex flex-wrap items-center gap-3">
        {instructor.rating !== undefined && (
          <div className="flex items-center gap-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1 text-xs">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900 dark:text-slate-100">{instructor.rating}</span>
            {instructor.reviewCount !== undefined && (
              <span className="text-slate-500 dark:text-slate-400">
                ({instructor.reviewCount.toLocaleString()})
              </span>
            )}
          </div>
        )}
        {instructor.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Enroll Button */}
      <Button className="rounded-xl bg-indigo-800 dark:bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-900 dark:hover:bg-indigo-500 transition-colors shadow-sm">
        <Play className="mr-2 h-3.5 w-3.5 fill-white" />
        ចុះឈ្មោះឥឡូវនេះ
      </Button>
    </div>
  );
}