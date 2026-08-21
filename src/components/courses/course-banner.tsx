"use client";

import { PlatformShowcase } from "@/components/home/PlatformShowcase";
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
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  const fullTitle = `${firstLine}\n${secondLine}`;
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    setVisibleTitle("");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      const showTitleTimer = window.setTimeout(
        () => setVisibleTitle(fullTitle),
        0,
      );
      return () => window.clearTimeout(showTitleTimer);
    }

    const characters = Array.from(fullTitle);

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
  }, [fullTitle]);

  const hasSecondLine = visibleTitle.includes("\n");
  const [firstVisible = "", secondVisible = ""] = visibleTitle.split("\n");

  return (
    <h1
      aria-label={`${firstLine} ${secondLine}`}
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
        {firstLine}

        <span className="block">{secondLine}</span>
      </span>

      {/* Animated text */}
      <span aria-hidden="true" className="absolute inset-0">
        <span>
          {firstVisible}

          {!hasSecondLine && <TypingCursor />}
        </span>

        <span className="block text-[#F51518]">
          {secondVisible}

          {hasSecondLine && <TypingCursor />}
        </span>
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
                text-lg
                leading-8
                text-slate-600
                dark:text-slate-300
                lg:text-xl
                lg:leading-9
              "
            >
              {banner.description}
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