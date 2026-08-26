"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Circle,
  Award,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  useGetCourseByIdQuery,
  useGetCourseProgressQuery,
} from "@/redux/api";
import {
  useGetCourseCertificateQuery,
  useIssueCourseCertificateMutation,
} from "@/redux/features/certificate/certificateApi";
import { RequirementChecklistItem } from "@/types/certificate";

// Matches the backend's rule: a certificate can be issued once course
// progress reaches 80%, not only at 100%.
const ISSUE_ELIGIBLE_PERCENT = 80;

interface ClaimCertificateCardProps {
  courseId: string;
}

export function ClaimCertificateCard({ courseId }: ClaimCertificateCardProps) {
  const { data: course, isFetching: isFetchingCourse } =
    useGetCourseByIdQuery(courseId);
  const { data: progress, isFetching: isFetchingProgress } =
    useGetCourseProgressQuery(courseId);
  const { data: existingCertificate, isFetching: isFetchingCertificate } =
    useGetCourseCertificateQuery(courseId);
  const [issueCertificate, { isLoading: isIssuing }] =
    useIssueCourseCertificateMutation();
  const [issueError, setIssueError] = useState<string | null>(null);
  // Flip the button to the disabled "already received" state the instant
  // issuance succeeds, instead of waiting on the certificate-existence
  // query to refetch (and without needing to navigate away to see it).
  const [justIssued, setJustIssued] = useState(false);

  if (
    (isFetchingCourse || isFetchingProgress || isFetchingCertificate) &&
    !course
  ) {
    return (
      <Card className="rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardContent className="flex flex-col items-center gap-6 p-8 animate-pulse">
          <div className="h-20 w-20 rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-6 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-3 w-full max-w-sm rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="h-24 w-full max-w-sm rounded-2xl bg-slate-100 dark:bg-slate-800" />
        </CardContent>
      </Card>
    );
  }

  if (!course) return null;

  const totalVideos = progress?.totalVideos ?? 0;
  const completedVideos = Math.min(
    progress?.completedVideos ?? 0,
    totalVideos,
  );
  const progressPercent = Math.round(
    progress?.percentage ??
      (totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0),
  );
  const allVideosCompleted = totalVideos > 0 && completedVideos >= totalVideos;
  const canIssue = progressPercent >= ISSUE_ELIGIBLE_PERCENT;
  const alreadyIssued = justIssued || !!existingCertificate?.data;
  const unlocked = alreadyIssued || canIssue;

  const items: RequirementChecklistItem[] = [
    { label: "ចាប់ផ្តើមសិក្សាមេរៀន", completed: completedVideos > 0 },
    { label: "សិក្សាបានលើសពី ៥០%", completed: progressPercent >= 50 },
    { label: "សិក្សាបានលើសពី ៨០%", completed: progressPercent >= 80 },
    { label: "បញ្ចប់វីដេអូទាំងអស់", completed: allVideosCompleted },
  ];

  const handleIssue = async () => {
    if (!canIssue || isIssuing) return;
    setIssueError(null);
    try {
      await issueCertificate(courseId).unwrap();
      setJustIssued(true);
      toast.success("ទទួលបានវិញ្ញាបនបត្រដោយជោគជ័យ!");
    } catch (error) {
      console.error("Issue certificate error:", error);
      setIssueError("មិនអាចទាមទារវិញ្ញាបនបត្របានទេ សូមព្យាយាមម្ដងទៀត");
      toast.error("មិនអាចទាមទារវិញ្ញាបនបត្របានទេ");
    }
  };

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
            alreadyIssued
              ? "bg-green-500/20"
              : canIssue
                ? "bg-init-color/20"
                : "bg-init-color/10"
          }`}
        />

        <CardContent className="flex flex-col items-center gap-6 p-8 text-center relative z-10">
          {/* Top Icon Header */}
          <div className="relative pt-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 border ${
                alreadyIssued
                  ? "bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800 text-green-600"
                  : canIssue
                    ? "bg-init-color/20 border-init-color/60 text-secondary-color"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-secondary-color"
              }`}
            >
              {alreadyIssued ? (
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              ) : (
                <Award className="h-10 w-10 text-secondary-color" />
              )}
            </motion.div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-2 w-full max-w-sm">
            <h3 className="text-2xl font-extrabold text-primary-color dark:text-white leading-tight">
              ទាមទារវិញ្ញាបនបត្រ
            </h3>
            <p className="text-lg font-bold text-primary-color dark:text-white">
              {course.title}
            </p>
            <p className="text-lg text-primary-color dark:text-white opacity-80 leading-relaxed">
              បំពេញគ្រប់លក្ខខណ្ឌខាងក្រោមដើម្បីទទួលបានវិញ្ញាបនបត្រនេះ
            </p>
          </div>

          {/* Progress Status Bar */}
          <div className="w-full max-w-sm space-y-2 pt-1">
            <div className="flex justify-between items-center text-lg font-bold text-primary-color dark:text-white">
              <span className="opacity-80">វឌ្ឍនភាពសិក្សា</span>
              <span
                className={
                  unlocked ? "text-primary-color" : "text-secondary-color"
                }
              >
                {completedVideos} / {totalVideos} ({progressPercent}%)
              </span>
            </div>

            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
              <div
                className="h-full rounded-full transition-all duration-500 bg-linear-to-r from-primary-color to-blue-400"
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
                    ? "bg-init-color/10 border-init-color/40 text-slate-900 dark:text-white"
                    : "bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 opacity-60"
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                ) : (
                  <Circle className="h-6 w-6 text-slate-400 shrink-0" />
                )}
                <span
                  className={`text-lg font-bold ${item.completed ? "line-through opacity-80" : ""}`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="w-full max-w-sm pt-2 space-y-2">
            {alreadyIssued ? (
              <Button
                disabled
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-md transition-all duration-300 gap-2 flex items-center justify-center bg-green-600 text-white opacity-90 disabled:opacity-90 cursor-not-allowed"
              >
                <CheckCircle2 className="h-5 w-5" />
                <span>បានទទួលវិញ្ញាបនបត្រ</span>
              </Button>
            ) : (
              <Button
                onClick={handleIssue}
                disabled={!canIssue || isIssuing}
                className={`w-full h-14 rounded-2xl text-lg font-bold shadow-md transition-all duration-300 gap-2 flex items-center justify-center group ${
                  canIssue
                    ? "bg-primary-color hover:bg-blue-400 hover:text-slate-950 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700"
                }`}
              >
                {isIssuing ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span>
                    {canIssue
                      ? "ទាមទារវិញ្ញាបនបត្រឥឡូវនេះ"
                      : "មិនទាន់គ្រប់លក្ខខណ្ឌ"}
                  </span>
                )}
                {canIssue && !isIssuing && (
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            )}
            {issueError && (
              <p className="text-sm font-medium text-red-600">{issueError}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
