import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ShieldCheck } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface PurchaseCardProps {
  course: Course;
}

export function PurchaseCard({ course }: PurchaseCardProps) {
  const isFree = !course.price || course.price === 0;

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-sm backdrop-blur-sm transition-colors duration-300">
      {/* Price Header */}
      <div className="mb-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {isFree ? "Free" : `$${course.price}`}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          30-day money-back guarantee
        </p>
      </div>

      {/* Primary & Secondary Buttons */}
      <div className="space-y-3">
        <Button className="h-11 w-full rounded-xl bg-indigo-800 dark:bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-900 dark:hover:bg-indigo-500 transition-colors shadow-sm">
          Enroll Now
        </Button>
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