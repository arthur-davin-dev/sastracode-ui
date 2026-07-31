// CoreFeatures.tsx

const ArticleData = [
    { img: <img src="assets/home/svg/icon-doc.svg" alt="" className="size-[22px] dark:brightness-200" />, 
      header: "Interactive Documentation", 
      paragraph: "មេរៀនដែលរៀបចំជាប្រព័ន្ធ ជាមួយឧទាហរណ៍កូដផ្ទាល់ និងលំហាត់អនុវត្តដែលបញ្ចូលក្នុងមេរៀននីមួយៗ។", 
      link: "Explore feature" 
    },
    { img: <img src="assets/home/svg/icon-doc.svg" alt="" className="size-[22px] dark:brightness-200" />, 
      header: "Interactive Documentation", 
      paragraph: "មេរៀនដែលរៀបចំជាប្រព័ន្ធ ជាមួយឧទាហរណ៍កូដផ្ទាល់ និងលំហាត់អនុវត្តដែលបញ្ចូលក្នុងមេរៀននីមួយៗ។", 
      link: "Explore feature" 
    },
    { img: <img src="assets/home/svg/icon-doc.svg" alt="" className="size-[22px] dark:brightness-200" />, 
      header: "Interactive Documentation", 
      paragraph: "មេរៀនដែលរៀបចំជាប្រព័ន្ធ ជាមួយឧទាហរណ៍កូដផ្ទាល់ និងលំហាត់អនុវត្តដែលបញ្ចូលក្នុងមេរៀននីមួយៗ។", 
      link: "Explore feature" 
    },
    { img: <img src="assets/home/svg/icon-doc.svg" alt="" className="size-[22px] dark:brightness-200" />, 
      header: "Interactive Documentation", 
      paragraph: "មេរៀនដែលរៀបចំជាប្រព័ន្ធ ជាមួយឧទាហរណ៍កូដផ្ទាល់ និងលំហាត់អនុវត្តដែលបញ្ចូលក្នុងមេរៀននីមួយៗ។", 
      link: "Explore feature" 
    },
    { img: <img src="assets/home/svg/icon-doc.svg" alt="" className="size-[22px] dark:brightness-200" />, 
      header: "Interactive Documentation", 
      paragraph: "មេរៀនដែលរៀបចំជាប្រព័ន្ធ ជាមួយឧទាហរណ៍កូដផ្ទាល់ និងលំហាត់អនុវត្តដែលបញ្ចូលក្នុងមេរៀននីមួយៗ។", 
      link: "Explore feature" 
    },
   
];


function Article() {
  return (
    <article className=" rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50">
      <div className="flex size-[52px] items-center justify-center rounded-[14px] border border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30 transition-colors duration-300">
        <img src="assets/home/svg/icon-doc.svg" alt="" className="size-[22px] dark:brightness-200" />
      </div>
      <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">Interactive Documentation</h3>
      <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
        មេរៀនដែលរៀបចំជាប្រព័ន្ធ ជាមួយឧទាហរណ៍កូដផ្ទាល់ និងលំហាត់អនុវត្តដែលបញ្ចូលក្នុងមេរៀននីមួយៗ។
      </p>
      <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
        Explore feature
        <img src="assets/home/svg/arrow-blue.svg" alt="" className="size-[13px] dark:brightness-200" />
      </a>
    </article>
  )
}

export default function CoreFeatures() {
  return (
    <section className="bg-slate-50/80 dark:bg-gray-900/80 px-6 py-10 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 px-5 py-2 font-khmer text-sm font-bold uppercase text-navy dark:text-blue-300 transition-colors duration-300">
            អ្វីដែលយើងផ្តល់ជូន
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            <span className="text-[#0d1b3e] dark:text-white">Core </span>
            <span className="gradient-features dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">Features</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-khmer text-base leading-7 text-slate-body dark:text-gray-400 transition-colors duration-300">
            អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការ ដើម្បីអភិវឌ្ឍពីអ្នកចាប់ផ្តើមដំបូង ទៅជាអ្នកអភិវឌ្ឍន៍ដែលមានទំនុកចិត្ត នៅលើវេទិកាតែមួយ។
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 - Interactive Documentation */}
          <article className=" rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50">
            <div className="flex size-[52px] items-center justify-center rounded-[14px] border border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30 transition-colors duration-300">
              <img src="assets/home/svg/icon-doc.svg" alt="" className="size-[22px] dark:brightness-200" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">Interactive Documentation</h3>
            <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
              មេរៀនដែលរៀបចំជាប្រព័ន្ធ ជាមួយឧទាហរណ៍កូដផ្ទាល់ និងលំហាត់អនុវត្តដែលបញ្ចូលក្នុងមេរៀននីមួយៗ។
            </p>
            <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
              Explore feature
              <img src="assets/home/svg/arrow-blue.svg" alt="" className="size-[13px] dark:brightness-200" />
            </a>
          </article>

          {/* Card 2 - Coding Playground */}
          <article className="rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50">
            <div className="flex size-[52px] items-center justify-center rounded-[14px] border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 transition-colors duration-300">
              <img src="assets/home/svg/icon-playground.svg" alt="" className="size-[22px] dark:brightness-200" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">Coding Playground</h3>
            <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
              សរសេរ និងដំណើរការ Code ដោយផ្ទាល់ក្នុង Browser ជាមួយការបង្ហាញលទ្ធផលភ្លាមៗ ដោយមិនចាំបាច់ដំឡើងអ្វីទាំងអស់។
            </p>
            <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
              Explore feature
              <img src="assets/home/svg/arrow-blue.svg" alt="" className="size-[13px] dark:brightness-200" />
            </a>
          </article>

          {/* Card 3 - AI Code Coach */}
          <article className="rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50">
            <div className="flex size-[52px] items-center justify-center rounded-[14px] border border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30 transition-colors duration-300">
              <img src="assets/home/svg/icon-ai.svg" alt="" className="size-[22px] dark:brightness-200" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">AI Code Coach</h3>
            <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
              ទទួលបានការណែនាំឆ្លាតវៃ ការពន្យល់ដែលសមស្របទៅតាមអ្នក និងជំនួយ Debug Code ជាក់ស្តែងភ្លាមៗ។
            </p>
            <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-300">
              Explore feature
              <img src="assets/svg/home/arrow-purple.svg" alt="" className="size-[13px] dark:brightness-200" />
            </a>
          </article>

          {/* Card 4 - Quiz & Assessment */}
          <article className="rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50">
            <div className="flex size-[52px] items-center justify-center rounded-[14px] border border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30 transition-colors duration-300">
              <img src="assets/home/svg/icon-quiz.svg" alt="" className="size-[22px] dark:brightness-200" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">Quiz &amp; Assessment</h3>
            <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
              វាយតម្លៃវឌ្ឍនភាពនៃការសិក្សាតាមរយៈកម្រងសំណួរអន្តរកម្ម ជាមួយមតិកែលម្អលម្អិតភ្លាមៗ។
            </p>
            <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
              Explore feature
              <img src="assets/home/svg/arrow-blue.svg" alt="" className="size-[13px] dark:brightness-200" />
            </a>
          </article>

          {/* Card 5 - Video Learning */}
          <article className="rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50">
            <div className="flex size-[52px] items-center justify-center rounded-[14px] border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 transition-colors duration-300">
              <img src="assets/home/svg/icon-video.svg" alt="" className="size-[22px] dark:brightness-200" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">Video Learning</h3>
            <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
              សិក្សាតាមរយៈមេរៀនវីដេអូដែលរៀបចំជាប្រព័ន្ធ ដើម្បីគាំទ្រគ្រប់ផែនការសិក្សា។
            </p>
            <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
              Explore feature
              <img src="assets/home/svg/arrow-blue.svg" alt="" className="size-[13px] dark:brightness-200" />
            </a>
          </article>

          {/* Card 6 - Learning Roadmaps */}
          <article className="rounded-[22px] border border-[rgba(13,27,62,0.09)] dark:border-gray-700 bg-white dark:bg-gray-800 p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] 
            transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:hover:shadow-gray-900/50">
            <div className="flex size-[52px] items-center justify-center rounded-[14px] border border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30 transition-colors duration-300">
              <img src="assets/home/svg/icon-roadmap.svg" alt="" className="size-[22px] dark:brightness-200" />
            </div>
            <h3 className="mt-5 text-2xl font-extrabold text-navy dark:text-white transition-colors duration-300">Learning Roadmaps</h3>
            <p className="mt-3 font-khmer text-base leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300">
              អនុវត្តតាមផែនទីដំណើរសិក្សាដែលបានរៀបចំយ៉ាងប្រុងប្រយ័ត្ន ដើម្បីណែនាំអ្នកសិក្សាពីកម្រិតចាប់ផ្តើមរហូតដល់កម្រិតជំនាញ។
            </p>
            <a href="#" className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors duration-300">
              Explore feature
              <img src="assets/home/svg/arrow-purple.svg" alt="" className="size-[13px] dark:brightness-200" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}