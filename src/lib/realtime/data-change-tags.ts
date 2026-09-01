import type { TagDescription } from "@reduxjs/toolkit/query";

import type { DataChangeEvent } from "./types";

/**
 * Tags produced here MUST match the `providesTags` already declared by the
 * active RTK Query endpoints. Verified against:
 *
 *   src/redux/api/course-api.ts
 *     getPublicCourses       -> { type: "Course", id: "PUBLIC_LIST" } + { type: "Course", id }
 *     getCourseById          -> { type: "Course", id: courseId }
 *     getCourseSections      -> { type: "Course", id: courseId }
 *     getMyPrivateCourses    -> { type: "Course", id: "MY_PRIVATE" } + { type: "Course", id }
 *     getMyEnrollments       -> { type: "Course", id: "MY_ENROLLMENTS" }
 *     getContinueLearning    -> { type: "Course", id: "CONTINUE_LEARNING" }
 *     getCourseProgress      -> { type: "Course", id: courseId }
 *     getMyLearningProgress  -> { type: "Course", id: "MY_LEARNING_PROGRESS" } + { type: "Course", id }
 *   src/redux/api/courseApi.ts (alternate/legacy course endpoints)
 *     getCourses             -> { type: "Course", id: "LIST" }
 *
 *   src/redux/api/tutorial-api.ts
 *     listTutorials          -> { type: "Tutorial", id: "LIST" } + { type: "Tutorial", id }
 *     getTutorialById/BySlug -> { type: "Tutorial", id }
 *     get*Progress/Toc/Nav.. -> { type: "Tutorial", id }
 *
 * `invalidateTags` only refetches an endpoint that provides a matching tag AND
 * has at least one mounted subscriber, so listing every list-shaped tag here
 * is cheap: an unrelated page with no such query mounted does no network work.
 */
export type InvalidationTag = TagDescription<"Course" | "Tutorial">;

const COURSE_LIST_TAGS: InvalidationTag[] = [
  { type: "Course", id: "PUBLIC_LIST" },
  { type: "Course", id: "LIST" },
  { type: "Course", id: "MY_PRIVATE" },
  { type: "Course", id: "MY_ENROLLMENTS" },
  { type: "Course", id: "CONTINUE_LEARNING" },
  { type: "Course", id: "MY_LEARNING_PROGRESS" },
];

const TUTORIAL_LIST_TAGS: InvalidationTag[] = [{ type: "Tutorial", id: "LIST" }];

/**
 * A lesson body is edited in the admin as its own child rows — sections,
 * subsections, content blocks, quizzes, quiz questions, flashcards — and each
 * commit broadcasts its own `DataChangeEvent` whose `id` is that child row,
 * not the tutorial. Without the tutorial id we can't target one cache entry,
 * so we invalidate the whole `"Tutorial"` tag type: RTK Query only refetches
 * an endpoint that both carries a `Tutorial` tag AND has a mounted subscriber,
 * so an open lesson reader refetches itself and every other screen is a no-op.
 *
 * Matching is done on a normalized (upper-case) substring so a backend that
 * names the row `TUTORIAL_BLOCK`, `DOCUMENT_SECTION`, `SUBSECTION_QUIZ`, etc.
 * still routes here without needing this list kept perfectly in sync.
 */
const TUTORIAL_CONTENT_HINTS = [
  "TUTORIAL",
  "DOCUMENT",
  "SECTION",
  "SUBSECTION",
  "BLOCK",
  "QUIZ",
  "QUESTION",
  "FLASHCARD",
] as const;

/** Same idea for course-side lesson content (chapters, lessons, videos). */
const COURSE_CONTENT_HINTS = [
  "COURSE",
  "CHAPTER",
  "LESSON",
  "VIDEO",
  "MODULE",
] as const;

function matchesAny(value: string, hints: readonly string[]): boolean {
  return hints.some((hint) => value.includes(hint));
}

/**
 * Map a backend `DataChangeEvent` to the RTK Query cache tags that must be
 * invalidated. Returns `[]` for anything this frontend version does not handle
 * (unknown entity or unknown action) so the caller does nothing.
 */
export function tagsForDataChange(event: DataChangeEvent): InvalidationTag[] {
  if (!event || event.type !== "DATA_CHANGED") return [];

  const entity = event.entity.trim().toUpperCase();
  const action = event.action.trim().toUpperCase();
  const id = event.id;

  if (
    action !== "CREATED" &&
    action !== "UPDATED" &&
    action !== "DELETED"
  ) {
    return [];
  }

  const tags: InvalidationTag[] = [];

  if (matchesAny(entity, TUTORIAL_CONTENT_HINTS)) {
    tags.push(...TUTORIAL_LIST_TAGS);
    // Precise tag when the event really is the tutorial itself; otherwise the
    // whole tag type so a child-row edit still refetches the open reader.
    if (id && entity === "TUTORIAL") {
      tags.push({ type: "Tutorial", id });
    } else {
      tags.push("Tutorial");
    }
  }

  if (matchesAny(entity, COURSE_CONTENT_HINTS)) {
    tags.push(...COURSE_LIST_TAGS);
    if (id && entity === "COURSE") {
      tags.push({ type: "Course", id });
    } else {
      tags.push("Course");
    }
  }

  return tags;
}
