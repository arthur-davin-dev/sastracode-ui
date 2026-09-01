"use client";

import {
  Check,
  CircleAlert,
  CircleCheck,
  CircleHelp,
  Clipboard,
  Code2,
  ImageIcon,
  Info,
  Layers,
  Lightbulb,
  ListChecks,
  Play,
  Quote,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

import type { TutorialBlock } from "@/types/tutorial-reader";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import {
  type QuizAttemptDetail,
  type QuizScope,
  useStartQuizAttemptMutation,
  useSubmitQuizAttemptMutation,
} from "@/redux/api/quiz-attempt-api";
import {
  detectLanguageFromCode,
  isPlaygroundLanguageSupported,
} from "@/lib/playground/languages";
import { highlightCode } from "@/utils/highlight-code";

interface LessonBlockRendererProps {
  block: TutorialBlock;
}

type BlockData = Record<string, unknown>;

type CalloutTone = "INFO" | "TIP" | "WARNING" | "SUCCESS" | "DANGER" | "NOTE";

interface QuizResult {
  // null = answer recorded but not yet graded (the lesson content payload
  // doesn't include the answer key — grading only happens once the whole
  // attempt is submitted to the backend).
  correct: boolean | null;
}

function displayAnswer(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    return String(
      record.text ??
        record.label ??
        record.value ??
        record.id ??
        JSON.stringify(value),
    );
  }
  return String(value);
}

function displayQuizAnswer(
  value: unknown,
  questionData?: Record<string, unknown>,
): string {
  const options = questionData ? quizOptionsValue(questionData) : [];
  const answerIndex =
    typeof value === "number"
      ? value
      : typeof value === "string" && /^\d+$/.test(value.trim())
        ? Number(value)
        : undefined;

  if (answerIndex !== undefined && options[answerIndex]) {
    return options[answerIndex].text;
  }

  if (typeof value === "string") {
    const matchingOption = options.find(
      (option) => option.id === value || option.text === value,
    );
    if (matchingOption) return matchingOption.text;
  }

  return displayAnswer(value);
}

interface QuizContextValue {
  total: number;
  results: Record<string, QuizResult>;
  activeQuizId: string | null;
  register: (id: string) => void;
  submit: (id: string, answer: number, localCorrect?: boolean | null) => void;
  advance: (id: string) => void;
  isLast: (id: string) => boolean;
  position: (id: string) => number;
  reset: () => void;
  summary: QuizAttemptDetail | null;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizResultsProvider({
  children,
  total,
  tutorialId,
  scope,
  scopeId,
}: {
  children: React.ReactNode;
  total: number;
  tutorialId?: string;
  scope?: QuizScope;
  scopeId?: string;
}) {
  const [results, setResults] = useState<Record<string, QuizResult>>({});
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizIds, setQuizIds] = useState<string[]>([]);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [summary, setSummary] = useState<QuizAttemptDetail | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [startAttempt] = useStartQuizAttemptMutation();
  const [submitAttempt] = useSubmitQuizAttemptMutation();
  const answered = Object.keys(results).length;
  const correct = Object.values(results).filter(
    (result) => result.correct,
  ).length;
  const complete = total > 0 && answered === total;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  async function submitAnswer(
    id: string,
    answer: number,
    localCorrect: boolean | null = null,
  ) {
    const nextAnswers = { ...answers, [id]: answer };
    setAnswers(nextAnswers);

    // Show this question's correct/incorrect feedback the moment it's
    // submitted, instead of waiting for the whole set to be graded —
    // advancing to the next question is a separate, explicit step (see
    // advanceToNext) so the learner actually gets to see the result first.
    setResults((current) => ({ ...current, [id]: { correct: localCorrect } }));

    const lastQuestion = quizIds[quizIds.length - 1] === id;
    if (!lastQuestion || !tutorialId || !scope || !scopeId) return;

    try {
      const activeAttemptId =
        attemptId ??
        (await startAttempt({ tutorialId, scope, scopeId }).unwrap()).data.id;
      if (!attemptId) setAttemptId(activeAttemptId);

      const response = await submitAttempt({
        tutorialId,
        scope,
        scopeId,
        attemptId: activeAttemptId,
        answers: Object.entries(nextAnswers).map(([blockId, value]) => ({
          blockId,
          answer: value,
        })),
      }).unwrap();
      const backendResults = Object.fromEntries(
        (response.data.answers ?? []).map((item) => [
          item.blockId,
          { correct: item.correct },
        ]),
      );
      setResults(backendResults);
      setSummary(response.data);
    } catch {
      // Keep the local feedback already shown when the attempt service is unavailable.
    }
  }

  function advanceToNext(id: string) {
    setActiveQuizId(quizIds[quizIds.indexOf(id) + 1] ?? null);
  }

  function reset() {
    setResults({});
    setAnswers({});
    setAttemptId(null);
    setSummary(null);
    setShowReview(false);
    window.location.reload();
  }

  return (
    <QuizContext.Provider
      value={{
        total,
        results,
        activeQuizId,
        register: (id) => {
          setQuizIds((current) => {
            if (current.includes(id)) return current;
            const next = [...current, id];
            setActiveQuizId((active) => active ?? id);
            return next;
          });
        },
        submit: submitAnswer,
        advance: advanceToNext,
        isLast: (id) => quizIds[quizIds.length - 1] === id,
        position: (id) => quizIds.indexOf(id) + 1,
        reset,
        summary,
      }}
    >
      {complete ? (
        <section className="mt-10 rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-sm dark:border-emerald-900 dark:bg-slate-900">
          <h2 className="font-khmer text-4xl font-bold text-[#002455] dark:text-white">
            លទ្ធផល
          </h2>
          <p className="mt-4 font-khmer text-xl text-slate-700 dark:text-slate-200">
            ឆ្លើយត្រូវ {correct} ក្នុងចំណោម {total} សំណួរ
          </p>
          <p className="mt-2 text-3xl font-black text-emerald-600">
            {percent}%
          </p>
          {summary?.xpEarned !== undefined && (
            <p className="mt-3 font-khmer text-xl font-bold text-amber-600">
              +{summary.xpEarned} XP
            </p>
          )}
          <p className="mt-2 font-khmer text-lg text-slate-600 dark:text-slate-300">
            {percent >= 80
              ? "ល្អណាស់!"
              : percent >= 50
                ? "ធ្វើបានល្អ សូមបន្តអនុវត្ត។"
                : "សូមរៀនបន្ថែម ហើយសាកល្បងម្ដងទៀត។"}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowReview((value) => !value)}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-khmer text-lg font-bold text-white hover:bg-emerald-700"
            >
              {showReview ? "លាក់ចម្លើយ" : "ពិនិត្យចម្លើយ"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-blue-600 px-5 py-3 font-khmer text-lg font-bold text-white hover:bg-blue-700"
            >
              សាកល្បងម្ដងទៀត
            </button>
          </div>

          {showReview && summary?.answers && summary.answers.length > 0 && (
            <div className="mt-8 space-y-3 text-left">
              <h3 className="font-khmer text-2xl font-bold text-[#002455] dark:text-white">
                ប្រវត្តិចម្លើយ
              </h3>
              {summary.answers.map((answer, index) => (
                <div
                  key={answer.blockId}
                  className={`rounded-xl border p-4 ${answer.correct ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900 dark:bg-emerald-950/20" : "border-red-200 bg-red-50/70 dark:border-red-900 dark:bg-red-950/20"}`}
                >
                  <p className="font-khmer text-lg font-bold">
                    សំណួរ {index + 1} —{" "}
                    {answer.correct ? "ត្រឹមត្រូវ" : "មិនត្រឹមត្រូវ"}
                  </p>
                  <p className="mt-1 font-khmer text-base">
                    ចម្លើយរបស់អ្នក៖{" "}
                    {displayQuizAnswer(
                      answer.submittedAnswer,
                      answer.questionData,
                    )}
                  </p>
                  {!answer.correct && (
                    <p className="mt-1 font-khmer text-base">
                      ចម្លើយត្រឹមត្រូវ៖{" "}
                      {displayQuizAnswer(
                        answer.correctAnswer,
                        answer.questionData,
                      )}
                    </p>
                  )}
                  {answer.explanation && (
                    <p className="mt-1 font-khmer text-base text-slate-600 dark:text-slate-300">
                      {answer.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        children
      )}
    </QuizContext.Provider>
  );
}

function stringValue(data: BlockData, ...keys: string[]): string {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function numberValue(data: BlockData, ...keys: string[]): number | undefined {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return undefined;
}

function answerTokenValue(data: BlockData, ...keys: string[]): string {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" || typeof value === "number")
      return String(value);
    if (value && typeof value === "object") {
      const record = value as Record<string, unknown>;
      const token =
        record.id ??
        record.optionId ??
        record.value ??
        record.text ??
        record.label;
      if (typeof token === "string" || typeof token === "number")
        return String(token);
    }
  }
  return "";
}

interface QuizOption {
  id: string;
  text: string;
  correct?: boolean;
}

function quizOptionsValue(data: BlockData): QuizOption[] {
  for (const key of ["options", "choices", "answers"]) {
    const value = data[key];
    if (!Array.isArray(value)) continue;

    return value.flatMap((option, index) => {
      if (typeof option === "string") {
        return [{ id: String(index), text: option }];
      }

      if (option && typeof option === "object") {
        const record = option as Record<string, unknown>;
        const text =
          record.text ??
          record.label ??
          record.value ??
          record.answer ??
          record.optionText ??
          record.content;
        if (typeof text !== "string" || !text.trim()) return [];
        return [
          {
            id: String(record.id ?? record.optionId ?? index),
            text: text.trim(),
            correct:
              record.correct === true ||
              record.isCorrect === true ||
              String(record.correct ?? record.isCorrect ?? "").toLowerCase() ===
                "true",
          },
        ];
      }

      return [];
    });
  }

  return [];
}

function stringArrayValue(data: BlockData, ...keys: string[]): string[] {
  for (const key of keys) {
    const value = data[key];

    if (!Array.isArray(value)) continue;

    const items = value.flatMap((item) => {
      if (typeof item === "string") return item.trim() ? [item] : [];

      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const text = record.text ?? record.label ?? record.value ?? record.content;
        return typeof text === "string" && text.trim() ? [text.trim()] : [];
      }

      return [];
    });

    if (items.length > 0) return items;
  }

  return [];
}

function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•·]|\d+[.)])\s+/, "").trim())
    .filter((line) => line.length > 0);
}

function normalizeType(type: string): string {
  return type.trim().toUpperCase();
}

// The admin content builder stores rich-text fields as HTML fragments — the
// B / I / <> toolbar wraps selections in <strong>/<em>/<code>. Render that small,
// fixed set of inline tags as real elements instead of leaking the literal tags
// into the page. Everything else is treated as plain text.
type InlineTag = "strong" | "em" | "code" | "u" | "s" | "mark";

const INLINE_TAGS: Record<string, InlineTag> = {
  strong: "strong",
  b: "strong",
  em: "em",
  i: "em",
  code: "code",
  u: "u",
  s: "s",
  strike: "s",
  del: "s",
  mark: "mark",
};

function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

function wrapInline(
  tag: InlineTag,
  children: React.ReactNode,
  key: string,
): React.ReactNode {
  if (tag === "code") {
    return (
      <code
        key={key}
        className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.9em] text-slate-800 dark:bg-slate-800 dark:text-slate-100"
      >
        {children}
      </code>
    );
  }

  const Tag = tag;
  return <Tag key={key}>{children}</Tag>;
}

function renderRichText(input: string): React.ReactNode {
  if (!input) return null;
  if (!input.includes("<") && !input.includes("&")) return input;

  const tagPattern = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*?(\/?)>/g;
  type Frame = { tag: InlineTag | null; children: React.ReactNode[] };
  const root: Frame = { tag: null, children: [] };
  const stack: Frame[] = [root];
  let cursor = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  const pushText = (text: string) => {
    if (text) stack[stack.length - 1].children.push(decodeEntities(text));
  };

  const closeFrame = (frame: Frame) => {
    stack[stack.length - 1].children.push(
      wrapInline(frame.tag as InlineTag, frame.children, `rt-${key++}`),
    );
  };

  while ((match = tagPattern.exec(input)) !== null) {
    pushText(input.slice(cursor, match.index));
    cursor = tagPattern.lastIndex;

    const rawTag = match[2].toLowerCase();
    const closing = match[1] === "/";
    const selfClosing = match[3] === "/" || rawTag === "br";

    if (rawTag === "br") {
      stack[stack.length - 1].children.push(<br key={`br-${key++}`} />);
      continue;
    }

    const tag = INLINE_TAGS[rawTag];
    if (!tag || selfClosing) continue; // drop unknown tags, keep their text

    if (!closing) {
      stack.push({ tag, children: [] });
      continue;
    }

    let target = -1;
    for (let i = stack.length - 1; i > 0; i--) {
      if (stack[i].tag === tag) {
        target = i;
        break;
      }
    }
    if (target === -1) continue; // stray closing tag

    // Close any still-open inner tags first, then the matched one — each
    // frame renders into what becomes its parent once popped.
    while (stack.length - 1 >= target) {
      closeFrame(stack.pop() as Frame);
    }
  }

  pushText(input.slice(cursor));

  while (stack.length > 1) {
    closeFrame(stack.pop() as Frame);
  }

  return root.children;
}

function HeadingBlock({ data, type }: { data: BlockData; type: string }) {
  const text = stringValue(data, "text", "content", "title", "heading");
  const requestedLevel = numberValue(data, "level", "headingLevel");
  const level =
    requestedLevel ??
    (type === "H1" || type === "TITLE"
      ? 1
      : type === "H3" || type === "SUBHEADER" || type === "SUBHEADING"
        ? 3
        : 2);

  if (!text) return null;

  if (level === 1) {
    return (
      <h2 className="font-khmer text-balance text-3xl font-bold tracking-tight text-blue-600 sm:text-[2rem] dark:text-blue-400">
        {renderRichText(text)}
      </h2>
    );
  }

  if (level >= 3) {
    return (
      <h3 className="font-khmer text-balance text-xl font-bold leading-8 text-blue-600 sm:text-2xl dark:text-blue-400">
        {renderRichText(text)}
      </h3>
    );
  }

  return (
    <div className="pt-2">
      <div className="mb-3 h-1 w-9 rounded-full bg-[#002455]/90 dark:bg-blue-400" />
      <h2 className="font-khmer text-balance text-2xl font-bold leading-tight tracking-tight text-blue-600 sm:text-[1.75rem] dark:text-blue-400">
        {renderRichText(text)}
      </h2>
    </div>
  );
}

function ParagraphBlock({ data }: { data: BlockData }) {
  const text = stringValue(data, "text", "content", "description");

  if (!text) return null;

  return (
    <p className="font-khmer whitespace-pre-line text-lg leading-9 text-slate-800 dark:text-slate-200">
      {renderRichText(text)}
    </p>
  );
}

function CodeBlock({ data }: { data: BlockData }) {
  const [copied, setCopied] = useState(false);
  const code = stringValue(data, "code", "text", "content");
  const declaredLanguage = stringValue(data, "language", "lang") || "code";
  const language = detectLanguageFromCode(code, declaredLanguage);
  const fileName = stringValue(data, "fileName", "filename", "title");
  const canTryInPlayground = isPlaygroundLanguageSupported(language);

  async function copyCode() {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  function tryCodeInPlayground() {
    if (!code) return;

    try {
      window.sessionStorage.setItem(
        "sastra-playground-example",
        JSON.stringify({ code, language }),
      );
    } catch {
      // The editor can still be opened if browser storage is unavailable.
    }

    window.location.assign("/playground/editor?example=lesson");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-[#0b1220]">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 sm:px-5 dark:border-white/10 dark:bg-white/[0.035]">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex shrink-0 items-center gap-1.5"
            aria-hidden="true"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10" />

          <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Code2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{fileName || language}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.09] dark:hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Clipboard className="h-3.5 w-3.5" />
          )}
          <span className="hidden sm:inline">
            {copied ? "បានចម្លង" : "ចម្លង"}
          </span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <pre className="min-w-max p-5 font-mono text-[13.5px] leading-7 sm:p-6 sm:text-[14px]">
          <code>{highlightCode(code || "// No code yet")}</code>
        </pre>
      </div>

      {code && canTryInPlayground && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.025] sm:px-5">
          <button
            type="button"
            onClick={tryCodeInPlayground}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-[#0b1220]"
          >
            <Play className="h-4 w-4" />
            Try it with AI
          </button>
        </div>
      )}
    </div>
  );
}

const CALLOUT_CONFIG: Record<
  CalloutTone,
  {
    label: string;
    icon: typeof Info;
    wrapper: string;
    iconClass: string;
    titleClass: string;
  }
> = {
  INFO: {
    label: "ចំណាំ",
    icon: Info,
    wrapper:
      "border-blue-200 bg-blue-50/70 dark:border-blue-900/60 dark:bg-blue-950/25",
    iconClass:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
    titleClass: "text-blue-900 dark:text-blue-200",
  },
  TIP: {
    label: "គន្លឹះ",
    icon: Lightbulb,
    wrapper:
      "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/25",
    iconClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
    titleClass: "text-emerald-900 dark:text-emerald-200",
  },
  WARNING: {
    label: "ប្រុងប្រយ័ត្ន",
    icon: TriangleAlert,
    wrapper:
      "border-amber-200 bg-amber-50/70 dark:border-amber-900/60 dark:bg-amber-950/25",
    iconClass:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",
    titleClass: "text-amber-900 dark:text-amber-200",
  },
  SUCCESS: {
    label: "ល្អណាស់",
    icon: CircleCheck,
    wrapper:
      "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/25",
    iconClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
    titleClass: "text-emerald-900 dark:text-emerald-200",
  },
  DANGER: {
    label: "សំខាន់",
    icon: CircleAlert,
    wrapper:
      "border-red-200 bg-red-50/70 dark:border-red-900/60 dark:bg-red-950/25",
    iconClass: "bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-300",
    titleClass: "text-red-900 dark:text-red-200",
  },
  NOTE: {
    label: "ចំណាំ",
    icon: Info,
    wrapper:
      "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60",
    iconClass:
      "bg-white text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300",
    titleClass: "text-slate-900 dark:text-slate-100",
  },
};

function CalloutBlock({
  data,
  quote = false,
}: {
  data: BlockData;
  quote?: boolean;
}) {
  const text = stringValue(data, "text", "content", "description");

  if (!text) return null;

  if (quote) {
    const author = stringValue(data, "author", "source", "caption");

    return (
      <blockquote className="rounded-r-2xl border-l-4 border-[#002455] bg-slate-50 px-5 py-4 dark:border-blue-400 dark:bg-slate-900/60">
        <div className="flex gap-3">
          <Quote className="mt-0.5 h-5 w-5 shrink-0 text-[#002455]/70 dark:text-blue-400" />
          <div>
            <p className="font-khmer whitespace-pre-line text-[16px] leading-8 text-slate-700 dark:text-slate-300">
              {renderRichText(text)}
            </p>
            {author && (
              <footer className="font-khmer mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                — {author}
              </footer>
            )}
          </div>
        </div>
      </blockquote>
    );
  }

  const rawTone = stringValue(data, "tone", "variant", "kind").toUpperCase();
  const tone = (rawTone in CALLOUT_CONFIG ? rawTone : "INFO") as CalloutTone;
  const config = CALLOUT_CONFIG[tone];
  const Icon = config.icon;
  const customTitle = stringValue(data, "title", "label");

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${config.wrapper}`}>
      <div className="flex gap-3.5">
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0">
          <p className={`font-khmer text-sm font-bold ${config.titleClass}`}>
            {customTitle || config.label}
          </p>
          <p className="font-khmer mt-1 whitespace-pre-line text-[15px] leading-7 text-slate-700 dark:text-slate-300">
            {renderRichText(text)}
          </p>
        </div>
      </div>
    </div>
  );
}

function ImageBlock({ data }: { data: BlockData }) {
  const imageAsset = [data.image, data.file, data.media, data.asset].find(
    (value): value is Record<string, unknown> =>
      Boolean(value) && typeof value === "object",
  );
  const directSource =
    stringValue(
      data,
      "url",
      "src",
      "imageUrl",
      "fileUrl",
      "contentUrl",
      "path",
    ) ||
    (imageAsset
      ? stringValue(
          imageAsset,
          "url",
          "src",
          "imageUrl",
          "fileUrl",
          "contentUrl",
          "path",
        )
      : "");
  const fileId =
    stringValue(
      data,
      "imageFileId",
      "fileId",
      "imageId",
      "mediaId",
      "assetId",
    ) ||
    (imageAsset
      ? stringValue(
          imageAsset,
          "imageFileId",
          "fileId",
          "id",
          "imageId",
          "mediaId",
          "assetId",
        )
      : "");
  const src =
    directSource ||
    (fileId ? `/api/v1/files/${encodeURIComponent(fileId)}` : "");
  const alt = stringValue(data, "alt", "caption", "title") || "Lesson image";
  const caption = stringValue(data, "caption");

  if (!src) {
    return (
      <div className="flex min-h-44 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center dark:border-slate-700 dark:bg-slate-900/50">
        <div>
          <ImageIcon className="mx-auto h-6 w-6 text-slate-400" />
          <p className="font-khmer mt-2 text-sm text-slate-500 dark:text-slate-400">
            {alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      {/* Keeping <img> here avoids requiring Next.js remotePatterns for lesson media URLs. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-auto max-h-[42rem] w-full object-contain"
        loading="lazy"
      />
      {caption && (
        <figcaption className="font-khmer border-t border-slate-100 px-4 py-3 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function VideoBlock({ data }: { data: BlockData }) {
  const url = stringValue(
    data,
    "url",
    "videoUrl",
    "youtubeUrl",
    "src",
    "link",
    "href",
  );
  const title = stringValue(data, "title", "caption") || "មេរៀនវីដេអូ";

  return <VideoPlayer src={url || undefined} title={title} />;
}

function QuizBlock({ data, blockId }: { data: BlockData; blockId: string }) {
  const quizContext = useContext(QuizContext);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const question = stringValue(
    data,
    "question",
    "text",
    "title",
    "prompt",
    "quizTitle",
    "quizDescription",
  );
  const options = quizOptionsValue(data);
  const correctAnswer = answerTokenValue(
    data,
    "correctAnswer",
    "correctOption",
    "correctOptionId",
    "answer",
    "answerKey",
  );
  const correctIndex = numberValue(
    data,
    "correctIndex",
    "correctAnswerIndex",
    "correctOptionIndex",
    "correctChoiceIndex",
  );
  const correctAnswerNumber = numberValue(
    data,
    "correctAnswer",
    "correctOption",
    "answer",
    "answerKey",
  );
  const normalizedCorrectAnswer = correctAnswer.trim().toLocaleLowerCase();
  const letterCorrectOption = /^[a-z]$/i.test(correctAnswer)
    ? options[correctAnswer.toUpperCase().charCodeAt(0) - 65]
    : undefined;
  const correctOption =
    options.find((option) => option.correct) ??
    letterCorrectOption ??
    (correctIndex !== undefined
      ? (options[correctIndex] ?? options[correctIndex - 1])
      : undefined) ??
    (correctAnswerNumber !== undefined
      ? (options[correctAnswerNumber - 1] ?? options[correctAnswerNumber])
      : undefined) ??
    options.find(
      (option) =>
        option.id.trim().toLocaleLowerCase() === normalizedCorrectAnswer ||
        option.text.trim().toLocaleLowerCase() === normalizedCorrectAnswer,
    );
  const resolvedCorrectAnswer = correctOption?.id ?? "";
  const selectedOption = options.find((option) => option.id === selected);
  const backendResult = quizContext?.results[blockId];
  const selectedOptionIndex = selectedOption
    ? options.findIndex((option) => option.id === selectedOption.id)
    : -1;
  const isCorrectSelection = Boolean(
    selectedOption &&
    correctOption &&
    (selectedOption.id === correctOption.id ||
      selectedOption.text.trim().toLocaleLowerCase() ===
        correctOption.text.trim().toLocaleLowerCase() ||
      selectedOptionIndex ===
        options.findIndex((option) => option.id === correctOption.id) ||
      (correctIndex !== undefined && selectedOptionIndex === correctIndex) ||
      (correctAnswerNumber !== undefined &&
        selectedOptionIndex === correctAnswerNumber - 1)),
  );

  useEffect(() => {
    quizContext?.register(blockId);
  }, [blockId, quizContext]);

  function selectOption(option: string) {
    if (submitted) return;
    setSelected(option);
  }

  function submitAnswer() {
    if (!selected) return;
    setSubmitted(true);
    // The lesson content payload usually doesn't include the answer key (the
    // backend withholds it until the attempt is graded), so only report a
    // verdict when we actually resolved one — otherwise leave it pending
    // rather than falsely showing "incorrect".
    const verdict = resolvedCorrectAnswer ? isCorrectSelection : null;
    quizContext?.submit(blockId, selectedOptionIndex, verdict);
  }

  function goToNextQuestion() {
    quizContext?.advance(blockId);
  }

  if (!question) return null;
  if (quizContext?.activeQuizId && quizContext.activeQuizId !== blockId)
    return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#002455] text-white dark:bg-blue-500">
          <CircleHelp className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="font-khmer text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            សំណួរសាកល្បង
          </p>
          <p className="font-khmer mt-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
            សំណួរ {quizContext?.position(blockId) ?? 1} ក្នុងចំណោម{" "}
            {quizContext?.total ?? 1}
          </p>
          <p className="font-khmer mt-0.5 text-base font-bold text-slate-900 dark:text-slate-100">
            {question}
          </p>
        </div>
      </div>

      {options.length > 0 && (
        <div className="grid gap-2.5 p-4 sm:p-5">
          {options.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => selectOption(option.id)}
              className={`font-khmer flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-lg leading-7 transition ${
                backendResult?.correct === true &&
                option.id === resolvedCorrectAnswer
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300"
                  : backendResult?.correct === false &&
                      option.id === selected
                    ? "border-red-500 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                    : selected === option.id
                      ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:border-blue-400 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300"
              }`}
            >
              <span
                className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${selected === option.id ? "border-blue-600 bg-blue-600 ring-4 ring-blue-100" : "border-slate-300 bg-white"}`}
              />
              <span>{option.text}</span>
            </button>
          ))}
          {!submitted ? (
            <button
              type="button"
              onClick={submitAnswer}
              disabled={!selected}
              className="mt-2 w-fit rounded-xl bg-emerald-600 px-5 py-3 font-khmer text-lg font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              ដាក់ស្នើ
            </button>
          ) : backendResult ? (
            <div
              className={`mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 ${
                backendResult.correct === true
                  ? "border-emerald-200 bg-emerald-50/70 dark:border-emerald-900/60 dark:bg-emerald-950/25"
                  : backendResult.correct === false
                    ? "border-rose-200 bg-rose-50/70 dark:border-rose-900/60 dark:bg-rose-950/25"
                    : "border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/40"
              }`}
            >
              <p
                className={`font-khmer flex items-center gap-2 text-lg font-bold ${
                  backendResult.correct === true
                    ? "text-emerald-700 dark:text-emerald-300"
                    : backendResult.correct === false
                      ? "text-rose-700 dark:text-rose-300"
                      : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {backendResult.correct === true ? (
                  <CircleCheck className="h-5 w-5 shrink-0" />
                ) : backendResult.correct === false ? (
                  <CircleAlert className="h-5 w-5 shrink-0" />
                ) : (
                  <CircleHelp className="h-5 w-5 shrink-0" />
                )}
                {backendResult.correct === true
                  ? "ចម្លើយត្រឹមត្រូវ!"
                  : backendResult.correct === false
                    ? "ចម្លើយមិនត្រឹមត្រូវទេ។"
                    : "ចម្លើយត្រូវបានកត់ត្រា។ លទ្ធផលនឹងបង្ហាញនៅចុងបញ្ចប់។"}
              </p>

              {!quizContext?.isLast(blockId) && (
                <button
                  type="button"
                  onClick={goToNextQuestion}
                  className="font-khmer rounded-lg bg-[#002455] px-4 py-2 text-sm font-bold text-white hover:bg-[#00346f] dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  សំណួរបន្ទាប់ »
                </button>
              )}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}

function ListBlock({
  data,
  ordered = false,
}: {
  data: BlockData;
  ordered?: boolean;
}) {
  // POINT / bullet blocks authored in the admin content builder store their
  // content as a single multi-line string (one bullet per line), not an array.
  // Fall back to splitting that string so those blocks preview on the reader.
  const arrayItems = stringArrayValue(
    data,
    "items",
    "values",
    "list",
    "points",
    "bullets",
  );
  const items =
    arrayItems.length > 0
      ? arrayItems
      : splitLines(
          stringValue(data, "text", "content", "value", "body", "items", "list"),
        );

  if (items.length === 0) return null;

  const ListTag = ordered ? "ol" : "ul";

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#002455] dark:text-blue-300">
        <ListChecks className="h-4 w-4" />
        <span className="font-khmer">ចំណុចសំខាន់ៗ</span>
      </div>
      <ListTag
        className={`font-khmer space-y-2 pl-5 text-lg leading-8 text-slate-700 dark:text-slate-300 ${
          ordered ? "list-decimal" : "list-disc"
        }`}
      >
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="pl-1 marker:text-[#002455] dark:marker:text-blue-400"
          >
            {renderRichText(item)}
          </li>
        ))}
      </ListTag>
    </div>
  );
}

interface Flashcard {
  front: string;
  back: string;
}

const FLASHCARD_FRONT_KEYS = [
  "front",
  "question",
  "term",
  "prompt",
  "title",
  "heading",
  "text",
  "content",
  "value",
  "html",
  "body",
  "markdown",
];

const FLASHCARD_BACK_KEYS = [
  "back",
  "answer",
  "definition",
  "explanation",
  "description",
  "detail",
  "details",
  "content",
  "value",
  "html",
  "body",
];

function collectStrings(value: unknown, depth = 0): string[] {
  if (typeof value === "string") return value.trim() ? [value.trim()] : [];
  if (depth > 2 || !value || typeof value !== "object") return [];
  if (Array.isArray(value)) {
    return value.flatMap((entry) => collectStrings(entry, depth + 1));
  }
  return Object.values(value as Record<string, unknown>).flatMap((entry) =>
    collectStrings(entry, depth + 1),
  );
}

function cardFromRecord(record: BlockData): Flashcard | null {
  const front = stringValue(record, ...FLASHCARD_FRONT_KEYS);
  const back = stringValue(record, ...FLASHCARD_BACK_KEYS);
  // `content`/`value` appear in both key lists — don't show the same string on
  // both sides.
  const cleanBack = back && back !== front ? back : "";
  if (front || cleanBack) return { front, back: cleanBack };

  // Last resort: any strings we can find inside this entry.
  const strings = collectStrings(record);
  if (strings.length === 0) return null;
  return { front: strings[0], back: strings[1] ?? "" };
}

function flashcardsValue(data: BlockData): Flashcard[] {
  for (const key of [
    "cards",
    "flashcards",
    "flashCards",
    "items",
    "pairs",
    "list",
    "entries",
  ]) {
    const value = data[key];
    if (!Array.isArray(value)) continue;

    const cards = value.flatMap((entry) => {
      if (typeof entry === "string") {
        return entry.trim() ? [{ front: entry.trim(), back: "" }] : [];
      }
      if (!entry || typeof entry !== "object") return [];
      const card = cardFromRecord(entry as BlockData);
      return card ? [card] : [];
    });

    if (cards.length > 0) return cards;
  }

  // A single flashcard stored as flat keys on the block itself.
  const single = cardFromRecord(data);
  return single ? [single] : [];
}

function FlashcardBlock({ data }: { data: BlockData }) {
  const parsed = flashcardsValue(data);
  const cards: Flashcard[] =
    parsed.length > 0
      ? parsed
      : collectStrings(data).slice(0, 1).map((text) => ({ front: text, back: "" }));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (cards.length === 0) return null;

  const total = cards.length;
  const card = cards[Math.min(index, total - 1)];
  const multiple = total > 1;
  const twoSided = Boolean(card.front && card.back);
  const showingBack = twoSided && flipped;
  const bodyText = showingBack ? card.back : card.front || card.back;

  function goTo(next: number) {
    setFlipped(false);
    setIndex(((next % total) + total) % total);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mb-3 flex items-center justify-between gap-2 text-sm font-bold text-[#002455] dark:text-blue-300">
        <span className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          <span className="font-khmer">កាតរំលឹក</span>
        </span>
        {multiple && (
          <span className="font-khmer text-xs font-semibold text-slate-500 dark:text-slate-400">
            {index + 1} / {total}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => twoSided && setFlipped((value) => !value)}
        className="flex min-h-48 w-full flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm transition hover:border-blue-400 dark:border-slate-800 dark:bg-slate-950/50"
        aria-label={twoSided ? "Flip flashcard" : undefined}
      >
        {twoSided && (
          <span className="font-khmer text-xs font-semibold uppercase tracking-wide text-slate-400">
            {showingBack ? "ចម្លើយ" : "សំណួរ"}
          </span>
        )}
        <span className="font-khmer text-balance whitespace-pre-line text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
          {renderRichText(bodyText) || "—"}
        </span>
        {twoSided && (
          <span className="font-khmer inline-flex items-center gap-1.5 text-xs text-slate-400">
            <RefreshCw className="h-3.5 w-3.5" />
            ចុចដើម្បីត្រឡប់
          </span>
        )}
      </button>

      {multiple && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="font-khmer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300"
          >
            « មុន
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="font-khmer rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-400 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300"
          >
            បន្ទាប់ »
          </button>
        </div>
      )}
    </div>
  );
}

function UnknownBlock({ block }: { block: TutorialBlock }) {
  const data = block.data ?? {};
  const normalized = normalizeType(block.type);

  if (normalized.includes("FLASH") || flashcardsValue(data).length > 0) {
    return <FlashcardBlock data={data} />;
  }

  const text = stringValue(data, "text", "content", "title", "description");
  if (text) {
    return <ParagraphBlock data={data} />;
  }

  // Whatever this block is, if it carries readable text, show it rather than
  // rendering nothing.
  const strings = collectStrings(data);
  if (strings.length > 0) {
    return (
      <p className="font-khmer whitespace-pre-line text-lg leading-9 text-slate-800 dark:text-slate-200">
        {renderRichText(strings.join("\n\n"))}
      </p>
    );
  }

  return null;
}

export default function LessonBlockRenderer({
  block,
}: LessonBlockRendererProps) {
  const data = block.data ?? {};
  const type = normalizeType(block.type);

  switch (type) {
    case "HEADING":
    case "TITLE":
    case "H1":
    case "H2":
    case "H3":
    case "HEADER":
    case "SUBHEADER":
    case "SUBHEADING":
    case "SECTION_HEADING":
      return <HeadingBlock data={data} type={type} />;

    case "PARAGRAPH":
    case "TEXT":
    case "RICH_TEXT":
      return <ParagraphBlock data={data} />;

    case "CODE":
    case "CODE_BLOCK":
      return <CodeBlock data={data} />;

    case "CALLOUT":
    case "INFO_BOX":
      return <CalloutBlock data={data} />;

    case "QUOTE":
      return <CalloutBlock data={data} quote />;

    case "IMAGE":
      return <ImageBlock data={data} />;

    case "VIDEO":
    case "YOUTUBE":
    case "YOUTUBE_VIDEO":
      return <VideoBlock data={data} />;

    case "QUIZ":
      return <QuizBlock data={data} blockId={block.id} />;

    case "FLASHCARD":
    case "FLASH_CARD":
    case "FLASHCARDS":
    case "FLASH_CARDS":
      return <FlashcardBlock data={data} />;

    case "LIST":
    case "BULLET_LIST":
    case "UNORDERED_LIST":
    case "POINT":
    case "POINTS":
    case "BULLET_POINT":
    case "BULLET_POINTS":
      return <ListBlock data={data} />;

    case "ORDERED_LIST":
    case "NUMBERED_LIST":
      return <ListBlock data={data} ordered />;

    case "DIVIDER":
    case "SEPARATOR":
      return <hr className="my-2 border-slate-200 dark:border-slate-800" />;

    default:
      return <UnknownBlock block={block} />;
  }
}
