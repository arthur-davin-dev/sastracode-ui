"use client";

import PlatformShowcase from "@/components/home/PlatformShowcase";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  PlayCircle,
} from "lucide-react";

// import { buttonVariants } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslations";

function TypingCursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-current align-[-0.06em]"
    />
  );
}

function TypingWelcome({ text }: { text: string }) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    setVisibleText("");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      const welcomeTimer = window.setTimeout(() => setVisibleText(text), 0);
      return () => window.clearTimeout(welcomeTimer);
    }

    const characters = Array.from(text);
    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      index += deleting ? -1 : 1;
      setVisibleText(characters.slice(0, index).join(""));

      if (!deleting && index === characters.length) {
        deleting = true;
        timer = window.setTimeout(type, 2600);
        return;
      }
      if (deleting && index === 0) {
        deleting = false;
        timer = window.setTimeout(type, 650);
        return;
      }

      timer = window.setTimeout(type, deleting ? 28 : 55);
    };

    timer = window.setTimeout(type, 250);
    return () => window.clearTimeout(timer);
  }, [text]);

  return (
    <span aria-label={text} className="inline-flex items-center">
      <span aria-hidden="true">{visibleText}</span>
      <TypingCursor />
    </span>
  );
}

function TypingTitle({
  firstLine,
  secondLine,
}: {
  firstLine: string;
  secondLine: string;
}) {
  const [visibleSecondLine, setVisibleSecondLine] = useState("");

  useEffect(() => {
    setVisibleSecondLine("");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      const timer = window.setTimeout(() => {
        setVisibleSecondLine(secondLine);
      }, 0);

      return () => window.clearTimeout(timer);
    }

    const characters = Array.from(secondLine);

    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      index += deleting ? -1 : 1;

      setVisibleSecondLine(
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
  }, [secondLine]);

  return (
    <h1
      aria-label={`${firstLine} ${secondLine}`}
      className="
        relative
        max-w-3xl
        text-[36px]
        font-bold
        leading-[1.45]
        tracking-tight
        text-primary-color
        sm:text-3xl
        lg:text-[48px]
        lg:leading-[1.4]
      "
    >
      {/* First line - STATIC */}
      <span className="block">
        {firstLine}
      </span>

      {/* Second line - TYPING */}
      <span className="block text-secondary-color">
        {visibleSecondLine}
        <TypingCursor />
      </span>
    </h1>
  );
}

export default function CourseBanner() {
  const t = useTranslation();
  const banner = t.courses.banner;

  const FEATURES = [
    { label: banner.features[0], icon: PlayCircle },
    { label: banner.features[1], icon: BookOpen },
    { label: banner.features[2], icon: Code2 },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-slate-200
        bg-transparent
        py-4
        transition-colors
        duration-300
        dark:border-slate-800
        dark:bg-transparent
        sm:py-6
        lg:py-8
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-primary-color/10
                bg-primary-color/5
                px-4
                py-1.5
                text-sm
                font-semibold
                text-primary-color
                dark:border-primary-color/20
                dark:bg-primary-color/10
                dark:text-primary-color
              "
            >
              <TypingWelcome text={banner.welcomeText} />
            </div>

            {/* Heading */}
            <TypingTitle
              firstLine={banner.titleFirstLine}
              secondLine={banner.titleSecondLine}
            />

            {/* Description */}
            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-slate-600
                dark:text-slate-300
                !text-[20px]
                sm:!text-[24px]
                sm:leading-8
              "
            >
              {banner.description}
            </p>

            {/* Features */}
            <div className="mt-8 flex flex-wrap xl:flex-nowrap gap-x-4 lg:gap-x-6 gap-y-5">
              {FEATURES.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm xl:text-base
                    font-medium
                    text-slate-700
                    dark:text-slate-300
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary-color/5
                      text-primary-color
                      dark:bg-primary-color/10
                      dark:text-primary-color
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#latest-courses"
                className="
      group
      inline-flex
      min-w-[12rem]
      lg:min-w-[16rem]
      items-center
      justify-center
      gap-2
      rounded-full
      bg-primary-color
      px-6
      sm:px-10
      py-3
      sm:py-4
      text-xs
      sm:text-base
      font-semibold
      text-white
      shadow-sm
      transition-all
      duration-300
      hover:bg-primary-color/90
      hover:text-white
      active:scale-[0.98]
    "
              >
                <span className="whitespace-nowrap">{banner.cta}</span>

                <ArrowRight
                  className="
        h-5
        w-5
        shrink-0
        transition-transform
        duration-300
        group-hover:translate-x-1
      "
                />
              </Link>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          {/* after */}
          <div className="relative lg:col-span-6">
            <PlatformShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
