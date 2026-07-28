import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ShieldCheck } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface PurchaseCardProps {
  course: Course;
}

export function PurchaseCard({ course }: PurchaseCardProps) {
  const isFree = !course.price || course.price === 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <p className="text-2xl font-bold text-gray-900">
          {isFree ? "Free" : `$${course.price}`}
        </p>
        <p className="text-xs text-gray-400 font-(family-name:--font-sans)">
          30-day money-back guarantee
        </p>
      </div>

      <div className="space-y-3">
        <Button className="w-full rounded-lg bg-primary-color py-5 text-sm font-semibold text-white hover:bg-primary-color/90">
          ចុះឈ្មោះឥឡូវនេះ
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-lg border-blue-100 bg-blue-50 py-5 text-sm font-semibold text-primary-color hover:bg-blue-100 font-(family-name:--font-sans)"
        >
          មើលការបង្ហាញ
        </Button>
      </div>

      <div className="mt-5 space-y-2.5 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-2 text-base text-gray-500 font-(family-name:--font-sans)">
          <BookOpen className="h-3.5 w-3.5 text-gray-400" />
          {course.lessons} មេរៀន · {course.duration}
        </div>
        <div className="flex items-center gap-2 text-base text-gray-500 font-(family-name:--font-sans)">
          <Clock className="h-3.5 w-3.5 text-gray-400" />
          Access ពេញមួយជីវិត
        </div>
        <div className="flex items-center gap-2 text-base text-gray-500 font-(family-name:--font-sans)">
          <ShieldCheck className="h-3.5 w-3.5 text-gray-400" />
          វញ្ញាបនបត្រពេញលក្ខណៈក្រោយបញ្ចប់ការសិក្សា
        </div>
      </div>
    </div>
  );
}