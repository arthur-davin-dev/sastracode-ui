import { sastraApi } from "@/redux/api/sastra-code";

export type ChallengeType =
  | "FILL_IN_BLANK"
  | "MULTIPLE_BLANKS"
  | "COMPLETE_FUNCTION"
  | "FIX_BUG"
  | "REPLACE_LINE"
  | "ARRANGE_BLOCKS"
  | "MATCH_CODE"
  | "STEP_BY_STEP"
  | "HTML_BUILDER"
  | "CSS_STYLING"
  | "JS_DOM";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type CodingTaskStatus =
  "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED" | "ARCHIVED";

export interface CodingTaskTestCase {
  id?: string;
  name?: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface CodingTaskConfig {
  language?: string;
  blankToken?: string;
  expectedAnswer?: string;

  testCases?: CodingTaskTestCase[];

  previewHtml?: string;
  instructions?: string[];

  [key: string]: unknown;
}

export interface CodingTaskSummary {
  id: string;
  title: string;
  slug: string;

  description?: string;

  challengeType: ChallengeType;
  difficulty: Difficulty;
  status: CodingTaskStatus;

  tutorialId?: string | null;
  sectionId?: string | null;
  subsectionId?: string | null;

  orderIndex?: number;
  playCount?: number;
}

export interface CodingTaskDetail extends CodingTaskSummary {
  description: string;

  starterCode: string;

  taskConfig?: CodingTaskConfig;

  createdAt?: string;
  updatedAt?: string;
}

export interface CodingTaskPage {
  content: CodingTaskSummary[];

  totalElements: number;
  totalPages: number;

  number: number;
  size: number;

  numberOfElements?: number;

  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

/* =========================
   RUN RESULT
========================= */

export interface CodingTaskRunResult {
  passed: boolean;

  testsPassed: number;
  testsTotal: number;

  output?: string;
}

/* =========================
   SUBMIT RESULT
========================= */

export interface CodingTaskSubmitResult extends CodingTaskRunResult {
  firstPass?: boolean;

  xpEarned?: number;

  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

/*
 * Optional aliases.
 *
 * This means both names work:
 *
 * CodeRunResult
 * CodingTaskRunResult
 */
export type CodeRunResult = CodingTaskRunResult;

export type CodeSubmitResult = CodingTaskSubmitResult;

/* =========================
   PROGRESS
========================= */

export interface CodingTaskProgress {
  status?: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

  attempts?: number;

  completedAt?: string | null;

  [key: string]: unknown;
}

/* =========================
   API RESPONSE
========================= */

interface ApiResponse<T> {
  success: boolean;

  message: string;

  data: T;

  timestamp: string;
}

function unwrap<T>(response: ApiResponse<T>): T {
  return response.data;
}

/* =========================
   API
========================= */

const codingTaskListTags = (result: CodingTaskSummary[] | undefined) => [
  { type: "CodingTask" as const, id: "LESSON" },
  ...(result ?? []).map((task) => ({ type: "CodingTask" as const, id: task.id })),
];

export const codingTaskPlayerApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================
         GET TASKS FOR A SECTION
      ========================= */

    getSectionCodingTasks: builder.query<
      CodingTaskSummary[],
      { tutorialId: string; sectionId: string }
    >({
      query: ({ tutorialId, sectionId }) => ({
        url: `v1/tutorials/${encodeURIComponent(tutorialId)}/sections/${encodeURIComponent(sectionId)}/coding-tasks`,
      }),
      transformResponse: (response: ApiResponse<CodingTaskSummary[]>) =>
        unwrap(response),
      providesTags: codingTaskListTags,
    }),

    /* =========================
         GET TASKS FOR A SUBSECTION
      ========================= */

    getSubsectionCodingTasks: builder.query<
      CodingTaskSummary[],
      { tutorialId: string; subsectionId: string }
    >({
      query: ({ tutorialId, subsectionId }) => ({
        url: `v1/tutorials/${encodeURIComponent(tutorialId)}/subsections/${encodeURIComponent(subsectionId)}/coding-tasks`,
      }),
      transformResponse: (response: ApiResponse<CodingTaskSummary[]>) =>
        unwrap(response),
      providesTags: codingTaskListTags,
    }),

    /* =========================
         GET ALL TASKS FOR A TUTORIAL
      ========================= */

    // Named distinctly from tutorial-api.ts's getTutorialCodingTasks (same
    // URL, but that one returns the raw un-unwrapped response and a
    // narrower CodingTaskSummary type without sectionId/subsectionId,
    // which the fallback logic below needs).
    getAllTutorialCodingTasks: builder.query<CodingTaskSummary[], string>({
      query: (tutorialId) => ({
        url: `v1/tutorials/${encodeURIComponent(tutorialId)}/coding-tasks`,
      }),
      transformResponse: (response: ApiResponse<CodingTaskSummary[]>) =>
        unwrap(response),
      providesTags: codingTaskListTags,
    }),

    /* =========================
         GET BY SLUG
      ========================= */

    getCodingTaskBySlug: builder.query<CodingTaskDetail, string>({
      query: (slug) => ({
        url: `v1/coding-tasks/${encodeURIComponent(slug)}`,
      }),

      transformResponse: (response: ApiResponse<CodingTaskDetail>) =>
        unwrap(response),

      providesTags: (result, _error, slug) => [
        {
          type: "CodingTask",

          id: result?.id ?? slug,
        },
      ],
    }),

    /* =========================
         RUN
      ========================= */

    runCodingTask: builder.mutation<
      CodingTaskRunResult,
      {
        id: string;
        code: string;
      }
    >({
      query: ({ id, code }) => ({
        url: `v1/coding-tasks/${encodeURIComponent(id)}/run`,

        method: "POST",

        body: {
          code,
        },
      }),

      transformResponse: (response: ApiResponse<CodingTaskRunResult>) =>
        unwrap(response),
    }),

    /* =========================
         SUBMIT
      ========================= */

    submitCodingTask: builder.mutation<
      CodingTaskSubmitResult,
      {
        id: string;
        code: string;
      }
    >({
      query: ({ id, code }) => ({
        url: `v1/coding-tasks/${encodeURIComponent(id)}/submit`,

        method: "POST",

        body: {
          code,
        },
      }),

      transformResponse: (response: ApiResponse<CodingTaskSubmitResult>) =>
        unwrap(response),

      invalidatesTags: (_result, _error, { id }) => [
        {
          type: "CodingTask",
          id,
        },

        {
          type: "CodingTask",
          id: `PROGRESS-${id}`,
        },
      ],
    }),

    /* =========================
         PROGRESS
      ========================= */

    getCodingTaskProgress: builder.query<CodingTaskProgress, string>({
      query: (id) => ({
        url: `v1/coding-tasks/${encodeURIComponent(id)}/status`,
      }),

      transformResponse: (response: ApiResponse<CodingTaskProgress>) =>
        unwrap(response),

      providesTags: (_result, _error, id) => [
        {
          type: "CodingTask",

          id: `PROGRESS-${id}`,
        },
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetSectionCodingTasksQuery,
  useGetSubsectionCodingTasksQuery,
  useGetAllTutorialCodingTasksQuery,
  useGetCodingTaskBySlugQuery,
  useRunCodingTaskMutation,
  useSubmitCodingTaskMutation,
  useGetCodingTaskProgressQuery,
} = codingTaskPlayerApi;
