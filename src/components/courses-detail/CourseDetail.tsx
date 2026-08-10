import { DetailBanner } from "./DetailBanner";
import { InstructorBar } from "./InstroctorBar";
import { WhatYouLearn } from "./WhatYouLearn";
import { CurriculumSection } from "./CurriculumSection";
import { PurchaseCard } from "./PurchaseCard";
import { RelatedCourses } from "./RelatedCourses";
import { Course } from "@/lib/course/courses";

interface CourseDetailPageProps {
  course: Course;
  relatedCourses?: Course[];
}

export default function CourseDetailPage({ course, relatedCourses = [] }: CourseDetailPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          {/* Main Content Column */}
          <div className="space-y-6">
            <DetailBanner course={course} />
            <InstructorBar course={course} />
            <WhatYouLearn course={course} />
            <CurriculumSection course={course} />
          </div>

          {/* Sticky Sidebar Column */}
          <div className="relative">
            <div className="sticky top-24 z-10">
              <PurchaseCard course={course} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses Section */}
      <div className="mt-12">
        <RelatedCourses courses={relatedCourses} />
      </div>
    </div>
  );
}
