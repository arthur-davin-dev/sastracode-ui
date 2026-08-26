"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClaimCertificateCard } from "@/components/certificate/ClaimCertificateCard";
import { CourseCompletionProbe } from "@/components/certificate/CourseCompletionProbe";
import { useGetMyEnrollmentsQuery } from "@/redux/api";
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
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {enrollments.map((enrollment, i) => (
        <motion.div
          key={enrollment.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <ClaimCertificateCard courseId={enrollment.courseId} />
        </motion.div>
      ))}
    </div>
  );
}

export function ClaimCertificateSection() {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const activeQuery = useGetMyEnrollmentsQuery(
    { status: "ACTIVE", size: 50 },
    { skip: !isAuthenticated },
  );
  const completedQuery = useGetMyEnrollmentsQuery(
    { status: "COMPLETED", size: 50 },
    { skip: !isAuthenticated },
  );

  const [completionMap, setCompletionMap] = useState<Record<string, boolean>>(
    {},
  );
  const handleResolved = useCallback((courseId: string, completed: boolean) => {
    setCompletionMap((prev) =>
      prev[courseId] === completed ? prev : { ...prev, [courseId]: completed },
    );
  }, []);

  const allEnrollments = useMemo(() => {
    const merged = [
      ...(activeQuery.data?.content ?? []),
      ...(completedQuery.data?.content ?? []),
    ];
    return Array.from(new Map(merged.map((e) => [e.id, e])).values());
  }, [activeQuery.data, completedQuery.data]);

  const isCourseCompleted = useCallback(
    (enrollment: EnrollmentResponse) =>
      completionMap[enrollment.courseId] ?? enrollment.status === "COMPLETED",
    [completionMap],
  );

  const processingList = allEnrollments.filter((e) => !isCourseCompleted(e));
  const completedList = allEnrollments.filter(isCourseCompleted);

  const isLoading =
    status === "loading" ||
    (isAuthenticated && (activeQuery.isFetching || completedQuery.isFetching));
  const isError = activeQuery.isError || completedQuery.isError;

  const handleRetry = () => {
    activeQuery.refetch();
    completedQuery.refetch();
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-primary-color dark:text-white">
          <span className="h-7 w-7 rounded-full bg-init-color/20 border border-init-color/50 flex items-center justify-center shrink-0">
            <GraduationCap className="h-4 w-4 text-secondary-color" />
          </span>
          ទាមទារវិញ្ញាបនបត្រ
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Invisible progress probes keep tab placement accurate even when
            the enrollment status hasn't caught up with 100% watch progress. */}
        {allEnrollments.map((enrollment) => (
          <CourseCompletionProbe
            key={enrollment.id}
            courseId={enrollment.courseId}
            onResolved={handleResolved}
          />
        ))}

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
              onClick={handleRetry}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              ព្យាយាមម្ដងទៀត
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <Tabs defaultValue="processing">
            <TabsList>
              <TabsTrigger value="processing">កំពុងសិក្សា</TabsTrigger>
              <TabsTrigger value="completed">បានបញ្ចប់</TabsTrigger>
            </TabsList>
            <TabsContent value="processing" className="pt-4">
              <ClaimList
                enrollments={processingList}
                completed={false}
                emptyTitle="អ្នកមិនមានវគ្គសិក្សាកំពុងសិក្សានៅពេលនេះទេ"
                emptyDescription="ចុះឈ្មោះវគ្គសិក្សាថ្មីមួយដើម្បីចាប់ផ្តើមតាមដានវឌ្ឍនភាព"
              />
            </TabsContent>
            <TabsContent value="completed" className="pt-4">
              <ClaimList
                enrollments={completedList}
                completed
                emptyTitle="អ្នកមិនទាន់មានវគ្គសិក្សាបានបញ្ចប់នៅឡើយទេ"
                emptyDescription="បញ្ចប់វគ្គសិក្សាដើម្បីទាមទារវិញ្ញាបនបត្រ"
              />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
