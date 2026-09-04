"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  Circle,
  Award,
  ArrowRight,
  Loader2,
  AlertTriangle,
  UserCog,
  GraduationCap,
} from "lucide-react";
import {
  useGetCourseBySlugQuery,
  useGetCourseProgressQuery,
} from "@/redux/api";
import {
  useGetAllMyCertificatesQuery,
  useIssueCourseCertificateMutation,
} from "@/redux/features/certificate/certificateApi";
import { useLazyGetProfileCompletenessQuery } from "@/redux/service/instructor-application-api";
import { missingFieldLabel } from "@/components/instructor-application/instructor-application-utils";
import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api/error";
import { CERTIFICATE_ISSUE_PERCENT } from "@/hooks/useCourseCompletionMap";
import { RequirementChecklistItem } from "@/types/certificate";

// Trimmed + case-folded so a stray space or capitalisation difference between
// the certificate's stored course title and the live course title doesn't make
// the already-claimed check miss.
const normalizeTitle = (value?: string) => value?.trim().toLowerCase() ?? "";

interface ClaimCertificateCardProps {
  /** Real course UUID — progress/certificate calls are still by id, not slug. */
  courseId: string;
  /** Course slug (backend GET /v1/courses/{slug}) — from enrollment.courseSlug. */
  slug: string;
}

export function ClaimCertificateCard({
  courseId,
  slug,
}: ClaimCertificateCardProps) {
  const { data: course, isFetching: isFetchingCourse } =
    useGetCourseBySlugQuery(slug);
  const { data: progress, isFetching: isFetchingProgress } =
    useGetCourseProgressQuery(courseId);
  // No per-course "get certificate" endpoint exists — issuing is POST-only — so
  // the already-claimed check scans the user's full certificate list (paged
  // through once by the query) and matches on a normalized course title, since
  // the certificate payload carries no courseId. Revoked certificates are
  // excluded: a revoked one must not keep the claim button disabled forever.
  const { data: allCertificates, isFetching: isFetchingCertificate } =
    useGetAllMyCertificatesQuery();
  const existingCertificate = course
    ? allCertificates?.find(
        (cert) =>
          !cert.revoked &&
          normalizeTitle(cert.courseTitle) === normalizeTitle(course.title),
      )
    : undefined;
  const [issueCertificate, { isLoading: isIssuing }] =
    useIssueCourseCertificateMutation();
  const [issueError, setIssueError] = useState<string | null>(null);
  // Flip the button to the disabled "already received" state the instant
  // issuance succeeds, instead of waiting on the certificate-existence
  // query to refetch (and without needing to navigate away to see it).
  const [justIssued, setJustIssued] = useState(false);

  const router = useRouter();
  // The certificate is printed from the user's profile, so the backend refuses
  // to issue one until the required profile fields are filled. Check on demand
  // (not on mount) so an untouched page fires no extra request.
  const [checkProfile, { isFetching: isCheckingProfile }] =
    useLazyGetProfileCompletenessQuery();
  // Which dialog (if any) the claim button opened:
  //   - "incomplete": profile is missing required fields; list them.
  //   - "confirm": profile is fine; ask before actually issuing.
  const [dialog, setDialog] = useState<
    | { type: "incomplete"; missingFields: string[] }
    | { type: "confirm" }
    | null
  >(null);

  if (
    (isFetchingCourse || isFetchingProgress || isFetchingCertificate) &&
    !course
  ) {
    return (
      <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-1 w-full bg-slate-100 dark:bg-slate-800" />
        <CardContent className="animate-pulse space-y-4 p-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 w-24 rounded bg-slate-100 dark:bg-slate-800" />
              <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
          <div className="space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 rounded-lg bg-slate-100 dark:bg-slate-800"
              />
            ))}
          </div>
          <div className="h-14 rounded-xl bg-slate-100 dark:bg-slate-800" />
        </CardContent>
      </Card>
    );
  }

  if (!course) return null;

  const totalVideos = progress?.totalVideos ?? 0;
  const completedVideos = Math.min(progress?.completedVideos ?? 0, totalVideos);
  // Raw percentage drives every eligibility decision; the rounded value is for
  // display only. Rounding 79.6% up to 80 would offer a claim the backend then
  // rejects.
  const progressRaw =
    progress?.percentage ??
    (totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0);
  const progressPercent = Math.round(progressRaw);
  const allVideosCompleted = totalVideos > 0 && completedVideos >= totalVideos;
  const canIssue = progressRaw >= CERTIFICATE_ISSUE_PERCENT;
  const alreadyIssued = justIssued || !!existingCertificate;
  const clampedPercent = Math.min(100, Math.max(0, progressPercent));

  // One state drives the whole card's accent: issued (emerald), ready to claim
  // (brand), or still locked (neutral).
  const accent = alreadyIssued
    ? {
        bar: "bg-emerald-500",
        icon: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900/60",
        badge:
          "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/60",
        fill: "bg-emerald-500",
        badgeLabel: "ទទួលបានហើយ",
      }
    : canIssue
      ? {
          bar: "bg-primary-color",
          icon: "bg-primary-color/10 text-primary-color ring-1 ring-primary-color/20",
          badge:
            "bg-primary-color/10 text-primary-color ring-1 ring-primary-color/20",
          fill: "bg-primary-color",
          badgeLabel: "អាចទាមទារបាន",
        }
      : {
          bar: "bg-slate-200 dark:bg-slate-700",
          icon: "bg-slate-100 text-slate-400 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700",
          badge:
            "bg-slate-100 text-slate-500 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700",
          fill: "bg-primary-color/70",
          badgeLabel: "កំពុងរៀន",
        };

  const items: RequirementChecklistItem[] = [
    { label: "ចាប់ផ្តើមសិក្សាមេរៀន", completed: completedVideos > 0 },
    { label: "សិក្សាបានលើសពី ៥០%", completed: progressRaw >= 50 },
    {
      label: "សិក្សាបានលើសពី ៨០%",
      completed: progressRaw >= CERTIFICATE_ISSUE_PERCENT,
    },
    { label: "បញ្ចប់វីដេអូទាំងអស់", completed: allVideosCompleted },
  ];

  // Step 1: the claim button. Verify the profile is complete, then either send
  // the user to fill the missing fields or ask them to confirm the claim.
  const handleIssue = async () => {
    if (!canIssue || isIssuing || isCheckingProfile) return;
    setIssueError(null);

    // Gate on profile completeness first so we can point the user at exactly
    // which fields to fill, instead of surfacing a raw rejection from the issue
    // call. If the check itself is unavailable, still ask for confirmation and
    // let the issue call be the source of truth.
    try {
      const completeness = await checkProfile().unwrap();
      if (!completeness.complete) {
        setDialog({
          type: "incomplete",
          missingFields: completeness.missingFields ?? [],
        });
        return;
      }
    } catch {
      // ignore — fall through to the confirmation dialog
    }

    setDialog({ type: "confirm" });
  };

  // Step 2: the confirmation dialog's confirm button. Actually issue.
  const confirmIssue = async () => {
    try {
      await issueCertificate(courseId).unwrap();
      setDialog(null);
      setJustIssued(true);
      toast.success("ទទួលបានវិញ្ញាបនបត្រដោយជោគជ័យ!");
    } catch (error) {
      setDialog(null);
      if (getApiErrorStatus(error) === 409) {
        setJustIssued(true);
        toast.info("អ្នកមានវិញ្ញាបនបត្រសម្រាប់វគ្គសិក្សានេះរួចហើយ");
        return;
      }
      console.error("Issue certificate error:", error);
      const message = getApiErrorMessage(
        error,
        "មិនអាចទាមទារវិញ្ញាបនបត្របានទេ សូមព្យាយាមម្ដងទៀត",
      );
      setIssueError(message);
      toast.error(message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
        {/* State accent strip */}
        <div className={`h-1 w-full ${accent.bar}`} />

        <CardContent className="space-y-4 p-5">
          {/* Header: icon · label + course title · state badge */}
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accent.icon}`}
            >
              {alreadyIssued ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Award className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black dark:text-white">
                ទាមទារវិញ្ញាបនបត្រ
              </p>
              <h3 className="mt-0.5 line-clamp-2 text-base font-bold leading-snug text-primary-color dark:text-white">
                {course.title}
              </h3>
            </div>

            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${accent.badge}`}
            >
              {accent.badgeLabel}
            </span>
          </div>

          {/* Progress */}
          <div>
            <div className="flex items-end justify-between gap-2">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                វឌ្ឍនភាពសិក្សា
              </span>
              <span className="flex items-baseline gap-1.5 font-semibold text-slate-600 dark:text-slate-300">
                <span className="text-sm">
                  {completedVideos}/{totalVideos} មេរៀន
                </span>
                <span className="text-base leading-none text-primary-color dark:text-white">
                  {progressPercent}%
                </span>
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${accent.fill}`}
                style={{ width: `${clampedPercent}%` }}
              />
            </div>
          </div>

          {/* Requirements */}
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100 dark:divide-slate-800 dark:border-slate-800">
            {items.map((item, i) => (
              <li
                key={i}
                className={`flex items-center gap-2.5 px-3 py-2 ${
                  item.completed ? "bg-emerald-50/40 dark:bg-emerald-950/15" : ""
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
                )}
                <span
                  className={`text-sm ${
                    item.completed
                      ? "font-medium text-slate-700 dark:text-slate-200"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Action */}
          <div className="space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            {alreadyIssued ? (
              <Button
                disabled
                className="flex h-14 min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4 text-[15px] font-semibold text-white shadow-sm opacity-100 disabled:cursor-default disabled:opacity-100"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                បានទទួលវិញ្ញាបនបត្រ
              </Button>
            ) : (
              <Button
                onClick={handleIssue}
                disabled={!canIssue || isIssuing || isCheckingProfile}
                className={`group flex h-14 min-h-14 w-full items-center justify-center gap-2 rounded-xl py-4 text-[15px] font-semibold transition active:scale-[0.99] ${
                  canIssue
                    ? "bg-primary-color text-white shadow-sm hover:bg-primary-color/90 hover:shadow-md"
                    : "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                }`}
              >
                {isIssuing || isCheckingProfile ? (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
                ) : (
                  <>
                    <span>
                      {canIssue
                        ? "ទាមទារវិញ្ញាបនបត្រឥឡូវនេះ"
                        : "មិនទាន់គ្រប់លក្ខខណ្ឌ"}
                    </span>
                    {canIssue && (
                      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </>
                )}
              </Button>
            )}
            {issueError && (
              <p className="text-xs font-medium text-red-600 dark:text-red-400">
                {issueError}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={dialog !== null}
        onOpenChange={(open) => {
          // Don't let the backdrop/Esc dismiss the confirm dialog mid-request.
          if (!open && !isIssuing) setDialog(null);
        }}
      >
        <DialogContent className="w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-2xl p-0 sm:max-w-xl">
          {dialog?.type === "incomplete" ? (
            <>
              {/* Profile is missing required fields — the backend would reject
                  issuance. Send the user to fill exactly what's listed. */}
              <div className="flex flex-col items-center px-8 pt-10 pb-6">
                <div className="relative mb-4">
                  <div className="absolute inset-0 -z-10 rounded-full bg-amber-400/20 blur-2xl" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900/60">
                    <AlertTriangle className="h-8 w-8" />
                  </div>
                </div>
                <DialogHeader className="w-full sm:text-center">
                  <DialogTitle className="text-center text-xl font-bold text-slate-900 dark:text-white">
                    សូមបំពេញព័ត៌មានប្រវត្តិរូបជាមុនសិន
                  </DialogTitle>
                  <DialogDescription className="mx-auto max-w-sm text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    វិញ្ញាបនបត្រត្រូវប្រើព័ត៌មានប្រវត្តិរូបរបស់អ្នក។ សូមបំពេញព័ត៌មានខាងក្រោម
                    រួចត្រឡប់មកទាមទារវិញ្ញាបនបត្រម្តងទៀត។
                  </DialogDescription>
                </DialogHeader>

                {dialog.missingFields.length > 0 && (
                  <ul className="mt-5 w-full divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100 dark:divide-slate-800 dark:border-slate-800">
                    {dialog.missingFields.map((field) => (
                      <li
                        key={field}
                        className="flex items-center gap-2.5 bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium text-slate-700 dark:bg-slate-800/30 dark:text-slate-200"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {missingFieldLabel(field)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <DialogFooter className="grid grid-cols-2 gap-3 border-t border-slate-100 bg-slate-50/50 px-8 py-5 dark:border-slate-800 dark:bg-slate-950/30">
                <Button
                  variant="outline"
                  onClick={() => setDialog(null)}
                  className="h-11 rounded-xl"
                >
                  បិទ
                </Button>
                <Button
                  onClick={() => router.push("/profile")}
                  className="h-11 rounded-xl bg-primary-color text-white hover:bg-primary-color/90"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  បំពេញប្រវត្តិរូប
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              {/* Profile is fine — just confirm before issuing. */}
              <div className="flex flex-col items-center px-8 pt-10 pb-6">
                <div className="relative mb-4">
                  <div className="absolute inset-0 -z-10 rounded-full bg-primary-color/20 blur-2xl" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-color/10 text-primary-color ring-1 ring-primary-color/20">
                    <Award className="h-8 w-8" />
                  </div>
                </div>
                <DialogHeader className="w-full sm:text-center">
                  <DialogTitle className="text-center text-xl font-bold text-slate-900 dark:text-white">
                    បញ្ជាក់ការទាមទារវិញ្ញាបនបត្រ
                  </DialogTitle>
                  <DialogDescription className="mx-auto max-w-sm text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    វិញ្ញាបនបត្រនឹងចេញដោយប្រើឈ្មោះក្នុងប្រវត្តិរូបរបស់អ្នក
                    ហើយមិនអាចកែប្រែក្រោយពេលចេញបានទេ។
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-5 flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-800/30">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-color/10 text-primary-color">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 dark:text-slate-500">
                      វគ្គសិក្សា
                    </p>
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="grid grid-cols-2 gap-3 border-t border-slate-100 bg-slate-50/50 px-8 py-5 dark:border-slate-800 dark:bg-slate-950/30">
                <Button
                  variant="outline"
                  disabled={isIssuing}
                  onClick={() => setDialog(null)}
                  className="h-11 rounded-xl"
                >
                  បោះបង់
                </Button>
                <Button
                  disabled={isIssuing}
                  onClick={confirmIssue}
                  className="h-11 rounded-xl bg-primary-color text-white hover:bg-primary-color/90"
                >
                  {isIssuing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  )}
                  បញ្ជាក់
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
