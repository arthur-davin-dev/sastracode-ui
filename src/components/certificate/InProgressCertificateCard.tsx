"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle, Hourglass, Film, CheckCircle2 } from "lucide-react";
import {
  useGetCourseBySlugQuery,
  useGetCourseProgressQuery,
} from "@/redux/api";
import { mapApiCourseToCourse } from "@/lib/course/course-adapter";
import { COURSE_COMPLETE_PERCENT } from "@/hooks/useCourseCompletionMap";

export function InProgressCertificateCard({
  courseId,
  slug,
  completed: completedProp = false,
}: {
  /** Real course UUID — course progress is still fetched by id, not slug. */
  courseId: string;
  /** Course slug (backend GET /v1/courses/{slug}) — from enrollment.courseSlug. */
  slug: string;
  completed?: boolean;
}) {
  const { data: course, isFetching: isFetchingCourse } =
    useGetCourseBySlugQuery(slug);
  const { data: progress, isFetching: isFetchingProgress } =
    useGetCourseProgressQuery(courseId);

  if ((isFetchingCourse || isFetchingProgress) && !course) {
    return (
      <Card className="rounded-3xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6 animate-pulse">
          <div className="aspect-[16/10] w-full md:w-44 rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 w-full space-y-3">
            <div className="h-5 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
            <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
            <div className="h-4 w-1/3 rounded bg-slate-100 dark:bg-slate-800" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!course) return null;

  const mapped = mapApiCourseToCourse(course);
  const totalVideos = progress?.totalVideos ?? 0;
  const completedVideos = Math.min(progress?.completedVideos ?? 0, totalVideos);
  const progressRaw =
    progress?.percentage ??
    (totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0);
  const progressPercent = Math.round(progressRaw);
  const completed = completedProp || progressRaw >= COURSE_COMPLETE_PERCENT;

  return (
    <Card className="relative overflow-hidden rounded-3xl  border-slate-100 dark:border-slate-800  bg-white dark:bg-slate-900 transition-all duration-300  hover:-translate-y-0.5 group">
      {/* Top Accent Line (Red Secondary & Yellow Accent) */}
      <div className="absolute top-0 left-0 w-full h-2 " />

      <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
        {/* Thumbnail Image Container */}
        <div className="relative w-full md:w-44 shrink-0 overflow-hidden rounded-2xl">
          <img
            src={mapped.image}
            alt={mapped.title}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors" />
        </div>

        {/* Details Content */}
        <div className="flex-1 min-w-0 w-full space-y-3">
          {/* Header Row: Title & Status Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg text-bold font-extrabold text-primary-color dark:text-white truncate">
              {mapped.title}
            </h3>

            {/* Status Badge */}
            {completed ? (
              <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 border border-green-200 dark:border-green-900 text-lg font-bold w-fit shrink-0">
                <CheckCircle2 className="h-4 w-4" />
                បានបញ្ចប់
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-init-color/20 text-primary-color dark:text-yellow-300 border border-yellow-400/50 text-lg font-bold w-fit shrink-0">
                <Hourglass className="h-4 w-4 text-secondary-color animate-pulse" />
                កំពុងដំណើរការ
              </span>
            )}
          </div>

          {/* Progress Percent Text */}
          <div className="flex items-center justify-between text-lg font-bold text-primary-color dark:text-white">
            <span className="opacity-80">វឌ្ឍនភាពសិក្សា</span>
            <span
              className={completed ? "text-green-600" : "text-secondary-color"}
            >
              {progressPercent}%
            </span>
          </div>

          {/* Styled Progress Bar */}
          <Progress
            value={progressPercent}
            className={`h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full ${
              completed ? "[&>div]:bg-green-500" : "[&>div]:bg-secondary-color"
            }`}
          />

          {/* Videos Watched Info */}
          <div className="flex items-center gap-2 text-lg font-medium text-primary-color dark:text-white opacity-80 pt-1">
            <Film className="h-5 w-5 text-secondary-color shrink-0" />
            <span>
              បានមើល{" "}
              <span className="font-bold text-primary-color dark:text-white">
                {completedVideos}
              </span>{" "}
              លើ {totalVideos} វីដេអូ
            </span>
          </div>
        </div>

        {/* Action Button (only for courses still in progress) */}
        {!completed && (
          <Button
            size="lg"
            render={<Link href={mapped.href ?? `/courses/${slug}`} />}
            className="w-full md:w-auto h-14 px-6 rounded-2xl text-lg font-bold text-white bg-primary-color hover:bg-blue-400 hover:text-slate-950  transition-all duration-300 gap-2 shrink-0 flex items-center justify-center group/btn"
          >
            <PlayCircle className="h-6 w-6 transition-transform duration-300 group-hover/btn:scale-110" />
            <span>បន្តការសិក្សា</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
