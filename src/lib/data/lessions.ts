import { CourseTocGroup, LessonDocument } from "@/types/documentation";
import { TrackSlug } from "@/types/course";

/**
 * Every lesson lives here, keyed by its id.
 * The route /documentation/lessons/[lessonId] looks up its data
 * from this map — so lessonId in the URL must match a key here.
 */

const TRACK_LABELS: Record<TrackSlug, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JAVASCRIPT",
  java: "JAVA",
  python: "PYTHON",
};

function lessonHref(id: string) {
  return `/documentation/lessons/${id}`;
}

// ---------- Flagship lessons (one full lesson per track) ----------

const htmlElements: LessonDocument = {
  id: "html-elements",
  trackSlug: "html",
  trackLabel: "HTML",
  category: "កម្រិត៖ មូលដ្ឋានគ្រឹះ",
  title: "HTML Elements & Tags",
  breadcrumb: ["ការណែនាំអំពី HTML", "HTML Syntax Basics", "HTML Elements & Tags"],
  lessonIndexLabel: "មេរៀនទី ១ • អាន ប្រហែល ១០ នាទី",
  readingTimeLabel: "ចំណាយពេលអាន ៦ នាទី",
  percentComplete: 10,
  level: "Beginner",
  levelReadingTimeLabel: "កម្រិត៖ មូលដ្ឋាន • ៦៥%",
  objectives: [
    "យល់ដឹងអំពី Elements, Tags និង Attributes",
    "ដឹងពីរបៀបសាងសង់រចនាសម្ព័ន្ធទំព័រដោយ HTML",
    "ប្រើ Tags ដូចជា <div>, <p>, <a> ឱ្យបានត្រឹមត្រូវ",
    "យល់ពីភាពខុសគ្នារវាង Block និង Inline Elements",
  ],
  intro:
    "HTML (HyperText Markup Language) ជាភាសាមូលដ្ឋានសម្រាប់សាងសង់រចនាសម្ព័ន្ធគេហទំព័រ តាមរយៈ Elements, Tags និង Attributes។",
  summary:
    "រាល់ទំព័របណ្ដាញសុទ្ធតែត្រូវបានសាងសង់ឡើងពី HTML Elements។ Element មួយមាន Opening Tag, Content និង Closing Tag ដែលប្រាប់ Browser ថាតើមាតិកានោះជាអ្វី (ចំណងជើង, កថាខណ្ឌ, រូបភាព។ល។)។",
  infoCards: [
    { id: "elements", icon: "primitives", title: "Elements", body: "<h1>, <p>, <img> គឺជា Element មូលដ្ឋានសម្រាប់បង្កើតមាតិកា។" },
    { id: "attributes", icon: "references", title: "Attributes", body: "ផ្តល់ព័ត៌មានបន្ថែមទៅ Element ដូចជា href, src, class។" },
    { id: "nesting", icon: "casting", title: "Nesting", body: "Element អាចដាក់នៅក្នុង Element ផ្សេងទៀត ដើម្បីបង្កើតរចនាសម្ព័ន្ធ។" },
  ],
  codeFilename: "index.html",
  code: `<!DOCTYPE html>
<html lang="km">
  <head>
    <title>ទំព័រដំបូង</title>
  </head>
  <body>
    <h1>សួស្តី HTML</h1>
    <p>នេះជាកថាខណ្ឌដំបូងរបស់ខ្ញុំ។</p>
    <a href="https://example.com">ចុចទីនេះ</a>
  </body>
</html>`,
  tips: [
    { id: "semantic", variant: "info", title: "ប្រើ Tags ត្រឹមត្រូវតាមអត្ថន័យ", body: "ប្រើ <header>, <main>, <footer> ជំនួស <div> គ្រប់ទីកន្លែង ដើម្បីឱ្យកូដងាយអាន និងល្អសម្រាប់ SEO។" },
    { id: "close-tags", variant: "success", title: "បិទ Tag ជានិច្ច", body: "Tag ភាគច្រើនត្រូវការ Closing Tag ដូចជា </p> លើកលែងតែ Tag ដូចជា <img>, <br> ដែលមិនមានមាតិកា។" },
    { id: "attributes-quotes", variant: "warning", title: "ដាក់សម្រង់លើ Attribute", body: "តម្លៃ Attribute គួរតែស្ថិតក្នុងសម្រង់ដូចជា href=\"...\" ដើម្បីជៀសវាងកំហុស។" },
    { id: "nesting-order", variant: "danger", title: "កុំបិទ Tag ខុសលំដាប់", body: "Tag ត្រូវបិទតាមលំដាប់បើក ឧទាហរណ៍ <b><i>text</i></b> មិនមែន <b><i>text</b></i>។" },
  ],
  instructor: {
    name: "Vibol Meas",
    studentsLabel: "១២៥០ អ្នកសិក្សា",
    videoTitle: "ការសាងសង់ទំព័រដំបូងដោយ HTML",
    videoSubtitle: "សិក្សាអំពី Tags និង Attributes គ្រឹះ",
  },
  quiz: {
    question: "Tag មួយណាត្រូវបានប្រើសម្រាប់បង្កើត Link ទៅកាន់ទំព័រផ្សេង?",
    index: 1,
    total: 5,
    timeLimitLabel: "៣ នាទី",
    levelLabel: "Beginner",
    options: [
      { id: "div", label: "<div>" },
      { id: "a", label: "<a>" },
      { id: "p", label: "<p>" },
      { id: "span", label: "<span>" },
    ],
    correctOptionId: "a",
  },
  pageAnchors: [
    { id: "what-is-html", label: "HTML ជាអ្វី?" },
    { id: "history", label: "ប្រវត្តិរបស់ HTML" },
    { id: "tags", label: "Tags សំខាន់ៗ", active: true },
    { id: "attributes", label: "Attributes" },
    { id: "structure", label: "រចនាសម្ព័ន្ធទំព័រ" },
  ],
  nextLesson: { label: "មេរៀនបន្ទាប់", href: lessonHref("html-forms"), level: "Forms & Inputs", meta: "មូលដ្ឋាន • អាន ៧ នាទី" },
};

const cssSelectors: LessonDocument = {
  id: "css-selectors",
  trackSlug: "css",
  trackLabel: "CSS",
  category: "កម្រិត៖ មូលដ្ឋានគ្រឹះ",
  title: "CSS Selectors & Box Model",
  breadcrumb: ["ការណែនាំអំពី CSS", "CSS Syntax Basics", "CSS Selectors & Box Model"],
  lessonIndexLabel: "មេរៀនទី ១ • អាន ប្រហែល ១៤ នាទី",
  readingTimeLabel: "ចំណាយពេលអាន ៨ នាទី",
  percentComplete: 15,
  level: "Beginner",
  levelReadingTimeLabel: "កម្រិត៖ មូលដ្ឋាន • ៦០%",
  objectives: [
    "យល់ដឹងអំពី Selectors (element, class, id)",
    "ស្គាល់ Box Model (margin, border, padding, content)",
    "ប្រើ Properties ដូចជា color, background, display",
    "គ្រប់គ្រង Layout ដោយ Flexbox ជាមូលដ្ឋាន",
  ],
  intro:
    "CSS ជួយឱ្យទំព័ររបស់អ្នកមានភាពស្រស់ស្អាត តាមរយៈ Colors, Layouts, Animations និង Responsive Design។",
  summary:
    "CSS ជ្រើសរើស Element ដោយប្រើ Selector ហើយកំណត់រចនាបថតាមរយៈ Properties។ គ្រប់ Element សុទ្ធតែជា Box មួយដែលមាន Content, Padding, Border និង Margin ហៅថា Box Model។",
  infoCards: [
    { id: "selectors", icon: "primitives", title: "Selectors", body: "element, .class, #id ជាវិធីជ្រើសរើស Element ដើម្បីរចនាបថ។" },
    { id: "box-model", icon: "references", title: "Box Model", body: "Content, Padding, Border, Margin បង្កើតជាទំហំសរុបរបស់ Element។" },
    { id: "specificity", icon: "casting", title: "Specificity", body: "Rule ណាមានលក្ខណៈជាក់លាក់ជាង នឹងឈ្នះក្នុងករណីប៉ះទង្គិចគ្នា។" },
  ],
  codeFilename: "style.css",
  code: `.card {
  padding: 16px;
  border-radius: 16px;
  background: #002455;
  color: white;
}

.card:hover {
  opacity: 0.9;
}`,
  tips: [
    { id: "class-over-id", variant: "info", title: "ប្រើ Class ច្រើនជាង Id", body: "Class អាចប្រើម្តងទៀតបានច្រើនកន្លែង ចំណែក Id ត្រូវប្រើតែម្តងក្នុងទំព័រមួយ។" },
    { id: "box-sizing", variant: "success", title: "កំណត់ box-sizing: border-box", body: "ជួយឱ្យ padding និង border មិនធ្វើឱ្យទំហំសរុបរបស់ Element ធំហួសពីការគ្រោងទុក។" },
    { id: "specificity-warning", variant: "warning", title: "ប្រយ័ត្ន Specificity ខ្ពស់ពេក", body: "ការប្រើ !important ច្រើនពេក នឹងធ្វើឱ្យកូដលំបាកថែទាំក្រោយមក។" },
    { id: "units", variant: "danger", title: "ជ្រើសរើស Unit ត្រឹមត្រូវ", body: "ប្រើ rem/em សម្រាប់ Typography ដែលអាចប្តូរទំហំបាន ជាជាង px ថេរ។" },
  ],
  instructor: {
    name: "Sreymom Chan",
    studentsLabel: "៩៨០ អ្នកសិក្សា",
    videoTitle: "ការប្រើ Flexbox ដើម្បីរៀបចំ Layout",
    videoSubtitle: "សិក្សាអំពី Box Model និង Flexbox ជាមូលដ្ឋាន",
  },
  quiz: {
    question: "Selector មួយណាប្រើសម្រាប់ជ្រើសរើស Element ដោយ Class?",
    index: 1,
    total: 5,
    timeLimitLabel: "៣ នាទី",
    levelLabel: "Beginner",
    options: [
      { id: "hash", label: "#name" },
      { id: "dot", label: ".name" },
      { id: "at", label: "@name" },
      { id: "amp", label: "&name" },
    ],
    correctOptionId: "dot",
  },
  pageAnchors: [
    { id: "what-is-css", label: "CSS ជាអ្វី?" },
    { id: "selectors", label: "Selectors", active: true },
    { id: "box-model", label: "Box Model" },
    { id: "flexbox", label: "Flexbox មូលដ្ឋាន" },
  ],
  nextLesson: { label: "មេរៀនបន្ទាប់", href: lessonHref("css-layout"), level: "Layout & Flexbox", meta: "មូលដ្ឋាន • អាន ៩ នាទី" },
};

const jsVariables: LessonDocument = {
  id: "js-variables",
  trackSlug: "javascript",
  trackLabel: "JAVASCRIPT",
  category: "កម្រិត៖ មូលដ្ឋានគ្រឹះ",
  title: "Variables, let/const & Data Types",
  breadcrumb: ["ការណែនាំអំពី JavaScript", "JavaScript Syntax Basics", "Variables & Data Types"],
  lessonIndexLabel: "មេរៀនទី ១ • អាន ប្រហែល ១១ នាទី",
  readingTimeLabel: "ចំណាយពេលអាន ៧ នាទី",
  percentComplete: 20,
  level: "Beginner",
  levelReadingTimeLabel: "កម្រិត៖ មូលដ្ឋាន • ៧០%",
  objectives: [
    "ដឹងពីភាពខុសគ្នារវាង let, const, var",
    "ស្គាល់ Data Types៖ String, Number, Boolean, Object, Array",
    "ប្រើ Template Literals សរសេរអត្ថបទ",
    "យល់ដឹងអំពី Dynamic Typing",
  ],
  intro:
    "រៀនភាសាសរសេរកម្មវិធីលើគេហទំព័រ JavaScript ដើម្បីបង្កើត Interaction និងមុខងារឆ្លាតវៃ។",
  summary:
    "JavaScript ជា Dynamically Typed Language មានន័យថាអថេរមិនចាំបាច់ប្រកាសប្រភេទទិន្នន័យជាមុនទេ។ ប្រើ let និង const ដើម្បីប្រកាសអថេរ ជំនួស var ចាស់។",
  infoCards: [
    { id: "let-const", icon: "primitives", title: "let vs const", body: "let អាចផ្លាស់ប្តូរតម្លៃបាន ចំណែក const ផ្លាស់ប្តូរតម្លៃឡើងវិញមិនបាន។" },
    { id: "types", icon: "references", title: "Data Types", body: "String, Number, Boolean, Object, Array, Null, Undefined។" },
    { id: "coercion", icon: "casting", title: "Type Coercion", body: "JavaScript អាចប្តូរប្រភេទទិន្នន័យដោយស្វ័យប្រវត្តិពេលប្រៀបធៀប ឬបូក។" },
  ],
  codeFilename: "app.js",
  code: `let age = 20;
const name = "Alex";
let gpa = 3.75;
let isStudent = true;

console.log(\`Name: \${name}\`);
console.log(\`Age: \${age}\`);
console.log(\`GPA: \${gpa}\`);
console.log(\`Student: \${isStudent}\`);`,
  tips: [
    { id: "prefer-const", variant: "info", title: "ប្រើ const ជាលំដាប់ដំបូង", body: "ប្រើ const ជានិច្ច លុះត្រាតែដឹងថាតម្លៃត្រូវផ្លាស់ប្តូរ ទើបប្តូរទៅ let។" },
    { id: "avoid-var", variant: "success", title: "ជៀសវាង var", body: "var មាន Scope ធំទូលាយពេក ងាយបង្កកំហុស។ ប្រើ let/const ជំនួសវិញ។" },
    { id: "strict-equal", variant: "warning", title: "ប្រើ === មិនមែន ==", body: "=== ប្រៀបធៀបទាំងតម្លៃ និងប្រភេទទិន្នន័យ ចៀសវាង Type Coercion ដែលមិនរំពឹងទុក។" },
    { id: "undefined-null", variant: "danger", title: "undefined vs null", body: "undefined មានន័យថាមិនទាន់កំណត់តម្លៃ ចំណែក null មានន័យថាចេតនាកំណត់ថាគ្មានតម្លៃ។" },
  ],
  instructor: {
    name: "Dara Sok",
    studentsLabel: "១៥៦០ អ្នកសិក្សា",
    videoTitle: "ការប្រកាសអថេរក្នុង JavaScript",
    videoSubtitle: "សិក្សាអំពី let, const និង Data Types",
  },
  quiz: {
    question: "Keyword មួយណាមិនអាចផ្លាស់ប្តូរតម្លៃឡើងវិញបានក្នុង JavaScript?",
    index: 1,
    total: 5,
    timeLimitLabel: "៣ នាទី",
    levelLabel: "Beginner",
    options: [
      { id: "var", label: "var" },
      { id: "let", label: "let" },
      { id: "const", label: "const" },
      { id: "function", label: "function" },
    ],
    correctOptionId: "const",
  },
  pageAnchors: [
    { id: "what-is-js", label: "JavaScript ជាអ្វី?" },
    { id: "let-const-var", label: "let, const, var", active: true },
    { id: "data-types", label: "Data Types" },
    { id: "coercion", label: "Type Coercion" },
  ],
  nextLesson: { label: "មេរៀនបន្ទាប់", href: lessonHref("js-functions"), level: "Functions & Scope", meta: "មូលដ្ឋាន • អាន ១០ នាទី" },
};

const pythonVariables: LessonDocument = {
  id: "python-variables",
  trackSlug: "python",
  trackLabel: "PYTHON",
  category: "កម្រិត៖ មូលដ្ឋានគ្រឹះ",
  title: "Variables & Data Types",
  breadcrumb: ["ការណែនាំអំពី Python", "Python Syntax Basics", "Variables & Data Types"],
  lessonIndexLabel: "មេរៀនទី ១ • អាន ប្រហែល ១០ នាទី",
  readingTimeLabel: "ចំណាយពេលអាន ៦ នាទី",
  percentComplete: 12,
  level: "Beginner",
  levelReadingTimeLabel: "កម្រិត៖ មូលដ្ឋាន • ៥៥%",
  objectives: [
    "ប្រកាសអថេរដោយមិនចាំបាច់ប្រកាសប្រភេទ",
    "ស្គាល់ Data Types៖ int, float, str, bool, list, dict",
    "ប្រើ f-strings ដើម្បីបង្កើតអត្ថបទ",
    "ស្គាល់ Dynamic Typing របស់ Python",
  ],
  intro: "រៀនមូលដ្ឋានគ្រឹះនៃ Python ចាប់ពី Syntax រហូតដល់ Automation។",
  summary:
    "Python ជា Dynamically Typed Language ដូច JavaScript ដែរ។ អថេរមួយអាចផ្ទុកតម្លៃប្រភេទណាមួយ ហើយ Python កំណត់ប្រភេទដោយស្វ័យប្រវត្តិតាមតម្លៃដែលបានផ្តល់ឱ្យ។",
  infoCards: [
    { id: "types", icon: "primitives", title: "Basic Types", body: "int, float, str, bool ជាប្រភេទទិន្នន័យមូលដ្ឋានក្នុង Python។" },
    { id: "collections", icon: "references", title: "Collections", body: "list, tuple, dict, set ប្រើសម្រាប់ផ្ទុកទិន្នន័យច្រើន។" },
    { id: "dynamic-typing", icon: "casting", title: "Dynamic Typing", body: "អថេរអាចផ្លាស់ប្តូរប្រភេទទិន្នន័យបានគ្រប់ពេល។" },
  ],
  codeFilename: "main.py",
  code: `name = "Alex"
age = 20
gpa = 3.75
is_student = True

print(f"Name: {name}")
print(f"Age: {age}")
print(f"GPA: {gpa}")
print(f"Student: {is_student}")`,
  tips: [
    { id: "naming", variant: "info", title: "ប្រើ snake_case", body: "ឈ្មោះអថេរក្នុង Python គួរប្រើ snake_case ដូចជា student_name។" },
    { id: "type-hints", variant: "success", title: "ប្រើ Type Hints", body: "អាចសរសេរ age: int = 20 ដើម្បីជួយអ្នកអានកូដឱ្យដឹងប្រភេទទិន្នន័យរំពឹងទុក។" },
    { id: "mutable", variant: "warning", title: "list ជា Mutable", body: "list អាចផ្លាស់ប្តូរតម្លៃខាងក្នុងបាន ចំណែក tuple មិនអាចទេ។" },
    { id: "indentation", variant: "danger", title: "ប្រយ័ត្ន Indentation", body: "Python ប្រើ Indentation កំណត់ Block នៃកូដ ខុសពីភាសាផ្សេងទៀតដែលប្រើ {}។" },
  ],
  instructor: {
    name: "Sopheak Ly",
    studentsLabel: "២១០០ អ្នកសិក្សា",
    videoTitle: "ការប្រកាសអថេរក្នុង Python",
    videoSubtitle: "សិក្សាអំពី Data Types និង Dynamic Typing",
  },
  quiz: {
    question: "Data Type មួយណាមិនអាចផ្លាស់ប្តូរតម្លៃខាងក្នុងបាន (Immutable) ក្នុង Python?",
    index: 1,
    total: 5,
    timeLimitLabel: "៣ នាទី",
    levelLabel: "Beginner",
    options: [
      { id: "list", label: "list" },
      { id: "dict", label: "dict" },
      { id: "tuple", label: "tuple" },
      { id: "set", label: "set" },
    ],
    correctOptionId: "tuple",
  },
  pageAnchors: [
    { id: "what-is-python", label: "Python ជាអ្វី?" },
    { id: "variables", label: "Variables", active: true },
    { id: "data-types", label: "Data Types" },
    { id: "collections", label: "Collections" },
  ],
  nextLesson: { label: "មេរៀនបន្ទាប់", href: lessonHref("python-control-flow"), level: "Control Flow", meta: "មូលដ្ឋាន • អាន ៨ នាទី" },
};

const javaVariables: LessonDocument = {
  id: "java-variables",
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
    { id: "primitives", icon: "primitives", title: "Primitives", body: "int, double, boolean, char, byte, short, long និង float ជា Primitive Data Types ក្នុង Java។" },
    { id: "references", icon: "references", title: "References", body: "String, Array និង Class ត្រូវបានរក្សាទុកជាអាសយដ្ឋានអង្គចងចាំ (Memory Addresses)។" },
    { id: "casting", icon: "casting", title: "Type Casting", body: "ការបំប្លែងប្រភេទទិន្នន័យ Widening (មានសុវត្ថិភាព) និង Narrowing។" },
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
    { id: "naming", variant: "info", title: "ការកំណត់ឈ្មោះអថេរ", body: "ប្រើ camelCase សម្រាប់ដាក់ឈ្មោះអថេរក្នុង Java ឧទាហរណ៍៖ myVariableName។ ចំណែកឈ្មោះ Class គួរប្រើ PascalCase។" },
    { id: "specific-types", variant: "success", title: "Prefer Specific Types", body: "ជ្រើសរើសប្រភេទទិន្នន័យដែលសមស្របបំផុតសម្រាប់ទិន្នន័យរបស់អ្នក។ ឧទាហរណ៍ ប្រសិនបើមានទំហំតូច គួរប្រើ int ជំនួស long ដើម្បីជួយឱ្យកម្មវិធីដំណើរការបានកាន់តែមានប្រសិទ្ធភាព។" },
    { id: "overflow", variant: "warning", title: "Integer Overflow", body: "ប្រភេទ int អាចផ្ទុកបានតម្លៃពី -2,147,483,648 ដល់ 2,147,483,647 ប៉ុណ្ណោះ។ ប្រសិនបើលើសពីដែនកំណត់នេះ វានឹងវិលត្រឡប់ (Wrap Around) ទៅតម្លៃផ្សេង។ ប្រសិនបើត្រូវការតម្លៃលេខធំជាងនេះ គួរប្រើ long។" },
    { id: "string-object", variant: "danger", title: "String is an Object", body: "នៅពេលប្រៀបធៀបអត្ថបទ គួរប្រើ .equals() ជំនួស == ព្រោះ .equals() ប្រៀបធៀបខ្លឹមសាររបស់ String ខណៈ == ប្រៀបធៀប Reference ទៅកាន់ Object។" },
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
  prevLesson: { label: "ត្រឡប់ក្រោយ", href: lessonHref("java-syntax-basics") },
  nextLesson: { label: "មេរៀនបន្ទាប់", href: lessonHref("java-operators"), level: "Operators", meta: "មូលដ្ឋាន • អាន ៥ នាទី" },
};

const FLAGSHIP_LESSONS: LessonDocument[] = [
  htmlElements,
  cssSelectors,
  jsVariables,
  javaVariables,
  pythonVariables,
];

// ---------- Table of contents per track ----------
// The first item in each group is the flagship lesson above.
// The rest are placeholder lessons — real titles, "coming soon" body —
// so every link in the sidebar routes to a real page instead of a dead link.

type TocSeed = { id: string; label: string; flagshipId?: string };

const TRACK_TOC_SEED: Record<TrackSlug, TocSeed[]> = {
  html: [
    { id: "html-elements", label: "HTML Elements & Tags", flagshipId: "html-elements" },
    { id: "html-forms", label: "Forms & Inputs" },
    { id: "html-tables", label: "Tables" },
    { id: "html-semantic", label: "Semantic HTML" },
    { id: "html-media", label: "Media & Embeds" },
  ],
  css: [
    { id: "css-selectors", label: "CSS Selectors & Box Model", flagshipId: "css-selectors" },
    { id: "css-layout", label: "Layout & Flexbox" },
    { id: "css-grid", label: "CSS Grid" },
    { id: "css-responsive", label: "Responsive Design" },
    { id: "css-animation", label: "Transitions & Animation" },
  ],
  javascript: [
    { id: "js-variables", label: "Variables & Data Types", flagshipId: "js-variables" },
    { id: "js-functions", label: "Functions & Scope" },
    { id: "js-arrays", label: "Arrays & Objects" },
    { id: "js-dom", label: "DOM Manipulation" },
    { id: "js-async", label: "Async & Promises" },
  ],
  java: [
    { id: "java-syntax-basics", label: "Java Syntax Basics" },
    { id: "java-variables", label: "Variables & Data Types", flagshipId: "java-variables" },
    { id: "java-operators", label: "Operators" },
    { id: "java-control-flow", label: "Control Flow" },
    { id: "java-methods", label: "Methods" },
    { id: "java-arrays", label: "Arrays" },
    { id: "java-basic-projects", label: "Basic Practice Projects" },
  ],
  python: [
    { id: "python-variables", label: "Variables & Data Types", flagshipId: "python-variables" },
    { id: "python-control-flow", label: "Control Flow" },
    { id: "python-functions", label: "Functions" },
    { id: "python-lists", label: "Lists & Dictionaries" },
    { id: "python-files", label: "File Handling" },
  ],
};

function placeholderLesson(track: TrackSlug, id: string, title: string): LessonDocument {
  return {
    id,
    trackSlug: track,
    trackLabel: TRACK_LABELS[track],
    category: "កម្រិត៖ មូលដ្ឋានគ្រឹះ",
    title,
    breadcrumb: [`ការណែនាំអំពី ${TRACK_LABELS[track]}`, title],
    lessonIndexLabel: "មេរៀន • អាន ប្រហែល ១០ នាទី",
    readingTimeLabel: "ចំណាយពេលអាន ៥ នាទី",
    percentComplete: 0,
    level: "Beginner",
    levelReadingTimeLabel: "កម្រិត៖ មូលដ្ឋាន",
    objectives: [`យល់ដឹងអំពី ${title}`],
    intro: `មេរៀននេះនិយាយអំពី ${title} ក្នុងភាសា ${TRACK_LABELS[track]}។`,
    summary: "មាតិកាលម្អិតសម្រាប់មេរៀននេះកំពុងត្រូវបានរៀបចំ សូមអញ្ជើញត្រឡប់មកវិញឆាប់ៗនេះ។",
    infoCards: [],
    codeFilename: "",
    code: "",
    tips: [],
    instructor: {
      name: "SastraCode",
      studentsLabel: "",
      videoTitle: "",
      videoSubtitle: "",
    },
    quiz: {
      question: "សំណួរសម្រាប់មេរៀននេះកំពុងត្រូវបានរៀបចំ។",
      index: 1,
      total: 1,
      timeLimitLabel: "",
      levelLabel: "Beginner",
      options: [],
      correctOptionId: "",
    },
    pageAnchors: [],
  };
}

// ---------- Build the full lesson map + toc groups ----------

export const lessonsById: Record<string, LessonDocument> = {};
export const trackTocGroups: Record<TrackSlug, CourseTocGroup[]> = {
  html: [],
  css: [],
  javascript: [],
  java: [],
  python: [],
};

(Object.keys(TRACK_TOC_SEED) as TrackSlug[]).forEach((track) => {
  const seeds = TRACK_TOC_SEED[track];
  const items = seeds.map((seed) => {
    const flagship = FLAGSHIP_LESSONS.find((l) => l.id === seed.flagshipId);
    const lesson = flagship ?? placeholderLesson(track, seed.id, seed.label);
    lessonsById[lesson.id] = lesson;
    return { id: seed.id, label: seed.label, href: lessonHref(seed.id) };
  });

  trackTocGroups[track] = [
    {
      id: `${track}-basics`,
      label: `ការណែនាំអំពី ${TRACK_LABELS[track]}`,
      level: "Beginner",
      items,
    },
  ];
});

export const trackTabs = (Object.keys(TRACK_LABELS) as TrackSlug[]).map((slug) => ({
  slug,
  label: TRACK_LABELS[slug],
  // first lesson of each track — what the top nav tab links to
  href: lessonHref(trackTocGroups[slug][0].items[0].id),
}));

export function getLessonById(id: string): LessonDocument | undefined {
  return lessonsById[id];
}
