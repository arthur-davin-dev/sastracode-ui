// import { baseApi } from "@/store/api/baseApi";
import { sastraApi } from "@/redux/api";
import {
  ApiResponse,
  Certificate,
  CertificateVerifyResponse,
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
      invalidatesTags: ["Certificate", { type: "Course", id: "MY_ENROLLMENTS" }],
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

    // POST /api/v1/certificates/verify
    verifyCertificate: builder.mutation<
      ApiResponse<CertificateVerifyResponse>,
      {
        verificationId?: string;
        certificateNumber?: string;
      }
    >({
      query: (body) => ({
        url: "/v1/certificates/verify",
        method: "POST",
        body,
      }),
    }),

    // GET /api/v1/certificates/verify/qr/{hash}
    verifyCertificateByQr: builder.query<
      ApiResponse<CertificateVerifyResponse>,
      string
    >({
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
  useVerifyCertificateMutation,
  useVerifyCertificateByQrQuery,
} = certificateApi;
