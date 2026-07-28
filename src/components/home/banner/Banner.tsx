
import Stats from './Stats'
import CodeWindow from './CodeWindow'

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 sm:py-20 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">

          {/* LEFT */}

          <div className="text-center lg:text-left">

            <div className="inline-flex items-center rounded-full border px-3 sm:px-4 py-2 text-[10px] sm:text-xs tracking-wider text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 font-(family-name:--font-sans)">
              <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
              LEARN. CODE. BUILD THE FUTURE.
            </div>

            <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight font-(family-name:--font-sans)">
              <span className="text-[#0B2B66] dark:text-blue-400">
                ចាប់ផ្តើមរៀន
              </span>

              <br />

              <span className="text-[#0B2B66] dark:text-blue-400">
                Coding
              </span>

              <br />

              <span className="text-[#0B2B66] dark:text-blue-400">
                ជំនាញថ្មីៗ
              </span>

              <span className="text-red-600 dark:text-red-400">
                សម្រាប់
              </span>

              <span className="ml-3 text-[#0B2B66] dark:text-blue-400">
                Code
              </span>
            </h1>

            <p className="mt-6 sm:mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 dark:text-gray-400">
              សិក្សាការសរសេរកូដ និងអភិវឌ្ឍជំនាញថ្មីៗ
              ជាមួយនឹង AI Assistant, Coding Exercise,
              Interactive Lesson និង Online Compiler។
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

              <button className="rounded-xl bg-[#0B2B66] dark:bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors">
                ចូលរៀនឥឡូវនេះ
              </button>

              <button className="rounded-xl border border-gray-300 dark:border-gray-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {"</>"} Explore Code
              </button>

            </div>

            <Stats />

          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end mt-5 lg:mt-0">
            <CodeWindow />
          </div>

        </div>

      </div>
    </section>

  )
}