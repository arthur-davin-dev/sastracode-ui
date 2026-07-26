import { CheckCircle2 } from "lucide-react";

const learningPoints = [
  "ស្គាល់ជំនាញ Syntax និងមូលដ្ឋានគ្រឹះ Java",
  "យល់ដឹងអំពី Variables, Data Types, Operators និង Control Flow",
  "បង្កើតកម្មវិធីដែលអាចប្រើឡើងវិញ ដោយប្រើ Methods និង OOP",
  "ធ្វើការជាមួយ Arrays, Collections, Exception Handling និង File I/O",
];

export function WhatYouLearn() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-primary-color font-(family-name:--font-sans)
">សេចក្ដីសង្ខេបវគ្គសិក្សា</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {learningPoints.map((point, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <p className="text-sm leading-relaxed text-gray-600 font-(family-name:--font-sans)
">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}