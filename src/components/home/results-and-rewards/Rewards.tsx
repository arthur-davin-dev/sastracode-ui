"use client";

import React from "react";

/**
 * HeroSection
 * A responsive hero layout: two icon slots (left/right) framing a
 * centered heading, description, and CTA button, with decorative
 * dashed arrows — matching the reference design.
 *
 * Plug in your own icon/illustration SVGs via the `leftIcon` and
 * `rightIcon` props.
 *
 * Usage (Next.js App Router):
 *   import HeroSection from "@/components/HeroSection";
 *   import CodeIcon from "@/icons/code.svg";
 *   import DashboardIcon from "@/icons/dashboard.svg";
 *
 *   export default function Page() {
 *     return (
 *       <HeroSection
 *         leftIcon={<CodeIcon />}
 *         rightIcon={<DashboardIcon />}
 *         onCtaClick={() => console.log("clicked")}
 *       />
 *     );
 *   }
 *
 * Fonts: the text uses Khmer glyphs, so make sure a Khmer-capable
 * font is loaded, e.g. in app/layout.tsx:
 *   import { Noto_Sans_Khmer } from "next/font/google";
 *   const khmer = Noto_Sans_Khmer({ subsets: ["khmer"], weight: ["400","600","700"] });
 *   <body className={khmer.className}>...
 */

export default function Rewards({
  leftIcon = <img src="/assets/home/svg/code-water.svg" />,
  rightIcon = <img src="/assets/home/svg/computer-water.svg" />,
  headingMain = "សមិទ្ធផលនិង",
  headingAccent = "រង្វាន់",
  description = "SastraCode ជាទីកន្លែងផ្តល់ XP, Badge និង Certificate ពីការរៀន និងការអនុវត្តជាបន្តបន្ទាប់សម្រាប់រៀន Programming ដោយរួមបញ្ចូលមេរៀន ការអនុវត្តជាក់ និងការតាមដានវឌ្ឍនភាពៗ",
  ctaLabel = "ចាប់ផ្តើមរៀន",
  onCtaClick,
  ctaHref,
}: {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  headingMain?: string;
  headingAccent?: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
}) {
  const Cta = ctaHref ? "a" : "button";

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-gray-900 px-4 py-12 sm:px-8 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:justify-between md:gap-4">
        {/* left icon */}
        <div className="relative flex w-full max-w-[220px] items-center justify-center md:w-1/4">
          <DecorativeArrow className="absolute -bottom-6 -left-2 w-16 scale-y-[-1] rotate-[8deg] text-[#1f2a4a] sm:w-20 md:-left-6 dark:text-white" />
          <div className="flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
            {leftIcon}
          </div>
        </div>

        {/* center content */}
        <div className="flex w-full max-w-xl flex-col items-center text-center md:w-1/2">
          <h2 className="text-2xl font-bold leading-tight text-[#1f2a4a] sm:text-3xl md:text-4xl dark:text-white">
            {headingMain}
            <span className="text-[#e0473e]">{headingAccent}</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-[#1f2a4a]/90 sm:text-base dark:text-white">
            {description}
          </p>

          <Cta
            {...(ctaHref ? { href: ctaHref } : { onClick: onCtaClick, type: "button" as const })}
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#0c1c4a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#152a63] sm:text-base"
          >
            {ctaLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </Cta>
        </div>

        {/* right icon */}
        <div className="relative flex w-full max-w-[220px] items-center justify-center md:w-1/4">
          <DecorativeArrow className="absolute -top-6 -right-2 w-16 -scale-x-100 rotate-[10deg] text-[#1f2a4a] sm:w-20 md:-right-6 dark:text-white" />
          <div className="flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
            {rightIcon}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small dashed, curved decorative arrow used near the icon slots. */
function DecorativeArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 70" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 10 C 30 5, 60 15, 85 45"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="6 6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M72 40 L86 47 L80 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
