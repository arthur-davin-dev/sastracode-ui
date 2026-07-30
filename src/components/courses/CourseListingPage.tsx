"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { CourseGrid } from "./CourseGrid";
import { Course } from "@/lib/course/courses";

const categories = [
  "ទាំងអស់",
  "HTML",
  "CSS",
  "Free Course",
  "Frontend",
  "Backend",
  "JavaScript",
  "UI/UX",
];

const courses: Course[] = [
  {
    id: "1",
    category: "FRONTEND",
    title: "HTML & CSS Fundamentals",
    description:
      "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS ចាប់ពីមូលដ្ឋានដល់កម្រិតខ្ពស់",
    lessons: 28,
    duration: "៦ម៉ោង ៤២នាទី",
    image: "/assets/images/HTML & CSS.jpg",
  },
  {
    id: "2",
    category: "CSS",
    title: "Advanced CSS Layouts",
    description:
      "ស្វែងយល់ពី Grid, Flexbox និង Responsive Patterns ដើម្បីបង្កើត UI រាបស្មើ",
    lessons: 24,
    duration: "៥ម៉ោង ១០នាទី",
    image: "/assets/images/CSS.jpg",
  },
  {
    id: "3",
    category: "HTML",
    title: "HTML Structure & Semantics",
    description:
      "រៀនរចនាផ្ទៃក្នុង HTML ជាមួយ Semantic Elements និង Accessibility",
    lessons: 18,
    duration: "៤ម៉ោង ២០នាទី",
    image: "/assets/images/HTML-course.jpg",
  },
  {
    id: "4",
    category: "Backend",
    title: "Node.js Basics",
    description:
      "ទទួលបានប្រាក់ចំណូលសម្រាប់ Server-side development ជាមួយ Node.js និង Express",
    lessons: 32,
    duration: "៧ម៉ោង ૧૦នាទី",
    image: "/assets/images/Nodejs.jpg",
  },
  {
    id: "5",
    category: "Free Course",
    title: "Intro to JavaScript",
    description:
      "ស្នើភាសាស្វ័យប្រវត្តិកម្ម JavaScript ដើម្បីបង្កើតព្រលឹង Web អន្តរកម្ម",
    lessons: 26,
    duration: "៦ម៉ោង ៣០នាទី",
    image: "/assets/images/javascript-course.png",
  },
  {
    id: "6",
    category: "Frontend",
    title: "React Basics",
    description: "ចាប់ផ្តើម React និង Components រួមទាំង Hooks និង Routing",
    lessons: 30,
    duration: "៨ម៉ោង ១៥នាទី",
    image: "/assets/images/react-card.jpg",
  },
  {
    id: "7",
    category: "JavaScript",
    title: "Modern JavaScript",
    description:
      "ស្វែងយល់ពី ES6+, Async/Await និង Patterns សម័យថ្មីសម្រាប់ Web Development",
    lessons: 22,
    duration: "៦ម៉ោង ៤០នាទី",
    image: "/assets/images/javascript-course.png",
  },
  {
    id: "8",
    category: "UI/UX",
    title: "Design Systems",
    description:
      "រៀនរចនាប្រព័ន្ធ UI ដោយប្រើ Principles និង Patterns ដូចជា Atomic Design",
    lessons: 18,
    duration: "៥ម៉ោង ២០នាទី",
    image: "/assets/images/design-systems-course.png",
  },
  {
    id: "9",
    category: "Backend",
    title: "API Development",
    description:
      "បង្កើត RESTful និង GraphQL API ដែលអាចប្រើបានឆាប់ រហ័ស និងសុវត្ថិភាព",
    lessons: 26,
    duration: "៧ម៉ោង ៣០នាទី",
    image: "/assets/images/api-development-course.png",
  },
];

// Static homepage sections. Change the titles, links, or course IDs here.
const courseSections = [
  {
    title: "ចុងក្រោយបំផុត",
    seeAllHref: "/documentation/lessons?category=latest",
    courseIds: ["1", "2", "3"],
  },
  {
    title: "ណែនាំសម្រាប់អ្នក",
    seeAllHref: "/documentation/lessons?category=recommended",
    courseIds: ["4", "5", "6"],
  },
  {
    title: "មេរៀនពេញនិយម",
    seeAllHref: "/documentation/lessons?category=popular",
    courseIds: ["7", "8", "9"],
  },
] as const;

export default function CourseListingPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === categories[0] ||
        course.category.toLowerCase() === activeCategory.toLowerCase();

      const query = search.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-300 px-6 pb-16 pt-8">
        {/* Search & filter row */}
        <div className="mb-10.5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {search.trim() || activeCategory !== categories[0] ? (
          <CourseGrid title="លទ្ធផលស្វែងរក" courses={filteredCourses} />
        ) : (
          <div className="space-y-12">
            {courseSections.map((section) => (
              <CourseGrid
                key={section.title}
                title={section.title}
                courses={section.courseIds
                  .map((id) => courses.find((course) => course.id === id))
                  .filter((course): course is Course => Boolean(course))}
                seeAllHref={section.seeAllHref}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
