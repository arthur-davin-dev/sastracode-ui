"use client";

import { useEffect } from "react";
import { RotateCw, ServerCrash } from "lucide-react";

/**
 * Last-resort boundary for an unexpected render-time throw. `verification.ts`
 * already converts every fetch outcome into a state, so reaching this means
 * something else broke — and the wording still has to read as a system fault,
 * not as a verdict on the certificate.
 */
export default function VerifyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[verify] unhandled error", error);
  }, [error]);

  return (
    <div className="space-y-6">
      <div
        role="alert"
        className="flex items-start gap-4 rounded-2xl border-2 border-amber-200 bg-amber-50 p-5 dark:border-amber-900 dark:bg-amber-950/40"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-400">
          <ServerCrash className="h-6 w-6" />
        </span>
        <div className="space-y-1">
          <p className="text-lg font-bold text-primary-color dark:text-white">
            មិនអាចផ្ទៀងផ្ទាត់បានឥឡូវនេះទេ
          </p>
          <p className="text-base leading-relaxed text-primary-color/80 dark:text-white/80">
            មានបញ្ហាបច្ចេកទេសកើតឡើង។
            នេះមិនមែនមានន័យថាវិញ្ញាបនបត្រនេះមិនត្រឹមត្រូវទេ។ សូមព្យាយាមម្តងទៀត។
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-slate-200 px-4 text-base font-bold text-primary-color transition-colors hover:bg-slate-100 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800"
      >
        <RotateCw className="h-4 w-4" />
        ព្យាយាមម្តងទៀត
      </button>
    </div>
  );
}
