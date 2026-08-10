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

interface TutorialSearchFallbackItem {
  id: string;
  title: string;
  slug?: string;
  summary?: string;
  level?: string;
  status?: string;
  viewCount?: number;
  publishedAt?: string;
  createdAt?: string;
}

interface TutorialPageResponse {
  success: boolean;
  data?: {
    content?: TutorialSearchFallbackItem[];
  };
}

export const searchApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query<ApiResponse<SearchResponse>, GlobalSearchArgs>({
      async queryFn(
        { q = "", type, sort = "popular", page = 0, size = 20 },
        _api,
        _extraOptions,
        baseQuery,
      ) {
        const typeParam = Array.isArray(type) ? type.join(",") : type;
        const searchResult = await baseQuery({
          url: "/v1/search",
          params: { q, type: typeParam, sort, page, size },
        });

        if (searchResult.error) return { error: searchResult.error };

        const payload = searchResult.data as ApiResponse<SearchResponse>;
        const tutorialOnly = typeParam === "TUTORIAL";

        // The search service can temporarily return an empty index while
        // published tutorials are available. Keep documentation search useful
        // by falling back to the canonical tutorial catalog in that case.
        if (!tutorialOnly || payload.data.items.length > 0 || !q.trim()) {
          return { data: payload };
        }

        const tutorialsResult = await baseQuery({
          url: "/v1/tutorials",
          params: {
            status: "PUBLISHED",
            page: 0,
            size: 100,
            sort: "publishedAt,desc",
          },
        });

        if (tutorialsResult.error) return { data: payload };

        const tutorialsPayload = tutorialsResult.data as TutorialPageResponse;
        const normalizedQuery = q.trim().toLocaleLowerCase();
        const matching = (tutorialsPayload.data?.content ?? []).filter((tutorial) =>
          [tutorial.title, tutorial.slug, tutorial.summary].some((value) =>
            value?.toLocaleLowerCase().includes(normalizedQuery),
          ),
        );
        const start = page * size;
        const items: SearchResultItem[] = matching
          .slice(start, start + size)
          .map((tutorial) => ({
            id: tutorial.id,
            type: "TUTORIAL",
            title: tutorial.title,
            slug: tutorial.slug,
            description: tutorial.summary,
            level: tutorial.level,
            status: tutorial.status,
            popularity: tutorial.viewCount,
            publishedAt: tutorial.publishedAt,
            createdAt: tutorial.createdAt,
            deepLink: `/documentation/lessons/${tutorial.id}`,
          }));

        return {
          data: {
            ...payload,
            data: {
              ...payload.data,
              total: matching.length,
              totalExact: true,
              items,
            },
          },
        };
      },
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGlobalSearchQuery, useLazyGlobalSearchQuery } = searchApi;
