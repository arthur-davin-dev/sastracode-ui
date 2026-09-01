"use client";

import {
  Bot,
  Check,
  Lightbulb,
  LockKeyhole,
  Sparkles,
  WandSparkles,
  Wrench,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  useExplainCodeMutation,
  useFixCodeMutation,
  useGetCodeHintMutation,
  useGetHintStatusQuery,
  useImproveCodeMutation,
  type AiHintResponse,
} from "@/types/playgroundApi";
import { getApiErrorMessage } from "@/lib/api/error";

type HelpMode = "hint" | "explain" | "improve" | "fix";

type CoachResult = {
  kind: HelpMode;
  title: string;
  text: string;
  code?: string;
};

interface CodeCoachProps {
  code: string;
  language: string;
  codingTaskId?: string;
  compact?: boolean;
  onApplyCode?: (code: string) => void;
}

function getRequestError(error: unknown) {
  console.error("AI Coach request failed:", error);

  return getApiErrorMessage(error, "Unable to get AI help.");
}


function getErrorStatus(
  error: unknown,
): number | string | undefined {
  if (
    error &&
    typeof error === "object" &&
    "status" in error
  ) {
    return (
      error as {
        status?: number | string;
      }
    ).status;
  }

  return undefined;
}

function isUnauthorized(
  error: unknown,
): boolean {
  const status = getErrorStatus(error);

  return status === 401 || status === "401";
}

function clampHintLevel(value: number) {
  return Math.min(5, Math.max(1, value));
}

export default function CodeCoach({
  code,
  language,
  codingTaskId,
  compact = false,
  onApplyCode,
}: CodeCoachProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [result, setResult] = useState<CoachResult | null>(null);
  const [error, setError] = useState("");
  const [hintState, setHintState] = useState<AiHintResponse | null>(null);
  const [applied, setApplied] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [explainCode, { isLoading: isExplaining }] = useExplainCodeMutation();
  const [improveCode, { isLoading: isImproving }] = useImproveCodeMutation();
  const [getCodeHint, { isLoading: isHinting }] = useGetCodeHintMutation();
  const [fixCode, { isLoading: isFixing }] = useFixCodeMutation();

  const loading =
    isExplaining ||
    isImproving ||
    isHinting ||
    isFixing ||
    redirecting;

  const hasTask = Boolean(codingTaskId);

  const {
    data: hintStatus,
    refetch: refetchHintStatus,
  } = useGetHintStatusQuery(
    codingTaskId ?? "",
    {
      skip: !codingTaskId,
    },
  );

  useEffect(() => {
    setResult(null);
    setError("");
    setHintState(null);
    setApplied(false);
    setRedirecting(false);
  }, [codingTaskId]);

  const fixUnlocked =
    hintState?.fixUnlocked === true ||
    hintStatus?.fixUnlocked === true;

  const nextHintLevel = useMemo(() => {
    if (
      typeof hintState?.hintLevel ===
      "number"
    ) {
      return clampHintLevel(
        hintState.hintLevel + 1,
      );
    }

    if (
      typeof hintStatus?.nextHintLevel ===
      "number"
    ) {
      return clampHintLevel(
        hintStatus.nextHintLevel,
      );
    }

    if (
      typeof hintStatus?.hintsUsed ===
      "number"
    ) {
      return clampHintLevel(
        hintStatus.hintsUsed + 1,
      );
    }

    return 1;
  }, [hintState, hintStatus]);

  async function redirectToKeycloak() {
    if (redirecting) {
      return;
    }

    setRedirecting(true);
    setError("");

    const query = searchParams.toString();

    const returnUrl = query
      ? `${pathname}?${query}`
      : pathname;

    try {
      /*
       * This skips your local /login page and opens the
       * Keycloak login form directly.
       *
       * After successful login, Auth.js returns the user
       * to the same Playground / Coding Task page.
       */
      await signIn("keycloak", {
        redirectTo: returnUrl || "/",
      });
    } catch (signInError) {
      console.error(
        "Failed to start Keycloak login:",
        signInError,
      );

      setRedirecting(false);
      setError(
        "Unable to open the login form. Please try again.",
      );
    }
  }

  async function askCoach(mode: HelpMode) {
    if (!code.trim()) {
      setError("Write some code first, then ask the AI coach for help.");
      return;
    }

    if ((mode === "hint" || mode === "fix") && !codingTaskId) {
      setError(
        "Hints and Fix Code need a coding task. Open this editor from a coding challenge so a codingTaskId is available.",
      );
      return;
    }

    if (mode === "fix" && !fixUnlocked) {
      setError("Fix Code unlocks after the required progressive hints.");
      return;
    }

    setError("");
    setApplied(false);

    try {
      if (mode === "hint") {
        const response = await getCodeHint({
          codingTaskId: codingTaskId!,
          currentCode: code,
          hintLevel: nextHintLevel,
        }).unwrap();

        if (!response.hint?.trim()) {
          throw new Error("The AI coach returned no hint.");
        }

        setHintState(response);

        setResult({
          kind: "hint",
          title: `Hint ${response.hintLevel ?? nextHintLevel}`,
          text: response.hint.trim(),
        });

        void refetchHintStatus();

        return;
      }

      if (mode === "explain") {
        const response = await explainCode({
          code,
          language,
          scope: "ALGORITHM",
        }).unwrap();

        if (!response.explanation?.trim()) {
          throw new Error("The AI coach returned no explanation.");
        }

        setResult({
          kind: "explain",
          title: "Code explanation",
          text: response.explanation.trim(),
        });
        return;
      }

      if (mode === "improve") {
        const response = await improveCode({ code, language }).unwrap();
        const message = [
          response.summary,
          Array.isArray(response.suggestions) && response.suggestions.length > 0
            ? response.suggestions.map((item) => `• ${item}`).join("\n")
            : "",
        ]
          .filter(Boolean)
          .join("\n\n");

        if (!message.trim() && !response.improvedCode?.trim()) {
          throw new Error("The AI coach returned no improvement.");
        }

        setResult({
          kind: "improve",
          title: "Improvement suggestions",
          text:
            message.trim() || "I prepared an improved version of your code.",
          code: response.improvedCode?.trim() || undefined,
        });
        return;
      }

      const response = await fixCode({
        codingTaskId: codingTaskId!,
        currentCode: code,
      }).unwrap();

      if (!response.explanation?.trim() && !response.fixedCode?.trim()) {
        throw new Error("The AI coach returned no fix.");
      }

      setResult({
        kind: "fix",
        title: "Fixed code",
        text:
          response.explanation?.trim() ||
          "The AI coach generated a corrected version of your code.",
        code: response.fixedCode?.trim() || undefined,
      });

      void refetchHintStatus();
    } catch (requestError) {
      if (isUnauthorized(requestError)) {
        await redirectToKeycloak();
        return;
      }

      setError(getRequestError(requestError));
    }
  }

  function applyGeneratedCode() {
    if (!result?.code || !onApplyCode) return;

    onApplyCode(result.code);
    setApplied(true);
  }

  const remainingHints =
    hintState?.hintsRemainingUntilFixUnlocked ??
    hintStatus?.hintsRemaining;

  const hintsUsed =
    hintState?.hintsUsed ??
    hintStatus?.hintsUsed ??
    0;

  const hasHintProgress =
    hintsUsed > 0 ||
    Boolean(hintState) ||
    Boolean(hintStatus);

  return (
    <section
      className={
        compact
          ? "overflow-hidden rounded-xl bg-white dark:bg-[#0b1020]"
          : "rounded-3xl border border-violet-200/70 bg-linear-to-br from-violet-50 via-white to-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-violet-900/50 dark:from-violet-950/30 dark:via-slate-950 dark:to-slate-950 sm:p-5"
      }
    >
      {!compact && (
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-600/30">
            <Bot className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold tracking-tight text-violet-950 dark:text-violet-100">
              Sastra AI Coach
            </h2>
            <p className="mt-0.5 text-xs leading-5 text-violet-800/70 dark:text-violet-200/70">
              Start with a hint, understand your code, or ask for safer
              improvements.
            </p>
          </div>
        </div>
      )}

      {compact && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-violet-50 px-3 py-2 text-xs text-violet-800 dark:bg-violet-500/10 dark:text-violet-200">
          <Sparkles className="h-4 w-4 shrink-0" />
          Get help without leaving your coding workspace.
        </div>
      )}

      <div className={`${compact ? "" : "mt-4"} grid grid-cols-2 gap-2.5`}>
        {hasTask && (
          <button
            type="button"
            onClick={() => askCoach("hint")}
            disabled={loading || (fixUnlocked && nextHintLevel >= 5)}
            title="Get the next progressive hint"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-2.5 py-2 text-xs font-semibold text-amber-800 shadow-xs transition hover:-translate-y-0.5 hover:bg-amber-100 hover:shadow-sm disabled:pointer-events-none disabled:opacity-50 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
          >
            <Lightbulb className="h-4 w-4" />
            {hasHintProgress ? `Next Hint (${nextHintLevel}/5)` : "Get Hint"}
          </button>
        )}

        <button
          type="button"
          onClick={() => askCoach("explain")}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-white px-2.5 py-2 text-xs font-semibold text-violet-700 shadow-xs transition hover:-translate-y-0.5 hover:bg-violet-100 hover:shadow-sm disabled:pointer-events-none disabled:opacity-60 dark:border-violet-800 dark:bg-slate-950 dark:text-violet-300"
        >
          <Sparkles className="h-4 w-4" />
          Explain
        </button>

        <button
          type="button"
          onClick={() => askCoach("improve")}
          disabled={loading}
          className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-2.5 py-2 text-xs font-semibold text-sky-700 shadow-xs transition hover:-translate-y-0.5 hover:bg-sky-100 hover:shadow-sm disabled:pointer-events-none disabled:opacity-60 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300"
        >
          <Wrench className="h-4 w-4" />
          Improve
        </button>

        {hasTask && (
          <button
            type="button"
            onClick={() => askCoach("fix")}
            disabled={loading || !fixUnlocked}
            title={
              fixUnlocked
                ? "Generate the fixed code"
                : "Fix Code unlocks after the progressive hints"
            }
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-violet-600 px-2.5 py-2 text-xs font-semibold text-white shadow-sm shadow-violet-600/30 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-md disabled:pointer-events-none disabled:translate-y-0 disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
          >
            {fixUnlocked ? (
              <WandSparkles className="h-4 w-4" />
            ) : (
              <LockKeyhole className="h-4 w-4" />
            )}
            Fix Code
          </button>
        )}
      </div>

      {hasTask && (
        <div className="mt-3 rounded-2xl border border-slate-200 bg-white/80 px-3.5 py-3 dark:border-white/10 dark:bg-white/3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              Progressive hints
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-400">
              {hintsUsed}/5 used
            </span>
          </div>
          <div className="mt-2.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <span
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  step <= hintsUsed
                    ? "bg-amber-500"
                    : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
            ))}
          </div>
          <p className="mt-2.5 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            {fixUnlocked
              ? "Fix Code is unlocked."
              : typeof remainingHints === "number"
                ? `${remainingHints} hint${remainingHints === 1 ? "" : "s"} remaining until Fix Code unlocks.`
                : "Use progressive hints first. Fix Code unlocks when the backend allows it."}
          </p>
        </div>
      )}

      {!hasTask && (
        <p className="mt-7 rounded-2xl bg-slate-50 px-3.5 py-2.5 text-[10px] leading-4 text-slate-500 dark:bg-white/3 dark:text-slate-400">
          Explain and Improve work in the Playground. Hint and Fix Code are
          only available from a coding challenge.
        </p>
      )}

      {redirecting && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-xs font-medium text-violet-700 dark:bg-violet-950/30 dark:text-violet-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
          Opening Keycloak login...
        </div>
      )}

      {loading && !redirecting && (
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-violet-600 dark:text-violet-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
          AI coach is thinking...
        </div>
      )}

      {error && !redirecting && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2 dark:border-white/10">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {result.title}
            </span>
            {result.kind === "hint" && fixUnlocked && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                Fix unlocked
              </span>
            )}
          </div>

          <div className="max-h-72 overflow-auto p-3">
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-200">
              {result.text}
            </p>

            {result.code && (
              <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-[#0d1117] dark:border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Generated code
                  </span>
                  {onApplyCode && (
                    <button
                      type="button"
                      onClick={applyGeneratedCode}
                      className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-white/15"
                    >
                      {applied ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <WandSparkles className="h-3.5 w-3.5" />
                      )}
                      {applied ? "Applied" : "Apply to editor"}
                    </button>
                  )}
                </div>
                <pre className="max-h-56 overflow-auto whitespace-pre p-3 font-mono text-xs leading-5 text-slate-100">
                  <code>{result.code}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}