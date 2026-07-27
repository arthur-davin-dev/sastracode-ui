"use client";
import { MyCourseCard } from "@/components/my-courses/MyCourseCard";
import { MyCourse } from "@/types/course";
import { motion } from "framer-motion";

const myCourses: MyCourse[] = [
  { id: "1", thumbnailUrl: "/images/Web-dvelopment.jpg", category: "FRONTEND", title: "HTML & CSS Fundamentals", description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS", studentsCount: "១២ជំពូក", duration: "៦ម៉ោង ២៥នាទី", status: "not_started" },
  { id: "2", thumbnailUrl: "/images/Web-dvelopment.jpg", category: "FRONTEND", title: "HTML & CSS Fundamentals", description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS", studentsCount: "១២ជំពូក", duration: "៦ម៉ោង ២៥នាទី", status: "in_progress" },
  { id: "3", thumbnailUrl: "/images/Web-dvelopment.jpg", category: "FRONTEND", title: "HTML & CSS Fundamentals", description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS", studentsCount: "១២ជំពូក", duration: "៦ម៉ោង ២៥នាទី", status: "not_started" },
  { id: "4", thumbnailUrl: "/images/Web-dvelopment.jpg", category: "FRONTEND", title: "HTML & CSS Fundamentals", description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS", studentsCount: "១២ជំពូក", duration: "៦ម៉ោង ៥នាទី", status: "in_progress" },
  { id: "5", thumbnailUrl: "/images/Web-dvelopment.jpg", category: "FRONTEND", title: "HTML & CSS Fundamentals", description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS", studentsCount: "១២ជំពូក", duration: "៦ម៉ោង ៥នាទី", status: "not_started" },
  { id: "6", thumbnailUrl: "/images/Web-dvelopment.jpg", category: "FRONTEND", title: "HTML & CSS Fundamentals", description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS", studentsCount: "៥ជំពូក", duration: "៥ម៉ោង ៥នាទី", status: "in_progress" },
];

export default function MyCourses() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-xl font-bold text-blue-950">វគ្គសិក្សារបស់ខ្ញុំ</h1>
        <p className="text-sm text-muted-foreground mt-1">
          ចូលបន្តវគ្គសិក្សានិងតាមដានវឌ្ឍនភាពសិក្សារបស់អ្នកនៅក្នុងបញ្ជីនេះ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <MyCourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}