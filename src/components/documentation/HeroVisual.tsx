"use client";

import Image from "next/image";
import { outerLogos, innerLogos } from "@/lib/data/documentation";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[420px] w-[420px] select-none sm:h-[470px] sm:w-[470px] md:h-[520px] md:w-[520px] animate-bob pointer-events-none">
      <div className="absolute inset-0 overflow-hidden z-0">
        <Image
          src="/images/doc-hero-image-transparent.png"
          alt="សិស្សសាស្ត្រាកូដកំពុងកាន់កុំព្យូទ័រយួរដៃ"
          fill
          priority
          className="object-contain scale-[1.08] drop-shadow-[0_20px_30px_rgba(37,99,235,0.18)]"
        />
      </div>

      <div className="absolute left-1/2 top-1/2 z-30 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow">
        {outerLogos.map((logo) => (
          <div
            key={logo.name}
            className={`absolute flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 ${logo.positionClass}`}
          >
            <div className="relative h-full w-full">
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

      <div className="absolute left-1/2 top-1/2 z-40 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow-reverse">
        {innerLogos.map((logo) => (
          <div
            key={logo.name}
            className={`absolute flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white p-2.5 shadow-md dark:border-slate-800 dark:bg-slate-900 ${logo.positionClass}`}
          >
            <div className="relative h-full w-full">
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
