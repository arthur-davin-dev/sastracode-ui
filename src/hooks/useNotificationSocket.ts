"use client";

import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useAppDispatch } from "@/redux/hook";
import { notificationApi } from "@/redux/service/notificationApi";
import { getSocketAccessToken } from "@/lib/auth/socket-token";
import type { ApiNotification } from "@/types/notification";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * STOMP endpoint registered by the backend `NotificationWebSocketConfig`
 * (`/ws/notifications`, a raw WebSocket — no SockJS handshake).
 */
function resolveBrokerUrl(): string | null {
  if (!BACKEND_URL) return null;
  const base = BACKEND_URL.replace(/\/+$/, "").replace(/^http(s?):\/\//i, "ws$1://");
  return `${base}/ws/notifications`;
}

export function useNotificationSocket() {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const clientRef = useRef<Client | null>(null);

  const brokerURL = resolveBrokerUrl();
  const enabled = status === "authenticated" && Boolean(brokerURL);

  useEffect(() => {
    if (!enabled || !brokerURL) return;

    const client = new Client({
      brokerURL,
      // connectHeaders is populated by `beforeConnect` below, before every
      // connection attempt, so the token is always current.
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (message) => {
        if (process.env.NODE_ENV !== "production") {
          console.debug("[notification-socket]", message);
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
      console.error("Notification socket WebSocket error:", event);
    };

    client.onDisconnect = (frame) => {
      console.warn("Notification socket disconnected:", frame.headers?.message ?? frame);
    };

    client.onConnect = () => {
      console.info("Notification socket connected");
      client.subscribe("/user/queue/notifications", (message) => {
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
          // Non-JSON payload — cache invalidation above already refreshed the UI.
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("Notification socket STOMP error:", frame.headers?.message);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      clientRef.current = null;
      void client.deactivate();
    };
  }, [enabled, brokerURL, dispatch]);
}
