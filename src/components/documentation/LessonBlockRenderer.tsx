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
  Lightbulb,
  ListChecks,
  Quote,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";

import type { TutorialBlock } from "@/types/tutorial-reader";

interface LessonBlockRendererProps {
  block: TutorialBlock;
}

type BlockData = Record<string, unknown>;

type CalloutTone = "INFO" | "TIP" | "WARNING" | "SUCCESS" | "DANGER" | "NOTE";

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
  }

  return undefined;
}

function stringArrayValue(data: BlockData, ...keys: string[]): string[] {
  for (const key of keys) {
    const value = data[key];

    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === "string");
    }
  }

  return [];
}

function normalizeType(type: string): string {
  return type.trim().toUpperCase();
}

function HeadingBlock({ data, type }: { data: BlockData; type: string }) {
  const text = stringValue(data, "text", "content", "title", "heading");
  const requestedLevel = numberValue(data, "level", "headingLevel");
  const level =
    requestedLevel ??
    (type === "H1" ? 1 : type === "H3" ? 3 : type === "H2" ? 2 : 2);

  if (!text) return null;

  if (level === 1) {
    return (
      <h2 className="font-khmer text-balance text-3xl font-bold tracking-tight text-blue-600 sm:text-[2rem] dark:text-blue-400">
        {text}
      </h2>
    );
  }

  if (level >= 3) {
    return (
      <h3 className="font-khmer text-balance text-xl font-bold leading-8 text-blue-600 sm:text-2xl dark:text-blue-400">
        {text}
      </h3>
    );
  }

  return (
    <div className="pt-2">
      <div className="mb-3 h-1 w-9 rounded-full bg-[#002455]/90 dark:bg-blue-400" />
      <h2 className="font-khmer text-balance text-2xl font-bold leading-tight tracking-tight text-blue-600 sm:text-[1.75rem] dark:text-blue-400">
        {text}
      </h2>
    </div>
  );
}

function ParagraphBlock({ data }: { data: BlockData }) {
  const text = stringValue(data, "text", "content", "description");

  if (!text) return null;

  return (
    <p className="font-khmer whitespace-pre-line text-lg leading-9 text-slate-800 dark:text-slate-200">
      {text}
    </p>
  );
}

function CodeBlock({ data }: { data: BlockData }) {
  const [copied, setCopied] = useState(false);
  const code = stringValue(data, "code", "text", "content");
  const language = stringValue(data, "language", "lang") || "code";
  const fileName = stringValue(data, "fileName", "filename", "title");

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

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800/90 bg-[#0b1220] shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035] px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex shrink-0 items-center gap-1.5"
            aria-hidden="true"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex min-w-0 items-center gap-2 text-xs font-medium text-slate-400">
            <Code2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{fileName || language}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.09] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/50"
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
        <pre className="min-w-max p-5 font-mono text-[13.5px] leading-7 text-slate-200 sm:p-6 sm:text-[14px]">
          <code>{code || "// No code yet"}</code>
        </pre>
      </div>
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
              {text}
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
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function ImageBlock({ data }: { data: BlockData }) {
  const src = stringValue(data, "url", "src", "imageUrl", "fileUrl");
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
    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Keeping <img> here avoids requiring Next.js remotePatterns for lesson media URLs. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-auto w-full object-cover"
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

function QuizBlock({ data }: { data: BlockData }) {
  const question = stringValue(data, "question", "text", "title");
  const options = stringArrayValue(data, "options", "choices", "answers");

  if (!question) return null;

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
          <p className="font-khmer mt-0.5 text-base font-bold text-slate-900 dark:text-slate-100">
            {question}
          </p>
        </div>
      </div>

      {options.length > 0 && (
        <div className="grid gap-2.5 p-4 sm:p-5">
          {options.map((option, index) => (
            <div
              key={`${option}-${index}`}
              className="font-khmer flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[15px] leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
            </div>
          ))}
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
  const items = stringArrayValue(data, "items", "values", "list");

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
            {item}
          </li>
        ))}
      </ListTag>
    </div>
  );
}

function UnknownBlock({ block }: { block: TutorialBlock }) {
  const data = block.data ?? {};
  const text = stringValue(data, "text", "content", "title", "description");

  if (text) {
    return <ParagraphBlock data={data} />;
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

    case "QUIZ":
      return <QuizBlock data={data} />;

    case "LIST":
    case "BULLET_LIST":
    case "UNORDERED_LIST":
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
