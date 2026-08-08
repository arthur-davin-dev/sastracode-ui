import { sastraApi } from "./sastra-code";
import type { ApiResponse } from "./tutorial-api";

export type SearchContentType = "COURSE" | "TUTORIAL" | "VIDEO" | "CODING_TASK";

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

export interface SearchArgs {
  q?: string;
  type?: string;
  sort?: "popular" | "newest" | "progress";
  page?: number;
  size?: number;
}

export const searchApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    searchContent: builder.query<ApiResponse<SearchResponse>, SearchArgs>({
      query: (params) => ({ url: "/v1/search", params }),
    }),
  }),
});

export const { useSearchContentQuery } = searchApi;
