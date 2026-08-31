"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCw } from "lucide-react";

/**
 * Retry control for the `service_error` / `rate_limited` states.
 *
 * This used to be a `<Link>` pointing at the current URL, which is not a
 * reliable way to re-run a Server Component: navigating to the URL you are
 * already on can be a no-op or be served from the router cache. `router.refresh()`
 * re-fetches the RSC payload for the current route, which is what we actually
 * want here.
 */
export function RetryButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => router.refresh())}
      disabled={isPending}
      className="inline-flex h-12 items-center gap-2 rounded-xl border-2 border-slate-200 px-4 text-base font-bold text-primary-color transition-colors hover:bg-slate-100 disabled:opacity-60 dark:border-slate-800 dark:text-white dark:hover:bg-slate-800"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <RotateCw className="h-4 w-4" />
      )}
      ព្យាយាមម្តងទៀត
    </button>
  );
}
