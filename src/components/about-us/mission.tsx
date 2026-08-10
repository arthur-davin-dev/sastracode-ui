'use client';

import React from 'react';
import { Target, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MissionVision() {
  return (
    <section className="w-full bg-[#0b0f19] text-slate-200 py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* SECTION HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-mono font-medium mb-4 border border-blue-500/20 shadow-sm shadow-blue-500/10">
            <Sparkles className="w-4 h-4" />
            <span>CORE VALUES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Mission <span className="text-blue-500">&amp;</span> Vision
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg">
            The principles that guide every decision we make and every feature we build.
          </p>
        </motion.div>

        {/* BLOCK 1: MISSION (Illustration Left, Text Right) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Interactive Storyset Vector Canvas Card */}
          <div className="lg:col-span-6 bg-[#131b2e]/90 border border-slate-800 rounded-3xl p-6 md:p-8 h-[340px] sm:h-[400px] flex items-center justify-center relative overflow-hidden group shadow-2xl">
            {/* Background Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-blue-600/20 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

            {/* Storyset Style Floating Graphic */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              
              {/* Floating Element 1: Idea Bulb */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute top-4 left-6 bg-slate-900/90 border border-cyan-500/30 p-3 rounded-2xl shadow-lg shadow-cyan-500/10 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-lg font-bold">
                  💡
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Innovation</p>
                  <p className="text-xs font-bold text-white">Smart Code</p>
                </div>
              </motion.div>

              {/* Floating Element 2: Code Snippet Card */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-4 right-6 bg-slate-900/90 border border-blue-500/30 p-3 rounded-2xl shadow-lg shadow-blue-500/10 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">
                  ⚡
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Speed</p>
                  <p className="text-xs font-bold text-white">Fast Interactive</p>
                </div>
              </motion.div>

              {/* Central Vector Storyset Scene */}
              <svg className="w-full max-w-[260px] sm:max-w-[300px] h-auto drop-shadow-[0_10px_20px_rgba(6,182,212,0.15)] group-hover:scale-105 transition-transform duration-500" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Desk Base */}
                <rect x="30" y="190" width="240" height="8" rx="4" fill="#1E293B" />
                {/* Laptop Screen */}
                <rect x="90" y="110" width="120" height="75" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="3" />
                {/* Code lines on screen */}
                <rect x="102" y="125" width="45" height="4" rx="2" fill="#38BDF8" />
                <rect x="102" y="135" width="70" height="4" rx="2" fill="#818CF8" />
                <rect x="102" y="145" width="30" height="4" rx="2" fill="#38BDF8" />
                <rect x="102" y="155" width="55" height="4" rx="2" fill="#34D399" />
                {/* Laptop Base */}
                <path d="M75 188L85 185H215L225 188C225 189.105 224.105 190 223 190H77C75.8954 190 75 189.105 75 188Z" fill="#334155" />
                {/* Glowing Target Ring */}
                <circle cx="150" cy="65" r="32" fill="#0284C7" fillOpacity="0.2" />
                <circle cx="150" cy="65" r="22" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 4" />
                <circle cx="150" cy="65" r="8" fill="#38BDF8" />
              </svg>

            </div>
          </div>

          {/* Mission Text Content */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/10">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-khmer tracking-wide">
                បេសកកម្មរបស់យើង
              </h3>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-khmer">
              ដើម្បីធ្វើឱ្យការរៀនសរសេរកូដ (Programming) កាន់តែងាយស្រួល 
              មានអន្តរកម្ម និងឥតគិតថ្លៃសម្រាប់អ្នករៀនគ្រប់កម្រិត—
              ដោយបំបាត់ឧបសគ្គដែលរាំងស្ទះមនុស្សឃ្លានចង់បានពិភពបច្ចេកវិទ្យា។
            </p>

            {/* Styled Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2 font-khmer">
              <span className="px-4 py-1.5 rounded-full bg-cyan-950/40 text-cyan-300 text-sm font-medium border border-cyan-500/30 shadow-sm">
                ងាយស្រួលប្រើប្រាស់
              </span>
              <span className="px-4 py-1.5 rounded-full bg-cyan-950/40 text-cyan-300 text-sm font-medium border border-cyan-500/30 shadow-sm">
                មានអន្តរកម្ម
              </span>
              <span className="px-4 py-1.5 rounded-full bg-cyan-950/40 text-cyan-300 text-sm font-medium border border-cyan-500/30 shadow-sm">
                ឥតគិតថ្លៃ
              </span>
            </div>
          </div>
        </motion.div>

        {/* BLOCK 2: VISION (Text Left, Illustration Right) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Vision Text Content */}
          <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-sm shadow-amber-500/10">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Our Vision
              </h3>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-khmer">
              ដើម្បីក្លាយជាដៃគូសង្គ្រោះជឿជាក់មួយ ដែលជួយសិស្សបង្កើតជំនាញ 
              និងរៀបចំខ្លួនសម្រាប់អាជីពបច្ចេកវិទ្យា។
            </p>

            {/* Styled Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2 font-khmer">
              <span className="px-4 py-1.5 rounded-full bg-amber-950/40 text-amber-300 text-sm font-medium border border-amber-500/30 shadow-sm">
                គួរឱ្យទុកចិត្ត
              </span>
              <span className="px-4 py-1.5 rounded-full bg-amber-950/40 text-amber-300 text-sm font-medium border border-amber-500/30 shadow-sm">
                ផ្តោតលើជោគជ័យ
              </span>
            </div>
          </div>

          {/* Interactive Storyset Vector Canvas Card */}
          <div className="lg:col-span-6 bg-[#131b2e]/90 border border-slate-800 rounded-3xl p-6 md:p-8 h-[340px] sm:h-[400px] flex items-center justify-center relative overflow-hidden group shadow-2xl order-1 lg:order-2">
            {/* Background Radial Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-orange-600/20 opacity-40 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />

            {/* Storyset Style Floating Graphic */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              
              {/* Floating Element 1: Career Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
                className="absolute top-4 right-6 bg-slate-900/90 border border-amber-500/30 p-3 rounded-2xl shadow-lg shadow-amber-500/10 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                  🚀
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Future</p>
                  <p className="text-xs font-bold text-white">Tech Career</p>
                </div>
              </motion.div>

              {/* Floating Element 2: Success Badge */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.6 }}
                className="absolute bottom-4 left-6 bg-slate-900/90 border border-orange-500/30 p-3 rounded-2xl shadow-lg shadow-orange-500/10 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-lg">
                  🎯
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Goal</p>
                  <p className="text-xs font-bold text-white">Student Growth</p>
                </div>
              </motion.div>

              {/* Central Vector Storyset Scene */}
              <svg className="w-full max-w-[260px] sm:max-w-[300px] h-auto drop-shadow-[0_10px_20px_rgba(245,158,11,0.15)] group-hover:scale-105 transition-transform duration-500" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Growth Stairs */}
                <rect x="40" y="170" width="50" height="25" rx="3" fill="#1E293B" />
                <rect x="95" y="140" width="50" height="55" rx="3" fill="#334155" />
                <rect x="150" y="110" width="50" height="85" rx="3" fill="#D97706" />
                <rect x="205" y="70" width="50" height="125" rx="3" fill="#F59E0B" />
                
                {/* Arrow Rocket Indicator */}
                <path d="M50 130 Q 120 100, 225 35" stroke="#F59E0B" strokeWidth="4" strokeDasharray="6 6" fill="none" />
                <polygon points="230,30 215,35 225,48" fill="#F59E0B" />

                {/* Glowing Goal Star */}
                <circle cx="230" cy="30" r="18" fill="#F59E0B" fillOpacity="0.25" />
                <path d="M230 22L232.5 27L238 28L234 32L235 37.5L230 35L225 37.5L226 32L222 28L227.5 27L230 22Z" fill="#FBFBFE" />
              </svg>

            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}