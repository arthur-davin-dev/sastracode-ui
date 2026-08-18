// AIChatCard.tsx
"use client"
import React from 'react';
import { current } from '@reduxjs/toolkit';
import { useTranslation } from '@/hooks/useTranslations';
import VectorLine from './VectorLine';



export default function AIChatCard() {

    return (
        <div className="min-h-75 flex items-center justify-center">
            <AiCoachWidget />
        </div>
    );
}

function AiCoachWidget() {
    const currentT = useTranslation();
    return (
        <div className="relative w-full max-w-2xl mx-auto py-3.75 px-6">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-6">
                <div className="relative shrink-0 pt-6 sm:-top-16.25">
                    <img
                        src="/home/image/aiCoachRobot.png"
                        alt="AI Coach robot"
                        className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 animate-float object-contain"
                    />
                </div>
                <VectorLine />
                {/* <img
                    src="/home/Vector.svg"
                    alt="AI Coach robot"
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain"
                /> */}
                <div className="flex-1 min-w-0 w-full">
                    <p className="text-[15px] md:text-base font-medium text-slate-800 dark:text-slate-200 leading-snug mb-3 transition-colors duration-300">
                        {currentT.interactiveDoc.aiChat}
                    </p>

                    <ChatCard />
                </div>
            </div>

            <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: floatY 3.2s ease-in-out infinite; }
      `}</style>
        </div>
    );
}

function ChatCard() {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgba(2,6,23,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden transition-colors duration-300">
            {/* You message */}
            <div className="flex items-start gap-2.5 px-4 pt-4 pb-3">
                <div className="w-6 h-6 shrink-0 rounded-full bg-slate-800 dark:bg-gray-600 flex items-center justify-center text-[10px] font-semibold text-white transition-colors duration-300">
                    Y
                </div>
                <div>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-gray-400 mb-0.5 transition-colors duration-300">You</p>
                    <p className="text-sm text-slate-800 dark:text-gray-200 transition-colors duration-300">Why is my button not working?</p>
                </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-gray-700 transition-colors duration-300" />

            {/* AI Response */}
            <div className="flex items-start gap-2.5 px-4 pt-3 pb-4">
                <div className="w-6 h-6 shrink-0 rounded-full bg-violet-500 dark:bg-violet-600 flex items-center justify-center transition-colors duration-300">
                    <SparkleIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-violet-600 dark:text-violet-400 mb-1.5 transition-colors duration-300">AI Coach</p>

                    <div className="space-y-1.5 mb-2">
                        <p className="text-sm text-slate-800 dark:text-gray-200 transition-colors duration-300">
                            <span className="font-semibold">Hint #1</span> <span aria-hidden="true">💡</span>
                            <br />
                            <span className="text-slate-600 dark:text-gray-400 transition-colors duration-300">Check if your closing tag is correct.</span>
                        </p>
                        <p className="text-sm text-slate-800 dark:text-gray-200 transition-colors duration-300">
                            <span className="font-semibold">Hint #2</span> <span aria-hidden="true">💡</span>
                            <br />
                            <span className="text-slate-600 dark:text-gray-400 transition-colors duration-300">
                                Make sure the button is inside the{' '}
                                <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-gray-700 text-[12px] font-mono text-slate-700 dark:text-gray-300 transition-colors duration-300">
                                    &lt;body&gt;
                                </code>{' '}
                                tag.
                            </span>
                        </p>
                    </div>

                    <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors duration-300">
                        <CheckIcon className="w-4 h-4" />
                        Looks good! Try running again.
                    </p>
                </div>
            </div>
        </div>
    );
}

function SparkleIcon({ className = '' }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2z" />
        </svg>
    );
}

function CheckIcon({ className = '' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <circle cx="12" cy="12" r="10" fill="#10B981" />
            <path d="M8 12.5l2.5 2.5L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}