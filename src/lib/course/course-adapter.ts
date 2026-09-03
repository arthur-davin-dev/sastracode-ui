// import type {
//   CourseDetailResponse,
//   CourseSectionResponse,
//   VideoResponse,
// } from "@/types/api/course";
// import type { Chapter, Course, Lesson } from "@/lib/course/courses";

// const FALLBACK_THUMBNAIL = "/assets/images/HTML & CSS.jpg";
// const FALLBACK_AVATAR = "/images/sastra_code_logo.png";

// function durationLabel(seconds = 0) {
//   if (!seconds) return "0 នាទី";
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.ceil((seconds % 3600) / 60);
//   if (hours > 0 && minutes > 0) return `${hours} ម៉ោង ${minutes} នាទី`;
//   if (hours > 0) return `${hours} ម៉ោង`;
//   return `${Math.max(minutes, 1)} នាទី`;
// }

// function lessonDuration(seconds = 0) {
//   const minutes = Math.floor(seconds / 60);
//   const rest = seconds % 60;
//   return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
// }

// function videoUrl(video: VideoResponse) {
//   if (video.embedUrl) return video.embedUrl;
//   if (video.youtubeVideoId) {
//     return `https://www.youtube.com/watch?v=${video.youtubeVideoId}`;
//   }
//   return undefined;
// }

// function mapSection(
//   section: CourseSectionResponse,
//   sectionIndex: number,
//   course: CourseDetailResponse,
// ): Chapter {
//   const videos = [...(section.videos ?? [])]
//     .filter((video) => video.isPublished !== false)
//     .sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));

//   const totalSeconds = videos.reduce(
//     (sum, video) => sum + (video.durationSeconds ?? 0),
//     0,
//   );

//   const lessons: Lesson[] = videos.map((video, videoIndex) => {
//     const fullAccess = course.hasFullAccess === true || course.accessType === "FREE";
//     const canPreview = video.isPreview === true;

//     return {
//       id: video.id,
//       title: video.title || `មេរៀនទី ${videoIndex + 1}`,
//       duration: lessonDuration(video.durationSeconds),
//       locked: !fullAccess && !canPreview,
//       videoUrl: videoUrl(video),
//     };
//   });

//   return {
//     id: section.id,
//     number: String(sectionIndex + 1).padStart(2, "0"),
//     title: section.title || `ជំពូកទី ${sectionIndex + 1}`,
//     lessonCount: lessons.length,
//     totalDuration: `${lessons.length} មេរៀន · ${durationLabel(totalSeconds)}`,
//     lessons,
//   };
// }

// export function mergeCourseSections(
//   course: CourseDetailResponse,
//   sections?: CourseSectionResponse[],
// ): CourseDetailResponse {
//   if (!sections) return course;
//   return { ...course, sections };
// }

// export function mapApiCourseToCourse(course: CourseDetailResponse): Course {
//   const sections = [...(course.sections ?? [])].sort(
//     (a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0),
//   );
//   const curriculum = sections.map((section, index) => mapSection(section, index, course));
//   const totalSeconds = sections.reduce(
//     (sectionTotal, section) =>
//       sectionTotal +
//       (section.videos ?? []).reduce(
//         (videoTotal, video) => videoTotal + (video.durationSeconds ?? 0),
//         0,
//       ),
//     0,
//   );
//   const totalLessons = curriculum.reduce((sum, chapter) => sum + chapter.lessonCount, 0);

//   const category =
//     course.categories?.[0]?.name ||
//     course.tags?.[0]?.name ||
//     course.level ||
//     "COURSE";

//   const rawPrice = course.price ?? 0;
//   const discount = Math.max(course.discount ?? 0, 0);

//   return {
//     id: course.id,
//     slug: course.slug,
//     category,
//     title: course.title || "Untitled course",
//     description: course.description || "",
//     lessons: totalLessons,
//     duration: durationLabel(totalSeconds),
//     totalDuration: durationLabel(totalSeconds),
//     image: course.thumbnailFileId?.url || FALLBACK_THUMBNAIL,
//     href: `/courses/${course.id}`,
//     price: rawPrice,
//     originalPrice: undefined,
//     discount,
//     currency: course.currency || "USD",
//     accessType: course.accessType,
//     level: course.level,
//     status: course.status,
//     locked: course.accessType === "PRIVATE" && course.hasFullAccess !== true,
//     hasFullAccess: course.hasFullAccess,
//     enrollmentCount: course.enrollmentCount,
//     tags: course.tags?.map((tag) => tag.name) ?? [],
//     publishedAt: course.publishedAt,
//     learningPoints: course.tags?.map((tag) => tag.name).filter(Boolean),
//     instructor: {
//       name: course.instructorId?.name || "SastraCode Instructor",
//       avatar: FALLBACK_AVATAR,
//       tags: [course.level, course.accessType].filter(Boolean) as string[],
//     },
//     curriculum,
//   };
// }



// import type {
//   CourseDetailResponse,
//   CourseSectionResponse,
//   VideoResponse,
// } from "@/types/api/course";

// import type {
//   Chapter,
//   Course,
//   Lesson,
// } from "@/lib/course/courses";

// const FALLBACK_THUMBNAIL = "/assets/images/HTML & CSS.jpg";
// const FALLBACK_AVATAR = "/images/sastra_code_logo.png";

// /**
//  * Convert seconds into Khmer course duration.
//  */
// function durationLabel(seconds = 0): string {
//   if (!seconds) {
//     return "0 នាទី";
//   }

//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.ceil((seconds % 3600) / 60);

//   if (hours > 0 && minutes > 0) {
//     return `${hours} ម៉ោង ${minutes} នាទី`;
//   }

//   if (hours > 0) {
//     return `${hours} ម៉ោង`;
//   }

//   return `${Math.max(minutes, 1)} នាទី`;
// }

// /**
//  * Convert lesson duration to MM:SS.
//  */
// function lessonDuration(seconds = 0): string {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;

//   return `${String(minutes).padStart(2, "0")}:${String(
//     remainingSeconds,
//   ).padStart(2, "0")}`;
// }

// /**
//  * Resolve playable video URL.
//  */
// function resolveVideoUrl(video: VideoResponse): string | undefined {
//   if (video.embedUrl) {
//     return video.embedUrl;
//   }

//   if (video.youtubeVideoId) {
//     return `https://www.youtube.com/watch?v=${video.youtubeVideoId}`;
//   }

//   return undefined;
// }

// /**
//  * Check whether the current user has full course access.
//  */
// function hasCourseFullAccess(course: CourseDetailResponse): boolean {
//   return (
//     course.hasFullAccess === true ||
//     course.accessType === "FREE"
//   );
// }

// /**
//  * Map API course section into frontend chapter.
//  */
// function mapSection(
//   section: CourseSectionResponse,
//   sectionIndex: number,
//   course: CourseDetailResponse,
// ): Chapter {
//   const fullAccess = hasCourseFullAccess(course);

//   const videos = [...(section.videos ?? [])]
//     .filter((video) => video.isPublished !== false)
//     .sort(
//       (a, b) =>
//         (a.orderIndex ?? 0) -
//         (b.orderIndex ?? 0),
//     );

//   const totalSeconds = videos.reduce(
//     (sum, video) =>
//       sum + (video.durationSeconds ?? 0),
//     0,
//   );

//   const lessons: Lesson[] = videos.map(
//     (video, videoIndex) => {
//       const canPreview = video.isPreview === true;

//       /**
//        * FREE course
//        *      -> unlocked
//        *
//        * PREMIUM + enrolled
//        *      -> unlocked
//        *
//        * PREMIUM + not enrolled + preview
//        *      -> unlocked
//        *
//        * PREMIUM + not enrolled + normal video
//        *      -> locked
//        */
//       const locked =
//         !fullAccess &&
//         !canPreview;

//       return {
//         id: video.id,

//         title:
//           video.title ||
//           `មេរៀនទី ${videoIndex + 1}`,

//         duration: lessonDuration(
//           video.durationSeconds ?? 0,
//         ),

//         locked,

//         /**
//          * Important:
//          * Do not give locked lessons a playable URL.
//          */
//         videoUrl: locked
//           ? undefined
//           : resolveVideoUrl(video),
//       };
//     },
//   );

//   return {
//     id: section.id,

//     number: String(
//       sectionIndex + 1,
//     ).padStart(2, "0"),

//     title:
//       section.title ||
//       `ជំពូកទី ${sectionIndex + 1}`,

//     lessonCount: lessons.length,

//     totalDuration: `${lessons.length} មេរៀន · ${durationLabel(
//       totalSeconds,
//     )}`,

//     lessons,
//   };
// }

// /**
//  * Merge separately fetched sections into a course.
//  */
// export function mergeCourseSections(
//   course: CourseDetailResponse,
//   sections?: CourseSectionResponse[],
// ): CourseDetailResponse {
//   if (!sections) {
//     return course;
//   }

//   return {
//     ...course,
//     sections,
//   };
// }

// /**
//  * Convert backend CourseDetailResponse
//  * into the Course model used by the UI.
//  */
// export function mapApiCourseToCourse(
//   course: CourseDetailResponse,
// ): Course {
//   const sections = [
//     ...(course.sections ?? []),
//   ].sort(
//     (a, b) =>
//       (a.orderIndex ?? 0) -
//       (b.orderIndex ?? 0),
//   );

//   const curriculum = sections.map(
//     (section, index) =>
//       mapSection(
//         section,
//         index,
//         course,
//       ),
//   );

//   const totalSeconds = sections.reduce(
//     (sectionTotal, section) =>
//       sectionTotal +
//       (section.videos ?? []).reduce(
//         (videoTotal, video) =>
//           videoTotal +
//           (video.durationSeconds ?? 0),
//         0,
//       ),
//     0,
//   );

//   const totalLessons =
//     curriculum.reduce(
//       (sum, chapter) =>
//         sum +
//         chapter.lessonCount,
//       0,
//     );

//   const category =
//     course.categories?.[0]?.name ||
//     course.tags?.[0]?.name ||
//     course.level ||
//     "COURSE";

//   const price = Number(
//     course.price ?? 0,
//   );

//   const discount = Math.max(
//     Number(course.discount ?? 0),
//     0,
//   );

//   const hasFullAccess =
//     hasCourseFullAccess(course);

//   return {
//     id: course.id,

//     slug: course.slug,

//     category,

//     title:
//       course.title ||
//       "Untitled course",

//     description:
//       course.description || "",

//     lessons:
//       totalLessons,

//     duration:
//       durationLabel(
//         totalSeconds,
//       ),

//     totalDuration:
//       durationLabel(
//         totalSeconds,
//       ),

//     image:
//       course.thumbnailFileId?.url ||
//       FALLBACK_THUMBNAIL,

//     href:
//       `/courses/${course.id}`,

//     price,

//     originalPrice:
//       undefined,

//     discount,

//     currency:
//       course.currency ||
//       "USD",

//     accessType:
//       course.accessType,

//     level:
//       course.level,

//     status:
//       course.status,

//     /**
//      * PRIVATE course stays locked
//      * unless backend gives access.
//      *
//      * PREMIUM is not locked at course level
//      * because users should still see its curriculum.
//      * Individual lessons handle their own lock state.
//      */
//     locked:
//       course.accessType === "PRIVATE" &&
//       !hasFullAccess,

//     hasFullAccess:
//       course.hasFullAccess,

//     enrollmentCount:
//       course.enrollmentCount,

//     tags:
//       course.tags?.map(
//         (tag) => tag.name,
//       ) ?? [],

//     publishedAt:
//       course.publishedAt,

//     learningPoints:
//       course.tags
//         ?.map(
//           (tag) => tag.name,
//         )
//         .filter(Boolean),

//     instructor: {
//       name:
//         course.instructorId?.name ||
//         "SastraCode Instructor",

//       avatar:
//         FALLBACK_AVATAR,

//       tags: [
//         course.level,
//         course.accessType,
//       ].filter(
//         Boolean,
//       ) as string[],
//     },

//     curriculum,
//   };
// }


import type {
  CourseDetailResponse,
  CourseSectionResponse,
  VideoResponse,
} from "@/types/api/course";

import type {
  Chapter,
  Course,
  Lesson,
} from "@/lib/course/courses";

import { stripEmojiFrom } from "@/utils/strip-emoji";

/*
 * ============================================
 * FALLBACKS
 * ============================================
 */

const FALLBACK_THUMBNAIL =
  "/assets/images/HTML & CSS.jpg";

const FALLBACK_AVATAR =
  "/images/sastra_code_logo.png";

/*
 * ============================================
 * COURSE IMAGE
 * ============================================
 *
 * Always use the file UUID with the Next.js
 * file proxy:
 *
 * /api/files/{fileId}/content
 *
 * The proxy then requests:
 * GET /api/v1/files/{fileId}
 *
 * and loads the real MinIO/presigned URL.
 */
function resolveCourseImage(
  fileId?: string | null,
): string {
  const value = fileId?.trim();

  if (!value) {
    return FALLBACK_THUMBNAIL;
  }

  return `/api/files/${encodeURIComponent(
    value,
  )}/content`;
}

/*
 * ============================================
 * COURSE DURATION
 * ============================================
 */

function durationLabel(
  seconds = 0,
): string {
  if (!seconds) {
    return "0 នាទី";
  }

  const hours = Math.floor(
    seconds / 3600,
  );

  const minutes = Math.ceil(
    (seconds % 3600) / 60,
  );

  if (
    hours > 0 &&
    minutes > 0
  ) {
    return `${hours} ម៉ោង ${minutes} នាទី`;
  }

  if (hours > 0) {
    return `${hours} ម៉ោង`;
  }

  return `${Math.max(
    minutes,
    1,
  )} នាទី`;
}

/*
 * ============================================
 * LESSON DURATION
 * ============================================
 */

function lessonDuration(
  seconds = 0,
): string {
  const minutes = Math.floor(
    seconds / 60,
  );

  const remainingSeconds =
    seconds % 60;

  return `${String(
    minutes,
  ).padStart(
    2,
    "0",
  )}:${String(
    remainingSeconds,
  ).padStart(
    2,
    "0",
  )}`;
}

/*
 * ============================================
 * VIDEO URL
 * ============================================
 */

function resolveVideoUrl(
  video: VideoResponse,
): string | undefined {
  /*
   * Prefer backend embed URL.
   */
  if (video.embedUrl) {
    return video.embedUrl;
  }

  /*
   * Fall back to YouTube ID.
   */
  if (video.youtubeVideoId) {
    return `https://www.youtube.com/watch?v=${video.youtubeVideoId}`;
  }

  return undefined;
}

/*
 * ============================================
 * VIDEO THUMBNAIL
 * ============================================
 */

function resolveVideoThumbnail(
  video: VideoResponse,
): string | undefined {
  /*
   * Prefer the backend-provided thumbnail.
   */
  if (video.thumbnailUrl) {
    return video.thumbnailUrl;
  }

  /*
   * Fall back to the YouTube-generated thumbnail.
   */
  if (video.youtubeVideoId) {
    return `https://i.ytimg.com/vi/${video.youtubeVideoId}/mqdefault.jpg`;
  }

  return undefined;
}

/*
 * ============================================
 * FULL COURSE ACCESS
 * ============================================
 */

function hasCourseFullAccess(
  course: CourseDetailResponse,
): boolean {
  /*
   * FREE courses are always accessible.
   *
   * PREMIUM / PRIVATE require backend
   * hasFullAccess=true.
   */
  return (
    course.hasFullAccess === true ||
    course.accessType === "FREE"
  );
}

/*
 * ============================================
 * MAP SECTION
 * ============================================
 */

function mapSection(
  section: CourseSectionResponse,
  sectionIndex: number,
): Chapter {
  /*
   * Only published videos.
   */
  const videos = [
    ...(section.videos ?? []),
  ]
    .filter(
      (video) =>
        video.isPublished !== false,
    )
    .sort(
      (a, b) =>
        (a.orderIndex ?? 0) -
        (b.orderIndex ?? 0),
    );

  /*
   * Total section duration.
   */
  const totalSeconds =
    videos.reduce(
      (sum, video) =>
        sum +
        (video.durationSeconds ??
          0),
      0,
    );

  /*
   * Convert videos to lessons.
   */
  const lessons: Lesson[] =
    videos.map(
      (
        video,
        videoIndex,
      ) => {
        /*
         * The curriculum is a public outline. Every published lesson is
         * displayed as a normal video link; the lesson page/API remains the
         * authority for access. Guests are redirected to login on click.
         */
        const locked = false;

        return {
          id: video.id,

          /*
           * Emoji are stripped for display only; the stored title is
           * untouched. Falls back to a numbered label if a title was
           * nothing but emoji.
           */
          title:
            stripEmojiFrom(video.title) ||
            `មេរៀនទី ${
              videoIndex + 1
            }`,

          duration:
            lessonDuration(
              video.durationSeconds ??
                0,
            ),

          locked,

          videoUrl: resolveVideoUrl(video),

          thumbnail: resolveVideoThumbnail(video),
        };
      },
    );

  return {
    id: section.id,

    number: String(
      sectionIndex + 1,
    ).padStart(
      2,
      "0",
    ),

    title:
      section.title ||
      `ជំពូកទី ${
        sectionIndex + 1
      }`,

    lessonCount:
      lessons.length,

    totalDuration: `${
      lessons.length
    } មេរៀន · ${durationLabel(
      totalSeconds,
    )}`,

    lessons,
  };
}

/*
 * ============================================
 * MERGE COURSE SECTIONS
 * ============================================
 */

export function mergeCourseSections(
  course: CourseDetailResponse,
  sections?: CourseSectionResponse[],
): CourseDetailResponse {
  if (!sections || sections.length === 0) {
    return course;
  }

  const courseSectionsById = new Map(
    (course.sections ?? []).map((section) => [section.id, section]),
  );
  const resolvedSections = sections.map((section) => {
    const embeddedSection = courseSectionsById.get(section.id);

    // Guests receive section metadata from /sections but its videos list can
    // be empty. The course detail response already includes the public lesson
    // outline, so preserve it instead of replacing it with an empty array.
    if (
      (!section.videos || section.videos.length === 0) &&
      embeddedSection?.videos?.length
    ) {
      return embeddedSection;
    }

    return section;
  });

  return {
    ...course,
    sections: resolvedSections,
  };
}

/*
 * ============================================
 * API COURSE -> FRONTEND COURSE
 * ============================================
 */

export function mapApiCourseToCourse(
  course: CourseDetailResponse,
): Course {
  /*
   * Sort sections.
   */
  const sections = [
    ...(course.sections ?? []),
  ].sort(
    (a, b) =>
      (a.orderIndex ?? 0) -
      (b.orderIndex ?? 0),
  );

  /*
   * Convert sections to curriculum.
   */
  const curriculum =
    sections.map(
      (
        section,
        index,
      ) =>
        mapSection(
          section,
          index,
        ),
    );

  /*
   * Calculate total course duration.
   */
  const totalSeconds =
    sections.reduce(
      (
        sectionTotal,
        section,
      ) =>
        sectionTotal +
        (
          section.videos ??
          []
        ).reduce(
          (
            videoTotal,
            video,
          ) =>
            videoTotal +
            (video.durationSeconds ??
              0),
          0,
        ),
      0,
    );

  /*
   * Calculate total lessons.
   */
  const totalLessons =
    curriculum.reduce(
      (
        sum,
        chapter,
      ) =>
        sum +
        chapter.lessonCount,
      0,
    );

  /*
   * Prefer category.
   *
   * Fall back to:
   * tag -> level -> COURSE
   */
  const category =
    course.categories?.[0]
      ?.name ||
    course.tags?.[0]?.name ||
    course.level ||
    "COURSE";

  /*
   * Price from API.
   */
  const price = Math.max(
    Number(
      course.price ?? 0,
    ),
    0,
  );

  /*
   * Discount percentage from API.
   *
   * Example:
   * price = 50
   * discount = 20
   *
   * final price = 40
   */
  const discount = Math.min(
    Math.max(
      Number(
        course.discount ?? 0,
      ),
      0,
    ),
    100,
  );

  /*
   * User access.
   */
  const fullAccess =
    hasCourseFullAccess(
      course,
    );

  /*
   * IMPORTANT:
   * Resolve backend thumbnail.
   */
  const image =
    resolveCourseImage(
      course.thumbnailFileId
        ?.id,
    );

  return {
    /*
     * =====================
     * BASIC
     * =====================
     */

    id: course.id,

    slug: course.slug,

    category,

    title:
      course.title ||
      "Untitled course",

    description:
      course.description ||
      "",

    /*
     * =====================
     * COURSE CONTENT
     * =====================
     */

    lessons:
      totalLessons,

    duration:
      durationLabel(
        totalSeconds,
      ),

    totalDuration:
      durationLabel(
        totalSeconds,
      ),

    curriculum,

    /*
     * =====================
     * IMAGE
     * =====================
     */

    image,

    /*
     * =====================
     * ROUTE
     * =====================
     */

    href:
      `/courses/${course.slug || course.id}`,

    /*
     * =====================
     * PRICING
     * =====================
     */

    price,

    /*
     * Your backend gives:
     *
     * price
     * discount
     *
     * so originalPrice does
     * not need to come from API.
     */
    originalPrice:
      undefined,

    discount,

    currency:
      course.currency ||
      "USD",

    /*
     * =====================
     * COURSE ACCESS
     * =====================
     */

    accessType:
      course.accessType,

    level:
      course.level,

    status:
      course.status,

    /*
     * Private course remains
     * locked until backend grants
     * access.
     */
    locked:
      course.accessType ===
        "PRIVATE" &&
      !fullAccess,

    hasFullAccess:
      course.hasFullAccess,

    /*
     * =====================
     * STATISTICS
     * =====================
     */

    enrollmentCount:
      course.enrollmentCount,

    /*
     * =====================
     * TAGS
     * =====================
     */

    tags:
      course.tags?.map(
        (tag) =>
          tag.name,
      ) ?? [],

    /*
     * =====================
     * PUBLISHED DATE
     * =====================
     */

    publishedAt:
      course.publishedAt,

    /*
     * =====================
     * LEARNING POINTS
     * =====================
     */

    learningPoints:
      course.tags
        ?.map(
          (tag) =>
            tag.name,
        )
        .filter(
          Boolean,
        ),

    /*
     * =====================
     * INSTRUCTOR
     * =====================
     */

    instructor: {
      name:
        course.instructorId
          ?.name ||
        "SastraCode Instructor",

      avatar:
        course.instructorId
          ?.avatarFileId
          ? resolveCourseImage(
              course.instructorId
                .avatarFileId,
            )
          : FALLBACK_AVATAR,

      tags: [
        course.level,
        course.accessType,
      ].filter(
        Boolean,
      ) as string[],
    },
  };
}
