import {
  PlayCircle,
  Download,
  Award,
  MessageCircleQuestion,
  Infinity as InfinityIcon,
  Monitor,
} from "lucide-react";

// Static benefits list for the course enrollment page
const benefits = [
  { icon: PlayCircle, title: "អាចចូលមើលមេរៀនវីដេអូបានពេញលេញ", description: "និងឯកសារវគ្គសិក្សាទាំងអស់" },
  { icon: Download, title: "ទាញយកឯកសារ", description: "ធនធាន និងឯកសារកូដ" },
  { icon: Award, title: "វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គសិក្សា", description: "អាចប្រើបានបន្ទាប់ពីបញ្ចប់" },
  { icon: MessageCircleQuestion, title: "ការគាំទ្រសំណួរ និងចម្លើយ (Q&A)", description: "សួរសំណួរនៅក្នុងការពិភាក្សា" },
  { icon: InfinityIcon, title: "រៀនតាមល្បឿនផ្ទាល់ខ្លួនរបស់អ្នក", description: "ជាមួយនឹងសិទ្ធិប្រើប្រាស់បានពេញមួយជីវិត" },
  { icon: Monitor, title: "អាចចូលប្រើបាននៅលើឧបករណ៍ទាំងអស់", description: "គ្រប់ពេលវេលា និងគ្រប់ទីកន្លែង" },
];

export function WhatYoullGet() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 font-khmer transition-colors duration-300">
      
      {/* Title Header */}
      <h2 className="mb-5 text-lg font-bold text-slate-900 dark:text-slate-100">
        អ្វីដែលអ្នកទទួលបាន
      </h2>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div 
              key={benefit.title} 
              className="flex items-start gap-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-3.5 transition-colors"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mt-0.5">
                <Icon className="h-4 w-4" />
              </span>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  {benefit.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
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