"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { XpLevelBadge } from "@/components/ui/xp-level-badge";
import { LearningPath } from "@/types/achievement";
import { ChevronRight, CheckCircle2, Award } from "lucide-react";

interface LearningPathProgressProps {
  paths: LearningPath[];
  completedCount: number;
  totalCount: number;
  continueHref: string;
}

export function LearningPathProgress({ paths, completedCount, totalCount, continueHref }: LearningPathProgressProps) {
  return (
    <div className="space-y-6">
      
      {/* Top Header & Main Progress Overview */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-white/10">
        
        {/* Left Side: Completion Badge Container */}
        <div className="flex flex-col items-center justify-center shrink-0 p-4 rounded-2xl bg-white dark:bg-slate-900/25 border-2 border-slate-200 dark:border-white/10 text-center min-w-[120px]">
          <XpLevelBadge level={completedCount} size={76} />
          <div className="mt-2 flex items-center gap-1 text-lg font-bold text-primary-color dark:text-white">
            <Award className="h-5 w-5 text-init-color" />
            <span>{completedCount} / {totalCount}</span>
          </div>
          <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">
            បានបញ្ចប់
          </span>
        </div>

        {/* Right Side: Learning Paths List */}
        <div className="flex-1 space-y-5 w-full">
          {paths.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-lg text-slate-500 dark:border-slate-700 dark:text-slate-400">
              អ្នកមិនទាន់បានចុះឈ្មោះក្នុងវគ្គសិក្សាណាមួយនៅឡើយទេ
            </p>
          )}
          {paths.map((path) => {
            const isCompleted = path.progressPercent === 100;
            const RowTag: ElementType = path.href ? Link : "div";

            return (
              <RowTag
                key={path.id}
                {...(path.href ? { href: path.href } : {})}
                className="block space-y-2 p-4 rounded-2xl bg-white dark:bg-slate-900/25 border border-slate-100 dark:border-white/10 hover:border-primary-color/40 hover:shadow-sm transition-all duration-300 group cursor-pointer"
              >
                {/* Title & Status Bar */}
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold text-lg text-primary-color dark:text-white group-hover:underline transition-colors duration-300">
                    {path.name}
                  </span>

                  {/* Status Pill (Yellow Accent for completed / Red Secondary for in progress) */}
                  <div className="shrink-0">
                    {isCompleted ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary-color/20 text-primary-color dark:text-white text-lg font-bold border border-primary-color/40">
                        <CheckCircle2 className="h-5 w-5 text-primary-color" />
                        បានបញ្ចប់
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-lg font-bold border border-red-200 dark:border-red-900/50">
                        {path.progressPercent}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Custom Modern Progress Bar */}
                <div className="relative h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 shadow-xs ${
                      isCompleted 
                        ? "bg-gradient-to-r from-primary-color to-blue-900" 
                        : "bg-gradient-to-r from-primary-color to-blue-700"
                    }`}
                    style={{ width: `${Math.min(path.progressPercent, 100)}%` }}
                  />
                </div>
              </RowTag>
            );
          })}
        </div>

      </div>

      {/* Action Footer (Continue Learning Link) */}
      <div className="flex justify-end pt-2">
        <a
          href={continueHref}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary-color hover:bg-primary-color/70
           text-white text-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
        >
          <span>បន្តការសិក្សា</span>
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

    </div>
  );
}
