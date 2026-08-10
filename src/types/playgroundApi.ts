import { sastraApi } from "@/redux/api";

import type {
  ApiResponse,
  CodeExecuteRequest,
  CodeExecuteResponse,
} from "@/types/playground";

export const playgroundApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    executeCode: builder.mutation<CodeExecuteResponse, CodeExecuteRequest>({
      query: (body) => ({
        url: "/v1/code/execute",

        method: "POST",

        body,
      }),

      transformResponse: (response: ApiResponse<CodeExecuteResponse>) => {
        return response.data;
      },
    }),
  }),

  overrideExisting: false,
});

export const { useExecuteCodeMutation } = playgroundApi;
