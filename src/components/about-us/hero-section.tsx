'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-16 overflow-hidden transition-colors duration-300">
      
      {/* Floating Java Logo - Left */}
      <div className="absolute left-4 sm:left-12 md:left-20 top-1/2 -translate-y-1/2 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 z-10 pointer-events-none transition-transform duration-500 hover:scale-105">
        <Image
          src="/images/java-3d.png" // Replace with your Java logo path
          alt="Java 3D Logo"
          fill
          className="object-contain drop-shadow-md dark:drop-shadow-[0_10px_20px_rgba(59,130,246,0.15)]"
          priority
        />
      </div>

      {/* Floating Python Logo - Right */}
      <div className="absolute right-4 sm:right-12 md:right-20 top-1/2 -translate-y-1/2 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 z-10 pointer-events-none transition-transform duration-500 hover:scale-105">
        <Image
          src="/images/python-3d.png" // Replace with your Python logo path
          alt="Python 3D Logo"
          fill
          className="object-contain drop-shadow-md dark:drop-shadow-[0_10px_20px_rgba(59,130,246,0.15)]"
          priority
        />
      </div>

      {/* Center Content Area */}
      <div className="relative z-20 max-w-2xl w-full mx-auto text-center px-4">
        
        {/* Top Accent Line */}
        <div className="w-full max-w-105 h-0.5 bg-[#eab308] dark:bg-amber-400 mx-auto mb-6 opacity-80 dark:opacity-90 shadow-xs" />

        {/* Khmer Quote Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#0f172a] dark:text-slate-100 leading-relaxed md:leading-[1.6] tracking-wide mb-6 font-khmer">
          “សាស្ត្រា<span className="text-red-500 dark:text-red-400">កូដ</span> កសាងអនាគតយុវជនឌីជីថល
          <br className="hidden sm:block" />
          របស់កម្ពុជា”
        </h1>

        {/* Bottom Accent Line */}
        <div className="w-full max-w-105 h-0.5 bg-[#eab308] dark:bg-amber-400 mx-auto mb-4 opacity-80 dark:opacity-90 shadow-xs" />

        {/* Team Subtitle */}
        <p className="text-sm sm:text-base font-semibold text-[#1e293b] dark:text-slate-300 tracking-tight font-sans">
          -The SastraCode Team
        </p>

      </div>
    </section>
  );
}