"use client";

import { useEffect, useState } from "react";
import HeroVisual from "./HeroVisual";
import { useTranslation } from "@/hooks/useTranslations";

function TypingTitle({
  firstLine: TITLE_FIRST_LINE,
  secondLine: TITLE_SECOND_LINE,
}: {
  firstLine: string;
  secondLine: string;
}) {
  const FULL_TITLE = `${TITLE_FIRST_LINE}\n${TITLE_SECOND_LINE}`;
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [FULL_TITLE]);

  const hasSecondLine = visibleTitle.includes("\n");
  const [firstLine = "", secondLine = ""] = visibleTitle.split("\n");

  return (
    <div className="relative">
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
        <span aria-hidden="true" className="block text-secondary-color">
          {firstLine}
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

        <span aria-hidden="true" className="block text-[#002455]">
          {secondLine}
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
  const currentT = useTranslation();

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
      <div className="flex flex-col gap-6">
        <TypingTitle
          firstLine={currentT.hero.titleFirstLine}
          secondLine={currentT.hero.titleSecondLine}
        />

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
          {currentT.hero.description}
        </p>
      </div>

      <div className="mx-auto w-full">
        <HeroVisual />
      </div>
    </section>
  );
}