import { sastraApi } from "./sastra-code";

import type {
  TranslateRequest,
  TranslateResponse,
  TranslationApiResponse,
} from "@/types/api/translation";

/**
 * Dynamic educational-content translation, served entirely by the backend
 * `TranslationService` (Gemini + technical-term/markdown protection +
 * persistent, content-hashed cache). The frontend never calls Gemini and
 * keeps no persistent translation cache of its own — RTK Query's in-memory
 * cache only dedupes identical requests within a session.
 *
 * Modelled as a `query` (not a mutation) even though the HTTP verb is POST:
 * the call is idempotent, cacheable, and we want RTK Query to reuse the
 * result for the same `{ text, sourceLanguage, targetLanguage }` across every
 * component and re-render (see `useContentTranslation`).
 */
export const translationApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    translateContent: builder.query<TranslateResponse, TranslateRequest>({
      query: (body) => ({
        url: "/v1/translations",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
      transformResponse: (response: TranslationApiResponse<TranslateResponse>) =>
        response.data,
      // The backend is the source of truth and already persists translations;
      // hold the in-memory copy for an hour so language toggling back and forth
      // on the same page is instant and makes no extra request.
      keepUnusedDataFor: 3600,
    }),
  }),
  overrideExisting: false,
});

export const { useTranslateContentQuery } = translationApi;
