/**
 * Single source of truth for what the code playground can actually run.
 *
 * The playground editor (`src/components/playground/Editor.tsx`) and any
 * "Try it in the playground" entry point elsewhere in the app (e.g. lesson
 * code blocks) must agree on exactly which languages are supported —
 * otherwise a button can offer a language the editor silently can't open,
 * or the editor can silently fall back to a different language than the
 * one the user asked for. Keeping the language list and alias resolution
 * here means both places stay in sync.
 */

export type PlaygroundMode = "execute" | "preview";

export interface PlaygroundLanguage {
  label: string;

  /**
   * Monaco language and backend language.
   */
  value: string;

  color: string;

  mode: PlaygroundMode;

  starterCode: string;

  extension: string;
}

// ======================================================
// LANGUAGES
// ======================================================

export const languages: PlaygroundLanguage[] = [
  // ====================================================
  // HTML - LIVE PREVIEW
  // ====================================================

  {
    label: "HTML",
    value: "html",
    extension: "html",
    color: "#E34F26",
    mode: "preview",

    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>SastraCode HTML</title>

  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f8fafc;
      padding: 40px;
    }

    .card {
      max-width: 480px;
      margin: 40px auto;
      padding: 30px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    h1 {
      color: #002455;
    }

    p {
      color: #64748b;
      line-height: 1.6;
    }

    button {
      margin-top: 15px;
      padding: 12px 20px;
      border: none;
      border-radius: 10px;
      background: #002455;
      color: white;
      cursor: pointer;
    }
  </style>
</head>

<body>

  <div class="card">

    <h1>
      សួស្តី SastraCode!
    </h1>

    <p>
      Welcome to HTML Playground.
    </p>

    <button
      onclick="alert('Hello SastraCode!')"
    >
      Click Me
    </button>

  </div>

</body>
</html>`,
  },

  // ====================================================
  // CSS - LIVE PREVIEW
  // ====================================================

  {
    label: "CSS",
    value: "css",
    extension: "css",
    color: "#2965F1",
    mode: "preview",

    starterCode: `body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f8fafc;
  padding: 40px;
}

.card {
  max-width: 420px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #002455;
}

p {
  color: #64748b;
  line-height: 1.6;
}

button {
  margin-top: 16px;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  background: #dc0000;
  color: white;
  cursor: pointer;
}

button:hover {
  opacity: 0.85;
}`,
  },

  // ====================================================
  // JAVASCRIPT - BACKEND EXECUTION
  // ====================================================

  {
    label: "JavaScript",
    value: "javascript",
    extension: "js",
    color: "#F0DB4F",
    mode: "execute",

    starterCode: `const name = "SastraCode";

console.log("Hello " + name + "!");

const numbers = [1, 2, 3, 4, 5];

const result = numbers.map(
  (number) => number * 2
);

console.log(result);`,
  },

  // ====================================================
  // NODE.JS
  // ====================================================

  {
    label: "Node.js",
    value: "javascript",
    extension: "js",
    color: "#3C873A",
    mode: "execute",

    starterCode: `const message =
  "Hello from Node.js and SastraCode!";

console.log(message);

const users = [
  "Davin",
  "Sokha",
  "Dara"
];

users.forEach((user, index) => {
  console.log(
    \`\${index + 1}. \${user}\`
  );
});`,
  },

  // ====================================================
  // TAILWIND - LIVE PREVIEW
  // ====================================================

  {
    label: "Tailwind CSS",
    value: "html",
    extension: "html",
    color: "#38BDF8",
    mode: "preview",

    starterCode: `<div
  class="
    min-h-screen
    bg-slate-100
    flex
    items-center
    justify-center
    p-6
  "
>

  <div
    class="
      bg-white
      rounded-3xl
      shadow-xl
      p-8
      max-w-md
      w-full
    "
  >

    <div
      class="
        w-14
        h-14
        rounded-2xl
        bg-blue-950
        text-white
        flex
        items-center
        justify-center
        font-bold
        mb-5
      "
    >
      SC
    </div>

    <h1
      class="
        text-3xl
        font-bold
        text-blue-950
      "
    >
      សួស្តី Tailwind!
    </h1>

    <p
      class="
        mt-3
        text-slate-500
        leading-7
      "
    >
      Welcome to SastraCode
      Tailwind CSS Playground.
    </p>

    <div
      class="
        flex
        gap-3
        mt-6
      "
    >

      <button
        class="
          px-5
          py-3
          bg-blue-950
          hover:bg-blue-900
          text-white
          rounded-xl
          transition
        "
      >
        Get Started
      </button>

      <button
        class="
          px-5
          py-3
          bg-red-600
          hover:bg-red-700
          text-white
          rounded-xl
          transition
        "
      >
        Learn More
      </button>

    </div>

  </div>

</div>`,
  },

  // ====================================================
  // PYTHON
  // ====================================================

  {
    label: "Python",
    value: "python",
    extension: "py",
    color: "#3776AB",
    mode: "execute",

    starterCode: `def greet_developer(name):
    message = (
        "សួស្តី "
        + name
        + "! ចាប់ផ្តើមសរសេរកូដជាមួយ SastraCode"
    )

    return message


user_input = input(
    "បញ្ចូលឈ្មោះរបស់អ្នក: "
)

print(
    greet_developer(user_input)
)
`,
  },

  // ====================================================
  // JAVA
  // ====================================================

  {
    label: "Java",
    value: "java",
    extension: "java",
    color: "#EA2D2E",
    mode: "execute",

    starterCode: `public class Main {

    public static void main(
        String[] args
    ) {

        System.out.println(
            "Hello SastraCode!"
        );

        for (int i = 1; i <= 5; i++) {
            System.out.println(
                "Number: " + i
            );
        }
    }
}`,
  },
];

// ======================================================
// DEFAULT LANGUAGE
// ======================================================

export const defaultLanguage =
  languages.find((item) => item.label === "Python") ?? languages[0]!;

// ======================================================
// ALIAS RESOLUTION
// ======================================================
//
// Lesson content, coding-task metadata, etc. tag code with free-form
// language strings (e.g. "js", "TypeScript", "node.js", "tailwindcss").
// This maps those tags to the exact playground language they resolve to.

const LANGUAGE_ALIASES: Record<string, string> = {
  js: "javascript",
  javascript: "javascript",
  ts: "javascript",
  typescript: "javascript",
  node: "node.js",
  nodejs: "node.js",
  "node.js": "node.js",
  py: "python",
  python: "python",
  html: "html",
  html5: "html",
  css: "css",
  java: "java",
  tailwind: "tailwind css",
  "tailwind css": "tailwind css",
  tailwindcss: "tailwind css",
  "tailwind-css": "tailwind css",
};

/**
 * Resolves a free-form language tag to the exact playground language it
 * matches, or `undefined` if the playground has no support for it.
 */
export function resolvePlaygroundLanguage(
  value: string,
): PlaygroundLanguage | undefined {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;

  const requested = LANGUAGE_ALIASES[normalized] ?? normalized;

  return languages.find(
    (item) =>
      item.label.toLowerCase() === requested ||
      item.value.toLowerCase() === requested,
  );
}

/**
 * Same resolution as `resolvePlaygroundLanguage`, but always returns a
 * language — falling back to the default so the editor has something to
 * show. Only use this where a fallback is actually acceptable; use
 * `isPlaygroundLanguageSupported` first to decide whether to offer the
 * option at all.
 */
export function findPlaygroundLanguage(value: string): PlaygroundLanguage {
  return resolvePlaygroundLanguage(value) ?? defaultLanguage;
}

/**
 * Whether the playground can actually open the given language tag.
 * Use this to decide whether to show a "Try it in the playground" /
 * "Try it with AI" entry point — never show one that would silently
 * fall back to a different language.
 */
export function isPlaygroundLanguageSupported(value: string): boolean {
  return resolvePlaygroundLanguage(value) !== undefined;
}

const HTML_KEYWORD_PATTERN =
  /\b(function|def |public class|console\.log|import |System\.out|=>)\b/;
const CSS_RULE_PATTERN =
  /[.#a-zA-Z0-9\-_:,\s>*[\]="'()]+\{[\s\S]*?:[\s\S]*?;[\s\S]*?\}/;

/**
 * Strips `/* ... *\/` and `//` comments so a leading comment can't hide the
 * real language signals underneath it.
 */
function stripComments(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/^[ \t]*\/\/.*$/gm, " ");
}

function countMatches(code: string, patterns: RegExp[]): number {
  return patterns.reduce(
    (total, pattern) => (pattern.test(code) ? total + 1 : total),
    0,
  );
}

const JAVA_HINTS: RegExp[] = [
  /\bpublic\s+class\s+\w+/,
  /\b(public|private|protected)\s+static\s+void\s+main\s*\(/,
  /\bSystem\.out\.(println|print)\s*\(/,
  /\bString\[\]\s+\w+/,
  /\b(int|double|float|boolean|char|long)\s+\w+\s*=/,
  /\b(public|private|protected)\s+(static\s+)?[\w<>[\]]+\s+\w+\s*\([^)]*\)\s*\{/,
];

const PYTHON_HINTS: RegExp[] = [
  /^\s*def\s+\w+\s*\([^)]*\)\s*:/m,
  /^\s*class\s+\w+(\s*\([^)]*\))?\s*:/m,
  /^\s*(from\s+[\w.]+\s+)?import\s+[\w.,*\s]+$/m,
  /^\s*print\s*\(/m,
  /^\s*(if|elif|for|while|with|try|except)\b[^\n]*:\s*$/m,
  /\bself\b/,
  /\bf["'][^"']*\{[^}]*\}/,
  /\b__name__\b/,
];

const JAVASCRIPT_HINTS: RegExp[] = [
  /\bconsole\.(log|error|warn|info|table)\s*\(/,
  /\b(const|let)\s+[A-Za-z_$][\w$]*\s*=/,
  /\bfunction\s*\*?\s*\w*\s*\([^)]*\)\s*\{/,
  /=>\s*[{("'`\[]/,
  /\bdocument\.(getElementById|querySelector|querySelectorAll|createElement)/,
  /\b(require|import)\s*\(?\s*['"][^'"]+['"]/,
  /\bexport\s+(default|const|function|class)\b/,
  /`[^`]*\$\{[^}]*\}[^`]*`/,
];

/**
 * Lesson content routinely tags a code block with the wrong language — a CMS
 * "language" field defaults (often to "Java") and isn't always changed per
 * example, so an HTML, CSS, Python or JavaScript snippet can arrive tagged
 * "java". Rather than trust that tag blindly, inspect the code itself:
 *
 *  1. Unambiguous markup / stylesheet -> "html" / "css".
 *  2. Otherwise score the body against Java / Python / JavaScript signal
 *     patterns and take the clear winner (strictly more hits than the
 *     others, at least one hit).
 *  3. If nothing is conclusive, keep the originally declared language.
 */
export function detectLanguageFromCode(
  code: string,
  declaredLanguage: string,
): string {
  const trimmed = code.trim();
  if (!trimmed) return declaredLanguage;

  const looksLikeHtml =
    /^<!doctype html/i.test(trimmed) ||
    /<\/(html|head|body|div|p|span|ul|ol|li|section|main|header|footer|nav|article|table|form|button|a|h[1-6])>/i.test(
      trimmed,
    ) ||
    /<(html|head|body|meta|link|!--)[\s>]/i.test(trimmed) ||
    (/^</.test(trimmed) && /<\/[a-z][\w-]*>/i.test(trimmed));
  if (looksLikeHtml) return "html";

  const withoutComments = stripComments(trimmed);

  const looksLikeCss =
    !/[<>]/.test(withoutComments) &&
    !HTML_KEYWORD_PATTERN.test(withoutComments) &&
    CSS_RULE_PATTERN.test(withoutComments) &&
    /^[\s\S]*?[.#@a-zA-Z][\w\-.#:,\s>*[\]()="']*\{/.test(withoutComments.trim());
  if (looksLikeCss) return "css";

  const scores: { language: string; score: number }[] = [
    { language: "java", score: countMatches(withoutComments, JAVA_HINTS) },
    { language: "python", score: countMatches(withoutComments, PYTHON_HINTS) },
    {
      language: "javascript",
      score: countMatches(withoutComments, JAVASCRIPT_HINTS),
    },
  ].sort((a, b) => b.score - a.score);

  const [best, second] = scores;
  if (best && best.score > 0 && (!second || best.score > second.score)) {
    return best.language;
  }

  return declaredLanguage;
}
