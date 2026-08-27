export interface UserSummaryResponse {
  userId?: string;
  userName?: string;
  avatarFileId?: string;
}

export interface QuestionResponse {
  id: string;
  user?: UserSummaryResponse;
  title?: string;
  content?: string;
  isResolved?: boolean;
  isHidden?: boolean;
  upvoteCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateQuestionRequest {
  title: string;
  content: string;
}

export interface UpdateQuestionRequest {
  title: string;
  content: string;
}

export type QuestionSort = "newest" | "oldest" | "popular";

export interface QuestionQueryArgs {
  videoId: string;
  resolved?: boolean;
  sort?: QuestionSort;
  page?: number;
  size?: number;
}

export interface PageQuestionResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: QuestionResponse[];
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface QuestionSummaryResponse {
  id?: string;
  title?: string;
}

export interface AnswerResponse {
  answerId: string;
  user?: UserSummaryResponse;
  question?: QuestionSummaryResponse;
  content?: string;
  isAccepted?: boolean;
  isHidden?: boolean;
  upvoteCount?: number;
}

export interface CreateAnswerRequest {
  content: string;
}

export interface UpdateAnswerRequest {
  content: string;
}

export interface AnswerQueryArgs {
  questionId: string;
  accept?: boolean;
  sort?: QuestionSort;
  page?: number;
  size?: number;
}

export interface PagedResponseAnswerResponse {
  content: AnswerResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface VoteResponse {
  targetId: string;
  score: number;
  status: boolean;
}

export interface VideoResponse {
  id: string;
  detailId?: string;
  youtubeVideoId?: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  durationSeconds?: number;
  orderIndex?: number;
  lectureNo?: number;
  isPreview?: boolean;
  isPublished?: boolean;
  embedUrl?: string;
}

export interface VideoProgressResponse {
  videoId: string;
  completed?: boolean;
  positionSeconds?: number;
  completedAt?: string;
  lastWatchedAt?: string;
}

export interface UpdateVideoProgressRequest {
  completed: boolean;
}

export interface UpdatePlaybackPositionRequest {
  positionSeconds: number;
}

export interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}
