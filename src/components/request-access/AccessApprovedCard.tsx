"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Play, Lock, Info } from "lucide-react";

interface AccessApprovedCardProps {
  courseTitle?: string;
  courseImage?: string;
  level?: string;
  lessons?: number;
  duration?: string;
  description?: string;
  studentEmail?: string;
  onStartLearning?: () => void;
}

export default function AccessApprovedCard({
  courseTitle = "ISTAD Backend Development Bootcamp",
  courseImage,
  level = "Advanced Level",
  lessons = 18,
  duration = "5h 20m",
  description = "Build real-world web applications with modern technologies and best practices.",
  studentEmail = "student@istad.edu.kh",
  onStartLearning,
}: AccessApprovedCardProps) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center px-4 py-6 md:py-10 text-primary-color dark:text-slate-100 font-sans">
      {/* Success Green Circle Check Icon */}
      <div className="mb-6 flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-emerald-100/80  text-emerald-600 dark:text-emerald-400 shadow-sm">
        <Check className="h-9 w-9 md:h-10 md:w-10 stroke-[3]" />
      </div>

      {/* Title & Subtitle */}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-2">
        Access Approved!
      </h1>
      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6 leading-relaxed">
        ឥឡូវនេះ អ្នកអាចចូលប្រើវគ្គសិក្សាឯកជននេះបានហើយ
      </p>

      {/* Main Course Preview Box */}
      <div className="w-full border border-slate-200 dark:border-slate-200 bg-white/80 dark:bg-white/80 rounded-2xl p-4 md:p-5 mb-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
          {/* Thumbnail Container */}
          <div className="relative h-28 w-28 sm:h-24 sm:w-24 rounded-xl bg-slate-950 overflow-hidden shrink-0">
            {courseImage && (
              <Image
                src={courseImage}
                alt={courseTitle}
                fill
                className="object-cover opacity-40 blur-[1px]"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900/70 border border-white/20 text-white shadow-md">
                <Lock className="h-4 w-4 text-indigo-300" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1.5 flex-1">
            <h2 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {courseTitle}
            </h2>

            <Badge className="bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-medium px-2.5 py-0.5 text-[11px] rounded-md border-none shadow-none">
              Private
            </Badge>

            <p className="text-xs text-slate-400 dark:text-slate-500 pt-1">
              {level}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {lessons} Lessons • {duration}
            </p>

            <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* Access Granted Info Box */}
        <div className="w-full bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl p-3 flex items-center justify-between gap-2">
          <div className="text-xs">
            <span className="text-slate-500 dark:text-slate-400 block">
              Access granted to
            </span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400 break-all">
              {studentEmail}
            </span>
          </div>

          <Badge className="bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border-none px-2.5 py-1 text-[11px] font-semibold rounded-lg shrink-0">
            Approved
          </Badge>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3 mb-6">
        <Button
          onClick={onStartLearning}
          className="w-full h-11 md:h-12 rounded-xl bg-primary-color hover:bg-blue-700 text-white font-semibold text-xs md:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Play className="h-4 w-4 fill-white" />
          <span>ចាប់ផ្តើមរៀន</span>
        </Button>

        <Link
          href="/courses/details"
          className="w-full h-11 md:h-12 inline-flex rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs md:text-sm transition-all items-center justify-center"
        >
          មើលព័ត៌មានលម្អិតនៃវគ្គសិក្សា
        </Link>
      </div>

      {/* Access Materials Info Alert */}
      <div className="w-full bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/30 rounded-2xl p-4 flex items-start gap-3 text-emerald-800 dark:text-emerald-300">
        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
          <Info className="h-4 w-4" />
        </div>
        <p className="text-xs md:text-sm leading-relaxed">
        ឥឡូវនេះ អ្នកអាចចូលប្រើឯកសារវគ្គសិក្សា មេរៀន និងធនធានទាំងអស់បាន
        </p>
      </div>
    </div>
  );
}
