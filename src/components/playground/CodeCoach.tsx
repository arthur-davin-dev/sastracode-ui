// "use client";

// import { Lightbulb, Sparkles, Wrench } from "lucide-react";
// import { useState } from "react";

// type HelpMode = "explain" | "improve";

// interface CodeCoachProps {
//   code: string;
//   language: string;
// }

// export default function CodeCoach({ code, language }: CodeCoachProps) {
//   const [answer, setAnswer] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function askCoach(mode: HelpMode) {
//     if (!code.trim()) {
//       setError("Write some code first, then ask the AI tutor for help.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     try {
//     const response = await fetch(
//       mode === "improve" ? "/api/backend/v1/ai/improve" : "/api/backend/v1/ai/explain",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "same-origin",
//         body: JSON.stringify(
//           mode === "improve"
//             ? { code, language }
//             : { code, language, scope: "ALGORITHM" },
//         ),
//       },
//     );
//       const result: unknown = await response.json();
//       if (!result || typeof result !== "object") {
//         throw new Error("The AI tutor returned an invalid response.");
//       }
//       const responseBody = result as {
//         success?: unknown;
//         message?: unknown;
//         data?: {
//           explanation?: unknown;
//           summary?: unknown;
//           suggestions?: unknown;
//           improvedCode?: unknown;
//         };
//       };
//       if (!response.ok) {
//         throw new Error(
//           typeof responseBody.message === "string"
//             ? responseBody.message
//             : "Unable to get AI help.",
//         );
//       }
//       if (responseBody.success !== true || !responseBody.data) {
//         throw new Error(
//           typeof (result as { message?: unknown }).message === "string"
//             ? (result as { message: string }).message
//             : "Unable to get AI help.",
//         );
//       }
//       const message =
//         mode === "explain"
//           ? responseBody.data.explanation
//           : [
//               responseBody.data.summary,
//               Array.isArray(responseBody.data.suggestions)
//                 ? responseBody.data.suggestions.map((item) => `• ${String(item)}`).join("\n")
//                 : "",
//               typeof responseBody.data.improvedCode === "string"
//                 ? `\nImproved code:\n\`\`\`${language}\n${responseBody.data.improvedCode}\n\`\`\``
//                 : "",
//             ]
//               .filter(Boolean)
//               .join("\n\n");
//       if (typeof message !== "string" || !message.trim()) {
//         throw new Error("The AI tutor returned no answer.");
//       }
//       setAnswer(message);
//     } catch (requestError) {
//       setError(requestError instanceof Error ? requestError.message : "Unable to get AI help.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <section className="rounded-xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900/70 dark:bg-violet-950/20">
//       <div className="flex items-start gap-3">
//         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
//           <Sparkles className="h-4 w-4" />
//         </div>
//         <div className="min-w-0 flex-1">
//           <h2 className="text-sm font-bold text-violet-950 dark:text-violet-100">AI code tutor</h2>
//           <p className="mt-0.5 text-xs leading-5 text-violet-800/80 dark:text-violet-200/80">
//           Powered by your Sastra Code Gemini service. Explain the current code or get safer improvement suggestions.
//           </p>
//         </div>
//       </div>

//       <div className="mt-3 flex flex-wrap gap-2">
//         <button type="button" onClick={() => askCoach("explain")} disabled={loading} className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-violet-800 dark:bg-slate-950 dark:text-violet-300">
//           <Lightbulb className="h-4 w-4" /> Explain code
//         </button>
//         <button type="button" onClick={() => askCoach("improve")} disabled={loading} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60">
//           <Wrench className="h-4 w-4" /> {loading ? "Thinking…" : "Improve code"}
//         </button>
//       </div>

//       {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
//       {answer && <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-violet-100 bg-white p-3 font-sans text-sm leading-6 text-slate-700 dark:border-violet-900/60 dark:bg-slate-950 dark:text-slate-200">{answer}</pre>}
//     </section>
//   );
// }

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
import { useMemo, useState } from "react";

import {
  useExplainCodeMutation,
  useFixCodeMutation,
  useGetCodeHintMutation,
  useImproveCodeMutation,
  type AiHintResponse,
} from "@/types/playgroundApi";

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
  if (typeof error === "object" && error !== null && "data" in error) {
    const apiError = error as {
      data?: {
        message?: unknown;
      };
    };

    if (typeof apiError.data?.message === "string") {
      return apiError.data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to get AI help.";
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
  const [result, setResult] = useState<CoachResult | null>(null);
  const [error, setError] = useState("");
  const [hintState, setHintState] = useState<AiHintResponse | null>(null);
  const [applied, setApplied] = useState(false);

  const [explainCode, { isLoading: isExplaining }] = useExplainCodeMutation();
  const [improveCode, { isLoading: isImproving }] = useImproveCodeMutation();
  const [getCodeHint, { isLoading: isHinting }] = useGetCodeHintMutation();
  const [fixCode, { isLoading: isFixing }] = useFixCodeMutation();

  const loading = isExplaining || isImproving || isHinting || isFixing;
  const hasTask = Boolean(codingTaskId);
  const fixUnlocked = hintState?.fixUnlocked === true;

  const nextHintLevel = useMemo(() => {
    if (!hintState) return 1;

    const previousLevel = hintState.hintLevel ?? hintState.hintsUsed ?? 0;
    return clampHintLevel(previousLevel + 1);
  }, [hintState]);

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
    } catch (requestError) {
      setError(getRequestError(requestError));
    }
  }

  function applyGeneratedCode() {
    if (!result?.code || !onApplyCode) return;

    onApplyCode(result.code);
    setApplied(true);
  }

  const remainingHints = hintState?.hintsRemainingUntilFixUnlocked;
  const hintsUsed = hintState?.hintsUsed ?? 0;

  return (
    <section
      className={
        compact
          ? "overflow-hidden rounded-xl bg-white dark:bg-[#0b1020]"
          : "rounded-xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900/70 dark:bg-violet-950/20"
      }
    >
      {!compact && (
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
            <Bot className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-violet-950 dark:text-violet-100">
              Sastra AI Coach
            </h2>
            <p className="mt-0.5 text-xs leading-5 text-violet-800/80 dark:text-violet-200/80">
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

      <div className={`${compact ? "" : "mt-3"} grid grid-cols-2 gap-2`}>
        <button
          type="button"
          onClick={() => askCoach("hint")}
          disabled={loading || !hasTask || (fixUnlocked && nextHintLevel >= 5)}
          title={
            hasTask
              ? "Get the next progressive hint"
              : "Open from a coding task to use progressive hints"
          }
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300"
        >
          {hasTask ? (
            <Lightbulb className="h-4 w-4" />
          ) : (
            <LockKeyhole className="h-4 w-4" />
          )}
          {hintState ? `Next Hint (${nextHintLevel}/5)` : "Get Hint"}
        </button>

        <button
          type="button"
          onClick={() => askCoach("explain")}
          disabled={loading}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-violet-200 bg-white px-2.5 py-2 text-xs font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-violet-800 dark:bg-slate-950 dark:text-violet-300"
        >
          <Sparkles className="h-4 w-4" />
          Explain
        </button>

        <button
          type="button"
          onClick={() => askCoach("improve")}
          disabled={loading}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-2.5 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300"
        >
          <Wrench className="h-4 w-4" />
          Improve
        </button>

        <button
          type="button"
          onClick={() => askCoach("fix")}
          disabled={loading || !hasTask || !fixUnlocked}
          title={
            !hasTask
              ? "Open from a coding task to use Fix Code"
              : fixUnlocked
                ? "Generate the fixed code"
                : "Fix Code unlocks after the progressive hints"
          }
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
        >
          {fixUnlocked ? (
            <WandSparkles className="h-4 w-4" />
          ) : (
            <LockKeyhole className="h-4 w-4" />
          )}
          Fix Code
        </button>
      </div>

      {hasTask && (
        <div className="mt-3 rounded-lg border border-slate-200 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              Progressive hints
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {hintsUsed}/5 used
            </span>
          </div>
          <div className="mt-2 flex gap-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <span
                key={step}
                className={`h-1.5 flex-1 rounded-full ${
                  step <= hintsUsed
                    ? "bg-amber-500"
                    : "bg-slate-200 dark:bg-slate-800"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            {fixUnlocked
              ? "Fix Code is unlocked."
              : typeof remainingHints === "number"
                ? `${remainingHints} hint${remainingHints === 1 ? "" : "s"} remaining until Fix Code unlocks.`
                : "Use progressive hints first. Fix Code unlocks when the backend allows it."}
          </p>
        </div>
      )}

      {!hasTask && (
        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-[11px] leading-4 text-slate-500 dark:bg-white/[0.03] dark:text-slate-400">
          Explain and Improve work in the Playground. Hint and Fix Code need a
          codingTaskId from a coding challenge.
        </p>
      )}

      {loading && (
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-violet-600 dark:text-violet-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
          AI coach is thinking...
        </div>
      )}

      {error && (
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
            {result.kind === "hint" && hintState?.fixUnlocked && (
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
