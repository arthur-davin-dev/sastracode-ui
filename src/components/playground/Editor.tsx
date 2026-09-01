"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import {
  Play,
  Copy,
  Check,
  CircleAlert,
  AlignLeft,
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
  Columns2,
  Bot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import CodeCoach from "@/components/playground/CodeCoach";

import MonacoEditor, { type OnMount } from "@monaco-editor/react";
import { useExecuteCodeMutation } from "@/types/playgroundApi";
import { getApiErrorMessage } from "@/lib/api/error";
import {
  defaultLanguage,
  findPlaygroundLanguage,
  languages,
  type PlaygroundLanguage,
  type PlaygroundMode,
} from "@/lib/playground/languages";

// ======================================================
// TYPES
// ======================================================

type EditorTheme = "system" | "vs" | "vs-dark" | "hc-black";

const editorThemes: Array<{ label: string; value: EditorTheme }> = [
  { label: "System", value: "system" },
  { label: "VS Light", value: "vs" },
  { label: "VS Dark", value: "vs-dark" },
  { label: "High Contrast", value: "hc-black" },
];

const voidHtmlTags = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function normalizeEnglishDigits(value: string) {
  return value.replace(/[០-៩]/g, (digit) =>
    String(digit.charCodeAt(0) - 0x17e0),
  );
}

// ======================================================
// STANDARD INPUT DETECTION
// ======================================================

function codeUsesStandardInput(languageLabel: string, sourceCode: string) {
  const label = languageLabel.trim().toLowerCase();

  if (label === "python") {
    return /\binput\s*\(/.test(sourceCode);
  }

  if (label === "java") {
    return (
      /\bSystem\.in\b/.test(sourceCode) ||
      /\bScanner\s*\(/.test(sourceCode) ||
      /\bBufferedReader\s*\(/.test(sourceCode)
    );
  }

  if (label === "javascript" || label === "node.js") {
    return (
      /\bprocess\.stdin\b/.test(sourceCode) ||
      /\breadline(?:\/promises)?\b/.test(sourceCode) ||
      /\bcreateInterface\s*\(/.test(sourceCode)
    );
  }

  return false;
}

// ======================================================
// CODE FORMATTING FALLBACKS
// ======================================================
// Monaco has built-in document formatters for several web languages.
// Java and Python do not always have one in a standalone Monaco setup,
// so these helpers provide a conservative fallback without extra packages.

function countBracesOutsideStrings(line: string) {
  let opening = 0;
  let closing = 0;
  let quote: "'" | '"' | "`" | null = null;
  let escaped = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (character === "\\") {
        escaped = true;
        continue;
      }

      if (character === quote) {
        quote = null;
      }

      continue;
    }

    if (character === "'" || character === '"' || character === "`") {
      quote = character;
      continue;
    }

    // Ignore the rest of a one-line comment.
    if (character === "/" && nextCharacter === "/") {
      break;
    }

    if (character === "{") opening += 1;
    if (character === "}") closing += 1;
  }

  return { opening, closing };
}

function formatBraceLanguage(sourceCode: string, indentSize = 2) {
  const lines = sourceCode.replace(/\r\n?/g, "\n").split("\n");
  const formatted: string[] = [];
  let indentLevel = 0;

  for (const originalLine of lines) {
    const trimmed = originalLine.trim();
    if (!trimmed) continue;

    const leadingClosingBraces = trimmed.match(/^}+/)?.[0].length ?? 0;
    const { opening, closing } = countBracesOutsideStrings(trimmed);
    const lineIndent = Math.max(0, indentLevel - leadingClosingBraces);

    formatted.push(`${" ".repeat(lineIndent * indentSize)}${trimmed}`);
    indentLevel = Math.max(0, indentLevel + opening - closing);
  }

  return formatted.join("\n").trimEnd();
}

/**
 * Turns a brace-based language into one logical statement per line.
 * It keeps semicolons inside for(...) on the same line and does not split
 * braces/semicolons that are inside strings or comments.
 */
function splitBraceStatements(sourceCode: string) {
  let result = "";
  let quote: "'" | '"' | "`" | null = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let parenthesisDepth = 0;
  let pendingSpace = false;

  const trimLineEnd = () => {
    result = result.replace(/[ \t]+$/g, "");
  };

  const ensureNewLine = () => {
    trimLineEnd();
    if (result && !result.endsWith("\n")) result += "\n";
  };

  const appendPendingSpace = (nextCharacter: string) => {
    if (!pendingSpace) return;
    pendingSpace = false;

    const previous = result.at(-1) ?? "";
    const noSpaceBefore = new Set([")", "]", ";", ",", ".", ":"]);
    const noSpaceAfter = new Set(["(", "[", "."]);

    if (
      previous &&
      previous !== "\n" &&
      previous !== " " &&
      !noSpaceBefore.has(nextCharacter) &&
      !noSpaceAfter.has(previous)
    ) {
      result += " ";
    }
  };

  for (let index = 0; index < sourceCode.length; index += 1) {
    const character = sourceCode[index];
    const nextCharacter = sourceCode[index + 1] ?? "";

    if (lineComment) {
      result += character;
      if (character === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      result += character;
      if (character === "*" && nextCharacter === "/") {
        result += "/";
        index += 1;
        blockComment = false;
      }
      continue;
    }

    if (quote) {
      result += character;

      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }
      continue;
    }

    if (character === "/" && nextCharacter === "/") {
      appendPendingSpace(character);
      result += "//";
      index += 1;
      lineComment = true;
      continue;
    }

    if (character === "/" && nextCharacter === "*") {
      appendPendingSpace(character);
      result += "/*";
      index += 1;
      blockComment = true;
      continue;
    }

    if (character === "'" || character === '"' || character === "`") {
      appendPendingSpace(character);
      quote = character;
      result += character;
      continue;
    }

    if (/\s/.test(character)) {
      pendingSpace = true;
      continue;
    }

    if (character === "(") {
      appendPendingSpace(character);
      parenthesisDepth += 1;
      result += character;
      continue;
    }

    if (character === ")") {
      pendingSpace = false;
      parenthesisDepth = Math.max(0, parenthesisDepth - 1);
      trimLineEnd();
      result += character;
      continue;
    }

    if (character === ",") {
      pendingSpace = false;
      trimLineEnd();
      result += ", ";
      continue;
    }

    if (character === "{") {
      appendPendingSpace(character);
      trimLineEnd();
      if (result && !/[ \n]$/.test(result)) result += " ";
      result += "{";
      ensureNewLine();
      continue;
    }

    if (character === "}") {
      pendingSpace = false;
      ensureNewLine();
      result += "}";
      ensureNewLine();
      continue;
    }

    if (character === ";" && parenthesisDepth === 0) {
      pendingSpace = false;
      trimLineEnd();
      result += ";";
      ensureNewLine();
      continue;
    }

    appendPendingSpace(character);
    result += character;
  }

  return result
    .replace(/\n\s*\n+/g, "\n")
    .replace(/}\s*\n\s*(else|catch|finally)\b/g, "} $1")
    .trim();
}

function formatJavaFallback(sourceCode: string) {
  const logicalLines = splitBraceStatements(sourceCode);
  return formatBraceLanguage(logicalLines, 4);
}

function collapseSimpleHtmlTextElements(sourceCode: string) {
  const preserveWhitespaceTags = new Set([
    "pre",
    "textarea",
    "script",
    "style",
  ]);

  let result = sourceCode;
  let previous = "";

  // Repeat because collapsing an inner element can make its parent simple too.
  while (result !== previous) {
    previous = result;
    result = result.replace(
      /<([A-Za-z][\w:-]*)(\s[^<>]*?)?>([^<>]*?)<\/\1\s*>/gi,
      (
        fullMatch,
        rawTagName: string,
        rawAttributes: string | undefined,
        rawText: string,
      ) => {
        const tagName = rawTagName.toLowerCase();
        if (preserveWhitespaceTags.has(tagName)) return fullMatch;

        const text = rawText.replace(/\s+/g, " ").trim();
        if (!text) return fullMatch;

        const attributes = rawAttributes ?? "";
        return `<${rawTagName}${attributes}>${text}</${rawTagName}>`;
      },
    );
  }

  return result;
}

function formatHtmlFallback(sourceCode: string) {
  const voidTags = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  // Monaco may produce:
  // <h1>\n  Hello</h1>
  // Collapse simple text-only elements before applying indentation.
  const compactSource = collapseSimpleHtmlTextElements(sourceCode)
    .replace(/>\s*</g, ">\n<")
    .replace(/\r\n?/g, "\n");

  const lines = compactSource.split("\n");
  const formatted: string[] = [];
  let indentLevel = 0;

  for (const originalLine of lines) {
    const trimmed = originalLine.trim();
    if (!trimmed) continue;

    const startsWithClosingTag = /^<\//.test(trimmed);
    if (startsWithClosingTag) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    formatted.push(`${"  ".repeat(indentLevel)}${trimmed}`);

    const openingMatch = trimmed.match(/^<([A-Za-z][\w:-]*)\b[^>]*>/);
    const tagName = openingMatch?.[1]?.toLowerCase();
    const isDeclaration = /^<!/.test(trimmed) || /^<\?/.test(trimmed);
    const isSelfClosing = /\/\s*>$/.test(trimmed);
    const hasSameLineClosingTag = tagName
      ? new RegExp(`<\\/${tagName}\\s*>`, "i").test(trimmed)
      : false;

    if (
      tagName &&
      !startsWithClosingTag &&
      !isDeclaration &&
      !isSelfClosing &&
      !voidTags.has(tagName) &&
      !hasSameLineClosingTag
    ) {
      indentLevel += 1;
    }
  }

  return formatted.join("\n").trimEnd();
}

function formatPythonFallback(sourceCode: string) {
  const lines = sourceCode.replace(/\r\n?/g, "\n").split("\n");
  const formatted: string[] = [];
  let indentLevel = 0;
  let previousWasBlank = false;

  const dedentBefore = /^(elif\b|else\s*:|except\b|finally\s*:|case\b)/;

  for (const originalLine of lines) {
    const trimmed = originalLine.trim();

    if (!trimmed) {
      if (!previousWasBlank && formatted.length > 0) formatted.push("");
      previousWasBlank = true;
      continue;
    }

    previousWasBlank = false;

    const normalizedOriginal = originalLine.replace(/\t/g, "    ");
    const originalIndentSpaces =
      normalizedOriginal.length - normalizedOriginal.trimStart().length;
    const originalIndentLevel = Math.floor(originalIndentSpaces / 4);

    if (dedentBefore.test(trimmed)) {
      indentLevel = Math.max(0, indentLevel - 1);
    } else if (originalIndentLevel < indentLevel) {
      indentLevel = originalIndentLevel;
    }

    formatted.push(`${"    ".repeat(indentLevel)}${trimmed}`);

    const codeWithoutComment = trimmed.replace(/\s+#.*$/, "").trimEnd();
    if (codeWithoutComment.endsWith(":")) {
      indentLevel += 1;
    }
  }

  return formatted.join("\n").trimEnd();
}

function formatPlaygroundCode(languageLabel: string, sourceCode: string) {
  const label = languageLabel.trim().toLowerCase();

  if (label === "html" || label === "tailwind css") {
    return formatHtmlFallback(sourceCode);
  }

  if (label === "python") {
    return formatPythonFallback(sourceCode);
  }

  if (label === "java") {
    return formatJavaFallback(sourceCode);
  }

  if (label === "javascript" || label === "node.js" || label === "css") {
    return formatBraceLanguage(splitBraceStatements(sourceCode), 2);
  }

  return sourceCode.replace(/[ \t]+$/gm, "").trimEnd();
}

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
  const searchParams = useSearchParams();

  // ====================================================
  // MAIN STATE
  // ====================================================

  const requestedLanguageParam = searchParams.get("language");
  const initialLanguage = requestedLanguageParam
    ? findPlaygroundLanguage(requestedLanguageParam)
    : defaultLanguage;

  const [code, setCode] = useState(initialLanguage.starterCode);

  const [activeLabel, setActiveLabel] = useState(initialLanguage.label);

  const [activeColor, setActiveColor] = useState(initialLanguage.color);

  const [language, setLanguage] = useState(initialLanguage.value);

  const [mode, setMode] = useState<PlaygroundMode>(initialLanguage.mode);

  const [stdin, setStdin] = useState("Khmer Coder");

  const [output, setOutput] = useState<string[]>([]);

  const [previewHtml, setPreviewHtml] = useState("");
  const codingTaskId =
    searchParams.get("codingTaskId") ?? searchParams.get("taskId") ?? undefined;

  // ====================================================
  // RTK QUERY
  // ====================================================

  const [executeCode, { isLoading: isRunning }] = useExecuteCodeMutation();

  // ====================================================
  // UI STATE
  // ====================================================

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);

  const [isWorkspaceFullscreen, setIsWorkspaceFullscreen] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [editorTheme, setEditorTheme] = useState<EditorTheme>("system");

  const [editorFontSize, setEditorFontSize] = useState(14);

  const [outputFontSize, setOutputFontSize] = useState(13);

  const [resultZoom, setResultZoom] = useState(100);

  const [showLineNumbers, setShowLineNumbers] = useState(true);

  const [outputAnchor, setOutputAnchor] = useState<"Top" | "Bottom">("Bottom");

  const [isAiCoachOpen, setIsAiCoachOpen] = useState(false);

  const [coachPos, setCoachPos] = useState<{ x: number; y: number } | null>(null);

  const [coachSnapping, setCoachSnapping] = useState(false);

  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const [formatStatus, setFormatStatus] = useState<
    "idle" | "formatted" | "error"
  >("idle");

  // ====================================================
  // REFS
  // ====================================================

  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const outputRef = useRef<HTMLDivElement | null>(null);

  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const copyStatusTimerRef = useRef<number | null>(null);

  const formatStatusTimerRef = useRef<number | null>(null);

  // Always points to the latest Format Code handler.
  // Monaco keybindings are registered once when the editor mounts, so using
  // a ref prevents the shortcuts from calling an old render's handler.
  const formatCodeActionRef = useRef<() => void>(() => { });

  // Tracks drag state for the floating AI Coach button (not a re-render trigger)
  const coachDragInfo = useRef({
    dragging: false,
    moved: false,
    offsetX: 0,
    offsetY: 0,
    lastX: 0,
    lastY: 0,
  });

  // Gap kept between the button and the screen edge when it snaps
  const COACH_EDGE_MARGIN = 16;

  // Looks up the Scroll-to-Top button's real position on screen right now.
  // Returns null if it isn't visible (it only shows after scrolling down).
  const getScrollButtonRect = () => {
    const el = document.querySelector<HTMLElement>(
      'button[aria-label="Scroll to top"]',
    );
    if (!el) return null;

    const style = window.getComputedStyle(el);
    if (style.pointerEvents === "none" || parseFloat(style.opacity) < 0.5) {
      return null;
    }

    return el.getBoundingClientRect();
  };

  // ====================================================
  // CURRENT LANGUAGE
  // ====================================================

  const currentLanguage =
    languages.find((item) => item.label === activeLabel) ?? defaultLanguage;

  const isPreviewMode = mode === "preview";

  const shouldShowStdin =
    !isPreviewMode && codeUsesStandardInput(activeLabel, code);

  const resolvedEditorTheme =
    editorTheme === "system" ? (isDarkMode ? "vs-dark" : "vs") : editorTheme;

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      const active = document.fullscreenElement === workspaceRef.current;
      setIsWorkspaceFullscreen(active);

      window.setTimeout(() => {
        editorRef.current?.layout();
      }, 80);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (searchParams.get("example") !== "lesson") return;

    try {
      const storedExample = window.sessionStorage.getItem(
        "sastra-playground-example",
      );
      if (!storedExample) return;

      const example: unknown = JSON.parse(storedExample);
      if (!example || typeof example !== "object") return;
      const { code: exampleCode, language: exampleLanguage } = example as {
        code?: unknown;
        language?: unknown;
      };
      if (typeof exampleCode !== "string" || !exampleCode.trim()) return;

      const selected = findPlaygroundLanguage(
        typeof exampleLanguage === "string" ? exampleLanguage : "",
      );
      const timer = window.setTimeout(() => {
        setActiveLabel(selected.label);
        setLanguage(selected.value);
        setActiveColor(selected.color);
        setMode(selected.mode);
        const normalizedExampleCode = normalizeEnglishDigits(exampleCode);
        setCode(normalizedExampleCode);
        setOutput([]);
        setPreviewHtml("");
        editorRef.current?.setValue(normalizedExampleCode);
      }, 0);

      return () => window.clearTimeout(timer);
    } catch {
      // Ignore a malformed or unavailable saved lesson example.
    }
  }, [searchParams]);

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

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Keep VS Code-style suggestions available from Ctrl/Cmd + Space.
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
      editor.trigger("keyboard", "editor.action.triggerSuggest", {});
    });

    // Format shortcuts while the Monaco editor has focus.
    // Java / IntelliJ-style: Ctrl + Alt + L
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Alt | monaco.KeyCode.KeyL,
      () => {
        if (editor.getModel()?.getLanguageId() !== "java") return;
        formatCodeActionRef.current();
      },
    );

    // VS Code-style: Shift + Alt + F
    // Use this for HTML, CSS, JavaScript/Node, Python and Tailwind HTML.
    editor.addCommand(
      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      () => {
        if (editor.getModel()?.getLanguageId() === "java") return;
        formatCodeActionRef.current();
      },
    );

    // ====================================================
    // W3SCHOOLS / VS CODE-LIKE SHORTCUT SNIPPETS
    // ====================================================
    // These are small Emmet-style shortcuts for the playground.
    // Example:
    // HTML: ! + Tab/Enter      -> full HTML document
    // Java: main + Tab/Enter  -> full Main class + main method
    // Java: psvm + Tab/Enter  -> full Main class + main method
    // Java: sout + Tab/Enter  -> System.out.println(...)

    const htmlSnippetProvider = monaco.languages.registerCompletionItemProvider(
      "html",
      {
        triggerCharacters: ["!"],
        provideCompletionItems(
          model: import("monaco-editor").editor.ITextModel,
          position: import("monaco-editor").IPosition,
        ) {
          const word = model.getWordUntilPosition(position);
          const lineBeforeCursor = model
            .getLineContent(position.lineNumber)
            .slice(0, position.column - 1);

          const wordRange = new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          );

          const suggestions: import("monaco-editor").languages.CompletionItem[] =
            [
              {
                label: "html:5",
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: "HTML5 document structure",
                documentation: "Create a complete HTML5 page structure.",
                insertText: [
                  "<!DOCTYPE html>",
                  '<html lang="en">',
                  "<head>",
                  '  <meta charset="UTF-8" />',
                  '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
                  "  <title>${1:Document}</title>",
                  "</head>",
                  "<body>",
                  "  ${0}",
                  "</body>",
                  "</html>",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: wordRange,
                sortText: "0002",
              },
              {
                label: "table",
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: "HTML table",
                insertText: [
                  "<table>",
                  "  <thead>",
                  "    <tr>",
                  "      <th>${1:Heading}</th>",
                  "    </tr>",
                  "  </thead>",
                  "  <tbody>",
                  "    <tr>",
                  "      <td>${2:Data}</td>",
                  "    </tr>",
                  "  </tbody>",
                  "</table>",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: wordRange,
              },
              {
                label: "form",
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: "HTML form",
                insertText: [
                  '<form action="${1:#}" method="${2:post}">',
                  '  <label for="${3:name}">${4:Name}</label>',
                  '  <input id="${3:name}" name="${3:name}" type="text" />',
                  '  <button type="submit">${5:Submit}</button>',
                  "</form>",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: wordRange,
              },
            ];

          // `!` is not a normal word character, so give it a custom range.
          if (/(^|\s)!$/.test(lineBeforeCursor)) {
            suggestions.unshift({
              label: "!",
              kind: monaco.languages.CompletionItemKind.Snippet,
              detail: "HTML5 boilerplate",
              documentation: "Type ! and press Tab or Enter.",
              insertText: [
                "<!DOCTYPE html>",
                '<html lang="en">',
                "<head>",
                '  <meta charset="UTF-8" />',
                '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
                "  <title>${1:Document}</title>",
                "</head>",
                "<body>",
                "  ${0}",
                "</body>",
                "</html>",
              ].join("\n"),
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: new monaco.Range(
                position.lineNumber,
                Math.max(1, position.column - 1),
                position.lineNumber,
                position.column,
              ),
              sortText: "0001",
            });
          }

          return { suggestions };
        },
      },
    );

    const javaSnippetProvider = monaco.languages.registerCompletionItemProvider(
      "java",
      {
        provideCompletionItems(
          model: import("monaco-editor").editor.ITextModel,
          position: import("monaco-editor").IPosition,
        ) {
          const word = model.getWordUntilPosition(position);
          const range = new monaco.Range(
            position.lineNumber,
            word.startColumn,
            position.lineNumber,
            word.endColumn,
          );

          const fullMainClass = [
            "public class Main {",
            "    public static void main(String[] args) {",
            '        ${0:System.out.println("Hello World!");}',
            "    }",
            "}",
          ].join("\n");

          return {
            suggestions: [
              {
                label: "main",
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: "Java Main class + main method",
                documentation: "Create a complete runnable Java Main class.",
                insertText: fullMainClass,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
                sortText: "0001",
              },
              {
                label: "psvm",
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: "Java Main class + main method",
                insertText: fullMainClass,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
                sortText: "0002",
              },
              {
                label: "sout",
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: "System.out.println",
                insertText: 'System.out.println(${1:"Hello World!"});${0}',
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
                sortText: "0003",
              },
              {
                label: "fori",
                kind: monaco.languages.CompletionItemKind.Snippet,
                detail: "Java for loop",
                insertText: [
                  "for (int ${1:i} = 0; ${1:i} < ${2:10}; ${1:i}++) {",
                  "    ${0}",
                  "}",
                ].join("\n"),
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range,
              },
            ],
          };
        },
      },
    );

    // Completion providers are registered globally in Monaco, so clean them
    // up when this editor instance is destroyed to avoid duplicate suggestions.
    editor.onDidDispose(() => {
      htmlSnippetProvider.dispose();
      javaSnippetProvider.dispose();
    });

    // Monaco handles brackets and quotes itself. This adds HTML-style
    // automatic closing tags for HTML and Tailwind HTML documents.
    // IStandaloneCodeEditor does not expose onDidType, so use the
    // supported model-content event and only react when the user inserts ">".
    editor.onDidChangeModelContent((event) => {
      if (!editor.hasTextFocus()) return;

      const typedGreaterThan = event.changes.some((change) =>
        change.text.endsWith(">"),
      );

      if (!typedGreaterThan) return;

      const model = editor.getModel();
      const position = editor.getPosition();

      if (!model || !position || model.getLanguageId() !== "html") return;

      const startLine = Math.max(1, position.lineNumber - 25);
      const textBeforeCursor = model.getValueInRange(
        new monaco.Range(startLine, 1, position.lineNumber, position.column),
      );

      // Ignore comments, declarations, closing tags and self-closing tags.
      if (
        /\/>$/.test(textBeforeCursor) ||
        /<\/[^>]*>$/.test(textBeforeCursor) ||
        /<![^>]*>$/.test(textBeforeCursor)
      ) {
        return;
      }

      // Works for both one-line tags and multi-line opening tags.
      const openingTag = textBeforeCursor.match(
        /<([A-Za-z][\w:-]*)(?:\s[^<>]*?)?>$/,
      );

      if (!openingTag) return;

      const tagName = openingTag[1];

      if (voidHtmlTags.has(tagName.toLowerCase())) return;

      const closingTag = `</${tagName}>`;
      const lineMaxColumn = model.getLineMaxColumn(position.lineNumber);
      const textAfterCursor = model.getValueInRange(
        new monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          Math.min(lineMaxColumn, position.column + closingTag.length),
        ),
      );

      // Avoid creating a duplicate if Monaco/language service already added it.
      if (textAfterCursor.startsWith(closingTag)) return;

      editor.executeEdits("auto-close-html-tag", [
        {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column,
          ),
          text: closingTag,
          forceMoveMarkers: true,
        },
      ]);

      // Put the cursor back between <tag> and </tag>.
      editor.setPosition(position);
    });
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

      const message = getApiErrorMessage(error, "Unable to execute code.");

      setOutput(["Execution failed.", "", message]);
    }
  };

  // ====================================================
  // FORMAT CODE
  // ====================================================

  const handleFormatCode = async () => {
    const editor = editorRef.current;
    const model = editor?.getModel();

    if (!editor || !model) return;

    if (formatStatusTimerRef.current !== null) {
      window.clearTimeout(formatStatusTimerRef.current);
    }

    try {
      const beforeFormat = editor.getValue();
      let monacoFormatted = false;

      // Monaco normally has document formatters for HTML, CSS and JavaScript.
      // Try its formatter first because it understands those languages better.
      if (
        activeLabel === "HTML" ||
        activeLabel === "CSS" ||
        activeLabel === "JavaScript" ||
        activeLabel === "Node.js" ||
        activeLabel === "Tailwind CSS"
      ) {
        const formatAction = editor.getAction("editor.action.formatDocument");

        if (formatAction) {
          try {
            await formatAction.run();
            monacoFormatted = editor.getValue() !== beforeFormat;
          } catch {
            // A standalone Monaco build may not have a formatter for every
            // language. The fallback below handles that case.
          }
        }
      }

      // Always run our cleanup for HTML/Tailwind after Monaco because Monaco
      // can leave short text nodes split across lines (for example <h1>).
      // Java/Python depend on our formatter. For CSS/JS/Node, use the fallback
      // only when Monaco did not provide a document formatter.
      const shouldRunCleanup =
        activeLabel === "HTML" ||
        activeLabel === "Tailwind CSS" ||
        activeLabel === "Java" ||
        activeLabel === "Python" ||
        !monacoFormatted;

      if (shouldRunCleanup) {
        const currentCode = editor.getValue();
        const formattedCode = formatPlaygroundCode(activeLabel, currentCode);

        if (formattedCode !== currentCode) {
          editor.pushUndoStop();
          editor.executeEdits("format-code", [
            {
              range: model.getFullModelRange(),
              text: formattedCode,
              forceMoveMarkers: true,
            },
          ]);
          editor.pushUndoStop();
        }
      }

      const nextCode = normalizeEnglishDigits(editor.getValue());
      setCode(nextCode);
      setFormatStatus("formatted");
      editor.focus();
    } catch (error) {
      console.error("Code formatting failed:", error);
      setFormatStatus("error");
    }

    formatStatusTimerRef.current = window.setTimeout(() => {
      setFormatStatus("idle");
      formatStatusTimerRef.current = null;
    }, 2000);
  };

  // Keep Monaco's keyboard shortcuts connected to the newest handler/state.
  useEffect(() => {
    formatCodeActionRef.current = () => {
      void handleFormatCode();
    };
  });

  // ====================================================
  // COPY
  // ====================================================

  const handleCopy = async () => {
    const currentCode = editorRef.current?.getValue() ?? code;

    if (copyStatusTimerRef.current !== null) {
      window.clearTimeout(copyStatusTimerRef.current);
    }

    try {
      await navigator.clipboard.writeText(currentCode);
      setCopyStatus("copied");
    } catch (error) {
      console.error("Copy failed:", error);
      setCopyStatus("error");
    }

    copyStatusTimerRef.current = window.setTimeout(() => {
      setCopyStatus("idle");
      copyStatusTimerRef.current = null;
    }, 2000);
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
  // DRAG THE FLOATING AI COACH BUTTON
  // ====================================================

  const handleCoachPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    coachDragInfo.current = {
      dragging: true,
      moved: false,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      lastX: rect.left,
      lastY: rect.top,
    };
    setCoachSnapping(false);

    const handleMove = (moveEvent: PointerEvent) => {
      if (!coachDragInfo.current.dragging) return;
      coachDragInfo.current.moved = true;

      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      const nextX = Math.min(
        Math.max(moveEvent.clientX - coachDragInfo.current.offsetX, 0),
        maxX,
      );
      const nextY = Math.min(
        Math.max(moveEvent.clientY - coachDragInfo.current.offsetY, 0),
        maxY,
      );

      coachDragInfo.current.lastX = nextX;
      coachDragInfo.current.lastY = nextY;
      setCoachPos({ x: nextX, y: nextY });
    };

    const handleUp = () => {
      coachDragInfo.current.dragging = false;
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);

      if (coachDragInfo.current.moved) {
        const { lastX, lastY } = coachDragInfo.current;

        const distLeft = lastX;
        const distRight = window.innerWidth - (lastX + rect.width);
        const distTop = lastY;
        const distBottom = window.innerHeight - (lastY + rect.height);
        const closest = Math.min(distLeft, distRight, distTop, distBottom);

        let snappedX = lastX;
        let snappedY = lastY;

        if (closest === distLeft) {
          snappedX = COACH_EDGE_MARGIN;
        } else if (closest === distRight) {
          snappedX = window.innerWidth - rect.width - COACH_EDGE_MARGIN;
        } else if (closest === distTop) {
          snappedY = COACH_EDGE_MARGIN;
        } else {
          snappedY = window.innerHeight - rect.height - COACH_EDGE_MARGIN;
        }

        // Step over the Scroll-to-Top button if they would land on each other
        const scrollBtnRect = getScrollButtonRect();
        if (scrollBtnRect) {
          const gap = 12;
          const wouldOverlap =
            snappedX < scrollBtnRect.right + gap &&
            snappedX + rect.width > scrollBtnRect.left - gap &&
            snappedY < scrollBtnRect.bottom + gap &&
            snappedY + rect.height > scrollBtnRect.top - gap;

          if (wouldOverlap) {
            const spaceAbove = scrollBtnRect.top - gap - rect.height;
            snappedY = spaceAbove >= 0 ? spaceAbove : scrollBtnRect.bottom + gap;
          }
        }

        setCoachSnapping(true);
        setCoachPos({ x: snappedX, y: snappedY });

        window.setTimeout(() => setCoachSnapping(false), 300);
      }
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
  };

  // ====================================================
  // APPLY AI GENERATED CODE
  // ====================================================

  const handleApplyCoachCode = (nextCode: string) => {
    const normalizedCode = normalizeEnglishDigits(nextCode);
    setCode(normalizedCode);
    editorRef.current?.setValue(normalizedCode);
    editorRef.current?.focus();

    window.setTimeout(() => {
      editorRef.current?.layout();
    }, 0);
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

  const togglePreviewFullscreen = () => {
    setIsPreviewFullscreen((previous) => !previous);
  };

  const toggleWorkspaceFullscreen = async () => {
    try {
      if (document.fullscreenElement === workspaceRef.current) {
        await document.exitFullscreen();
        return;
      }

      await workspaceRef.current?.requestFullscreen();
    } catch (error) {
      console.error("Unable to toggle workspace fullscreen:", error);
    }
  };

  // ====================================================
  // ZOOM
  // ====================================================

  const zoom = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    direction: 1 | -1,
  ) => {
    setter((previous) => Math.min(28, Math.max(10, previous + direction)));
  };

  const zoomResult = (direction: 1 | -1) => {
    setResultZoom((previous) =>
      Math.min(200, Math.max(50, previous + direction * 10)),
    );
  };

  const resultScale = resultZoom / 100;
  const resultScaledSize = `${100 / resultScale}%`;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-screen  px-3 pb-10 pt-5 font-sans text-slate-900 transition-colors duration-300  dark:text-slate-100 sm:px-5 lg:px-7">
      {copyStatus !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-5 top-5 z-100 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-sm transition-all ${copyStatus === "copied"
            ? "border-emerald-200 bg-white/95 text-emerald-700 dark:border-emerald-700/60 dark:bg-slate-900/95 dark:text-emerald-400"
            : "border-red-200 bg-white/95 text-red-700 dark:border-red-800 dark:bg-slate-900/95 dark:text-red-400"
            }`}
        >
          {copyStatus === "copied" ? (
            <Check className="h-5 w-5" />
          ) : (
            <CircleAlert className="h-5 w-5" />
          )}
          <span>
            {copyStatus === "copied"
              ? "Code copied to clipboard"
              : "Unable to copy code"}
          </span>
        </div>
      )}
      {/* <div className="mx-auto mb-4 flex max-w-[1800px] flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-[#0d1320] sm:flex-row sm:items-center sm:justify-between">
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
      </div> */}

      <div
        ref={workspaceRef}
        className={
          isWorkspaceFullscreen
            ? "relative flex h-screen w-screen flex-col overflow-hidden bg-white text-slate-900 dark:bg-[#0d1320] dark:text-slate-100"
            : "mx-auto max-w-[1800px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-[#0d1320] dark:shadow-black/30"
        }
      >
        {/* ================================================= */}
        {/* LANGUAGE TABS */}
        {/* ================================================= */}

        <div className="no-scrollbar flex shrink-0 items-center gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50/80 px-3 py-2 dark:border-white/10 dark:bg-[#0a0f1a]">
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
                className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-all ${isActive
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
                    className={`ml-1 text-[9px] font-bold uppercase ${isActive ? "opacity-70" : "text-emerald-500"
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

        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10">
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

            {/* Editor Theme */}

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Theme:
              </span>
              <select
                value={editorTheme}
                onChange={(event) =>
                  setEditorTheme(event.target.value as EditorTheme)
                }
                className="bg-transparent text-xs font-medium text-slate-700 outline-none dark:text-slate-200"
                aria-label="Editor theme"
              >
                {editorThemes.map((themeOption) => (
                  <option
                    key={themeOption.value}
                    value={themeOption.value}
                    className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {themeOption.label}
                  </option>
                ))}
              </select>
            </div>

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

            {/* Result / Output Zoom */}

            {isPreviewMode ? (
              <div className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 dark:border-slate-800">
                <span className="pr-1 text-xs text-slate-500 dark:text-slate-400">
                  Result:
                </span>

                <button
                  type="button"
                  onClick={() => zoomResult(-1)}
                  className="rounded p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label="Zoom result out"
                  title="Zoom result out"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>

                <span className="w-12 text-center text-xs text-slate-700 dark:text-slate-300">
                  {resultZoom}%
                </span>

                <button
                  type="button"
                  onClick={() => zoomResult(1)}
                  className="rounded p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  aria-label="Zoom result in"
                  title="Zoom result in"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
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
              className={`flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-300 ${showLineNumbers
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
              className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              title="Editor only fullscreen"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => void toggleWorkspaceFullscreen()}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${isWorkspaceFullscreen
                ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              title="Fullscreen code and result together"
            >
              <Columns2 className="h-3.5 w-3.5" />
              {isWorkspaceFullscreen ? "Exit workspace" : "Code + Result"}
            </button>
          </div>

          {/* ================================================= */}
          {/* ACTION BUTTONS */}
          {/* ================================================= */}

          <div className="flex flex-wrap items-center gap-2">
            {/* {isWorkspaceFullscreen && (
              <Button
                type="button"
                variant="outline"
                onClick={() => void toggleWorkspaceFullscreen()}
                className="h-10 gap-2 rounded-xl"
              >
                <Minimize2 className="h-4 w-4" />
                Exit Fullscreen
              </Button>
            )} */}

            {/* Format Code */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => void handleFormatCode()}
              title={
                activeLabel === "Java"
                  ? "Format code (Ctrl + Alt + L)"
                  : "Format code (Shift + Alt + F)"
              }
            >
              {formatStatus === "formatted" ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <AlignLeft className="h-4 w-4 text-gray-600" />
              )}
              {formatStatus === "formatted" ? "Formatted!" : "Format Code"}
            </Button>

            {/* Copy */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={handleCopy}
            >
              {copyStatus === "copied" ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4 text-gray-600" />
              )}
              {copyStatus === "copied" ? "Copied!" : "Copy"}
            </Button>

            {/* Download */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 text-gray-600" />
              Download
            </Button>

            {/* Reset */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 text-gray-600" />
              Reset
            </Button>

            {/* Clear Editor */}

            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
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
                className="h-10 gap-2 rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
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

        {shouldShowStdin && (
          <div
            className={
              isWorkspaceFullscreen
                ? "shrink-0 border-b border-slate-200 px-4 py-2 dark:border-white/10"
                : "px-4 pt-4"
            }
          >
            <div
              className={
                isWorkspaceFullscreen
                  ? "flex items-center gap-3"
                  : "rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-[#0a0f1a]"
              }
            >
              <div
                className={
                  isWorkspaceFullscreen
                    ? "flex shrink-0 items-center gap-2"
                    : "mb-2 flex items-center justify-between"
                }
              >
                <label
                  htmlFor="stdin"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                  Standard Input (stdin)
                </label>

                {!isWorkspaceFullscreen && (
                  <button
                    type="button"
                    onClick={() => setStdin("")}
                    className="text-xs text-slate-500 transition-colors hover:text-red-500"
                  >
                    Clear
                  </button>
                )}
              </div>

              <textarea
                id="stdin"
                value={stdin}
                onChange={(event) =>
                  setStdin(normalizeEnglishDigits(event.target.value))
                }
                placeholder="Enter input for your program..."
                className={
                  isWorkspaceFullscreen
                    ? "h-9 min-w-0 flex-1 resize-none rounded-lg border border-slate-200 bg-white px-3 font-mono text-sm text-slate-800 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                    : "min-h-20 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 font-mono text-sm text-slate-800 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                }
              />
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* EDITOR + PREVIEW/OUTPUT */}
        {/* ================================================= */}

        <div
          className={
            isWorkspaceFullscreen
              ? "grid min-h-0 flex-1 grid-cols-1 gap-0 lg:grid-cols-2"
              : "grid gap-4 p-4 lg:grid-cols-2"
          }
        >
          {/* ================================================= */}
          {/* MONACO EDITOR */}
          {/* ================================================= */}

          <div
            dir="ltr"
            className={
              isFullscreen
                ? "fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950"
                : isWorkspaceFullscreen
                  ? "min-h-0 flex flex-col overflow-hidden border-r border-slate-200 bg-white dark:border-white/10 dark:bg-[#0a0f1a]"
                  : "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0a0f1a]"
            }
          >
            {/* Editor Header */}

            <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 text-slate-800 dark:border-white/10 dark:bg-[#111827] dark:text-slate-200">
              <div className="flex items-center gap-2.5">
                <Code2 className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-[0.14em]">
                  Editor
                </span>

                {/* Language Badge matched to Run button size */}
                <span
                  className="inline-flex h-8 items-center justify-center rounded-lg px-4 text-xs font-bold shadow-sm"
                  style={{
                    backgroundColor: activeColor,
                    color: activeTextColor,
                  }}
                >
                  {activeLabel}
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                {!isPreviewMode && (
                  /* Scaled-up Run Button (h-8 = 32px tall inside 44px header) */
                  <button
                    type="button"
                    onClick={handleRun}
                    disabled={isRunning}
                    style={{
                      backgroundColor: activeColor,
                      color: activeTextColor,
                    }}
                    className="flex h-8 items-center gap-1.5 rounded-lg px-4 text-xs font-bold shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    {isRunning ? "Running..." : "Run"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-md p-1.5 transition hover:bg-slate-200/70 dark:hover:bg-white/10"
                  title={copyStatus === "copied" ? "Copied!" : "Copy code"}
                  aria-label={
                    copyStatus === "copied" ? "Code copied" : "Copy code"
                  }
                >
                  {copyStatus === "copied" ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4 transition-colors hover:text-slate-900 dark:hover:text-white" />
                  )}
                </button>

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

            <div
              className={
                isFullscreen || isWorkspaceFullscreen ? "min-h-0 flex-1" : ""
              }
            >
              <MonacoEditor
                height={
                  isFullscreen || isWorkspaceFullscreen ? "100%" : "500px"
                }
                language={language}
                value={code}
                onChange={(value) => {
                  const nextValue = normalizeEnglishDigits(value ?? "");
                  setCode(nextValue);
                }}
                onMount={handleEditorMount}
                theme={resolvedEditorTheme}
                options={{
                  fontSize: editorFontSize,

                  // Always show standard Latin/ASCII digits: 1, 2, 3...
                  // This prevents Khmer localized numerals from appearing in the gutter.
                  lineNumbers: showLineNumbers
                    ? (lineNumber) => String(lineNumber)
                    : "off",
                  lineNumbersMinChars: 3,

                  fontFamily:
                    "Cascadia Code, JetBrains Mono, Consolas, Monaco, monospace",
                  fontLigatures: true,

                  minimap: {
                    enabled: true,
                    showSlider: "mouseover",
                    renderCharacters: false,
                  },

                  scrollBeyondLastLine: false,

                  wordWrap: "on",

                  automaticLayout: true,

                  padding: {
                    top: 16,
                  },

                  tabSize: 2,

                  insertSpaces: true,

                  // VS Code-like IntelliSense and editing behavior.
                  quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true,
                  },
                  wordBasedSuggestions: "currentDocument",
                  suggestOnTriggerCharacters: true,
                  acceptSuggestionOnEnter: "on",
                  tabCompletion: "on",
                  snippetSuggestions: "inline",
                  parameterHints: { enabled: true },
                  suggest: {
                    preview: true,
                    showWords: true,
                    showSnippets: true,
                    showFunctions: true,
                    showMethods: true,
                    showClasses: true,
                    showProperties: true,
                    showVariables: true,
                  },

                  // Automatic pairs / formatting.
                  autoClosingBrackets: "always",
                  autoClosingQuotes: "always",
                  autoClosingDelete: "always",
                  autoClosingOvertype: "always",
                  autoSurround: "languageDefined",
                  autoIndent: "full",
                  formatOnPaste: true,
                  formatOnType: true,
                  linkedEditing: true,
                  matchBrackets: "always",

                  // VS Code-like navigation and visuals.
                  bracketPairColorization: { enabled: true },
                  guides: {
                    bracketPairs: true,
                    indentation: true,
                  },
                  stickyScroll: { enabled: true },
                  renderWhitespace: "selection",
                  renderLineHighlight: "all",
                  occurrencesHighlight: "singleFile",
                  selectionHighlight: true,
                  folding: true,
                  showFoldingControls: "mouseover",
                  mouseWheelZoom: true,
                  contextmenu: true,

                  smoothScrolling: true,
                  cursorBlinking: "smooth",
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

                <div
                  className={
                    isWorkspaceFullscreen
                      ? "min-h-0 flex flex-col overflow-hidden bg-white dark:bg-[#0a0f1a]"
                      : "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0a0f1a]"
                  }
                >
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

                    <div className="flex items-center gap-2">
                      <span
                        className="rounded-md px-2 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: activeColor,

                          color: activeTextColor,
                        }}
                      >
                        {activeLabel}
                      </span>
                      <button
                        type="button"
                        onClick={togglePreviewFullscreen}
                        className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        aria-label="Open preview fullscreen"
                        title="Open preview fullscreen"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Live iframe */}

                  {previewHtml ? (
                    <div
                      className={
                        isWorkspaceFullscreen
                          ? "min-h-0 flex-1 overflow-auto bg-white"
                          : "h-125 overflow-auto bg-white"
                      }
                    >
                      <iframe
                        title={`${activeLabel} Live Preview`}
                        srcDoc={previewHtml}
                        sandbox="allow-scripts allow-modals"
                        className="block border-0 bg-white"
                        style={{
                          width: resultScaledSize,
                          height: resultScaledSize,
                          minHeight: isWorkspaceFullscreen ? "100%" : "500px",
                          transform: `scale(${resultScale})`,
                          transformOrigin: "top left",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className={
                        isWorkspaceFullscreen
                          ? "flex min-h-0 flex-1 items-center justify-center bg-white dark:bg-slate-950"
                          : "flex h-125 items-center justify-center bg-white dark:bg-slate-950"
                      }
                    >
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

                <div
                  className={
                    isWorkspaceFullscreen
                      ? "min-h-0 flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0a0f1a]"
                      : "overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#0a0f1a]"
                  }
                >
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
                    className={
                      isWorkspaceFullscreen
                        ? "min-h-0 flex-1 space-y-1 overflow-y-auto bg-white p-4 font-mono transition-colors duration-300 dark:bg-[#090d16]"
                        : "h-125 space-y-1 overflow-y-auto bg-white p-4 font-mono transition-colors duration-300 dark:bg-[#090d16]"
                    }
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

        {/* ================================================= */}
        {/* FLOATING AI COACH (icon trigger -> action list) */}
        {/* ================================================= */}

        {isAiCoachOpen && (
          <aside
            className={
              isWorkspaceFullscreen
                ? "fixed bottom-20 right-4 left-4 z-90 max-h-[calc(100vh-7rem)] overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-2xl shadow-black/20 dark:border-violet-900/70 dark:bg-[#0b1020] sm:left-auto sm:w-97.5"
                : "fixed bottom-24 right-4 left-4 z-90 max-h-[70vh] overflow-hidden rounded-2xl border border-violet-200 bg-white shadow-2xl shadow-black/20 dark:border-violet-900/70 dark:bg-[#0b1020] sm:left-auto sm:w-97.5"
            }
            aria-label="AI coding coach"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-[#0b1020]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Sastra AI Coach
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {codingTaskId
                      ? "Hints, explain, improve, and fix your code."
                      : "Explain and improve your code."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAiCoachOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close AI coach"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              className={
                isWorkspaceFullscreen
                  ? "max-h-[calc(100vh-12rem)] overflow-y-auto p-3"
                  : "max-h-[calc(70vh-4rem)] overflow-y-auto p-3"
              }
            >
              <CodeCoach
                code={code}
                language={language}
                codingTaskId={codingTaskId}
                compact
                onApplyCode={handleApplyCoachCode}
              />
            </div>
          </aside>
        )}

        <div
          className="fixed z-91 touch-none cursor-grab active:cursor-grabbing"
          style={{
            ...(coachPos
              ? { left: coachPos.x, top: coachPos.y }
              : { bottom: "1.25rem", right: "6rem" }),
            transition: coachSnapping
              ? "left 0.3s ease, top 0.3s ease"
              : "none",
          }}
          onPointerDown={handleCoachPointerDown}
        >
          {!isAiCoachOpen && (
            <span className="absolute inset-0 animate-ping rounded-full bg-violet-500 opacity-40" />
          )}

          <button
            type="button"
            onClick={() => {
              if (!coachDragInfo.current.moved) {
                setIsAiCoachOpen((previous) => !previous);
              }
            }}
            className="relative inline-flex h-12 items-center gap-2 rounded-full bg-violet-600 px-4 text-sm font-bold text-white shadow-xl shadow-violet-950/25 transition hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-violet-300/40"
            aria-expanded={isAiCoachOpen}
            aria-label="Open AI coding coach"
            title="AI Coach: hints, explanation, improvements, and fixes"
          >
            {isAiCoachOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <span className="relative -ml-1 flex items-center">
                <Image
                  src="/home/image/aiCoachRobot.png"
                  alt="AI Coach"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain drop-shadow"
                />
                <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
              </span>
            )}
            <span className="hidden sm:inline">
              {isAiCoachOpen ? "Close Coach" : "AI Coach"}
            </span>
          </button>
        </div>
      </div>

      {isPreviewFullscreen && isPreviewMode && (
        <div className="fixed inset-0 z-70 flex flex-col bg-white dark:bg-slate-950">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-white/10 dark:bg-[#111827] sm:px-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                {activeLabel} Live Preview
              </span>
            </div>
            <button
              type="button"
              onClick={togglePreviewFullscreen}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Minimize2 className="h-4 w-4" />
              Exit fullscreen
            </button>
          </div>
          {previewHtml ? (
            <div className="min-h-0 flex-1 overflow-auto bg-white">
              <iframe
                title={`${activeLabel} Fullscreen Live Preview`}
                srcDoc={previewHtml}
                sandbox="allow-scripts allow-modals"
                className="block border-0 bg-white"
                style={{
                  width: resultScaledSize,
                  height: resultScaledSize,
                  minHeight: "100%",
                  transform: `scale(${resultScale})`,
                  transformOrigin: "top left",
                }}
              />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center bg-white px-6 text-center dark:bg-slate-950">
              <p className="text-slate-500 dark:text-slate-400">
                Start typing to see the live preview.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}