"use client";

import { Lightbulb, Sparkles, Wrench } from "lucide-react";
import { useState } from "react";

type HelpMode = "explain" | "improve";

interface CodeCoachProps {
  code: string;
  language: string;
}

export default function CodeCoach({ code, language }: CodeCoachProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function askCoach(mode: HelpMode) {
    if (!code.trim()) {
      setError("Write some code first, then ask the AI tutor for help.");
      return;
    }

    setLoading(true);
    setError("");
    try {
    const response = await fetch(
      mode === "improve" ? "/api/backend/v1/ai/improve" : "/api/backend/v1/ai/explain",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(
          mode === "improve"
            ? { code, language }
            : { code, language, scope: "ALGORITHM" },
        ),
      },
    );
      const result: unknown = await response.json();
      if (!result || typeof result !== "object") {
        throw new Error("The AI tutor returned an invalid response.");
      }
      const responseBody = result as {
        success?: unknown;
        message?: unknown;
        data?: {
          explanation?: unknown;
          summary?: unknown;
          suggestions?: unknown;
          improvedCode?: unknown;
        };
      };
      if (!response.ok) {
        throw new Error(
          typeof responseBody.message === "string"
            ? responseBody.message
            : "Unable to get AI help.",
        );
      }
      if (responseBody.success !== true || !responseBody.data) {
        throw new Error(
          typeof (result as { message?: unknown }).message === "string"
            ? (result as { message: string }).message
            : "Unable to get AI help.",
        );
      }
      const message =
        mode === "explain"
          ? responseBody.data.explanation
          : [
              responseBody.data.summary,
              Array.isArray(responseBody.data.suggestions)
                ? responseBody.data.suggestions.map((item) => `• ${String(item)}`).join("\n")
                : "",
              typeof responseBody.data.improvedCode === "string"
                ? `\nImproved code:\n\`\`\`${language}\n${responseBody.data.improvedCode}\n\`\`\``
                : "",
            ]
              .filter(Boolean)
              .join("\n\n");
      if (typeof message !== "string" || !message.trim()) {
        throw new Error("The AI tutor returned no answer.");
      }
      setAnswer(message);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to get AI help.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border border-violet-200 bg-violet-50/60 p-4 dark:border-violet-900/70 dark:bg-violet-950/20">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-violet-950 dark:text-violet-100">AI code tutor</h2>
          <p className="mt-0.5 text-xs leading-5 text-violet-800/80 dark:text-violet-200/80">
          Powered by your Sastra Code Gemini service. Explain the current code or get safer improvement suggestions.
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => askCoach("explain")} disabled={loading} className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-violet-800 dark:bg-slate-950 dark:text-violet-300">
          <Lightbulb className="h-4 w-4" /> Explain code
        </button>
        <button type="button" onClick={() => askCoach("improve")} disabled={loading} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60">
          <Wrench className="h-4 w-4" /> {loading ? "Thinking…" : "Improve code"}
        </button>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
      {answer && <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-violet-100 bg-white p-3 font-sans text-sm leading-6 text-slate-700 dark:border-violet-900/60 dark:bg-slate-950 dark:text-slate-200">{answer}</pre>}
    </section>
  );
}
