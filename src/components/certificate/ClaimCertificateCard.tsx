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
      <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-300">
        
        {/* Top Accent Gradient Line (Red Secondary & Yellow Accent) */}
        <div className="absolute top-0 left-0 w-full h-2 " />

        {/* Ambient Glow */}
        <div
          className={`absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl transition-all duration-500 ${
            allDone ? "bg-init-color/20" : "bg-init-color/10"
          }`}
        />

        <CardContent className="flex flex-col items-center gap-6 p-8 text-center relative z-10">
          
          {/* Top Animated Icon Header */}
          <div className="relative pt-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 border ${
                allDone
                  ? "bg-init-color/20 border-init-color/60 text-secondary-color"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-secondary-color"
              }`}
            >
              <Award className="h-10 w-10 text-secondary-color" />
            </motion.div>

            {/* Sparkle Badge Indicator when Unlocked */}
            {allDone && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-secondary-color text-white p-1.5 rounded-full shadow-md"
              >
                <Sparkles className="h-4 w-4 text-init-color" />
              </motion.div>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2 max-w-sm">
            <h3 className="text-2xl font-extrabold text-primary-color dark:text-white leading-tight">
              ទាមទារវិញ្ញាបនបត្រ
            </h3>
            <p className="text-lg text-primary-color dark:text-white opacity-80 leading-relaxed">
              បំពេញគ្រប់លក្ខខណ្ឌខាងក្រោមដើម្បីទទួលបានវិញ្ញាបនបត្រនេះ
            </p>
          </div>

          {/* Progress Status Bar */}
          <div className="w-full max-w-sm space-y-2 pt-1">
            <div className="flex justify-between items-center text-lg font-bold text-primary-color dark:text-white">
              <span className="opacity-80">លក្ខខណ្ឌដែលបានបំពេញ</span>
              <span className={allDone ? "text-primary-color" : "text-secondary-color"}>
                {completedCount} / {totalCount} ({progressPercent}%)
              </span>
            </div>
            
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-primary-color to-blue-400"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Requirement Checklist */}
          <div className="w-full max-w-sm space-y-3 text-left pt-2">
            {items.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all ${
                  item.completed
                    ? "bg-init-color/10 border-init-color/40 text-primary-color"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-primary-color opacity-60"
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-400 shrink-0" />
                )}
                <span className={`text-lg font-bold ${item.completed ? "line-through opacity-80" : ""}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="w-full max-w-sm pt-2">
            <Button
              disabled={!allDone}
              className={`w-full h-14 rounded-2xl text-lg font-bold shadow-md transition-all duration-300 gap-2 flex items-center justify-center group ${
                allDone
                  ? "bg-init-color hover:bg-yellow-400 hover:text-slate-950 text-white"
                  : "bg-primary-color dark:bg-slate-800 text-white cursor-not-allowed border  dark:border-slate-700"
              }`}
            >
              <span>{allDone ? "ទាមទារវិញ្ញាបនបត្រឥឡូវនេះ" : "មិនទាន់គ្រប់លក្ខខណ្ឌ"}</span>
              {allDone && (
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}