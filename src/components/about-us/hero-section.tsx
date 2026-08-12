"use client";

import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Code2,
  Rocket,
  Trophy,
} from "lucide-react";
import DotGrid from "@/components/about-us/DotGrid";

const features = [
  { icon: BookOpen, line1: "ចេះសិក្សា", line2: "មិនអស់" },
  { icon: Code2, line1: "អភិវឌ្ឍន៍ជំនាញ", line2: "ជាបន្តបន្ទាប់" },
  { icon: Rocket, line1: "ត្រៀមខ្លួន", line2: "បង្កើតអនាគត" },
  { icon: Trophy, line1: "គុណភាព", line2: "និងទំនួលខុសត្រូវ" },
];

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-[#F4F5F9] dark:bg-[#070c18] py-20 px-6 sm:px-10 lg:px-16 transition-colors duration-500 selection:bg-[#B8081C] selection:text-white">
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
              className="font-mono text-lg font-semibold text-[#0B2558] dark:text-cyan-400"
              aria-hidden="true"
            >
              {"</>"}
            </span>
            <span
              className="px-5 py-2 text-sm font-bold tracking-wide text-white bg-[#B8081C] dark:bg-[#B8081C]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 88% 100%, 0% 100%)",
              }}
            >
              ABOUT US
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

          {/* Heading */}
          <h1 className="mb-3 font-khmer text-5xl font-extrabold leading-tight text-[#0B2558] dark:text-white sm:text-6xl">
            សាស្រ្តា{" "}
            <span className="inline-block rounded-md align-middle text-[#B8081C] dark:text-cyan-400">
              កូដ
            </span>
          </h1>
          <h2 className="mb-6 font-khmer text-2xl font-extrabold leading-snug text-[#0B2558] dark:text-slate-200 sm:text-3xl">
            កសាងអនាគតយុវជនឌីជីថលរបស់កម្ពុជា
          </h2>

          <div className="mb-6 h-1 w-24 rounded-full bg-[#B8081C]" />

          {/* Paragraph */}
          <p className="mb-10 max-w-xl font-khmer leading-relaxed text-slate-600 dark:text-slate-400">
            សាស្រ្តាកូដ គឺជាវេទិកាសិក្សាកម្មវិធីដែលបង្កើតឡើង
            ដើម្បីជួយអ្នកសិក្សាកូដតាមរបៀបងាយយល់អនុវត្តជាក់ស្តែង និង
            បង្កើតគម្រោងពិត ដើម្បីត្រៀមខ្លួនសម្រាប់អនាគតឌីជីថល។
          </p>

          {/* Feature Icons */}
          <div className="mb-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
            {features.map(({ icon: Icon, line1, line2 }) => (
              <div
                key={line1}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#0B2558]/20 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-[#0B2558] dark:text-cyan-400 backdrop-blur-sm shadow-sm">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <p className="font-khmer text-sm font-semibold leading-snug text-[#0B2558] dark:text-slate-200">
                  {line1}
                  <br />
                  {line2}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mb-10 flex flex-wrap gap-4 font-khmer">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B2558] dark:bg-linear-to-r dark:from-cyan-500 dark:to-blue-600 px-6 py-4 text-sm font-bold text-white transition-all shadow-md shadow-[#0B2558]/20 dark:shadow-cyan-500/20 hover:opacity-90 hover:shadow-lg"
            >
              ស្វែងរកគម្រោងរបស់យើង
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#team"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0B2558]/20 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-4 text-sm font-bold text-[#B8081C] dark:text-slate-200 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              មើលក្រុមការងារ
            </a>
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
                src="/images/IMG_5281.jpg"
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
            Code Together
            <br />
            Build Tomorrow
          </div>

          {/* Floating "{}" Badge, Top-Right Corner */}
          <div className="absolute -right-3 top-24 hidden h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg sm:flex lg:top-28">
            <Braces className="h-6 w-6 text-[#B8081C] dark:text-cyan-400" />
          </div>

          {/* Floating "</>" Badge, Bottom-Right Corner */}
          <div className="absolute -right-3 bottom-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg">
            <Code2 className="h-6 w-6 text-[#0B2558] dark:text-cyan-400" />
          </div>

          {/* Code Snippet Card, Bottom-Left */}
          <div className="absolute -bottom-6 left-2 w-64 rounded-xl bg-white dark:bg-[#041B45] border border-slate-200 dark:border-slate-800 p-4 font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300 shadow-2xl sm:left-6 sm:w-72 backdrop-blur-md">
            <span className="text-[#ff8a8a]">function</span> team() {"{"}
            <br />
            &nbsp;&nbsp;passion: <span className="text-[#7fe0a8]">true</span>,
            <br />
            &nbsp;&nbsp;skills: <span className="text-[#7fe0a8]">true</span>,
            <br />
            &nbsp;&nbsp;future: <span className="text-[#7fe0a8]">true</span>
            <br />
            {"}"}
          </div>
        </div>
      </div>
    </section>
  );
}
