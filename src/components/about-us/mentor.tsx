"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslations";

export default function Mentor() {
  const { mentors: mentorsLocale } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);

  // Cast title to include optional suffix to satisfy TS union check
  const titleObj = mentorsLocale?.title as
    | { prefix?: string; highlight?: string; suffix?: string }
    | undefined;

  // Simulating loading state while translations hydrate
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-4 px-4 sm:px-8 md:px-12 flex flex-col items-center text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Top Divider Line */}
      <div className="w-64 sm:w-96 h-0.5 bg-amber-400 mb-8 rounded-full" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-6 font-khmer"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[#002455] dark:text-slate-100 mb-3">
          {titleObj?.prefix || ""}{" "}
          <span className="text-red-600 dark:text-red-500">
            {titleObj?.highlight || ""}
          </span>
          {titleObj?.suffix ? ` ${titleObj.suffix}` : ""}
        </h2>
        {mentorsLocale?.description && (
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-khmer text-[22px]">
            {mentorsLocale.description}
          </p>
        )}
      </motion.div>

      {/* Skeleton Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-150 w-full">
          {[1, 2].map((n) => (
            <div key={n} className="pt-20 pb-4 flex justify-center w-full max-w-70">
              <div className="relative bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md pt-20 pb-6 px-6 w-full h-70 text-center flex flex-col items-center animate-pulse">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 shadow-sm" />
                <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-2 mt-2" />
                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
                <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded mb-6" />
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Mentors Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center max-w-150 w-full">
          {mentorsLocale?.items?.slice(0, 2).map((mentor: any, index: number) => {
            const mentorQuote = mentor.quote || mentor.bio || "មិនមានសម្រង់សម្ដីទេ";

            return (
              <motion.div
                key={mentor.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                className="pt-20 pb-4 flex justify-center w-full max-w-70"
              >
                {/* Card Container */}
                <div className="group relative bg-slate-50 dark:bg-slate-900/90 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-md dark:shadow-none pt-20 pb-6 px-6 w-full text-center flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl dark:hover:border-slate-700">
                  
                  {/* Avatar Container with Animated Stroke Ring */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 flex items-center justify-center">
                    
                    {/* SVG Stroke Circle */}
                    <svg className="absolute -inset-1.5 w-43 h-43 rotate-90 pointer-events-none z-20">
                      <circle
                        cx="86"
                        cy="86"
                        r="78"
                        className="stroke-[#002455] dark:stroke-blue-500 fill-none stroke-3 [stroke-dasharray:490] [stroke-dashoffset:-490] transition-all duration-1500 ease-in-out group-hover:[stroke-dashoffset:0]"
                      />
                    </svg>

                    {/* Profile Image Wrapper */}
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-sm z-10 transition-transform duration-500 ease-out group-hover:scale-95 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Mentor Name */}
                  <h3 className="font-bold font-khmer text-[#002455] dark:text-slate-100 text-[24px] mb-1 mt-2 transition-colors duration-300 group-hover:text-red-500 dark:group-hover:text-blue-400">
                    {mentor.name}
                  </h3>

                  {/* Role / Position */}
                  <span className="text-[22px] font-semibold text-[#002455] dark:text-slate-400 mb-3 font-khmer">
                    {mentor.role || mentor.position}
                  </span>

                  {/* Quote - Wrapped tightly with double quotes */}
                  <p className="text-[16px] font-khmer text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                    {`"${mentorQuote}"`}
                  </p>

                  {/* Social Icons Container */}
                  <div className="flex items-center gap-3 mt-auto">
                    {/* GitHub Icon */}
                    <a
                      href={mentor.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-[#002455] dark:text-slate-200 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>

                    {/* Telegram / Contact Icon */}
                    <a
                      href={mentor.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-blue-100/80 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 border border-transparent dark:border-blue-800/40"
                      aria-label="Telegram"
                    >
                      <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}