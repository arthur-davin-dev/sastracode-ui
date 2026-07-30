"use client";

import Image from "next/image";
import Link from "next/link";
import { outerLogos, innerLogos } from "@/lib/data/documentation"; // Grouped imports nicely

export default function HeroVisual() {
  return (
    /* FIXED: Swapped h-100 w-100 for proper arbitrary bracket sizes h-[400px] w-[400px] */
    <div className="relative mx-auto h-[350px] w-[350px] sm:h-96 sm:w-96 md:h-[400px] md:w-[400px] animate-bob">
      
      {/* Character avatar */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <Image
          src="/images/doc-hero-image.png"
          alt="សិស្សសាស្ត្រាកូដកំពុងកាន់កុំព្យូទ័រយួរដៃ"
          fill
          className="object-contain"
        />
      </div>

      {/* Outer orbit */}
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow z-30 pointer-events-none">
        {outerLogos.map((logo) => (
          <Link
            key={logo.name}
            href={`/documentation/lessons/${logo.slug}`}
            className={`absolute w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center p-3 animate-counter-spin ${logo.positionClass} cursor-pointer hover:scale-110 transition-transform duration-200 pointer-events-auto z-50`}
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
          </Link>
        ))}
      </div>

      {/* Inner orbit */}
      <div className="absolute top-1/2 left-1/2 w-[85%] h-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow-reverse z-40 pointer-events-none">
        {innerLogos.map((logo) => (
          <Link
            key={logo.name}
            href={`/documentation/lessons/${logo.slug}`}
            className={`absolute w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center p-3 animate-counter-spin-reverse ${logo.positionClass} cursor-pointer hover:scale-110 transition-transform duration-200 pointer-events-auto z-50`}
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
          </Link>
        ))}
      </div>
    </div>
  );
}