// "use client";

// import { useState } from "react";
// import { ChevronDown, CheckCircle2, Circle, PlayCircle } from "lucide-react";
// import { CourseSection } from "@/types/lesson-player";

// interface CourseContentSidebarProps {
//   sections: CourseSection[];
//   totalLessons: number;
// }

// export function CourseContentSidebar({ sections, totalLessons }: CourseContentSidebarProps) {
//   const [openSectionId, setOpenSectionId] = useState<string | null>(
//     sections.find((s) => s.lessons.some((l) => l.status === "current"))?.id ?? sections[0]?.id ?? null
//   );

//   return (
//     <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
//       <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
//         <h2 className="text-base font-semibold text-gray-900 font-(family-name:--font-sans)">
//           Course Content
//         </h2>
//         <span className="text-xs text-gray-400">{totalLessons} Lessons</span>
//       </div>

//       <div className="divide-y divide-gray-100">
//         {sections.map((section) => {
//           const isOpen = openSectionId === section.id;
//           const completedCount = section.lessons.filter((l) => l.status === "completed").length;

//           return (
//             <div key={section.id}>
//               <button
//                 type="button"
//                 onClick={() => setOpenSectionId(isOpen ? null : section.id)}
//                 className="flex w-full items-center justify-between px-5 py-3.5 text-left"
//               >
//                 <span className="text-sm font-semibold text-gray-800 font-(family-name:--font-sans)">
//                   {section.title}
//                 </span>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-gray-400">
//                     {completedCount} / {section.lessons.length}
//                   </span>
//                   <ChevronDown
//                     className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
//                   />
//                 </div>
//               </button>

//               {isOpen && (
//                 <div className="space-y-0.5 px-2 pb-2">
//                   {section.lessons.map((lesson) => (
//                     <button
//                       key={lesson.id}
//                       type="button"
//                       className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
//                         lesson.status === "current" ? "bg-blue-50" : "hover:bg-gray-50"
//                       }`}
//                     >
//                       {lesson.status === "completed" && (
//                         <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
//                       )}
//                       {lesson.status === "current" && (
//                         <PlayCircle className="h-4 w-4 shrink-0 fill-primary-color text-white" />
//                       )}
//                       {lesson.status === "upcoming" && (
//                         <Circle className="h-4 w-4 shrink-0 text-gray-300" />
//                       )}
//                       <span
//                         className={`flex-1 truncate text-sm font-(family-name:--font-sans) ${
//                           lesson.status === "current" ? "font-medium text-primary-color" : "text-gray-600"
//                         }`}
//                       >
//                         {lesson.title}
//                       </span>
//                       <span className="shrink-0 text-xs text-gray-400">{lesson.duration}</span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { CourseSection } from "@/types/lesson-player";

interface CourseContentSidebarProps {
  sections: CourseSection[];
  totalLessons: number;
  courseId: string;
}

export function CourseContentSidebar({ sections, totalLessons, courseId }: CourseContentSidebarProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(
    sections.find((s) => s.lessons.some((l) => l.status === "current"))?.id ?? sections[0]?.id ?? null
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900 font-(family-name:--font-sans)">
          Course Content
        </h2>
        <span className="text-xs text-gray-400">{totalLessons} Lessons</span>
      </div>

      <div className="divide-y divide-gray-100">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id;
          const completedCount = section.lessons.filter((l) => l.status === "completed").length;

          return (
            <div key={section.id}>
              <button
                type="button"
                onClick={() => setOpenSectionId(isOpen ? null : section.id)}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left"
              >
                <span className="text-sm font-semibold text-gray-800 font-(family-name:--font-sans)">
                  {section.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {completedCount} / {section.lessons.length}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {isOpen && (
                <div className="space-y-0.5 px-2 pb-2">
                  {section.lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/learn/${lesson.id}`}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition ${
                        lesson.status === "current" ? "bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      {lesson.status === "completed" && (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      )}
                      {lesson.status === "current" && (
                        <PlayCircle className="h-4 w-4 shrink-0 fill-primary-color text-white" />
                      )}
                      {lesson.status === "upcoming" && (
                        <Circle className="h-4 w-4 shrink-0 text-gray-300" />
                      )}
                      <span
                        className={`flex-1 truncate text-sm font-(family-name:--font-sans) ${
                          lesson.status === "current" ? "font-medium text-primary-color" : "text-gray-600"
                        }`}
                      >
                        {lesson.title}
                      </span>
                      <span className="shrink-0 text-xs text-gray-400">{lesson.duration}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}