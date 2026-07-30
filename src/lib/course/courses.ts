// ---- Types ----

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  lessonCount: number;
  totalDuration: string;
  lessons: Lesson[];
}

export interface Instructor {
  name: string;
  avatar: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
}

export interface Course {
  id: string;
  category: string;
  title: string;
  description: string;
  lessons: number;
  duration: string;
  image: string;
  href?: string;
  price?: number; // undefined/0 = free
  learningPoints?: string[];
  instructor?: Instructor;
  curriculum?: Chapter[];
}

// ---- Data ----

export const categories = [
  "ទាំងអស់",
  "HTML",
  "CSS",
  "Free Course",
  "Frontend",
  "Backend",
  "JavaScript",
  "UI/UX",
] as const;

export const courses: Course[] = [
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
    image: "/assets/images/HTML & CSS.jpg",
  },
  {
    id: "3",
    category: "HTML",
    title: "HTML Structure & Semantics",
    description:
      "រៀនរចនាផ្ទៃក្នុង HTML ជាមួយ Semantic Elements និង Accessibility",
    lessons: 18,
    duration: "៤ម៉ោង ២០នាទី",
    image: "/assets/images/HTML & CSS.jpg",
  },
  {
    id: "4",
    category: "Backend",
    title: "Node.js Basics",
    description:
      "ទទួលបានប្រាក់ចំណូលសម្រាប់ Server-side development ជាមួយ Node.js និង Express",
    lessons: 32,
    duration: "៧ម៉ោង ១០នាទី",
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
    image: "/assets/images/javascript-banner.png",
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
    image: "/images/javascript-banner.png",
  },
  {
    id: "8",
    category: "UI/UX",
    title: "Design Systems",
    description:
      "រៀនរចនាប្រព័ន្ធ UI ដោយប្រើ Principles និង Patterns ដូចជា Atomic Design",
    lessons: 18,
    duration: "៥ម៉ោង ២០នាទី",
    image: "/images/frontend-banner.png",
  },
  {
    id: "9",
    category: "Backend",
    title: "API Development",
    description:
      "បង្កើត RESTful និង GraphQL API ដែលអាចប្រើបានឆាប់ រហ័ស និងសុវត្ថិភាព",
    lessons: 26,
    duration: "៧ម៉ោង ៣០នាទី",
    image: "/images/backend-banner.png",
  },
];

// ---- Data-access helpers ----

export async function getAllCourses(): Promise<Course[]> {
  return courses;
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  return courses.find((c) => c.id === id);
}

export async function getRelatedCourses(
  currentId: string,
  category?: string,
  limit = 4
): Promise<Course[]> {
  const normalizedCategory = category?.toLowerCase();

  const sameCategory = courses.filter(
    (c) => c.id !== currentId && c.category.toLowerCase() === normalizedCategory
  );

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fallback = courses.filter(
    (c) => c.id !== currentId && !sameCategory.includes(c)
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}