export type Gender = "MALE" | "FEMALE" | "OTHER";

export type WorkStudyType = "STUDENT" | "EMPLOYEE";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DEACTIVATED" | "PENDING";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface UserProfileResponse {
  userId?: string;

  username?: string;

  firstName?: string;

  lastName?: string;

  email?: string;

  gender?: Gender;

  birthday?: string;

  phoneNumber?: string;

  biography?: string;

  workStudyType?: WorkStudyType;

  institutionName?: string;

  locale?: string;

  avatarFileId?: string;

  status?: UserStatus;
}

/**
 * Frontend version.
 * avatarUrl is created by our Next.js proxy.
 */
export interface UserProfile extends UserProfileResponse {
  avatarUrl?: string;
}

export interface UpdateUserInfoRequest {
  firstName?: string;

  lastName?: string;

  email?: string;

  gender?: Gender;

  birthday?: string;

  phoneNumber?: string;

  biography?: string;

  workStudyType?: WorkStudyType;

  institutionName?: string;

  locale?: string;

  avatarFileId?: string;
}

export interface PlayerProfileResponse {
  userId?: string;

  username?: string;

  firstName?: string;

  lastName?: string;

  biography?: string;

  workStudyType?: WorkStudyType;

  institutionName?: string;

  avatarFileId?: string;
}

/**
 * Public view of another user's profile (no email/phone/status — those are
 * private fields only returned for the signed-in user's own profile).
 */
export interface PlayerProfile extends PlayerProfileResponse {
  avatarUrl?: string;
}

export interface AvatarResponse {
  avatarFileId: string;
  avatarUrl: string;
}

export interface FileResponse {
  id: string;

  fileName: string;

  extension: string;

  fileType: string;

  sizeBytes: number;

  uploadedBy: string;

  url: string;

  createdAt: string;

  updatedAt: string;
}
