"use client";

import { useContext, useEffect, useRef } from "react";
import type { IMessage } from "@stomp/stompjs";

import {
  RealtimeContext,
  type RealtimeContextValue,
} from "./RealtimeProvider";

/**
 * Access the single shared STOMP connection managed by `<RealtimeProvider>`.
 * This hook never creates a STOMP client — it only hands out the shared
 * `subscribe` function and connection status.
 */
export function useRealtime(): RealtimeContextValue {
  const ctx = useContext(RealtimeContext);
  if (!ctx) {
    throw new Error("useRealtime must be used within <RealtimeProvider>");
  }
  return ctx;
}

/**
 * Declaratively subscribe to a STOMP `destination` over the shared connection
 * for as long as the calling component is mounted and `enabled` is true.
 *
 * The latest `handler` is always used without re-subscribing, and the
 * subscription is torn down / recreated when `destination` or `enabled`
 * changes. Reconnects are handled by the provider.
 */
export function useRealtimeSubscription(
  destination: string | null | undefined,
  handler: (message: IMessage) => void,
  enabled: boolean = true,
): void {
  const { subscribe } = useRealtime();

  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled || !destination) return;
    const unsubscribe = subscribe(destination, (message) =>
      handlerRef.current(message),
    );
    return unsubscribe;
  }, [subscribe, destination, enabled]);
}
