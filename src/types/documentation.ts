import { CardLevel, TrackSlug } from "@/types/course";
export interface SidebarSection {
  id: number;
  title: string;
  orderIndex: number;
}

export interface SidebarDocument {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
  sections: SidebarSection[];
}
export type LogoItem = {
  name: string;
  imgSrc: string; 
  positionClass: string;
  slug: string;
};
/** Left-hand "Learning Path" sidebar item (dashboard / lesson-list / search) */
export interface DocsNavItem {
  id: string;
  label: string;
  href: string;
  icon: "home" | "book" | "folder" | "bookmark" | "help";
}

export interface InstructorProps {
  instructor: {
    videoTitle: string;
    videoSubtitle: string;
    studentsLabel: string; 
  };
}
/** One entry inside a course table-of-contents group, e.g. "Variables & Data Types" */
export interface CourseTocItem {
  id: string;
  label: string;
  href: string;
  locked?: boolean;
}

/** A collapsible group in the course table-of-contents, e.g. "Java Syntax Basics" */
export interface CourseTocGroup {
  id: string;
  label: string;
  level?: CardLevel;
  items: CourseTocItem[];
}

export type TipVariant = "info" | "success" | "warning" | "danger";

export interface LessonTip {
  id: string;
  variant: TipVariant;
  title: string;
  body: string;
}

export interface LessonInfoCard {
  id: string;
  icon: "primitives" | "references" | "casting" | "widening";
  title: string;
  body: string;
}

export interface LessonQuizOption {
  id: string;
  label: string;
}

export interface LessonQuiz {
  question: string;
  index: number;
  total: number;
  timeLimitLabel: string;
  levelLabel: string;
  options: LessonQuizOption[];
  correctOptionId: string;
}

export interface LessonPageAnchor {
  id: string;
  label: string;
  active?: boolean;
}

export interface LessonDocument {
  id: string;
  trackSlug: TrackSlug;
  trackLabel: string;
  category: string;
  title: string;
  breadcrumb: string[];
  lessonIndexLabel: string;
  readingTimeLabel: string;
  percentComplete: number;
  level: CardLevel;
  levelReadingTimeLabel: string;
  objectives: string[];
  intro: string;
  summary: string;
  infoCards: LessonInfoCard[];
  codeFilename: string;
  code: string;
  tips: LessonTip[];
  instructor: {
    name: string;
    studentsLabel: string;
    videoTitle: string;
    videoSubtitle: string;
  };
  quiz: LessonQuiz;
  pageAnchors: LessonPageAnchor[];
  prevLesson?: { label: string; href: string };
  nextLesson?: { label: string; href: string; level: string; meta: string };
}

export interface SearchResultItem {
  id: string;
  category: string;
  title: string;
  description: string;
  level: CardLevel;
  ctaLabel: string;
}

export interface ContinueLearningCard {
  id: string;
  category: string;
  title: string;
  image: string;
  progressPercent: number;
  href: string;
}

export interface SavedLessonCard {
  id: string;
  category: string;
  title: string;
  readingTimeLabel: string;
  href: string;
}
