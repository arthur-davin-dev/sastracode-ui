// import { sastraApi } from "@/redux/api";

// import type {
//   ApiResponse,
//   CodeExecuteRequest,
//   CodeExecuteResponse,
// } from "@/types/playground";

// export const playgroundApi = sastraApi.injectEndpoints({
//   endpoints: (builder) => ({
//     executeCode: builder.mutation<CodeExecuteResponse, CodeExecuteRequest>({
//       query: (body) => ({
//         url: "/v1/code/execute",

//         method: "POST",

//         body,
//       }),

//       transformResponse: (response: ApiResponse<CodeExecuteResponse>) => {
//         return response.data;
//       },
//     }),
//   }),

//   overrideExisting: false,
// });

// export const { useExecuteCodeMutation } = playgroundApi;


import { sastraApi } from "@/redux/api";

import type {
  ApiResponse,
  CodeExecuteRequest,
  CodeExecuteResponse,
} from "@/types/playground";

export type AiExplainScope =
  | "LINE"
  | "SELECTION"
  | "FUNCTION"
  | "ALGORITHM";

export type AiExplainRequest = {
  code: string;
  language: string;
  scope: AiExplainScope;
};

export type AiExplainResponse = {
  language?: string;
  scope?: AiExplainScope;
  explanation?: string;
};

export type AiImproveRequest = {
  code: string;
  language: string;
};

export type AiImproveResponse = {
  language?: string;
  summary?: string;
  suggestions?: string[];
  improvedCode?: string;
};

export type AiHintRequest = {
  codingTaskId: string;
  currentCode: string;
  hintLevel?: number;
};

export type AiHintResponse = {
  codingTaskId?: string;
  hintLevel?: number;
  hint?: string;
  hintsUsed?: number;
  hintsRemainingUntilFixUnlocked?: number;
  fixUnlocked?: boolean;
};

export type AiHintStatusResponse = {
  codingTaskId?: string;
  hintsUsed?: number;
  requiredHints?: number;
  hintsRemaining?: number;
  fixUnlocked?: boolean;
  nextHintLevel?: number;
};

export type AiFixRequest = {
  codingTaskId: string;
  currentCode: string;
};

export type AiFixResponse = {
  codingTaskId?: string;
  hintsUsed?: number;
  explanation?: string;
  fixedCode?: string;
};

export const playgroundApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    executeCode: builder.mutation<
      CodeExecuteResponse,
      CodeExecuteRequest
    >({
      query: (body) => ({
        url: "v1/code/execute",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: ApiResponse<CodeExecuteResponse>,
      ) => response.data,
    }),

    explainCode: builder.mutation<
      AiExplainResponse,
      AiExplainRequest
    >({
      query: (body) => ({
        url: "v1/ai/explain",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: ApiResponse<AiExplainResponse>,
      ) => response.data,
    }),

    improveCode: builder.mutation<
      AiImproveResponse,
      AiImproveRequest
    >({
      query: (body) => ({
        url: "v1/ai/improve",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: ApiResponse<AiImproveResponse>,
      ) => response.data,
    }),

    getCodeHint: builder.mutation<
      AiHintResponse,
      AiHintRequest
    >({
      query: (body) => ({
        url: "v1/ai/hint",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: ApiResponse<AiHintResponse>,
      ) => response.data,
      invalidatesTags: (
        _result,
        _error,
        { codingTaskId },
      ) => [
        {
          type: "CodingTask",
          id: `AI-HINT-${codingTaskId}`,
        },
      ],
    }),

    getHintStatus: builder.query<
      AiHintStatusResponse,
      string
    >({
      query: (codingTaskId) => ({
        url: `v1/coding-tasks/${encodeURIComponent(
          codingTaskId,
        )}/ai/hint-status`,
      }),
      transformResponse: (
        response: ApiResponse<AiHintStatusResponse>,
      ) => response.data,
      providesTags: (
        _result,
        _error,
        codingTaskId,
      ) => [
        {
          type: "CodingTask",
          id: `AI-HINT-${codingTaskId}`,
        },
      ],
    }),

    fixCode: builder.mutation<
      AiFixResponse,
      AiFixRequest
    >({
      query: (body) => ({
        url: "v1/ai/fix",
        method: "POST",
        body,
      }),
      transformResponse: (
        response: ApiResponse<AiFixResponse>,
      ) => response.data,
      invalidatesTags: (
        _result,
        _error,
        { codingTaskId },
      ) => [
        {
          type: "CodingTask",
          id: `AI-HINT-${codingTaskId}`,
        },
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useExecuteCodeMutation,
  useExplainCodeMutation,
  useImproveCodeMutation,
  useGetCodeHintMutation,
  useGetHintStatusQuery,
  useFixCodeMutation,
} = playgroundApi;