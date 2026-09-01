import { sastraApi } from "@/redux/api";
import type {
  LeaderboardApiResponse,
  LeaderboardPageResponse,
  LeaderboardPeriod,
  LeaderboardSnapshotResponse,
  LeaderboardUserProfile,
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
    // `/v1/admin/users` requires ADMIN/SUPER_ADMIN, so it 403s for every
    // regular student and the leaderboard silently fell back to placeholder
    // names/avatars. `/v1/users/{userId}/profile` is the public player-profile
    // endpoint any authenticated user can call, so fetch it per distinct id.
    getLeaderboardUserProfiles: builder.query<LeaderboardUserProfilePage, string[]>({
      async queryFn(userIds, _api, _extraOptions, baseQuery) {
        const uniqueIds = Array.from(new Set(userIds));

        const results = await Promise.all(
          uniqueIds.map((userId) =>
            baseQuery(`/v1/users/${encodeURIComponent(userId)}/profile`),
          ),
        );

        const content = results.flatMap((result, index) => {
          if (!result.data) return [];
          const response = result.data as LeaderboardApiResponse<LeaderboardUserProfile>;
          return response.data
            ? [{ ...response.data, userId: response.data.userId || uniqueIds[index] }]
            : [];
        });

        return {
          data: { content, totalElements: content.length, totalPages: 1 },
        };
      },
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