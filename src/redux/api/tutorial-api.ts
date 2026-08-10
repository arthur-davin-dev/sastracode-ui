import { sastraApi } from "./sastra-code";

export type TutorialLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type TutorialStatus =
  | "DRAFT"
  | "IN_REVIEW"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

export interface TutorialSummary {
  id: string;
  title: string;
  slug: string;
  coverFileId?: string;
  categoryId?: string;
  level: TutorialLevel;
  summary?: string;
  status: TutorialStatus;
  publishedAt?: string;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DocumentBlock {
  id: string;
  subsectionId?: string | null;
  sectionId?: string | null;
  blockTypeId?: string;
  type: string;
  data: Record<string, unknown>;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialSubsection {
  id: string;
  sectionId: string;
  title: string;
  orderIndex: number;
  contentMode?: "EMPTY" | "DIRECT" | "GROUPED";
  settings?: QuizSettings | null;
  blocks?: DocumentBlock[];
  subsections?: TutorialSubsection[];
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizSettings {
  durationSeconds?: number;
  passingPercentage?: number;
}

export interface TutorialSubsection {
  id: string;
  sectionId: string;
  title: string;
  orderIndex: number;
  settings?: QuizSettings | null;
  blocks?: DocumentBlock[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialSection {
  id: string;
  documentId: string;
  title: string;
  orderIndex: number;
  contentMode?: "EMPTY" | "DIRECT" | "GROUPED";
  settings?: QuizSettings | null;
  blocks?: DocumentBlock[];
  subsections?: TutorialSubsection[];
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizSettings {
  durationSeconds?: number;
  passingPercentage?: number;
}

export interface TutorialSubsection {
  id: string;
  sectionId: string;
  title: string;
  orderIndex: number;
  settings?: QuizSettings | null;
  blocks?: DocumentBlock[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialDetail extends TutorialSummary {
  sections: TutorialSection[];
}

export interface TutorialPage {
  content: TutorialSummary[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ListTutorialsArgs {
  categoryId?: string;
  level?: TutorialLevel;
  status?: TutorialStatus;
  tag?: string;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface TutorialCreateRequest {
  title: string;
  slug: string;
  level: TutorialLevel;
  coverFileId?: string;
  categoryId?: string;
  summary?: string;
}

export interface TutorialUpdateRequest {
  title: string;
  level: TutorialLevel;
  coverFileId?: string;
  categoryId?: string;
  summary?: string;
}

export interface TutorialDocument {
  id: string;
  tutorialId: string;
  sections: TutorialSection[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialTocItem {
  sectionId: string;
  blockId: string;
  text: string;
  level: number;
}

export interface TutorialNavigationItem {
  id: string;
  title: string;
  slug: string;
}

export interface TutorialNavigation {
  previous?: TutorialNavigationItem;
  next?: TutorialNavigationItem;
}

export interface CodingTaskSummary {
  id: string;
  title: string;
  slug: string;
  description?: string;
  challengeType: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  starterCode?: string;
  taskConfig?: Record<string, unknown>;
  playCount?: number;
}

const tutorialTag = (id: string) => ({ type: "Tutorial" as const, id });

export const tutorialApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    listTutorials: builder.query<ApiResponse<TutorialPage>, ListTutorialsArgs | void>({
      query: (args) => ({
        url: "/v1/tutorials",
        params: {
          categoryId: args?.categoryId,
          level: args?.level,
          status: args?.status,
          tag: args?.tag,
          page: args?.page,
          size: args?.size,
          sort: args?.sort,
        },
      }),
      providesTags: (result) => [
        { type: "Tutorial", id: "LIST" },
        ...(result?.data.content.map((tutorial) => tutorialTag(tutorial.id)) ?? []),
      ],
    }),
    getTutorialById: builder.query<ApiResponse<TutorialDetail>, string>({
      query: (id) => `/v1/tutorials/${id}`,
      providesTags: (_result, _error, id) => [tutorialTag(id)],
    }),
    getTutorialBySlug: builder.query<ApiResponse<TutorialDetail>, string>({
      query: (slug) => `/v1/tutorials/slug/${encodeURIComponent(slug)}`,
      providesTags: (result) =>
        result ? [tutorialTag(result.data.id)] : [{ type: "Tutorial", id: "DETAIL" }],
    }),
    createTutorial: builder.mutation<ApiResponse<TutorialSummary>, TutorialCreateRequest>({
      query: (body) => ({ url: "/v1/tutorials", method: "POST", body }),
      invalidatesTags: [{ type: "Tutorial", id: "LIST" }],
    }),
    updateTutorial: builder.mutation<
      ApiResponse<TutorialSummary>,
      { id: string; body: TutorialUpdateRequest }
    >({
      query: ({ id, body }) => ({ url: `/v1/tutorials/${id}`, method: "PUT", body }),
      invalidatesTags: (_result, _error, { id }) => [tutorialTag(id), { type: "Tutorial", id: "LIST" }],
    }),
    updateTutorialStatus: builder.mutation<
      ApiResponse<TutorialSummary>,
      { id: string; status: TutorialStatus }
    >({
      query: ({ id, status }) => ({ url: `/v1/tutorials/${id}/status`, method: "PATCH", body: { status } }),
      invalidatesTags: (_result, _error, { id }) => [tutorialTag(id), { type: "Tutorial", id: "LIST" }],
    }),
    deleteTutorial: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/v1/tutorials/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [tutorialTag(id), { type: "Tutorial", id: "LIST" }],
    }),
    incrementTutorialView: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/v1/tutorials/${id}/view`, method: "POST" }),
      invalidatesTags: (_result, _error, id) => [tutorialTag(id)],
    }),
    getTutorialDocument: builder.query<ApiResponse<TutorialDocument>, string>({
      query: (id) => `/v1/tutorials/${id}/document`,
      providesTags: (_result, _error, id) => [tutorialTag(id)],
    }),
    createTutorialDocument: builder.mutation<ApiResponse<TutorialDocument>, string>({
      query: (id) => ({ url: `/v1/tutorials/${id}/document`, method: "POST" }),
      invalidatesTags: (_result, _error, id) => [tutorialTag(id)],
    }),
    getTutorialToc: builder.query<ApiResponse<TutorialTocItem[]>, string>({
      query: (id) => `/v1/tutorials/${id}/toc`,
      providesTags: (_result, _error, id) => [tutorialTag(id)],
    }),
    getTutorialNavigation: builder.query<ApiResponse<TutorialNavigation>, string>({
      query: (id) => `/v1/tutorials/${id}/nav`,
      providesTags: (_result, _error, id) => [tutorialTag(id)],
    }),
    getTutorialCodingTasks: builder.query<ApiResponse<CodingTaskSummary[]>, string>({
      query: (id) => `/v1/tutorials/${id}/coding-tasks`,
      providesTags: (_result, _error, id) => [tutorialTag(id)],
    }),
  }),
});

export const {
  useListTutorialsQuery,
  useLazyListTutorialsQuery,
  useGetTutorialByIdQuery,
  useLazyGetTutorialByIdQuery,
  useGetTutorialBySlugQuery,
  useLazyGetTutorialBySlugQuery,
  useCreateTutorialMutation,
  useUpdateTutorialMutation,
  useUpdateTutorialStatusMutation,
  useDeleteTutorialMutation,
  useIncrementTutorialViewMutation,
  useGetTutorialDocumentQuery,
  useLazyGetTutorialDocumentQuery,
  useCreateTutorialDocumentMutation,
  useGetTutorialTocQuery,
  useGetTutorialNavigationQuery,
  useGetTutorialCodingTasksQuery,
} = tutorialApi;
