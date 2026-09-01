"use client";

import { useSession } from "next-auth/react";

import { useAppDispatch } from "@/redux/hook";
import { qaApi } from "@/redux/api/qa-api";
import { useRealtimeSubscription } from "@/lib/realtime/use-realtime";
import type { QnaRealtimeMessage } from "@/types/api/qa";

/** Backend QnaRealtimePublisher.destination(videoId). */
function qnaTopic(videoId: string): string {
  return `/topic/videos/${videoId}/qna`;
}

type QaTag =
  | { type: "Question"; id: string }
  | { type: "Answer"; id: string };

/**
 * Turn a realtime Q&A event into RTK Query cache invalidations that mirror the
 * tags `qa-api.ts` attaches to `getVideoQuestions` / `getAnswers`. Any list or
 * detail view currently on screen refetches; nothing happens for views that
 * are not mounted.
 */
function tagsForEvent(message: QnaRealtimeMessage): QaTag[] {
  const questionId = message.questionId ?? message.question?.id ?? undefined;
  const answerId = message.answerId ?? message.answer?.answerId ?? undefined;
  const tags: QaTag[] = [];

  const touchQuestion = () => {
    if (questionId) tags.push({ type: "Question", id: questionId });
  };
  const touchQuestionList = () => tags.push({ type: "Question", id: "LIST" });
  const touchAnswer = () => {
    if (answerId) tags.push({ type: "Answer", id: answerId });
  };
  const touchAnswerList = () => {
    if (questionId) tags.push({ type: "Answer", id: `LIST-${questionId}` });
  };

  switch (message.event) {
    case "QUESTION_CREATED":
    case "QUESTION_HIDDEN":
      // membership of every list/filter can change
      touchQuestionList();
      touchQuestion();
      break;
    case "QUESTION_RESOLVED":
      // can move the question between the open / resolved filters
      touchQuestionList();
      touchQuestion();
      break;
    case "QUESTION_UPDATED":
    case "QUESTION_VOTE_CHANGED":
      touchQuestion();
      break;
    case "ANSWER_CREATED":
    case "ANSWER_HIDDEN":
      touchAnswerList();
      touchAnswer();
      touchQuestion(); // answer count is rendered on the question card
      break;
    case "ANSWER_ACCEPTED":
      touchAnswerList();
      touchAnswer();
      touchQuestion();
      break;
    case "ANSWER_UPDATED":
    case "ANSWER_VOTE_CHANGED":
      touchAnswer();
      break;
  }

  return tags;
}

/**
 * Subscribes to `/topic/videos/{videoId}/qna` over the single shared STOMP
 * connection (see `<RealtimeProvider>`) while the Q&A panel is mounted, and
 * keeps its RTK Query caches fresh as other users ask, answer, resolve,
 * accept, hide, or vote. Requires an authenticated Keycloak session — the
 * backend rejects unauthenticated SUBSCRIBE frames for this topic.
 */
export function useVideoQnaSocket(videoId: string | undefined) {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const enabled = status === "authenticated" && Boolean(videoId);

  useRealtimeSubscription(
    videoId ? qnaTopic(videoId) : null,
    (message) => {
      let payload: QnaRealtimeMessage;
      try {
        payload = JSON.parse(message.body) as QnaRealtimeMessage;
      } catch {
        return;
      }
      if (!payload?.event) return;

      const tags = tagsForEvent(payload);
      if (tags.length > 0) {
        dispatch(qaApi.util.invalidateTags(tags));
      }
    },
    enabled,
  );
}
