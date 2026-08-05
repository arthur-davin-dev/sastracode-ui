import {
  PlayCircle,
  Download,
  Award,
  MessageCircleQuestion,
  Infinity as InfinityIcon,
  Monitor,
} from "lucide-react";

// Edit this static list to change the content displayed on the enrollment page.
const benefits = [
  { icon: PlayCircle, title: "អាចចូលមើលមេរៀនវីដេអូបានពេញលេញ", description: "និងឯកសារវគ្គសិក្សាទាំងអស់" },
  { icon: Download, title: "ទាញយកឯកសារ", description: "ធនធាន និងឯកសារកូដ" },
  { icon: Award, title: "វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់វគ្គសិក្សា", description: "អាចប្រើបានបន្ទាប់ពីបញ្ចប់" },
  { icon: MessageCircleQuestion, title: "Q&A support", description: "សួរសំណួរនៅក្នុងការពិភាក្សា"},
  { icon: InfinityIcon, title: "រៀនតាមល្បឿនផ្ទាល់ខ្លួនរបស់អ្នក", description: "ជាមួយនឹងសិទ្ធិប្រើប្រាស់បានពេញមួយជីវិត" },
  { icon: Monitor, title: "អាចចូលប្រើបាននៅលើឧបករណ៍ទាំងអស់", description: "គ្រប់ពេលវេលា និងគ្រប់ទីកន្លែង" },
];

export function WhatYoullGet() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-bold text-gray-900 font-sans">
        អ្វីដែលអ្នកទទួលបាន
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div key={benefit.title} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900 font-sans">
                  {benefit.title}
                </p>
                <p className="text-xs text-gray-400 font-sans">
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
