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
  const unlocked = alreadyIssued || canIssue;

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
      <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-300">
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

          {/* Claiming opens at 80%, so the last checklist item can still be
              unchecked when the button is enabled — say so plainly. */}
          <p className="w-full max-w-sm text-left text-sm font-medium text-primary-color/70 dark:text-white/60">
            អ្នកអាចទាមទារវិញ្ញាបនបត្របាន នៅពេលវឌ្ឍនភាពសិក្សាឈានដល់ ៨០% ឡើងទៅ។
          </p>

          {/* Action Button */}
          <div className="w-full max-w-sm pt-2 space-y-2">
            {alreadyIssued ? (
              <Button
                disabled
                className="w-full min-h-14 rounded-2xl px-4 py-2 text-base sm:text-lg font-bold shadow-md transition-all duration-300 gap-2 flex items-center justify-center whitespace-normal leading-tight text-center bg-green-600 text-white opacity-90 disabled:opacity-90 cursor-not-allowed"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>បានទទួលវិញ្ញាបនបត្រ</span>
              </Button>
            ) : (
              <Button
                onClick={handleIssue}
                disabled={!canIssue || isIssuing || isCheckingProfile}
                className={`w-full min-h-14 rounded-2xl px-4 py-2 text-base sm:text-lg font-bold shadow-md transition-all duration-300 gap-2 flex items-center justify-center whitespace-normal leading-tight text-center group ${
                  canIssue
                    ? "bg-primary-color hover:bg-blue-400 hover:text-slate-950 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed border border-slate-300 dark:border-slate-700"
                }`}
              >
                {isIssuing || isCheckingProfile ? (
                  <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                ) : (
                  <span>
                    {canIssue
                      ? "ទាមទារវិញ្ញាបនបត្រឥឡូវនេះ"
                      : "មិនទាន់គ្រប់លក្ខខណ្ឌ"}
                  </span>
                )}
                {canIssue && !isIssuing && !isCheckingProfile && (
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            )}
            {issueError && (
              <p className="text-sm font-medium text-red-600">{issueError}</p>
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
        <DialogContent className="sm:max-w-md">
          {dialog?.type === "incomplete" ? (
            <>
              {/* Profile is missing required fields — the backend would reject
                  issuance. Send the user to fill exactly what's listed. */}
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-primary-color dark:text-white">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                  សូមបំពេញព័ត៌មានប្រវត្តិរូបជាមុនសិន
                </DialogTitle>
                <DialogDescription className="text-primary-color/70 dark:text-white/60">
                  វិញ្ញាបនបត្រត្រូវប្រើព័ត៌មានប្រវត្តិរូបរបស់អ្នក។ សូមបំពេញព័ត៌មានខាងក្រោម
                  រួចត្រឡប់មកទាមទារវិញ្ញាបនបត្រម្តងទៀត។
                </DialogDescription>
              </DialogHeader>

              {dialog.missingFields.length > 0 && (
                <ul className="space-y-2">
                  {dialog.missingFields.map((field) => (
                    <li
                      key={field}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-2.5 text-sm font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      {missingFieldLabel(field)}
                    </li>
                  ))}
                </ul>
              )}

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialog(null)}
                  className="rounded-xl"
                >
                  បិទ
                </Button>
                <Button
                  onClick={() => router.push("/profile")}
                  className="rounded-xl bg-primary-color text-white hover:bg-primary-color/90"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  បំពេញប្រវត្តិរូប
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              {/* Profile is fine — just confirm before issuing. */}
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-primary-color dark:text-white">
                  <Award className="h-5 w-5 shrink-0 text-secondary-color" />
                  បញ្ជាក់ការទាមទារវិញ្ញាបនបត្រ
                </DialogTitle>
                <DialogDescription className="text-primary-color/70 dark:text-white/60">
                  តើអ្នកប្រាកដទេថាចង់ទាមទារវិញ្ញាបនបត្រសម្រាប់វគ្គសិក្សា «{course.title}»?
                  វិញ្ញាបនបត្រនឹងចេញដោយប្រើឈ្មោះក្នុងប្រវត្តិរូបរបស់អ្នក។
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  variant="outline"
                  disabled={isIssuing}
                  onClick={() => setDialog(null)}
                  className="rounded-xl"
                >
                  បោះបង់
                </Button>
                <Button
                  disabled={isIssuing}
                  onClick={confirmIssue}
                  className="rounded-xl bg-primary-color text-white hover:bg-primary-color/90"
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
