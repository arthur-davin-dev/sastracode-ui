// "use client";

// import {
//   BookOpen,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   RefreshCw,
//   X,
// } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";

// import LessonBlockRenderer from "@/components/documentation/LessonBlockRenderer";
// import SidebarLeftLesson from "@/components/documentation/SidebarLeftLesson";
// import SidebarRightLesson, {
//   getBlockAnchor,
// } from "@/components/documentation/SidebarRightLesson";
// import TodayLessonHero from "@/components/documentation/TodayLessonHero";
// import { useGetTutorialByIdQuery } from "@/redux/api/tutorial-api";
// import type {
//   TutorialDetailData,
//   TutorialLesson,
//   TutorialSection,
// } from "@/types/tutorial-reader";

// const LESSONS_ROUTE = "/documentation/lessons";

// function sortSections(sections: TutorialSection[]) {
//   return [...sections].sort((a, b) => a.orderIndex - b.orderIndex);
// }

// function createLessons(sections: TutorialSection[]): TutorialLesson[] {
//   const lessons: TutorialLesson[] = [];

//   sortSections(sections).forEach((section) => {
//     const subsections = [...(section.subsections ?? [])].sort(
//       (a, b) => a.orderIndex - b.orderIndex,
//     );

//     const isDirect =
//       section.contentMode === "DIRECT" || subsections.length === 0;

//     if (isDirect) {
//       lessons.push({
//         id: section.id,
//         sectionId: section.id,
//         type: "SECTION",
//         title: section.title,
//         sectionTitle: section.title,
//         orderIndex: section.orderIndex,
//         blocks: [...(section.blocks ?? [])].sort(
//           (a, b) => a.orderIndex - b.orderIndex,
//         ),
//       });
//     }

//     subsections.forEach((subsection) => {
//       lessons.push({
//         id: subsection.id,
//         sectionId: section.id,
//         type: "SUBSECTION",
//         title: subsection.title,
//         sectionTitle: section.title,
//         orderIndex: subsection.orderIndex,
//         blocks: [...(subsection.blocks ?? [])].sort(
//           (a, b) => a.orderIndex - b.orderIndex,
//         ),
//       });
//     });
//   });

//   return lessons;
// }

// function TutorialLoading() {
//   return (
//     <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
//       <div className="mx-auto grid min-h-screen max-w-[1800px] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_280px]">
//         <aside className="hidden border-r border-slate-200 bg-white p-5 lg:block dark:border-slate-800 dark:bg-slate-950">
//           <div className="space-y-4 animate-pulse">
//             <div className="h-9 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
//             <div className="h-11 rounded-xl bg-slate-100 dark:bg-slate-900" />
//             <div className="h-11 rounded-xl bg-slate-100 dark:bg-slate-900" />
//             <div className="h-11 rounded-xl bg-slate-100 dark:bg-slate-900" />
//           </div>
//         </aside>

//         <section className="min-w-0 bg-white px-4 py-7 sm:px-6 lg:px-10 dark:bg-slate-950">
//           <div className="mx-auto w-full max-w-[980px] animate-pulse space-y-7">
//             <div className="h-10 w-36 rounded-xl bg-slate-200 dark:bg-slate-800" />
//             <div className="h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
//             <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800" />
//             <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
//               <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-800" />
//               <div className="mt-4 h-9 w-72 max-w-full rounded-lg bg-slate-200 dark:bg-slate-800" />
//               <div className="mt-8 h-40 rounded-2xl bg-slate-100 dark:bg-slate-800/70" />
//             </div>
//           </div>
//         </section>

//         <aside className="hidden border-l border-slate-200 bg-slate-50/70 p-5 xl:block dark:border-slate-800 dark:bg-slate-950">
//           <div className="animate-pulse space-y-4">
//             <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-800" />
//             <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
//             <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
//             <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }

// function TutorialError({ onRetry }: { onRetry: () => void }) {
//   return (
//     <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
//       <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
//         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
//           <RefreshCw className="h-5 w-5" />
//         </div>

//         <h1 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
//           មិនអាចបង្ហាញមេរៀនបានទេ
//         </h1>
//         <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
//           សូមព្យាយាមផ្ទុកទិន្នន័យម្តងទៀត។
//         </p>

//         <button
//           type="button"
//           onClick={onRetry}
//           className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#002455] px-5 text-sm font-semibold text-white transition hover:bg-[#00346f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/30 focus-visible:ring-offset-2 dark:ring-offset-slate-900"
//         >
//           <RefreshCw className="h-4 w-4" />
//           ព្យាយាមម្តងទៀត
//         </button>
//       </div>
//     </main>
//   );
// }

// function EmptyTutorial() {
//   return (
//     <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
//       <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
//         <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002455] dark:bg-blue-950/40 dark:text-blue-300">
//           <BookOpen className="h-5 w-5" />
//         </div>

//         <h1 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
//           មិនទាន់មានមេរៀន
//         </h1>
//         <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
//           Tutorial នេះមិនទាន់មានមាតិកាសម្រាប់អានទេ។
//         </p>

//         <Link
//           href={LESSONS_ROUTE}
//           className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
//         >
//           <ChevronLeft className="h-4 w-4" />
//           ត្រឡប់ទៅបញ្ជីមេរៀន
//         </Link>
//       </div>
//     </main>
//   );
// }

// export default function TutorialDetail({ tutorialId }: { tutorialId: string }) {
//   const { data, isLoading, error, refetch } =
//     useGetTutorialByIdQuery(tutorialId);

//   const [activeLessonId, setActiveLessonId] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const tutorial = data?.data as TutorialDetailData | undefined;

//   const sections = useMemo(
//     () => sortSections(tutorial?.sections ?? []),
//     [tutorial?.sections],
//   );

//   const lessons = useMemo(() => createLessons(sections), [sections]);

//   const selectedLessonId = lessons.some(
//     (lesson) => lesson.id === activeLessonId,
//   )
//     ? activeLessonId
//     : lessons[0]?.id;

//   const activeIndex = Math.max(
//     0,
//     lessons.findIndex((lesson) => lesson.id === selectedLessonId),
//   );

//   const activeLesson = lessons[activeIndex];
//   const previousLesson = activeIndex > 0 ? lessons[activeIndex - 1] : null;
//   const nextLesson =
//     activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;

//   const progress = lessons.length
//     ? Math.round(((activeIndex + 1) / lessons.length) * 100)
//     : 0;

//   useEffect(() => {
//     if (!sidebarOpen) return;

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleEscape);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleEscape);
//     };
//   }, [sidebarOpen]);

//   function selectLesson(lessonId: string) {
//     setActiveLessonId(lessonId);
//     setSidebarOpen(false);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }

//   if (isLoading) {
//     return <TutorialLoading />;
//   }

//   if (error || !tutorial) {
//     return <TutorialError onRetry={() => refetch()} />;
//   }

//   if (!activeLesson) {
//     return <EmptyTutorial />;
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
//       {/* Mobile lesson menu */}
//       <button
//         type="button"
//         onClick={() => setSidebarOpen(true)}
//         aria-label="បើកបញ្ជីមេរៀន"
//         aria-expanded={sidebarOpen}
//         className="fixed right-5 bottom-5 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#002455] px-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-[#00346f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/30 focus-visible:ring-offset-2 lg:hidden"
//       >
//         <Menu className="h-5 w-5" />
//         <span className="font-khmer">មេរៀន</span>
//       </button>

//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="បិទបញ្ជីមេរៀន"
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 z-40 cursor-default bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
//         />
//       )}

//       <div className="mx-auto grid min-h-screen max-w-[1800px] lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_280px]">
//         {/* Left lesson navigation */}
//         <aside
//           className={`fixed inset-y-0 left-0 z-50 w-[290px] transform border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-auto lg:translate-x-0 lg:shadow-none dark:border-slate-800 dark:bg-slate-950 ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="absolute top-3 right-3 z-10 lg:hidden">
//             <button
//               type="button"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="បិទបញ្ជីមេរៀន"
//               className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>

//           <div className="h-full overflow-y-auto overscroll-contain">
//             <SidebarLeftLesson
//               sections={sections}
//               activeLessonId={activeLesson.id}
//               onSelectLesson={selectLesson}
//             />
//           </div>
//         </aside>

//         {/* Main reading area */}
//         <article className="min-w-0 bg-white xl:border-x xl:border-slate-200 dark:bg-slate-950 dark:xl:border-slate-800">
//           <div className="mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
//             {/* Utility navigation */}
//             <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
//               <Link
//                 href={LESSONS_ROUTE}
//                 className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 ត្រឡប់ក្រោយ
//               </Link>

//               <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
//                 <BookOpen className="h-3.5 w-3.5" />
//                 <span>
//                   {activeIndex + 1}/{lessons.length} មេរៀន
//                 </span>
//               </div>
//             </div>

//             {/* Breadcrumb */}
//             <nav
//               aria-label="Breadcrumb"
//               className="font-khmer mb-4 flex min-w-0 flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
//             >
//               <span className="max-w-full truncate">{tutorial.title}</span>
//               <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-slate-700" />
//               <span className="font-semibold text-[#002455] dark:text-blue-300">
//                 {activeLesson.sectionTitle}
//               </span>
//             </nav>

//             <TodayLessonHero
//               title={activeLesson.title}
//               description={tutorial.summary || `រៀនអំពី ${activeLesson.title}`}
//               percent={progress}
//               href="#lesson-content"
//             />

//             {/* Lesson content */}
//             <section
//               id="lesson-content"
//               className="mt-8 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8 dark:border-slate-800 dark:bg-slate-900/40"
//             >
//               <header className="border-b border-slate-200 pb-6 dark:border-slate-800">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <span className="font-khmer text-sm font-semibold text-blue-600 dark:text-blue-400">
//                     មេរៀនទី {activeIndex + 1}
//                   </span>
//                   <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
//                   <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
//                     {activeLesson.type === "SECTION" ? "Section" : "Subsection"}
//                   </span>
//                 </div>

//                 <h1 className="font-khmer mt-3 text-2xl font-bold leading-tight tracking-tight text-[#002455] sm:text-3xl lg:text-4xl dark:text-white">
//                   {activeLesson.title}
//                 </h1>
//               </header>

//               <div className="pt-7">
//                 {activeLesson.blocks.length > 0 ? (
//                   <div className="space-y-7">
//                     {activeLesson.blocks.map((block) => (
//                       <div
//                         key={block.id}
//                         id={getBlockAnchor(block.id)}
//                         className="scroll-mt-28"
//                       >
//                         <LessonBlockRenderer block={block} />
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
//                     <BookOpen className="mx-auto h-6 w-6 text-slate-300 dark:text-slate-600" />
//                     <p className="font-khmer mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
//                       មេរៀននេះមិនទាន់មានមាតិកាទេ។
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Previous / Next */}
//               <nav
//                 aria-label="Lesson navigation"
//                 className="mt-10 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800"
//               >
//                 <div>
//                   {previousLesson && (
//                     <button
//                       type="button"
//                       onClick={() => selectLesson(previousLesson.id)}
//                       className="group flex min-h-20 w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
//                     >
//                       <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-950/40 dark:group-hover:text-blue-300">
//                         <ChevronLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
//                       </span>

//                       <span className="min-w-0">
//                         <span className="font-khmer block text-xs font-medium text-slate-400">
//                           មេរៀនមុន
//                         </span>
//                         <span className="font-khmer mt-1 block truncate font-semibold text-[#002455] dark:text-white">
//                           {previousLesson.title}
//                         </span>
//                       </span>
//                     </button>
//                   )}
//                 </div>

//                 <div>
//                   {nextLesson && (
//                     <button
//                       type="button"
//                       onClick={() => selectLesson(nextLesson.id)}
//                       className="group flex min-h-20 w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002455]/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
//                     >
//                       <span className="min-w-0">
//                         <span className="font-khmer block text-xs font-medium text-slate-400">
//                           មេរៀនបន្ទាប់
//                         </span>
//                         <span className="font-khmer mt-1 block truncate font-semibold text-[#002455] dark:text-white">
//                           {nextLesson.title}
//                         </span>
//                       </span>

//                       <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-950/40 dark:group-hover:text-blue-300">
//                         <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
//                       </span>
//                     </button>
//                   )}
//                 </div>
//               </nav>
//             </section>
//           </div>
//         </article>

//         {/* Right table of contents */}
//         <aside className="hidden bg-slate-50/70 xl:block dark:bg-slate-950">
//           <div className="sticky top-0 h-screen overflow-y-auto overscroll-contain">
//             <SidebarRightLesson blocks={activeLesson.blocks} />
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }

"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  RefreshCw,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import LessonBlockRenderer from "@/components/documentation/LessonBlockRenderer";
import SidebarLeftLesson from "@/components/documentation/SidebarLeftLesson";
import SidebarRightLesson, {
  getBlockAnchor,
  hasHeadingBlocks,
} from "@/components/documentation/SidebarRightLesson";
import TodayLessonHero from "@/components/documentation/TodayLessonHero";
import { useGetTutorialByIdQuery } from "@/redux/api/tutorial-api";
import type {
  TutorialDetailData,
  TutorialLesson,
  TutorialSection,
} from "@/types/tutorial-reader";

const LESSONS_ROUTE = "/documentation/lessons";

function sortSections(sections: TutorialSection[]) {
  return [...sections].sort((a, b) => a.orderIndex - b.orderIndex);
}

function createLessons(sections: TutorialSection[]): TutorialLesson[] {
  const lessons: TutorialLesson[] = [];

  sortSections(sections).forEach((section) => {
    const subsections = [...(section.subsections ?? [])].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );

    const isDirect =
      section.contentMode === "DIRECT" || subsections.length === 0;

    if (isDirect) {
      lessons.push({
        id: section.id,
        sectionId: section.id,
        type: "SECTION",
        title: section.title,
        sectionTitle: section.title,
        orderIndex: section.orderIndex,
        blocks: [...(section.blocks ?? [])].sort(
          (a, b) => a.orderIndex - b.orderIndex,
        ),
      });
    }

    subsections.forEach((subsection) => {
      lessons.push({
        id: subsection.id,
        sectionId: section.id,
        type: "SUBSECTION",
        title: subsection.title,
        sectionTitle: section.title,
        orderIndex: subsection.orderIndex,
        blocks: [...(subsection.blocks ?? [])].sort(
          (a, b) => a.orderIndex - b.orderIndex,
        ),
      });
    });
  });

  return lessons;
}

function TutorialLoading() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto grid min-h-screen max-w-[1720px] lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="hidden border-r border-slate-200 bg-slate-50/80 p-5 lg:block dark:border-slate-800 dark:bg-slate-950">
          <div className="animate-pulse space-y-3">
            <div className="h-7 w-36 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-11 rounded-xl bg-slate-200/70 dark:bg-slate-900" />
            <div className="h-11 rounded-xl bg-slate-200/70 dark:bg-slate-900" />
          </div>
        </aside>

        <section className="min-w-0 px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-[920px] animate-pulse space-y-6">
            <div className="h-10 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-4 w-72 max-w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-64 rounded-[26px] bg-slate-100 dark:bg-slate-900" />
            <div className="h-8 w-64 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-900" />
          </div>
        </section>
      </div>
    </main>
  );
}

function TutorialError({ onRetry }: { onRetry: () => void }) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <RefreshCw className="h-5 w-5" />
        </div>
        <h1 className="font-khmer mt-5 text-xl font-bold text-slate-900 dark:text-white">
          មិនអាចបង្ហាញមេរៀនបានទេ
        </h1>
        <p className="font-khmer mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          សូមព្យាយាមផ្ទុកទិន្នន័យម្តងទៀត។
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="font-khmer mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#002455] px-5 text-sm font-semibold text-white transition hover:bg-[#00346f]"
        >
          <RefreshCw className="h-4 w-4" />
          ព្យាយាមម្តងទៀត
        </button>
      </div>
    </main>
  );
}

function EmptyTutorial() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#002455] dark:bg-blue-950/40 dark:text-blue-300">
          <BookOpen className="h-5 w-5" />
        </div>
        <h1 className="font-khmer mt-5 text-xl font-bold text-slate-900 dark:text-white">
          មិនទាន់មានមេរៀន
        </h1>
        <p className="font-khmer mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Tutorial នេះមិនទាន់មានមាតិកាសម្រាប់អានទេ។
        </p>
        <Link
          href={LESSONS_ROUTE}
          className="font-khmer mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ChevronLeft className="h-4 w-4" />
          ត្រឡប់ទៅបញ្ជីមេរៀន
        </Link>
      </div>
    </main>
  );
}

export default function TutorialDetail({ tutorialId }: { tutorialId: string }) {
  const { data, isLoading, error, refetch } =
    useGetTutorialByIdQuery(tutorialId);

  const [activeLessonId, setActiveLessonId] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tutorial = data?.data as TutorialDetailData | undefined;

  const sections = useMemo(
    () => sortSections(tutorial?.sections ?? []),
    [tutorial?.sections],
  );

  const lessons = useMemo(() => createLessons(sections), [sections]);

  const selectedLessonId = lessons.some(
    (lesson) => lesson.id === activeLessonId,
  )
    ? activeLessonId
    : lessons[0]?.id;

  const activeIndex = Math.max(
    0,
    lessons.findIndex((lesson) => lesson.id === selectedLessonId),
  );

  const activeLesson = lessons[activeIndex];
  const previousLesson = activeIndex > 0 ? lessons[activeIndex - 1] : null;
  const nextLesson =
    activeIndex < lessons.length - 1 ? lessons[activeIndex + 1] : null;

  const progress = lessons.length
    ? Math.round(((activeIndex + 1) / lessons.length) * 100)
    : 0;

  const showToc = activeLesson ? hasHeadingBlocks(activeLesson.blocks) : false;

  useEffect(() => {
    if (!sidebarOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  function selectLesson(lessonId: string) {
    setActiveLessonId(lessonId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (isLoading) return <TutorialLoading />;
  if (error || !tutorial) return <TutorialError onRetry={() => refetch()} />;
  if (!activeLesson) return <EmptyTutorial />;

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        aria-label="បើកបញ្ជីមេរៀន"
        aria-expanded={sidebarOpen}
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 items-center gap-2 rounded-full bg-[#002455] px-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#00346f] lg:hidden"
      >
        <Menu className="h-4 w-4" />
        <span className="font-khmer">មេរៀន</span>
      </button>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="បិទបញ្ជីមេរៀន"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div
        className={`mx-auto grid min-h-screen max-w-[1720px] lg:grid-cols-[264px_minmax(0,1fr)] ${
          showToc ? "2xl:grid-cols-[264px_minmax(0,1fr)_250px]" : ""
        }`}
      >
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[286px] transform border-r border-slate-200 bg-slate-50/95 shadow-2xl transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:w-auto lg:translate-x-0 lg:shadow-none dark:border-slate-800 dark:bg-slate-950 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="បិទបញ្ជីមេរៀន"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="h-full overflow-y-auto overscroll-contain">
            <SidebarLeftLesson
              sections={sections}
              activeLessonId={activeLesson.id}
              onSelectLesson={selectLesson}
            />
          </div>
        </aside>

        <article className="min-w-0 bg-white dark:bg-slate-950">
          <div className="mx-auto w-full max-w-[940px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={LESSONS_ROUTE}
                className="font-khmer inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="h-4 w-4" />
                ត្រឡប់ក្រោយ
              </Link>

              <span className="font-khmer inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                <BookOpen className="h-3.5 w-3.5" />
                {activeIndex + 1} / {lessons.length}
              </span>
            </div>

            <nav
              aria-label="Breadcrumb"
              className="font-khmer mb-4 flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-slate-400 dark:text-slate-500"
            >
              <span className="max-w-[70%] truncate">{tutorial.title}</span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="font-semibold text-slate-600 dark:text-slate-300">
                {activeLesson.sectionTitle}
              </span>
            </nav>

            <TodayLessonHero
              title={activeLesson.title}
              description={tutorial.summary || `រៀនអំពី ${activeLesson.title}`}
              percent={progress}
              href="#lesson-content"
            />

            <section id="lesson-content" className="mt-10 scroll-mt-28">
              <header className="mb-7 border-b border-slate-200 pb-5 dark:border-slate-800">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-khmer text-xs font-bold text-blue-600 dark:text-blue-400">
                    មេរៀនទី {activeIndex + 1}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {activeLesson.type === "SECTION" ? "Section" : "Subsection"}
                  </span>
                </div>

                <h2 className="font-khmer text-2xl font-bold leading-tight tracking-tight text-[#002455] sm:text-3xl dark:text-white">
                  {activeLesson.title}
                </h2>
              </header>

              {activeLesson.blocks.length > 0 ? (
                <div className="space-y-7 sm:space-y-8">
                  {activeLesson.blocks.map((block) => (
                    <div
                      key={block.id}
                      id={getBlockAnchor(block.id)}
                      className="scroll-mt-32"
                    >
                      <LessonBlockRenderer block={block} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/50">
                  <BookOpen className="mx-auto h-6 w-6 text-slate-300 dark:text-slate-600" />
                  <p className="font-khmer mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    មេរៀននេះមិនទាន់មានមាតិកាទេ។
                  </p>
                </div>
              )}

              <nav
                aria-label="Lesson navigation"
                className="mt-12 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800"
              >
                <div>
                  {previousLesson && (
                    <button
                      type="button"
                      onClick={() => selectLesson(previousLesson.id)}
                      className="group flex min-h-16 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                    >
                      <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-x-0.5" />
                      <span className="min-w-0">
                        <span className="font-khmer block text-[11px] font-semibold text-slate-400">
                          មេរៀនមុន
                        </span>
                        <span className="font-khmer mt-0.5 block truncate text-sm font-semibold text-[#002455] dark:text-white">
                          {previousLesson.title}
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                <div>
                  {nextLesson && (
                    <button
                      type="button"
                      onClick={() => selectLesson(nextLesson.id)}
                      className="group flex min-h-16 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-left transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
                    >
                      <span className="min-w-0">
                        <span className="font-khmer block text-[11px] font-semibold text-slate-400">
                          មេរៀនបន្ទាប់
                        </span>
                        <span className="font-khmer mt-0.5 block truncate text-sm font-semibold text-[#002455] dark:text-white">
                          {nextLesson.title}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5" />
                    </button>
                  )}
                </div>
              </nav>
            </section>
          </div>
        </article>

        {showToc && (
          <aside className="hidden border-l border-slate-200 bg-white 2xl:block dark:border-slate-800 dark:bg-slate-950">
            <div className="sticky top-0 h-screen overflow-y-auto overscroll-contain">
              <SidebarRightLesson blocks={activeLesson.blocks} />
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
