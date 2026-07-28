import {
  Course,
  CourseProgress,
  ForumPost,
  LearningPathBannerData,
  LessonCatalogItem,
  OverallProgressData,
  ProgressLessonCard,
  ProjectCatalogItem,
  PromoBannerData,
  SidebarNavItem,
  TechOption,
  TrackSlug,
  TrackTab,
} from "@/types/course";

// export const docSidebarLinks: SidebarNavItem[] = [
//   { id: "home", label: "ទំព័រដើម", href: "/home", icon: "Home" },
//   { id: "documentation", label: "វគ្គសិក្សា", href: "/documentation", icon: "GraduationCap" },
//   { id: "resources", label: "Resources", href: "/documentation/resources", icon: "FolderOpen" },
//   { id: "bookmark", label: "Bookmark", href: "/documentation/bookmark", icon: "Bookmark" },
//   { id: "help", label: "Help Center", href: "/documentation/help", icon: "HelpCircle" },
// ];

export const trackTabs: TrackTab[] = [
  { slug: "html", label: "HTML" },
  { slug: "css", label: "CSS" },
  { slug: "javascript", label: "JAVASCRIPT" },
  { slug: "java", label: "JAVA" },
  { slug: "python", label: "PYTHON" },
];

export const learningPathBanners: Record<TrackSlug, LearningPathBannerData> = {
  java: {
    trackLabel: "JAVA",
    title: "Java Programming",
    description: "Master Java from fundamentals to advanced projects",
    lessonsCount: 24,
    studentsCount: 3420,
    rating: 4.8,
  },
  html: {
    trackLabel: "HTML",
    title: "HTML Fundamentals",
    description: "Build the structure of the web, one element at a time",
    lessonsCount: 18,
    studentsCount: 2810,
    rating: 4.6,
  },
  css: {
    trackLabel: "CSS",
    title: "CSS Styling",
    description: "Design responsive, beautiful interfaces from scratch",
    lessonsCount: 20,
    studentsCount: 2410,
    rating: 4.7,
  },
  javascript: {
    trackLabel: "JAVASCRIPT",
    title: "JavaScript Essentials",
    description: "Bring your pages to life with interactivity and logic",
    lessonsCount: 26,
    studentsCount: 3980,
    rating: 4.7,
  },
  python: {
    trackLabel: "PYTHON",
    title: "Python Programming",
    description: "From syntax basics to real-world automation and data",
    lessonsCount: 22,
    studentsCount: 4100,
    rating: 4.8,
  },
};

export const inProgressLessons: ProgressLessonCard[] = [
  {
    id: "java-lessons-1",
    title: "Java Lessons",
    image: "/images/documentation/java-lessons.png",
    badge: "កំពុងសិក្សា",
    lessonsCompleted: 21,
    lessonsTotal: 25,
    percent: 84,
    ctaLabel: "បន្តការសិក្សា",
    href: "/documentation/lessons/java-variables",
  },
  {
    id: "java-lessons-2",
    title: "Java Lessons",
    image: "/images/documentation/java-lessons.png",
    badge: "កំពុងសិក្សា",
    lessonsCompleted: 21,
    lessonsTotal: 25,
    percent: 84,
    ctaLabel: "បន្តការសិក្សា",
    href: "/documentation/lessons/java-variables",
  },
  {
    id: "java-lessons-3",
    title: "Java Lessons",
    image: "/images/documentation/java-lessons.png",
    badge: "កំពុងសិក្សា",
    lessonsCompleted: 21,
    lessonsTotal: 25,
    percent: 84,
    ctaLabel: "បន្តការសិក្សា",
    href: "/documentation/lessons/java-variables",
  },
];
export const currentProgress: CourseProgress = {
  courseTitle: "Java Programming",
  lessonLabel: "មេរៀនទី ៦ លើ ១៥",
  percent: 40,
  href: "/documentation/lessons/java-variables",
};
export const javaLessons: LessonCatalogItem[] = [
  {
    id: "intro-to-java",
    category: "JAVA",
    title: "Introduction to Java",
    image: "/images/documentation/lessons/intro-to-java.png",
    level: "Beginner",
    lessonsCount: 18,
    hours: 9,
    rating: 4.7,
    students: 2180,
    progressPercent: 40,
    href: "/documentation/java/lessons/introduction",
  },
  {
    id: "data-structures",
    category: "JAVA",
    title: "Data Structures",
    image: "/images/documentation/lessons/data-structures.png",
    level: "Intermediate",
    lessonsCount: 18,
    hours: 9,
    rating: 4.7,
    students: 2180,
    progressPercent: 40,
    href: "/documentation/java/lessons/data-structures",
  },
  {
    id: "method",
    category: "JAVA",
    title: "Method",
    image: "/images/documentation/lessons/method.png",
    level: "Beginner",
    lessonsCount: 16,
    hours: 8,
    rating: 4.6,
    students: 4100,
    progressPercent: 100,
    completed: true,
    href: "/documentation/java/lessons/method",
  },
  {
    id: "oop",
    category: "JAVA",
    title: "Object Oriented Programming",
    image: "/images/documentation/lessons/oop.png",
    level: "Advanced",
    lessonsCount: 14,
    hours: 7,
    rating: 4.8,
    students: 1800,
    locked: true,
    href: "/documentation/java/lessons/oop",
  },
];

export const javaProjects: ProjectCatalogItem[] = [
  {
    id: "project-01",
    category: "JAVA",
    title: "Project 01",
    image: "/images/documentation/projects/project-01.png",
    level: "Intermediate",
    duration: "៥ ម៉ោង",
    rating: 4.7,
    students: 2180,
    progressPercent: 40,
    href: "/documentation/java/projects/01",
  },
  {
    id: "project-02",
    category: "JAVA",
    title: "Project 02",
    image: "/images/documentation/projects/project-02.png",
    level: "Intermediate",
    duration: "៦ ម៉ោង",
    rating: 4.7,
    students: 2180,
    progressPercent: 40,
    href: "/documentation/java/projects/02",
  },
  {
    id: "project-03",
    category: "JAVA",
    title: "Project 03",
    image: "/images/documentation/projects/project-03.png",
    level: "Beginner",
    duration: "៤ ម៉ោង",
    rating: 4.6,
    students: 4100,
    progressPercent: 100,
    completed: true,
    href: "/documentation/java/projects/03",
  },
  {
    id: "project-04",
    category: "JAVA",
    title: "Project 04",
    image: "/images/documentation/projects/project-04.png",
    level: "Advanced",
    duration: "៧ ម៉ោង",
    rating: 4.8,
    students: 1600,
    locked: true,
    href: "/documentation/java/projects/04",
  },
];

export const overallProgress: OverallProgressData = {
  headline: "Overall Progress",
  subheadline: "Keep up the great work! You are ahead of 85% of students.",
  overallPercent: 68,
  subjects: [
    { label: "Java", percent: 68, barColorClass: "bg-amber-400" },
    { label: "CSS", percent: 40, barColorClass: "bg-amber-400" },
    { label: "HTML", percent: 100, barColorClass: "bg-emerald-500" },
  ],
};

export const techOptions: TechOption[] = [
  { id: "python", label: "Python", icon: "/icons/python.svg" },
  { id: "javascript", label: "JavaScript", icon: "/icons/javascript.svg" },
  { id: "java", label: "Java", icon: "/icons/java.svg" },
  { id: "css", label: "CSS", icon: "/icons/css.svg" },
  { id: "html", label: "HTML", icon: "/icons/html.svg" },
];

export const courses: Course[] = [
  {
    id: "html-lessons",
    title: "HTML Lessons",
    titleKm: "មេរៀន HTML",
    description:
      "HTML (Markup Language) ជាភាសាមូលដ្ឋានសម្រាប់សាងសង់រចនាសម្ព័ន្ធគេហទំព័រ តាមរយៈ Elements, Tags និង Attributes។",
    tag: "HTML",
    href: "/documentation/lessons/html-elements",
    coverImage: "/images/html.png",
    ctaLabel: "រៀនឥឡូវ",
  },
  {
    id: "css",
    title: "CSS",
    titleKm: "CSS",
    description:
      "CSS ជួយឱ្យទំព័ររបស់អ្នកមានភាពស្រស់ស្អាត តាមរយៈ Colors, Layouts, Animations និង Responsive Design។",
    tag: "CSS",
    href: "/documentation/lessons/css-selectors",
    coverImage: "/images/html.png",
    ctaLabel: "រៀនឥឡូវ",
  },
  {
    id: "javascript",
    title: "JavaScript",
    titleKm: "JavaScript",
    description:
      "រៀនភាសាសរសេរកម្មវិធីលើគេហទំព័រ JavaScript ដើម្បីបង្កើត Interaction និងមុខងារឆ្លាតវៃ។",
    tag: "JavaScript",
    href: "/documentation/lessons/js-variables",
    coverImage: "/images/html.png",
    ctaLabel: "រៀនឥឡូវ",
  },
  {
    id: "java-programming",
    title: "Java Programming",
    titleKm: "Java Programming",
    description:
      "រៀនពីមូលដ្ឋាននៃ Java Programming និង OOP សម្រាប់បង្កើតកម្មវិធីលើ Web, Mobile និង Desktop ព្រមទាំង Syntax ជាមូលដ្ឋាន។",
    tag: "Java",
    href: "/documentation/lessons/java-variables",
    coverImage: "/images/html.png",
    ctaLabel: "រៀនបន្ត",
  },
  {
    id: "python-programming",
    title: "Python Programming",
    titleKm: "Python Programming",
    description: "រៀនមូលដ្ឋានគ្រឹះនៃ Python ចាប់ពី Syntax រហូតដល់ Automation ។",
    tag: "Python",
    href: "/documentation/lessons/python-variables",
    coverImage: "/images/html.png",
    ctaLabel: "រៀនឥឡូវ",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Essentials",
    titleKm: "UI/UX Design Essentials",
    description:
      "រៀនពីគោលការណ៍ជាមូលដ្ឋាននៃ UI/UX ដូចជា Wireframe, Prototype និងគោលការណ៍រចនា UI ដ៏ល្អ។",
    tag: "CSS",
    href: "/documentation/lessons/css-selectors",
    coverImage: "/images/html.png",
    ctaLabel: "រៀនឥឡូវ",
  },
];

export const forumPosts: ForumPost[] = [
  {
    id: "react-hooks",
    type: "post",
    author: "អ្នកប្រើប្រាស់",
    timeAgo: "៤៥ នាទ",
    title: "របៀបគ្រប់គ្រង State ក្នុង React Hooks",
    excerpt: "ស្វែងយល់ useState, useEffect និង useContext ក្នុងការអភិវឌ្ឍ UI ស្មុគស្មាញ",
    href: "/playground/react-hooks",
  },
  {
    id: "sql-query",
    type: "sql",
    author: "SQL",
    timeAgo: "៦០ នាទ",
    title: "តើធ្វើដូចម្តេចដើម្បីសរសេរ SQL Query ស្មុគ្រស្មាញ?",
    excerpt: "SELECT, JOIN, GROUP BY និងបច្ចេកទេសសំខាន់ៗសម្រាប់គ្រប់គ្រង Database។",
    href: "/playground/sql-query",
  },
];

export const promoBanner: PromoBannerData = {
  badge: "POPULAR COURSE",
  title: "Python for Data Science",
  description:
    "រៀនប្រើប្រាស់ Python សម្រាប់វិភាគទិន្នន័យ ការធ្វើគំរូ និងការសិក្សាផ្នែក Data Science ជាមួយឧបករណ៍ពិតៗ។",
  ctaLabel: "ចុះឈ្មោះ",
  href: "/documentation/python-for-data-science",
  image: "/images/promo/python-data-science.png",
};
export const docsNavItems: SidebarNavItem[] = [
  { id: "home", label: "ទំព័រដើម", href: "/documentation/dashboard", icon: "home" },
  { id: "courses", label: "វគ្គសិក្សា", href: "/documentation/java", icon: "book" },
  { id: "resources", label: "Resources", href: "/documentation/resources", icon: "folder" },
  { id: "bookmark", label: "Bookmark", href: "/documentation/bookmark", icon: "bookmark" },
  { id: "help", label: "Help Center", href: "/documentation/help", icon: "help" },
];