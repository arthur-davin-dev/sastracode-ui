"use client";

import type { ElementType } from "react";

import { useContentTranslation } from "@/hooks/useContentTranslation";
import type { TranslationLang } from "@/types/api/translation";

interface TranslatedTextProps {
  /** The original dynamic string (course title, description, …). */
  children: string | null | undefined;
  /** Element to render as. Defaults to a `<span>`. */
  as?: ElementType;
  className?: string;
  /** Known original language; omit to assume the opposite of the UI locale. */
  sourceLanguage?: TranslationLang;
  /** Set `false` to render the original untouched. */
  enabled?: boolean;
}

/**
 * Drop-in wrapper that shows the backend translation of `children` in the
 * current UI language. While the translation loads it keeps the original text
 * visible and only dims it slightly (Phase 18 — non-intrusive). On failure it
 * silently falls back to the original (Phase 19).
 */
export function TranslatedText({
  children,
  as: Tag = "span",
  className,
  sourceLanguage,
  enabled,
}: TranslatedTextProps) {
  const { text, isTranslating } = useContentTranslation(children, {
    sourceLanguage,
    enabled,
  });

  return (
    <Tag
      className={className}
      data-translating={isTranslating || undefined}
      style={isTranslating ? { opacity: 0.6, transition: "opacity 150ms" } : undefined}
    >
      {text}
    </Tag>
  );
}
