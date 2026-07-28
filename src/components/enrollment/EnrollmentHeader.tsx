import Image from "next/image";
import { Heart, Lock, BarChart2 } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface EnrollmentHeaderProps {
  course: Course;
}

const defaultInstructor = {
  name: "Sokchea Eng",
  avatar: "/assets/images/instructor-sokchea.png",
  tags: ["Premium Access", "Intermediate Level"],
};

export function EnrollmentHeader({ course }: EnrollmentHeaderProps) {
  const instructor = course.instructor ?? defaultInstructor;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mt-15">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-(family-name:--font-sans)">
            {course.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500 font-(family-name:--font-sans)">
            {course.description}
          </p>
        </div>
        <button
          aria-label="Save to wishlist"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-gray-300 hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-200">
            <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-(family-name:--font-sans)">Instructor</p>
            <p className="text-sm font-semibold text-gray-900">{instructor.name}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {instructor.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-primary-color"
            >
              {tag.toLowerCase().includes("premium") ? (
                <Lock className="h-3 w-3" />
              ) : (
                <BarChart2 className="h-3 w-3" />
              )}
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}