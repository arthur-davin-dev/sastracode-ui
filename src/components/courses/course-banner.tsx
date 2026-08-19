"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const TITLE_FIRST_LINE = "រៀនសរសេរកូដជាភាសាខ្មែរ";
const TITLE_SECOND_LINE = "ពីមូលដ្ឋានរហូតដល់គម្រោងពិត";
const WELCOME_TEXT = "សូមស្វាគមន៍មកកាន់ Sastra Code";

const FULL_TITLE = `${TITLE_FIRST_LINE}\n${TITLE_SECOND_LINE}`;

const FEATURES = [
  {
    label: "វីដេអូមេរៀន",
    icon: PlayCircle,
  },
  {
    label: "ឯកសារសិក្សា",
    icon: BookOpen,
  },
  {
    label: "លំហាត់ និងគម្រោង",
    icon: Code2,
  },
];

function TypingCursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-1 inline-block h-[0.9em] w-[3px] animate-pulse bg-current align-[-0.06em]"
    />
  );
}

function TypingWelcome() {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const welcomeTimer = window.setTimeout(() => setVisibleText(WELCOME_TEXT), 0);
      return () => window.clearTimeout(welcomeTimer);
    }

    const characters = Array.from(WELCOME_TEXT);
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
  }, []);

  return (
    <span aria-label={WELCOME_TEXT} className="inline-flex items-center">
      <span aria-hidden="true">{visibleText}</span>
      <TypingCursor />
    </span>
  );
}

function TypingTitle() {
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    // Respect reduced-motion accessibility setting
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      const showTitleTimer = window.setTimeout(
        () => setVisibleTitle(FULL_TITLE),
        0,
      );
      return () => window.clearTimeout(showTitleTimer);
    }

    const characters = Array.from(FULL_TITLE);

    let index = 0;
    let deleting = false;
    let timer: number | undefined;

    const type = () => {
      index += deleting ? -1 : 1;

      setVisibleTitle(characters.slice(0, index).join(""));

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

      timer = window.setTimeout(type, deleting ? 30 : 60);
    };

    timer = window.setTimeout(type, 400);

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const hasSecondLine = visibleTitle.includes("\n");

  const [firstLine = "", secondLine = ""] = visibleTitle.split("\n");

  return (
    <h1
      aria-label={`${TITLE_FIRST_LINE} ${TITLE_SECOND_LINE}`}
      className="
        relative
        max-w-3xl
        text-3xl
        font-bold
        leading-[1.45]
        tracking-tight
        text-[#002455]
        dark:text-white
        sm:text-4xl
        lg:text-5xl
        lg:leading-[1.4]
      "
    >
      {/* Invisible full title keeps heading height stable */}
      <span aria-hidden="true" className="invisible">
        {TITLE_FIRST_LINE}

        <span className="block">{TITLE_SECOND_LINE}</span>
      </span>

      {/* Animated text */}
      <span aria-hidden="true" className="absolute inset-0">
        <span>
          {firstLine}

          {!hasSecondLine && <TypingCursor />}
        </span>

        <span className="block text-[#F51518]">
          {secondLine}

          {hasSecondLine && <TypingCursor />}
        </span>
      </span>
    </h1>
  );
}

export default function CourseBanner() {
  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-slate-200
        bg-white
        py-12
        transition-colors
        duration-300
        dark:border-slate-800
        dark:bg-slate-950
        sm:py-16
        lg:py-20
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-[#002455]/5
          dark:bg-[#002455]/20
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-28
          -right-20
          h-72
          w-72
          rounded-full
          bg-[#F51518]/5
          dark:bg-[#F51518]/10
        "
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#002455]/10
                bg-[#002455]/5
                px-4
                py-2
                text-lg
                font-semibold
                text-[#002455]
                dark:border-blue-400/20
                dark:bg-blue-400/10
                dark:text-blue-300
              "
            >
              <Sparkles className="h-5 w-5 shrink-0" />

              <TypingWelcome />
            </div>

            {/* Heading */}
            <TypingTitle />

            {/* Description */}
            <p
              className="
                mt-6
                max-w-2xl
                text-lg
                leading-8
                text-slate-600
                dark:text-slate-300
                lg:text-xl
                lg:leading-9
              "
            >
              SastraCode ជួយអ្នកអភិវឌ្ឍជំនាញសរសេរកូដជាជំហានៗ តាមរយៈវីដេអូមេរៀន
              ឯកសារសិក្សា លំហាត់អនុវត្ត និងគម្រោងពិត ដែលងាយស្រួលរៀន
              និងយល់សម្រាប់អ្នកសិក្សាកម្ពុជា។
            </p>

            {/* Features */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
              {FEATURES.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="
                    flex
                    items-center
                    gap-3
                    text-lg
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
                      bg-[#002455]/5
                      text-[#002455]
                      dark:bg-blue-400/10
                      dark:text-blue-300
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#latest-courses"
                className={`
                  ${buttonVariants({
                    variant: "default",
                    size: "lg",
                  })}
                  group
                  h-14
                  rounded-xl
                  bg-[#002455]
                  px-8
                  text-lg
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-[#001b40]
                  hover:text-white
                  active:scale-[0.98]
                `}
              >
                <span className="whitespace-nowrap">ចាប់ផ្តើមសិក្សា</span>

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
          <div className="relative lg:col-span-5">
            <div className="group relative mx-auto aspect-[3/2] w-full max-w-md overflow-hidden rounded-3xl bg-slate-100 lg:max-w-none">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/student.gif.mp4" type="video/mp4" />
              </video>

              {/* Very light overlay only */}
              <div className="pointer-events-none absolute inset-0 bg-black/[0.02]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
