import { sastraApi } from "@/redux/api/sastra-code";

export type QuizScope = "SECTION" | "SUBSECTION";

export interface QuizAttemptAnswer {
  blockId: string;
  answer: unknown;
}

export interface QuizAttemptDetail {
  id: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  xpEarned?: number;
  answers?: Array<{
    blockId: string;
    correct: boolean;
    questionData?: Record<string, unknown>;
    submittedAnswer?: unknown;
    correctAnswer?: unknown;
    explanation?: string;
  }>;
}

export interface QuizAttemptResponse {
  success: boolean;
  data: QuizAttemptDetail;
  message?: string;
}

export const quizAttemptApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    startQuizAttempt: builder.mutation<
      QuizAttemptResponse,
      { tutorialId: string; scope: QuizScope; scopeId: string }
    >({
      query: ({ tutorialId, scope, scopeId }) => ({
        url: `/v1/tutorials/${tutorialId}/${scope === "SECTION" ? "sections" : "subsections"}/${scopeId}/quiz-attempts`,
        method: "POST",
      }),
    }),
    submitQuizAttempt: builder.mutation<
      QuizAttemptResponse,
      { tutorialId: string; scope: QuizScope; scopeId: string; attemptId: string; answers: QuizAttemptAnswer[] }
    >({
      query: ({ tutorialId, scope, scopeId, attemptId, answers }) => ({
        url: `/v1/tutorials/${tutorialId}/${scope === "SECTION" ? "sections" : "subsections"}/${scopeId}/quiz-attempts/${attemptId}/submit`,
        method: "POST",
        body: { answers },
      }),
    }),
  }),
});

export const { useStartQuizAttemptMutation, useSubmitQuizAttemptMutation } = quizAttemptApi;
