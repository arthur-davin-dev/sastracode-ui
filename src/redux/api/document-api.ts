import { sastraApi } from "./sastra-code";
import type {
  ApiResponse,
  DocumentBlock,
  TutorialDocument,
  TutorialSection,
} from "./tutorial-api";

export interface DocumentPage {
  content: TutorialDocument[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PaginationArgs {
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface BlockCreateRequest {
  type: string;
  data?: Record<string, unknown>;
  position?: number;
}

export interface SectionInput {
  title: string;
  orderIndex?: number;
  blocks?: BlockCreateRequest[];
}

export interface ReorderRequest {
  items: Array<{ id: string; orderIndex: number }>;
}

export interface QuizSettingsRequest {
  durationSeconds: number;
  passingPercentage: number;
}

export interface BlockBulkCreateRequest {
  settings: QuizSettingsRequest;
  blocks: BlockCreateRequest[];
}

const documentTag = (id: string) => ({ type: "Document" as const, id });
const sectionTag = (id: string) => ({ type: "Section" as const, id });
const blockTag = (id: string) => ({ type: "Block" as const, id });

export const documentApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    listDocuments: builder.query<ApiResponse<DocumentPage>, PaginationArgs | void>({
      query: (args) => ({ url: "/v1/documents", params: args ?? undefined }),
      providesTags: (result) => [
        documentTag("LIST"),
        ...(result?.data.content.map(({ id }) => documentTag(id)) ?? []),
      ],
    }),
    saveDocument: builder.mutation<
      ApiResponse<TutorialDocument>,
      { id: string; sections: SectionInput[] }
    >({
      query: ({ id, sections }) => ({
        url: `/v1/documents/${id}`,
        method: "PUT",
        body: { sections },
      }),
      invalidatesTags: (_result, _error, { id }) => [documentTag(id), documentTag("LIST")],
    }),
    createSection: builder.mutation<
      ApiResponse<TutorialSection>,
      { documentId: string; title: string; orderIndex?: number }
    >({
      query: ({ documentId, ...body }) => ({
        url: `/v1/documents/${documentId}/sections`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { documentId }) => [documentTag(documentId)],
    }),
    reorderSections: builder.mutation<
      ApiResponse<null>,
      { documentId: string; body: ReorderRequest }
    >({
      query: ({ documentId, body }) => ({
        url: `/v1/documents/${documentId}/sections/reorder`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { documentId }) => [documentTag(documentId)],
    }),
    getSection: builder.query<ApiResponse<TutorialSection>, string>({
      query: (id) => `/v1/sections/${id}`,
      providesTags: (_result, _error, id) => [sectionTag(id)],
    }),
    updateSection: builder.mutation<
      ApiResponse<TutorialSection>,
      { id: string; title: string }
    >({
      query: ({ id, title }) => ({
        url: `/v1/sections/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: (_result, _error, { id }) => [sectionTag(id)],
    }),
    deleteSection: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/v1/sections/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [sectionTag(id)],
    }),
    updateQuizSettings: builder.mutation<
      ApiResponse<TutorialSection>,
      { sectionId: string; body: QuizSettingsRequest }
    >({
      query: ({ sectionId, body }) => ({
        url: `/v1/sections/${sectionId}/quiz-settings`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { sectionId }) => [sectionTag(sectionId)],
    }),
    addBlock: builder.mutation<
      ApiResponse<DocumentBlock>,
      { sectionId: string; body: BlockCreateRequest }
    >({
      query: ({ sectionId, body }) => ({
        url: `/v1/sections/${sectionId}/blocks`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { sectionId }) => [sectionTag(sectionId)],
    }),
    addBlocks: builder.mutation<
      ApiResponse<DocumentBlock[]>,
      { sectionId: string; body: BlockBulkCreateRequest }
    >({
      query: ({ sectionId, body }) => ({
        url: `/v1/sections/${sectionId}/blocks/bulk`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { sectionId }) => [sectionTag(sectionId)],
    }),
    reorderBlocks: builder.mutation<
      ApiResponse<null>,
      { sectionId: string; body: ReorderRequest }
    >({
      query: ({ sectionId, body }) => ({
        url: `/v1/sections/${sectionId}/blocks/reorder`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { sectionId }) => [sectionTag(sectionId)],
    }),
    updateBlock: builder.mutation<
      ApiResponse<DocumentBlock>,
      { id: string; type?: string; data?: Record<string, unknown> }
    >({
      query: ({ id, ...body }) => ({ url: `/v1/blocks/${id}`, method: "PATCH", body }),
      invalidatesTags: (_result, _error, { id }) => [blockTag(id)],
    }),
    deleteBlock: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/v1/blocks/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _error, id) => [blockTag(id)],
    }),
    duplicateBlock: builder.mutation<ApiResponse<DocumentBlock>, string>({
      query: (id) => ({ url: `/v1/blocks/${id}/duplicate`, method: "POST" }),
      invalidatesTags: (_result, _error, id) => [blockTag(id)],
    }),
  }),
});

export const {
  useListDocumentsQuery,
  useSaveDocumentMutation,
  useCreateSectionMutation,
  useReorderSectionsMutation,
  useGetSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  useUpdateQuizSettingsMutation,
  useAddBlockMutation,
  useAddBlocksMutation,
  useReorderBlocksMutation,
  useUpdateBlockMutation,
  useDeleteBlockMutation,
  useDuplicateBlockMutation,
} = documentApi;
