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

export interface ForgotPasswordRequest {
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

    // Backend uses the Keycloak Admin API to send a reset-password email.
    // Always resolves to a generic message — it must not reveal whether the
    // address is registered.
    forgotPassword: builder.mutation<
      ApiResponse<void>,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/v1/auth/forgot-password",
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
  useForgotPasswordMutation,
} = authApi;