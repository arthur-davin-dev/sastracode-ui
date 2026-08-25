"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InProgressCertificateCard } from "@/components/certificate/InProgressCertificateCard";
import { useGetMyEnrollmentsQuery } from "@/redux/api";
import { LockKeyhole, AlertTriangle, Hourglass } from "lucide-react";

export function InProgressCertificatesSection() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const {
    data: enrollments,
    isFetching,
    isError,
    refetch,
  } = useGetMyEnrollmentsQuery(
    { status: "ACTIVE", size: 50 },
    { skip: !isAuthenticated },
  );

  const courses = enrollments?.content ?? [];
  const isLoading = status === "loading" || (isAuthenticated && isFetching);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-primary-color dark:text-white">
          ⏳ វិញ្ញាបនបត្រកំពុងដំណើរការ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAuthenticated ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <LockKeyhole className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
            <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
              សូមចូលគណនីដើម្បីមើលវគ្គសិក្សាកំពុងដំណើរការរបស់អ្នក
            </p>
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 p-8 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-red-500" />
            <p className="mt-3 font-semibold text-red-700 dark:text-red-300">
              មិនអាចទាញយកវគ្គសិក្សាកំពុងដំណើរការបានទេ
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              ព្យាយាមម្ដងទៀត
            </button>
          </div>
        ) : !isLoading && courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center">
            <Hourglass className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
            <p className="mt-3 font-semibold text-slate-700 dark:text-slate-300">
              អ្នកមិនមានវគ្គសិក្សាកំពុងដំណើរការនៅពេលនេះទេ
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              ចុះឈ្មោះវគ្គសិក្សាថ្មីមួយដើម្បីចាប់ផ្តើមតាមដានវឌ្ឍនភាព
            </p>
          </div>
        ) : isLoading ? (
          [1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse"
            />
          ))
        ) : (
          courses.map((enrollment, i) => (
            <motion.div
              key={enrollment.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <InProgressCertificateCard courseId={enrollment.courseId} />
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
