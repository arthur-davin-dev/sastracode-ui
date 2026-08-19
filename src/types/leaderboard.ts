export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarUrl: string;
  level?: number;
  xp: number;
  isCurrentUser?: boolean;
}

export type LeaderboardPeriod =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "GLOBAL"
  | "COURSE";

export interface LeaderboardSnapshotResponse {
  id: string;
  period: LeaderboardPeriod;
  periodStart?: string;
  courseId?: string;
  userId: string;
  score: number;
  rank: number;
  createdAt?: string;
  name?: string;
  fullName?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  avatarFileId?: string;
  user?: {
    name?: string;
    fullName?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    avatarFileId?: string;
  };
}

export interface LeaderboardPageResponse {
  content: LeaderboardSnapshotResponse[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface LeaderboardUserProfile {
  userId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarFileId?: string;
}

export interface LeaderboardUserProfilePage {
  content: LeaderboardUserProfile[];
  totalElements: number;
  totalPages: number;
}

export interface LeaderboardApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

export interface WeeklyGoalDay {
  day: string;
  completed: boolean;
  isToday?: boolean;
}

export interface UserStat {
  icon: string;
  value: string | number;
  label: string;
  color: string;
}

export interface TopPerformer {
  rank: number;
  name: string;
  xp: number;
  avatarUrl?: string;
}
