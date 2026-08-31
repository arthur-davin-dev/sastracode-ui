import { sastraApi } from "./sastra-code";
import { DEFAULT_ANSWER_QUERY, DEFAULT_QUESTION_QUERY } from "@/lib/qa/qa-constants";

import type {
  AnswerQueryArgs,
  AnswerResponse,
  ApiResponse,
  CreateAnswerRequest,
  CreateQuestionRequest,
  PageQuestionResponse,
  PagedResponseAnswerResponse,
  QuestionQueryArgs,
  QuestionResponse,
  UpdateAnswerRequest,
  UpdateQuestionRequest,
  UpdatePlaybackPositionRequest,
  UpdateVideoProgressRequest,
  VideoProgressResponse,
  VideoResponse,
  VoteResponse,
} from "@/types/api/qa";

function questionTag(id: string) {
  return { type: "Question" as const, id };
}

function answerTag(id: string) {
  return { type: "Answer" as const, id };
}

function answerListTag(questionId: string) {
  return { type: "Answer" as const, id: `LIST-${questionId}` };
}

export const qaApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---- Questions ----

    getVideoQuestions: builder.query<PageQuestionResponse, QuestionQueryArgs>({
      query: ({ videoId, resolved, sort, page, size }) => ({
        url: `/v1/videos/${encodeURIComponent(videoId)}/questions`,
        params: { resolved, sort, page, size },
      }),
      transformResponse: (response: ApiResponse<PageQuestionResponse>) => response.data,
      providesTags: (result) => [
        { type: "Question", id: "LIST" },
        ...((result?.content ?? []).map((question) => questionTag(question.id))),
      ],
    }),

    createQuestion: builder.mutation<
      QuestionResponse,
      { videoId: string } & CreateQuestionRequest
    >({
      query: ({ videoId, ...body }) => ({
        url: `/v1/videos/${encodeURIComponent(videoId)}/questions`,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<QuestionResponse>) => response.data,
      invalidatesTags: [{ type: "Question", id: "LIST" }],
      // The list is sorted/paged server-side, so a brand new question can
      // legitimately land outside the currently viewed page or filter.
      // Prepend it directly into the default "All Questions / Newest" cache
      // entry so it's visible immediately, while the tag invalidation above
      // still refreshes every other view in the background.
      async onQueryStarted({ videoId }, { dispatch, queryFulfilled }) {
        try {
          const { data: created } = await queryFulfilled;
          dispatch(
            qaApi.util.updateQueryData(
              "getVideoQuestions",
              { videoId, ...DEFAULT_QUESTION_QUERY },
              (draft) => {
                draft.content = [created, ...draft.content];
                draft.totalElements += 1;
                draft.numberOfElements += 1;
                draft.empty = false;
              },
            ),
          );
        } catch {
          // creation failed — handled by the caller via unwrap()
        }
      },
    }),

    updateQuestion: builder.mutation<
      QuestionResponse,
      { questionId: string } & UpdateQuestionRequest
    >({
      query: ({ questionId, ...body }) => ({
        url: `/v1/questions/${encodeURIComponent(questionId)}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: ApiResponse<QuestionResponse>) => response.data,
      invalidatesTags: (_result, _error, { questionId }) => [questionTag(questionId)],
    }),

    resolveQuestion: builder.mutation<QuestionResponse, string>({
      query: (questionId) => ({
        url: `/v1/questions/${encodeURIComponent(questionId)}/resolve`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<QuestionResponse>) => response.data,
      invalidatesTags: (_result, _error, questionId) => [questionTag(questionId)],
    }),

    hideQuestion: builder.mutation<QuestionResponse, string>({
      query: (questionId) => ({
        url: `/v1/questions/${encodeURIComponent(questionId)}/hide`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<QuestionResponse>) => response.data,
      invalidatesTags: (_result, _error, questionId) => [
        questionTag(questionId),
        { type: "Question", id: "LIST" },
      ],
    }),

    voteQuestion: builder.mutation<VoteResponse, string>({
      query: (questionId) => ({
        url: `/v1/questions/${encodeURIComponent(questionId)}/vote`,
        method: "PUT",
      }),
      transformResponse: (response: ApiResponse<VoteResponse>) => response.data,
      invalidatesTags: (_result, _error, questionId) => [questionTag(questionId)],
    }),

    retractQuestionVote: builder.mutation<VoteResponse, string>({
      query: (questionId) => ({
        url: `/v1/questions/${encodeURIComponent(questionId)}/vote`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<VoteResponse>) => response.data,
      invalidatesTags: (_result, _error, questionId) => [questionTag(questionId)],
    }),

    // ---- Answers ----

    getAnswers: builder.query<PagedResponseAnswerResponse, AnswerQueryArgs>({
      query: ({ questionId, accept, sort, page, size }) => ({
        url: `/v1/questions/${encodeURIComponent(questionId)}/answers`,
        params: { accept, sort, page, size },
      }),
      transformResponse: (response: ApiResponse<PagedResponseAnswerResponse>) => response.data,
      providesTags: (result, _error, { questionId }) => [
        answerListTag(questionId),
        ...((result?.content ?? []).map((answer) => answerTag(answer.answerId))),
      ],
    }),

    createAnswer: builder.mutation<
      AnswerResponse,
      { questionId: string } & CreateAnswerRequest
    >({
      query: ({ questionId, ...body }) => ({
        url: `/v1/questions/${encodeURIComponent(questionId)}/answers`,
        method: "POST",
        body,
      }),
      transformResponse: (response: ApiResponse<AnswerResponse>) => response.data,
      invalidatesTags: (_result, _error, { questionId }) => [answerListTag(questionId)],
      async onQueryStarted({ questionId }, { dispatch, queryFulfilled }) {
        try {
          const { data: created } = await queryFulfilled;
          dispatch(
            qaApi.util.updateQueryData(
              "getAnswers",
              { questionId, ...DEFAULT_ANSWER_QUERY },
              (draft) => {
                draft.content = [created, ...draft.content];
                draft.totalElements += 1;
              },
            ),
          );
        } catch {
          // creation failed — handled by the caller via unwrap()
        }
      },
    }),

    updateAnswer: builder.mutation<
      AnswerResponse,
      { answerId: string; questionId: string } & UpdateAnswerRequest
    >({
      query: ({ answerId, ...body }) => ({
        url: `/v1/answers/${encodeURIComponent(answerId)}`,
        method: "PATCH",
        body: { content: body.content },
      }),
      transformResponse: (response: ApiResponse<AnswerResponse>) => response.data,
      invalidatesTags: (_result, _error, { answerId, questionId }) => [
        answerTag(answerId),
        answerListTag(questionId),
      ],
    }),

    hideAnswer: builder.mutation<AnswerResponse, { answerId: string; questionId: string }>({
      query: ({ answerId }) => ({
        url: `/v1/answers/${encodeURIComponent(answerId)}/hide`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<AnswerResponse>) => response.data,
      invalidatesTags: (_result, _error, { answerId, questionId }) => [
        answerTag(answerId),
        answerListTag(questionId),
      ],
    }),

    acceptAnswer: builder.mutation<AnswerResponse, { answerId: string; questionId: string }>({
      query: ({ answerId }) => ({
        url: `/v1/answers/${encodeURIComponent(answerId)}/accept`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<AnswerResponse>) => response.data,
      invalidatesTags: (_result, _error, { questionId }) => [
        answerListTag(questionId),
        questionTag(questionId),
      ],
    }),

    voteAnswer: builder.mutation<VoteResponse, { answerId: string; questionId: string }>({
      query: ({ answerId }) => ({
        url: `/v1/answers/${encodeURIComponent(answerId)}/vote`,
        method: "PUT",
      }),
      transformResponse: (response: ApiResponse<VoteResponse>) => response.data,
      invalidatesTags: (_result, _error, { answerId }) => [answerTag(answerId)],
    }),

    retractAnswerVote: builder.mutation<VoteResponse, { answerId: string; questionId: string }>({
      query: ({ answerId }) => ({
        url: `/v1/answers/${encodeURIComponent(answerId)}/vote`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<VoteResponse>) => response.data,
      invalidatesTags: (_result, _error, { answerId }) => [answerTag(answerId)],
    }),

    // ---- Video ----

    getVideoById: builder.query<VideoResponse, string>({
      query: (videoId) => `/v1/videos/${encodeURIComponent(videoId)}`,
      providesTags: (_result, _error, videoId) => [{ type: "Video", id: videoId }],
    }),

    getVideoProgress: builder.query<VideoProgressResponse, string>({
      query: (videoId) => `/v1/videos/${encodeURIComponent(videoId)}/progress`,
      providesTags: (_result, _error, videoId) => [{ type: "Video", id: videoId }],
    }),

    updateVideoProgress: builder.mutation<
      VideoProgressResponse,
      { videoId: string; courseId?: string } & UpdateVideoProgressRequest
    >({
      // `courseId` is a client-only hint for cache invalidation and is never
      // sent to the backend (the request body is just `{ completed }`).
      query: ({ videoId, completed }) => ({
        url: `/v1/videos/${encodeURIComponent(videoId)}/progress`,
        method: "PUT",
        body: { completed },
      }),
      // Completing a video changes course progress and, server-side, the
      // user's XP / badge progress. Refresh only those, not the whole cache.
      invalidatesTags: (_result, _error, { videoId, courseId }) => [
        { type: "Video", id: videoId },
        ...(courseId
          ? [
              { type: "Course" as const, id: courseId },
              { type: "Course" as const, id: "MY_ENROLLMENTS" },
              { type: "Course" as const, id: "MY_LEARNING_PROGRESS" },
              { type: "Course" as const, id: "CONTINUE_LEARNING" },
              { type: "Achievement" as const, id: "XP" },
              { type: "Achievement" as const, id: "BADGES" },
              { type: "Achievement" as const, id: "ACTIVITY" },
            ]
          : []),
      ],
    }),

    getPlaybackPosition: builder.query<VideoProgressResponse, string>({
      query: (videoId) => `/v1/videos/${encodeURIComponent(videoId)}/progress/position`,
      providesTags: (_result, _error, videoId) => [{ type: "Video", id: videoId }],
    }),

    updatePlaybackPosition: builder.mutation<
      VideoProgressResponse,
      { videoId: string } & UpdatePlaybackPositionRequest
    >({
      query: ({ videoId, ...body }) => ({
        url: `/v1/videos/${encodeURIComponent(videoId)}/progress/position`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { videoId }) => [{ type: "Video", id: videoId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetVideoQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useResolveQuestionMutation,
  useHideQuestionMutation,
  useVoteQuestionMutation,
  useRetractQuestionVoteMutation,
  useGetAnswersQuery,
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
  useHideAnswerMutation,
  useAcceptAnswerMutation,
  useVoteAnswerMutation,
  useRetractAnswerVoteMutation,
  useGetVideoByIdQuery,
  useGetVideoProgressQuery,
  useUpdateVideoProgressMutation,
  useGetPlaybackPositionQuery,
  useUpdatePlaybackPositionMutation,
} = qaApi;
