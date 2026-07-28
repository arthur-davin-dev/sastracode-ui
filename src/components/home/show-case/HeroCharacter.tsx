// HeroCharacter.tsx
import Image from "next/image";

export default function HeroCharacter() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Corner decorations - updated for dark mode */}
      <div className="pointer-events-none absolute left-0 top-0 h-[87px] w-[87px] rounded-tl-2xl border-l-[14px] border-t-[14px] border-[#ff383c] dark:border-red-500"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-[87px] w-[87px] rotate-180 rounded-tl-2xl border-l-[14px] border-t-[14px] border-[#ff383c] dark:border-red-500"></div>

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="badge-gradient inline-flex items-center gap-2 rounded-[13px] border border-navy-muted dark:border-gray-700 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-colors duration-300">
            <span className="size-1 rounded-full bg-navy dark:bg-blue-400"></span>
            <span className="font-khmer text-lg text-navy dark:text-blue-400 transition-colors duration-300">
              ដំណើរឆ្ពោះទៅរកអនាគត
            </span>
          </div>

          <h2 className="font-khmer text-4xl font-medium leading-tight sm:text-5xl transition-colors duration-300">
            <span className="text-navy dark:text-blue-400">សូមស្វាគមន៍មកកាន់ </span>
            <span className="text-navy dark:text-blue-400">Sastra</span>
            <span className="text-brand dark:text-purple-400">Code</span>
          </h2>

          <p className="max-w-md font-khmer text-lg leading-8 text-black/80 dark:text-gray-300 transition-colors duration-300">
            ពីអ្នកចាប់ផ្តើមដំបូង ទៅជាអ្នកអភិវឌ្ឍន៍ជំនាញ- មេរៀនងាយយល់, ប្រកួតប្រជែង, រៀនបែបកម្សាន្ត.ពុំចាំបាច់ដំឡើង<br />
            កម្មវិធីស្មុគស្មាញសម្រាប់ run code
          </p>

          <a 
            href="#" 
            className="inline-flex items-center gap-2 rounded-xl border border-[#bfc8d5] dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-3 text-sm font-medium text-black dark:text-white transition-all duration-300 hover:bg-slate-50 dark:hover:bg-gray-700"
          >
            <img src="assets/home/svg/vector.svg" alt="" className="size-6 dark:invert" />
            <span className="font-khmer">សាកល្បងcoding</span>
          </a>
        </div>

        {/* Photo collage - updated with dark mode borders */}
        <div className="relative mx-auto h-[260px] w-full max-w-xs sm:h-[340px] sm:max-w-md lg:h-[420px] lg:max-w-lg">
          <img 
            src="assets/home/image/image687.jpg" 
            alt="Team member" 
            className="absolute left-0 top-4 h-32 w-44 rounded-2xl border-[3px] border-white dark:border-gray-700 object-cover shadow-lg dark:shadow-gray-800/50 sm:top-6 sm:h-44 sm:w-60 sm:border-4 lg:top-8 lg:h-60 lg:w-80 lg:rounded-[25px] lg:border-[5px] transition-colors duration-300" 
          />
          <img 
            src="assets/home/image/image684.jpg" 
            alt="Team member" 
            className="absolute right-0 top-0 h-44 w-36 rounded-2xl border-[3px] border-white dark:border-gray-700 object-cover shadow-lg dark:shadow-gray-800/50 sm:h-60 sm:w-48 sm:border-4 lg:h-80 lg:w-64 lg:rounded-[25px] lg:border-[5px] transition-colors duration-300" 
          />
          <img 
            src="assets/home/image/image693.jpg" 
            alt="Team member" 
            className="absolute bottom-0 left-1/4 h-40 w-36 rounded-2xl border-[3px] border-white dark:border-gray-700 object-cover shadow-lg dark:shadow-gray-800/50 sm:h-56 sm:w-48 sm:border-4 lg:h-72 lg:w-64 lg:rounded-[25px] lg:border-[5px] transition-colors duration-300" 
          />
        </div>
      </div>
    </section>
  );
}