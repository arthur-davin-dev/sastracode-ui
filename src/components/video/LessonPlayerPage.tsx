// "use client";

// import { useState } from "react";
// import { VideoPlayer } from "./VideoPlayer";
// import { LessonHeader } from "./LessonHeader";
// import { DiscussionSection } from "./DiscussionSection";
// import { CourseContentSidebar } from "./CourseContentSidebar";
// import { UpNextCard } from "./UpNextCard";
// import { sections, comments, getTotalLessons } from "@/lib/videoplayer/videoplayer";

// const totalLessons = getTotalLessons(sections);

// export default function LessonPlayerPage() {
//   const [autoplay, setAutoplay] = useState(true);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
//           <div className="space-y-6">
//             <VideoPlayer
//               thumbnailTitle="HTML"
//               currentTime="05:42"
//               totalTime="12:15"
//               progressPercent={47}
//             />

//             <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
//               <LessonHeader
//                 title="Introduction to HTML"
//                 sectionLabel="Section 1"
//                 lessonPosition="Lesson 1 of 12"
//                 level="Beginner"
//                 likeCount={128}
//               />
//             </div>

//             <DiscussionSection comments={comments} totalCount={15} />
//           </div>

//           <div className="space-y-6">
//             <CourseContentSidebar sections={sections} totalLessons={totalLessons} />
//             <UpNextCard
//               thumbnail="/assets/images/CSS.jpg"
//               title="CSS Selectors"
//               description="Learn how to target HTML elements using CSS selectors."
//               lessonPosition="Lesson 6 of 12"
//               duration="14:30"
//               autoplay={autoplay}
//               onAutoplayChange={setAutoplay}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { LessonHeader } from "./LessonHeader";
import { DiscussionSection } from "./DiscussionSection";
import { CourseContentSidebar } from "./CourseContentSidebar";
import { UpNextCard } from "./UpNextCard";
import {
  comments,
  defaultSections,
  getTotalLessons,
  buildSectionsFromCurriculum,
  findLessonById,
} from "@/lib/videoplayer/videoplayer";
import { Course } from "@/lib/course/courses";

interface LessonPlayerPageProps {
  course: Course;
  lessonId: string;
}

const fallbackVideoUrl =
  "https://youtu.be/6Gwxa9_qjJw?si=2ln0xHCwZu_khIqq";

export default function LessonPlayerPage({
  course,
  lessonId,
}: LessonPlayerPageProps) {
  const [autoplay, setAutoplay] = useState(true);

  const chapters = course.curriculum ?? [];
  const found = findLessonById(chapters, lessonId);

  const rawSections =
    chapters.length > 0
      ? buildSectionsFromCurriculum(chapters, lessonId)
      : defaultSections;

  const sections = rawSections.map((section) => ({
    ...section,
    lessons: section.lessons.map((lesson) => ({
      ...lesson,
      status:
        lesson.id === lessonId
          ? ("current" as const)
          : lesson.status === "current"
            ? ("upcoming" as const)
            : lesson.status,
    })),
  }));

  const totalLessons = getTotalLessons(sections);
  const sectionLesson = sections
    .flatMap((section) =>
      section.lessons.map((lesson) => ({ lesson, section })),
    )
    .find(({ lesson }) => lesson.id === lessonId);

  const lessonTitle =
    found?.lesson.title ??
    sectionLesson?.lesson.title.replace(/^\d+\.\s*/, "") ??
    "Introduction to HTML";
  const sectionLabel =
    found?.chapter.title ?? sectionLesson?.section.title ?? "Section 1";

  // find the lesson's position (e.g. "Lesson 6 of 12") across all chapters
  const flatLessons =
    chapters.length > 0
      ? chapters.flatMap((chapter) => chapter.lessons)
      : sections.flatMap((section) => section.lessons);
  const lessonIndex = flatLessons.findIndex((l) => l.id === lessonId);
  const nextLesson =
    lessonIndex >= 0 ? flatLessons[lessonIndex + 1] : undefined;
  const lessonPosition =
    lessonIndex >= 0
      ? `Lesson ${lessonIndex + 1} of ${flatLessons.length}`
      : "Lesson 1 of 12";
  const nextLessonPosition = nextLesson
    ? `Lesson ${lessonIndex + 2} of ${flatLessons.length}`
    : lessonPosition;

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-15">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <VideoPlayer
              src={found?.lesson.videoUrl ?? fallbackVideoUrl}
              poster={course.image}
              title={lessonTitle}
              autoplay={autoplay}
            />

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <LessonHeader
                title={lessonTitle}
                sectionLabel={sectionLabel}
                lessonPosition={lessonPosition}
                level="Beginner"
                likeCount={128}
              />
            </div>

            <DiscussionSection comments={comments} totalCount={15} />
          </div>

          <div className="space-y-6">
            <CourseContentSidebar
              sections={sections}
              totalLessons={totalLessons}
              courseId={course.id}
            />
            <UpNextCard
              thumbnail={course.image}
              title={
                nextLesson?.title.replace(/^\d+\.\s*/, "") ?? lessonTitle
              }
              description={course.description}
              lessonPosition={nextLessonPosition}
              duration={nextLesson?.duration ?? "10:00"}
              autoplay={autoplay}
              onAutoplayChange={setAutoplay}
              href={
                nextLesson
                  ? `/courses/${course.id}/learn/${nextLesson.id}`
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
