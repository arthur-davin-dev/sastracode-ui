import { sastraApi } from "@/redux/api";
import type {
  ApiNotification,
  NotificationApiResponse,
  NotificationPage,
} from "@/types/notification";

interface NotificationQueryArgs {
  isRead?: boolean;
  page?: number;
  size?: number;
}

export const notificationApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query<NotificationPage, NotificationQueryArgs | void>({
      query: (args) => ({
        url: "/v1/users/me/notifications",
        params: {
          isRead: args?.isRead,
          page: args?.page ?? 0,
          size: args?.size ?? 20,
          sort: "deliveredAt,DESC",
        },
      }),
      transformResponse: (response: NotificationApiResponse<NotificationPage>) =>
        response.data,
      providesTags: (result) => [
        { type: "Notification", id: "LIST" },
        ...(result?.content.map((item) => ({
          type: "Notification" as const,
          id: item.notificationReceiverId,
        })) ?? []),
      ],
    }),
    getUnreadNotificationCount: builder.query<number, void>({
      query: () => "/v1/users/me/notifications/unread-count",
      transformResponse: (
        response: NotificationApiResponse<{ unreadCount: number }>,
      ) => response.data.unreadCount,
      providesTags: [{ type: "Notification", id: "COUNT" }],
    }),
    markNotificationRead: builder.mutation<ApiNotification, string>({
      query: (receiverId) => ({
        url: `/v1/notifications/${encodeURIComponent(receiverId)}/read`,
        method: "PATCH",
      }),
      transformResponse: (response: NotificationApiResponse<ApiNotification>) =>
        response.data,
      invalidatesTags: (_result, _error, receiverId) => [
        { type: "Notification", id: receiverId },
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "COUNT" },
      ],
    }),
    markAllNotificationsRead: builder.mutation<number, void>({
      query: () => ({
        url: "/v1/users/me/notifications/read-all",
        method: "PATCH",
      }),
      transformResponse: (response: NotificationApiResponse<number>) => response.data,
      invalidatesTags: [
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "COUNT" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationApi;
