"use client";

import { createContext, useCallback, useEffect, useMemo, useRef } from "react";
import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useAppDispatch } from "@/redux/hook";
import { sastraApi } from "@/redux/api/sastra-code";
import { notificationApi } from "@/redux/service/notificationApi";
import { getSocketAccessToken } from "@/lib/auth/socket-token";
import type { ApiNotification } from "@/types/notification";

import { tagsForDataChange } from "./data-change-tags";
import { isDataChangeEvent } from "./types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/** Public catalog change events — no authentication required to subscribe. */
const DATA_CHANGES_DESTINATION = "/topic/data-changes";
/** Per-user notification queue — backend rejects unauthenticated SUBSCRIBE. */
const NOTIFICATIONS_DESTINATION = "/user/queue/notifications";

/**
 * STOMP endpoint registered by the backend `NotificationWebSocketConfig`
 * (`/ws/notifications`, a raw WebSocket — no SockJS handshake). The same
 * endpoint carries the per-user notification queue, the per-video Q&A topics,
 * and the public `/topic/data-changes` broadcast.
 */
function resolveBrokerUrl(): string | null {
  if (!BACKEND_URL) return null;
  const base = BACKEND_URL.replace(/\/+$/, "").replace(
    /^http(s?):\/\//i,
    "ws$1://",
  );
  return `${base}/ws/notifications`;
}

/** `NEXT_PUBLIC_BACKEND_URL` is inlined at build time, so this never changes. */
const BROKER_URL = resolveBrokerUrl();

type MessageHandler = (message: IMessage) => void;

interface RegistryEntry {
  destination: string;
  handler: MessageHandler;
  /** Live STOMP subscription for the current connection, if subscribed. */
  sub?: StompSubscription;
}

export interface RealtimeContextValue {
  /**
   * Subscribe to a STOMP destination over the single shared connection.
   * Safe to call before the socket connects — the subscription is (re)applied
   * automatically on every (re)connect. Returns an unsubscribe function.
   */
  subscribe: (destination: string, handler: MessageHandler) => () => void;
}

export const RealtimeContext = createContext<RealtimeContextValue | null>(null);

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const clientRef = useRef<Client | null>(null);
  /** All desired subscriptions (built-in + consumer), keyed by a unique id. */
  const registryRef = useRef<Map<string, RegistryEntry>>(new Map());
  const subCounterRef = useRef(0);

  /**
   * Register a subscription and, if already connected, apply it immediately.
   * Used both by the built-in subscriptions below and by `subscribe()` from
   * consumer hooks (e.g. Video Q&A).
   */
  const register = useCallback(
    (key: string, destination: string, handler: MessageHandler) => {
      const entry: RegistryEntry = { destination, handler };
      registryRef.current.set(key, entry);

      const client = clientRef.current;
      if (client?.connected) {
        entry.sub = client.subscribe(destination, handler);
      }

      return () => {
        const current = registryRef.current.get(key);
        if (current?.sub) {
          try {
            current.sub.unsubscribe();
          } catch {
            // connection already gone — nothing to clean up
          }
        }
        registryRef.current.delete(key);
      };
    },
    [],
  );

  const subscribe = useCallback(
    (destination: string, handler: MessageHandler) => {
      const key = `consumer:${destination}:${(subCounterRef.current += 1)}`;
      return register(key, destination, handler);
    },
    [register],
  );

  useEffect(() => {
    // Wait until the session state is resolved so the first CONNECT frame
    // carries the right identity (a real token, or none for a public visitor)
    // instead of connecting once and immediately reconnecting.
    if (status === "loading" || !BROKER_URL) return;

    const isAuthenticated = status === "authenticated";
    // Stable Map reference (never reassigned) — safe to use in cleanup.
    const registry = registryRef.current;

    const client = new Client({
      brokerURL: BROKER_URL,
      // connectHeaders is populated by `beforeConnect` below, before every
      // connection attempt, so the token is always current.
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (message) => {
        if (process.env.NODE_ENV !== "production") {
          console.debug("[realtime]", message);
        }
      },
    });
    clientRef.current = client;

    // --- Built-in subscriptions ------------------------------------------------

    // Public catalog change events -> RTK Query cache invalidation. Registered
    // for every visitor, authenticated or not.
    const unregisterDataChanges = register(
      "builtin:data-changes",
      DATA_CHANGES_DESTINATION,
      (message) => {
        let payload: unknown;
        try {
          payload = JSON.parse(message.body);
        } catch {
          return;
        }
        if (!isDataChangeEvent(payload)) return;

        const tags = tagsForDataChange(payload);
        if (tags.length > 0) {
          dispatch(sastraApi.util.invalidateTags(tags));
        }
      },
    );

    // Per-user notifications — identical behaviour to the previous
    // `useNotificationSocket`: refresh the notification caches and surface a
    // toast. Only while authenticated (the backend rejects an unauthenticated
    // SUBSCRIBE to the user queue).
    let unregisterNotifications: (() => void) | undefined;
    if (isAuthenticated) {
      unregisterNotifications = register(
        "builtin:notifications",
        NOTIFICATIONS_DESTINATION,
        (message) => {
          dispatch(
            notificationApi.util.invalidateTags([
              { type: "Notification", id: "LIST" },
              { type: "Notification", id: "COUNT" },
            ]),
          );

          try {
            const payload = JSON.parse(message.body) as ApiNotification;
            if (payload?.title) {
              toast(payload.title, { description: payload.content });
            }
          } catch {
            // Non-JSON payload — cache invalidation above already refreshed UI.
          }
        },
      );
    }

    // --- Connection lifecycle -----------------------------------------------

    // Runs before every connection attempt, including automatic reconnects, so
    // an expired access token is never replayed. A public visitor has no token
    // and connects anonymously.
    client.beforeConnect = async () => {
      const token = await getSocketAccessToken();
      client.connectHeaders = token
        ? { Authorization: `Bearer ${token}` }
        : {};
    };

    client.onConnect = () => {
      // (Re)apply every desired subscription. `@stomp/stompjs` does not
      // resubscribe automatically after a reconnect.
      for (const entry of registry.values()) {
        if (!entry.sub) {
          entry.sub = client.subscribe(entry.destination, entry.handler);
        }
      }
    };

    const handleDrop = () => {
      // Subscriptions from the dropped connection are dead; clear the handles
      // so `onConnect` recreates them on the next successful connect.
      for (const entry of registry.values()) {
        entry.sub = undefined;
      }
    };

    client.onWebSocketClose = handleDrop;
    client.onDisconnect = handleDrop;

    client.onStompError = (frame) => {
      console.error("[realtime] STOMP error:", frame.headers?.message);
    };
    client.onWebSocketError = (event) => {
      console.error("[realtime] WebSocket error:", event);
    };

    client.activate();

    return () => {
      unregisterNotifications?.();
      unregisterDataChanges();
      // Drop live handles for any remaining (consumer) subscriptions so they
      // are recreated cleanly once the next client connects.
      for (const entry of registry.values()) {
        entry.sub = undefined;
      }
      clientRef.current = null;
      void client.deactivate();
    };
  }, [status, dispatch, register]);

  const value = useMemo<RealtimeContextValue>(
    () => ({ subscribe }),
    [subscribe],
  );

  return (
    <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
  );
}
