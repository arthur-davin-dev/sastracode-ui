import { Card, CardContent } from "@/components/ui/card";

export function MyCourseCardSkeleton() {
  return (
    <Card className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Thumbnail */}
      <div className="relative h-48 w-full animate-pulse bg-slate-200 dark:bg-slate-800">
        <div className="absolute top-3 left-3 h-9 w-9 rounded-xl bg-slate-300/80 dark:bg-slate-700/80" />
        <div className="absolute top-3 right-3 h-7 w-20 rounded-full bg-slate-300/80 dark:bg-slate-700/80" />
      </div>

      <CardContent className="flex flex-1 flex-col justify-between gap-4 p-5">
        {/* Category tag & title */}
        <div className="space-y-2.5">
          <div className="h-5 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-1.5">
            <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3.5 w-8 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="h-2.5 w-full animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </CardContent>
    </Card>
  );
}
