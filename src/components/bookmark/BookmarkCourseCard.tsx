"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Users, Clock, ArrowRight, PlayCircle } from "lucide-react";
import { BookmarkedCourse } from "@/types/course";

export function BookmarkCourseCard({ course }: { course: BookmarkedCourse }) {
  const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked);

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white
     dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Thumbnail Container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={course.thumbnailUrl || "/placeholder.jpg"}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 dark:bg-primary-color backdrop-blur-md text-primary-color
           dark:text-indigo-300 border-none px-2.5 py-0.5 text-lg font-semibold shadow-xs">
            {course.category}
          </Badge>
        </div>

        {/* Quick Bookmark Toggle Action */}
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          aria-label="Toggle Bookmark"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xs"
        >
          <Bookmark
            className={`h-4 w-4 transition-colors ${
              isBookmarked
                ? "fill-init-color text-init-color dark:fill-indigo-400 dark:text-indigo-400"
                : "text-slate-400 hover:primary-color dark:text-slate-500 dark:hover:text-indigo-400"
            }`}
          />
        </button>
      </div>

      {/* Content Section */}
      <CardContent className="p-4 flex flex-col justify-between flex-1 gap-3">
        <div className="space-y-1.5">
          <h3 className="font-bold text-lg md:text-base text-indigo-950 dark:text-indigo-100 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {course.title}
          </h3>
          <p className="text-lg text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="flex items-center gap-4 text-lg font-medium text-prm
         dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="flex items-center gap-1.5 text-lg">
            <Users className="h-3.5 w-3.5 text-indigo-500" />
            {course.studentsCount} សិស្ស
          </span>
          <span className="flex items-center gap-1.5 text-lg">
            <Clock className="h-3.5 w-3.5 text-primary-color" />
            {course.duration}
          </span>
        </div>

        {/* Action Button Row */}
        <div className="pt-1 flex items-center justify-between gap-2">
          <Button
            size="sm"
            variant="outline"
            className="w-1/2 rounded-xl text-lg font-semibold text-primary-color dark:text-slate-300 border-slate-200 dark:border-primary-color hover:bg-slate-50 dark:hover:bg-primary-color/10 shadow-xs flex items-center justify-center gap-1"
          >
            ព័ត៌មានលម្អិត
          </Button>

          <Button
            size="sm"
            className="w-1/2 rounded-xl text-lg font-semibold bg-primary-color hover:bg-indigo-900 text-white shadow-xs group/btn flex items-center justify-center gap-1"
          >
            <span>សិក្សា</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}