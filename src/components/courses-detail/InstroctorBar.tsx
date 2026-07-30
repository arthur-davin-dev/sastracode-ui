import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, Play } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface InstructorBarProps {
  course: Course;
}

const defaultInstructor = {
  name: "Dr. Davin Chhay",
  avatar: "/assets/images/Davin.DNG",
  rating: 4.9,
  reviewCount: 1240,
  tags: ["Premium Access", "Advanced Level"],
};

export function InstructorBar({ course }: InstructorBarProps) {
  const instructor = course.instructor ?? defaultInstructor;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
          <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-(family-name:--font-sans)">Instructor</p>
          <p className="text-sm font-semibold text-gray-900">{instructor.name}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {instructor.rating !== undefined && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-gray-900">{instructor.rating}</span>
            {instructor.reviewCount !== undefined && (
              <span className="text-sm text-gray-400">
                ({instructor.reviewCount.toLocaleString()} reviews)
              </span>
            )}
          </div>
        )}
        {instructor.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {tag}
          </span>
        ))}
      </div>
      <Button className="rounded-lg bg-primary-color px-5 text-sm font-semibold text-white hover:bg-primary-color/90">
        <Play className="mr-2 h-3.5 w-3.5 fill-white" />
        ចុះឈ្មោះឥឡូវនេះ
      </Button>
    </div>
  );
}