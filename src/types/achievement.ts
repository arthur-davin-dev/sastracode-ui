
export interface UserSummary {
  name: string;
  avatarUrl: string;
  currentXp: number;
  nextLevelXp: number;
  levelProgressPercent: number;
  nextLevel: number;
  badges: number;
  score: number;
  certificates: number;
}

export interface AchievementBadge {   
  id: string;
  name: string;
  iconUrl: string;
  points: number;
  progressPercent: number;
  remaining: number;
  locked: boolean;
}

export interface Activity {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  xp: number;
}

export interface LearningPath {
  id: string;
  name: string;
  status: string;
  progressPercent: number;
}
export interface LearningPathProgressProps {
  paths: LearningPath[];
  completedCount: number;
  totalCount: number;
}
export interface BadgeDetail {
  id: string;
  name: string;
  iconUrl: string;
  points: number;
  description: string;
  xpReward: number;
  xpProgressPercent: number;
  completionPercent: number;
  earnedDate: string;
  category: string;
  totalEarners?: number;
  requirements: BadgeRequirement[];
  similarBadges: SimilarBadge[];
}

export interface BadgeRequirement {
  id: string;
  title: string;
  description: string;
  progress: string;
  completed: boolean;
}

export interface SimilarBadge {
  id: string;
  icon: string;
  name: string;
  status: string;
}
