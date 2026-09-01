import { sastraApi } from "@/redux/api";

import type {
  InstructorApplicationResponse,
  ProfileCompletenessResponse,
  SubmitInstructorApplicationRequest,
  UploadedFileResponse,
} from "@/types/instructor-application";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * Normal-user "Become an Instructor" endpoints, injected into the shared
 * `sastraApi` client (same pattern as `profile-api` / `achievementApi`).
 * No admin endpoints live here — Admin is a separate frontend project.
 */
export const instructorApplicationApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/users/me/certificates/profile-completeness
    //
    // Backend is authoritative for which profile fields are required before a
    // user may apply. `providesTags: ["Profile"]` so this refetches after the
    // existing profile edit form saves (that mutation invalidates "Profile").
    getProfileCompleteness: builder.query<ProfileCompletenessResponse, void>({
      query: () => ({
        url: "/v1/users/me/certificates/profile-completeness",
        method: "GET",
      }),

      transformResponse: (response: ApiResponse<ProfileCompletenessResponse>) =>
        response.data,

      providesTags: ["Profile"],
    }),

    // GET /api/v1/instructor-applications/me
    //
    // Backend returns 404 (or a null body) when the user has never applied;
    // callers treat that as "no application yet" and show the apply form.
    getMyInstructorApplication: builder.query<
      InstructorApplicationResponse | null,
      void
    >({
      query: () => ({
        url: "/v1/instructor-applications/me",
        method: "GET",
      }),

      transformResponse: (
        response: ApiResponse<InstructorApplicationResponse | null>,
      ) => response.data ?? null,

      providesTags: [{ type: "InstructorApplication", id: "ME" }],
    }),

    // POST /api/v1/files  (multipart/form-data, field name "file")
    //
    // Existing file API — same one the avatar upload uses. The returned file id
    // becomes `cvFileId` on the application request.
    uploadInstructorCv: builder.mutation<UploadedFileResponse, File>({
      query: (file) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: "/v1/files",
          method: "POST",
          body: formData,
        };
      },

      transformResponse: (response: ApiResponse<UploadedFileResponse>) =>
        response.data,
    }),

    // POST /api/v1/instructor-applications
    //
    // Same endpoint for the first submission and for resubmission after a
    // rejection (the backend contract exposes no separate resubmit route).
    submitInstructorApplication: builder.mutation<
      InstructorApplicationResponse,
      SubmitInstructorApplicationRequest
    >({
      query: (body) => ({
        url: "/v1/instructor-applications",
        method: "POST",
        body,
      }),

      transformResponse: (response: ApiResponse<InstructorApplicationResponse>) =>
        response.data,

      invalidatesTags: [{ type: "InstructorApplication", id: "ME" }],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetProfileCompletenessQuery,
  useGetMyInstructorApplicationQuery,
  useUploadInstructorCvMutation,
  useSubmitInstructorApplicationMutation,
} = instructorApplicationApi;
