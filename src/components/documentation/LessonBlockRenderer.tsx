"use client";

import type { TutorialBlock } from "@/types/tutorial-reader";

function getString(data: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = data[key];

    if (typeof value === "string") {
      return value;
    }
  }

  return "";
}

function RichContent({ html }: { html: string }) {
  return (
    <div
      className="
        max-w-none text-[18px] leading-8 text-slate-800
        [&_a]:font-medium [&_a]:text-blue-700 [&_a]:underline
        [&_li]:text-slate-800 [&_p]:text-slate-800
        [&_strong]:font-bold [&_strong]:text-slate-950
        dark:text-slate-200 dark:[&_a]:text-blue-400
        dark:[&_li]:text-slate-200 dark:[&_p]:text-slate-200
        dark:[&_strong]:text-white
      "
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}

export default function LessonBlockRenderer({
  block,
}: {
  block: TutorialBlock;
}) {
  const type = block.type.toUpperCase();

  const data = block.data ?? {};

  const text = getString(data, ["text", "content", "description", "title"]);

  const code = getString(data, ["code", "content", "text"]);

  /*
   * Heading
   */
  if (
    type.includes("HEADING") ||
    type.includes("TITLE") ||
    type === "H1" ||
    type === "H2" ||
    type === "H3"
  ) {
    if (!text) {
      return null;
    }

    return (
      <h2
        className="scroll-mt-28 pt-3 text-2xl font-bold tracking-tight text-primary-color dark:text-white"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    );
  }

  /*
   * Code
   */
  if (type.includes("CODE")) {
    if (!code) {
      return null;
    }

    const language = typeof data.language === "string" ? data.language : "";

    return (
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1220] shadow-sm">
        {language && (
          <div className="border-b border-slate-800 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {language}
          </div>
        )}

        <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-100">
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  /*
   * Quote
   */
  if (type.includes("QUOTE") || type.includes("CALLOUT")) {
    if (!text) {
      return null;
    }

    return (
      <blockquote className="rounded-r-2xl border-l-4 border-blue-500 bg-blue-50 px-6 py-5 text-[18px] leading-8 text-slate-800 dark:bg-blue-950/20 dark:text-slate-200">
        <RichContent html={text} />
      </blockquote>
    );
  }

  /*
   * List support
   */
  if (Array.isArray(data.items)) {
    return (
      <ul className="space-y-2 pl-6 text-[18px] leading-8 text-slate-800 dark:text-slate-200">
        {data.items.map((item, index) => (
          <li key={index} className="list-disc">
            {String(item)}
          </li>
        ))}
      </ul>
    );
  }

  /*
   * Normal paragraph/rich text
   */
  if (!text) {
    return null;
  }

  return <RichContent html={text} />;
}
