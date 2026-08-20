"use client";

import Image from "next/image";
import { BookOpen, Braces, Code2, Rocket, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import DotGrid from "@/components/about-us/DotGrid";
import { useTranslation } from "@/hooks/useTranslations";

// Icons aren't stored in the text files, so we keep them here and
// pair them with translated lines by index (order must match en.ts/km.ts).
const FEATURE_ICONS = [BookOpen, Code2, Rocket, Trophy];

function TypingSlogan({ title }: { title: string }) {
  const [visibleTitle, setVisibleTitle] = useState("");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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

    timer = window.setTimeout(type, 350);
    return () => window.clearTimeout(timer);
    // Re-run the whole typing animation whenever the title text changes
    // (i.e. whenever the language is switched).
  }, [title]);

  const [mainTitle = "", subtitle = ""] = visibleTitle.split("\n");

  return (
    <div aria-label={title}>
      <h1 className="mb-3 font-khmer text-5xl font-extrabold leading-tight text-secondary-color dark:text-white sm:text-6xl">
        <span aria-hidden="true">{mainTitle}</span>
        {!subtitle && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[0.9em] w-0.75 animate-pulse bg-secondary-color align-[-0.06em] dark:bg-cyan-400"
          />
        )}
      </h1>
      <h2 className="mb-6 font-khmer text-2xl font-extrabold leading-snug text-primary-color dark:text-slate-200 sm:text-3xl">
        <span aria-hidden="true">{subtitle}</span>
        {subtitle && (
          <span
            aria-hidden="true"
            className="ml-1 inline-block h-[0.9em] w-0.75 animate-pulse bg-secondary-color align-[-0.06em] dark:bg-cyan-400"
          />
        )}
      </h2>
    </div>
  );
}

export default function AboutUs() {
  const currentT = useTranslation();
  const about = currentT.aboutUs;

  const features = about.features.map((f, i) => ({
    icon: FEATURE_ICONS[i] ?? BookOpen,
    line1: f.line1,
    line2: f.line2,
  }));

  return (
    <section className="relative overflow-hidden bg-[#F4F5F9] dark:bg-primary-color py-20 px-6 sm:px-10 lg:px-16 transition-colors duration-500 selection:bg-primary-color selection:text-white">
      {/* Background dot grids */}
      <DotGrid
        rows={4}
        cols={4}
        color="currentColor"
        className="pointer-events-none absolute right-[30%] top-10 hidden lg:grid text-[#C9CEDA] dark:text-slate-800"
      />
      <DotGrid
        rows={3}
        cols={3}
        color="currentColor"
        className="pointer-events-none absolute left-6 bottom-10 hidden lg:grid text-[#C9CEDA] dark:text-slate-800"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        {/* ---------------------------------------------------------- */}
        {/* Left column                                                */}
        {/* ---------------------------------------------------------- */}
        <div>
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <span
              className="font-mono text-lg font-semibold text-primary-color dark:text-cyan-400"
              aria-hidden="true"
            >
              {"</>"}
            </span>
            <span
              className="px-5 py-2 text-sm font-bold tracking-wide text-white bg-secondary-color dark:bg-[#B8081C]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)",
              }}
            >
              {about.eyebrow}
            </span>
            <span className="relative h-px flex-1 bg-[#0B2558]/40 dark:bg-slate-700">
              <span className="absolute -right-0.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#0B2558] dark:bg-cyan-400" />
            </span>
          </div>

          {/* Floating Background Accent Shapes */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="animate-float-slow absolute left-[8%] top-[20%] h-2 w-2 rounded-full bg-[#B8081C]" />
            <span className="animate-float-medium absolute left-[25%] top-[70%] h-2 w-2 rounded-full bg-[#0B2558] dark:bg-cyan-400" />
            <span className="animate-float-fast absolute right-[25%] top-[15%] h-2.5 w-2.5 rounded-full bg-[#B8081C]" />
            <span className="animate-float-slow absolute right-[8%] top-[65%] h-2 w-2 rounded-full bg-[#0B2558] dark:bg-cyan-400" />
            <span className="animate-float-medium absolute left-[40%] bottom-[12%] h-5 w-5 rounded-full border-2 border-[#B8081C]/30" />
            <span className="animate-float-fast absolute right-[15%] bottom-[20%] h-4 w-4 rounded-full border border-[#0B2558]/30 dark:border-white/20" />
          </div>

          {/* Heading (typed, animates on language switch too) */}
          <TypingSlogan title={about.title} />

          <div className="mb-6 h-1 w-24 rounded-full bg-[#B8081C]" />

          {/* Paragraph */}
          <p className="mb-10 max-w-xl font-khmer leading-relaxed text-primary-color dark:text-slate-400">
            {about.description}
          </p>

          {/* Feature Icons */}
          <div className="mb-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
            {features.map(({ icon: Icon, line1, line2 }) => (
              <div
                key={line1}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#0B2558]/20 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-primary-color dark:text-cyan-400 backdrop-blur-sm shadow-sm">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <p className="font-khmer text-sm font-semibold leading-snug text-primary-color dark:text-slate-200">
                  {line1}
                  <br />
                  {line2}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Rule */}
          <div className="flex items-center gap-3">
            <div className="h-0.5 w-24 bg-[#0B2558] dark:bg-slate-700" />
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0B2558] dark:bg-cyan-400" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8081C]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Right column — photo panel                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="relative mx-auto w-full max-w-xl pb-10 pr-4 pt-4 lg:pb-14 lg:pr-6 lg:pt-6">
          {/* Navy diagonal cut, top-right */}
          <div
            className="absolute right-0 top-0 h-40 w-2/3 sm:h-48 bg-[#041B45] dark:bg-slate-900 border-l border-t border-slate-700/50"
            style={{
              clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <DotGrid
              rows={4}
              cols={5}
              dotSize={4}
              gap={8}
              color="#ffffff55"
              className="absolute right-6 top-6 hidden sm:grid"
            />
          </div>

          {/* Red angled frame, bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-linear-to-r from-[#B8081C] to-[#8C0714]"
            style={{
              clipPath: "polygon(0 45%, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-white/70"
                />
              ))}
            </div>
          </div>

          {/* Red vertical accent, left edge */}
          <div className="absolute -left-2 top-10 h-2/3 w-1.5 rounded-full bg-[#B8081C]" />

          {/* Photo Card Container */}
          <div className="relative rounded-[28px] bg-white dark:bg-slate-900 p-3 shadow-xl dark:shadow-2xl border border-slate-200/60 dark:border-slate-800">
            <div className="relative aspect-4/3 overflow-hidden rounded-[20px]">
              <Image
                src="/team.jpg"
                alt="Our team"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Floating Badge: Code Together / Build Tomorrow */}
          <div className="absolute -top-2 right-6 hidden max-w-55 rounded-xl bg-[#0B2558] dark:bg-slate-900 border border-slate-700/80 px-4 py-3 text-xs font-semibold leading-snug text-white shadow-lg sm:block lg:right-10">
            <span className="mr-1 font-mono text-cyan-400 opacity-90">
              {"</>"}
            </span>
            {about.code}
            <br />
            {about.build}
          </div>

          {/* Floating "{}" Badge, Top-Right Corner */}
          <div className="absolute -right-3 top-24 hidden h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg sm:flex lg:top-28">
            <Braces className="h-6 w-6 text-[#B8081C] dark:text-cyan-400" />
          </div>

          {/* Floating "</>" Badge, Bottom-Right Corner */}
          <div className="absolute -right-3 bottom-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <Code2 className="h-6 w-6 text-primary-color dark:text-cyan-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
