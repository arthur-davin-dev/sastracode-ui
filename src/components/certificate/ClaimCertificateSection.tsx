"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClaimCertificateCard } from "@/components/certificate/ClaimCertificateCard";
import { useCourseCompletionMap } from "@/hooks/useCourseCompletionMap";
import {
  Award,
  GraduationCap,
  LockKeyhole,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import type { EnrollmentResponse } from "@/types/api/course";

function ClaimList({
  enrollments,
  completed,
  emptyTitle,
  emptyDescription,
}: {
  enrollments: EnrollmentResponse[];
  completed: boolean;
  emptyTitle: string;
  emptyDescription: string;
}) {
  if (enrollments.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
        {completed ? (
          <CheckCircle2 className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
        ) : (
          <Award className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
        )}
        <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
          {emptyTitle}
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {enrollments.map((enrollment, i) => (
        <motion.div
          key={enrollment.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <ClaimCertificateCard
            courseId={enrollment.courseId}
            slug={enrollment.courseSlug ?? enrollment.courseId}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function ClaimCertificateSection() {
  const {
    completedList,
    isAuthenticated,
    isLoading,
    isError,
    retry,
    probes,
  } = useCourseCompletionMap();

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-black dark:text-white">
          <span className="h-9 w-9 rounded-full bg-init-color/20 border border-init-color/50 flex items-center justify-center shrink-0">
            <GraduationCap className="h-5 w-5 text-secondary-color" />
          </span>
          ទាមទារវិញ្ញាបនបត្រ
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Invisible progress probes keep completion state accurate even when
            the enrollment status hasn't caught up with real watch progress. */}
        {probes}

        {!isAuthenticated ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <LockKeyhole className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
            <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
              សូមចូលគណនីដើម្បីតាមដានវឌ្ឍនភាព និងទាមទារវិញ្ញាបនបត្ររបស់អ្នក
            </p>
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-8 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-3 font-semibold text-red-700 dark:text-red-300">
              មិនអាចទាញយកវគ្គសិក្សាបានទេ
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              ព្យាយាមម្ដងទៀត
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ClaimList
            enrollments={completedList}
            completed
            emptyTitle="អ្នកមិនទាន់មានវគ្គសិក្សាបានបញ្ចប់នៅឡើយទេ"
            emptyDescription="បញ្ចប់វគ្គសិក្សាដើម្បីទាមទារវិញ្ញាបនបត្រ"
          />
        )}
      </CardContent>
    </Card>
  );
}
