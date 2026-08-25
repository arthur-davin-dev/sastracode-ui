"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock } from "lucide-react";
import { CertificateRequirement } from "@/types/certificate";

export function RequirementCard({
  requirement,
}: {
  requirement: CertificateRequirement;
}) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group">
      {/* Top Accent Line (Red Secondary & Yellow Accent) */}
      <div className="absolute top-0 left-0 w-full h-2 " />

      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6">
        {/* Icon Container */}
        <div className="h-14 w-14 rounded-lg bg-init-color/20 border border-yellow-400/50 flex items-center justify-center shrink-0 shadow-xs">
          <Lock className="h-7 w-7 text-secondary-color" />
        </div>

        {/* Details & Progress Content */}
        <div className="flex-1 w-full space-y-2">
          {/* Requirement Title (text-lg & text-primary-color) */}
          <h3 className="text-lg font-bold text-primary-color dark:text-white">
            {requirement.title}
          </h3>

          {/* Progress Percent Label (text-lg & text-primary-color) */}
          <div className="flex items-center justify-between text-lg font-medium text-slate-700 dark:text-slate-300 pt-1">
            <span>បញ្ចប់ចំណេះដឹងមូលដ្ឋាន</span>
            <span className="font-bold text-secondary-color">
              {requirement.progressPercent}%
            </span>
          </div>

          {/* Modern Progress Bar (Gradient Fill from Yellow Accent to Red Secondary) */}
          <Progress
            value={requirement.progressPercent}
            className="h-2.5 bg-slate-100 dark:bg-slate-800 [&>div]:bg-linear-to-r [&>div]:from-primary-color [&>div]:to-blue-400 rounded-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}
