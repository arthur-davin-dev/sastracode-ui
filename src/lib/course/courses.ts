// ---- Types ----

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  locked: boolean;
  /** Public path (for example, /videos/intro.mp4) or an absolute video URL. */
  videoUrl?: string;
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
  price?: number;
  learningPoints?: string[];
  instructor?: Instructor;
  curriculum?: Chapter[];
  originalPrice?: number;
  totalDuration?: string;
  benefits?: Benefit[];   
}
export interface Benefit {
  icon: "video" | "download" | "certificate" | "qa" | "pace" | "devices";
  title: string;
  description: string;
}

// ---- Data ----

export const categories = [
  "ទាំងអស់",
  "ឥតគិតថ្លៃ",
  "ថ្នាក់គិតថ្លៃ",
] as const;

export const courses: Course[] = [
  {
    id: "1",
    category: "ឥតគិតថ្លៃ",
    title: "HTML & CSS Fundamentals",
    description:
      "រៀនបង្កើត Responsive Website ជាមួយ HTML និង CSS ចាប់ពីមូលដ្ឋានដល់កម្រិតខ្ពស់",
    lessons: 28,
    duration: "៦ម៉ោង ៤២នាទី",

    image: "/assets/images/HTML & CSS.jpg",
  },
  {
    id: "2",
    category: "ឥតគិតថ្លៃ",
    title: "Advanced CSS Layouts",
    description:
      "ស្វែងយល់ពី Grid, Flexbox និង Responsive Patterns ដើម្បីបង្កើត UI រាបស្មើ",
    lessons: 24,
    duration: "៥ម៉ោង ១០នាទី",
    image: "/assets/images/CSS.jpg",
  },
  {
    id: "3",
    category: "ឥតគិតថ្លៃ",
    title: "HTML Structure & Semantics",
    description:
      "រៀនរចនាផ្ទៃក្នុង HTML ជាមួយ Semantic Elements និង Accessibility",
    lessons: 18,
    duration: "៤ម៉ោង ២០នាទី",
    image: "/assets/images/HTML-course.jpg",
  },
  {
    id: "4",
    category: "ថ្នាក់គិតថ្លៃ",
    title: "Node.js Basics",
    description:
      "ទទួលបានប្រាក់ចំណូលសម្រាប់ Server-side development ជាមួយ Node.js និង Express",
    lessons: 32,
    duration: "៧ម៉ោង ១០នាទី",
    image: "/assets/images/Nodejs.jpg",
  },
  {
    id: "5",
    category: "ថ្នាក់គិតថ្លៃ",
    title: "Intro to JavaScript",
    description:
      "ស្នើភាសាស្វ័យប្រវត្តិកម្ម JavaScript ដើម្បីបង្កើតព្រលឹង Web អន្តរកម្ម",
    lessons: 26,
    duration: "៦ម៉ោង ៣០នាទី",
    image: "/assets/images/javascript-course.png",
  },
  {
    id: "6",
    category: "ថ្នាក់គិតថ្លៃ",
    title: "React Basics",
    description: "ចាប់ផ្តើម React និង Components រួមទាំង Hooks និង Routing",
    lessons: 30,
    duration: "៨ម៉ោង ១៥នាទី",
    image: "/assets/images/react-card.jpg",
  },
  {
    id: "7",
    category: "ឥតគិតថ្លៃ",
    title: "Modern JavaScript",
    description:
      "ស្វែងយល់ពី ES6+, Async/Await និង Patterns សម័យថ្មីសម្រាប់ Web Development",
    lessons: 22,
    duration: "៦ម៉ោង ៤០នាទី",
    image: "/assets/images/javascript-course.png",
  },
  {
    id: "8",
    category: "ថ្នាក់គិតថ្លៃ",
    title: "Design Systems",
    description:
      "រៀនរចនាប្រព័ន្ធ UI ដោយប្រើ Principles និង Patterns ដូចជា Atomic Design",
    lessons: 18,
    duration: "៥ម៉ោង ២០នាទី",
    image: "/assets/images/design-systems-course.png",
  },
  {
    id: "9",
    category: "",
    title: "ថ្នាក់គិតថ្លៃ",
    description:
      "បង្កើត RESTful និង GraphQL API ដែលអាចប្រើបានឆាប់ រហ័ស និងសុវត្ថិភាព",
    lessons: 26,
    duration: "៧ម៉ោង ៣០នាទី",
    image: "/assets/images/api-development-course.png",
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

//-------enrollment------///

// //-------enrollment------///
// export interface Benefit {
//   icon: "video" | "download" | "certificate" | "qa" | "pace" | "devices";
//   title: string;
//   description: string;
// }


// export interface EnrollmentHistoryItem {
//   courseId: string;
//   title: string;
//   thumbnail: string;
//   status: "completed" | "in-progress";
//   progressPercent: number;
  
// }
