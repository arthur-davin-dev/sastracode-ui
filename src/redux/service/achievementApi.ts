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

export interface BadgeResponse {
  id: string;
  code: string;
  name: string;
  badgeCategory: string;
  badgeRarity: string;
  requirementDescription?: string;
  requirementRule?: BadgeRequirementRule;
  iconFileId?: string;
  xpReward: number;
}

export interface BadgeRequirementRule {
  type: string;
  operator: string;
  value: number;
  description: string;
}

export interface UserBadgeProgress {
  badge: BadgeResponse;
  earned: boolean;
  earnedAt?: string;
  currentValue: number;
  targetValue: number;
  progressPercentage: number;
}

// What GET /v1/users/{userId}/badges returns for another player: only
// already-earned badges, no progress-toward-unearned-badge internals.
export interface EarnedBadgeResponse {
  badge: BadgeResponse;
  earnedAt?: string;
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
    getMyBadges: builder.query<UserBadgeProgress[], void>({
      query: () => "/v1/users/me/badges",
      transformResponse: (response: ApiResponse<UserBadgeProgress[]>) => response.data,
      providesTags: [{ type: "Achievement", id: "BADGES" }],
    }),
    getUserBadges: builder.query<EarnedBadgeResponse[], string>({
      query: (userId) => `/v1/users/${encodeURIComponent(userId)}/badges`,
      transformResponse: (response: ApiResponse<EarnedBadgeResponse[]>) => response.data,
      providesTags: (_result, _error, userId) => [
        { type: "Achievement", id: `BADGES-${userId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMyXpQuery,
  useGetMyXpTransactionsQuery,
  useGetMyBadgesQuery,
  useGetUserBadgesQuery,
} = achievementApi;
