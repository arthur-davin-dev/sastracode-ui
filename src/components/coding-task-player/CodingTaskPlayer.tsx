"use client";

import Editor from "@monaco-editor/react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  GripVertical,
  Lightbulb,
  Loader2,
  Maximize2,
  Minimize2,
  PartyPopper,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
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
import { useIsDarkMode } from "@/hooks/use-dark-mode";
import { getChallengeUIConfig } from "@/utils/coding-task-ui";
import { highlightCode } from "@/utils/highlight-code";

interface Props {
  slug: string;
  index: number;
  total: number;
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  /**
   * Fired with every submit result (pass or fail). The parent lesson
   * section tracks these across all its exercises — this player instance
   * remounts (and loses its own local result state) whenever the active
   * exercise changes, so the parent is the only place that can build an
   * end-of-set summary.
   */
  onResult?: (result: CodeSubmitResult) => void;
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
  const value = typeof language === "string" ? language.trim().toLowerCase() : "";
  if (value.includes("typescript") || value === "ts" || value === "tsx") return "typescript";
  if (value.includes("javascript") || value === "js" || value === "jsx") return "javascript";
  if (value.includes("python") || value === "py") return "python";
  if (value.includes("java")) return "java";
  if (value.includes("html")) return "html";
  if (value.includes("css") || value === "scss" || value === "sass" || value === "less")
    return "css";
  if (value.includes("c++") || value.includes("cpp")) return "cpp";
  if (value.includes("c#") || value.includes("csharp")) return "csharp";
  if (value.includes("objective-c") || value === "objc") return "objective-c";
  if (value === "c") return "c";
  if (value.includes("php")) return "php";
  if (value.includes("sql")) return "sql";
  if (value === "go" || value === "golang") return "go";
  if (value.includes("rust") || value === "rs") return "rust";
  if (value.includes("ruby") || value === "rb") return "ruby";
  if (value.includes("swift")) return "swift";
  if (value.includes("kotlin") || value === "kt") return "kotlin";
  if (value.includes("dart")) return "dart";
  if (value.includes("scala")) return "scala";
  if (value.includes("perl")) return "perl";
  if (value.includes("lua")) return "lua";
  if (value.includes("shell") || value.includes("bash") || value === "sh") return "shell";
  if (value.includes("powershell")) return "powershell";
  if (value.includes("yaml") || value === "yml") return "yaml";
  if (value.includes("json")) return "json";
  if (value.includes("xml")) return "xml";
  if (value.includes("markdown") || value === "md") return "markdown";
  return "plaintext";
}

/**
 * Some challenge sources store code with literal "\n" / "\t" escape
 * sequences instead of real control characters (e.g. double-escaped
 * JSON). Detect that and turn them back into real whitespace so the
 * code renders as properly indented, multi-line source instead of one
 * long line with visible backslash-n text.
 */
function normalizeCode(raw: string): string {
  if (!raw) return raw;
  const looksDoubleEscaped = raw.includes("\\n") && !raw.includes("\n");
  if (looksDoubleEscaped) {
    return raw
      .replace(/\\r\\n/g, "\n")
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  // Some sources escape quotes only (e.g. `class=\"foo\"`) while leaving
  // real newlines intact, so the double-escaped check above never fires.
  // Left alone, those literal backslash-quote pairs corrupt HTML attributes
  // and break the live preview iframe, so unescape them independently.
  if (raw.includes('\\"')) {
    return raw.replace(/\\"/g, '"');
  }
  return raw;
}

/**
 * Fisher-Yates shuffle. Arrange-block exercises ship their starter code in
 * the *solved* order (it's the answer key), so the lines must be scrambled
 * client-side before showing them — otherwise there's nothing to arrange.
 * Reshuffles once more if it happens to land back in solved order (only
 * matters for very short snippets, but cheap to guard against).
 */
function shuffleLines<T>(items: T[]): T[] {
  if (items.length < 2) return items;
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }
  const isSameOrder = shuffled.every((item, i) => item === items[i]);
  return isSameOrder ? shuffleLines(items) : shuffled;
}

function splitIntoArrangeBlocks(raw: string): string[] {
  const lines = raw.split("\n");
  const groups: string[] = [];
  let pendingBlanks: string[] = [];

  for (const line of lines) {
    if (line.trim() === "") {
      pendingBlanks.push(line);
      continue;
    }
    const prefix = pendingBlanks.length
      ? `${pendingBlanks.join("\n")}\n`
      : "";
    groups.push(prefix + line);
    pendingBlanks = [];
  }

  if (pendingBlanks.length) {
    if (groups.length) {
      groups[groups.length - 1] += `\n${pendingBlanks.join("\n")}`;
    } else {
      groups.push(pendingBlanks.join("\n"));
    }
  }

  return groups;
}

export function CodingTaskPlayer({
  slug,
  index,
  total,
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  onResult,
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
  const [attempt, setAttempt] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!task) return;
    setCode(normalizeCode(task.starterCode));
    setRunResult(null);
    setSubmitResult(null);
    setAttempt(0);
    setShowHints(false);
    setIsFullscreen(false);
  }, [task?.id]);

  async function run(codeToRun = code) {
    if (!task || !codeToRun.trim()) return;
    console.log("[CodingTask] run - user answer:", codeToRun);
    try {
      const result = await runTask({
        id: task.id,
        code: codeToRun,
      }).unwrap();
      console.log("[CodingTask] run - result:", result);
      setRunResult(result);
      setSubmitResult(null);
      setAttempt((value) => value + 1);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  async function submit(codeToSubmit = code) {
    if (!task || !codeToSubmit.trim()) return;
    console.log("[CodingTask] submit - user answer:", codeToSubmit);
    try {
      const result = await submitTask({
        id: task.id,
        code: codeToSubmit,
      }).unwrap();
      console.log("[CodingTask] submit - result:", result);

      setSubmitResult(result);
      setRunResult(null);
      setAttempt((value) => value + 1);
      onResult?.(result);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  function tryAgain() {
    setSubmitResult(null);
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
        <XCircle className="mx-auto h-8 w-8 text-rose-500 dark:text-rose-400" />
        <p className="mt-3 font-semibold text-slate-900 dark:text-white">
          Unable to load this challenge.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
        >
          Try again
        </button>
      </div>
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

  const webMode = [
    "HTML_BUILDER",
    "CSS_STYLING",
    "JS_DOM",
    "WEB_BUILDER",
  ].includes(task.challengeType);

  const uiConfig = getChallengeUIConfig(task.challengeType);

  const inlineResult = submitResult ?? runResult;

  const hints = (task.taskConfig?.instructions ?? []).filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-slate-950"
          : ""
      }
    >
      <div className="mx-auto max-w-6xl px-5 py-7 sm:px-7 sm:py-8">
        <header className="relative mb-6 text-center">
          <button
            type="button"
            onClick={() => setIsFullscreen((value) => !value)}
            title={isFullscreen ? "Exit fullscreen" : "Open fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Open fullscreen"}
            className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${uiConfig.tagColorClass}`}
            >
              {task.challengeType.replaceAll("_", " ")}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
              {task.difficulty}
            </span>
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            {task.title}
          </h2>

          <p className="mx-auto mt-2 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">
            {task.description}
          </p>

          {hints.length > 0 && (
            <div className="mx-auto mt-4 max-w-3xl text-left">
              <button
                type="button"
                onClick={() => setShowHints((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/15"
              >
                <Lightbulb className="h-4 w-4" />
                {showHints ? "Hide hint" : "Show hint"}
              </button>

              {showHints && (
                <ul className="mt-3 space-y-2 rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/5 dark:text-amber-200">
                  {hints.map((hint, hintIndex) => (
                    <li key={hintIndex} className="flex gap-2">
                      <span className="font-semibold">{hintIndex + 1}.</span>
                      <span className="whitespace-pre-wrap">{hint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </header>

        {submitResult ? (
          <FullResultPanel
            result={submitResult}
            task={task}
            hasNext={hasNext}
            onNext={onNext}
            onTryAgain={tryAgain}
          />
        ) : blankMode ? (
          <BlankPlayer
            task={task}
            token={token}
            result={inlineResult as CodeSubmitResult | null}
            attempt={attempt}
            isSubmitting={isSubmitting}
            onSubmit={submit}
            hasNext={hasNext}
            onNext={onNext}
          />
        ) : task.challengeType === "ARRANGE_BLOCKS" ? (
          <ArrangePlayer
            task={task}
            result={inlineResult}
            attempt={attempt}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            onRun={run}
            onSubmit={submit}
            onReset={() => {
              setRunResult(null);
              setSubmitResult(null);
            }}
            hasNext={hasNext}
            onNext={onNext}
          />
        ) : (
          <EditorPlayer
            task={task}
            code={code}
            onChange={setCode}
            result={inlineResult}
            attempt={attempt}
            webMode={webMode}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            onRun={() => void run()}
            onSubmit={() => void submit()}
            onReset={() => {
              setCode(normalizeCode(task.starterCode));
              setRunResult(null);
              setSubmitResult(null);
            }}
            hasNext={hasNext}
            onNext={onNext}
            isFullscreen={isFullscreen}
          />
        )}

        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800">
          <button
            type="button"
            disabled={!hasPrevious}
            onClick={onPrevious}
            className="text-sm font-semibold text-slate-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-400 dark:hover:text-white"
          >
            Previous exercise
          </button>
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Takes over the whole exercise area on submit — replacing the editor,
 * blanks, or arrange blocks entirely with a single pass/fail card — instead
 * of appending a small inline banner underneath the still-visible editor.
 * Only submit results show this (see the `submitResult` check in
 * CodingTaskPlayer); a Run keeps its lightweight inline feedback so the
 * learner can iterate without losing their code from view.
 */
function FullResultPanel({
  result,
  task,
  hasNext,
  onNext,
  onTryAgain,
}: {
  result: CodeSubmitResult;
  task: CodingTaskDetail;
  hasNext: boolean;
  onNext: () => void;
  onTryAgain: () => void;
}) {
  const { passed } = result;
  const total = result.testsTotal ?? 0;
  const passedCount = Math.min(
    result.testsPassed ?? 0,
    total || (result.testsPassed ?? 0),
  );
  const xpEarned = result.xpEarned;

  return (
    <div
      role="status"
      className={`relative overflow-hidden rounded-[28px] px-6 py-16 text-center shadow-lg sm:py-20 ${
        passed ? "bg-emerald-500" : "bg-rose-500"
      }`}
    >
      {passed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <PartyPopper className="absolute left-8 top-8 h-8 w-8 -rotate-12 text-white/70 animate-bounce" />
          <Sparkles className="absolute right-10 top-10 h-6 w-6 text-white/80 animate-ping" />
          <Sparkles className="absolute right-20 top-24 h-5 w-5 text-white/60 animate-pulse" />
        </div>
      )}

      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white">
        {passed ? (
          <CheckCircle2 className="h-9 w-9" />
        ) : (
          <XCircle className="h-9 w-9" />
        )}
      </span>

      <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
        {passed ? "Correct Answer!" : "Wrong Answer!"}
      </h3>

      {total > 0 && (
        <p className="mt-2 text-sm font-semibold text-white/85">
          {passedCount}/{total} checks passed
        </p>
      )}

      {passed && !!xpEarned && (
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1.5 text-sm font-bold text-white">
          <Sparkles className="h-4 w-4" />+{xpEarned} XP
        </span>
      )}

      <p className="sr-only">{task.title}</p>

      <div className="mt-6">
        {passed ? (
          hasNext ? (
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl bg-[#002455] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#00346f]"
            >
              Next Question »
            </button>
          ) : (
            <span className="inline-block rounded-xl bg-white/20 px-6 py-3 text-sm font-bold text-white">
              All coding challenges completed
            </span>
          )
        ) : (
          <button
            type="button"
            onClick={onTryAgain}
            className="inline-flex items-center gap-2 rounded-xl bg-[#002455] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#00346f]"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

function BlankPlayer({
  task,
  token,
  result,
  attempt,
  isSubmitting,
  onSubmit,
  hasNext,
  onNext,
}: {
  task: CodingTaskDetail;
  token: string;
  result: CodeSubmitResult | null;
  attempt: number;
  isSubmitting: boolean;
  onSubmit: (code: string) => Promise<void>;
  hasNext: boolean;
  onNext: () => void;
}) {
  const parts = useMemo(
    () => normalizeCode(task.starterCode).split(token),
    [task.starterCode, token],
  );
  const count = Math.max(0, parts.length - 1);
  const [answers, setAnswers] = useState<string[]>(
    Array.from({ length: count }, () => ""),
  );

  const failed = !!result && !result.passed;

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
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-[#1a1d27]">
        <p className="mb-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
            <Send className="h-3 w-3" />
          </span>
          Complete the missing code
        </p>

        <div
          className={`overflow-x-auto rounded-xl border p-4 font-mono text-sm leading-8 text-slate-800 transition-colors dark:text-slate-200 ${
            failed
              ? "border-rose-300 bg-rose-50/60 dark:border-rose-500/40 dark:bg-rose-500/5"
              : "border-slate-200 bg-[#f8fafc] dark:border-slate-700/50 dark:bg-[#0f111a]"
          }`}
        >
          {parts.map((part, index) => (
            <span key={index}>
              <span className="whitespace-pre-wrap">{highlightCode(part)}</span>
              {index < count && (
                <input
                  value={answers[index] ?? ""}
                  onChange={(event) => {
                    const next = [...answers];
                    next[index] = event.target.value;
                    setAnswers(next);
                  }}
                  aria-label={`Blank ${index + 1}`}
                  className={`mx-1 inline-block h-8 min-w-28 rounded-md border bg-white px-2 font-mono text-sm text-slate-900 outline-none transition-colors focus:border-[#04AA6D] focus:ring-2 focus:ring-[#04AA6D]/20 dark:bg-[#1e1e1e] dark:text-white dark:focus:border-[#04AA6D] ${
                    failed
                      ? "border-rose-300 dark:border-rose-500/50"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                />
              )}
            </span>
          ))}
        </div>

        <Result
          key={attempt}
          result={result}
          task={task}
          hasNext={hasNext}
          onNext={onNext}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          disabled={isSubmitting || answers.some((answer) => !answer.trim())}
          onClick={() => void onSubmit(completedCode())}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#04AA6D] px-6 text-sm font-bold text-white shadow-sm shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-[#059862] hover:shadow-md disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none dark:bg-emerald-600 dark:hover:bg-emerald-500"
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

interface ArrangeBlock {
  id: string;
  code: string;
}

function ArrangePlayer({
  task,
  result,
  attempt,
  isRunning,
  isSubmitting,
  onRun,
  onSubmit,
  onReset,
  hasNext,
  onNext,
}: {
  task: CodingTaskDetail;
  result: CodeRunResult | CodeSubmitResult | null;
  attempt: number;
  isRunning: boolean;
  isSubmitting: boolean;
  onRun: (code: string) => Promise<void>;
  onSubmit: (code: string) => Promise<void>;
  onReset: () => void;
  hasNext: boolean;
  onNext: () => void;
}) {
  const instanceId = useId();

  // Preferred: the admin authored explicit, individually-ordered blocks
  // (taskConfig.blocks). Falling back to slicing up starterCode by line is
  // only a best-effort guess and breaks the moment starterCode isn't plain,
  // one-statement-per-line source (e.g. it's unset, or holds something else
  // entirely) — using the authored blocks whenever they exist avoids that.
  const configBlocks = task.taskConfig?.blocks;
  const randomize = task.taskConfig?.randomize !== false;

  const solutionBlocks = useMemo<ArrangeBlock[]>(() => {
    if (configBlocks && configBlocks.length > 0) {
      return [...configBlocks]
        .sort((a, b) => a.correctOrder - b.correctOrder)
        .map((block) => ({ id: block.id, code: block.code }));
    }
    return splitIntoArrangeBlocks(normalizeCode(task.starterCode)).map(
      (code, index) => ({ id: `${instanceId}-line-${index}`, code }),
    );
  }, [configBlocks, task.starterCode, instanceId]);

  function shuffledBlocks(): ArrangeBlock[] {
    return randomize ? shuffleLines(solutionBlocks) : solutionBlocks;
  }

  const [blocks, setBlocks] = useState<ArrangeBlock[]>(shuffledBlocks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [shuffleCount, setShuffleCount] = useState(0);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target]!, next[index]!];
    setBlocks(next);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setBlocks((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return items;
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  function shuffleAgain() {
    setBlocks(shuffledBlocks());
    setActiveId(null);
    setShuffleCount((value) => value + 1);
    onReset();
  }

  const value = blocks.map((block) => block.code).join("\n");
  const passed = !!result && result.passed;
  const failed = !!result && !result.passed;
  const activeBlock = blocks.find((block) => block.id === activeId);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
            <GripVertical className="h-3 w-3" />
          </span>
          Drag to arrange in the correct order
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold normal-case tracking-normal text-slate-500 dark:bg-white/10 dark:text-slate-400">
            {blocks.length} steps
          </span>
        </p>

        <button
          type="button"
          onClick={shuffleAgain}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Shuffle &amp; reset
        </button>
      </div>

      <div className="relative">
        {passed && (
          <div
            key={`celebrate-${attempt}`}
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 z-10 overflow-hidden"
          >
            <PartyPopper className="absolute -left-1 top-2 h-6 w-6 -rotate-12 text-emerald-500 animate-bounce" />
            <Sparkles className="absolute right-4 top-0 h-5 w-5 text-amber-400 animate-ping" />
            <Sparkles className="absolute bottom-2 left-1/2 h-4 w-4 text-emerald-400 animate-pulse" />
          </div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragStart={(event) => setActiveId(String(event.active.id))}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <div
            key={shuffleCount}
            className={`space-y-2 rounded-2xl border p-4 shadow-sm transition-colors sm:p-6 ${
              failed
                ? "border-rose-300 bg-rose-50/40 dark:border-rose-500/40 dark:bg-rose-500/5"
                : passed
                  ? "border-emerald-300 bg-emerald-50/40 dark:border-emerald-500/40 dark:bg-emerald-500/5"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-[#1a1d27]"
            }`}
          >
            <SortableContext
              items={blocks.map((block) => block.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block, index) => (
                <ArrangeBlockRow
                  key={block.id}
                  block={block}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === blocks.length - 1}
                  onMoveUp={() => move(index, -1)}
                  onMoveDown={() => move(index, 1)}
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeBlock ? (
              <div className="flex items-center gap-2 rounded-xl border-2 border-blue-500 bg-white px-3 py-3 shadow-xl shadow-blue-500/30 dark:bg-[#0f111a]">
                <GripVertical className="h-4 w-4 shrink-0 text-slate-400" />
                <code className="whitespace-pre text-sm text-slate-800 dark:text-slate-200">
                  {highlightCode(activeBlock.code)}
                </code>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <button
          type="button"
          disabled={isRunning || isSubmitting}
          onClick={() => void onRun(value)}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          Preview order
        </button>

        <button
          type="button"
          disabled={isRunning || isSubmitting}
          onClick={() => void onSubmit(value)}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#002455] to-blue-600 px-6 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none sm:flex-none sm:min-w-[14rem] dark:from-emerald-600 dark:to-emerald-500"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          Check Solution
        </button>
      </div>

      <Result
        key={attempt}
        result={result}
        task={task}
        hasNext={hasNext}
        onNext={onNext}
      />

      {failed && (
        <details className="group mt-3">
          <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
            <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
            View what was submitted
          </summary>
          <pre className="mt-2 max-h-60 overflow-auto whitespace-pre rounded-lg bg-slate-50 p-3 font-mono text-xs text-slate-700 dark:bg-black/25 dark:text-slate-200">
            {value}
          </pre>
        </details>
      )}
    </div>
  );
}

function ArrangeBlockRow({
  block,
  index,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
}: {
  block: ArrangeBlock;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      data-dragging={isDragging}
      className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-3 shadow-sm transition focus-within:z-10 focus-within:border-blue-500 focus-within:shadow-lg focus-within:shadow-blue-500/20 focus-within:ring-2 focus-within:ring-blue-500/30 data-[dragging=true]:z-10 data-[dragging=true]:border-blue-500 data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-blue-500/20 data-[dragging=true]:ring-2 data-[dragging=true]:ring-blue-500/30 dark:border-slate-700/50 dark:bg-[#0f111a]"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Drag block ${index + 1}`}
        className="flex h-8 w-8 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 active:cursor-grabbing dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 dark:bg-purple-500/15 dark:text-purple-300">
        {index + 1}
      </span>

      <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre text-sm text-slate-800 dark:text-slate-200">
        {highlightCode(block.code)}
      </code>

      <div className="flex shrink-0 gap-1 opacity-60 transition group-hover:opacity-100">
        <button
          type="button"
          disabled={isFirst}
          onClick={onMoveUp}
          aria-label={`Move block ${index + 1} up`}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 text-slate-600 transition hover:bg-slate-300 disabled:opacity-30 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20"
        >
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={onMoveDown}
          aria-label={`Move block ${index + 1} down`}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 text-slate-600 transition hover:bg-slate-300 disabled:opacity-30 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20"
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function EditorPlayer({
  task,
  code,
  onChange,
  result,
  attempt,
  webMode,
  isRunning,
  isSubmitting,
  onRun,
  onSubmit,
  onReset,
  hasNext,
  onNext,
  isFullscreen,
}: {
  task: CodingTaskDetail;
  code: string;
  onChange: (value: string) => void;
  result: CodeRunResult | CodeSubmitResult | null;
  attempt: number;
  webMode: boolean;
  isRunning: boolean;
  isSubmitting: boolean;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  hasNext: boolean;
  onNext: () => void;
  /** Whether the whole exercise (header, editor, result, coach) is in the fullscreen viewer. Used only to give the editor more room — the overlay itself lives in the parent. */
  isFullscreen: boolean;
}) {
  const language = editorLanguage(task.taskConfig?.language);
  const isDark = useIsDarkMode();
  const monacoTheme = isDark ? "vs-dark" : "light";

  const coachLanguage =
    typeof task.taskConfig?.language === "string" &&
    task.taskConfig.language.trim()
      ? task.taskConfig.language.trim()
      : language;

  const preview = useMemo(() => buildPreview(task, code), [task, code]);
  const uiConfig = getChallengeUIConfig(task.challengeType);
  const Icon = uiConfig.icon;
  const failed = !!result && !result.passed;

  return (
    <div className="flex flex-col gap-4">
      {webMode ? (
        <div
          className={`overflow-hidden rounded-2xl border shadow-lg transition-colors dark:bg-[#0f111a] ${
            failed
              ? "border-rose-300 dark:border-rose-500/40"
              : "border-slate-200 dark:border-slate-700/50"
          }`}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700/50 dark:bg-[#1a1d27]">
            <div className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${uiConfig.headerColorClass}`} />
              <span className="font-semibold text-slate-700 dark:text-white">
                {uiConfig.title}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <button
                type="button"
                disabled={isRunning || isSubmitting}
                onClick={onRun}
                className="flex items-center gap-1.5 rounded-lg bg-[#04AA6D] px-4 py-1.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#059862] disabled:opacity-50"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
                Run ❯
              </button>
              <button
                type="button"
                disabled={isRunning || isSubmitting}
                onClick={onSubmit}
                className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Submit
              </button>
            </div>
          </div>

          {/* Split Pane */}
          <div className="grid divide-y divide-slate-200 dark:divide-slate-700/50 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {/* Code */}
            <div className="flex flex-col bg-white dark:bg-[#1e1e1e]">
              <div className="flex h-10 items-center bg-slate-100 px-4 text-xs font-medium uppercase text-slate-600 dark:bg-[#2d2d2d] dark:text-slate-300">
                {language === "html"
                  ? "index.html"
                  : language === "css"
                    ? "style.css"
                    : language === "javascript"
                      ? "script.js"
                      : language}
              </div>
              <Editor
                height={isFullscreen ? "60vh" : "400px"}
                language={language}
                value={code}
                onChange={(value) => onChange(value ?? "")}
                theme={monacoTheme}
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

            {/* Preview */}
            <div className="flex flex-col bg-white">
              <div className="flex h-10 items-center border-b border-slate-200 bg-[#f8fafc] px-4 text-xs font-medium text-slate-500">
                Result
              </div>
              <iframe
                title={`${task.title} preview`}
                srcDoc={preview}
                sandbox={
                  task.challengeType === "JS_DOM" ||
                  task.challengeType === "WEB_BUILDER"
                    ? "allow-scripts"
                    : ""
                }
                className={
                  isFullscreen
                    ? "h-[60vh] w-full border-none bg-white"
                    : "h-[400px] w-full border-none bg-white"
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`grid overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors dark:bg-[#0f111a] ${
              failed
                ? "border-rose-300 dark:border-rose-500/40"
                : "border-slate-200 dark:border-slate-800"
            }`}
          >
            <div className="min-w-0 bg-white dark:bg-[#1e1e1e]">
              <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-slate-100 px-4 dark:border-slate-700/50 dark:bg-[#2d2d2d]">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Icon className={`h-4 w-4 ${uiConfig.headerColorClass}`} />
                  {uiConfig.title}
                </div>
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>

              <Editor
                height={isFullscreen ? "60vh" : "340px"}
                language={language}
                value={code}
                onChange={(value) => onChange(value ?? "")}
                theme={monacoTheme}
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
          </div>

          <Actions
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            onRun={onRun}
            onSubmit={onSubmit}
          />
        </>
      )}

      <Result
        key={attempt}
        result={result}
        task={task}
        hasNext={hasNext}
        onNext={onNext}
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
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
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
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#04AA6D] px-5 text-sm font-bold text-white hover:bg-[#059862] disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
        Submit
      </button>
    </div>
  );
}

function Result({
  result,
  task,
  hasNext,
  onNext,
}: {
  result: CodeRunResult | CodeSubmitResult | null;
  task: CodingTaskDetail;
  hasNext: boolean;
  onNext: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, []);

  if (!result) return null;

  const { passed } = result;
  const total = result.testsTotal ?? 0;
  const passedCount = Math.min(
    result.testsPassed ?? 0,
    total || (result.testsPassed ?? 0),
  );
  const showPills = total > 0 && total <= 12;
  const xpEarned = "xpEarned" in result ? result.xpEarned : undefined;

  const headline = passed ? "Correct answer!" : "Not correct yet";

  const subcopy = passed
    ? `${task.title} — nice work, that one was spot on.`
    : total > 0
      ? `${passedCount} of ${total} checks passed. Review the details below and try again.`
      : "That answer doesn't match yet. Take another look and try again.";

  return (
    <section
      ref={sectionRef}
      role="status"
      className={`relative mt-5 scroll-mt-24 rounded-2xl border p-4 sm:p-5 ${
        passed
          ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/25"
          : "border-rose-200 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/25"
      }`}
    >
      {passed && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <PartyPopper className="absolute left-2 top-2 h-6 w-6 -rotate-12 text-emerald-500 animate-bounce" />
          <Sparkles className="absolute right-8 top-2 h-5 w-5 text-amber-400 animate-ping" />
          <Sparkles className="absolute right-3 top-10 h-4 w-4 text-emerald-400 animate-pulse" />
        </div>
      )}

      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            passed
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
              : "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300"
          }`}
        >
          {passed ? (
            <CheckCircle2 className="h-4.5 w-4.5" />
          ) : (
            <XCircle className="h-4.5 w-4.5" />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p
              className={`font-bold ${
                passed
                  ? "text-emerald-900 dark:text-emerald-200"
                  : "text-rose-900 dark:text-rose-200"
              }`}
            >
              {headline}
            </p>
            <div className="flex items-center gap-2">
              {total > 0 && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    passed
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {passedCount}/{total} checks
                </span>
              )}
              {passed && !!xpEarned && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                  <Sparkles className="h-3 w-3" />+{xpEarned} XP
                </span>
              )}
            </div>
          </div>

          <p
            className={`mt-1 text-sm ${
              passed
                ? "text-emerald-800/80 dark:text-emerald-100/70"
                : "text-rose-900/80 dark:text-rose-100/70"
            }`}
          >
            {subcopy}
          </p>

          {total > 0 && (
            <div className="mt-3 flex items-center gap-1.5">
              {showPills ? (
                Array.from({ length: total }).map((_, pillIndex) => (
                  <span
                    key={pillIndex}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      pillIndex < passedCount
                        ? "bg-emerald-500"
                        : passed
                          ? "bg-emerald-500/30"
                          : "bg-rose-300 dark:bg-rose-500/30"
                    }`}
                  />
                ))
              ) : (
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ${
                      passed ? "bg-emerald-500" : "bg-rose-400"
                    }`}
                    style={{
                      width: `${Math.round((total > 0 ? passedCount / total : passed ? 1 : 0) * 100)}%`,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {result.output && (
            <details className="group mt-3">
              <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                View output details
              </summary>
              <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-white/70 p-3 font-mono text-xs text-slate-700 dark:bg-black/25 dark:text-slate-200">
                {result.output}
              </pre>
            </details>
          )}

          {passed ? (
            <div className="mt-4">
              {hasNext ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  Next Question »
                </button>
              ) : (
                <span className="inline-block rounded-lg bg-emerald-600/10 px-4 py-2 text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  All coding challenges completed
                </span>
              )}
            </div>
          ) : (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  const rect = sectionRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  window.scrollBy({
                    top: rect.top - 220,
                    behavior: "smooth",
                  });
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function buildPreview(task: CodingTaskDetail, code: string): string {
  const base =
    typeof task.taskConfig?.previewHtml === "string"
      ? normalizeCode(task.taskConfig.previewHtml)
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

  if (task.challengeType === "HTML_BUILDER" || task.challengeType === "WEB_BUILDER") {
    return `<!doctype html><html><head>${head}</head><body>${code}</body></html>`;
  }

  if (task.challengeType === "CSS_STYLING") {
    return `<!doctype html><html><head>${head}<style>${code}</style></head><body>${base}</body></html>`;
  }

  const safeScript = code.replace(/<\/script/gi, "<\\\\/script");
  return `<!doctype html><html><head>${head}</head><body>${base}<script>${safeScript}</script></body></html>`;
}
