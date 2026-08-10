import { sastraApi } from "./sastra-code";
import type { ApiResponse } from "./tutorial-api";

export type LeaderboardPeriod = "ALL_TIME" | "DAILY" | "WEEKLY";

export interface LeaderboardApiEntry {
  rank: number;
  userId?: string;
  username?: string;
  displayName?: string;
  fullName?: string;
  name?: string;
  avatarFileId?: string;
  avatarUrl?: string;
  level?: number;
  xp?: number;
  totalXp?: number;
}

export interface LeaderboardPage {
  content: LeaderboardApiEntry[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
  first?: boolean;
  last?: boolean;
}

export interface LeaderboardArgs {
  page?: number;
  size?: number;
  sort?: string;
  period?: LeaderboardPeriod;
  courseId?: string;
}

export interface XpSummary {
  totalXp?: number;
  xp?: number;
  currentXp?: number;
  level?: number;
  currentLevel?: number;
  nextLevelXp?: number;
}

export const leaderboardApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query<ApiResponse<LeaderboardPage | LeaderboardApiEntry[]>, LeaderboardArgs | void>({
      query: (params) => ({ url: "/v1/leaderboards", params: params ?? undefined }),
      providesTags: [{ type: "Leaderboard", id: "LIST" }],
    }),
    getMyLeaderboardRank: builder.query<ApiResponse<LeaderboardApiEntry>, Pick<LeaderboardArgs, "period" | "courseId"> | void>({
      query: (params) => ({ url: "/v1/leaderboards/me", params: params ?? undefined }),
      providesTags: [{ type: "Leaderboard", id: "ME" }],
    }),
    getMyXp: builder.query<ApiResponse<XpSummary>, void>({
      query: () => "/v1/users/me/xp",
      providesTags: [{ type: "Leaderboard", id: "XP" }],
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
  useGetMyLeaderboardRankQuery,
  useGetMyXpQuery,
} = leaderboardApi;
