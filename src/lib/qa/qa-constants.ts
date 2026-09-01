export const QUESTION_PAGE_SIZE = 10;
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
