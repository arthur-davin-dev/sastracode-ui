"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Clock, ArrowRight, Play, CheckCircle2, Tag } from "lucide-react";
import { BookmarkedCourse } from "@/types/course";

interface BookmarkCourseCardProps {
  course: BookmarkedCourse & {
    progressPercent?: number; // Optional progress field
  };
}

export function BookmarkCourseCard({ course }: BookmarkCourseCardProps) {
  const [bookmarked, setBookmarked] = useState(course.isBookmarked ?? true);
  
  // Check if progress data exists for this course
  const hasProgress = typeof course.progressPercent === "number" && course.progressPercent > 0;
  const progress = course.progressPercent ?? 0;
  const isCompleted = progress === 100;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 h-full p-0">
        
        {/* Thumbnail Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={course.thumbnailUrl || "/placeholder.jpg"}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

          {/* Top-Left Bookmark Ribbon */}
          <button
            type="button"
            onClick={() => setBookmarked(!bookmarked)}
            className="absolute top-3 left-3 z-20 p-2 rounded-xl bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all active:scale-90"
            title={bookmarked ? "ដកចេញពី bookmark" : "រក្សាទុក"}
          >
            <Bookmark
              className={`h-5 w-5 transition-colors duration-300 ${
                bookmarked
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-white fill-none"
              }`}
            />
          </button>

          {/* Top-Right Access Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <Badge
              className={`border-none px-3.5 py-1.5 text-sm font-bold shadow-sm rounded-full transition-colors duration-300 ${
                course.status === "in_progress"
                  ? "bg-red-600 text-white"
                  : "bg-yellow-400 text-slate-950"
              }`}
            >
              {course.status === "in_progress" ? "ឥតគិតថ្លៃ" : "ថ្នាក់គិតថ្លៃ"}
            </Badge>
          </div>

          {/* Hover Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
            <div className="p-3.5 rounded-full bg-primary-color text-white shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-6 w-6 fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* Card Content Section */}
        <CardContent className="p-5 flex flex-col justify-between flex-1 gap-4">
          
          {/* Category Tag & Title Details */}
          <div className="space-y-2.5">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
                <Tag className="h-3.5 w-3.5 text-amber-600" />
                {course.category}
              </span>
            </div>

            {/* Course Title */}
            <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {course.title}
            </h3>
          </div>

          {/* CONDITIONALLY RENDERED: Progress Section */}
          {hasProgress && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600">បានបញ្ចប់</span>
                    </>
                  ) : (
                    <span>វឌ្ឍនភាពសិក្សា</span>
                  )}
                </span>
                <span className="text-red-600 dark:text-red-400">{progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCompleted 
                      ? "bg-emerald-500" 
                      : "bg-blue-600"
                  }`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer: Time & Action Button */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            
            {/* Duration Display */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 shrink-0">
              <Clock className="h-4 w-4 text-red-500" />
              <span>{course.duration || "២០ ម៉ោង"}</span>
            </div>

            {/* Dynamic Action Button text based on progress state */}
            <Button
              className="h-10 px-3.5 rounded-xl bg-primary-color hover:bg-blue-900 text-white font-bold text-xs shadow-sm transition-all duration-200 shrink-0 flex items-center gap-1.5"
            >
              <span>
                {hasProgress 
                  ? isCompleted 
                    ? "ពិនិត្យឡើងវិញ" 
                    : "បន្តវគ្គសិក្សា" 
                  : "ចាប់ផ្តើមសិក្សា"}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>

          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}