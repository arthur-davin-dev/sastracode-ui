"use client";

import { MyCourseCard } from "@/components/my-courses/MyCourseCard";
import { MyCourse } from "@/types/course";
import { motion } from "framer-motion";

interface ExtendedMyCourse extends MyCourse {
  progressPercent: number;
}

const myCourses: ExtendedMyCourse[] = [
  {
    id: "1",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS ពីកម្រិតដំបូង",
    studentsCount: "១២ ជំពូក",
    duration: "៦ ម៉ោង ២៥ នាទី",
    status: "in_progress",
    progressPercent: 30,
  },
  {
    id: "2",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "BACKEND",
    title: "Node.js & Express API Development",
    description: "បង្កើត RESTful APIs និង backend systems ដែលមានសុវត្ថិភាព",
    studentsCount: "១៥ ជំពូក",
    duration: "៨ ម៉ោង ៤០ នាទី",
    status: "in_progress",
    progressPercent: 50,
  },
  {
    id: "3",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "FULLSTACK",
    title: "Next.js & Tailwind CSS Architecture",
    description: "រៀនបង្កើត Full-stack Web Apps ជាមួយ Next.js App Router ទំនើប",
    studentsCount: "១៨ ជំពូក",
    duration: "១២ ម៉ោង ១៥ នាទី",
    status: "in_progress",
    progressPercent: 75,
  },
  {
    id: "4",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "MOBILE",
    title: "Flutter & Dart App Development",
    description: "បង្កើត Cross-platform Mobile Applications សម្រាប់ iOS និង Android",
    studentsCount: "២០ ជំពូក",
    duration: "១៤ ម៉ោង",
    status: "in_progress",
    progressPercent: 90,
  },
  {
    id: "5",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "CYBERSECURITY",
    title: "Cybersecurity សម្រាប់អ្នកចាប់ផ្តើម",
    description: "ស្វែងយល់ពីមូលដ្ឋានគ្រឹះ Network Security និង Ethical Hacking",
    studentsCount: "១០ ជំពូក",
    duration: "២០ ម៉ោង",
    status: "not_started",
    progressPercent: 0,
  },
  {
    id: "6",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "UI/UX DESIGN",
    title: "Figma Fundamentals & Wireframing",
    description: "រៀបចំ UI/UX Layout និង Prototyping សម្រាប់ App និង Web",
    studentsCount: "៨ ជំពូក",
    duration: "៥ ម៉ោង ៣០ នាទី",
    status: "in_progress",
    progressPercent: 100,
  },
  {
    id: "7",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "DEVOPS",
    title: "Docker & Kubernetes Deployment",
    description: "គ្រប់គ្រង Containerization និង CI/CD Pipelines សម្រាប់ Enterprise",
    studentsCount: "១៤ ជំពូក",
    duration: "៩ ម៉ោង ៥០ នាទី",
    status: "in_progress",
    progressPercent: 45,
  },
  {
    id: "8",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "DATABASE",
    title: "PostgreSQL & Prisma ORM Essentials",
    description: "ការរចនា Relational Database និង Query Optimization",
    studentsCount: "៩ ជំពូក",
    duration: "៧ ម៉ោង ១០ នាទី",
    status: "in_progress",
    progressPercent: 60,
  },
  {
    id: "9",
    thumbnailUrl: "/images/cyber-photo.svg",
    category: "AI & DATA",
    title: "Python Machine Learning Basics",
    description: "ស្វែងយល់ពី Data Analysis, Pandas, និង Model Training",
    studentsCount: "១៦ ជំពូក",
    duration: "១១ ម៉ោង ៤៥ នាទី",
    status: "not_started",
    progressPercent: 0,
  },
];

export default function MyCourses() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-primary-color">វគ្គសិក្សារបស់ខ្ញុំ</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
          ចូលបន្តវគ្គសិក្សានិងតាមដានវឌ្ឍនភាពសិក្សារបស់អ្នកនៅក្នុងបញ្ជីនេះ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <MyCourseCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}