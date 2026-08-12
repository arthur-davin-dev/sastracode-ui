"use client";

import { useEffect, useRef, useState } from "react";

import {
  Play,
  Copy,
  Maximize2,
  Minimize2,
  X,
  ZoomIn,
  ZoomOut,
  ListOrdered,
  ChevronUp,
  ChevronDown,
  Download,
  RotateCcw,
  Trash2,
  Eraser,
  Code2,
  TerminalSquare,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { useExecuteCodeMutation } from "@/types/playgroundApi";

// ======================================================
// TYPES
// ======================================================

type PlaygroundMode = "execute" | "preview";

interface PlaygroundLanguage {
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

const languages: PlaygroundLanguage[] = [
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
  // REACT - LIVE PREVIEW
  // ====================================================

  //   {
  //     label: "React",
  //     value: "javascript",
  //     extension: "jsx",
  //     color: "#61DAFB",
  //     mode: "preview",

  //     starterCode: `function App() {
  //   const [count, setCount] =
  //     React.useState(0);

  //   return (
  //     <div
  //       style={{
  //         minHeight: "100vh",
  //         padding: "40px",
  //         background: "#f8fafc",
  //         fontFamily: "Arial, sans-serif"
  //       }}
  //     >

  //       <div
  //         style={{
  //           maxWidth: "480px",
  //           margin: "40px auto",
  //           padding: "30px",
  //           background: "white",
  //           borderRadius: "20px",
  //           boxShadow:
  //             "0 10px 30px rgba(0, 0, 0, 0.08)"
  //         }}
  //       >

  //         <h1
  //           style={{
  //             color: "#002455"
  //           }}
  //         >
  //           សួស្តី React!
  //         </h1>

  //         <p>
  //           Welcome to SastraCode React Playground.
  //         </p>

  //         <p>
  //           Count: {count}
  //         </p>

  //         <button
  //           onClick={() =>
  //             setCount(
  //               (previous) =>
  //                 previous + 1
  //             )
  //           }
  //           style={{
  //             padding: "12px 20px",
  //             background: "#002455",
  //             color: "white",
  //             border: "none",
  //             borderRadius: "10px",
  //             cursor: "pointer"
  //           }}
  //         >
  //           Increase Count
  //         </button>

  //       </div>

  //     </div>
  //   );
  // }`,
  //   },

  // ====================================================
  // PHP
  // ====================================================

  //   {
  //     label: "PHP",
  //     value: "php",
  //     extension: "php",
  //     color: "#777BB4",
  //     mode: "execute",

  //     starterCode: `<?php

  // $name = "SastraCode";

  // echo "Hello " . $name . "!\\n";

  // for ($i = 1; $i <= 5; $i++) {
  //     echo "Number: " . $i . "\\n";
  // }

  // ?>`,
  //   },

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
  // C
  // ====================================================

  //   {
  //     label: "C",
  //     value: "c",
  //     extension: "c",
  //     color: "#A8B9CC",
  //     mode: "execute",

  //     starterCode: `#include <stdio.h>

  // int main() {

  //     printf("Hello SastraCode!\\n");

  //     for (int i = 1; i <= 5; i++) {
  //         printf("Number: %d\\n", i);
  //     }

  //     return 0;
  // }`,
  //   },

  // ====================================================
  // C++
  // ====================================================

  //   {
  //     label: "C++",
  //     value: "cpp",
  //     extension: "cpp",
  //     color: "#00599C",
  //     mode: "execute",

  //     starterCode: `#include <iostream>

  // using namespace std;

  // int main() {

  //     cout
  //       << "Hello SastraCode!"
  //       << endl;

  //     for (int i = 1; i <= 5; i++) {
  //         cout
  //           << "Number: "
  //           << i
  //           << endl;
  //     }

  //     return 0;
  // }`,
  // },

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

  // ====================================================
  // C#
  // ====================================================

  //   {
  //     label: "C#",
  //     value: "csharp",
  //     extension: "cs",
  //     color: "#9B4F96",
  //     mode: "execute",

  //     starterCode: `using System;

  // class Program
  // {
  //     static void Main()
  //     {
  //         Console.WriteLine(
  //             "Hello SastraCode!"
  //         );

  //         for (int i = 1; i <= 5; i++)
  //         {
  //             Console.WriteLine(
  //                 "Number: " + i
  //             );
  //         }
  //     }
  // }`,
  //   },

  // ====================================================
  // KOTLIN
  // ====================================================

  //   {
  //     label: "Kotlin",
  //     value: "kotlin",
  //     extension: "kt",
  //     color: "#7F52FF",
  //     mode: "execute",

  //     starterCode: `fun main() {

  //     println(
  //         "Hello SastraCode!"
  //     )

  //     for (i in 1..5) {
  //         println(
  //             "Number: $i"
  //         )
  //     }
  // }`,
  //   },
];

// ======================================================
// DEFAULT LANGUAGE
// ======================================================

const defaultLanguage =
  languages.find((item) => item.label === "Python") ?? languages[0];

// ======================================================
// PREVIEW DOCUMENT BUILDER
// ======================================================

function createPreviewDocument(type: string, code: string) {
  // ====================================================
  // HTML
  // ====================================================

  if (type === "HTML") {
    return code;
  }

  // ====================================================
  // CSS
  // ====================================================

  if (type === "CSS") {
    return `<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <style>

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    ${code}

  </style>

</head>

<body>

  <div class="card">

    <h1>
      SastraCode CSS Playground
    </h1>

    <p>
      Change the CSS code and
      this preview updates automatically.
    </p>

    <button
      onclick="alert('Hello SastraCode!')"
    >
      Example Button
    </button>

  </div>

</body>

</html>`;
  }

  // ====================================================
  // TAILWIND CSS
  // ====================================================

  if (type === "Tailwind CSS") {
    return `<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <script
    src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
  ></script>

</head>

<body>

${code}

</body>

</html>`;
  }

  // ====================================================
  // REACT
  // ====================================================

  if (type === "React") {
    /*
     * JSON.stringify lets us safely pass
     * the editor code into our preview JS.
     */

    const safeCode = JSON.stringify(code).replace(/<\/script/gi, "<\\/script");

    return `<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <script
    crossorigin
    src="https://unpkg.com/react@18/umd/react.development.js"
  ></script>

  <script
    crossorigin
    src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"
  ></script>

  <script
    src="https://unpkg.com/@babel/standalone/babel.min.js"
  ></script>

  <style>

    * {
      box-sizing: border-box;
    }

    html,
    body,
    #root {
      margin: 0;
      min-height: 100%;
    }

    .preview-error {
      margin: 0;
      padding: 20px;
      color: #dc2626;
      background: #fef2f2;
      white-space: pre-wrap;
      font-family:
        ui-monospace,
        SFMono-Regular,
        Menlo,
        Monaco,
        Consolas,
        monospace;
    }

  </style>

</head>

<body>

  <div id="root"></div>

  <script>

    const userCode =
      ${safeCode};

    function showError(error) {

      document.body.innerHTML = "";

      const element =
        document.createElement("pre");

      element.className =
        "preview-error";

      element.textContent =
        error instanceof Error
          ? (
              error.stack ||
              error.message
            )
          : String(error);

      document.body.appendChild(
        element
      );

    }

    try {

      const source =
        userCode +
        \`

const root =
  ReactDOM.createRoot(
    document.getElementById("root")
  );

root.render(
  React.createElement(App)
);
\`;

      const compiled =
        Babel.transform(
          source,
          {
            presets: [
              "react"
            ],
          }
        ).code;

      const execute =
        new Function(
          "React",
          "ReactDOM",
          compiled
        );

      execute(
        React,
        ReactDOM
      );

    } catch (error) {

      showError(error);

    }

    window.addEventListener(
      "error",
      function (event) {

        showError(
          event.error ||
          event.message
        );

      }
    );

  </script>

</body>

</html>`;
  }

  return "";
}

// ======================================================
// COMPONENT
// ======================================================

export default function Editor() {
  // ====================================================
  // MAIN STATE
  // ====================================================

  const [code, setCode] = useState(defaultLanguage.starterCode);

  const [activeLabel, setActiveLabel] = useState(defaultLanguage.label);

  const [activeColor, setActiveColor] = useState(defaultLanguage.color);

  const [language, setLanguage] = useState(defaultLanguage.value);

  const [mode, setMode] = useState<PlaygroundMode>(defaultLanguage.mode);

  const [stdin, setStdin] = useState("Khmer Coder");

  const [output, setOutput] = useState<string[]>([]);

  const [previewHtml, setPreviewHtml] = useState("");

  // ====================================================
  // RTK QUERY
  // ====================================================

  const [executeCode, { isLoading: isRunning }] = useExecuteCodeMutation();

  // ====================================================
  // UI STATE
  // ====================================================

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [editorFontSize, setEditorFontSize] = useState(14);

  const [outputFontSize, setOutputFontSize] = useState(13);

  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const [outputAnchor, setOutputAnchor] = useState<"Top" | "Bottom">("Bottom");

  // ====================================================
  // REFS
  // ====================================================

  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const outputRef = useRef<HTMLDivElement | null>(null);

  // ====================================================
  // CURRENT LANGUAGE
  // ====================================================

  const currentLanguage =
    languages.find((item) => item.label === activeLabel) ?? defaultLanguage;

  const isPreviewMode = mode === "preview";

  const activeTextColor =
    activeColor === "#F0DB4F" || activeColor === "#A8B9CC"
      ? "#0f172a"
      : "#ffffff";

  // ====================================================
  // DARK MODE
  // ====================================================

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);

    observer.observe(document.documentElement, {
      attributes: true,

      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // ====================================================
  // AUTOMATIC LIVE PREVIEW
  //
  // HTML
  // CSS
  // React
  // Tailwind CSS
  //
  // Runs automatically ~400ms after typing.
  // ====================================================

  useEffect(() => {
    if (mode !== "preview") {
      return;
    }

    const timer = window.setTimeout(() => {
      const document = createPreviewDocument(activeLabel, code);

      setPreviewHtml(document);
    }, 400);

    return () => {
      window.clearTimeout(timer);
    };
  }, [code, activeLabel, mode]);

  // ====================================================
  // AUTO SCROLL CONSOLE
  // ====================================================

  useEffect(() => {
    if (!outputRef.current) {
      return;
    }

    if (outputAnchor === "Bottom") {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, outputAnchor]);

  // ====================================================
  // MONACO MOUNT
  // ====================================================

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  // ====================================================
  // SELECT LANGUAGE
  // ====================================================

  const handleSelectLanguage = (selected: PlaygroundLanguage) => {
    setActiveLabel(selected.label);

    setLanguage(selected.value);

    setActiveColor(selected.color);

    setMode(selected.mode);

    setCode(selected.starterCode);

    editorRef.current?.setValue(selected.starterCode);

    setOutput([]);

    setPreviewHtml("");
  };

  // ====================================================
  // RUN
  //
  // Only backend languages need this.
  // Preview languages update automatically.
  // ====================================================

  const handleRun = async () => {
    if (mode === "preview") {
      return;
    }

    const currentCode = editorRef.current?.getValue() ?? code;

    if (!currentCode.trim()) {
      setOutput(["Error: Please write some code first."]);

      return;
    }

    setOutput([`Running ${activeLabel}...`]);

    try {
      const result = await executeCode({
        language,

        code: currentCode,

        stdin,
      }).unwrap();

      const lines: string[] = [];

      // ==============================================
      // STDOUT
      // ==============================================

      if (result.output && result.output.trim()) {
        lines.push("Success! Output:");

        lines.push(...result.output.split("\n"));
      }

      // ==============================================
      // STDERR
      // ==============================================

      if (result.error && result.error.trim()) {
        if (lines.length > 0) {
          lines.push("");
        }

        lines.push("Error:");

        lines.push(...result.error.split("\n"));
      }

      // ==============================================
      // TIMEOUT
      // ==============================================

      if (result.timedOut) {
        if (lines.length > 0) {
          lines.push("");
        }

        lines.push("Execution timed out.");
      }

      // ==============================================
      // NO OUTPUT
      // ==============================================

      if (!result.output && !result.error) {
        lines.push("Program finished with no output.");
      }

      // ==============================================
      // INFO
      // ==============================================

      lines.push("");

      if (result.durationMs !== undefined) {
        lines.push(`Execution time: ${result.durationMs} ms`);
      }

      if (result.exitCode !== undefined) {
        lines.push(`Process finished with exit code ${result.exitCode}`);
      }

      setOutput(lines);
    } catch (error) {
      console.error("Code execution failed:", error);

      let message = "Unable to execute code.";

      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as {
          data?: {
            message?: string;
          };
        };

        if (apiError.data?.message) {
          message = apiError.data.message;
        }
      }

      setOutput(["Execution failed.", "", message]);
    }
  };

  // ====================================================
  // COPY
  // ====================================================

  const handleCopy = async () => {
    const currentCode = editorRef.current?.getValue() ?? code;

    try {
      await navigator.clipboard.writeText(currentCode);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  // ====================================================
  // DOWNLOAD
  // ====================================================

  const handleDownload = () => {
    const currentCode = editorRef.current?.getValue() ?? code;

    const blob = new Blob([currentCode], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);

    const element = document.createElement("a");

    element.href = url;

    element.download = `main.${currentLanguage.extension}`;

    document.body.appendChild(element);

    element.click();

    element.remove();

    URL.revokeObjectURL(url);
  };

  // ====================================================
  // RESET
  // ====================================================

  const handleReset = () => {
    const starterCode = currentLanguage.starterCode;

    setCode(starterCode);

    editorRef.current?.setValue(starterCode);

    setOutput([]);

    /*
     * No need to manually rebuild preview.
     * setCode() triggers the live-preview useEffect.
     */
  };

  // ====================================================
  // CLEAR EDITOR
  // ====================================================

  const handleClearEditor = () => {
    setCode("");

    editorRef.current?.setValue("");

    if (isPreviewMode) {
      setPreviewHtml("");
    }
  };

  // ====================================================
  // CLEAR OUTPUT
  // ====================================================

  const handleClearOutput = () => {
    setOutput([]);
  };

  // ====================================================
  // FULLSCREEN
  // ====================================================

  const toggleFullscreen = () => {
    setIsFullscreen((previous) => !previous);

    setTimeout(() => {
      editorRef.current?.layout();
    }, 50);
  };

  // ====================================================
  // ZOOM
  // ====================================================

  const zoom = (
    setter: React.Dispatch<React.SetStateAction<number>>,

    direction: 1 | -1,
  ) => {
    setter((previous) =>
      Math.min(
        28,

        Math.max(
          10,

          previous + direction,
        ),
      ),
    );
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-3 pb-10 pt-5 font-khmer text-slate-900 transition-colors duration-300 dark:bg-[#070b14] dark:text-slate-100 sm:px-5 lg:px-7">
      <div className="mx-auto mb-4 flex max-w-[1800px] flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#0d1320] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#002455] text-white shadow-lg shadow-blue-950/15 dark:bg-blue-600">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                Code Playground
              </h1>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                Ready
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Write, run, and preview code in one focused workspace.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Tip: press Ctrl + Enter to run your code</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1800px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-[#0d1320] dark:shadow-black/30">
        {/* ================================================= */}
        {/* LANGUAGE TABS */}
        {/* ================================================= */}

        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-white/10 dark:bg-[#0a0f1a]">
          {languages.map((item) => {
            const isActive = activeLabel === item.label;

            const itemTextColor =
              item.color === "#F0DB4F" || item.color === "#A8B9CC"
                ? "#0f172a"
                : "#ffffff";

            const dotColor = isActive ? itemTextColor : item.color;

            return (
              <button
                type="button"
                key={item.label}
                onClick={() => handleSelectLanguage(item)}
                style={
                  isActive
                    ? {
                        backgroundColor: item.color,

                        color: itemTextColor,
                      }
                    : undefined
                }
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? ""
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: dotColor,
                  }}
                />

                {item.label}

                {item.mode === "preview" && (
                  <span
                    className={`ml-1 text-[9px] font-bold uppercase ${
                      isActive ? "opacity-70" : "text-emerald-500"
                    }`}
                  >
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================================================= */}
        {/* TOOLBAR */}
        {/* ================================================= */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
          {/* LEFT TOOLBAR */}

          <div className="flex flex-wrap items-center gap-2">
            {/* Language Badge */}

            <span
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold"
              style={{
                backgroundColor: activeColor,

                color: activeTextColor,
              }}
            >
              {activeLabel} Lab
            </span>

            {/* Live status */}

            {isPreviewMode && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live Preview
              </div>
            )}

            {/* Editor Font Size */}

            <div className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 dark:border-slate-800">
              <span className="pr-1 text-xs text-slate-500 dark:text-slate-400">
                Editor:
              </span>

              <button
                type="button"
                onClick={() => zoom(setEditorFontSize, -1)}
                className="rounded p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>

              <span className="w-8 text-center text-xs text-slate-700 dark:text-slate-300">
                {editorFontSize}px
              </span>

              <button
                type="button"
                onClick={() => zoom(setEditorFontSize, 1)}
                className="rounded p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Output Font Size */}

            {!isPreviewMode && (
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 dark:border-slate-800">
                <span className="pr-1 text-xs text-slate-500 dark:text-slate-400">
                  Output:
                </span>

                <button
                  type="button"
                  onClick={() => zoom(setOutputFontSize, -1)}
                  className="rounded p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>

                <span className="w-8 text-center text-xs text-slate-700 dark:text-slate-300">
                  {outputFontSize}px
                </span>

                <button
                  type="button"
                  onClick={() => zoom(setOutputFontSize, 1)}
                  className="rounded p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Line Numbers */}

            <button
              type="button"
              onClick={() => setShowLineNumbers((previous) => !previous)}
              className={`flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300 ${
                showLineNumbers
                  ? "bg-slate-100 dark:bg-slate-800"
                  : "text-slate-500"
              }`}
            >
              <ListOrdered className="h-3.5 w-3.5" />
              Line
            </button>

            {/* Output Scroll Anchor */}

            {!isPreviewMode && (
              <button
                type="button"
                onClick={() =>
                  setOutputAnchor((previous) =>
                    previous === "Bottom" ? "Top" : "Bottom",
                  )
                }
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300"
              >
                {outputAnchor === "Bottom" ? (
                  <ChevronDown className="h-3.5 w-3.5" />
                ) : (
                  <ChevronUp className="h-3.5 w-3.5" />
                )}

                {outputAnchor}
              </button>
            )}

            {/* Fullscreen */}

            <button
              type="button"
              onClick={toggleFullscreen}
              className="rounded-lg border border-slate-200 p-2 text-slate-700 dark:border-slate-800 dark:text-slate-300"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {/* ================================================= */}
          {/* ACTION BUTTONS */}
          {/* ================================================= */}

          <div className="flex flex-wrap items-center gap-2">
            {/* Run only compiler/backend languages */}

            {!isPreviewMode && (
              <Button
                type="button"
                onClick={handleRun}
                disabled={isRunning}
                style={{
                  backgroundColor: activeColor,

                  color: activeTextColor,
                }}
                className="h-10 gap-2 rounded-xl px-5 font-bold shadow-md hover:opacity-90"
              >
                <Play className="h-4 w-4" />

                {isRunning ? "Running..." : "Run"}
              </Button>
            )}

            {/* Copy */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4 text-gray-600" />
              Copy
            </Button>

            {/* Download */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 text-gray-600" />
              Download
            </Button>

            {/* Reset */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 text-gray-600" />
              Reset
            </Button>

            {/* Clear Editor */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900"
              onClick={handleClearEditor}
            >
              <Trash2 className="h-4 w-4 text-gray-600" />
              Clear
            </Button>

            {/* Clear Output only for executable languages */}

            {!isPreviewMode && (
              <Button
                type="button"
                variant="outline"
                className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900"
                onClick={handleClearOutput}
              >
                <Eraser className="h-4 w-4 text-gray-600" />
                Clear Output
              </Button>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* STANDARD INPUT */}
        {/* ================================================= */}

        {!isPreviewMode && (
          <div className="px-4 pt-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-[#0a0f1a]">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="stdin"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Standard Input (stdin)
                </label>

                <button
                  type="button"
                  onClick={() => setStdin("")}
                  className="text-xs text-slate-500 transition-colors hover:text-red-500"
                >
                  Clear
                </button>
              </div>

              <textarea
                id="stdin"
                value={stdin}
                onChange={(event) => setStdin(event.target.value)}
                placeholder="Enter input for your program..."
                className="min-h-20 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 font-mono text-sm text-slate-800 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              />
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* EDITOR + PREVIEW/OUTPUT */}
        {/* ================================================= */}

        <div className="grid gap-4 p-4 lg:grid-cols-2">
          {/* ================================================= */}
          {/* MONACO EDITOR */}
          {/* ================================================= */}

          <div
            className={
              isFullscreen
                ? "fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950"
                : "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0a0f1a]"
            }
          >
            {/* Editor Header */}

            <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 text-slate-800 dark:border-white/10 dark:bg-[#111827] dark:text-slate-200">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-[0.14em]">
                  Editor
                </span>

                <span
                  className="rounded px-2 py-0.5 text-[10px] font-bold"
                  style={{
                    backgroundColor: activeColor,

                    color: activeTextColor,
                  }}
                >
                  {activeLabel}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                <Copy
                  className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-900 dark:hover:text-white"
                  onClick={handleCopy}
                />

                {isFullscreen ? (
                  <Minimize2
                    className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-900 dark:hover:text-white"
                    onClick={toggleFullscreen}
                  />
                ) : (
                  <Maximize2
                    className="h-4 w-4 cursor-pointer transition-colors hover:text-slate-900 dark:hover:text-white"
                    onClick={toggleFullscreen}
                  />
                )}

                {isFullscreen && (
                  <X
                    className="h-5 w-5 cursor-pointer transition-colors hover:text-slate-900 dark:hover:text-white"
                    onClick={toggleFullscreen}
                  />
                )}
              </div>
            </div>

            {/* Monaco */}

            <div className={isFullscreen ? "flex-1" : ""}>
              <MonacoEditor
                height={isFullscreen ? "100%" : "500px"}
                language={language}
                value={code}
                onChange={(value) => {
                  setCode(value ?? "");
                }}
                onMount={handleEditorMount}
                theme={isDarkMode ? "vs-dark" : "vs"}
                options={{
                  fontSize: editorFontSize,

                  lineNumbers: showLineNumbers ? "on" : "off",

                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",

                  minimap: {
                    enabled: false,
                  },

                  scrollBeyondLastLine: false,

                  wordWrap: "on",

                  automaticLayout: true,

                  padding: {
                    top: 16,
                  },

                  tabSize: 2,

                  insertSpaces: true,

                  smoothScrolling: true,

                  cursorSmoothCaretAnimation: "on",
                }}
              />
            </div>
          </div>

          {/* ================================================= */}
          {/* LIVE PREVIEW / CONSOLE */}
          {/* ================================================= */}

          {!isFullscreen && (
            <>
              {isPreviewMode ? (
                // =============================================
                // LIVE PREVIEW
                // =============================================

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0a0f1a]">
                  {/* Header */}

                  <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-white/10 dark:bg-[#111827]">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>

                      <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        LIVE PREVIEW
                      </span>
                    </div>

                    <span
                      className="rounded-md px-2 py-1 text-xs font-semibold"
                      style={{
                        backgroundColor: activeColor,

                        color: activeTextColor,
                      }}
                    >
                      {activeLabel}
                    </span>
                  </div>

                  {/* Live iframe */}

                  {previewHtml ? (
                    <iframe
                      title={`${activeLabel} Live Preview`}
                      srcDoc={previewHtml}
                      sandbox="allow-scripts allow-modals"
                      className="h-[500px] w-full border-0 bg-white"
                    />
                  ) : (
                    <div className="flex h-[500px] items-center justify-center bg-white dark:bg-slate-950">
                      <div className="px-6 text-center">
                        <div
                          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                          style={{
                            backgroundColor: `${activeColor}20`,
                          }}
                        >
                          <Play
                            className="h-6 w-6"
                            style={{
                              color: activeColor,
                            }}
                          />
                        </div>

                        <p className="font-semibold text-slate-600 dark:text-slate-300">
                          {activeLabel} Live Preview
                        </p>

                        <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                          Start typing and your preview will update
                          automatically.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // =============================================
                // CONSOLE
                // =============================================

<div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#0a0f1a]">
  {/* Console Header */}

  <div className="flex h-11 items-center justify-between border-b border-slate-200 bg-slate-100 px-4 dark:border-white/10 dark:bg-[#111827]">
    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-300">
      <TerminalSquare className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />{" "}
      Console
    </span>

    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() =>
          outputRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="flex items-center gap-1 text-xs text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ChevronUp className="h-3.5 w-3.5" />
        Top
      </button>

      <button
        type="button"
        onClick={() =>
          outputRef.current?.scrollTo({
            top: outputRef.current.scrollHeight,
            behavior: "smooth",
          })
        }
        className="flex items-center gap-1 text-xs text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ChevronDown className="h-3.5 w-3.5" />
        Bottom
      </button>
    </div>
  </div>

  {/* Console Body */}

  <div
    ref={outputRef}
    style={{
      fontSize: outputFontSize,
    }}
    className="h-[500px] space-y-1 overflow-y-auto bg-white p-4 font-mono transition-colors duration-300 dark:bg-[#090d16]"
  >
    {output.length === 0 ? (
      <p className="italic text-slate-400 dark:text-slate-500">
        Click &quot;Run&quot; to see output here.
      </p>
    ) : (
      output.map((line, index) => (
        <p
          key={index}
          className={
            line === "Success! Output:"
              ? "font-semibold text-emerald-600 dark:text-emerald-400"
              : line === "Error:" ||
                  line.startsWith("Execution failed") ||
                  line.startsWith("Execution timed out") ||
                  line.startsWith("Error:")
                ? "font-semibold text-red-600 dark:text-red-400"
                : line.startsWith("Process finished") ||
                    line.startsWith("Execution time:")
                  ? "text-slate-500 dark:text-slate-400"
                  : line.startsWith("Running")
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-800 dark:text-slate-100"
          }
        >
          {line || "\u00A0"}
        </p>
      ))
    )}
  </div>
</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
