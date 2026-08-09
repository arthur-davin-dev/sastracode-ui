// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';

// export default function HeroSection() {
//   const [coords, setCoords] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = Math.round(e.clientX - rect.left);
//     const y = Math.round(e.clientY - rect.top);
//     setCoords({ x, y });
//   };

//   return (
//     <section className="relative w-full min-h-screen lg:h-screen lg:min-h-[680px] bg-[#faf8f5] dark:bg-[#070c18] text-[#002455] dark:text-slate-100 px-3 py-3 sm:px-6 sm:py-4 overflow-hidden flex flex-col justify-between font-sans transition-colors duration-300">

//       {/* 1. CUSTOM ANIMATIONS */}
//       <style jsx global>{`
//         @keyframes subtlePulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.85; transform: scale(0.98); }
//         }
//         @keyframes cornerGlow {
//           0%, 100% { border-color: #dc0000; }
//           50% { border-color: #002455; }
//         }
//         .animate-subtle-pulse {
//           animation: subtlePulse 3s ease-in-out infinite;
//         }
//         .animate-corner-glow {
//           animation: cornerGlow 2s linear infinite;
//         }
//       `}</style>

//       {/* 2. GEOMETRIC GRID BACKGROUND (Light Mode & Dark Mode) */}
//       <div
//         className="absolute inset-0 opacity-[0.12] dark:opacity-[0.18] pointer-events-none transition-opacity duration-300 block dark:hidden"
//         style={{
//           backgroundImage: `linear-gradient(#002455 1.5px, transparent 1.5px), linear-gradient(90deg, #002455 1.5px, transparent 1.5px)`,
//           backgroundSize: '28px 28px',
//         }}
//       />
//       <div
//         className="absolute inset-0 opacity-[0.18] pointer-events-none transition-opacity duration-300 hidden dark:block"
//         style={{
//           backgroundImage: `linear-gradient(#38bdf8 1.5px, transparent 1.5px), linear-gradient(90deg, #38bdf8 1.5px, transparent 1.5px)`,
//           backgroundSize: '28px 28px',
//         }}
//       />

//       {/* 3. FLOATING ACCENT SHAPES */}
//       <div className="absolute top-20 left-6 w-10 h-10 xl:w-12 xl:h-12 border-4 border-[#002455] dark:border-slate-300 bg-[#dc0000] rotate-12 hidden xl:block shadow-[3px_3px_0px_0px_#002455] dark:shadow-[3px_3px_0px_0px_#38bdf8] hover:rotate-45 transition-transform duration-300" />
//       <div className="absolute bottom-16 right-8 w-12 h-12 xl:w-14 xl:h-14 border-4 border-[#002455] dark:border-slate-300 bg-[#dc0000] rounded-full hidden xl:block shadow-[3px_3px_0px_0px_#002455] dark:shadow-[3px_3px_0px_0px_#38bdf8] hover:scale-110 transition-transform duration-300" />

//       {/* 4. MAIN HERO CONTENT */}
//       <div className="relative z-10 max-w-6xl w-full mx-auto flex-1 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center py-4 lg:py-0">

//         {/* LEFT COLUMN: Quote & CTAs */}
//         <div className="lg:col-span-5 flex flex-col items-start text-left">

//           {/* Status Badge */}
//           <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#002455] dark:bg-slate-900 text-white font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-widest border-2 border-[#002455] dark:border-slate-700 shadow-[2px_2px_0px_0px_#dc0000] sm:shadow-[3px_3px_0px_0px_#dc0000] mb-3 sm:mb-4">
//             <span className="w-2 h-2 bg-[#dc0000] rounded-full animate-ping" />
//             Batch 2026 Active
//           </div>

//           {/* Hero Header Box */}
//           <div className="bg-white dark:bg-slate-900 border-2 sm:border-4 border-[#002455] dark:border-slate-700 p-4 sm:p-6 shadow-[4px_4px_0px_0px_#002455] sm:shadow-[6px_6px_0px_0px_#002455] dark:shadow-[4px_4px_0px_0px_#38bdf8] dark:sm:shadow-[6px_6px_0px_0px_#38bdf8] w-full mb-4 sm:mb-5 relative group">
//             <h1 className="text-lg sm:text-2xl lg:text-3xl font-black font-khmer text-[#002455] dark:text-slate-100 leading-normal sm:leading-relaxed lg:leading-[1.4]">
//               “សាស្ត្រា<span className="bg-[#dc0000] text-white px-1.5 py-0.5 sm:px-2 border-2 border-[#002455] dark:border-slate-300 ml-1 inline-block shadow-[2px_2px_0px_0px_#002455] dark:shadow-[2px_2px_0px_0px_#38bdf8] group-hover:bg-[#002455] dark:group-hover:bg-cyan-600 transition-colors">កូដ</span> កសាងអនាគតយុវជនឌីជីថលរបស់កម្ពុជា”
//             </h1>

//             <div className="w-full h-0.5 sm:h-1 bg-[#002455] dark:bg-slate-700 my-2.5 sm:my-3" />

//             <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#002455] dark:text-cyan-400">
//               [ Standardizing Digital Excellence ]
//             </p>
//           </div>

//           {/* Hero CTA Buttons */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
//             <button className="w-full sm:w-auto flex-1 bg-[#002455] dark:bg-cyan-600 text-white font-mono font-bold text-xs uppercase px-4 py-2.5 border-2 border-[#002455] dark:border-slate-300 shadow-[3px_3px_0px_0px_#dc0000] sm:shadow-[4px_4px_0px_0px_#dc0000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-center">
//               Explore Projects →
//             </button>
//             <button className="w-full sm:w-auto flex-1 bg-white dark:bg-slate-900 text-[#002455] dark:text-slate-200 font-mono font-bold text-xs uppercase px-4 py-2.5 border-2 border-[#002455] dark:border-slate-700 shadow-[3px_3px_0px_0px_#002455] sm:shadow-[4px_4px_0px_0px_#002455] dark:shadow-[3px_3px_0px_0px_#38bdf8] dark:sm:shadow-[4px_4px_0px_0px_#38bdf8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-center">
//               Team Roster
//             </button>
//           </div>

//         </div>

//         {/* RIGHT COLUMN: Interactive HUD Photo Frame */}
//         <div className="lg:col-span-7 relative w-full h-[260px] sm:h-[380px] lg:h-[440px] xl:h-[480px]">

//           {/* Offset Red Shadow Box */}
//           <div className="absolute inset-0 bg-[#dc0000] dark:bg-cyan-500/80 border-2 sm:border-4 border-[#002455] dark:border-slate-700 translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3" />

//           {/* Main Card Shell with Mouse-Tracking HUD */}
//           <div
//             className="relative w-full h-full bg-white dark:bg-slate-900 border-2 sm:border-4 border-[#002455] dark:border-slate-300 overflow-hidden group cursor-crosshair"
//             onMouseMove={handleMouseMove}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >

//             <Image
//               src="/IMG_5281.jpg"
//               alt="SastraCode Team Photo"
//               fill
//               className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
//               priority
//             />

//             {/* INTERACTIVE HUD TARGET OVERLAY */}
//             {isHovered && (
//               <div className="absolute inset-0 pointer-events-none z-20 hidden sm:block">
//                 {/* Horizontal Crosshair Line */}
//                 <div
//                   className="absolute w-full h-[1px] bg-[#dc0000]/70 dark:bg-cyan-400/90"
//                   style={{ top: `${coords.y}px` }}
//                 />
//                 {/* Vertical Crosshair Line */}
//                 <div
//                   className="absolute h-full w-[1px] bg-[#dc0000]/70 dark:bg-cyan-400/90"
//                   style={{ left: `${coords.x}px` }}
//                 />
//                 {/* Coordinate Readout Badge */}
//                 <div
//                   className="absolute bg-[#002455] dark:bg-slate-950 text-white dark:text-cyan-400 font-mono text-[9px] font-bold px-1.5 py-0.5 border border-[#dc0000] dark:border-cyan-400"
//                   style={{ top: `${coords.y + 8}px`, left: `${coords.x + 8}px` }}
//                 >
//                   X:{coords.x} Y:{coords.y}
//                 </div>
//               </div>
//             )}

//             {/* Tech Corner Markers */}
//             <div className="absolute top-0 left-0 bg-[#002455] dark:bg-slate-950 text-white dark:text-cyan-400 font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 border-r-2 border-b-2 border-[#002455] dark:border-slate-700 z-10">
//               IMG_REF: 01
//             </div>

//             <div className="absolute bottom-0 right-0 bg-[#dc0000] dark:bg-cyan-600 text-white font-mono text-[10px] sm:text-xs font-black px-2.5 py-1 sm:px-3.5 sm:py-1.5 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-[#002455] dark:border-slate-900 uppercase tracking-wider z-10">
//               SastraCode // Team
//             </div>

//             {/* Tactical Frame Corners */}
//             <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#dc0000] dark:border-cyan-400 z-10" />
//             <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#dc0000] dark:border-cyan-400 z-10" />

//           </div>
//         </div>

//       </div>

//       {/* 5. FOOTER TICKER BAR */}
//       <footer className="relative z-20 max-w-6xl w-full mx-auto bg-[#002455] dark:bg-slate-900 text-white py-1 px-3 sm:py-1.5 sm:px-4 border-2 border-[#002455] dark:border-slate-700 font-mono text-[10px] sm:text-[11px] flex justify-between items-center shadow-[2px_2px_0px_0px_#dc0000] sm:shadow-[3px_3px_0px_0px_#dc0000] dark:shadow-[2px_2px_0px_0px_#38bdf8] dark:sm:shadow-[3px_3px_0px_0px_#38bdf8]">
//         <div className="flex items-center gap-1.5 sm:gap-2">
//           <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
//           <span>STATUS: 200</span>
//         </div>
//         <div className="hidden sm:block uppercase tracking-widest font-bold text-[#faf8f5] dark:text-slate-300">
//           Phnom Penh • Cambodia
//         </div>
//         <div className="text-white dark:text-cyan-400 font-bold">COHORT_2026</div>
//       </footer>

//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { ArrowRight, BookOpen, Braces, Code2, Rocket, Trophy } from "lucide-react";
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
            សាស្រ្តាកូដ គឺជាវេទិកាសិក្សាកម្មវិធីដែលបង្កើតឡើង ដើម្បីជួយអ្នកសិក្សាកូដតាមរបៀបងាយយល់អនុវត្តជាក់ស្តែង និង បង្កើតគម្រោងពិត ដើម្បីត្រៀមខ្លួនសម្រាប់អនាគតឌីជីថល។
          </p>

          {/* Feature Icons */}
          <div className="mb-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
            {features.map(({ icon: Icon, line1, line2 }) => (
              <div key={line1} className="flex flex-col items-center gap-3 text-center">
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
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/70" />
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
            <span className="mr-1 font-mono text-cyan-400 opacity-90">{"</>"}</span>
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
          <div className="absolute -bottom-6 left-2 w-64 rounded-xl bg-[#041B45] dark:bg-slate-950/95 border border-slate-800 p-4 font-mono text-xs leading-relaxed text-slate-300 shadow-2xl sm:left-6 sm:w-72 backdrop-blur-md">
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