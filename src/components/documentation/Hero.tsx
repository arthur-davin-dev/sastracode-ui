"use client";

import { useEffect, useState } from "react";
import HeroSearchBar from "./HeroSearchBar";
import TechStackChips from "./TechStackChips";
import HeroVisual from "./HeroVisual";
import { techOptions } from "@/lib/data/courses";

const DOCUMENTATION_TITLE = "មេរៀនបច្ចេកវិទ្យាព័ត៌មានវិទ្យា (IT) ជាភាសាខ្មែរ";

function TypingTitle() {
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      const titleTimer = window.setTimeout(
        () => setVisibleTitle(DOCUMENTATION_TITLE),
        0,
      );
      return () => window.clearTimeout(titleTimer);
    }

    const characters = Array.from(DOCUMENTATION_TITLE);
    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      index += deleting ? -1 : 1;
      setVisibleTitle(characters.slice(0, index).join(""));

      if (!deleting && index === characters.length) {
        deleting = true;
        timer = window.setTimeout(type, 3000);
        return;
      }

      if (deleting && index === 0) {
        deleting = false;
        timer = window.setTimeout(type, 700);
        return;
      }

      timer = window.setTimeout(type, deleting ? 30 : 60);
    };

    timer = window.setTimeout(type, 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <h1
      aria-label={DOCUMENTATION_TITLE}
      className="text-primary-color text-4xl font-extrabold leading-tight sm:text-5xl"
    >
      <span aria-hidden="true" className="text-secondary-color">
        {visibleTitle}
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-secondary-color align-[-0.06em]"
      />
    </h1>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="flex flex-col gap-6">
        <TypingTitle />
        <h1
          aria-hidden="true"
          className="hidden text-4xl font-extrabold leading-tight sm:text-5xl"
        >
          <span className="text-secondary-color">
            មេរៀនបច្ចេកវិទ្យាព័ត៌មានវិទ្យា{" "}
          </span>

          <span className="text-primary-color">(IT) ជាភាសាខ្មែរ</span>
        </h1>

        <p className="max-w-lg text-[20px] sm:text-[22px] leading-relaxed text-slate-600 dark:text-slate-300 transition-colors duration-300">
          សិក្សាពីមូលដ្ឋានគ្រឹះនៃការសរសេរកូដ ការរចនា និងអភិវឌ្ឍគេហទំព័រ
          ការដោះស្រាយបញ្ញា មូលដ្ឋាននៃទិន្នន័យ បញ្ញាសិប្បនិម្មិត (AI)
          ប្រព័ន្ធសន្ដិសុខសាយប័រ វិទ្យាសាស្រ្ដទិន្នន័យ
          និងបច្ចេកវិទ្យាព័ត៌មានវិទ្យា (IT) ថ្មីៗជាច្រើនទៀត
          រហូតដល់ក្លាយខ្លួនជាអ្នកជំនាញ និងមានអាជីពវិជ្ជាជីវៈ
        </p>

        {/* <HeroSearchBar /> */}

        {/* <TechStackChips options={techOptions} /> */}
      </div>

      <div className="mx-auto">
        <HeroVisual />
      </div>
    </section>
  );
}
