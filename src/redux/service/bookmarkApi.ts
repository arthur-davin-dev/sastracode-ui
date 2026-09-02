import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { sastraApi } from "@/redux/api/sastra-code";
import type { CourseDetailResponse } from "@/types/api/course";
import type { TutorialSummary } from "@/redux/api/tutorial-api";

export type BookmarkItemType = "COURSE" | "TUTORIAL" | "VIDEO";

export interface BookmarkItem {
  id: string;
  itemType: BookmarkItemType;
  itemId: string;
  createdAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface BookmarkPage {
  content: BookmarkItem[];
  totalElements: number;
  totalPages: number;
}

export const bookmarkApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookmarks: builder.query<ApiResponse<BookmarkPage>, BookmarkItemType>({
      query: (itemType) => ({
        url: "/v1/users/me/bookmarks",
        params: { itemType, page: 0, size: 200, sort: "createdAt,DESC" },
      }),
      providesTags: [{ type: "Bookmark", id: "LIST" }],
    }),
    getBookmarkedCourses: builder.query<CourseDetailResponse[], void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const bookmarksResult = await baseQuery({
          url: "/v1/users/me/bookmarks",
          params: {
            itemType: "COURSE",
            page: 0,
            size: 200,
            sort: "createdAt,DESC",
          },
        });

        if (bookmarksResult.error) return { error: bookmarksResult.error };

        const bookmarkPage = bookmarksResult.data as ApiResponse<BookmarkPage>;
        const bookmarkedIds = (bookmarkPage.data?.content ?? []).map(
          (bookmark) => bookmark.itemId,
        );

        if (bookmarkedIds.length === 0) return { data: [] };

        // Bookmarks store the course UUID as `itemId`, but the public
        // `GET /v1/courses/{param}` detail endpoint resolves `param` as a slug,
        // not a UUID, so fetching each bookmark by id 404s. Resolve the
        // bookmarked courses by scanning the catalog (public FREE + PREMIUM,
        // plus the user's private courses) and matching on `id` instead.
        const CATALOG_PAGE_SIZE = 100;

        async function collectCourses(
          url: string,
          params: Record<string, unknown>,
        ): Promise<CourseDetailResponse[] | { error: FetchBaseQueryError }> {
          const collected: CourseDetailResponse[] = [];
          let page = 0;
          let totalPages = 1;

          do {
            const result = await baseQuery({
              url,
              params: { ...params, page, size: CATALOG_PAGE_SIZE },
            });

            if (result.error) return { error: result.error };

            const payload = result.data as {
              content?: CourseDetailResponse[];
              totalPages?: number;
            };
            collected.push(...(payload.content ?? []));
            totalPages = Math.max(payload.totalPages ?? 1, 1);
            page += 1;
          } while (page < totalPages);

          return collected;
        }

        const [freeCourses, premiumCourses, privateCourses] = await Promise.all([
          collectCourses("/v1/courses", { accessType: "FREE" }),
          collectCourses("/v1/courses", { accessType: "PREMIUM" }),
          // Private courses are optional context: a user without any (or the
          // endpoint returning an error) must not break the bookmarks page.
          collectCourses("/v1/users/me/private-courses", {}).catch(() => []),
        ]);

        if ("error" in freeCourses) return { error: freeCourses.error };
        if ("error" in premiumCourses) return { error: premiumCourses.error };

        const catalog = new Map<string, CourseDetailResponse>();
        for (const group of [freeCourses, premiumCourses, privateCourses]) {
          if (Array.isArray(group)) {
            for (const course of group) catalog.set(course.id, course);
          }
        }

        const courses = bookmarkedIds.flatMap((id) => {
          const course = catalog.get(id);
          return course ? [course] : [];
        });

        return { data: courses };
      },
      providesTags: [{ type: "Bookmark", id: "LIST" }],
    }),
    getBookmarkedTutorials: builder.query<TutorialSummary[], void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const bookmarksResult = await baseQuery({
          url: "/v1/users/me/bookmarks",
          params: {
            itemType: "TUTORIAL",
            page: 0,
            size: 200,
            sort: "createdAt,DESC",
          },
        });

        if (bookmarksResult.error) return { error: bookmarksResult.error };

        const bookmarkPage = bookmarksResult.data as ApiResponse<BookmarkPage>;
        const bookmarks = bookmarkPage.data?.content ?? [];
        const tutorialResults = await Promise.all(
          bookmarks.map((bookmark) =>
            baseQuery(`/v1/tutorials/${encodeURIComponent(bookmark.itemId)}`),
          ),
        );

        const tutorials = tutorialResults.flatMap((result) => {
          if (!result.data) return [];
          const response = result.data as ApiResponse<TutorialSummary>;
          return response.data ? [response.data] : [];
        });

        return { data: tutorials };
      },
      providesTags: [{ type: "Bookmark", id: "LIST" }],
    }),
    addBookmark: builder.mutation<ApiResponse<BookmarkItem>, { itemType: BookmarkItemType; itemId: string }>({
      query: (body) => ({ url: "/v1/bookmarks", method: "POST", body }),
      invalidatesTags: [{ type: "Bookmark", id: "LIST" }],
    }),
    removeBookmark: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/v1/bookmarks/${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Bookmark", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMyBookmarksQuery,
  useGetBookmarkedCoursesQuery,
  useGetBookmarkedTutorialsQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = bookmarkApi;
