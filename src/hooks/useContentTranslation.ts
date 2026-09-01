"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";

import { useLanguage } from "@/lib/language-context";
import { useTranslateContentQuery } from "@/redux/api/translation-api";
import type { TranslationLang } from "@/types/api/translation";

/** Backend `TranslateRequest.text` hard limit. */
const MAX_TEXT_LENGTH = 20000;

/** Unicode block for the Khmer script (U+1780–U+17FF). */
const KHMER_SCRIPT_PATTERN = /[ក-៿]/;

/**
 * Guess a piece of content's language from its script, since no content
 * entity in the API carries a language field. Mixed content (e.g. a Khmer
 * course title containing an English product name, "វគ្គសិក្សា Javascript")
 * is classified by the presence of *any* Khmer script, which is what the
 * backend actually needs to know to pick the right translation direction.
 */
function detectLanguage(text: string): TranslationLang {
  return KHMER_SCRIPT_PATTERN.test(text) ? "km" : "en";
}

interface Options {
  /**
   * Original language of the content when it is actually known. No content
   * entity in the API carries a language field, so callers normally omit
   * this and we detect it from the text's script instead — assuming the
   * *opposite* of the current UI locale is wrong whenever the content
   * happens to already be authored in the UI's language (the common case
   * for this app, since Khmer is the default locale and most content is
   * Khmer): it would ask the backend to translate already-Khmer text *from*
   * English, which the provider rejects as a nonsensical pair.
   */
  sourceLanguage?: TranslationLang;
  /** Set to `false` to bypass translation and always return the original. */
  enabled?: boolean;
}

interface Result {
  /** Translated text, or the original while loading / on failure / when off. */
  text: string;
  /** A translation request is in flight; keep showing `text` (the original). */
  isTranslating: boolean;
  isError: boolean;
  /** `text` is the backend translation rather than the original string. */
  isTranslated: boolean;
}

/**
 * Translate one piece of dynamic educational content (course title, course
 * description, lesson/video text, …) into the current UI language via the
 * backend Translation API.
 *
 * Behaviour:
 *  - target language = current UI locale (`km` | `en`).
 *  - source language = `sourceLanguage` if given, else detected from the
 *    text's script (`detectLanguage`).
 *  - no request when: signed out, empty text, text over the 20k limit, the
 *    resolved pair is not distinct, or `enabled === false`.
 *  - while loading or after an error the original text is returned, so the
 *    page never blanks out or crashes (fallback-first).
 *  - RTK Query caches by request args, so repeated renders and toggling the
 *    language back and forth issue no duplicate calls.
 */
export function useContentTranslation(
  original: string | null | undefined,
  { sourceLanguage, enabled = true }: Options = {},
): Result {
  const { lang } = useLanguage();
  const { status } = useSession();

  const targetLanguage = lang as TranslationLang;
  const text = typeof original === "string" ? original : "";
  const resolvedSource: TranslationLang = sourceLanguage ?? detectLanguage(text);

  const shouldTranslate =
    enabled &&
    status === "authenticated" &&
    text.trim().length > 0 &&
    text.length <= MAX_TEXT_LENGTH &&
    resolvedSource !== targetLanguage;

  const { data, isFetching, isError } = useTranslateContentQuery(
    {
      text,
      sourceLanguage: resolvedSource,
      targetLanguage,
    },
    { skip: !shouldTranslate },
  );

  return useMemo<Result>(() => {
    if (!shouldTranslate) {
      return { text, isTranslating: false, isError: false, isTranslated: false };
    }
    if (data?.translatedText) {
      return {
        text: data.translatedText,
        isTranslating: false,
        isError: false,
        isTranslated: true,
      };
    }
    return { text, isTranslating: isFetching, isError, isTranslated: false };
  }, [shouldTranslate, data, isFetching, isError, text]);
}
