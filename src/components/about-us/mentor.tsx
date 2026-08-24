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
  const titleObj = mentorsLocale?.title as { prefix?: string; highlight?: string; suffix?: string } | undefined;

  // Simulating loading state while translations hydrate
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-10 px-4 sm:px-8 flex flex-col items-center transition-colors duration-300">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-khmer text-primary-color dark:text-slate-100 mb-3">
          {titleObj?.prefix || ""}{" "}
          <span className="text-red-600 dark:text-red-500">
            {titleObj?.highlight || ""}
          </span>
          {titleObj?.suffix ? ` ${titleObj.suffix}` : ""}
        </h2>
        <p className="font-khmer text-slate-600 dark:text-slate-300 leading-relaxed text-[22px]">
          {mentorsLocale?.description || ""}
        </p>
      </motion.div>

      {/* Skeleton Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center max-w-150 w-full">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="flex flex-col items-center w-full max-w-60 animate-pulse py-4"
            >
              <div className="w-48 h-48 rounded-full bg-slate-200 dark:bg-slate-800 mb-5" />
              <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-5" />
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Mentors Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center max-w-150 w-full">
          {mentorsLocale?.items?.slice(0, 2).map((mentor: any, index: number) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="group flex flex-col items-center text-center w-full max-w-60 py-4"
            >
              {/* Image Container with Dark Mode Border */}
              <div className="relative w-48 h-48 rounded-full border-[3px] border-[#002455] dark:border-blue-400 p-1 mb-5 transition-transform duration-300 group-hover:scale-105">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Mentor Name */}
              <h3 className="font-bold text-[#002455] dark:text-slate-100 text-2xl tracking-tight mb-1 font-khmer">
                {mentor.name}
              </h3>

              {/* Role */}
              <p className="text-[22px] font-khmer font-semibold text-[#1d3557] dark:text-slate-300 mb-5">
                ({mentor.role})
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 mt-auto">
                <a
                  href={mentor.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[#002455] dark:text-slate-200 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>

                <a
                  href={mentor.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 border border-transparent dark:border-blue-800/40"
                  aria-label="Telegram"
                >
                  <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}