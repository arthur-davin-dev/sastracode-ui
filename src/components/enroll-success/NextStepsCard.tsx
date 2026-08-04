// src/components/checkout/NextStepsCard.tsx
import React from "react";
import { Mail, LayoutDashboard, MessageSquare } from "lucide-react";

interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function NextStepsCard() {
  const steps: StepItem[] = [
    {
      icon: <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      title: "ពិនិត្យប្រអប់សារអ៊ីមែលរបស់អ្នក",
      description: "យើងបានផ្ញើអ៊ីមែលបញ្ជាក់ការចុះឈ្មោះ ដែលរួមមានព័ត៌មានលម្អិតពីវគ្គសិក្សា និងព័ត៌មានសម្រាប់ចូលប្រើ ទៅកាន់ student@academiapro.edu។",
    },
    {
      icon: <LayoutDashboard className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      title: "ចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង (Dashboard)",
      description: "វគ្គសិក្សារបស់អ្នកបានដំណើរការនៅក្នុងផ្ទាំង Dashboard។ អ្នកអាចចូលមើលមេរៀន វីដេអូ កម្រងសំណួរ (Quiz) និងឯកសារសម្រាប់ទាញយកនានា។",
    },
    {
      icon: <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
      title: "ចូលរួមសហគមន៍សិក្សា",
      description: "ភ្ជាប់ទំនាក់ទំនងជាមួយសិស្សជាង 1,200 នាក់ដែលកំពុងសិក្សាវគ្គនេះ។ ណែនាំខ្លួនអ្នក និងចូលរួមពិភាក្សា ផ្លាស់ប្តូរចំណេះដឹង និងបទពិសោធន៍ជាមួយសមាជិកដទៃទៀតនៅក្នុងវេទិកាពិភាក្សា។",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5">
        តេីមានអ្វីកេីតឡេីងបន្ទាប់?
      </h3>

      <div className="space-y-5">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="shrink-0 p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl mt-0.5">
              {step.icon}
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-khmer">
                {step.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-khmer leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
