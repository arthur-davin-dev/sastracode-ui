export const QUESTION_PAGE_SIZE = 10;
/**
 * How many recent questions to scan when resolving a `?question=<id>` deep link
 * to the page it lives on. Covers `DEEPLINK_LOOKUP_SIZE / QUESTION_PAGE_SIZE`
 * pages; a target older than this falls back to the normal (un-scrolled) view.
 */
export const DEEPLINK_LOOKUP_SIZE = 50;
export const DEFAULT_QUESTION_QUERY = {
  resolved: undefined,
  sort: "newest" as const,
  page: 0,
  size: QUESTION_PAGE_SIZE,
};

export const ANSWER_PAGE_SIZE = 10;
export const DEFAULT_ANSWER_QUERY = {
  sort: "newest" as const,
  page: 0,
  size: ANSWER_PAGE_SIZE,
};
