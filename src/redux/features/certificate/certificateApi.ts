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
      providesTags: ["Certificate"],
    }),

    // GET /api/v1/courses/{courseId}/certificate
    getCourseCertificate: builder.query<ApiResponse<Certificate>, string>({
      query: (courseId) => ({
        url: `/v1/courses/${encodeURIComponent(courseId)}/certificate`,
        method: "GET",
      }),
      providesTags: ["Certificate"],
    }),

    // POST /api/v1/courses/{courseId}/certificate
    issueCourseCertificate: builder.mutation<ApiResponse<Certificate>, string>({
      query: (courseId) => ({
        url: `/v1/courses/${encodeURIComponent(courseId)}/certificate`,
        method: "POST",
      }),
      // Issuing a certificate can also flip the enrollment to COMPLETED
      // server-side, so refresh the enrollment lists alongside certificates.
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

    // GET /api/v1/certificates/verify?verificationId={id}  (public)
    //
    // This was previously modelled as a POST with a JSON body. Per the
    // OpenAPI spec it is a GET with a required `verificationId` query
    // parameter, and there is no lookup by certificateNumber at all.
    //
    // Note: the public verify page does NOT use this hook. It calls the
    // backend directly from a Server Component, because this slice's
    // baseQuery points at `/api/backend`, which resolves a NextAuth session
    // on every request — pointless work for an anonymous visitor.
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

    // GET /api/v1/certificates/verify/qr/{hash}  (public)
    //
    // Kept for completeness. Certificates now encode `verificationId` in their
    // QR codes, so this hash-based path is unused by the frontend. It also
    // returns CertificateResponse, a different shape from the endpoint above.
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
  useGetCourseCertificateQuery,
  useIssueCourseCertificateMutation,
  useGetCertificateByIdQuery,
  useLazyGetCertificateDownloadQuery,
  useVerifyCertificateQuery,
  useLazyVerifyCertificateQuery,
  useVerifyCertificateByQrQuery,
} = certificateApi;
