import { sastraApi } from "@/redux/api";

import type {
  ApiResponse,
  AvatarResponse,
  UpdateUserInfoRequest,
  UserProfile,
  UserProfileResponse,
} from "@/types/profile";

function mapProfile(profile: UserProfileResponse): UserProfile {
  return {
    ...profile,

    avatarUrl: profile.avatarFileId
      ? `/api/profile/avatar/${encodeURIComponent(profile.avatarFileId)}`
      : undefined,
  };
}

export const profileApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    // =================================
    // GET MY PROFILE
    // =================================

    getMyProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: "/profile",

        method: "GET",
      }),

      transformResponse: (response: ApiResponse<UserProfileResponse>) => {
        return mapProfile(response.data);
      },

      providesTags: ["Profile"],
    }),

    // =================================
    // UPDATE PROFILE
    // =================================

    updateMyProfile: builder.mutation<UserProfile, UpdateUserInfoRequest>({
      query: (body) => ({
        url: "/profile",

        method: "PATCH",

        body,
      }),

      transformResponse: (response: ApiResponse<UserProfileResponse>) => {
        return mapProfile(response.data);
      },

      invalidatesTags: ["Profile"],
    }),

    // =================================
    // UPLOAD AVATAR
    // =================================

    uploadMyAvatar: builder.mutation<AvatarResponse, File>({
      query: (file) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: "/profile/avatar",

          method: "POST",

          body: formData,
        };
      },

      transformResponse: (response: ApiResponse<AvatarResponse>) => {
        return response.data;
      },

      invalidatesTags: ["Profile"],
    }),

    // =================================
    // RESET PASSWORD
    // =================================

    resetMyPassword: builder.mutation<void, void>({
      query: () => ({
        url: "/profile/reset-password",

        method: "POST",
      }),

      transformResponse: () => undefined,
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetMyProfileQuery,

  useUpdateMyProfileMutation,

  useUploadMyAvatarMutation,

  useResetMyPasswordMutation,
} = profileApi;
