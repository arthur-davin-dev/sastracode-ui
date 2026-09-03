"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";

import {
  useGetMyNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkAllNotificationsReadMutation,
  useMarkNotificationReadMutation,
} from "@/redux/service/notificationApi";
import { useRealtime } from "@/lib/realtime/use-realtime";
import type { ApiNotification } from "@/types/notification";

interface UseNotificationsOptions {
  /** Zero-based page of the history to load. Default `0`. */
  page?: number;
  /** Page size. Default `20`. */
  size?: number;
  /** `false` to load only unread; omit for the full history. */
  isRead?: boolean;
  /**
   * Poll the unread count on this interval (ms) as a fallback for when the
   * WebSocket is down. Realtime keeps it fresh otherwise. Default: no polling.
   */
  pollUnreadCountMs?: number;
}

export interface UseNotificationsResult {
  notifications: ApiNotification[];
  unreadCount: number;
  isLoading: boolean;
  /** `true` while the shared STOMP connection is live. */
  isConnected: boolean;
  /** Mark a single notification read by its `notificationReceiverId`. */
  markAsRead: (notificationReceiverId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  /** Refetch the history + unread count from the server. */
  refetch: () => void;
  totalPages: number;
  totalElements: number;
}

/**
 * Single source of truth for the logged-in user's own notifications.
 *
 * REST loads the existing history and unread count; realtime delivery,
 * dedupe, and cache refresh are handled once app-wide by `<RealtimeProvider>`
 * over the single shared WebSocket. Every consumer of this hook re-renders
 * automatically when a new notification arrives — no polling, no page refresh.
 */
export function useNotifications(
  options: UseNotificationsOptions = {},
): UseNotificationsResult {
  const { page = 0, size = 20, isRead, pollUnreadCountMs } = options;
  const { status } = useSession();
  const enabled = status === "authenticated";

  const { isConnected } = useRealtime();

  const {
    data: historyPage,
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useGetMyNotificationsQuery(
    { page, size, isRead },
    { skip: !enabled },
  );

  const {
    data: unreadCount = 0,
    isLoading: countLoading,
    refetch: refetchCount,
  } = useGetUnreadNotificationCountQuery(undefined, {
    skip: !enabled,
    pollingInterval: pollUnreadCountMs,
  });

  const [markReadMutation] = useMarkNotificationReadMutation();
  const [markAllReadMutation] = useMarkAllNotificationsReadMutation();

  const markAsRead = useCallback(
    async (notificationReceiverId: string) => {
      if (!enabled) return;
      await markReadMutation(notificationReceiverId).unwrap();
    },
    [enabled, markReadMutation],
  );

  const markAllAsRead = useCallback(async () => {
    if (!enabled) return;
    await markAllReadMutation().unwrap();
  }, [enabled, markAllReadMutation]);

  const refetch = useCallback(() => {
    if (!enabled) return;
    void refetchHistory();
    void refetchCount();
  }, [enabled, refetchHistory, refetchCount]);

  return {
    notifications: historyPage?.content ?? [],
    unreadCount,
    isLoading: historyLoading || countLoading,
    isConnected,
    markAsRead,
    markAllAsRead,
    refetch,
    totalPages: historyPage?.totalPages ?? 0,
    totalElements: historyPage?.totalElements ?? 0,
  };
}
