import { EnrollmentHeader } from "./EnrollmentHeader";
// import { WhatYoullGet } from "./WhatYoullGet";
import { EnrollmentHistory } from "./EnrollmentHistory";
import { CheckoutCard } from "./CheckoutCard";
import { Course, EnrollmentHistoryItem } from "@/lib/course/courses";

interface EnrollmentPageProps {
  course: Course;
  enrollmentHistory: EnrollmentHistoryItem[];
}

export default function EnrollmentPage({ course, enrollmentHistory }: EnrollmentPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <EnrollmentHeader course={course} />
            {/* <WhatYoullGet course={course} /> */}
            <EnrollmentHistory items={enrollmentHistory} />
          </div>

          <div className="relative">
            <div className="sticky top-8">
              <CheckoutCard course={course} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}