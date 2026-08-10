import { EnrollmentHeader } from "./EnrollmentHeader";
import { WhatYoullGet } from "./WhatYoullGet";
import { EnrollmentHistory } from "./EnrollmentHistory";
import { CheckoutCard } from "./CheckoutCard";
import { Course } from "@/lib/course/courses";
import { EnrollmentHistoryItem } from "@/lib/course/enrollhistory";

interface EnrollmentPageProps {
  course: Course;
  enrollmentHistory: EnrollmentHistoryItem[];
}

export default function EnrollmentPage({
  course,
  enrollmentHistory,
}: EnrollmentPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 font-khmer transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          
          {/* Main Content Column */}
          <div className="space-y-6">
            <EnrollmentHeader course={course} />
            <WhatYoullGet />
            <EnrollmentHistory items={enrollmentHistory} />
          </div>

          {/* Sidebar Sticky Checkout Card */}
          <div className="relative">
            <div className="sticky top-24">
              <CheckoutCard course={course} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
