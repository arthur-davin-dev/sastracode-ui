"use client";

import React from "react";

/**
 * FeatureSection
 * A responsive 3-column feature layout with corner-bracket frames
 * and captions, matching the reference design.
 *
 * Plug in your own icons via the `icon` prop for each feature —
 * pass your SVG components, <img> tags, or Next <Image /> elements.
 *
 * Usage (Next.js App Router):
 *   import FeatureSection from "@/components/FeatureSection";
 *   import DocIcon from "@/icons/doc.svg";
 *   import LaptopIcon from "@/icons/laptop.svg";
 *   import RobotIcon from "@/icons/robot.svg";
 *
 *   export default function Page() {
 *     return (
 *       <FeatureSection
 *         features={[
 *           { icon: <DocIcon />, lines: ["សិក្សាតាមរយៈមេរៀនដែលមានការពន្យល់", "និងឧទាហរណ៍ជាក់ស្តែងៗ"] },
 *           { icon: <LaptopIcon />, lines: ["សរសេរ សាកល្បង", "និងដំណើរការកូដបានភ្លាមៗនៅក្នុង Browserៗ"] },
 *           { icon: <RobotIcon />, lines: ["ទទួលបានព័ត៌មានជំនួយ និងការពន្យល់កូដ", "ដើម្បីអភិវឌ្ឍជំនាញរបស់អ្នកៗ"] },
 *         ]}
 *       />
 *     );
 *   }
 *
 * Fonts: the captions use Khmer glyphs, so make sure a Khmer-capable
 * font is loaded, e.g. in app/layout.tsx:
 *   import { Noto_Sans_Khmer } from "next/font/google";
 *   const khmer = Noto_Sans_Khmer({ subsets: ["khmer"], weight: ["400","600"] });
 *   <body className={khmer.className}>...
 */

import { useLanguage } from "@/app/Context";

import { en } from "./locale/en";
import { km } from "./locale/km";

export type Feature = {
  icon: React.ReactNode;
  lines: string[];
};

const defaultFeatures: Feature[] = [
  {
    icon: <img src="/home/feature-section/lessons.png" />,
    lines: ["សិក្សាតាមរយៈមេរៀនដែលមានការពន្យល់", "និងឧទាហរណ៍ជាក់ស្តែងៗ"],
  },
  {
    icon: <img src="/home/feature-section/laptop.png" />,
    lines: ["សរសេរ សាកល្បង", "និងដំណើរការកូដបានភ្លាមៗនៅក្នុង Browserៗ"],
  },
  {
    icon: <img src="/home/feature-section/robot.png" />,
    lines: ["ទទួលបានព័ត៌មានជំនួយ និងការពន្យល់កូដ", "ដើម្បីអភិវឌ្ឍជំនាញរបស់អ្នកៗ"],
  },
];

const icons = [
  <img key="1" src="/home/feature-section/lessons.png" />,
  <img key="2" src="/home/feature-section/laptop.png" />,
  <img key="3" src="/home/feature-section/robot.png" />,
];

export default function FeatureSection({
  features = defaultFeatures,
}: {
  features?: Feature[];
}) {
  const { lang } = useLanguage();

  const translations = {
    en,
    km,
  };

  const currentT = translations[lang];

  features = currentT.featureSection.features.map((feature, index) => ({
    icon: icons[index],
    lines: feature.lines,
  }));

  return (
    <section className="w-full bg-gradient-to-b from-[#fdf3f3] to-white px-4 py-12 sm:px-6 sm:py-16 dark:from-[#0B1120] dark:to-[#111827]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-6 md:gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            lines={feature.lines}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ icon, lines }: { icon: React.ReactNode; lines: string[] }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* icon */}
      <div className="mb-4 flex h-24 w-24 items-end justify-center sm:h-28 sm:w-28 md:h-32 md:w-32">
        {icon}
      </div>

      {/* frame */}
      <div className="relative w-full max-w-[320px] px-4 pb-6 pt-4">
        {/* top line */}
        <div className="border-t border-[#2b3b6b]/70 dark:border-slate-500" />

        <p className="mt-4 px-2 text-sm leading-relaxed text-[#1f2a4a] sm:text-[15px] dark:text-slate-200">
          {lines.map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>

        {/* bottom corners */}
        <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-[#2b3b6b]/70 dark:border-slate-500" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-[#2b3b6b]/70 dark:border-slate-500" />
      </div>
    </div>
  );
}
