"use client";

import Editor from "@monaco-editor/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CircleHelp,
  Lightbulb,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  RefreshCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

const starterCode = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My first card</title>
    <style>
      body { font-family: sans-serif; padding: 32px; background: #f4f7fb; }
      .card { padding: 24px; border-radius: 16px; background: white; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Hello, SastraCode!</h1>
      <p>I built this with HTML.</p>
    </div>
  </body>
</html>`;

export default function ExerciseWorkspace() {
  const [code, setCode] = useState(starterCode);
  const [preview, setPreview] = useState(starterCode);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [instructionsCollapsed, setInstructionsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "tests">("preview");
  const [botPosition, setBotPosition] = useState<{ x: number; y: number } | null>(null);
  const botDrag = useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0, moved: false });
  const suppressBotClick = useRef(false);

  const runCode = () => {
    setPreview(code);
    setActiveTab("preview");
  };

  const handleBotPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    botDrag.current = {
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    };
    setBotPosition({ x: rect.left, y: rect.top });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleBotPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const distance = Math.hypot(
      event.clientX - botDrag.current.startX,
      event.clientY - botDrag.current.startY,
    );
    if (distance > 4) botDrag.current.moved = true;

    const size = event.currentTarget.offsetWidth;
    const edgeGap = 8;
    setBotPosition({
      x: Math.min(Math.max(edgeGap, event.clientX - botDrag.current.offsetX), window.innerWidth - size - edgeGap),
      y: Math.min(Math.max(edgeGap, event.clientY - botDrag.current.offsetY), window.innerHeight - size - edgeGap),
    });
  };

  const handleBotPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    suppressBotClick.current = botDrag.current.moved;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-7rem)] flex-col overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="flex min-h-14 items-center gap-3 border-b border-slate-200 px-4 pt-3 pb-2 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setInstructionsOpen(true)}
          className="rounded-lg border border-slate-200 p-2 md:hidden dark:border-slate-700"
          aria-label="Open exercise instructions"
        >
          <Menu className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Link
              href="/documentation/lessons/html-elements"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="size-3.5" /> HTML Elements
            </Link>
            <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              Coding exercise
            </span>
          </div>
          <h1 className="mt-1.5 truncate text-lg font-extrabold leading-tight sm:text-xl">Build a semantic profile card</h1>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <div className={`relative hidden shrink-0 overflow-hidden border-r border-slate-200 bg-white transition-[width] duration-300 md:block dark:border-slate-800 dark:bg-slate-900 ${instructionsCollapsed ? "w-14" : "w-72"}`}>
          <button
            type="button"
            onClick={() => setInstructionsCollapsed((collapsed) => !collapsed)}
            className={`absolute top-3 z-10 inline-flex rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 ${instructionsCollapsed ? "left-2.5" : "right-3"}`}
            aria-label={instructionsCollapsed ? "Show exercise instructions" : "Hide exercise instructions"}
            title={instructionsCollapsed ? "Show problem" : "Minimize problem"}
          >
            {instructionsCollapsed ? <PanelLeftOpen className="size-5" /> : <PanelLeftClose className="size-5" />}
          </button>
          <ExerciseInstructions className={`h-full w-72 transition-opacity duration-200 ${instructionsCollapsed ? "pointer-events-none opacity-0" : "opacity-100"}`} />
        </div>

        <section className="flex min-w-0 flex-1 flex-col bg-white dark:bg-slate-950">
          <div className="flex h-13 items-center justify-end border-b border-slate-200 px-3 dark:border-slate-800">
            <div className="flex gap-2">
              <div className="hidden items-center gap-1.5 px-2 text-xs text-slate-500 sm:flex dark:text-slate-400">
                <CheckCircle2 className="size-4 text-emerald-500" /> Saved locally
              </div>
              <button
                type="button"
                onClick={() => setCode(starterCode)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <RefreshCcw className="size-4" /><span className="hidden sm:inline">Reset</span>
              </button>
              <button
                type="button"
                onClick={runCode}
                className="inline-flex items-center gap-2 rounded-lg bg-[#002455] px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-900"
              >
                <Play className="size-4 fill-current" /> Run
              </button>
            </div>
          </div>

          <div className="min-h-80 flex-3 bg-[#111827]">
            <Editor
              height="100%"
              language="html"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value ?? "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 18 },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
              }}
            />
          </div>

          <div className="flex min-h-64 flex-2 flex-col border-t border-slate-200 dark:border-slate-800">
            <div className="flex h-12 items-center gap-1 border-b border-slate-200 px-4 dark:border-slate-800">
              <button type="button" onClick={() => setActiveTab("preview")} className={`h-full border-b-2 px-3 text-sm font-semibold ${activeTab === "preview" ? "border-blue-700 text-blue-700 dark:text-blue-400" : "border-transparent text-slate-500"}`}>Live output</button>
              <button type="button" onClick={() => setActiveTab("tests")} className={`h-full border-b-2 px-3 text-sm font-semibold ${activeTab === "tests" ? "border-blue-700 text-blue-700 dark:text-blue-400" : "border-transparent text-slate-500"}`}>Test results</button>
            </div>
            {activeTab === "preview" ? (
              <iframe title="Exercise output" srcDoc={preview} sandbox="allow-scripts" className="min-h-52 w-full flex-1 bg-white" />
            ) : (
              <div className="grid flex-1 content-start gap-3 p-4 sm:grid-cols-3">
                <ResultCard label="Passed" value="2" tone="green" />
                <ResultCard label="Total tests" value="3" />
                <ResultCard label="XP available" value="20" tone="blue" />
              </div>
            )}
          </div>
        </section>

        {assistantOpen && <AssistantPanel onClose={() => setAssistantOpen(false)} />}

        {!assistantOpen && (
          <button
            type="button"
            onClick={() => {
              if (suppressBotClick.current) {
                suppressBotClick.current = false;
                return;
              }
              setAssistantOpen(true);
            }}
            onPointerDown={handleBotPointerDown}
            onPointerMove={handleBotPointerMove}
            onPointerUp={handleBotPointerUp}
            onPointerCancel={handleBotPointerUp}
            onDragStart={(event) => event.preventDefault()}
            style={botPosition ? { left: botPosition.x, top: botPosition.y } : undefined}
            className={`group fixed z-40 grid size-16 touch-none cursor-grab place-items-center rounded-full border-4 border-white bg-linear-to-br from-blue-700 to-indigo-500 text-white shadow-xl transition-shadow hover:shadow-2xl active:cursor-grabbing dark:border-slate-800 ${botPosition ? "" : "right-6 bottom-6"}`}
            aria-label="Open AI Assistance Bot"
            title="Drag to move or click to open"
          >
            <Image
              src="/home/image/aiCoachRobot.png"
              alt="AI Assistance Bot"
              width={64}
              height={64}
              draggable={false}
              className="pointer-events-none size-14 select-none object-contain transition group-hover:scale-110"
            />
            <span className="pointer-events-none absolute -top-1 -right-1 size-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-800" />
          </button>
        )}
      </div>

      {instructionsOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button type="button" aria-label="Close instructions" onClick={() => setInstructionsOpen(false)} className="absolute inset-0 bg-slate-950/50" />
          <ExerciseInstructions className="relative h-full w-[88%] max-w-sm overflow-y-auto bg-white shadow-2xl dark:bg-slate-900" onClose={() => setInstructionsOpen(false)} />
        </div>
      )}
    </div>
  );
}

function ExerciseInstructions({ className, onClose }: { className?: string; onClose?: () => void }) {
  return (
    <aside className={`${className ?? ""} overflow-y-auto p-5`}>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">Problem</span>
        {onClose && <button type="button" onClick={onClose} aria-label="Close instructions"><X className="size-5" /></button>}
      </div>
      <h2 className="text-2xl font-bold leading-tight">Build a semantic profile card</h2>
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">Create a small profile card using meaningful HTML elements. Your result should introduce a developer and include a link to their portfolio.</p>
      <h3 className="mt-7 text-xs font-bold uppercase tracking-wider text-slate-500">Your task</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
        <li>Use an <code>&lt;article&gt;</code> as the card container.</li>
        <li>Add one heading and one paragraph.</li>
        <li>Add a portfolio link with useful link text.</li>
      </ul>
      <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
        <div className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-200"><CircleHelp className="size-4" /> Expected structure</div>
        <p className="mt-2 text-xs leading-5 text-blue-800 dark:text-blue-300">The page must contain an article, h1, paragraph, and anchor element.</p>
      </div>
      <h3 className="mt-7 text-xs font-bold uppercase tracking-wider text-slate-500">Constraints</h3>
      <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm leading-6 dark:bg-slate-800">Do not use JavaScript for this exercise. Keep your content accessible and readable.</div>
    </aside>
  );
}

function AssistantPanel({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  return (
    <aside className="fixed inset-y-0 right-0 z-40 flex w-[92%] max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl xl:static xl:z-auto xl:w-88 xl:shrink-0 xl:shadow-none dark:border-slate-800 dark:bg-slate-900">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-100 p-0.5 dark:bg-blue-950">
          <Image
            src="/home/image/aiCoachRobot.png"
            alt="AI Assistance Bot"
            width={44}
            height={44}
            className="size-10 object-contain"
          />
        </div>
        <div className="min-w-0 flex-1"><h2 className="font-bold">AI Assistance Bot</h2><p className="truncate text-xs text-slate-500">Guidance without giving away the answer</p></div>
        <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Close AI Assistance Bot"><X className="size-5" /></button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="rounded-2xl rounded-tl-sm bg-slate-100 p-4 text-sm leading-6 dark:bg-slate-800">
          Hi! I can explain the task, review your approach, or give you a small hint. I’ll help you learn without immediately revealing the solution.
        </div>
        <button type="button" className="flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-950/30">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-amber-500" /><span><strong className="block text-sm">Give me a hint</strong><span className="text-xs text-slate-500">Get help with the next step</span></span>
        </button>
        <button type="button" className="flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3 text-left hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:hover:bg-blue-950/30">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-violet-500" /><span><strong className="block text-sm">Review my code</strong><span className="text-xs text-slate-500">Find issues and suggest improvements</span></span>
        </button>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); setMessage(""); }} className="border-t border-slate-200 p-3 dark:border-slate-800">
        <div className="flex items-end gap-2 rounded-xl border border-slate-300 bg-white p-2 focus-within:ring-2 focus-within:ring-blue-600 dark:border-slate-700 dark:bg-slate-950">
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={2} placeholder="Ask about this exercise…" className="min-h-10 flex-1 resize-none bg-transparent px-2 py-1 text-sm outline-none" />
          <button type="submit" disabled={!message.trim()} className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#002455] text-white disabled:opacity-40" aria-label="Send message"><Send className="size-4" /></button>
        </div>
      </form>
    </aside>
  );
}

function ResultCard({ label, value, tone }: { label: string; value: string; tone?: "green" | "blue" }) {
  const color = tone === "green" ? "text-emerald-600" : tone === "blue" ? "text-blue-700 dark:text-blue-400" : "";
  return <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"><div className="text-xs text-slate-500">{label}</div><div className={`mt-2 text-2xl font-bold ${color}`}>{value}</div></div>;
}
