'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full aspect-[16/9] lg:h-screen overflow-hidden">

      {/* Background Image - Fits 100% width and height evenly */}
      <Image
        src="/about-us/hero-section.png"
        alt="Hero Section"
        fill
        priority
        className="object-fill lg:object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 text-center flex flex-col items-center justify-center">

          {/* Top Line */}
          <div className="mb-2 sm:mb-4 lg:mb-10 h-0.5 sm:h-1 w-2/3 sm:w-1/2 lg:w-full max-w-4xl rounded-full bg-yellow-400" />
          {/* Main Title */}
          <h1
            className="
              font-khmer
              font-bold
              text-white
              text-center
              leading-[1.1]
              drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]
              text-[clamp(1rem,4vw,6rem)]
            "
          >
            <span className="whitespace-nowrap">
              “សាស្ត្រា<span className="text-red-500">កូដ </span>
              កសាងអនាគតយុវជនឌីជីថល
            </span>

            <br />

            <span className="whitespace-nowrap">
              របស់កម្ពុជា”
            </span>
          </h1>

          {/* Bottom Line */}
          <div className="mt-2 sm:mt-4 lg:mt-10 mb-2 sm:mb-4 lg:mb-6 h-0.5 sm:h-1 w-32 sm:w-64 lg:w-96 max-w-4xl rounded-full bg-yellow-400" />

          {/* Subtitle */}
          <p className="text-xs sm:text-lg md:text-2xl lg:text-3xl font-semibold text-white">
            — The SastraCode Team —
          </p>

        </div>
      </div>
    </section>
  );
}