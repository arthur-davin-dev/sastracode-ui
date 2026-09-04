"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";
import { Check, CircleAlert, Info } from "lucide-react";

// Toast styling copied from the /playground/editor status pill so the
// course pages share the same look: a rounded, blurred card that sits in
// the top-right corner (position is owned by the global <Toaster />).

type PlaygroundToastVariant = "success" | "error" | "info";

interface PlaygroundToastOptions {
  description?: ReactNode;
}

const variantClassName: Record<PlaygroundToastVariant, string> = {
  success:
    "border-emerald-200 bg-white/95 text-emerald-700 dark:border-emerald-700/60 dark:bg-slate-900/95 dark:text-emerald-400",
  error:
    "border-red-200 bg-white/95 text-red-700 dark:border-red-800 dark:bg-slate-900/95 dark:text-red-400",
  info:
    "border-sky-200 bg-white/95 text-sky-700 dark:border-sky-800 dark:bg-slate-900/95 dark:text-sky-400",
};

const variantIcon: Record<PlaygroundToastVariant, ReactNode> = {
  success: <Check className="h-5 w-5 shrink-0" />,
  error: <CircleAlert className="h-5 w-5 shrink-0" />,
  info: <Info className="h-5 w-5 shrink-0" />,
};

function showPlaygroundToast(
  variant: PlaygroundToastVariant,
  message: ReactNode,
  options?: PlaygroundToastOptions,
) {
  return toast.custom(() => (
    <div
      role="status"
      aria-live="polite"
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-sm transition-all ${variantClassName[variant]}`}
    >
      {variantIcon[variant]}
      <span className="flex flex-col">
        <span>{message}</span>
        {options?.description ? (
          <span className="text-xs font-medium opacity-80">
            {options.description}
          </span>
        ) : null}
      </span>
    </div>
  ));
}

export const playgroundToast = {
  success: (message: ReactNode, options?: PlaygroundToastOptions) =>
    showPlaygroundToast("success", message, options),
  error: (message: ReactNode, options?: PlaygroundToastOptions) =>
    showPlaygroundToast("error", message, options),
  info: (message: ReactNode, options?: PlaygroundToastOptions) =>
    showPlaygroundToast("info", message, options),
};
