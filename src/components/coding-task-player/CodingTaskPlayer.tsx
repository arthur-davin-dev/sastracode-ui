"use client";

import Editor from "@monaco-editor/react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Code2,
  Loader2,
  Play,
  RotateCcw,
  Send,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  type CodingTaskDetail,
  type CodingTaskRunResult as CodeRunResult,
  type CodingTaskSubmitResult as CodeSubmitResult,
  useGetCodingTaskBySlugQuery,
  useRunCodingTaskMutation,
  useSubmitCodingTaskMutation,
} from "@/redux/service/coding-task-player-api";

import CodeCoach from "@/components/playground/CodeCoach";

interface Props {
  slug: string;
  index: number;
  total: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

function errorMessage(error: unknown): string {
  if (error && typeof error === "object" && "data" in error) {
    const data = (error as { data?: unknown }).data;
    if (typeof data === "string") return data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof (data as { message?: unknown }).message === "string"
    ) {
      return (data as { message: string }).message;
    }
  }
  return "Unable to check this coding challenge.";
}

function editorLanguage(language: unknown): string {
  const value = typeof language === "string" ? language.toLowerCase() : "";
  if (value.includes("typescript")) return "typescript";
  if (value.includes("javascript") || value === "js") return "javascript";
  if (value.includes("python")) return "python";
  if (value.includes("java")) return "java";
  if (value.includes("html")) return "html";
  if (value.includes("css")) return "css";
  return "plaintext";
}

export function CodingTaskPlayer({
  slug,
  index,
  total,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
}: Props) {
  const {
    data: task,
    isLoading,
    error,
    refetch,
  } = useGetCodingTaskBySlugQuery(slug);

  const [runTask, { isLoading: isRunning }] = useRunCodingTaskMutation();
  const [submitTask, { isLoading: isSubmitting }] =
    useSubmitCodingTaskMutation();

  const [code, setCode] = useState("");
  const [runResult, setRunResult] = useState<CodeRunResult | null>(null);
  const [submitResult, setSubmitResult] = useState<CodeSubmitResult | null>(
    null,
  );

  useEffect(() => {
    if (!task) return;
    setCode(task.starterCode);
    setRunResult(null);
    setSubmitResult(null);
  }, [task]);

  async function run(codeToRun = code) {
    if (!task || !codeToRun.trim()) return;
    try {
      const result = await runTask({
        id: task.id,
        code: codeToRun,
      }).unwrap();
      setRunResult(result);
      setSubmitResult(null);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  async function submit(codeToSubmit = code) {
    if (!task || !codeToSubmit.trim()) return;
    try {
      const result = await submitTask({
        id: task.id,
        code: codeToSubmit,
      }).unwrap();

      setSubmitResult(result);
      setRunResult(null);

      if (result.passed) {
        toast.success("Correct answer!", {
          description:
            result.xpEarned && result.xpEarned > 0
              ? `You earned ${result.xpEarned} XP.`
              : "Challenge completed successfully.",
        });
      }
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="px-5 py-12 text-center sm:px-7">
        <XCircle className="mx-auto h-8 w-8 text-rose-400" />
        <p className="mt-3 font-semibold text-white">
          Unable to load this challenge.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15"
        >
          Try again
        </button>
      </div>
    );
  }

  if (submitResult?.passed) {
    return (
      <Success
        task={task}
        result={submitResult}
        index={index}
        total={total}
        hasNext={hasNext}
        onNext={onNext}
      />
    );
  }

  const token =
    typeof task.taskConfig?.blankToken === "string" &&
    task.taskConfig.blankToken
      ? task.taskConfig.blankToken
      : "___";

  const blankMode =
    (task.challengeType === "FILL_IN_BLANK" ||
      task.challengeType === "MULTIPLE_BLANKS") &&
    task.starterCode.includes(token);

  const webMode = ["HTML_BUILDER", "CSS_STYLING", "JS_DOM"].includes(
    task.challengeType,
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-7 sm:px-7 sm:py-8">
      <header className="mb-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            {task.challengeType.replaceAll("_", " ")}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
            {task.difficulty}
          </span>
        </div>

        <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl">
          {task.title}
        </h2>

        <p className="mx-auto mt-2 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-slate-200">
          {task.description}
        </p>
      </header>

      {blankMode ? (
        <BlankPlayer
          task={task}
          token={token}
          result={submitResult}
          isSubmitting={isSubmitting}
          onSubmit={submit}
        />
      ) : task.challengeType === "ARRANGE_BLOCKS" ? (
        <ArrangePlayer
          task={task}
          result={submitResult ?? runResult}
          isRunning={isRunning}
          isSubmitting={isSubmitting}
          onRun={run}
          onSubmit={submit}
        />
      ) : (
        <EditorPlayer
          task={task}
          code={code}
          onChange={setCode}
          result={submitResult ?? runResult}
          webMode={webMode}
          isRunning={isRunning}
          isSubmitting={isSubmitting}
          onRun={() => void run()}
          onSubmit={() => void submit()}
          onReset={() => {
            setCode(task.starterCode);
            setRunResult(null);
            setSubmitResult(null);
          }}
        />
      )}

      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
        <button
          type="button"
          disabled={!hasPrevious}
          onClick={onPrevious}
          className="text-sm font-semibold text-slate-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          Previous exercise
        </button>
        <span className="text-xs font-medium text-slate-400">
          {index + 1} / {total}
        </span>
      </div>
    </div>
  );
}

function BlankPlayer({
  task,
  token,
  result,
  isSubmitting,
  onSubmit,
}: {
  task: CodingTaskDetail;
  token: string;
  result: CodeSubmitResult | null;
  isSubmitting: boolean;
  onSubmit: (code: string) => Promise<void>;
}) {
  const parts = useMemo(
    () => task.starterCode.split(token),
    [task.starterCode, token],
  );
  const count = Math.max(0, parts.length - 1);
  const [answers, setAnswers] = useState<string[]>(
    Array.from({ length: count }, () => ""),
  );

  function completedCode() {
    let value = parts[0] ?? "";
    for (let i = 0; i < count; i += 1) {
      value += answers[i] ?? "";
      value += parts[i + 1] ?? "";
    }
    return value;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl bg-[#4a5568] p-5 sm:p-7">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-300">
          Complete the missing code
        </p>

        <div className="overflow-x-auto rounded-xl bg-[#1f2937] p-4 font-mono text-sm leading-8 text-slate-100">
          {parts.map((part, index) => (
            <span key={index}>
              <span className="whitespace-pre-wrap">{part}</span>
              {index < count && (
                <input
                  value={answers[index] ?? ""}
                  onChange={(event) => {
                    const next = [...answers];
                    next[index] = event.target.value;
                    setAnswers(next);
                  }}
                  aria-label={`Blank ${index + 1}`}
                  className="mx-1 inline-block h-8 min-w-28 rounded-md border border-white/60 bg-slate-800 px-2 font-mono text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                />
              )}
            </span>
          ))}
        </div>

        <Result result={result} />
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          disabled={isSubmitting || answers.some((answer) => !answer.trim())}
          onClick={() => void onSubmit(completedCode())}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-bold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Submit Answer
        </button>
      </div>
    </div>
  );
}

function ArrangePlayer({
  task,
  result,
  isRunning,
  isSubmitting,
  onRun,
  onSubmit,
}: {
  task: CodingTaskDetail;
  result: CodeRunResult | CodeSubmitResult | null;
  isRunning: boolean;
  isSubmitting: boolean;
  onRun: (code: string) => Promise<void>;
  onSubmit: (code: string) => Promise<void>;
}) {
  const [blocks, setBlocks] = useState(
    task.starterCode.split("\n").filter((line) => line.trim()),
  );

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target]!, next[index]!];
    setBlocks(next);
  }

  const value = blocks.join("\n");

  return (
    <div className="mx-auto max-w-4xl">
      <div className="space-y-2 rounded-2xl bg-[#4a5568] p-4 sm:p-6">
        {blocks.map((block, index) => (
          <div
            key={`${index}-${block}`}
            className="flex items-center gap-3 rounded-xl bg-[#1f2937] px-4 py-3"
          >
            <span className="w-7 text-center text-xs font-bold text-emerald-300">
              {index + 1}
            </span>
            <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre text-sm text-slate-100">
              {block}
            </code>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 disabled:opacity-30"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={index === blocks.length - 1}
                onClick={() => move(index, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 disabled:opacity-30"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Actions
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        onRun={() => void onRun(value)}
        onSubmit={() => void onSubmit(value)}
      />
      <Result result={result} />
    </div>
  );
}

function EditorPlayer({
  task,
  code,
  onChange,
  result,
  webMode,
  isRunning,
  isSubmitting,
  onRun,
  onSubmit,
  onReset,
}: {
  task: CodingTaskDetail;
  code: string;
  onChange: (value: string) => void;
  result: CodeRunResult | CodeSubmitResult | null;
  webMode: boolean;
  isRunning: boolean;
  isSubmitting: boolean;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
}) {
  const language = editorLanguage(task.taskConfig?.language);

  const coachLanguage =
    typeof task.taskConfig?.language === "string" &&
    task.taskConfig.language.trim()
      ? task.taskConfig.language.trim()
      : language;

  const preview = useMemo(() => buildPreview(task, code), [task, code]);

  return (
    <div>
      <div
        className={`grid overflow-hidden rounded-2xl border border-white/10 bg-[#111827] ${
          webMode ? "lg:grid-cols-2" : ""
        }`}
      >
        <div className="min-w-0">
          <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Code2 className="h-4 w-4 text-emerald-400" />
              Code
            </div>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          <Editor
            height="340px"
            language={language}
            value={code}
            onChange={(value) => onChange(value ?? "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineHeight: 22,
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {webMode && (
          <div className="min-w-0 border-t border-white/10 bg-white lg:border-l lg:border-t-0">
            <div className="flex h-12 items-center gap-2 border-b border-slate-200 bg-[#252936] px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-semibold text-white">
                Result
              </span>
            </div>

            <iframe
              title={`${task.title} preview`}
              srcDoc={preview}
              sandbox={task.challengeType === "JS_DOM" ? "allow-scripts" : ""}
              className="h-[340px] w-full bg-white"
            />
          </div>
        )}
      </div>

      <Actions
        isRunning={isRunning}
        isSubmitting={isSubmitting}
        onRun={onRun}
        onSubmit={onSubmit}
      />

      <div className="mt-4">
        <CodeCoach
          code={code}
          language={coachLanguage}
          codingTaskId={task.id}
          compact
          onApplyCode={(generatedCode) => {
            onChange(generatedCode);
          }}
        />
      </div>

      <Result result={result} />
    </div>
  );
}

function Actions({
  isRunning,
  isSubmitting,
  onRun,
  onSubmit,
}: {
  isRunning: boolean;
  isSubmitting: boolean;
  onRun: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap justify-end gap-2">
      <button
        type="button"
        disabled={isRunning || isSubmitting}
        onClick={onRun}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-50"
      >
        {isRunning ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Play className="h-4 w-4" />
        )}
        Run
      </button>

      <button
        type="button"
        disabled={isRunning || isSubmitting}
        onClick={onSubmit}
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        Check Code
      </button>
    </div>
  );
}

function Result({
  result,
}: {
  result: CodeRunResult | CodeSubmitResult | null;
}) {
  if (!result) return null;

  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
        result.passed
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
          : "border-rose-400/30 bg-rose-400/10 text-rose-100"
      }`}
    >
      <div className="flex items-start gap-3">
        {result.passed ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
        ) : (
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-400" />
        )}
        <div>
          <p className="font-semibold">
            {result.passed
              ? "All checks passed."
              : "Not correct yet. Try again."}
          </p>
          <p className="mt-1 text-xs opacity-80">
            Tests: {result.testsPassed ?? 0}/{result.testsTotal ?? 0}
          </p>
          {result.output && (
            <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-black/20 p-3 font-mono text-xs">
              {result.output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

function Success({
  task,
  result,
  index,
  total,
  hasNext,
  onNext,
}: {
  task: CodingTaskDetail;
  result: CodeSubmitResult;
  index: number;
  total: number;
  hasNext: boolean;
  onNext: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-7 sm:py-10">
      <p className="text-center text-lg font-semibold text-white">
        {task.title}
      </p>

      <div className="relative mt-6 overflow-hidden rounded-2xl bg-emerald-500 px-6 py-14 text-center">
        <span className="absolute left-[8%] top-[18%] h-3 w-3 rounded-full bg-amber-300" />
        <span className="absolute left-[22%] top-[68%] h-2.5 w-2.5 rounded-full bg-cyan-300" />
        <span className="absolute right-[20%] top-[16%] h-3 w-3 rounded-full bg-violet-300" />
        <span className="absolute right-[8%] top-[30%] h-3 w-3 rounded-full bg-yellow-300" />

        <CheckCircle2 className="mx-auto h-12 w-12 text-white" />
        <h3 className="mt-4 text-2xl font-bold text-white">Correct Answer!</h3>
        <p className="mt-2 text-sm font-semibold text-emerald-50">
          Nice work. That one was spot on.
        </p>

        <div className="mt-5 flex justify-center gap-3 text-xs font-semibold text-white/90">
          <span>
            Tests {result.testsPassed}/{result.testsTotal}
          </span>
          {!!result.xpEarned && <span>+{result.xpEarned} XP</span>}
        </div>

        {hasNext ? (
          <button
            type="button"
            onClick={onNext}
            className="mt-8 rounded-lg bg-slate-800 px-5 py-3 text-sm font-bold text-white hover:bg-slate-900"
          >
            Next Question »
          </button>
        ) : (
          <div className="mt-8 inline-block rounded-lg bg-slate-800/90 px-5 py-3 text-sm font-bold text-white">
            All coding challenges completed
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-slate-300">
        Exercise {index + 1} of {total}
      </p>
    </div>
  );
}

function buildPreview(task: CodingTaskDetail, code: string): string {
  const base =
    typeof task.taskConfig?.previewHtml === "string"
      ? task.taskConfig.previewHtml
      : `<main><h1>Hello World</h1><p>Live preview</p><button id="demo-button">Click me</button></main>`;

  const head = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; padding: 24px; font-family: Arial, sans-serif; color: #111827; background: #fff; }
      main { max-width: 680px; margin: 0 auto; }
    </style>
  `;

  if (task.challengeType === "HTML_BUILDER") {
    return `<!doctype html><html><head>${head}</head><body>${code}</body></html>`;
  }

  if (task.challengeType === "CSS_STYLING") {
    return `<!doctype html><html><head>${head}<style>${code}</style></head><body>${base}</body></html>`;
  }

  const safeScript = code.replace(/<\/script/gi, "<\\\\/script");
  return `<!doctype html><html><head>${head}</head><body>${base}<script>${safeScript}</script></body></html>`;
}
