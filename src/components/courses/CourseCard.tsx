import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock } from "lucide-react";
import { Course } from "@/lib/course/courses";

interface CourseCardProps {
  course: Course;
}
export function CourseCard({ course }: CourseCardProps) {
  const isFree = Number(course.id) % 2 === 1;
  const buttonLabel = isFree ? "ឥតគិតថ្លៃ" : "ថ្នាក់បង់ថ្លៃ";
  const buttonClass = isFree
    ? "h-8 rounded-md bg-[#06295c] px-3 text-[13px] hover:bg-[#082f6e] font-khmer"
    : "h-8 rounded-md bg-amber-400 px-3 text-[13px] font-khmer text-slate-950 hover:bg-amber-300";

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group block w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-37.5 w-full ">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <Badge
          variant="secondary"
          className="mb-3 bg-transparent p-0 text-[12px] font-semibold uppercase tracking-wider text-pink-600 hover:bg-transparent"
        >
          {course.category}
        </Badge>

        <h3 className="mb-2 text-[16px] font-semibold text-gray-900--font-google-sans">
          {course.title}
        </h3>

        <p className="line-clamp-2 text-[14px] leading-[1.7] text-gray-500--font-google-sans">
          {course.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-[12px] text-primary-color">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessons} មេរៀន
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between pt-0">
          <Button size="sm" className={buttonClass} tabIndex={-1}>
            {buttonLabel}
          </Button>

          {/* was: <a href={course.href ?? "#"}>...</a> — replaced with a span since the whole card is already the link */}
          <span className="text-[13px] font-medium text-[#06295c] group-hover:underline--font-google-sans">
            ចាប់ផ្តើមរៀន →
          </span>
        </div>
      </div>

    </Link>
  );
}

//------new card-------//
// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Bookmark,
//   Clock,
//   ArrowRight,
//   Play,
//   CheckCircle2,
//   Tag,
// } from "lucide-react";
// import { Course } from "@/lib/course/courses";

// interface CourseCardProps {
//   course: Course & {
//     progressPercent?: number;
//     isBookmarked?: boolean;
//   };
// }

// export function CourseCard({ course }: CourseCardProps) {
//   const [bookmarked, setBookmarked] = useState(course.isBookmarked ?? true);
//   const progress = course.progressPercent ?? 0;
//   const isCompleted = progress === 100;

//   return (
//     <motion.div
//       whileHover={{ y: -6 }}
//       transition={{ duration: 0.25, ease: "easeOut" }}
//       className="h-full"
//     >
//       <Card
//         className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white
//        dark:bg-slate-900 shadow-md hover:shadow-xl hover:border-blue-50 transition-all duration-300 h-full p-0"
//       >
//         {/* Thumbnail Image Container */}
//         <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
//           <img
//             src={course.image}
//             alt={course.title}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />

//           {/* Dark Overlay Gradient */}
//           <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90" />

//           {/* Top-Left Bookmark Ribbon (Yellow Accent) */}
//           <button
//             onClick={() => setBookmarked(!bookmarked)}
//             className="absolute top-0 left-4 z-20 transition-transform active:scale-90"
//             title={bookmarked ? "ដកចេញពីគម្រោង" : "រក្សាទុក"}
//           >
//             <div className="relative flex items-center p-3 justify-center">
//               <Bookmark
//                 className={`h-7 w-7 drop-shadow-md  transition-colors duration-300 ${
//                   bookmarked
//                     ? "text-init-color fill-yellow-400"
//                     : "text-white/80 fill-black/30 hover:text-yellow-400"
//                 }`}
//               />
//             </div>
//           </button>

//           {/* Top-Right Access Status Badge (Red Secondary Color) */}
//           <div className="absolute top-3 right-3 z-10">
//             <Badge
//               className={`border-none px-8 py-4 text-lg font-bold shadow-md transition-colors duration-300 ${
//                 course.category === "in_progress"
//                   ? "bg-red-600 text-white"
//                   : "bg-yellow-400 text-slate-950"
//             } `}>
//               {course.category === "in_progress" ? "ឥតគិតថ្លៃ" : "ថ្នាក់គិតថ្លៃ"}
//             </Badge>
//           </div>

//           {/* Hover Play Button Overlay */}
//           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
//             <div className="p-4 rounded-full bg-primary-color text-white shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
//               <Play className="h-7 w-7 fill-current ml-0.5" />
//             </div>
//           </div>
//         </div>

//         {/* Card Content Section */}
//         <CardContent className="p-6 flex flex-col justify-between flex-1 space-y-2">
//           {/* Category Tag & Title Details */}
//           <div className="space-y-3">
//             <div className="flex items-center gap-2">
//               <span className="inline-flex items-center gap-1.5 px-2  rounded-xl bg-init-color/20 text-primary-color dark:text-init-color text-lg font-bold border border-yellow-400/40">
//                 <Tag className="h-4 w-4 text-secondary-color" />
//                 {course.category}
//               </span>
//             </div>

//             {/* Course Title (text-lg & text-primary-color) */}
//             <h3 className="font-bold text-lg text-primary-color dark:text-white line-clamp-2 leading-snug transition-colors duration-300">
//               {course.title}
//             </h3>
//           </div>

//           {/* Learning Progress Section */}
//           <div className="space-y-2 pt-1">
//             <div className="flex items-center justify-between text-lg font-bold">
//               <span className="text-primary-color dark:text-white flex items-center gap-2">
//                 {isCompleted ? (
//                   <>
//                     <CheckCircle2 className="h-5 w-5 text-blue-600 fill-blue-100" />
//                     <span>បានបញ្ចប់</span>
//                   </>
//                 ) : (
//                   <span>វឌ្ឍនភាពសិក្សា</span>
//                 )}
//               </span>
//               <span className="text-secondary-color dark:text-red-400">
//                 {progress}%
//               </span>
//             </div>

//             {/* Progress Bar */}
//             <div className="relative h-3.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
//               <div
//                 className={`h-full rounded-full transition-all duration-500 shadow-xs ${
//                   isCompleted
//                     ? "bg-gradient-to-r from-yellow-400 to-amber-500"
//                     : "bg-gradient-to-r from-blue-600 to-primary-color"
//                 }`}
//                 style={{ width: `${Math.min(progress, 100)}%` }}
//               />
//             </div>
//           </div>

//           {/* Footer: Time & Action Button in the Same Line */}
//           <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
//             {/* Duration Display */}
//             <div className="flex items-center gap-2 text-lg font-bold text-slate-700 dark:text-slate-300 shrink-0">
//               <Clock className="h-6 w-6 text-red-600" />
//               <span>{course.duration || "២០ ម៉ោង"}</span>
//             </div>

//             {/* Action Button */}
//             <Button className="h-12 px-5 rounded-lg bg-primary-color hover:bg-blue-800 text-white font-bold text-lg shadow-md transition-all duration-300 group/btn shrink-0 flex items-center gap-2">
//               <span>{isCompleted ? "ពិនិត្យឡើងវិញ" : "បន្តវគ្គសិក្សា"}</span>
//               <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }
