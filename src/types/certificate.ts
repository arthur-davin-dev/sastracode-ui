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

export interface CertificateVerifyResponse {
  studentName: string;
  courseTitle: string;
  certificateNumber: string;
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
