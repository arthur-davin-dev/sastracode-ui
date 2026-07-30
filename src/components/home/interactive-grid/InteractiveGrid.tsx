// // InteractiveGrid
// 'use client';

// import React from 'react';
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';
// import { motion } from "framer-motion";

// export default function InteractiveGrid() {
//     const { theme, setTheme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => setMounted(true), []);

//     if (!mounted) return null;

//     return (
//         <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center py-16 transition-colors duration-500">

//             {/* ========================================== */}
//             {/* THE THEME TOGGLE BUTTON */}
//             {/* ========================================== */}
//             <button
//                 onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//                 className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-110 transition-transform"
//                 aria-label="Toggle Theme"
//             >
//                 {theme === 'dark' ? '☀️' : '🌙'}
//             </button>

//             {/* ========================================== */}
//             {/* 3 VERTICAL FLASHES (Chaotic/Unordered Motion - Restored) */}
//             {/* ========================================== */}
//             <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-evenly py-10">
//                 {[0, 1, 2].map((index) => (
//                     <div
//                         key={index}
//                         className="relative w-full h-24 flex items-center justify-center"
//                         style={{
//                             animation: `flashSlide ${Math.random() * 4 + 6}s linear infinite`,
//                             animationDelay: `${Math.random() * 8}s`
//                         }}
//                     >
//                         <svg
//                             width="600"
//                             height="100%"
//                             viewBox="0 0 600 200"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="blur-[30px] opacity-40 dark:opacity-50"
//                         >
//                             <path
//                                 d="M200 0C300 50, 300 150, 200 200C100 150, 100 50, 200 0Z"
//                                 fill={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
//                             />
//                         </svg>
//                         <div
//                             className="absolute inset-0 flex items-center justify-center"
//                             style={{
//                                 width: '2px',
//                                 height: '80%',
//                                 background: `linear-gradient(to bottom, transparent, ${theme === 'dark' ? '#60a5fa' : '#3b82f6'}, transparent)`,
//                                 boxShadow: `0 0 20px ${theme === 'dark' ? '#60a5fa' : '#3b82f6'}`
//                             }}
//                         />
//                     </div>
//                 ))}
//             </div>

//             <style jsx>{`
//         @keyframes flashSlide {
//           0% { transform: translateX(-200%); }
//           100% { transform: translateX(300%); }
//         }
//       `}</style>

//             {/* ========================================== */}
//             {/* YOUR EXACT ORIGINAL SVG (Restored with Animations) */}
//             {/* ========================================== */}
//             <div className="absolute inset-0 pointer-events-none z-10 block w-full h-full max-w-7xl mx-auto left-1/2 -translate-x-1/2">
//                 <svg
//                     width="100%"
//                     height="100%"
//                     viewBox="0 0 279 327"
//                     preserveAspectRatio="xMidYMid meet"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                 >
//                     {/* Your base lines with enhanced visibility */}
//                     <g className="opacity-60 dark:opacity-50">
//                         <path d="M0 0.570648C78.4 0.570648 78.4 76.9392 134.4 76.9392" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1.12" strokeLinecap="round" />
//                         <path d="M144 76.9286C222.4 76.9286 222.4 0.560012 278.4 0.560012" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1.12" strokeLinecap="round" />
//                         <path d="M0 304.758C78.4 304.758 78.4 248.758 134.4 248.758" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1.12" strokeLinecap="round" />
//                         <path d="M278 304.758C199.6 304.758 199.6 248.758 143.6 248.758" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1.12" strokeLinecap="round" />
//                     </g>

//                     {/* Animated glowing pulses traveling exactly on your paths */}
//                     <g className="dark:stroke-[#60a5fa] stroke-[#3b82f6]">
//                         <path d="M0 0.570648C78.4 0.570648 78.4 76.9392 134.4 76.9392" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
//                             <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.5s" repeatCount="indefinite" />
//                         </path>
//                         <path d="M144 76.9286C222.4 76.9286 222.4 0.560012 278.4 0.560012" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
//                             <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.8s" repeatCount="indefinite" />
//                         </path>
//                         <path d="M0 304.758C78.4 304.758 78.4 248.758 134.4 248.758" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
//                             <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="3.1s" repeatCount="indefinite" />
//                         </path>
//                         <path d="M278 304.758C199.6 304.758 199.6 248.758 143.6 248.758" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
//                             <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.2s" repeatCount="indefinite" />
//                         </path>
//                     </g>

//                     {/* Glow Filter */}
//                     <defs>
//                         <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
//                             <feGaussianBlur stdDeviation="6" result="blur" />
//                             <feMerge>
//                                 <feMergeNode in="blur" />
//                                 <feMergeNode in="SourceGraphic" />
//                             </feMerge>
//                         </filter>
//                     </defs>
//                 </svg>
//             </div>

//             {/* ========================================== */}
//             {/* THE STATIC CARDS (No motion wrapper) */}
//             {/* ========================================== */}
//             <section className="relative overflow-hidden py-20">
//                 <div className="mx-auto max-w-7xl px-6">

//                     {/* ================= Desktop ================= */}
//                     <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-16">

//                         {/* Left */}
//                         <div className="flex h-[520px] flex-col justify-between">
//                             <BusinessCard />

//                             <LiveCodingCard />
//                         </div>

//                         {/* Center */}
//                         <div className="flex items-center justify-center">
//                             <motion.div
//                                 animate={{
//                                     y: [0, -18, 0],
//                                 }}
//                                 transition={{
//                                     duration: 4,
//                                     repeat: Infinity,
//                                     ease: "easeInOut",
//                                 }}
//                             >
//                                 <FloatingCard />
//                             </motion.div>
//                         </div>

//                         {/* Right */}
//                         <div className="flex h-[520px] flex-col justify-between">
//                             <ProgressCard />

//                             <AIAssistantCard />
//                         </div>

//                     </div>

//                     {/* ================= Tablet ================= */}
//                     <div className="hidden md:grid lg:hidden grid-cols-2 gap-8">

//                         <BusinessCard />

//                         <ProgressCard />

//                         <div className="col-span-2 flex justify-center py-6">
//                             <motion.div
//                                 animate={{ y: [0, -18, 0] }}
//                                 transition={{
//                                     duration: 4,
//                                     repeat: Infinity,
//                                     ease: "easeInOut",
//                                 }}
//                             >
//                                 <FloatingCard />
//                             </motion.div>
//                         </div>

//                         <LiveCodingCard />

//                         <AIAssistantCard />

//                     </div>

//                     {/* ================= Mobile ================= */}
//                     <div className="flex flex-col gap-6 md:hidden">

//                         <BusinessCard />

//                         <ProgressCard />

//                         <div className="flex justify-center py-4">
//                             <motion.div
//                                 animate={{ y: [0, -18, 0] }}
//                                 transition={{
//                                     duration: 4,
//                                     repeat: Infinity,
//                                     ease: "easeInOut",
//                                 }}
//                             >
//                                 <FloatingCard />
//                             </motion.div>
//                         </div>

//                         <LiveCodingCard />

//                         <AIAssistantCard />

//                     </div>

//                 </div>
//             </section>
//         </div>
//     );
// }

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function InteractiveGrid() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    // Determine Flash Color based on theme
    const flashColor = theme === 'dark' ? '#60a5fa' : '#3b82f6';

    return (
        <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-16 transition-colors duration-500">

            {/* ========================================== */}
            {/* THE THEME TOGGLE BUTTON */}
            {/* ========================================== */}
            {/* <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-110 transition-transform"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button> */}

            {/* ========================================== */}
            {/* FULLY RESPONSIVE SVG CONNECTORS (All screens) */}
            {/* ========================================== */}
            {/*
         FIX: Removed 'hidden lg:block'.
         Added 'block w-full h-full' so it always renders on phones/tablets.
      */}
            <div className="absolute inset-0 pointer-events-none z-10 block w-full h-full max-w-7xl mx-auto left-1/2 -translate-x-1/2">
                <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">

                    {/* === 1. THE MAIN LINES === */}
                    {/* Reduced stroke width slightly for better mobile scaling */}
                    <g className="opacity-60 dark:opacity-50">
                        {/* Top Row: Left to Center */}
                        <path d="M 0% 20% C 20% 20%, 30% 25%, 48% 25%" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="0.5" strokeLinecap="round" />
                        {/* Top Row: Center to Right */}
                        <path d="M 52% 25% C 70% 25%, 80% 20%, 100% 20%" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="0.5" strokeLinecap="round" />

                        {/* Bottom Row: Left to Center */}
                        <path d="M 0% 80% C 20% 80%, 30% 75%, 48% 75%" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="0.5" strokeLinecap="round" />
                        {/* Bottom Row: Center to Right */}
                        <path d="M 52% 75% C 70% 75%, 80% 80%, 100% 80%" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="0.5" strokeLinecap="round" />
                    </g>

                    {/* === 2. THE GLOWING MOVING LIGHT PACKETS === */}
                    <g className="dark:stroke-[#60a5fa] stroke-[#3b82f6]">

                        {/* Top Left Pulse */}
                        <path d="M 0% 20% C 20% 20%, 30% 25%, 48% 25%" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.5s" repeatCount="indefinite" />
                        </path>

                        {/* Top Right Pulse */}
                        <path d="M 52% 25% C 70% 25%, 80% 20%, 100% 20%" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.8s" repeatCount="indefinite" />
                        </path>

                        {/* Bottom Left Pulse */}
                        <path d="M 0% 80% C 20% 80%, 30% 75%, 48% 75%" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="3.1s" repeatCount="indefinite" />
                        </path>

                        {/* Bottom Right Pulse */}
                        <path d="M 52% 75% C 70% 75%, 80% 80%, 100% 80%" strokeWidth="3" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.2s" repeatCount="indefinite" />
                        </path>

                    </g>

                    {/* === 3. THE GLOW FILTER === */}
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* ========================================== */}
            {/* YOUR SVG CONNECTORS WITH ANIMATED LIGHT PULSE */}
            {/* ========================================== */}
            {/* ========================================== */}
            {/* YOUR SVG CONNECTORS WITH DYNAMIC LIGHT FLOW */}
            {/* ========================================== */}
            <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block max-w-7xl mx-auto left-1/2 -translate-x-1/2 w-full">
                <svg width="100%" height="100%" viewBox="0 0 279 327" fill="none" xmlns="http://www.w3.org/2000/svg">

                    {/* === 1. THE MAIN LINES (More visible + Themed colors) === */}
                    <g className="opacity-60 dark:opacity-50">
                        {/* Left to Center (Top) */}
                        <path d="M0 0.570648C78.4 0.570648 78.4 76.9392 134.4 76.9392" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1" strokeLinecap="round" />
                        {/* Center to Right (Top) */}
                        <path d="M144 76.9286C222.4 76.9286 222.4 0.560012 278.4 0.560012" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1" strokeLinecap="round" />
                        {/* Left to Center (Bottom) */}
                        <path d="M0 304.758C78.4 304.758 78.4 248.758 134.4 248.758" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1" strokeLinecap="round" />
                        {/* Center to Right (Bottom) */}
                        <path d="M278 304.758C199.6 304.758 199.6 248.758 143.6 248.758" stroke="#94A3B8" className="dark:stroke-white" strokeWidth="1" strokeLinecap="round" />
                    </g>
                    <defs>
                        <linearGradient id="gradient-light" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#002455" />
                            <stop offset="100%" stopColor="#DC0000" />
                        </linearGradient>
                        <linearGradient id="gradient-dark" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#002455" />
                            <stop offset="100%" stopColor="#DC0000" />
                        </linearGradient>
                    </defs>

                    {/* === 2. THE GLOWING MOVING LIGHT PACKETS (The "Data Flow") === */}
                    {/* We duplicate the paths and use stroke-dasharray to make them travel */}
                    {/* <g className="dark:stroke-[#002455] stroke-[#002455]"> */}
                    <g className="stroke-[url(#gradient-light)] dark:stroke-[url(#gradient-dark)]">

                        {/* Top Left Line (Moving down-right) */}
                        <path d="M0 0.570648C78.4 0.570648 78.4 76.9392 134.4 76.9392" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.5s" repeatCount="indefinite" />
                        </path>

                        {/* Top Right Line (Moving down-left) */}
                        <path d="M144 76.9286C222.4 76.9286 222.4 0.560012 278.4 0.560012" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.8s" repeatCount="indefinite" />
                        </path>

                        {/* Bottom Left Line (Moving up-right) */}
                        <path d="M0 304.758C78.4 304.758 78.4 248.758 134.4 248.758" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="3.1s" repeatCount="indefinite" />
                        </path>

                        {/* Bottom Right Line (Moving up-left) */}
                        <path d="M278 304.758C199.6 304.758 199.6 248.758 143.6 248.758" strokeWidth="1.5" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="80 200">
                            <animate attributeName="stroke-dashoffset" from="80" to="-280" dur="2.2s" repeatCount="indefinite" />
                        </path>

                    </g>

                    {/* === 3. THE GLOW FILTER (Makes the moving light bloom) === */}
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>
            </div>

            {/* Dotted Grid Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />

            {/* ========================================== */}
            {/* THE MARQUEE SLIDER */}
            {/* ========================================== */}
            <motion.div
                className="flex relative z-20 w-max"
                animate={{ x: ["0%", "33.33%"] }}
                transition={{ x: { duration: 40, repeat: Infinity, ease: "linear" } }}
            >
                {[0, 1, 2].map((groupIndex) => (
                    <div key={groupIndex} className="flex-shrink-0 px-6 lg:px-10">
                        <GridWithExplicitRows />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

// ====================================================
// THE ACTUAL GRID CONTAINING THE CARDS
// ====================================================
function GridWithExplicitRows() {
    const rowOffset = 25; // Wave height

    return (
        <div className="grid grid-cols-12 gap-y-14 lg:gap-y-20 place-items-center w-full max-w-7xl">

            {/* ================= ROW 1 ================= */}
            <motion.div
                className="col-span-3 flex justify-center"
                animate={{ y: [0, -rowOffset, 0, rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="relative group bg-white dark:bg-[#121826] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-2xl w-full max-w-[320px] flex flex-col items-start gap-3 transition-all hover:scale-105">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300">MH</div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">M.Hossain</span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">Start Online Business</h3>
                    <div className="mt-2 bg-gray-100 dark:bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/5">College Case Studies</div>
                </div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, rowOffset, 0, -rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full shadow-lg text-gray-800 dark:text-white text-base font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">📌 ចាប់ផ្តើម</div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, -rowOffset, 0, rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full shadow-lg text-gray-800 dark:text-white text-base font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">✨ ស្វែងយល់</div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, rowOffset, 0, -rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-blue-50 dark:bg-blue-500/20 backdrop-blur-xl border border-blue-200 dark:border-blue-500/30 px-6 py-3 rounded-full shadow-lg text-blue-600 dark:text-blue-300 text-base font-bold hover:bg-blue-100 dark:hover:bg-blue-500/30 transition-colors">+ បន្ថែម</div>
            </motion.div>


            {/* ================= ROW 2 ================= */}
            <motion.div
                className="col-span-3 flex justify-center"
                animate={{ y: [0, rowOffset, 0, -rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="relative group bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-2xl w-full max-w-[320px] flex flex-col items-start gap-2 transition-all hover:scale-105">
                    <div className="bg-gray-100 dark:bg-blue-500/20 p-3 rounded-full text-xl">🎓</div>
                    <div className="font-bold text-lg text-gray-900 dark:text-white">រៀនគ្រប់ទីកន្លែង</div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">បានគ្រប់ពេល</span>
                    <span className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">Live Coding</span>
                </div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, -rowOffset, 0, rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full shadow-lg text-gray-800 dark:text-white text-base font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">អនុវត្តក្នុងជីវិត</div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, rowOffset, 0, -rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="relative group bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-2xl w-full max-w-[320px] transition-all hover:scale-105">
                    <div className="h-16 w-full relative">
                        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                            <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15" stroke="#3b82f6" className="dark:stroke-[#60a5fa]" strokeWidth="2" fill="none" />
                            <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15 V 50 H 0 Z" fill="#3b82f6" className="dark:fill-[#60a5fa]" opacity="0.15" />
                            <line x1="80" y1="10" x2="80" y2="50" stroke="#3b82f6" className="dark:stroke-[#60a5fa]" strokeWidth="0.5" strokeDasharray="2 2" />
                        </svg>
                        <span className="absolute -top-1 right-0 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md">+6.3%</span>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-gray-600 dark:text-gray-300 text-base">
                        <span>២៨ / ៣៥</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">Progress</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, -rowOffset, 0, rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full shadow-lg text-gray-800 dark:text-white text-base font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">📊 ដំណើរការ</div>
            </motion.div>


            {/* ================= ROW 3 ================= */}
            <motion.div
                className="col-span-3 flex justify-center"
                animate={{ y: [0, -rowOffset, 0, rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full shadow-lg text-gray-800 dark:text-white text-base font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">💻 Online</div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, rowOffset, 0, -rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full shadow-lg text-gray-800 dark:text-white text-base font-medium hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">📖 រៀនតាមដែន</div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, -rowOffset, 0, rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="relative group bg-white dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-200 dark:border-purple-500/30 rounded-2xl p-6 shadow-xl dark:shadow-2xl w-full max-w-[320px] flex flex-col items-start gap-1 transition-all hover:scale-105">
                    <div className="font-bold text-xl text-gray-900 dark:text-white">AI ជំនួយ</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">សិក្សា</div>
                    <span className="mt-3 bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-sm font-bold">24 hours</span>
                </div>
            </motion.div>

            <motion.div
                className="col-span-2 flex justify-center"
                animate={{ y: [0, rowOffset, 0, -rowOffset, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            >
                <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 px-6 py-3 rounded-full shadow-lg text-gray-800 dark:text-white text-base font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">🚀 ចាប់ផ្ដើម</div>
            </motion.div>

        </div>
    );
}