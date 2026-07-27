import React from 'react';

const steps = [
  {
    number: '01',
    title: 'គំនិតផ្ដើមដំបូង',
    description: 'ជួយឱ្យការរៀន Programming កាន់តែងាយស្រួល មានអន្តរកម្ម និងអាចអនុវត្តបាន។',
  },
  {
    number: '02',
    title: 'ការរៀបចំផែនការ',
    description: 'បង្កើត Platform ដែលរួមបញ្ចូល Documentation, Coding Practice, Quiz និង Learning Roadmap។',
  },
  {
    number: '03',
    title: 'ការអភិវឌ្ឍ Platform',
    description: 'រៀបចំ Platform ដើម្បីផ្តល់បទពិសោធន៍សិក្សាដែល Interactive និងអនុវត្តជាក់ស្ដែង។',
  },
  {
    number: '04',
    title: 'ការសាកល្បង និងកែលម្អ',
    description: 'សាកល្បង ប្រមូលមតិ និងកែលម្អ Interface, Performance និងបទពិសោធន៍សិក្សា។',
  },
  {
    number: '05',
    title: 'ចក្ខុវិស័យនាពេលអនាគត',
    description: 'ពង្រីកមាតិកា Programming បន្ថែមភាសាច្រើន និងអភិវឌ្ឍ Platform ឱ្យកាន់តែធំ។',
  },
];

export default function Timeline() {
  return (
    <section className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 px-4 md:px-8 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Badge & Heading */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-transparent dark:border-blue-800/40">
            How We Got Here
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-3 flex-wrap">
            <span>ដំណើរនៃការបង្កើត</span>
            <span className="text-red-600 dark:text-red-500 font-extrabold">SastraCode</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Connecting Line (Gradient adapted for both modes) */}
          <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 dark:from-teal-500 dark:via-blue-400 dark:to-indigo-400 z-0 opacity-80" />

          {/* Cards & Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                
                {/* Step Circle Badge */}
                <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-xs flex items-center justify-center shadow-md mb-6 ring-4 ring-white dark:ring-slate-950">
                  {step.number}
                </div>

                {/* Content Card */}
                <div className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 text-center shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between h-full min-h-[180px]">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}