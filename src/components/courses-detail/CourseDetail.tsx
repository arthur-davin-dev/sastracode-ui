import { DetailBanner } from "./DetailBanner";
import { InstructorBar } from "./InstroctorBar";
import { WhatYouLearn } from "./WhatYouLearn";
import { CurriculumSection } from "./CurriculumSection";
import { PurchaseCard } from "./PurchaseCard";
import { RelatedCourses } from "./RelatedCourses";
import { Course, getRelatedCourses } from "@/lib/course/courses";

interface CourseDetailPageProps {
  course: Course;
}

export default async function CourseDetailPage({ course }: CourseDetailPageProps) {
  const relatedCourses = await getRelatedCourses(course.id, course.category);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <DetailBanner course={course} />
            <InstructorBar course={course} />
            <WhatYouLearn course={course} />
            <CurriculumSection course={course} />
          </div>

          <div className="relative">
            <div className="sticky top-8">
              <PurchaseCard course={course} />
            </div>
          </div>
        </div>
      </div>

      <RelatedCourses courses={relatedCourses} />
    </div>
  );
}
