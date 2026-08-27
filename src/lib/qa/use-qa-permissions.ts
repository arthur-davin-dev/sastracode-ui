"use client";

import { useSession } from "next-auth/react";

import { useGetMyProfileQuery } from "@/redux/service/profile-api";
import type { AnswerResponse, QuestionResponse } from "@/types/api/qa";

/**
 * Resolves QA action permissions for the signed-in user.
 *
 * The QA read endpoints do not return per-user permission flags, so
 * ownership is derived by matching the current user's id (from
 * GET /v1/users/me) against the `user.userId` embedded in each
 * question/answer payload. Backend authorization remains the source of
 * truth — these checks only decide which actions are rendered so that
 * unauthorized actions are hidden rather than shown-and-disabled.
 */
export function useQaPermissions() {
  const { status } = useSession();
  const { data: profile } = useGetMyProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  const currentUserId = profile?.userId;

  const isQuestionOwner = (question: Pick<QuestionResponse, "user">) =>
    Boolean(currentUserId && question.user?.userId === currentUserId);

  const isAnswerOwner = (answer: Pick<AnswerResponse, "user">) =>
    Boolean(currentUserId && answer.user?.userId === currentUserId);

  return { currentUserId, isQuestionOwner, isAnswerOwner };
}
