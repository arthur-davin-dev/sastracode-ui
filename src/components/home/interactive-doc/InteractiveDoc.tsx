"use client";

import { useTranslation } from "@/hooks/useTranslations";
import AIChatCard from "./AIChatCard";
import PreviewCard from "./PreviewCard";
import Link from "next/link";

export default function InteractiveDoc() {
  const currentT = useTranslation();
  
  return (
    <section className="py-2.5 sm:py-5 lg:py-7.5 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* LEFT */}
          <div className="text-center lg:text-left flex flex-col justify-between">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
                {currentT.interactiveDoc.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-gray-400 leading-7 sm:leading-relaxed mb-5 sm:mb-6 transition-colors duration-300">
                {currentT.interactiveDoc.description}
              </p>

              <Link
                href="/documentation"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-slate-800 dark:text-white font-medium hover:text-slate-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                {currentT.interactiveDoc.link}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-8 lg:mt-6 flex justify-center lg:justify-start">
              <PreviewCard />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end mt-5 lg:mt-0">
            <AIChatCard />
          </div>
        </div>
      </div>
    </section>
  );
}