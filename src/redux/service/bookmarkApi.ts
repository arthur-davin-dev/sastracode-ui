import { sastraApi } from "@/redux/api/sastra-code";

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
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} = bookmarkApi;
