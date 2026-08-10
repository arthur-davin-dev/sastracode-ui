export type cetificate ={
    id: string;
    learnerName: string;
    courseName: string;
    completionDate: string;
    verificationId: string;
    qrCodeUrl: string;
    instructorSignature?: string;
    platformName: string;
    type: "VIDEO_LEARNING" | "DOCUMENTATION";
    
}
export interface CertificateProgress {
  courseId: string;
  courseName: string;
  progressPercent: number;
  isEligible: boolean;
}
export interface CertificateStat {
  icon: string;
  value: number;
  label: string;
  color: "blue" | "green" | "yellow" | "purple"; 
}

export interface EarnedCertificate {
  id: string;
  title: string;
  thumbnailUrl: string;
  level: string;
  date: string;
  certificateId: string; 
  category: string;      
}

export interface InProgressCertificate {
  id: string;
  title: string;
  thumbnailUrl: string;
  progressPercent: number;
  level: string;
  daysLeft: number;      
  totalDays: number;     
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