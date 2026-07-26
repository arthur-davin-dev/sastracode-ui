import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, Play } from "lucide-react";

export function InstructorBar() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
          <Image src="/assets/images/instructor-sarah.png" alt="Dr. Sarah Chen" fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-(family-name:--font-sans)
">Instructor</p>
          <p className="text-sm font-semibold text-gray-900">Dr. Sarah Chen</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-gray-900">4.9</span>
          <span className="text-sm text-gray-400">(1,240 reviews)</span>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">Premium Access</span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">Advanced Level</span>
      </div>

      <Button className="rounded-lg bg-primary-color px-5 text-sm font-semibold text-white hover:bg-primary-color/90">
        <Play className="mr-2 h-3.5 w-3.5 fill-white" />
        Enroll Now
      </Button>
    </div>
  );
}