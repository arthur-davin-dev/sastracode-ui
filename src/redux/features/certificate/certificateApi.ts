// import { baseApi } from "@/store/api/baseApi";
import { sastraApi } from "@/redux/api";
import {
  ApiResponse,
  Certificate,
  CertificateVerificationResponse,
  PageResponse,
} from "@/types/certificate";

export const certificateApi = sastraApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /api/v1/users/me/certificates
    getMyCertificates: builder.query<
      ApiResponse<PageResponse<Certificate>>,
      {
        page?: number;
        size?: number;
      }
    >({
      query: ({ page = 0, size = 10 }) => ({
        url: "/v1/users/me/certificates",
        method: "GET",
        params: {
          page,
          size,
        },
      }),
      // Intercept 404 and transform it into a valid empty structure
      transformResponse: (response: ApiResponse<PageResponse<Certificate>>) =>
        response,
      transformErrorResponse: (response: { status: number | string }) => {
        if (response.status === 404) {
          return {
            success: true,
            message: "មិនទាន់មានវិញ្ញាបនបត្រ",
            data: {
              content: [],
              page: 0,
              size: 10,
              totalElements: 0,
              totalPages: 0,
              last: true,
            },
          };
        }
        return response;
      },
      providesTags: ["Certificate"],
    }),

    // GET /api/v1/users/me/certificates — every page, flattened.
    //
    // There is no per-course "get certificate" endpoint (issuing is POST-only),
    // so the already-claimed check has to scan the caller's whole list. This
    // pages through it once here rather than making every claim card guess at a
    // page size or fire its own request.
    getAllMyCertificates: builder.query<Certificate[], void>({
      async queryFn(_arg, _api, _extra, baseQuery) {
        const PAGE_SIZE = 100;
        const all: Certificate[] = [];

        // Guard the loop so a backend that never reports `last` can't spin it
        // forever (5_000 certificates is already far past anything realistic).
        for (let page = 0; page < 50; page += 1) {
          const result = await baseQuery({
            url: "/v1/users/me/certificates",
            params: { page, size: PAGE_SIZE },
          });

          if (result.error) {
            // 404 is the backend's "you have none yet" — an empty list, not a
            // failure (mirrors getMyCertificates' transformErrorResponse).
            if (result.error.status === 404) break;
            return { error: result.error };
          }

          const body = result.data as ApiResponse<PageResponse<Certificate>>;
          const content = body?.data?.content ?? [];
          all.push(...content);

          if (body?.data?.last || content.length < PAGE_SIZE) break;
        }

        return { data: all };
      },
      providesTags: ["Certificate"],
    }),

    // POST /api/v1/courses/{courseId}/certificate
    issueCourseCertificate: builder.mutation<ApiResponse<Certificate>, string>({
      query: (courseId) => ({
        url: `/v1/courses/${encodeURIComponent(courseId)}/certificate`,
        method: "POST",
      }),
      invalidatesTags: [
        "Certificate",
        { type: "Course", id: "MY_ENROLLMENTS" },
      ],
    }),

    // GET /api/v1/certificates/{id}
    getCertificateById: builder.query<ApiResponse<Certificate>, string>({
      query: (id) => ({
        url: `/v1/certificates/${encodeURIComponent(id)}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Certificate", id }],
    }),

    // GET /api/v1/certificates/{id}/download
    getCertificateDownload: builder.query<ApiResponse<string>, string>({
      query: (id) => ({
        url: `/v1/certificates/${encodeURIComponent(id)}/download`,
        method: "GET",
      }),
    }),

    // GET /api/v1/certificates/verify?verificationId={id} (public)
    verifyCertificate: builder.query<
      ApiResponse<CertificateVerificationResponse>,
      string
    >({
      query: (verificationId) => ({
        url: "/v1/certificates/verify",
        method: "GET",
        params: { verificationId },
      }),
    }),

    // GET /api/v1/certificates/verify/qr/{hash} (public)
    verifyCertificateByQr: builder.query<ApiResponse<Certificate>, string>({
      query: (hash) => ({
        url: `/v1/certificates/verify/qr/${encodeURIComponent(hash)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMyCertificatesQuery,
  useGetAllMyCertificatesQuery,
  useIssueCourseCertificateMutation,
  useGetCertificateByIdQuery,
  useLazyGetCertificateDownloadQuery,
  useVerifyCertificateQuery,
  useLazyVerifyCertificateQuery,
  useVerifyCertificateByQrQuery,
} = certificateApi;
