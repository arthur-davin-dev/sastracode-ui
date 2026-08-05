import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, PlayCircle, Sparkles } from "lucide-react";
import Image from "next/image";

export default function CourseBanner() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-linear-to-b from-indigo-50/50 via-white to-slate-50 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 sm:py-20 transition-colors duration-300">
      {/* Background Decorative Blur Blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-75 w-125 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
      <div className="pointer-events-none absolute -bottom-24 -right-10 -z-10 h-62.5 w-62.5 rounded-full bg-blue-500/10 blur-2xl dark:bg-blue-500/15" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text Column (7 cols) */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-7">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100/80 px-3.5 py-1.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 dark:ring-1 dark:ring-indigo-800/50">
              <Sparkles className="h-3.5 w-3.5" />
              <span>វគ្គសិក្សាថ្មី ២០២៦</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl sm:leading-tight leading-[1.3] transition-colors duration-300">
              ចាប់ផ្តើមដំណើរសិក្សាកម្មវិធីរបស់អ្នក
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300 transition-colors duration-300">
              អភិវឌ្ឍជំនាញសរសេរកូដរបស់អ្នកជាមួយមេរៀនវីដេអូ ឯកសារសិក្សា
              លំហាត់អនុវត្ត និងប្រព័ន្ធ LMS ដែលរៀបចំឡើងសម្រាប់អ្នកចាប់ផ្តើម
              និងអ្នកចង់ក្លាយជាអ្នកអភិវឌ្ឍន៍កម្មវិធីអាជីព។
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2">
              <Button
                size="lg"
                className="group rounded-full bg-primary-color hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-7 py-6 text-base shadow-md shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30 active:scale-[0.98]"
              >
                <span>ចាប់ផ្តើមសិក្សា</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                className="rounded-full bg-init-color hover:opacity-90 text-slate-950 font-medium px-7 py-6 text-base transition-all duration-300 active:scale-[0.98] shadow-sm shadow-amber-500/20"
              >
                <PlayCircle className="mr-2 h-4 w-4 text-slate-900" />
                <span>ស្វែងរកផែនការសិក្សា</span>
              </Button>
            </div>
          </div>

          {/* Right Illustration Column (5 cols) */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-slate-900/90 group">
              <Image
                src="/assets/images/bannercourse.png"
                alt="Student learning to code"
                width={900}
                height={600}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Gradient Overlay for Vignette */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badges */}
              <div className="absolute top-[12%] left-[8%] sm:top-[14%] sm:left-[12%] z-10 animate-bounce animation-duration-[4s] rounded-xl bg-emerald-500/90 backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-emerald-500/20 -rotate-6 border border-white/20">
                JavaScript
              </div>

              <div className="absolute top-[28%] right-[6%] z-10 animate-bounce animation-duration-[3.5s] [animation-delay:0.5s] rounded-xl bg-blue-600/90 backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 rotate-6 border border-white/20">
                HTML5
              </div>

              <div className="absolute bottom-[28%] right-[10%] z-10 animate-bounce animation-duration-[4.2s] [animation-delay:1s] rounded-xl bg-pink-500/90 backdrop-blur-md px-3.5 py-1.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-pink-500/20 -rotate-3 border border-white/20">
                CSS3
              </div>

              <div className="absolute bottom-[10%] left-[8%] z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-amber-400/95 text-slate-900 shadow-lg shadow-amber-400/20 rotate-12 border border-white/30 animate-bounce animation-duration-[3.8s]">
                <Code2 className="h-6 w-6 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
