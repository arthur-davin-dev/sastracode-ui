export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarUrl: string;
  level: number;
  xp: number;
  isCurrentUser?: boolean;
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
}