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
 * Map a backend `DataChangeEvent` to the RTK Query cache tags that must be
 * invalidated. Returns `[]` for anything this frontend version does not handle
 * (unknown entity or unknown action) so the caller does nothing.
 */
export function tagsForDataChange(event: DataChangeEvent): InvalidationTag[] {
  if (!event || event.type !== "DATA_CHANGED") return [];

  const { entity, action, id } = event;

  switch (entity) {
    case "COURSE": {
      if (action === "CREATED") return [...COURSE_LIST_TAGS];
      if (action === "UPDATED" || action === "DELETED") {
        return id
          ? [...COURSE_LIST_TAGS, { type: "Course", id }]
          : [...COURSE_LIST_TAGS];
      }
      return [];
    }

    case "TUTORIAL": {
      if (action === "CREATED") return [...TUTORIAL_LIST_TAGS];
      if (action === "UPDATED" || action === "DELETED") {
        return id
          ? [...TUTORIAL_LIST_TAGS, { type: "Tutorial", id }]
          : [...TUTORIAL_LIST_TAGS];
      }
      return [];
    }

    default:
      return [];
  }
}
