"use client";

import { motion } from "framer-motion";
import { BookmarkCourseCard } from "@/components/bookmark/BookmarkCourseCard";
import { BookmarkedCourse } from "@/types/course";

const bookmarkedCourses: BookmarkedCourse[] = [
  {
    id: "1",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    studentsCount: "១២ ជំពូក",
    duration: "៦ម៉ោង ២៥នាទី",
    isBookmarked: true,
  },
  {
    id: "2",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    studentsCount: "១២ជំពូក",
    duration: "៦ម៉ោង ២៥នាទី",
    isBookmarked: true,
  },
  {
    id: "3",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    studentsCount: "១២ជំពូក",
    duration: "៦ម៉ោង ២៥នាទី",
    isBookmarked: false,
  },
  {
    id: "4",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    studentsCount: "១២ជំពូក",
    duration: "៦ម៉ោង ២៥នាទី",
    isBookmarked: true,
  },
  {
    id: "5",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    studentsCount: "១២ជំពូក",
    duration: "៦ម៉ោង ២៥នាទី",
    isBookmarked: false,
  },
  {
    id: "6",
    thumbnailUrl: "/images/Web-dvelopment.jpg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    studentsCount: "១២ជំពូក",
    duration: "៦ម៉ោង ២៥នាទី",
    isBookmarked: true,
  },
];

export default function Bookmark() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-xl font-bold text-indigo-950">ចំណាំ</h1>
        <p className="text-sm text-muted-foreground mt-1">
          ចូលមើលព័ត៌មានវគ្គសិក្សា ដែលអ្នកកំពុងចាប់អារម្មណ៍និងអានសំខាន់នៅក្នុងបញ្ជីនេះ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {bookmarkedCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <BookmarkCourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}