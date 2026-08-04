import { CheckCircle2 } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface WhatYouLearnProps {
  course: Course;
}

const defaultLearningPoints = [
  "ស្គាល់ជំនាញ Syntax និងមូលដ្ឋានគ្រឹះ",
  "យល់ដឹងអំពី Variables, Data Types, Operators និង Control Flow",
  "បង្កើតកម្មវិធីដែលអាចប្រើឡើងវិញ",
  "ធ្វើការជាមួយ Practical Projects និង Best Practices",
];

export function WhatYouLearn({ course }: WhatYouLearnProps) {
  const learningPoints = course.learningPoints ?? defaultLearningPoints;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 font-khmer transition-colors duration-300">
      
      {/* Section Header */}
      <h2 className="mb-5 text-xl sm:text-2xl font-bold text-[#002455] dark:text-blue-400 leading-snug">
        សេចក្ដីសង្ខេបវគ្គសិក្សា
      </h2>

      {/* Learning Points Grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {learningPoints.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {point}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
