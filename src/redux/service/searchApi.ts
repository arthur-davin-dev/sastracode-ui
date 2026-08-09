import { sastraApi } from "@/redux/api/sastra-code";

export type SearchContentType = "COURSE" | "TUTORIAL" | "VIDEO" | "CODING_TASK";
export type SearchSort = "popular" | "newest" | "progress";

export interface SearchResultItem {
  id: string;
  type: SearchContentType;
  title: string;
  slug?: string;
  description?: string;
  image?: string;
  level?: string;
  status?: string;
  popularity?: number;
  publishedAt?: string;
  createdAt?: string;
  progressRank?: number;
  deepLink?: string;
}

export interface SearchResponse {
  query: string;
  types: SearchContentType[];
  sort: string;
  page: number;
  size: number;
  total: number;
  totalExact: boolean;
  processingTimeMs: number;
  items: SearchResultItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

export interface GlobalSearchArgs {
  q?: string;
  type?: SearchContentType | SearchContentType[];
  sort?: SearchSort;
  page?: number;
  size?: number;
}

export const searchApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query<ApiResponse<SearchResponse>, GlobalSearchArgs>({
      query: ({ q = "", type, sort = "popular", page = 0, size = 20 }) => ({
        url: "/v1/search",
        params: {
          q,
          type: Array.isArray(type) ? type.join(",") : type,
          sort,
          page,
          size,
        },
      }),
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGlobalSearchQuery, useLazyGlobalSearchQuery } = searchApi;
