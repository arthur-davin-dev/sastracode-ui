"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Award, Sparkles, ArrowRight } from "lucide-react";
import { RequirementChecklistItem } from "@/types/certificate";

interface ClaimCertificateCardProps {
  items: RequirementChecklistItem[];
}

export function ClaimCertificateCard({ items }: ClaimCertificateCardProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allDone = items.every((item) => item.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300">
        
        {/* Subtle Decorative Background Mesh/Glow */}
        <div
          className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl transition-all duration-500 ${
            allDone ? "bg-amber-400/25 dark:bg-amber-500/15" : "bg-indigo-500/15 dark:bg-indigo-500/10"
          }`}
        />

        <CardContent className="flex flex-col items-center gap-6 p-8 text-center relative z-10">
          
          {/* Top Animated Icon Header */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-inner transition-all duration-300 ${
                allDone
                  ? "bg-gradient-to-tr from-amber-500 to-yellow-300 text-white shadow-amber-200"
                  : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50"
              }`}
            >
              <Award className="h-10 w-10" />
            </motion.div>

            {/* Sparkle badge indicator when unlocked */}
            {allDone && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-md"
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2 max-w-sm">
            <h3 className="text-2xl font-bold text-indigo-950 dark:text-indigo-100 leading-tight">
              ទាមទារវិញ្ញាបនបត្រ
            </h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              បំពេញគ្រប់លក្ខខណ្ឌខាងក្រោមដើម្បីទទួលបានវិញ្ញាបនបត្រនេះ
            </p>
          </div>

          {/* Progress Status Bar */}
          <div className="w-full max-w-sm space-y-2 pt-1">
            <div className="flex justify-between items-center text-base font-semibold">
              <span className="text-slate-600 dark:text-slate-300">
                លក្ខខណ្ឌដែលបានបំពេញ
              </span>
              <span className={allDone ? "text-amber-600 font-bold" : "text-indigo-600 dark:text-indigo-400"}>
                {completedCount} / {totalCount} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  allDone
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                    : "bg-indigo-600 dark:bg-indigo-500"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Requirement Checklist */}
          <div className="w-full max-w-sm space-y-3 text-left pt-2">
            {items.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  item.completed
                    ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
                    : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-400 shrink-0" />
                )}
                <span className={`text-lg font-medium ${item.completed ? "line-through opacity-85" : ""}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="w-full max-w-sm pt-2">
            <Button
              disabled={!allDone}
              className={`w-full h-12 rounded-2xl text-lg font-semibold shadow-sm transition-all duration-300 group ${
                allDone
                  ? "bg-indigo-950 hover:bg-indigo-900 text-white shadow-indigo-950/20 hover:shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
            >
              <span>{allDone ? "ទាមទារវិញ្ញាបនបត្រឥឡូវនេះ" : "មិនទាន់គ្រប់លក្ខខណ្ឌ"}</span>
              {allDone && (
                <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}