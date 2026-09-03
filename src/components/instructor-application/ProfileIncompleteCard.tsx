"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, RefreshCw, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";

import { missingFieldLabel } from "@/components/instructor-application/instructor-application-utils";

interface ProfileIncompleteCardProps {
  missingFields: string[];
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export function ProfileIncompleteCard({
  missingFields,
  isRefreshing = false,
  onRefresh,
}: ProfileIncompleteCardProps) {
  const router = useRouter();

  return (
    <section className="overflow-hidden rounded-[28px] border border-amber-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.04)] dark:border-amber-900/40 dark:bg-slate-900">
      <div className="flex items-start gap-4 border-b border-amber-100 bg-amber-50/60 px-6 py-5 dark:border-amber-900/30 dark:bg-amber-500/5 sm:px-8">
        <span className="mt-0.5 rounded-xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-500/15">
          <AlertTriangle className="h-5 w-5" />
        </span>

        <div>
          <h2 className="text-xl font-bold text-primary-color dark:text-white">
            សូមបំពេញព័ត៌មានប្រវត្តិរូបជាមុនសិន
          </h2>

          <p className="mt-1 text-lg text-primary-color/2 dark:text-slate-400">
            លោកអ្នកត្រូវបំពេញព័ត៌មានប្រវត្តិរូបឲ្យបានពេញលេញ មុននឹងដាក់ពាក្យសុំធ្វើជាគ្រូបង្រៀន។
          </p>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        {missingFields.length > 0 && (
          <div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              ព័ត៌មានដែលនៅខ្វះ៖
            </p>

            <ul className="mt-3 space-y-2">
              {missingFields.map((field) => (
                <li
                  key={field}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-2.5 text-lg text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  {missingFieldLabel(field)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <p className="text-lg text-slate-500">
            បន្ទាប់ពីរក្សាទុកប្រវត្តិរូប សូមត្រឡប់មកទំព័រនេះវិញ។
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            {onRefresh && (
              <Button
                type="button"
                variant="outline"
                disabled={isRefreshing}
                onClick={onRefresh}
                className="h-11 rounded-xl px-5"
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                ខ្ញុំបានបំពេញរួចហើយ
              </Button>
            )}

            <Button
              type="button"
              onClick={() => router.push("/profile")}
              className="h-11 rounded-xl bg-primary-color px-6 text-white hover:bg-primary-color/90 dark:bg-primary-color/90 dark:hover:bg-primary-color"
            >
              <UserCog className="mr-2 h-4 w-4" />
              បំពេញប្រវត្តិរូប
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
