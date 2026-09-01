// Backend AI translation contract.
// Source: https://api.sastracode.tech/v3/api-docs — POST /api/v1/translations
// (tag "Translation"). The backend owns Gemini access, technical-term /
// markdown / URL protection, and the persistent translation cache. The
// frontend only sends text + language pair and renders `translatedText`.

export type TranslationLang = "en" | "km";

export interface TranslateRequest {
  /** 0–20000 chars (backend `TranslateRequest.text`). */
  text: string;
  sourceLanguage: TranslationLang;
  targetLanguage: TranslationLang;
  /**
   * Optional hint asserting the caller believes the pair is distinct. Not
   * required by the backend and not sent by `useContentTranslation` — the
   * frontend already only calls this endpoint when source/target differ, so
   * the hint would be redundant. Kept here only because the backend schema
   * documents it as a legal (optional) field.
   */
  languagePairDistinct?: boolean;
}

export interface TranslateResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

/** Standard Spring `ApiResponse<T>` envelope used by the Translation controller. */
export interface TranslationApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}
