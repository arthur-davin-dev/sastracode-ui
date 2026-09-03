"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InProgressCertificateCard } from "@/components/certificate/InProgressCertificateCard";
import { useCourseCompletionMap } from "@/hooks/useCourseCompletionMap";
import {
  LockKeyhole,
  AlertTriangle,
  Hourglass,
  CheckCircle2,
} from "lucide-react";
import type { EnrollmentResponse } from "@/types/api/course";

function EnrollmentList({
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
          <Hourglass className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500" />
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
    <div className="space-y-4">
      {enrollments.map((enrollment, i) => (
        <motion.div
          key={enrollment.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <InProgressCertificateCard
            courseId={enrollment.courseId}
            slug={enrollment.courseSlug ?? enrollment.courseId}
            completed={completed}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function InProgressCertificatesSection() {
  const {
    processingList,
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
        <CardTitle className="text-2xl font-semibold flex items-center gap-2 text-primary-color dark:text-white">
          <span className="h-7 w-7 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/40 flex items-center justify-center shrink-0">
            <Hourglass className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </span>
          វិញ្ញាបនបត្រកំពុងដំណើរការ
        </CardTitle>
      </CardHeader>
      <CardContent>
        {probes}

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
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-40 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse"
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
              <EnrollmentList
                enrollments={processingList}
                completed={false}
                emptyTitle="អ្នកមិនមានវគ្គសិក្សាកំពុងដំណើរការនៅពេលនេះទេ"
                emptyDescription="ចុះឈ្មោះវគ្គសិក្សាថ្មីមួយដើម្បីចាប់ផ្តើមតាមដានវឌ្ឍនភាព"
              />
            </TabsContent>
            <TabsContent value="completed" className="pt-4">
              <EnrollmentList
                enrollments={completedList}
                completed
                emptyTitle="អ្នកមិនទាន់មានវគ្គសិក្សាបានបញ្ចប់នៅឡើយទេ"
                emptyDescription="បន្តការសិក្សាដើម្បីបញ្ចប់វគ្គសិក្សារបស់អ្នក"
              />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
