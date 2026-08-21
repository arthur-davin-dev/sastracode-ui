import { sastraApi } from "@/redux/api";
import type {
  LeaderboardApiResponse,
  LeaderboardPageResponse,
  LeaderboardPeriod,
  LeaderboardSnapshotResponse,
  LeaderboardUserProfilePage,
} from "@/types/leaderboard";

interface LeaderboardQueryArgs {
  period: Exclude<LeaderboardPeriod, "COURSE">;
  page?: number;
  size?: number;
}

export const leaderboardApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query<LeaderboardPageResponse, LeaderboardQueryArgs>({
      query: ({ period, page = 0, size = 20 }) => ({
        url: "/v1/leaderboards",
        params: { period, page, size },
      }),
      transformResponse: (
        response: LeaderboardApiResponse<LeaderboardPageResponse>,
      ) => response.data,
      providesTags: [{ type: "Leaderboard", id: "LIST" }],
    }),
    getMyLeaderboardRank: builder.query<
      LeaderboardSnapshotResponse,
      Exclude<LeaderboardPeriod, "COURSE">
    >({
      query: (period) => ({
        url: "/v1/leaderboards/me",
        params: { period },
      }),
      transformResponse: (
        response: LeaderboardApiResponse<LeaderboardSnapshotResponse>,
      ) => response.data,
      providesTags: [{ type: "Leaderboard", id: "ME" }],
    }),
    getLeaderboardUserProfiles: builder.query<LeaderboardUserProfilePage, void>({
      query: () => ({
        url: "/v1/admin/users",
        params: { page: 0, size: 100 },
      }),
      transformResponse: (
        response: LeaderboardApiResponse<LeaderboardUserProfilePage>,
      ) => response.data,
      providesTags: [{ type: "Leaderboard", id: "PROFILES" }],
    }),
  }),
  overrideExisting: process.env.NODE_ENV !== "production",
});

export const {
  useGetLeaderboardQuery,
  useGetMyLeaderboardRankQuery,
  useGetLeaderboardUserProfilesQuery,
} = leaderboardApi;