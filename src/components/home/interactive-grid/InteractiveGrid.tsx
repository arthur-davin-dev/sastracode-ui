'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// 1. The Reusable Tech Card Component
const TechCard = ({ icon, name }: { icon: string; name: string }) => (
    <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-lg py-3 px-3 sm:px-4 shadow-md flex items-center gap-2 sm:gap-3 transition-all hover:scale-105 hover:shadow-lg">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm">
            {icon}
        </div>
        <span className="font-medium text-gray-800 dark:text-gray-200 text-xs sm:text-sm truncate">
            {name}
        </span>
    </div>
);

// 2. The Data Array (Add/Remove items here easily!)
const TECH_DATA = [
    { icon: 'Py', name: 'Python' },
    { icon: 'SQL', name: 'SQL' },
    { icon: 'R', name: 'R' },
    { icon: '</>', name: 'HTML' },
    { icon: '{ }', name: 'CSS' },
    { icon: 'JS', name: 'JavaScript' },
];

export default function InteractiveGrid() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [deviceType, setDeviceType] = useState('desktop');

    // 1. Detect Screen Width
    useEffect(() => {
        setMounted(true);

        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDeviceType('mobile');
            } else if (width >= 768 && width < 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };

        handleResize(); // Run on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!mounted) return null;

    // Determine current active theme state
    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    // for the path light
    const bottomY = 500; // Adjust this value to control the gap
    const bottomY2 = bottomY - 56; // Maintain the 56px difference

    return (
        <div className="relative w-full overflow-hidden flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500 py-16 sm:py-20 lg:min-h-screen lg:py-0">

            {/* ========================================== */}
            {/* 3 VERTICAL FLASHES (Background) */}
            {/* ========================================== */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-evenly py-5">
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        className="relative w-full h-24 flex items-center justify-center"
                        style={{
                            animation: `flashSlide ${Math.random() * 4 + 6}s linear infinite`,
                            animationDelay: `${Math.random() * 8}s`
                        }}
                    >
                        <svg
                            width="600"
                            height="100%"
                            viewBox="0 0 600 200"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="blur-[30px] opacity-40 dark:opacity-50"
                        >
                            <path
                                d="M200 0C300 50, 300 150, 200 200C100 150, 100 50, 200 0Z"
                                fill={currentTheme === 'dark' ? '#60a5fa' : '#3b82f6'}
                            />
                        </svg>
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                width: '2px',
                                height: '80%',
                                background: `linear-gradient(to bottom, transparent, ${currentTheme === 'dark' ? '#60a5fa' : '#3b82f6'}, transparent)`,
                                boxShadow: `0 0 20px ${currentTheme === 'dark' ? '#60a5fa' : '#3b82f6'}`
                            }}
                        />
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes flashSlide {
                    0% { transform: translateX(-200%); }
                    100% { transform: translateX(300%); }
                }
            `}</style>

            {/* ========================================== */}
            {/* YOUR EXACT ORIGINAL SVG (Static Background) */}
            {/* ========================================== */}
            <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
                <svg
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    width="30%"
                    height="30%"
                    viewBox={`0 0 279 ${bottomY + 27}`} // Adjust viewBox height dynamically
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g className="dark:stroke-[#60a5fa] stroke-[#3b82f6]">
                        <path d="M0 0.570648C78.4 0.570648 78.4 76.9392 134.4 76.9392" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="210 400">
                            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.01;0.99;1" dur="3s" begin="0s" repeatCount="indefinite" />
                            <animate attributeName="stroke-dashoffset" from="210" to="-400" dur="3s" begin="0s" repeatCount="indefinite" />
                        </path>
                        <path d="M144 76.9286C222.4 76.9286 222.4 0.560012 278.4 0.560012" strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="210 400">
                            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.01;0.99;1" dur="3s" begin="-3s" repeatCount="indefinite" />
                            <animate attributeName="stroke-dashoffset" from="400" to="-210" dur="3s" begin="-3s" repeatCount="indefinite" />
                        </path>
                        {/* Bottom paths with adjustable y values */}
                        <path d={`M278 ${bottomY}C199.6 ${bottomY} 199.6 ${bottomY2} 143.6 ${bottomY2}`} strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="210 400">
                            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.01;0.99;1" dur="3s" begin="-3s" repeatCount="indefinite" />
                            <animate attributeName="stroke-dashoffset" from="210" to="-400" dur="3s" begin="-3s" repeatCount="indefinite" />
                        </path>
                        <path d={`M0 ${bottomY}C78.4 ${bottomY} 78.4 ${bottomY2} 134.4 ${bottomY2}`} strokeWidth="2" strokeLinecap="round" fill="none" filter="url(#glow)" strokeDasharray="210 400">
                            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.01;0.99;1" dur="3s" begin="0s" repeatCount="indefinite" />
                            <animate attributeName="stroke-dashoffset" from="-400" to="210" dur="3s" begin="0s" repeatCount="indefinite" />
                        </path>
                    </g>

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
            {/* THE TECH CARDS GRID (Conditional Rendering) */}
            {/* ========================================== */}
            <div className="relative z-20 w-full max-w-7xl px-6 lg:px-10">

                {/* --- MOBILE LAYOUT (Default - Single Column) --- */}
                {deviceType === 'mobile' && (
                    <div className="grid grid-cols-1 gap-y-10 place-items-center w-full">
                        {/* Left Cards */}
                        <div className="col-span-1 flex flex-col gap-6 w-full max-w-md">
                            <div className="relative group bg-white dark:bg-[#121826] border border-gray-200 dark:border-white/10 rounded-2xl py-4 px-4 shadow-xl dark:shadow-2xl w-full flex flex-col items-start gap-2 transition-all hover:scale-105">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300">MH</div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">M.Hossain</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">Start Online Business</h3>
                                    <span className="mt-1 bg-gray-100 dark:bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/5">College Case Studies</span>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-2xl py-4 px-6 shadow-xl dark:shadow-2xl w-full flex flex-row items-center justify-between gap-4 transition-all hover:scale-105">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 dark:bg-blue-500/20 p-3 rounded-full text-xl">🎓</div>
                                    <div>
                                        <div className="font-bold text-lg text-gray-900 dark:text-white">រៀនគ្រប់ទីកន្លែង</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">បានគ្រប់ពេល</span>
                                    </div>
                                </div>
                                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Live Coding</span>
                            </div>
                        </div>

                        {/* Middle Tech Grid */}
                        <motion.div className="col-span-1 flex justify-center w-full" animate={{ y: [0, -15, 0, 15, 0] }} transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
                            <div className="grid grid-cols-2 gap-3 w-full max-w-125">
                                {TECH_DATA.map((tech, index) => (
                                    <TechCard key={index} icon={tech.icon} name={tech.name} />
                                ))}
                            </div>
                        </motion.div>
                        {/* Right Cards */}
                        <div className="col-span-1 flex flex-col gap-6 w-full max-w-md">
                            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-2xl py-4 px-6 shadow-xl dark:shadow-2xl w-full transition-all hover:scale-105">
                                <div className="h-14 w-full relative">
                                    <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                        <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15" stroke="#3b82f6" className="dark:stroke-[#60a5fa]" strokeWidth="2" fill="none" />
                                        <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15 V 50 H 0 Z" fill="#3b82f6" className="dark:fill-[#60a5fa]" opacity="0.15" />
                                    </svg>
                                    <span className="absolute -top-1 right-0 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md">+6.3%</span>
                                </div>
                                <div className="flex justify-between items-center mt-2 text-gray-600 dark:text-gray-300 text-base">
                                    <span>២៨ / ៣៥</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Progress</span>
                                </div>
                            </div>
                            <div className="relative group bg-white dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-200 dark:border-purple-500/30 rounded-2xl py-4 px-6 shadow-xl dark:shadow-2xl w-full flex flex-col items-start gap-2 transition-all hover:scale-105">
                                <div className="font-bold text-xl text-gray-900 dark:text-white">AI ជំនួយ</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">AI បានជំនួយជួយដល់ការសិក្សា</div>
                                <div className="w-full flex justify-end mt-1">
                                    <span className="bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-1.5 rounded-full text-sm font-bold">24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TABLET LAYOUT (Top Row = Left, Bottom Row = Right) --- */}
                {deviceType === 'tablet' && (
                    <div className="flex flex-col gap-y-12 w-full max-w-3xl mx-auto">
                        {/* ROW 1: Left Side (2 Cards Side-by-Side) */}
                        <div className="flex flex-row gap-6 w-full justify-between">
                            <div className="w-[48%] relative group bg-white dark:bg-[#121826] border border-gray-200 dark:border-white/10 rounded-2xl py-4 px-4 shadow-xl dark:shadow-2xl flex flex-col items-start gap-2 transition-all hover:scale-105">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300">MH</div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">M.Hossain</span>
                                </div>
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">Start Online Business</h3>
                                <span className="mt-1 bg-gray-100 dark:bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300">College Case Studies</span>
                            </div>
                            <div className="w-[48%] bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-2xl py-4 px-6 shadow-xl dark:shadow-2xl flex flex-row items-center justify-between gap-4 transition-all hover:scale-105">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 dark:bg-blue-500/20 p-3 rounded-full text-xl">🎓</div>
                                    <div>
                                        <div className="font-bold text-lg text-gray-900 dark:text-white">រៀនគ្រប់ទីកន្លែង</div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">បានគ្រប់ពេល</span>
                                    </div>
                                </div>
                                <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Live Coding</span>
                            </div>
                        </div>

                        {/* ROW 2: Middle Tech Grid (Floating) */}
                        <motion.div className="flex justify-center w-full" animate={{ y: [0, -15, 0, 15, 0] }} transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
                            <div className="grid grid-cols-2 gap-4 w-full max-w-125">
                                {TECH_DATA.map((tech, index) => (
                                    <TechCard key={index} icon={tech.icon} name={tech.name} />
                                ))}
                            </div>
                        </motion.div>

                        {/* ROW 3: Right Side (2 Cards Side-by-Side) */}
                        <div className="flex flex-row gap-6 w-full justify-between">
                            <div className="w-[48%] bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-white/10 rounded-2xl py-4 px-6 shadow-xl dark:shadow-2xl transition-all hover:scale-105">
                                <div className="h-14 w-full relative">
                                    <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                        <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15" stroke="#3b82f6" className="dark:stroke-[#60a5fa]" strokeWidth="2" fill="none" />
                                        <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15 V 50 H 0 Z" fill="#3b82f6" className="dark:fill-[#60a5fa]" opacity="0.15" />
                                    </svg>
                                    <span className="absolute -top-1 right-0 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md">+6.3%</span>
                                </div>
                                <div className="flex justify-between items-center mt-2 text-gray-600 dark:text-gray-300 text-base">
                                    <span>២៨ / ៣៥</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Progress</span>
                                </div>
                            </div>
                            <div className="w-[48%] relative group bg-white dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-200 dark:border-purple-500/30 rounded-2xl py-4 px-6 shadow-xl dark:shadow-2xl flex flex-col items-start gap-2 transition-all hover:scale-105">
                                <div className="font-bold text-xl text-gray-900 dark:text-white">AI ជំនួយ</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">AI បានជំនួយជួយដល់ការសិក្សា</div>
                                <div className="w-full flex justify-end mt-1">
                                    <span className="bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-1.5 rounded-full text-sm font-bold">24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- DESKTOP LAYOUT (Your Original Grid-Cols-12) --- */}
                {deviceType === 'desktop' && (
                    <div className="grid grid-cols-12 gap-y-16 place-items-start w-full">
                        {/* LEFT SIDE (3 cols) */}
                        <div className="col-span-3 flex flex-col gap-6 w-full">
                            <div className="relative group bg-white dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-200 dark:border-purple-500/30 rounded-2xl py-6 px-4 shadow-xl dark:shadow-2xl w-full flex flex-col items-start gap-2 transition-all hover:scale-105 min-h-45">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-300">MH</div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">M.Hossain</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white">Start Online Business</h3>
                                    <span className="mt-1 bg-gray-100 dark:bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/5">College Case Studies</span>
                                </div>
                            </div>

                            <div className="relative group bg-white dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-200 dark:border-purple-500/30 rounded-2xl py-6 px-6 shadow-xl dark:shadow-2xl w-full flex flex-col items-start gap-2 transition-all hover:scale-105 min-h-45">
                                <div className="flex items-center gap-6 font-bold text-xl text-gray-900 dark:text-white">
                                    <span className="bg-gray-100 dark:bg-blue-500/20 p-3 rounded-full text-xl">🎓</span>
                                    <span className="font-bold text-lg text-gray-900 dark:text-white">រៀនគ្រប់ទីកន្លែង</span>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">រៀនបានគ្រប់ពេល</div>
                                <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg self-end">
                                    Live Coding
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE (6 cols) - unchanged */}
                        <motion.div className="col-span-6 flex lg:pt-33 justify-center w-full" animate={{ y: [0, -15, 0, 15, 0] }} transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
                            <div className="grid grid-cols-3 gap-5 w-full max-w-125">
                                {TECH_DATA.map((tech, index) => (
                                    <TechCard key={index} icon={tech.icon} name={tech.name} />
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT SIDE (3 cols) */}
                        <div className="col-span-3 flex flex-col gap-6 w-full">
                            <div className="bg-white dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-200 dark:border-purple-500/30 rounded-2xl py-4 px-6 shadow-xl dark:shadow-2xl w-full transition-all hover:scale-105 min-h-45">
                                <div className="h-14 w-full relative">
                                    <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                        <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15" stroke="#3b82f6" className="dark:stroke-[#60a5fa]" strokeWidth="2" fill="none" />
                                        <path d="M0 40 Q 20 35, 40 30 T 80 10 L 100 15 V 50 H 0 Z" fill="#3b82f6" className="dark:fill-[#60a5fa]" opacity="0.15" />
                                        <line x1="80" y1="10" x2="80" y2="50" stroke="#3b82f6" className="dark:stroke-[#60a5fa]" strokeWidth="1" strokeDasharray="2 2" />
                                    </svg>
                                    <span className="absolute -top-1 right-0 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-md">+6.3%</span>
                                </div>
                                <div className="flex justify-between items-center mt-2 text-gray-600 dark:text-gray-300 text-base">
                                    <span>២៨ / ៣៥</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-500">Progress</span>
                                </div>
                            </div>

                            <div className="relative group bg-white dark:bg-linear-to-br dark:from-[#1e293b] dark:to-[#0f172a] border border-gray-200 dark:border-purple-500/30 rounded-2xl py-6 px-6 shadow-xl dark:shadow-2xl w-full flex flex-col items-start gap-2 transition-all hover:scale-105 min-h-45">
                                <div className="font-bold text-xl text-gray-900 dark:text-white">AI ជំនួយ</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">AI បានជំនួយជួយដល់ការសិក្សារបស់យើងរហូតទៅដល់</div>
                                <div className="w-full flex justify-end mt-auto">
                                    <span className="bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-1.5 rounded-full text-sm font-bold">24 hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}