/**
 * The page is `force-dynamic` and the backend call has a 10s timeout, so on a
 * slow mobile connection the visitor would otherwise stare at a blank screen
 * right after scanning. This paints instantly instead.
 */
export default function VerifyLoading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="space-y-2">
        <div className="h-8 w-3/4 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        <div className="h-5 w-2/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="flex items-start gap-4 rounded-2xl border-2 border-slate-200 p-5 dark:border-slate-800">
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-1/2 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-5 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-100 p-5 dark:border-slate-800">
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="flex items-center justify-between gap-4">
            <div className="h-5 w-1/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-1/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>

      <span className="sr-only">កំពុងផ្ទៀងផ្ទាត់វិញ្ញាបនបត្រ...</span>
    </div>
  );
}
