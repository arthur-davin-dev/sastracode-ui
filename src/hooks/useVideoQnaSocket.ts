"use client";

import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useSession } from "next-auth/react";

import { useAppDispatch } from "@/redux/hook";
import { qaApi } from "@/redux/api/qa-api";
import { getSocketAccessToken } from "@/lib/auth/socket-token";
import type { QnaRealtimeMessage } from "@/types/api/qa";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * STOMP endpoint from the backend NotificationWebSocketConfig
 * (`/ws/notifications`, a raw WebSocket — no SockJS handshake). The same
 * endpoint carries both `/user/queue/notifications` and the per-video Q&A
 * topics.
 */
function resolveBrokerUrl(): string | null {
  if (!BACKEND_URL) return null;
  const base = BACKEND_URL.replace(/\/+$/, "").replace(/^http(s?):\/\//i, "ws$1://");
  return `${base}/ws/notifications`;
}

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
 * Subscribes to `/topic/videos/{videoId}/qna` while the Q&A panel is mounted
 * and keeps its RTK Query caches fresh as other users ask, answer, resolve,
 * accept, hide, or vote. Requires an authenticated Keycloak session — the
 * backend rejects unauthenticated SUBSCRIBE frames.
 */
export function useVideoQnaSocket(videoId: string | undefined) {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const clientRef = useRef<Client | null>(null);

  const brokerURL = resolveBrokerUrl();
  const enabled =
    status === "authenticated" && Boolean(brokerURL) && Boolean(videoId);

  useEffect(() => {
    if (!enabled || !brokerURL || !videoId) return;

    const client = new Client({
      brokerURL,
      // connectHeaders is populated by `beforeConnect` below, before every
      // connection attempt, so the token is always current.
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (message) => {
        if (process.env.NODE_ENV !== "production") {
          console.debug("[qna-socket]", message);
        }
      },
    });

    // Runs before every connection attempt, including automatic reconnects, so
    // an expired access token is never replayed. Pulls a freshly refreshed
    // Keycloak token without any interactive login. If none is available the
    // attempt is skipped and STOMP retries on its normal cadence; a genuine
    // refresh failure is handled by <AuthProvider>, which signs the user out.
    client.beforeConnect = async () => {
      const token = await getSocketAccessToken();
      if (token) {
        client.connectHeaders = { Authorization: `Bearer ${token}` };
      }
    };

    client.onWebSocketError = (event) => {
      console.error("Q&A socket WebSocket error:", event);
    };

    client.onStompError = (frame) => {
      console.error("Q&A socket STOMP error:", frame.headers?.message);
    };

    client.onConnect = () => {
      client.subscribe(qnaTopic(videoId), (message) => {
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
      });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current = null;
      void client.deactivate();
    };
  }, [enabled, brokerURL, videoId, dispatch]);
}
