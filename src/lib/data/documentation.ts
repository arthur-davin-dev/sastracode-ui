import {
  ContinueLearningCard,
  CourseTocGroup,
  DocsNavItem,
  LessonDocument,
  SavedLessonCard,
  SearchResultItem,
  LogoItem,
} from "@/types/documentation";

export const docsNavItems: DocsNavItem[] = [
  { id: "home", label: "ទំព័រដើម", href: "/documentation/dashboard", icon: "home" },
  { id: "courses", label: "វគ្គសិក្សា", href: "/documentation/java", icon: "book" },
  { id: "resources", label: "Resources", href: "/documentation/resources", icon: "folder" },
  { id: "bookmark", label: "Bookmark", href: "/documentation/bookmark", icon: "bookmark" },
  { id: "help", label: "Help Center", href: "/documentation/help", icon: "help" },
];

export const outerLogos: LogoItem[] = [
  { 
    name: "HTML", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", 
    positionClass: "top-[-28px] left-1/2 -translate-x-1/2",
    slug: "html-elements"
  },
  { 
    name: "JS", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
    positionClass: "top-1/2 right-[-28px] -translate-y-1/2",
    slug: "javascript-basics" 
  },
  { 
    name: "Python", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
    positionClass: "bottom-[-28px] left-[20%]",
    slug: "python-intro" 
  },
];

export const innerLogos: LogoItem[] = [
  { 
    name: "Java", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
    positionClass: "top-[10%] left-[-28px]",
    slug: "java-oop" 
  },
  { 
    name: "CSS", 
    imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", 
    positionClass: "bottom-[-20px] right-[10%]",
    slug: "css-flexbox" 
  },
];

export const javaTocGroups: CourseTocGroup[] = [
  {
    id: "basics",
    label: "ការណែនាំអំពី Java",
    level: "Beginner",
    items: [
      { id: "syntax-basics", label: "Java Syntax Basics", href: "/documentation/java/lessons/syntax-basics" },
      { id: "variables", label: "Variables & Data Types", href: "/documentation/java/lessons/variables" },
      { id: "operators", label: "Operators", href: "/documentation/java/lessons/operators" },
      { id: "control-flow", label: "Control Flow", href: "/documentation/java/lessons/control-flow" },
      { id: "methods", label: "Methods", href: "/documentation/java/lessons/methods" },
      { id: "arrays", label: "Arrays", href: "/documentation/java/lessons/arrays" },
      { id: "basic-projects", label: "Basic Practice Projects", href: "/documentation/java/lessons/basic-projects" },
    ],
  },
  {
    id: "intermediate",
    label: "កម្រិតមធ្យម",
    level: "Intermediate",
    items: [
      { id: "oop", label: "Object-Oriented Programming", href: "/documentation/java/lessons/oop" },
      { id: "encapsulation", label: "Encapsulation", href: "/documentation/java/lessons/encapsulation" },
      { id: "inheritance", label: "Inheritance", href: "/documentation/java/lessons/inheritance" },
      { id: "polymorphism", label: "Polymorphism", href: "/documentation/java/lessons/polymorphism" },
      { id: "abstraction", label: "Abstraction", href: "/documentation/java/lessons/abstraction" },
      { id: "exceptions", label: "Exception Handling", href: "/documentation/java/lessons/exceptions" },
    ],
  },
  {
    id: "advanced",
    label: "កម្រិតខ្ពស់",
    level: "Advanced",
    items: [
      { id: "advanced-oop", label: "Advanced OOP Concepts", href: "/documentation/java/lessons/advanced-oop", locked: true },
      { id: "collections", label: "Advanced Collections", href: "/documentation/java/lessons/collections", locked: true },
      { id: "multithreading", label: "Multithreading & Concurrency", href: "/documentation/java/lessons/multithreading", locked: true },
      { id: "jdbc", label: "Database Programming (JDBC)", href: "/documentation/java/lessons/jdbc", locked: true },
      { id: "networking", label: "Java Networking", href: "/documentation/java/lessons/networking", locked: true },
      { id: "advanced-java", label: "Advanced Java Features", href: "/documentation/java/lessons/advanced-java", locked: true },
      { id: "design-patterns", label: "Design Patterns", href: "/documentation/java/lessons/design-patterns", locked: true },
      { id: "advanced-projects", label: "Advanced Projects", href: "/documentation/java/lessons/advanced-projects", locked: true },
    ],
  },
];

export const variablesLessonDoc: LessonDocument = {
  id: "variables",
  trackSlug: "java",
  trackLabel: "JAVA",
  category: "កម្រិត៖ មូលដ្ឋានគ្រឹះ",
  title: "Variables & Data Types",
  breadcrumb: ["ការណែនាំអំពី Java", "Java Syntax Basics", "Variables & Data Types"],
  lessonIndexLabel: "មេរៀនទី ៣ • អាន ប្រហែល 12 នាទី",
  readingTimeLabel: "ចំណាយពេលអាន ៨ នាទី",
  percentComplete: 28,
  level: "Beginner",
  levelReadingTimeLabel: "កម្រិត៖ មូលដ្ឋាន • ៧៨%",
  objectives: [
    "យល់ដឹងអំពី Primitive Data Types ក្នុង Java",
    "ប្រកាស និងកំណត់តម្លៃឱ្យអថេរ",
    "ប្រើប្រាស់ Type Casting និងការបំប្លែងទិន្នន័យ",
    "បែងចែកភាពខុសគ្នារវាង value vs reference types",
  ],
  intro:
    "សិក្សាពីរបៀបដែល Java រក្សាទុក និងគ្រប់គ្រងទិន្នន័យ ដោយអថេរដែលមានប្រភេទច្បាស់លាស់ (Typed Variables), ប្រភេទទិន្នន័យមូលដ្ឋាន (Primitive Data Types) និងឯកសារយោងទៅកាន់វត្ថុ (Object References)។",
  summary:
    "Java គឺជាភាសាសរសេរកម្មវិធីដែលមានប្រភេទទិន្នន័យថេរ (Statically Typed Language) មានន័យថា អថេរនីមួយៗត្រូវតែប្រកាសជាមួយប្រភេទទិន្នន័យ (Data Type) ជាមុន។ ប្រភេទទិន្នន័យនេះប្រាប់ Java ថាត្រូវបម្រុងទុកទំហំអង្គចងចាំ (Memory) ប៉ុន្មាន និងប្រតិបត្តិការណាខ្លះអាចអនុវត្តលើអថេរនោះបាន។",
  infoCards: [
    {
      id: "primitives",
      icon: "primitives",
      title: "Primitives",
      body: "int, double, boolean, char, byte, short, long និង float ជា Primitive Data Types ក្នុង Java។",
    },
    {
      id: "references",
      icon: "references",
      title: "References",
      body: "String, Array និង Class ត្រូវបានរក្សាទុកជាអាសយដ្ឋានអង្គចងចាំ (Memory Addresses)។",
    },
    {
      id: "casting",
      icon: "casting",
      title: "Type Casting",
      body: "ការបំប្លែងប្រភេទទិន្នន័យ Widening (មានសុវត្ថិភាព) និង Narrowing។",
    },
  ],
  codeFilename: "Main.java",
  code: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
        String stuName = "Alex";
        int age = 20;
        double gpa = 3.75;
        boolean isStudent = true;

        System.out.println("Name: " + stuName);
        System.out.println("Age: " + age);
        System.out.println("GPA: " + gpa);
        System.out.println("Student: " + isStudent);
    }
}`,
  tips: [
    {
      id: "naming",
      variant: "info",
      title: "ការកំណត់ឈ្មោះអថេរ",
      body: "ប្រើ camelCase សម្រាប់ដាក់ឈ្មោះអថេរក្នុង Java ឧទាហរណ៍៖ myVariableName។ ចំណែកឈ្មោះ Class គួរប្រើ PascalCase។",
    },
    {
      id: "specific-types",
      variant: "success",
      title: "Prefer Specific Types",
      body: "ជ្រើសរើសប្រភេទទិន្នន័យដែលសមស្របបំផុតសម្រាប់ទិន្នន័យរបស់អ្នក។ ឧទាហរណ៍ ប្រសិនបើមានទំហំតូច គួរប្រើ int ជំនួស long ដើម្បីជួយឱ្យកម្មវិធីដំណើរការបានកាន់តែមានប្រសិទ្ធភាព។",
    },
    {
      id: "overflow",
      variant: "warning",
      title: "Integer Overflow",
      body: "ប្រភេទ int អាចផ្ទុកបានតម្លៃពី -2,147,483,648 ដល់ 2,147,483,647 ប៉ុណ្ណោះ។ ប្រសិនបើលើសពីដែនកំណត់នេះ វានឹងវិលត្រឡប់ (Wrap Around) ទៅតម្លៃផ្សេង។ ប្រសិនបើត្រូវការតម្លៃលេខធំជាងនេះ គួរប្រើ long។",
    },
    {
      id: "string-object",
      variant: "danger",
      title: "String is an Object",
      body: "នៅពេលប្រៀបធៀបអត្ថបទ គួរប្រើ .equals() ជំនួស == ព្រោះ .equals() ប្រៀបធៀបខ្លឹមសាររបស់ String ខណៈ == ប្រៀបធៀប Reference ទៅកាន់ Object។",
    },
  ],
  instructor: {
    name: "Vibol Meas",
    studentsLabel: "999 អ្នកសិក្សា",
    videoTitle: "ការប្រើប្រាស់ Variable ក្នុង Java",
    videoSubtitle: "សិក្សាអំពី for និង while loops សម្រាប់គ្រប់គ្រងលំហូរទិន្នន័យ",
  },
  quiz: {
    question: "Keyword មួយណាត្រូវបានប្រើសម្រាប់ប្រកាសអថេរប្រភេទចំនួនគត់ (Integer Variable) ក្នុង Java?",
    index: 1,
    total: 5,
    timeLimitLabel: "៣ នាទី",
    levelLabel: "Beginner",
    options: [
      { id: "float", label: "float" },
      { id: "int", label: "int" },
      { id: "Integer", label: "Integer" },
      { id: "num", label: "num" },
    ],
    correctOptionId: "int",
  },
  pageAnchors: [
    { id: "what-is-java", label: "Java ជាអ្វី?" },
    { id: "history", label: "ប្រវត្តិរបស់ Java" },
    { id: "capabilities", label: "Java អាចធ្វើអ្វីខ្លះ?" },
    { id: "why-java", label: "ហេតុអ្វីត្រូវរៀន Java?", active: true },
    { id: "install", label: "របៀបដំឡើង Java" },
    { id: "ide", label: "កម្មវិធីសរសេរ Java (IDE)" },
    { id: "how-it-runs", label: "របៀបដំណើរការ Java" },
  ],
  prevLesson: { label: "ត្រឡប់ក្រោយ", href: "/documentation/java/lessons/syntax-basics" },
  nextLesson: {
    label: "មេរៀនបន្ទាប់",
    href: "/documentation/java/lessons/operators",
    level: "Data Types",
    meta: "មូលដ្ឋាន • អាន ៥ នាទី",
  },
};

export const searchResults: SearchResultItem[] = Array.from({ length: 4 }).map((_, index) => ({
  id: `variables-data-types-${index}`,
  category: "Java",
  title: "អថេរ (Variables) និងប្រភេទទិន្នន័យ (Data Types) ក្នុង Java",
  description:
    "សិក្សាពីរបៀបដែល Java រក្សាទុក និងគ្រប់គ្រងទិន្នន័យដោយអថេរ (Variables) និងប្រភេទទិន្នន័យ (Data Types) ដូចជា String, int, double, boolean និង Object នៅក្នុងបរិយាកាស Java 17+។",
  level: "Beginner",
  ctaLabel: "កម្រិតមូលដ្ឋាន",
}));

export const continueLearningCards: ContinueLearningCard[] = [
  {
    id: "java-lessons-1",
    category: "WEB FOUNDATION",
    title: "ការណែនាំអំពី HTML",
    image: "/images/documentation/java-lessons.png",
    progressPercent: 100,
    href: "/documentation/html/lessons/intro",
  },
  {
    id: "java-lessons-2",
    category: "ជំនាញ CSS",
    title: "CSS Grid Layout",
    image: "/images/documentation/java-lessons.png",
    progressPercent: 40,
    href: "/documentation/css/lessons/grid-layout",
  },
  {
    id: "java-lessons-3",
    category: "ALGORITHMS",
    title: "Data Structures 101",
    image: "/images/documentation/java-lessons.png",
    progressPercent: 40,
    href: "/documentation/java/lessons/data-structures",
  },
];

export const savedLessons: SavedLessonCard[] = [
  {
    id: "web-security",
    category: "CYBERSECURITY",
    title: "Web Security Basics",
    readingTimeLabel: "45 mins reading",
    href: "/documentation/security/lessons/basics",
  },
  {
    id: "api-design",
    category: "BACK-END DEV",
    title: "API Design Principles",
    readingTimeLabel: "1.2 hours reading",
    href: "/documentation/backend/lessons/api-design",
  },
  {
    id: "typography",
    category: "UX/UI DESIGN",
    title: "Typography in UI",
    readingTimeLabel: "30 mins reading",
    href: "/documentation/design/lessons/typography",
  },
];
