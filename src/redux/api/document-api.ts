import { sastraApi } from "./sastra-code";
import type {
  ApiResponse,
  DocumentBlock,
  TutorialDocument,
  TutorialSection,
  TutorialSubsection,
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
  settings?: QuizSettingsRequest;
  blocks?: BlockInput[];
  subsections?: SubsectionInput[];
}

export interface BlockInput {
  type: string;
  data?: Record<string, unknown>;
}

export interface SubsectionInput {
  title: string;
  settings?: QuizSettingsRequest;
  blocks?: BlockInput[];
}

export interface ReorderRequest {
  items: Array<{ blockId: string; orderIndex: number }>;
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
const subsectionTag = (id: string) => ({
  type: "Section" as const,
  id: `subsection-${id}`,
});
const blockTag = (id: string) => ({ type: "Block" as const, id });

export const documentApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public read-only endpoints for document browsing.
    listDocuments: builder.query<
      ApiResponse<DocumentPage>,
      PaginationArgs | void
    >({
      query: (args) => ({ url: "/v1/documents", params: args ?? undefined }),
      providesTags: (result) => [
        documentTag("LIST"),
        ...(result?.data.content.map(({ id }) => documentTag(id)) ?? []),
      ],
    }),
    getDocumentById: builder.query<ApiResponse<TutorialDocument>, string>({
      query: (id) => `/v1/documents/${id}`,
      providesTags: (_result, _error, id) => [documentTag(id)],
    }),
    getSection: builder.query<ApiResponse<TutorialSection>, string>({
      query: (id) => `/v1/sections/${id}`,
      providesTags: (_result, _error, id) => [sectionTag(id)],
    }),
  }),
});

export const {
  useListDocumentsQuery,
  useGetDocumentByIdQuery,
  useGetSectionQuery,
} = documentApi;
