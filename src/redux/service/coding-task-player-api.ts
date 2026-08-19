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
  | "DRAFT"
  | "IN_REVIEW"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";

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
   PARAMS
========================= */

export interface GetLessonCodingTasksArgs {
  tutorialId: string;

  sectionId?: string;
  subsectionId?: string;

  page?: number;
  size?: number;
}

/* =========================
   API
========================= */

export const codingTaskPlayerApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================
         GET TASKS FOR LESSON
      ========================= */

    getLessonCodingTasks: builder.query<
      CodingTaskPage,
      GetLessonCodingTasksArgs
    >({
      query: ({
        tutorialId,
        sectionId,
        subsectionId,
        page = 0,
        size = 50,
      }) => ({
        url: "v1/coding-tasks",

        params: {
          tutorialId,

          sectionId: sectionId || undefined,

          subsectionId: subsectionId || undefined,

          status: "PUBLISHED",

          page,

          size,

          sort: "orderIndex,asc",
        },
      }),

      transformResponse: (response: ApiResponse<CodingTaskPage>) =>
        unwrap(response),

      providesTags: (result) => [
        {
          type: "CodingTask",
          id: "LESSON",
        },

        ...(result?.content ?? []).map((task) => ({
          type: "CodingTask" as const,

          id: task.id,
        })),
      ],
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
  useGetLessonCodingTasksQuery,
  useGetCodingTaskBySlugQuery,
  useRunCodingTaskMutation,
  useSubmitCodingTaskMutation,
  useGetCodingTaskProgressQuery,
} = codingTaskPlayerApi;
