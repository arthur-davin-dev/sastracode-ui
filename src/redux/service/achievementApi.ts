import { sastraApi } from "@/redux/api";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface XpBalance {
  totalXp: number;
  totalScore: number;
}

export interface XpTransaction {
  id: number;
  sourceType: string;
  sourceId: string;
  xpAmount: number;
  scoreAmount: number;
  description?: string;
  createdAt?: string;
}

interface XpTransactionPage {
  content: XpTransaction[];
  totalElements: number;
  totalPages: number;
}

export const achievementApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyXp: builder.query<XpBalance, void>({
      query: () => "/v1/users/me/xp",
      transformResponse: (response: ApiResponse<XpBalance>) => response.data,
      providesTags: [{ type: "Achievement", id: "XP" }],
    }),
    getMyXpTransactions: builder.query<XpTransactionPage, void>({
      query: () => ({
        url: "/v1/users/me/xp/transactions",
        params: { page: 0, size: 10, sort: "createdAt,desc" },
      }),
      transformResponse: (response: ApiResponse<XpTransactionPage>) => response.data,
      providesTags: [{ type: "Achievement", id: "ACTIVITY" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMyXpQuery, useGetMyXpTransactionsQuery } = achievementApi;
