// import { sastraApi } from "./sastra-code";
// import type {
//   ApiResponse,
//   RegisterRequest,
//   RegisterResponse,
// } from "@/types/api/auth";

// export const authApi = sastraApi.injectEndpoints({
//   endpoints: (builder) => ({
//     register: builder.mutation<ApiResponse<RegisterResponse>, RegisterRequest>({
//       query: (body) => ({
//         url: "/v1/auth/register",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Auth"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const { useRegisterMutation } = authApi;


import { sastraApi } from "./sastra-code";

import type {
  ApiResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/api/auth";

export interface ResendVerificationRequest {
  email: string;
}

export const authApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      ApiResponse<RegisterResponse>,
      RegisterRequest
    >({
      query: (body) => ({
        url: "/v1/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    resendVerificationEmail: builder.mutation<
      ApiResponse<void>,
      ResendVerificationRequest
    >({
      query: (body) => ({
        url: "/v1/auth/resend-verification-email",
        method: "POST",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useResendVerificationEmailMutation,
} = authApi;