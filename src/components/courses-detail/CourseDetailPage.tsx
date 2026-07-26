import { DetailBanner } from "./DetailBanner";
import { InstructorBar } from "../courses-detail/InstroctorBar"
import { WhatYouLearn } from "../courses-detail/WhatYouLearn";
import { CurriculumSection } from "./CurriculumSection";
import { PurchaseCard } from "./PurchaseCard";
import { RelatedCourses } from "./RelatedCourses";

export default function CourseDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <DetailBanner />
            <InstructorBar />
            <WhatYouLearn />
            <CurriculumSection />
          </div>

          <div className="relative">
            <div className="sticky top-8">
              <PurchaseCard />
            </div>
          </div>
        </div>
      </div>

      <RelatedCourses />
    </div>
  );
}