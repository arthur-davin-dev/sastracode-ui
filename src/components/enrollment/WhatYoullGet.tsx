import {
  PlayCircle,
  Download,
  Award,
  MessageCircleQuestion,
  Infinity as InfinityIcon,
  Monitor,
  LucideIcon,
} from "lucide-react";
import { Course, Benefit } from "@/lib/course/courses";

interface WhatYoullGetProps {
  course: Course;
}

const iconMap: Record<Benefit["icon"], LucideIcon> = {
  video: PlayCircle,
  download: Download,
  certificate: Award,
  qa: MessageCircleQuestion,
  pace: InfinityIcon,
  devices: Monitor,
};

const defaultBenefits: Benefit[] = [
  { icon: "video", title: "Full access to video lessons", description: "and all course materials" },
  { icon: "download", title: "Downloadable resources", description: "& code files" },
  { icon: "certificate", title: "Course completion certificate", description: "upon finishing" },
  { icon: "qa", title: "Q&A support in discussion", description: "with instructor" },
  { icon: "pace", title: "Learn at your own pace", description: "lifetime access" },
  { icon: "devices", title: "Access on all devices", description: "anytime, anywhere" },
];

export function WhatYoullGet({ course }: WhatYoullGetProps) {
  const benefits: Benefit[] = course.benefits ?? defaultBenefits;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-gray-900 font-(family-name:--font-sans)">
        អ្វីដែលអ្នកទទួលបាន
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((benefit, i) => {
          const Icon = iconMap[benefit.icon];
          return (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900 font-(family-name:--font-sans)">
                  {benefit.title}
                </p>
                <p className="text-xs text-gray-400 font-(family-name:--font-sans)">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}