'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
  };

  return (
    <section className="relative w-full min-h-screen lg:h-screen lg:min-h-[680px] bg-[#faf8f5] dark:bg-[#070c18] text-[#002455] dark:text-slate-100 px-3 py-3 sm:px-6 sm:py-4 overflow-hidden flex flex-col justify-between font-sans transition-colors duration-300">
      
      {/* 1. CUSTOM ANIMATIONS */}
      <style jsx global>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(0.98); }
        }
        @keyframes cornerGlow {
          0%, 100% { border-color: #dc0000; }
          50% { border-color: #002455; }
        }
        .animate-subtle-pulse {
          animation: subtlePulse 3s ease-in-out infinite;
        }
        .animate-corner-glow {
          animation: cornerGlow 2s linear infinite;
        }
      `}</style>

      {/* 2. GEOMETRIC GRID BACKGROUND (Light Mode & Dark Mode) */}
      <div 
        className="absolute inset-0 opacity-[0.12] dark:opacity-[0.18] pointer-events-none transition-opacity duration-300 block dark:hidden"
        style={{
          backgroundImage: `linear-gradient(#002455 1.5px, transparent 1.5px), linear-gradient(90deg, #002455 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.18] pointer-events-none transition-opacity duration-300 hidden dark:block"
        style={{
          backgroundImage: `linear-gradient(#38bdf8 1.5px, transparent 1.5px), linear-gradient(90deg, #38bdf8 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating Accent Shapes (Hidden on smaller screens to prevent overlap) */}
      <div className="absolute top-20 left-6 w-10 h-10 xl:w-12 xl:h-12 border-4 border-[#002455] dark:border-slate-300 bg-[#dc0000] rotate-12 hidden xl:block shadow-[3px_3px_0px_0px_#002455] dark:shadow-[3px_3px_0px_0px_#38bdf8] hover:rotate-45 transition-transform duration-300" />
      <div className="absolute bottom-16 right-8 w-12 h-12 xl:w-14 xl:h-14 border-4 border-[#002455] dark:border-slate-300 bg-[#dc0000] rounded-full hidden xl:block shadow-[3px_3px_0px_0px_#002455] dark:shadow-[3px_3px_0px_0px_#38bdf8] hover:scale-110 transition-transform duration-300" />

      {/* 3. HERO NAVIGATION BAR */}
      <header className="relative z-20 max-w-6xl w-full mx-auto flex items-center justify-between py-2 sm:py-3 border-b-2 sm:border-b-4 border-[#002455] dark:border-slate-700">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 bg-[#002455] dark:bg-slate-900 text-white dark:text-slate-100 px-2.5 py-1 text-xs sm:text-sm font-mono font-black uppercase tracking-wider border-2 border-[#002455] dark:border-slate-700 shadow-[2px_2px_0px_0px_#dc0000] sm:shadow-[3px_3px_0px_0px_#dc0000] group cursor-pointer">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#dc0000] rounded-full group-hover:bg-emerald-400 transition-colors" />
          SastraCode
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs font-bold uppercase tracking-wider">
          <a href="#about" className="hover:text-[#dc0000] dark:hover:text-cyan-400 transition-colors">// About</a>
          <a href="#projects" className="hover:text-[#dc0000] dark:hover:text-cyan-400 transition-colors">// Projects</a>
          <a href="#curriculum" className="hover:text-[#dc0000] dark:hover:text-cyan-400 transition-colors">// Cohort</a>
        </nav>

        {/* Action Button */}
        <button className="bg-[#dc0000] text-white font-mono font-extrabold text-[11px] sm:text-xs uppercase px-3 py-1 sm:px-4 sm:py-1.5 border-2 border-[#002455] dark:border-slate-300 shadow-[2px_2px_0px_0px_#002455] sm:shadow-[3px_3px_0px_0px_#002455] dark:shadow-[2px_2px_0px_0px_#38bdf8] dark:sm:shadow-[3px_3px_0px_0px_#38bdf8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
          Apply Now
        </button>
      </header>

      {/* 4. MAIN HERO CONTENT */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex-1 my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center py-4 lg:py-0">
        
        {/* LEFT COLUMN: Quote & CTAs */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#002455] dark:bg-slate-900 text-white font-mono font-bold text-[10px] sm:text-[11px] uppercase tracking-widest border-2 border-[#002455] dark:border-slate-700 shadow-[2px_2px_0px_0px_#dc0000] sm:shadow-[3px_3px_0px_0px_#dc0000] mb-3 sm:mb-4">
            <span className="w-2 h-2 bg-[#dc0000] rounded-full animate-ping" />
            Batch 2026 Active
          </div>

          {/* Hero Header Box */}
          <div className="bg-white dark:bg-slate-900 border-2 sm:border-4 border-[#002455] dark:border-slate-700 p-4 sm:p-6 shadow-[4px_4px_0px_0px_#002455] sm:shadow-[6px_6px_0px_0px_#002455] dark:shadow-[4px_4px_0px_0px_#38bdf8] dark:sm:shadow-[6px_6px_0px_0px_#38bdf8] w-full mb-4 sm:mb-5 relative group">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-black font-khmer text-[#002455] dark:text-slate-100 leading-normal sm:leading-relaxed lg:leading-[1.4]">
              “សាស្ត្រា<span className="bg-[#dc0000] text-white px-1.5 py-0.5 sm:px-2 border-2 border-[#002455] dark:border-slate-300 ml-1 inline-block shadow-[2px_2px_0px_0px_#002455] dark:shadow-[2px_2px_0px_0px_#38bdf8] group-hover:bg-[#002455] dark:group-hover:bg-cyan-600 transition-colors">កូដ</span> កសាងអនាគតយុវជនឌីជីថលរបស់កម្ពុជា”
            </h1>

            <div className="w-full h-0.5 sm:h-1 bg-[#002455] dark:bg-slate-700 my-2.5 sm:my-3" />

            <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#002455] dark:text-cyan-400">
              [ Standardizing Digital Excellence ]
            </p>
          </div>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
            <button className="w-full sm:w-auto flex-1 bg-[#002455] dark:bg-cyan-600 text-white font-mono font-bold text-xs uppercase px-4 py-2.5 border-2 border-[#002455] dark:border-slate-300 shadow-[3px_3px_0px_0px_#dc0000] sm:shadow-[4px_4px_0px_0px_#dc0000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-center">
              Explore Projects →
            </button>
            <button className="w-full sm:w-auto flex-1 bg-white dark:bg-slate-900 text-[#002455] dark:text-slate-200 font-mono font-bold text-xs uppercase px-4 py-2.5 border-2 border-[#002455] dark:border-slate-700 shadow-[3px_3px_0px_0px_#002455] sm:shadow-[4px_4px_0px_0px_#002455] dark:shadow-[3px_3px_0px_0px_#38bdf8] dark:sm:shadow-[4px_4px_0px_0px_#38bdf8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-center">
              Team Roster
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive HUD Photo Frame */}
        <div className="lg:col-span-7 relative w-full h-[260px] sm:h-[380px] lg:h-[440px] xl:h-[480px]">
          
          {/* Offset Red Shadow Box */}
          <div className="absolute inset-0 bg-[#dc0000] dark:bg-cyan-500/80 border-2 sm:border-4 border-[#002455] dark:border-slate-700 translate-x-1.5 translate-y-1.5 sm:translate-x-3 sm:translate-y-3" />

          {/* Main Card Shell with Mouse-Tracking HUD */}
          <div 
            className="relative w-full h-full bg-white dark:bg-slate-900 border-2 sm:border-4 border-[#002455] dark:border-slate-300 overflow-hidden group cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            <Image
              src="/images/team-group.DNG"
              alt="SastraCode Team Photo"
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              priority
            />

            {/* INTERACTIVE HUD TARGET OVERLAY */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none z-20 hidden sm:block">
                {/* Horizontal Crosshair Line */}
                <div 
                  className="absolute w-full h-[1px] bg-[#dc0000]/70 dark:bg-cyan-400/90" 
                  style={{ top: `${coords.y}px` }} 
                />
                {/* Vertical Crosshair Line */}
                <div 
                  className="absolute h-full w-[1px] bg-[#dc0000]/70 dark:bg-cyan-400/90" 
                  style={{ left: `${coords.x}px` }} 
                />
                {/* Coordinate Readout Badge */}
                <div 
                  className="absolute bg-[#002455] dark:bg-slate-950 text-white dark:text-cyan-400 font-mono text-[9px] font-bold px-1.5 py-0.5 border border-[#dc0000] dark:border-cyan-400"
                  style={{ top: `${coords.y + 8}px`, left: `${coords.x + 8}px` }}
                >
                  X:{coords.x} Y:{coords.y}
                </div>
              </div>
            )}

            {/* Tech Corner Markers */}
            <div className="absolute top-0 left-0 bg-[#002455] dark:bg-slate-950 text-white dark:text-cyan-400 font-mono text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 border-r-2 border-b-2 border-[#002455] dark:border-slate-700 z-10">
              IMG_REF: 01
            </div>

            <div className="absolute bottom-0 right-0 bg-[#dc0000] dark:bg-cyan-600 text-white font-mono text-[10px] sm:text-xs font-black px-2.5 py-1 sm:px-3.5 sm:py-1.5 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-[#002455] dark:border-slate-900 uppercase tracking-wider z-10">
              SastraCode // Team
            </div>

            {/* Tactical Frame Corners */}
            <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-[#dc0000] dark:border-cyan-400 z-10" />
            <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-[#dc0000] dark:border-cyan-400 z-10" />

          </div>
        </div>

      </div>

      {/* 5. FOOTER TICKER BAR */}
      <footer className="relative z-20 max-w-6xl w-full mx-auto bg-[#002455] dark:bg-slate-900 text-white py-1 px-3 sm:py-1.5 sm:px-4 border-2 border-[#002455] dark:border-slate-700 font-mono text-[10px] sm:text-[11px] flex justify-between items-center shadow-[2px_2px_0px_0px_#dc0000] sm:shadow-[3px_3px_0px_0px_#dc0000] dark:shadow-[2px_2px_0px_0px_#38bdf8] dark:sm:shadow-[3px_3px_0px_0px_#38bdf8]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>STATUS: 200</span>
        </div>
        <div className="hidden sm:block uppercase tracking-widest font-bold text-[#faf8f5] dark:text-slate-300">
          Phnom Penh • Cambodia
        </div>
        <div className="text-white dark:text-cyan-400 font-bold">COHORT_2026</div>
      </footer>

    </section>
  );
}