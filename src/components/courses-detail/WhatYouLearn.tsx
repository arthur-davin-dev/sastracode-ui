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
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-sm backdrop-blur-sm transition-colors duration-300">
      <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-slate-100">
        សេចក្ដីសង្ខេបវគ្គសិក្សា
      </h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {learningPoints.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}