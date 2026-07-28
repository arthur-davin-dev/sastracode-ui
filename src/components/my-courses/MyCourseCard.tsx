"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { MyCourse } from "@/types/course";

interface MyCourseCardProps {
  course: MyCourse & {
    progressPercent?: number; 
  };
}

export function MyCourseCard({ course }: MyCourseCardProps) {
  // Default fallback if progress is not provided
  const progress = course.progressPercent ?? 0;
  const isCompleted = progress === 100;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 h-full">
        
        {/* Thumbnail Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={course.thumbnailUrl || "/placeholder.jpg"}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-primary-color border-none px-3 py-1 text-base font-semibold shadow-xs">
              {course.category}
            </Badge>
          </div>

          {/* Pricing Tag */}
          <div className="absolute top-3 right-3">
            <Badge
              className={`text-lg font-medium px-3 py-1 border-none shadow-xs backdrop-blur-md ${
                course.status === "in_progress"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-init-color/90 text-white"
              }`}
            >
              {course.status === "in_progress" ? "ឥតគិតថ្លៃ" : "ថ្នាក់បង់ថ្លៃ"}
            </Badge>
          </div>

          {/* Play Icon Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
            <div className="p-4 rounded-full bg-white/90 text-primary-color shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-6 w-6 fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* Card Content Section */}
        <CardContent className="p-6 flex flex-col justify-between flex-1 gap-5">
          
          {/* Title & Description */}
          <div className="space-y-2">
            {/* Title set to text-2xl */}
            <h3 className="font-bold text-lg text-primary-color dark:text-primary-100 line-clamp-1 group-hover:text-primary-600 transition-colors leading-snug">
              {course.title}
            </h3>
            {/* Content description set to text-lg */}
            <p className="text-lg text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Course Metadata (Students & Duration) */}
          <div className="flex items-center gap-6 text-lg font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-color" />
              {course.studentsCount} សិស្ស
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary-color" />
              {course.duration}
            </span>
          </div>

          {/* Student Learning Progress Section */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-lg font-semibold">
              <span className="text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span>បានបញ្ចប់</span>
                  </>
                ) : (
                  <span>វឌ្ឍនភាពសិក្សា</span>
                )}
              </span>
              <span className="text-primary-color dark:text-primary-400">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isCompleted ? "bg-emerald-500" : "bg-indigo-600"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2">
            <Button
              className={`w-full h-12 justify-between rounded-xl font-medium text-lg px-5 shadow-xs group/btn ${
                isCompleted
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  : "bg-indigo-950 hover:bg-indigo-900 text-white"
              }`}
            >
              <span>{isCompleted ? "ពិនិត្យឡើងវិញ" : progress > 0 ? "បន្តសិក្សា" : "ចាប់ផ្តើមសិក្សា"}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}