"use client";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { BadgeRequirement } from "@/types/achievement";

export function BadgeRequirementItem({ requirement }: { requirement: BadgeRequirement }) {
  return (
    <div className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 mb-3 rounded-2xl bg-white dark:bg-slate-900/90 border-2 border-slate-100 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-50 transition-all duration-300 gap-4">
      
      {/* Left Section: Icon, Title & Description */}
      <div className="flex items-start gap-4">
        
        {/* Status Icon Indicator */}
        <div className="mt-1 shrink-0">
          {requirement.completed ? (
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-primary-color dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 shadow-xs group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="h-6 w-6 text-primary-color fill-blue-100 dark:fill-blue-950" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 shadow-inner">
              <Clock className="h-6 w-6 text-slate-400" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="space-y-1">
          <h4 className="font-bold text-lg text-primary-color dark:text-white transition-colors duration-300 leading-snug">
            {requirement.title}
          </h4>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium transition-colors duration-300">
            {requirement.description}
          </p>
        </div>

      </div>

      {/* Right Section: Progress Pill (Yellow Accent for Completed / Red Secondary for In-Progress) */}
      <div className="self-start sm:self-center shrink-0">
        <span
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-lg font-bold border shadow-xs transition-all duration-300 ${
            requirement.completed
              ? "bg-yellow-200/20 text-slate-950 dark:text-init-color border-yellow-400/40"
              : "bg-red-50 dark:bg-red-950/40 text-secondary dark:text-red-400 border-red-200 dark:border-red-900/50"
          }`}
        >
          {requirement.progress}
        </span>
      </div>

    </div>
  );
}