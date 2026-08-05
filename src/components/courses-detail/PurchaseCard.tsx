// import { Button } from "@/components/ui/button";
// import { BookOpen, Clock, ShieldCheck } from "lucide-react";
// import { Course } from "@/lib/course/courses";
// import Link from "next/link";

// interface PurchaseCardProps {
//   course: Course;
// }

// export function PurchaseCard({ course }: PurchaseCardProps) {
//   const isFree = Number(course.id) % 2 === 1;

//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mt-15">
//       <div className="mb-4 border-b border-gray-100 pb-4">
//         <p className="text-2xl font-bold text-gray-900">
//           {isFree ? "Free" : "$12.00"}
//         </p>
//         <p className="text-xs text-slate-500 dark:text-slate-400">
//           30-day money-back guarantee
//         </p>
//       </div>

//       {/* Primary & Secondary Buttons */}
//       <div className="space-y-3">
//         <Link
//           href="/courses/1/learn/l1"
//           className="flex w-full items-center justify-center rounded-lg bg-primary-color py-3 text-sm font-semibold text-white transition hover:bg-primary-color/90"
//         >
//           ចុះឈ្មោះឥឡូវនេះ
//         </Link>
//       </div>

//       {/* Feature Bullet Points */}
//       <div className="mt-5 space-y-3 border-t border-slate-200/80 dark:border-slate-800 pt-4">
//         <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
//           <BookOpen className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
//           <span>
//             {course.lessons} មេរៀន · {course.duration}
//           </span>
//         </div>
//         <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
//           <Clock className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
//           <span>Access ពេញមួយជីវិត</span>
//         </div>
//         <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
//           <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
//           <span>វញ្ញាបនបត្រពេញលក្ខណៈក្រោយបញ្ចប់ការសិក្សា</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { Course } from "@/lib/course/courses";
import Link from "next/link";

interface PurchaseCardProps {
  course: Course;
}

export function PurchaseCard({ course }: PurchaseCardProps) {
  const isFree = Number(course.id) % 2 === 1;

  if (isFree) {
    return <FreeCourseCard course={course} />;
  }

  return <PaidCourseCard course={course} />;
}

/* ==========================================
   1. FREE COURSE CARD
   ========================================== */
function FreeCourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6 shadow-sm mt-15 relative overflow-hidden">
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
        <span>វគ្គសិក្សាឥតគិតថ្លៃ (Free Course)</span>
      </div>

      {/* Pricing Header */}
      <div className="mb-4 border-b border-emerald-100 pb-4">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-extrabold text-emerald-600">ឥតគិតថ្លៃ</p>
          <span className="text-sm font-semibold text-emerald-700/80">$0.00</span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          ចូលរៀនបានភ្លាមៗ ដោយមិនបាច់បង់ប្រាក់
        </p>
      </div>

      {/* Action Button */}
      <div className="space-y-3">
        <Link
          href={`/courses/${course.id}/learn/l1`}
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-sm"
        >
          ចាប់ផ្ដើមរៀនឥឡូវនេះ
        </Link>
      </div>

      {/* Feature Bullet Points */}
      <div className="mt-5 space-y-3 border-t border-emerald-100 pt-4">
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <BookOpen className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>
            {course.lessons} មេរៀន · {course.duration}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>Access ចូលរៀនបានរហូត</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>លំហាត់អនុវត្តជាក់ស្ដែង</span>
        </div>
      </div>
    </div>
  );
}

   // PAID COURSE CARD ($12.00)
function PaidCourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md mt-15 relative">
      {/* Pricing Header */}
      <div className="mb-4 border-b border-gray-100 pb-4">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-gray-900">$12.00</p>
          <span className="text-sm text-slate-400 line-through">$24.00</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/subscribe-enroll"
          className="flex w-full items-center justify-center rounded-lg bg-primary-color py-3 text-sm font-semibold text-white transition hover:bg-primary-color/90 shadow-sm"
        >
          ចុះឈ្មោះឥឡូវនេះ
        </Link>
        <Link
          href={`/courses/${course.id}/preview`}
          className="flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          មើលវីដេអូមេម៉ូ (Preview)
        </Link>
      </div>

      {/* Feature Bullet Points */}
      <div className="mt-5 space-y-3 border-t border-slate-200/80 pt-4">
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <BookOpen className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
          <span>
            {course.lessons} មេរៀន · {course.duration}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
          <span>Access ពេញមួយជីវិត</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-800 dark:text-indigo-400" />
          <span>វិញ្ញាបនបត្រពេញលក្ខណៈក្រោយបញ្ចប់ការសិក្សា</span>
        </div>
      </div>
    </div>
  );
}