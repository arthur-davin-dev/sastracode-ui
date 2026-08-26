"use client";

import React from "react";
import { useTranslation } from "@/hooks/useTranslations";
import VectorLine from "./VectorLine";

export default function AIChatCard() {
  return (
    <div className="w-full min-h-75 flex items-center justify-center font-khmer overflow-hidden px-2 sm:px-4">
      <AiCoachWidget />
    </div>
  );
}

function AiCoachWidget() {
  const currentT = useTranslation();

  // Safely retrieve the title text from the aiChatCard dictionary
  const aiChatTitle =
    currentT?.aiChatCard?.aiChat ||
    "AI Coach helps you analyze code errors and provides hints instantly.";

  return (
    <div className="relative w-full max-w-5xl mx-auto py-4">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:gap-5 md:gap-7">
        <div className="relative shrink-0 pt-6 sm:-top-16">
          <img
            src="/home/image/aiCoachRobot.png"
            alt="AI Coach robot"
            className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 animate-float object-contain"
          />
        </div>
        <VectorLine />

        <div className="flex-1 min-w-0 w-full max-w-full">
          {/* Fixed EN/KM translation binding */}
          <p className="text-base md:text-xl font-medium text-slate-800 dark:text-slate-200 leading-snug mb-3.5 transition-colors duration-300">
            {aiChatTitle}
          </p>

          <ChatCard currentT={currentT} />
        </div>
      </div>

      <style jsx>{`
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: floatY 3.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function ChatCard({ currentT }: { currentT: any }) {
  const t = currentT?.aiChatCard || {
    userRole: "You",
    userQuestion: "Why is my button not working?",
    aiRole: "AI Coach",
    hint1Title: "Hint #1",
    hint1Text: "Check if your closing tag is correct.",
    hint2Title: "Hint #2",
    hint2TextPrefix: "Make sure the button is inside the",
    hint2TextSuffix: "tag.",
    successText: "Looks good! Try running again.",
  };

  return (
    <div className="w-full max-w-full rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-[0_8px_30px_rgba(2,6,23,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden transition-colors duration-300">
      {/* User Message */}
      <div className="flex items-start gap-3.5 px-5 sm:px-7 md:px-8 pt-5 pb-4">
        <div className="w-8 h-8 shrink-0 rounded-full bg-slate-800 dark:bg-gray-600 flex items-center justify-center text-xs md:text-sm font-semibold text-white transition-colors duration-300">
          Y
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm font-semibold text-slate-500 dark:text-gray-400 mb-0.5 transition-colors duration-300">
            {t.userRole}
          </p>
          <p className="text-base md:text-lg text-slate-800 dark:text-gray-200 transition-colors duration-300 leading-relaxed wrap-break-words">
            {t.userQuestion}
          </p>
        </div>
      </div>

      <div className="h-px bg-slate-100 dark:bg-gray-700 transition-colors duration-300" />

      {/* AI Response */}
      <div className="flex items-start gap-3.5 px-5 sm:px-7 md:px-8 pt-5 pb-6">
        <div className="w-8 h-8 shrink-0 rounded-full bg-primary-color dark:bg-primary-color flex items-center justify-center transition-colors duration-300">
          <SparkleIcon className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm font-semibold text-primary-color dark:text-primary-color mb-2.5 transition-colors duration-300">
            {t.aiRole}
          </p>

          <div className="space-y-3.5 mb-5">
            <p className="text-base md:text-lg text-slate-800 dark:text-gray-200 transition-colors duration-300 leading-relaxed wrap-break-words">
              <span className="font-semibold">{t.hint1Title}</span>{" "}
              <span aria-hidden="true"></span>
              <br />
              <span className="text-slate-600 dark:text-gray-400 transition-colors duration-300">
                {t.hint1Text}
              </span>
            </p>

            <p className="text-base md:text-lg text-slate-800 dark:text-gray-200 transition-colors duration-300 leading-relaxed wrap-break-words">
              <span className="font-semibold">{t.hint2Title}</span>{" "}
              <span aria-hidden="true"></span>
              <br />
              <span className="text-slate-600 dark:text-gray-400 transition-colors duration-300">
                {t.hint2TextPrefix}{" "}
                <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-gray-700 text-sm font-mono text-slate-700 dark:text-gray-300 transition-colors duration-300 inline-block">
                  &lt;body&gt;
                </code>{" "}
                {t.hint2TextSuffix}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="#10B981" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}