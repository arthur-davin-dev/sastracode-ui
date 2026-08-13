"use client";

import Image from "next/image";
import { outerLogos, innerLogos } from "@/lib/data/documentation";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[450px] w-[450px] sm:h-100 sm:w-100 md:h-[450px] md:w-[450px] animate-bob pointer-events-none select-none">
      
      {/* Character / Main Hero Illustration */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <Image
          src="/images/doc-hero-image-transparent.png"
          alt="សិស្សសាស្ត្រាកូដកំពុងកាន់កុំព្យូទ័រយួរដៃ"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Outer Orbit Ring */}
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow z-30">
        {outerLogos.map((logo) => (
          <div
            key={logo.name}
            className={`absolute w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg dark:shadow-slate-950/50 flex items-center justify-center p-3 animate-counter-spin ${logo.positionClass}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={logo.imgSrc}
                alt={`${logo.name} logo`}
                fill
                className="object-contain"
                unoptimized 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inner Orbit Ring */}
      <div className="absolute top-1/2 left-1/2 w-[85%] h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow-reverse z-40">
        {innerLogos.map((logo) => (
          <div
            key={logo.name}
            className={`absolute w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg dark:shadow-slate-950/50 flex items-center justify-center p-3 animate-counter-spin-reverse ${logo.positionClass}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={logo.imgSrc}
                alt={`${logo.name} logo`}
                fill
                className="object-contain"
                unoptimized 
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}