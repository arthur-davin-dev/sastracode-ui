import React from 'react';
import { Target, Eye } from 'lucide-react';

export default function Mission() {
  return (
    <section className="w-full bg-white dark:bg-slate-950 py-16 px-6 md:px-12 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight font-sans">
            Mission <span className="text-blue-600 dark:text-blue-500">&amp;</span> Vision
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-sans">
            The principles that guide every decision we make and every feature we build.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Mission (បេសកកម្មរបស់យើង) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm dark:shadow-none flex flex-col justify-between hover:shadow-md dark:hover:border-slate-700 transition-all duration-200">
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 mb-6">
                <Target className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 font-khmer">
                បេសកកម្មរបស់យើង
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-khmer">
                ដើម្បីធ្វើឱ្យការរៀនសរសេរកូដ (Programming) កាន់តែងាយស្រួល 
                មានអន្តរកម្ម និងអវត្តជាតិថ្លៃសម្រាប់អ្នករៀនគ្រប់កម្រិត—
                ដោយបំបាត់ឧបសគ្គដែលរាំងស្ទះមនុស្សឃ្លានចង់បានពិភពបច្ចេកវិទ្យា។
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 font-khmer">
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-medium">
                ងាយស្រួលប្រើប្រាស់
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-medium">
                មានអន្តរកម្ម
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[11px] font-medium">
                អវត្តជាតិថ្លៃ
              </span>
            </div>
          </div>

          {/* Card 2: Vision (Our Vision) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm dark:shadow-none flex flex-col justify-between hover:shadow-md dark:hover:border-slate-700 transition-all duration-200">
            <div>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400 mb-6 border border-transparent dark:border-amber-800/40">
                <Eye className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 font-sans">
                Our Vision
              </h3>

              {/* Description */}
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-khmer">
                ដើម្បីក្លាយជាដៃគូសង្គ្រោះជឿជាក់មួយ ដែលជួយសិស្សបង្កើតជំនាញ 
                និងរៀបចំខ្លួនសម្រាប់អាជីពបច្ចេកវិទ្យា។
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-medium border border-transparent dark:border-amber-800/40 font-khmer">
                គួរឱ្យទុកចិត្ត
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-medium border border-transparent dark:border-amber-800/40 font-khmer">
                ផ្តោតលើជោគជ័យ
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}