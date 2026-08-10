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
    <section className="w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 sm:py-10 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Badge & Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-transparent dark:border-blue-800/40">
            How We Got Here
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight flex items-center justify-center gap-2 sm:gap-3 flex-wrap font-khmer">
            <span>ដំណើរនៃការបង្កើត</span>
            <span className="text-red-600 dark:text-red-500 font-extrabold">SastraCode</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Horizontal Connecting Line (Desktop / lg screens only) */}
          <div className="hidden lg:block absolute top-5 left-[8%] right-[8%] h-0.5 bg-linear-to-r from-teal-400 via-blue-500 to-indigo-500 dark:from-teal-500 dark:via-blue-400 dark:to-indigo-400 z-0 opacity-80" />

          {/* Vertical Connecting Line (Mobile & Tablet / below lg) */}
          <div className="lg:hidden absolute top-5 bottom-5 left-5 sm:left-6 w-0.5 bg-linear-to-b from-teal-400 via-blue-500 to-indigo-500 dark:from-teal-500 dark:via-blue-400 dark:to-indigo-400 z-0 opacity-80" />

          {/* Steps Container */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10 font-khmer">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className="flex flex-row lg:flex-col items-start lg:items-center gap-4 sm:gap-6 lg:gap-0"
              >
                
                {/* Step Circle Badge */}
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-10 lg:h-10 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-sm sm:text-base lg:text-sm flex items-center justify-center shadow-md lg:mb-6 ring-4 ring-white dark:ring-slate-950 z-10">
                  {step.number}
                </div>

                {/* Content Card */}
                <div className="grow w-full h-fit bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 text-left lg:text-center shadow-sm dark:shadow-none hover:shadow-md dark:hover:border-slate-700 transition-all duration-200">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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