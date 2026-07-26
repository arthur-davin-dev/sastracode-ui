"use client";

import { useMemo, useState } from "react";
import { CourseGrid } from "../courses/CourseGrid";
import { CategoryFilter } from "../courses/CategoryFilter";
import { Course } from "../courses/Types";

const categories = [
  "មេរៀនទាំងអស់",
  "Web Development",
  "Python Mastery",
  "Data Science",
  "Free Course",
  "Premium Course",
  "Private Course",
];

const relatedCourses: Course[] = [
  {
    id: "1",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    lessons: 24,
    duration: "១២ ម៉ោង ៣០ នាទី",
    image: "/assets/images/HTML & CSS.jpg",
  },
  {
    id: "2",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    lessons: 24,
    duration: "១២ ម៉ោង ៣០ នាទី",
    image: "/assets/images/HTML & CSS.jpg",
  },
  {
    id: "3",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description: "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS",
    lessons: 24,
    duration: "១២ ម៉ោង ៣០ នាទី",
    image: "/assets/images/HTML & CSS.jpg",
  },
  {
    id: "4",
    category: "PYTHON",
    title: "Python Basics",
    description: "ទទួលបណ្តាញសមត្ថភាព Python សម្រាប់អ្នកចាប់ផ្តើម",
    lessons: 18,
    duration: "១០ ម៉ោង",
    image: "/assets/images/Python-card.jpg",
  },
  {
    id: "5",
    category: "DATA SCIENCE",
    title: "Data Science Introduction",
    description: "រៀនអំពី Data Analysis, Visualization និង Statistics",
    lessons: 20,
    duration: "១៥ ម៉ោង",
    image: "/assets/images/DataScience-card.jpg",
  },
  {
    id: "6",
    category: "WEB DEVELOPMENT",
    title: "React Basics",
    description: "ស្វែងយល់ពី React, Components និង Hooks",
    lessons: 22,
    duration: "១៤ ម៉ោង",
    image: "/assets/images/react-card.jpg",
  },
];

export function RelatedCourses() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filtered = useMemo(() => {
    if (activeCategory === categories[0]) return relatedCourses;
    return relatedCourses.filter(
      (c) => c.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [activeCategory]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <h2
        className="mb-5 text-xl font-bold text-primary-color font-(family-name:--font-sans)
"
      >
        ថ្នាក់រៀនទាំងអស់
      </h2>
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>
      <CourseGrid courses={filtered} />
    </section>
  );
}
