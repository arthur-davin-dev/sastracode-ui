"use client";

import React from "react";
import {
  Target,
  Eye,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Code2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslations";

export default function MissionVision() {
  const { mission } = useTranslation();

  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 py-20 px-6 md:px-12 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 text-xs font-mono font-medium mb-4 border border-blue-200 dark:border-blue-900">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{mission.section.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            {mission.section.title}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base leading-relaxed">
            {mission.section.description}
          </p>
        </motion.div>

        {/* BLOCK 1: MISSION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Visual Showcase (Mission) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center relative min-h-80"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                interactive_editor.ts
              </span>
            </div>

            {/* Code Snippet Visual */}
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-4 text-right select-none text-slate-300 dark:text-slate-700">
                  1
                </span>
                <span>
                  <span className="text-cyan-600 dark:text-cyan-400">
                    const
                  </span>{" "}
                  mission ={" "}
                  <span className="text-emerald-600 dark:text-emerald-400">
                    &#39;{mission.content.code.mission}&#39;
                  </span>
                  ;
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-4 text-right select-none text-slate-300 dark:text-slate-700">
                  2
                </span>
                <span>
                  <span className="text-blue-600 dark:text-blue-400">
                    function
                  </span>{" "}
                  <span className="text-amber-600 dark:text-amber-400">
                    {mission.content.code.function}
                  </span>
                  () &#123;
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 pl-6">
                <span className="w-4 text-right select-none text-slate-300 dark:text-slate-700">
                  3
                </span>
                <span>
                  <span className="text-cyan-600 dark:text-cyan-400">
                    return
                  </span>{" "}
                  {mission.content.code.return};
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-4 text-right select-none text-slate-300 dark:text-slate-700">
                  4
                </span>
                <span>&#125;</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-cyan-500" /> {mission.content.highlight}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {mission.content.free}
              </span>
            </div>
          </motion.div>

          {/* Mission Text */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {mission.content.title}
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {mission.content.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {mission.content.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BLOCK 2: VISION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Vision Text */}
          <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {mission.vision.title}
              </h3>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              {mission.vision.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {mission.vision.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3.5 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Showcase (Vision) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-6 bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-center min-h-80 order-1 lg:order-2"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-500" />{" "}
                {mission.vision.metrics.title}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {mission.vision.metrics.year}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">
                    {mission.vision.metrics.practicalSkillBuilding.label}
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-amber-600 dark:text-amber-400 font-semibold"
                  >
                    {mission.vision.metrics.practicalSkillBuilding.percentage}%
                  </motion.span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-amber-500 h-full rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{
                      width: `${mission.vision.metrics.practicalSkillBuilding.percentage}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300">
                    {mission.vision.metrics.techCareerPlacement.label}
                  </span>
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-blue-600 dark:text-blue-400 font-semibold"
                  >
                    {mission.vision.metrics.techCareerPlacement.percentage}%
                  </motion.span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-blue-500 h-full rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{
                      width: `${mission.vision.metrics.techCareerPlacement.percentage}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                      delay: 0.2,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{mission.vision.metrics.footer}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}