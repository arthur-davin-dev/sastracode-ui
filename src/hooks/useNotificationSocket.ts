"use client";

import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { useAppDispatch } from "@/redux/hook";
import { notificationApi } from "@/redux/service/notificationApi";
import type { ApiNotification } from "@/types/notification";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export function useNotificationSocket() {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const clientRef = useRef<Client | null>(null);

  const accessToken = session?.accessToken;
  const enabled = status === "authenticated" && Boolean(accessToken) && Boolean(BACKEND_URL);

  useEffect(() => {
    if (!enabled || !accessToken || !BACKEND_URL) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${BACKEND_URL}/ws`),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: (message) => {
        if (process.env.NODE_ENV !== "production") {
          console.debug("[notification-socket]", message);
        }
      },
    });

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
  }, [enabled, accessToken, dispatch]);
}
