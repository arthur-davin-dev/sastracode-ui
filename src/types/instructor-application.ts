// Types for the normal-user "Become an Instructor" flow.
// Mirrors the backend contract at https://api.sastracode.tech/v3/api-docs
//   - GET  /api/v1/instructor-applications/me
//   - POST /api/v1/instructor-applications           (submit + resubmit)
//   - GET  /api/v1/users/me/certificates/profile-completeness
//   - POST /api/v1/files                             (CV upload)
//
// Admin endpoints intentionally omitted — Admin is a separate frontend project.

export type InstructorApplicationStatus = "PENDING" | "APPROVED" | "REJECTED";

// GET /api/v1/instructor-applications/me -> ApiResponse<InstructorApplicationResponse>
export interface InstructorApplicationResponse {
  id: string;

  userId: string;

  expertise: string;

  cvFileId: string;

  status: InstructorApplicationStatus;

  rejectionReason?: string;

  reviewedBy?: string;

  reviewedAt?: string;

  createdAt?: string;

  updatedAt?: string;
}

// POST /api/v1/instructor-applications body.
// Backend validation: expertise @NotBlank @Size(max = 2000); cvFileId @NotNull (uuid).
export interface SubmitInstructorApplicationRequest {
  expertise: string;

  cvFileId: string;
}

// GET /api/v1/users/me/certificates/profile-completeness
//   -> ApiResponse<ProfileCompletenessResponse>
export interface ProfileCompletenessResponse {
  complete: boolean;

  missingFields: string[];
}

// POST /api/v1/files -> ApiResponse<FileResponse>. Only the fields this feature uses.
export interface UploadedFileResponse {
  id: string;

  fileName?: string;

  extension?: string;

  contentType?: string;

  sizeBytes?: number;

  url?: string;
}
