"use client";

import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslations";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroCharacter() {
  const currentT = useTranslation();
  const title = `${currentT.showCase.heroCharacter.title1}${currentT.showCase.heroCharacter.title2}${currentT.showCase.heroCharacter.title3}`;
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const titleTimer = window.setTimeout(() => setVisibleTitle(title), 0);
      return () => window.clearTimeout(titleTimer);
    }

    const characters = Array.from(title);
    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      index += deleting ? -1 : 1;
      setVisibleTitle(characters.slice(0, index).join(""));

      if (!deleting && index === characters.length) {
        deleting = true;
        timer = window.setTimeout(type, 2800);
        return;
      }
      if (deleting && index === 0) {
        deleting = false;
        timer = window.setTimeout(type, 650);
        return;
      }

      timer = window.setTimeout(type, deleting ? 30 : 60);
    };

    timer = window.setTimeout(type, 350);
    return () => window.clearTimeout(timer);
  }, [title]);

  return (
    /* Full-width outer section for page-wide background color */
    <section className="relative flex w-full items-center bg-white dark:bg-gray-900 transition-colors duration-300 py-12 pt-16 sm:py-16 sm:pt-20 lg:py-20 lg:pt-12">

      {/* Centered inner container for grid content and bounds */}
      <div className="relative mx-auto w-full max-w-7xl px-6">

        {/* Corner decorations - hidden on mobile so they don't overlap the badge/heading */}
        <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 rounded-tl-2xl border-l-[6px] border-t-[6px] border-[#ff383c] dark:border-red-500 sm:h-14 sm:w-14 sm:border-l-[8px] sm:border-t-[8px] lg:h-21.75 lg:w-21.75 lg:border-l-14 lg:border-t-14"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 rotate-180 rounded-tl-2xl border-l-[6px] border-t-[6px] border-[#ff383c] dark:border-red-500 sm:h-14 sm:w-14 sm:border-l-[8px] sm:border-t-[8px] lg:h-21.75 lg:w-21.75 lg:border-l-14 lg:border-t-14"></div>
        <div className="grid items-center gap-12 pt-12 sm:pt-14 lg:grid-cols-2 lg:pt-0">
          {/* Left Column: Text & Content */}
          <div className="space-y-6">
            <div className="badge-gradient inline-flex items-center gap-2 rounded-[13px] border border-navy-muted dark:border-gray-700 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-colors duration-300">
              <span className="size-1 rounded-full bg-navy dark:bg-blue-400"></span>
              <span className="font-khmer text-lg text-primary-color dark:text-blue-400 transition-colors duration-300">
                {currentT.showCase.heroCharacter.badge}
              </span>
            </div>

            <h2 aria-label={title} className="font-khmer text-4xl font-medium leading-tight text-primary-color transition-colors duration-300 dark:text-blue-400 sm:text-5xl">
              <span aria-hidden="true">{visibleTitle}</span>
              <span aria-hidden="true" className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-current align-[-0.06em]" />
            </h2>

            <p className="max-w-md font-khmer text-lg leading-8 text-black/80 dark:text-gray-300 transition-colors duration-300">
              {currentT.showCase.heroCharacter.description}
            </p>

            <Link
              href="/playground/editor"
              className="inline-flex items-center gap-2 rounded-xl border border-[#bfc8d5] dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-3 text-sm font-medium text-black dark:text-white transition-all duration-300 hover:bg-slate-50 dark:hover:bg-gray-700"
            >
              <img src="/home/svg/coding.svg" alt="" className="size-6 dark:invert" />
              <span className="font-khmer">
                {currentT.showCase.heroCharacter.button}
              </span>
            </Link>
          </div>

          {/* Right Column: Photo Collage */}
          <div className="relative mx-auto h-65 w-full max-w-xs sm:h-85 sm:max-w-md lg:h-105 lg:max-w-lg">
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