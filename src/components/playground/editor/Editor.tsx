"use client";

import { useState, useRef } from "react";
import { Play, Copy, Maximize2, Minimize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

const languages = [
  { label: "Python 3.10", value: "python" },
  { label: "JavaScript", value: "javascript" },
  { label: "Java", value: "java" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
];

const defaultCode = `def greet_developer(name):
  # Welcome message in Khmer
  message = "សូស្តី " + name + "! ចាប់ផ្តើមសរសេរកូដជាមួយ SastraCode"
  return message

user_input = input("បញ្ចូលឈ្មោះរបស់អ្នក: ")
print(greet_developer(user_input))
`;

export default function Editor() {
  const [code, setCode] = useState(defaultCode);
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(["Compiling..."]);

    const currentCode = editorRef.current?.getValue() ?? code;

    // Placeholder — replace with real API call to your code execution backend
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

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    // Monaco needs a nudge to re-measure its container after the layout changes
    setTimeout(() => editorRef.current?.layout(), 50);
  };

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm font-medium bg-white"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2 text-sm bg-muted">
            <span>main.py</span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className="gap-2 bg-primary-color hover:bg-primary-color"
          >
            <Play className="h-4 w-4" />
            Run
          </Button>
          <Button variant="outline">Compile</Button>
          <Button variant="outline">Save</Button>
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor + Console grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Code editor panel */}
        <div
          className={
            isFullscreen
              ? "fixed inset-0 z-50 bg-white flex flex-col"
              : "border border-border rounded-xl overflow-hidden bg-white"
          }
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted shrink-0">
            <span className="text-sm font-semibold tracking-wide">EDITOR</span>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Copy
                className="h-4 w-4 cursor-pointer hover:text-foreground"
                onClick={handleCopy}
              />
              {isFullscreen ? (
                <Minimize2
                  className="h-4 w-4 cursor-pointer hover:text-foreground"
                  onClick={toggleFullscreen}
                />
              ) : (
                <Maximize2
                  className="h-4 w-4 cursor-pointer hover:text-foreground"
                  onClick={toggleFullscreen}
                />
              )}
              {isFullscreen && (
                <X
                  className="h-5 w-5 cursor-pointer hover:text-foreground"
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
              theme="vs"
              options={{
                fontSize: 14,
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

        {/* Console output panel — hidden while editor is fullscreen */}
        {!isFullscreen && (
          <div className="border border-border rounded-xl overflow-hidden bg-slate-950 text-white">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
              <span className="text-sm font-semibold tracking-wide">
                CONSOLE OUTPUT
              </span>
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="h-[500px] p-4 font-mono text-sm space-y-1 overflow-y-auto">
              {output.length === 0 ? (
                <p className="text-slate-500">Click "Run" to see output here.</p>
              ) : (
                output.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line === "Success! Output:"
                        ? "text-green-400 font-semibold"
                        : line.startsWith("Process finished")
                        ? "text-slate-500"
                        : line.includes("Compiling")
                        ? "text-slate-400"
                        : "text-red-400"
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