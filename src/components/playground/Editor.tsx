"use client";

import { useState, useRef, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

const languages = [
  { label: "HTML", value: "html", color: "#E34F26" },
  { label: "CSS", value: "css", color: "#2965F1" },
  { label: "JavaScript", value: "javascript", color: "#F0DB4F" },
  { label: "React", value: "javascript", color: "#61DAFB" },
  { label: "PHP", value: "php", color: "#777BB4" },
  { label: "Node.js", value: "javascript", color: "#3C873A" },
  { label: "Tailwind CSS", value: "css", color: "#38BDF8" },
  { label: "C", value: "c", color: "#A8B9CC" },
  { label: "C++", value: "cpp", color: "#00599C" },
  { label: "Python", value: "python", color: "#3776AB" },
  { label: "Java", value: "java", color: "#EA2D2E" },
  { label: "C#", value: "csharp", color: "#9B4F96" },
  { label: "Kotlin", value: "kotlin", color: "#7F52FF" },
];

const defaultCode = `def greet_developer(name):
  # Welcome message in Khmer
  message = "សូស្តី " + name + "! ចាប់ផ្តើមសរសេរកូដជាមួយ SastraCode"
  return message

user_input = input("បញ្ចូលឈ្មោះរបស់អ្នក: ")
print(greet_developer(user_input))
`;

// Fallback color for languages not in the map above (safety net)
const DEFAULT_COLOR = "#3776AB";

export default function Editor() {
  const [code, setCode] = useState(defaultCode);
  const [activeLabel, setActiveLabel] = useState("Python");
  const [activeColor, setActiveColor] = useState(DEFAULT_COLOR);
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [editorFontSize, setEditorFontSize] = useState(14);
  const [outputFontSize, setOutputFontSize] = useState(13);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [outputAnchor, setOutputAnchor] = useState<"Top" | "Bottom">("Bottom");

  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkDarkMode = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!outputRef.current) return;
    if (outputAnchor === "Bottom") {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, outputAnchor]);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleSelectLanguage = (
    label: string,
    value: string,
    color: string,
  ) => {
    setActiveLabel(label);
    setLanguage(value);
    setActiveColor(color);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(["Compiling..."]);
    setTimeout(() => {
      setOutput([
        "Compiling...",
        "Success! Output:",
        "សូស្តី Khmer Coder! ចាប់ផ្តើមសរសេរកូដជាមួយ ChhabKodu",
        "",
        "Process finished with exit code 0",
      ]);
      setIsRunning(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorRef.current?.getValue() ?? code);
  };

  const handleDownload = () => {
    const blob = new Blob([editorRef.current?.getValue() ?? code], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `main.${language === "python" ? "py" : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setCode(defaultCode);
    editorRef.current?.setValue(defaultCode);
  };

  const handleClearEditor = () => {
    setCode("");
    editorRef.current?.setValue("");
  };

  const handleClearOutput = () => setOutput([]);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setTimeout(() => editorRef.current?.layout(), 50);
  };

  const zoom = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    dir: 1 | -1,
  ) => setter((prev) => Math.min(28, Math.max(10, prev + dir)));

  const activeTextColor = activeColor === "#F0DB4F" ? "#0f172a" : "#ffffff";

  return (
    <div className="transition-colors duration-300 bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      {/* TEMP TEST MARKER - remove once we confirm this file is rendering */}
      {/* <h1 style={{ color: "red", fontSize: "40px" }}>
        TEST 123 - IS THIS SHOWING?
      </h1> */}

      {/* Language tabs */}
      <div className="flex items-center gap-1 pb-3 overflow-x-auto no-scrollbar">
        {languages.map((lang) => {
          const isActive = activeLabel === lang.label;
          const dotColor = isActive ? activeTextColor : lang.color;

          return (
            <button
              key={lang.label}
              onClick={() =>
                handleSelectLanguage(lang.label, lang.value, lang.color)
              }
              style={
                isActive
                  ? { backgroundColor: lang.color, color: activeTextColor }
                  : undefined
              }
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? ""
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: dotColor }}
              />
              {lang.label}
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 py-3 border-y border-slate-200 dark:border-slate-800 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: activeColor, color: activeTextColor }}
          >
            {activeLabel} Lab
          </span>

          <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 pr-1">
              Editor:
            </span>
            <button
              onClick={() => zoom(setEditorFontSize, -1)}
              className="p-1 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs w-8 text-center text-slate-700 dark:text-slate-300">
              {editorFontSize}px
            </span>
            <button
              onClick={() => zoom(setEditorFontSize, 1)}
              className="p-1 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 pr-1">
              Output:
            </span>
            <button
              onClick={() => zoom(setOutputFontSize, -1)}
              className="p-1 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-xs w-8 text-center text-slate-700 dark:text-slate-300">
              {outputFontSize}px
            </span>
            <button
              onClick={() => zoom(setOutputFontSize, 1)}
              className="p-1 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={() => setShowLineNumbers((p) => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 ${
              showLineNumbers
                ? "bg-slate-100 dark:bg-slate-800"
                : "text-slate-500"
            }`}
          >
            <ListOrdered className="h-3.5 w-3.5" />
            Line
          </button>

          <button
            onClick={() =>
              setOutputAnchor((p) => (p === "Bottom" ? "Top" : "Bottom"))
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {outputAnchor === "Bottom" ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5" />
            )}
            {outputAnchor}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            style={{ backgroundColor: activeColor, color: activeTextColor }}
            className="gap-2 hover:opacity-90"
          >
            <Play className="h-4 w-4" />
            Run
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleClearEditor}
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleClearOutput}
          >
            <Eraser className="h-4 w-4" />
            Clear Output
          </Button>
        </div>
      </div>

      {/* Editor + Console grid */}
      <div className="grid lg:grid-cols-2 gap-4 pt-4">
        {/* Code editor panel */}
        <div
          className={
            isFullscreen
              ? "fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col"
              : "border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm"
          }
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 shrink-0">
            <span className="text-sm font-semibold tracking-wide">EDITOR</span>
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <Copy
                className="h-4 w-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                onClick={handleCopy}
              />
              {isFullscreen ? (
                <Minimize2
                  className="h-4 w-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                  onClick={toggleFullscreen}
                />
              ) : (
                <Maximize2
                  className="h-4 w-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                  onClick={toggleFullscreen}
                />
              )}
              {isFullscreen && (
                <X
                  className="h-5 w-5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors"
                  onClick={toggleFullscreen}
                />
              )}
            </div>
          </div>
          <div className={isFullscreen ? "flex-1" : ""}>
            <MonacoEditor
              height={isFullscreen ? "100%" : "500px"}
              language={language}
              value={code}
              onChange={(value) => setCode(value ?? "")}
              onMount={handleEditorMount}
              theme={isDarkMode ? "vs-dark" : "vs"}
              options={{
                fontSize: editorFontSize,
                lineNumbers: showLineNumbers ? "on" : "off",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
                padding: { top: 16 },
              }}
            />
          </div>
        </div>

        {/* Console output panel */}
        {!isFullscreen && (
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-950 text-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/50">
              <span className="text-sm font-semibold tracking-wide text-slate-300">
                CONSOLE OUTPUT
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    outputRef.current?.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-xs flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <ChevronUp className="h-3.5 w-3.5" /> Top
                </button>
                <button
                  onClick={() =>
                    outputRef.current?.scrollTo({
                      top: outputRef.current.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                  className="text-xs flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <ChevronDown className="h-3.5 w-3.5" /> Bottom
                </button>
              </div>
            </div>
            <div
              ref={outputRef}
              style={{ fontSize: outputFontSize }}
              className="h-125 p-4 font-mono space-y-1 overflow-y-auto"
            >
              {output.length === 0 ? (
                <p className="text-slate-500">
                  Click &quot;Run&quot; to see output here.
                </p>
              ) : (
                output.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line === "Success! Output:"
                        ? "text-emerald-400 font-semibold"
                        : line.startsWith("Process finished")
                          ? "text-slate-500"
                          : line.includes("Compiling")
                            ? "text-slate-400"
                            : "text-rose-400"
                    }
                  >
                    {line}
                  </p>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}