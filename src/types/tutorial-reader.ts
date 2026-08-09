export interface TutorialBlock {
  id: string;

  subsectionId?: string | null;
  sectionId?: string | null;

  blockTypeId?: string;

  type: string;

  data: Record<string, unknown>;

  orderIndex: number;

  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialSubsection {
  id: string;

  sectionId: string;

  title: string;

  orderIndex: number;

  blocks?: TutorialBlock[];

  settings?: {
    durationSeconds?: number;
    passingPercentage?: number;
  } | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialSection {
  id: string;

  documentId?: string;

  title: string;

  orderIndex: number;

  contentMode?: "EMPTY" | "DIRECT" | "GROUPED";

  blocks?: TutorialBlock[];

  subsections?: TutorialSubsection[];

  settings?: {
    durationSeconds?: number;
    passingPercentage?: number;
  } | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialDetailData {
  id: string;

  title: string;

  slug?: string;

  coverFileId?: string;

  categoryId?: string;

  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

  summary?: string;

  status?: "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "REJECTED" | "ARCHIVED";

  publishedAt?: string;

  viewCount?: number;

  sections?: TutorialSection[];

  createdAt?: string;
  updatedAt?: string;
}

export interface TutorialLesson {
  id: string;

  sectionId: string;

  type: "SECTION" | "SUBSECTION";

  title: string;

  sectionTitle: string;

  orderIndex: number;

  blocks: TutorialBlock[];
}
