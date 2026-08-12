"use client";

import { useTranslation } from "@/hooks/useTranslations";
import Link from "next/link";

export default function HeroCharacter() {
  const currentT = useTranslation();

  return (
    /* Full-width outer section for page-wide background color */
    <section className="relative w-full bg-white dark:bg-gray-900 transition-colors duration-300 pt-40 py-20">
      {/* Centered inner container for grid content and bounds */}
      <div className="relative mx-auto max-w-7xl pt-8 px-4">
        {/* Corner decorations */}
        <div className="pointer-events-none absolute left-0 top-0 h-21.75 w-21.75 rounded-tl-2xl border-l-14 border-t-14 border-[#ff383c] dark:border-red-500"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 h-21.75 w-21.75 rotate-180 rounded-tl-2xl border-l-14 border-t-14 border-[#ff383c] dark:border-red-500"></div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Text & Content */}
          <div className="space-y-6">
            <div className="badge-gradient inline-flex items-center gap-2 rounded-[13px] border border-navy-muted dark:border-gray-700 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-colors duration-300">
              <span className="size-1 rounded-full bg-navy dark:bg-blue-400"></span>
              <span className="font-khmer text-lg text-primary-color dark:text-blue-400 transition-colors duration-300">
                {currentT.showCase.heroCharacter.badge}
              </span>
            </div>

            <h2 className="font-khmer text-4xl font-medium leading-tight sm:text-5xl transition-colors duration-300">
              <span className="text-primary-color dark:text-blue-400">
                {currentT.showCase.heroCharacter.title1}
              </span>{" "}
              <span className="text-primary-color dark:text-blue-400">
                {currentT.showCase.heroCharacter.title2}
              </span>{" "}
              <span className="text-primary-color dark:text-purple-400">
                {currentT.showCase.heroCharacter.title3}
              </span>
            </h2>

            <p className="max-w-md font-khmer text-lg leading-8 text-black/80 dark:text-gray-300 transition-colors duration-300">
              {currentT.showCase.heroCharacter.description}
            </p>

            <Link
              href="/playground/editor"
              className="inline-flex items-center gap-2 rounded-xl border border-[#bfc8d5] dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-3 text-sm font-medium text-black dark:text-white transition-all duration-300 hover:bg-slate-50 dark:hover:bg-gray-700"
            >
              <img
                src="/home/svg/coding.svg"
                alt=""
                className="size-6 dark:invert"
              />
              <span className="font-khmer">
                {currentT.showCase.heroCharacter.button}
              </span>
            </Link>
            <div className="mt-6 grid max-w-2xl grid-cols-3 gap-2 rounded-[18px] border border-slate-200 bg-white/80 px-4 py-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80 sm:gap-4 sm:px-6">
              <div className="text-center">
                <div className="text-3xl font-black text-primary-color sm:text-4xl">
                  ១០០%
                </div>
                <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
                  មិនចាំបាច់ Browser
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-primary-color sm:text-4xl">
                  ២៤/៧
                </div>
                <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
                  AI Assistant
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-primary-color sm:text-4xl">
                  ៣,០០០+
                </div>
                <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
                  អ្នករៀន
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Photo Collage */}
          <div className="relative mx-auto mt-8 h-[260px] w-full max-w-xs sm:mt-10 sm:h-[340px] sm:max-w-md lg:mt-14 lg:h-[420px] lg:max-w-lg">
            <img
              src="/home/support-team/chatSovanney.jpg"
              alt="Team member"
              className="absolute left-0 top-4 h-32 w-44 rounded-2xl border-[3px] border-white dark:border-gray-700 object-cover shadow-lg dark:shadow-gray-800/50 sm:top-2 sm:h-44 sm:w-60 sm:border-4 lg:top-2 lg:h-60 lg:w-80 lg:rounded-[25px] lg:border-[5px] transition-colors duration-300"
            />
            <img
              src="/home/support-team/chhayDavin (2).jpg"
              alt="Team member"
              className="absolute right-0 top-0 h-44 w-36 rounded-2xl border-[3px] border-white dark:border-gray-700 object-cover shadow-lg dark:shadow-gray-800/50 sm:h-60 sm:w-48 sm:border-4 lg:h-80 lg:w-64 lg:rounded-[25px] lg:border-[5px] transition-colors duration-300"
            />
            <img
              src="/home/support-team/monNarea.jpg"
              alt="Team member"
              className="absolute bottom-0 left-1/4 h-40 w-36 rounded-2xl border-[3px] border-white dark:border-gray-700 object-cover shadow-lg dark:shadow-gray-800/50 sm:h-56 sm:w-48 sm:border-4 lg:h-72 lg:w-64 lg:rounded-[25px] lg:border-[5px] transition-colors duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
