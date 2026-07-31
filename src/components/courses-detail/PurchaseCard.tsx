import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ShieldCheck } from "lucide-react";
import { Course } from "@/lib/course/courses";
import Link from "next/link";

interface PurchaseCardProps {
  course: Course;
}

export function PurchaseCard({ course }: PurchaseCardProps) {
  const isFree = Number(course.id) % 2 === 1;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mt-15">
      <div className="mb-4 border-b border-gray-100 pb-4">
        <p className="text-2xl font-bold text-gray-900">
          {isFree ? "Free" : "$12.00"}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          30-day money-back guarantee
        </p>
      </div>

      {/* Primary & Secondary Buttons */}
      <div className="space-y-3">
        <Link
          href={`/courses/${course.id}/enroll`}
          className="flex w-full items-center justify-center rounded-lg bg-primary-color py-3 text-sm font-semibold text-white transition hover:bg-primary-color/90"
        >
          ចុះឈ្មោះឥឡូវនេះ
        </Link>
        <Button
          variant="outline"
          className="h-11 w-full rounded-xl border-slate-200/80 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors"
        >
          មើលការបង្ហាញ
        </Button>
      </div>

      {/* Feature Bullet Points */}
      <div className="mt-5 space-y-3 border-t border-slate-200/80 dark:border-slate-800 pt-4">
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <BookOpen className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
          <span>{course.lessons} មេរៀន · {course.duration}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
          <span>Access ពេញមួយជីវិត</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
          <span>វញ្ញាបនបត្រពេញលក្ខណៈក្រោយបញ្ចប់ការសិក្សា</span>
        </div>
      </div>
    </div>
  );
}
