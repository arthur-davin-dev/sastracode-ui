export interface NotificationItem {
  id: string;
  type: "course" | "reward" | "streak" | "system"; // កំណត់ពណ៌ icon
  category: string;      // "ថ្មីៗ", "រង្វាន់", "ការរំលឹក", "ប្រព័ន្ធ"
  title: string;
  description: string;
  time: string;          // "២ នាទីមុន"
  isUnread: boolean;
  streakData?: {
    progressPercent: number;
    label: string;
  };
}

export interface NotificationSuggestion {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  variant: "primary" | "secondary" | "locked";
}

export type ApiNotificationType =
  | "NEW_COURSE"
  | "NEW_TUTORIAL"
  | "CERTIFICATE"
  | "BADGE"
  | "LEADERBOARD"
  | "PROGRESS"
  | "SYSTEM"
  | "INSTRUCTOR_APPLICATION_SUBMITTED"
  | "INSTRUCTOR_APPLICATION_RESUBMITTED"
  | "INSTRUCTOR_APPLICATION_APPROVED"
  | "INSTRUCTOR_APPLICATION_REJECTED"
  | "INSTRUCTOR_ACCOUNT_CREATED";

export interface ApiNotification {
  notificationReceiverId: string;
  notificationSenderId?: string;
  type: ApiNotificationType;
  title: string;
  content: string;
  deepLink?: string;
  isRead: boolean;
  readAt?: string;
  deliveredAt: string;
  createdAt?: string;
}

export interface NotificationPage {
  content: ApiNotification[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface NotificationApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}
