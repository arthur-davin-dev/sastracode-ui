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
        const bookmarks = bookmarkPage.data?.content ?? [];
        // KNOWN GAP: GET /v1/courses/{x} now expects the course SLUG, but
        // BookmarkResponse.itemId is a UUID (confirmed against the backend
        // OpenAPI schema — no slug anywhere on the bookmark response, and no
        // batch "courses by id" endpoint exists to resolve it client-side).
        // This call will 404 for every bookmarked course until the backend
        // either accepts an id here too or returns the course slug on the
        // bookmark. Left unchanged rather than guessing a workaround.
        const courseResults = await Promise.all(
          bookmarks.map((bookmark) =>
            baseQuery(`/v1/courses/${encodeURIComponent(bookmark.itemId)}`),
          ),
        );

        const courses = courseResults.flatMap((result) =>
          result.data ? [result.data as CourseDetailResponse] : [],
        );

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
