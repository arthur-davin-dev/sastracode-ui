// app/console/page.tsx
"use client";

import { useState } from "react";
import {
  Sun,
  Trash2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const navItems = ["មេរៀន", "វគ្គសិក្សា", "បញ្ជីវីដេអូ", "អំពីសាស្ត្រាកូដ"];

const terminalLines = [
  { type: "info", text: "Initializing environment..." },
  { type: "info", text: "Compilation successful. Running program..." },
  { type: "muted", num: "001", text: "$ start execution" },
  { type: "success", num: "002", text: "Hello, World!  សួស្តីពិភពលោក" },
  { type: "success", num: "003", text: "Calculating Khmer Lunar Calendar..." },
  { type: "error", num: "004", text: "Error: Stack Overflow detected at line 42." },
  {
    type: "error-highlight",
    num: "005",
    text: '>> Unexpected token \'}\' near "end_loop"',
  },
  { type: "success", num: "006", text: "Memory Address: 0x7FFF5FBFFD40" },
  { type: "cursor", num: "007", text: "" },
];

export default function ConsolePage() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-khmer transition-colors duration-300">

      <div className="px-6 lg:px-10 py-8">
        
        {/* Header Row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Console Interface
            </h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Running
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Process ID: 8842
              </span>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Trash2 className="h-4 w-4" />
            សម្អាត Console
          </button>
        </div>

        {/* Main Grid: Compilation Summary + Terminal */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-4 mb-6">
          
          {/* Compilation Summary Card */}
          <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                លទ្ធផលនៃ
                <br />
                Compilation
              </h2>
              <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400 font-mono font-bold">
                <span className="text-xs">{"</>"}</span>
              </div>
            </div>

            <dl className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <dt className="text-sm text-slate-500 dark:text-slate-400">Compiler Version</dt>
                <dd className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  v1.2.4-khmer
                </dd>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <dt className="text-sm text-slate-500 dark:text-slate-400">Build Time</dt>
                <dd className="text-sm font-semibold text-slate-900 dark:text-slate-100">1.2s</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-slate-500 dark:text-slate-400">Warnings</dt>
                <dd className="text-sm font-semibold text-amber-500 dark:text-amber-400">03</dd>
              </div>
            </dl>
          </div>

          {/* Terminal Output */}
          <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-slate-300 font-medium font-mono">
                  main.kodu — Output
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">UTF-8</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 font-mono text-sm space-y-2 min-h-[420px] transition-colors">
              {terminalLines.map((line, i) => (
                <TerminalLine key={i} line={line} />
              ))}
            </div>
          </div>
        </div>

        {/* Error Messages Section */}
        <div className="border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              បញ្ហាដែលបានរកឃើញ (Error Messages)
            </h2>
          </div>

          <div className="space-y-3">
            <ErrorCard
              badge="42"
              badgeColor="bg-red-600"
              tone="error"
              title="Syntax Error: Missing Semicolon"
              location="Line 42, Col 12"
              description="Unexpected termination of statement. Ensure all expressions in the 'for' loop are closed correctly with a semicolon (;)."
              before="for(let i=0 i < 10)"
              after="for(let i=0; i < 10)"
            />
            <ErrorCard
              badge="12"
              badgeColor="bg-orange-500"
              tone="warning"
              title="Optimization Warning"
              location="Line 12"
              description="Variable 'tempCount' is declared but never used in the local scope. This might affect memory allocation for large loops."
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function TerminalLine({
  line,
}: {
  line: { type: string; num?: string; text: string };
}) {
  if (line.type === "info") {
    return <p className="text-blue-600 dark:text-blue-400">{line.text}</p>;
  }

  if (line.type === "error-highlight") {
    return (
      <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/50 rounded-md px-3 py-1.5 -mx-3">
        <span className="text-slate-400 dark:text-slate-500 select-none">{line.num}</span>
        <span className="text-red-600 dark:text-red-400 font-semibold">{line.text}</span>
      </div>
    );
  }

  if (line.type === "cursor") {
    return (
      <div className="flex items-center gap-3">
        <span className="text-slate-400 dark:text-slate-500 select-none">{line.num}</span>
        <span className="inline-block w-2 h-4 bg-blue-600 dark:bg-blue-400 animate-pulse" />
      </div>
    );
  }

  const textColor =
    line.type === "error"
      ? "text-red-600 dark:text-red-400 font-semibold"
      : line.type === "success"
      ? "text-emerald-600 dark:text-emerald-400"
      : "text-slate-700 dark:text-slate-300";

  return (
    <div className="flex items-start gap-3">
      <span className="text-slate-400 dark:text-slate-500 select-none">{line.num}</span>
      <span className={textColor}>{line.text}</span>
    </div>
  );
}

function ErrorCard({
  badge,
  badgeColor,
  tone,
  title,
  location,
  description,
  before,
  after,
}: {
  badge: string;
  badgeColor: string;
  tone: "error" | "warning";
  title: string;
  location: string;
  description: string;
  before?: string;
  after?: string;
}) {
  const bg = tone === "error" ? "bg-red-50/70 dark:bg-red-950/30" : "bg-amber-50/70 dark:bg-amber-950/30";
  const titleColor = tone === "error" ? "text-red-600 dark:text-red-400" : "text-amber-600 dark:text-amber-400";

  return (
    <div className={`${bg} rounded-xl p-4 border border-transparent transition-colors`}>
      <div className="flex items-start gap-4">
        <span
          className={`${badgeColor} text-white text-sm font-bold h-8 w-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm`}
        >
          {badge}
        </span>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h3 className={`font-semibold ${titleColor}`}>{title}</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap font-mono">
              {location}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
            {description}
          </p>

          {before && after && (
            <div className="flex items-center gap-3 flex-wrap">
              <code className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-3 py-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                {before}
              </code>
              <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
              <code className="bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                {after}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
