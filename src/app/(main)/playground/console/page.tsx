// app/console/page.tsx
"use client";

import { useState } from "react";
import {
  Sun,
  ChevronDown,
  Trash2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const navItems = ["មេរៀន", "វគ្គសិក្សា", "បញ្ជីវីដេអូ", "អំពីសាស្ត្រាកូដ"];

const terminalLines = [
  { type: "info", text: "Initializing environment..." },
  { type: "info", text: "Compilation successful. Running program..." },
  { type: "muted", num: "001", text: "$ start execution" },
  { type: "success", num: "002", text: 'Hello, World!  សូស្តីពិភពលោក' },
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
    <div className="min-h-screen bg-white">
      {/* Top nav bar */}
      <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-slate-100">
        <nav className="flex items-center gap-2">
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => setActiveNav(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeNav === i
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Sun className="h-5 w-5 text-slate-500" />
          <button className="flex items-center gap-2 rounded-full border-2 border-blue-600 px-3 py-1.5 text-sm font-medium">
            <span aria-hidden>🇰🇭</span>
            ខ្មែរ
          </button>
          <button className="text-sm font-medium text-red-500">
            ចុះឈ្មោះ
          </button>
        </div>
      </div>

      <div className="px-6 lg:px-10 py-8">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Console Interface
            </h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Running
              </span>
              <span className="text-sm text-slate-500">
                Process ID: 8842
              </span>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">
            <Trash2 className="h-4 w-4" />
            សម្អាត Console
          </button>
        </div>

        {/* Main grid: compilation summary + terminal */}
        <div className="grid lg:grid-cols-[380px_1fr] gap-4 mb-6">
          {/* Compilation summary card */}
          <div className="border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900 leading-tight">
                លទ្ធផលនៃ
                <br />
                Compilation
              </h2>
              <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                <span className="text-xs">{"</>"}</span>
              </div>
            </div>

            <dl className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <dt className="text-sm text-slate-500">Compiler Version</dt>
                <dd className="text-sm font-semibold text-slate-900">
                  v1.2.4-khmer
                </dd>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <dt className="text-sm text-slate-500">Build Time</dt>
                <dd className="text-sm font-semibold text-slate-900">1.2s</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-slate-500">Warnings</dt>
                <dd className="text-sm font-semibold text-amber-500">03</dd>
              </div>
            </dl>
          </div>

          {/* Terminal output */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-slate-300 font-medium">
                  main.kodu — Output
                </span>
              </div>
              <span className="text-xs text-slate-400">UTF-8</span>
            </div>

            <div className="bg-white p-5 font-mono text-sm space-y-2 min-h-[420px]">
              {terminalLines.map((line, i) => (
                <TerminalLine key={i} line={line} />
              ))}
            </div>
          </div>
        </div>

        {/* Error messages section */}
        <div className="border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-slate-900">
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
    return <p className="text-blue-500">{line.text}</p>;
  }

  if (line.type === "error-highlight") {
    return (
      <div className="flex items-start gap-3 bg-red-50 rounded-md px-3 py-2 -mx-3">
        <span className="text-slate-300 select-none">{line.num}</span>
        <span className="text-red-600 font-semibold">{line.text}</span>
      </div>
    );
  }

  if (line.type === "cursor") {
    return (
      <div className="flex items-center gap-3">
        <span className="text-slate-300 select-none">{line.num}</span>
        <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse" />
      </div>
    );
  }

  const textColor =
    line.type === "error"
      ? "text-red-600 font-semibold"
      : line.type === "success"
      ? "text-emerald-600"
      : "text-slate-700";

  return (
    <div className="flex items-start gap-3">
      <span className="text-slate-300 select-none">{line.num}</span>
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
  const bg = tone === "error" ? "bg-red-50" : "bg-amber-50";
  const titleColor = tone === "error" ? "text-red-600" : "text-amber-600";

  return (
    <div className={`${bg} rounded-xl p-4`}>
      <div className="flex items-start gap-4">
        <span
          className={`${badgeColor} text-white text-sm font-bold h-8 w-8 rounded-lg flex items-center justify-center shrink-0`}
        >
          {badge}
        </span>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h3 className={`font-semibold ${titleColor}`}>{title}</h3>
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {location}
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-3">{description}</p>

          {before && after && (
            <div className="flex items-center gap-3 flex-wrap">
              <code className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-mono text-slate-700">
                {before}
              </code>
              <ArrowRight className="h-4 w-4 text-slate-400 shrink-0" />
              <code className="bg-white border border-emerald-200 rounded-full px-3 py-1.5 text-xs font-mono text-emerald-700">
                {after}
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}