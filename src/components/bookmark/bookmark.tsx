"use client";

import { motion } from "framer-motion";
import { BookmarkCourseCard } from "@/components/bookmark/BookmarkCourseCard";
import { BookmarkedCourse } from "@/types/course";

// Extended interface to support optional progressPercent
interface BookmarkedCourseWithProgress extends BookmarkedCourse {
  progressPercent?: number;
}

const bookmarkedCourses: BookmarkedCourseWithProgress[] = [
  {
    id: "1",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS ពីកម្រិតដំបូង",
    duration: "៦ម៉ោង ២៥នាទី",
    status: "in_progress",
    isBookmarked: true,
    progressPercent: 30, // Shows 30% progress bar
  },
  {
    id: "2",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "BACKEND",
    title: "Node.js & Express API Development",
    description: "បង្កើត RESTful APIs និង backend systems ដែលមានសុវត្ថិភាព",
    duration: "៨ម៉ោង ៤០នាទី",
    status: "paid",
    isBookmarked: true,
    // No progress -> Hides progress bar & shows "ចាប់ផ្តើមសិក្សា" button
  },
  {
    id: "3",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FULLSTACK",
    title: "Next.js & Tailwind CSS Architecture",
    description: "រៀនបង្កើត Full-stack Web Apps ជាមួយ Next.js App Router ទំនើប",
    duration: "១២ម៉ោង ១៥នាទី",
    status: "in_progress",
    isBookmarked: true,
    progressPercent: 75, // Shows 75% progress bar
  },
  {
    id: "4",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "MOBILE",
    title: "Flutter & Dart App Development",
    description: "បង្កើត Cross-platform Mobile Applications សម្រាប់ iOS និង Android",
    duration: "១៤ម៉ោង",
    status: "paid",
    isBookmarked: true,
    // No progress -> Hides progress bar & shows "ចាប់ផ្តើមសិក្សា" button
  },
  {
    id: "5",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "CYBERSECURITY",
    title: "Cybersecurity សម្រាប់អ្នកចាប់ផ្តើម",
    description: "ស្វែងយល់ពីមូលដ្ឋានគ្រឹះ Network Security និង Ethical Hacking",
    duration: "២០ម៉ោង",
    status: "in_progress",
    isBookmarked: true,
    progressPercent: 50, // Shows 50% progress bar
  },
  {
    id: "6",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "DEVOPS",
    title: "Docker & Kubernetes Essentials",
    description: "គ្រប់គ្រង Containerization និង Deployment សម្រាប់ Enterprise",
    duration: "៩ម៉ោង ៥០នាទី",
    status: "paid",
    isBookmarked: true,
    // No progress -> Hides progress bar & shows "ចាប់ផ្តើមសិក្សា" button
  },
];

export default function Bookmark() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-color">ចំណាំ (Bookmarks)</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
          ចូលមើលព័ត៌មានវគ្គសិក្សា ដែលអ្នកកំពុងចាប់អារម្មណ៍និងបានរក្សាទុកនៅក្នុងបញ្ជីនេះ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookmarkedCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <BookmarkCourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}