// export type cetificate ={
//     id: string;
//     learnerName: string;
//     courseName: string;
//     completionDate: string;
//     verificationId: string;
//     qrCodeUrl: string;
//     instructorSignature?: string;
//     platformName: string;
//     type: "VIDEO_LEARNING" | "DOCUMENTATION";

// }
// export interface CertificateProgress {
//   courseId: string;
//   courseName: string;
//   progressPercent: number;
//   isEligible: boolean;
// }
// export interface CertificateStat {
//   icon: string;
//   value: number;
//   label: string;
//   color: "blue" | "green" | "yellow" | "purple";
// }

export interface EarnedCertificate {
  id: string;
  title: string;
  thumbnailUrl: string;
  level: string;
  date: string;
  certificateId: string;
  category: string;
}

export interface CertificateRequirement {
  id: string;
  title: string;
  progressPercent: number;
}

export interface RequirementChecklistItem {
  label: string;
  completed: boolean;
}
export interface CertificateView {
  id: string;
  studentName: string;
  courseName: string;
  courseDescription: string;
  qrCodeUrl: string;
  verificationId: string;
  status: string;
  issuedDate: string;
  skills: string[];
  grade: string;
  quizScore: string;
  studyDuration: string;
  completionWeeks: string;
}

// ===============================

// export interface Certificate {
//   id: string;
//   userId: string;
//   certificateFileId: string;
//   verificationId?: string;
//   certificateHash: string;
//   certificateNumber: string;
//   studentName: string;
//   courseTitle: string;
//   revoked: boolean;
//   issuedAt: string;
// }

// export interface CertificateVerification {
//   id: string;
//   userId: string;
//   certificateFileId: string;
//   certificateHash: string;
//   certificateNumber: string;
//   studentName: string;
//   courseTitle: string;
//   revoked: boolean;
//   issuedAt: string;
// }

// export interface Pageable {
//   offset: number;
//   paged: boolean;
//   pageNumber: number;
//   pageSize: number;
// }

// export interface CertificatePage {
//   totalPages: number;
//   totalElements: number;
//   size: number;
//   content: Certificate[];
//   number: number;
//   pageable: Pageable;
//   numberOfElements: number;
//   first: boolean;
//   last: boolean;
//   empty: boolean;
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
//   timestamp: string;
// }

// ==========================

// types/certificate.ts

export interface Certificate {
  id: string;
  certificateFileId?: string;
  verificationId?: string;
  certificateHash?: string;
  certificateNumber: string;
  studentName: string;
  courseTitle: string;
  revoked?: boolean;
  issuedAt: string;
}

/**
 * Payload of `GET /api/v1/certificates/verify?verificationId={id}`
 * (OpenAPI schema: CertificateVerificationResponse).
 *
 * Mirrors the backend exactly. `verificationId` is deliberately absent — the
 * backend does not echo it back, so the public verify page shows the value
 * from the URL as the reference. `grade` and `courseDescription` are also
 * absent: they were speculative and are not part of the contract.
 *
 * `revoked` is required, not optional. Treating it as optional let an absent
 * flag read as "not revoked", which rendered revoked certificates as valid.
 */
export interface CertificateVerificationResponse {
  id: string;
  /** Internal Keycloak subject. Never render this — it is not public data. */
  userId: string;
  certificateFileId: string;
  certificateHash: string;
  certificateNumber: string;
  studentName: string;
  courseTitle: string;
  revoked: boolean;
  issuedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
