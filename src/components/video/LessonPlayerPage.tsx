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

export default function LessonPlayerPage({
  course,
  lessonId,
}: LessonPlayerPageProps) {
  const [autoplay, setAutoplay] = useState(true);

  const chapters = course.curriculum ?? [];
  const found = findLessonById(chapters, lessonId);

  const sections =
    chapters.length > 0
      ? buildSectionsFromCurriculum(chapters, lessonId)
      : defaultSections;

  const totalLessons = getTotalLessons(sections);

  const lessonTitle = found?.lesson.title ?? "Introduction to HTML";
  const sectionLabel = found?.chapter.title ?? "Section 1";

  // find the lesson's position (e.g. "Lesson 6 of 12") across all chapters
  const flatLessons = chapters.flatMap((c) => c.lessons);
  const lessonIndex = flatLessons.findIndex((l) => l.id === lessonId);
  const lessonPosition =
    lessonIndex >= 0
      ? `Lesson ${lessonIndex + 1} of ${flatLessons.length}`
      : "Lesson 1 of 12";

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-15">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <VideoPlayer
              thumbnailTitle={course.title}
              currentTime="00:00"
              totalTime={found?.lesson.duration ?? "10:00"}
              progressPercent={0}
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
              title={lessonTitle}
              description={course.description}
              lessonPosition={lessonPosition}
              duration={found?.lesson.duration ?? "10:00"}
              autoplay={autoplay}
              onAutoplayChange={setAutoplay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
