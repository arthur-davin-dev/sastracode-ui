"use client";

import { useEffect, useState } from "react";
import HeroVisual from "./HeroVisual";

const TITLE_FIRST_LINE = "មេរៀនបច្ចេកវិទ្យាព័ត៌មានវិទ្យា";
const TITLE_SECOND_LINE = "(IT) ជាភាសាខ្មែរ";

const FULL_TITLE = `${TITLE_FIRST_LINE}\n${TITLE_SECOND_LINE}`;

function TypingTitle() {
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Show full title immediately when reduced motion is enabled
    if (reduceMotion) {
      setVisibleTitle(FULL_TITLE);
      return;
    }

    const characters = Array.from(FULL_TITLE);

    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      index += deleting ? -1 : 1;

      setVisibleTitle(
        characters.slice(0, index).join(""),
      );

      // Finished typing
      if (!deleting && index === characters.length) {
        deleting = true;

        timer = window.setTimeout(type, 3000);
        return;
      }

      // Finished deleting
      if (deleting && index === 0) {
        deleting = false;

        timer = window.setTimeout(type, 700);
        return;
      }

      timer = window.setTimeout(
        type,
        deleting ? 30 : 60,
      );
    };

    timer = window.setTimeout(type, 400);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const hasSecondLine = visibleTitle.includes("\n");

  const [firstLine = "", secondLine = ""] =
    visibleTitle.split("\n");

  return (
    <div className="relative">
      {/* Invisible placeholder — always renders the FULL title so the
          box keeps a fixed size. This stops the page from growing/shrinking
          while the text types in. */}
      <div
        aria-hidden="true"
        className="
          invisible
          text-4xl
          font-extrabold
          leading-[1.4]
          tracking-tight
          sm:text-5xl
        "
      >
        <span className="block">{TITLE_FIRST_LINE}</span>
        <span className="block">{TITLE_SECOND_LINE}</span>
      </div>

      {/* Animated heading — sits exactly on top of the placeholder above */}
      <h1
        aria-label={`${TITLE_FIRST_LINE} ${TITLE_SECOND_LINE}`}
        className="
          absolute
          inset-0
          text-4xl
          font-extrabold
          leading-[1.4]
          tracking-tight
          sm:text-5xl
        "
      >
        {/* First line - Red / Secondary */}
        <span
          aria-hidden="true"
          className="block text-secondary-color"
        >
          {firstLine}

          {/* Cursor while typing first line */}
          {!hasSecondLine && (
            <span
              className="
                ml-1
                inline-block
                h-[0.9em]
                w-[3px]
                animate-pulse
                bg-secondary-color
                align-[-0.06em]
              "
            />
          )}
        </span>

        {/* Second line - Blue */}
        <span
          aria-hidden="true"
          className="block text-[#002455]"
        >
          {secondLine}

          {/* Cursor while typing second line */}
          {hasSecondLine && (
            <span
              className="
                ml-1
                inline-block
                h-[0.9em]
                w-[3px]
                animate-pulse
                bg-[#002455]
                align-[-0.06em]
              "
            />
          )}
        </span>
      </h1>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="
        mx-auto
        grid
        max-w-7xl
        grid-cols-1
        items-center
        gap-10
        px-4
        py-16
        sm:px-6
        lg:grid-cols-2
        lg:gap-14
        lg:px-8
      "
    >
      {/* ================= LEFT CONTENT ================= */}
      <div className="flex flex-col gap-6">
        {/* Animated Heading */}
        <TypingTitle />

        {/* Description */}
        <p
          className="
            max-w-xl
            text-[20px]
            leading-[1.8]
            text-slate-600
            transition-colors
            duration-300
            dark:text-slate-300
            sm:text-[22px]
          "
        >
          សិក្សាពីមូលដ្ឋានគ្រឹះនៃការសរសេរកូដ
          ការរចនា និងអភិវឌ្ឍគេហទំព័រ
          ការដោះស្រាយបញ្ហា មូលដ្ឋាននៃទិន្នន័យ
          បញ្ញាសិប្បនិម្មិត (AI)
          ប្រព័ន្ធសន្តិសុខសាយប័រ
          វិទ្យាសាស្ត្រទិន្នន័យ
          និងបច្ចេកវិទ្យាព័ត៌មានវិទ្យា (IT)
          ថ្មីៗជាច្រើនទៀត
          រហូតដល់ក្លាយខ្លួនជាអ្នកជំនាញ
          និងមានអាជីពវិជ្ជាជីវៈ។
        </p>
      </div>

      {/* ================= RIGHT VISUAL ================= */}
      <div className="mx-auto w-full">
        <HeroVisual />
      </div>
    </section>
  );
}
