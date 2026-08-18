"use client";

import Editor from "@monaco-editor/react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CircleHelp,
  LockKeyhole,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  RefreshCcw,
  Sparkles,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useLanguage } from "@/lib/language-context";

const workspaceContent = {
  en: {
    // Exercise interface
    problem: "Problem",
    yourTask: "Your Task",
    expectedStructure: "Expected structure",
    constraints: "Constraints",
    savedLocally: "Saved locally",
    reset: "Reset",
    run: "Run",
    liveOutput: "Live output",
    testResults: "Test results",
    codingExercise: "Coding exercise",
    passed: "Passed",
    totalTests: "Total tests",
    xpAvailable: "XP available",

    // AI assistant
    assistantTitle: "AI Assistance Bot",
    assistantDescription: "Guidance to help you complete the exercise",
    hints: "Hints",
    aiTools: "AI tools",
    history: "History",
    workStepByStep: "Work through it step by step",
    hintsDescription:
      "Each hint becomes more specific. The full fix unlocks after five hints.",
    hintProgress: "Hint progress",
    used: "used",
    hint: "Hint",
    allHintsUsed: "You used all hints",
    fixUnlocked: "“Fix my code” is now unlocked.",
  },

  km: {
    // Exercise interface
    problem: "បញ្ហា",
    yourTask: "កិច្ចការរបស់អ្នក",
    expectedStructure: "រចនាសម្ព័ន្ធដែលរំពឹងទុក",
    constraints: "លក្ខខណ្ឌ",
    savedLocally: "បានរក្សាទុកក្នុងឧបករណ៍",
    reset: "កំណត់ឡើងវិញ",
    run: "ដំណើរការ",
    liveOutput: "លទ្ធផលផ្ទាល់",
    testResults: "លទ្ធផលតេស្ត",
    codingExercise: "លំហាត់សរសេរកូដ",
    passed: "បានជាប់",
    totalTests: "តេស្តសរុប",
    xpAvailable: "XP ដែលអាចទទួលបាន",

    // AI assistant
    assistantTitle: "ជំនួយការ AI",
    assistantDescription: "ជួយណែនាំអ្នកឱ្យបញ្ចប់លំហាត់នេះ",
    hints: "គន្លឹះ",
    aiTools: "ឧបករណ៍ AI",
    history: "ប្រវត្តិ",
    workStepByStep: "ដោះស្រាយម្តងមួយជំហាន",
    hintsDescription:
      "គន្លឹះនីមួយៗនឹងកាន់តែច្បាស់លម្អិត។ ដំណោះស្រាយពេញលេញនឹងបើកបន្ទាប់ពីប្រើគន្លឹះទាំង ៥។",
    hintProgress: "វឌ្ឍនភាពគន្លឹះ",
    used: "បានប្រើ",
    hint: "គន្លឹះ",
    allHintsUsed: "អ្នកបានប្រើគន្លឹះទាំងអស់",
    fixUnlocked: "មុខងារ “កែកូដរបស់ខ្ញុំ” បានបើកហើយ។",
  },
};

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
  const { lang } = useLanguage();
  const t = workspaceContent[lang];
  const [code, setCode] = useState(starterCode);
  const [preview, setPreview] = useState(starterCode);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [instructionsCollapsed, setInstructionsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "tests">("preview");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [botPosition, setBotPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [isBotDragging, setIsBotDragging] = useState(false);

  const botDrag = useRef({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    moved: false,
  });

  const suppressBotClick = useRef(false);

  useEffect(() => {
    const rootElement = document.documentElement;

    const updateTheme = () => {
      setIsDarkMode(rootElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(rootElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const runCode = () => {
    setPreview(code);
    setActiveTab("preview");
  };

  const handleBotPointerDown = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setIsBotDragging(true);

    botDrag.current = {
      startX: event.clientX,
      startY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    };

    setBotPosition({
      x: rect.left,
      y: rect.top,
    });

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleBotPointerMove = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const distance = Math.hypot(
      event.clientX - botDrag.current.startX,
      event.clientY - botDrag.current.startY,
    );

    if (distance > 4) {
      botDrag.current.moved = true;
    }

    const size = event.currentTarget.offsetWidth;
    const edgeGap = 8;

    setBotPosition({
      x: Math.min(
        Math.max(edgeGap, event.clientX - botDrag.current.offsetX),
        window.innerWidth - size - edgeGap,
      ),
      y: Math.min(
        Math.max(edgeGap, event.clientY - botDrag.current.offsetY),
        window.innerHeight - size - edgeGap,
      ),
    });
  };

  const handleBotPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const wasDragged = botDrag.current.moved;

    suppressBotClick.current = wasDragged;
    setIsBotDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!wasDragged) return;

    const size = event.currentTarget.offsetWidth;

    const sideGap = 12;
    const bottomGap = 12;

    // Keeps the robot below the website navigation.
    const topGap = 80;

    const maxX = window.innerWidth - size - sideGap;
    const maxY = window.innerHeight - size - bottomGap;

    const currentX = Math.min(
      Math.max(sideGap, event.clientX - botDrag.current.offsetX),
      maxX,
    );

    const currentY = Math.min(
      Math.max(topGap, event.clientY - botDrag.current.offsetY),
      maxY,
    );

    const distances = {
      left: currentX - sideGap,
      right: maxX - currentX,
      top: currentY - topGap,
      bottom: maxY - currentY,
    };

    const nearestEdge = (
      Object.entries(distances) as Array<[keyof typeof distances, number]>
    ).reduce((nearest, current) =>
      current[1] < nearest[1] ? current : nearest,
    )[0];

    let snappedX = currentX;
    let snappedY = currentY;

    if (nearestEdge === "left") {
      snappedX = sideGap;
    }

    if (nearestEdge === "right") {
      snappedX = maxX;
    }

    if (nearestEdge === "top") {
      snappedY = topGap;
    }

    if (nearestEdge === "bottom") {
      snappedY = maxY;
    }

    setBotPosition({
      x: snappedX,
      y: snappedY,
    });
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-7rem)] flex-col overflow-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="flex min-h-20 items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => setInstructionsOpen(true)}
          className="rounded-lg border border-slate-200 p-2 md:hidden dark:border-slate-700"
          aria-label="Open exercise instructions"
        >
          <Menu className="size-5" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/documentation/lessons/html-elements"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="size-3.5" />
              HTML Elements
            </Link>

            <span className="rounded-full bg-slate-200/80 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {t.codingExercise}
            </span>
          </div>

          <h1 className="mt-2 truncate text-xl leading-tight font-extrabold tracking-tight sm:text-2xl">
            Build a semantic profile card
          </h1>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1">
        <div
          className={`relative hidden shrink-0 overflow-hidden border-r border-slate-200 bg-white transition-[width] duration-300 md:block dark:border-slate-800 dark:bg-slate-900 ${
            instructionsCollapsed ? "w-14" : "w-72"
          }`}
        >
          <button
            type="button"
            onClick={() => setInstructionsCollapsed((collapsed) => !collapsed)}
            className={`absolute top-3 z-10 inline-flex rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 ${
              instructionsCollapsed ? "left-2.5" : "right-3"
            }`}
            aria-label={
              instructionsCollapsed
                ? "Show exercise instructions"
                : "Hide exercise instructions"
            }
            title={instructionsCollapsed ? "Show problem" : "Minimize problem"}
          >
            {instructionsCollapsed ? (
              <PanelLeftOpen className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </button>

          <ExerciseInstructions
            className={`h-full w-72 transition-opacity duration-200 ${
              instructionsCollapsed
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }`}
          />
        </div>

        <section className="flex min-w-0 flex-1 flex-col bg-white dark:bg-slate-950">
          <div className="flex h-14 shrink-0 items-center justify-end border-b border-slate-200 bg-white px-4 sm:px-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex gap-2">
              <div className="hidden items-center gap-1.5 px-2 text-xs text-slate-500 sm:flex dark:text-slate-400">
                <CheckCircle2 className="size-4 text-emerald-500" />
                {t.savedLocally}
              </div>

              <button
                type="button"
                onClick={() => setCode(starterCode)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <RefreshCcw className="size-4" />
                <span className="hidden sm:inline">{t.reset}</span>
              </button>

              <button
                type="button"
                onClick={runCode}
                className="inline-flex items-center gap-2 rounded-lg bg-[#002455] px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-900"
              >
                <Play className="size-4 fill-current" />
                {t.run}
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col xl:flex-row">
            <div className="min-h-80 flex-1 bg-white xl:min-w-0 xl:flex-3 dark:bg-[#111827]">
              <Editor
                height="100%"
                language="html"
                theme={isDarkMode ? "vs-dark" : "light"}
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

            <div className="flex min-h-64 flex-1 flex-col border-t border-slate-200 xl:min-w-0 xl:flex-2 xl:border-t-0 xl:border-l dark:border-slate-800">
              <div className="flex h-12 items-center gap-1 border-b border-slate-200 px-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`h-full border-b-2 px-3 text-sm font-semibold ${
                    activeTab === "preview"
                      ? "border-blue-700 text-blue-700 dark:text-blue-400"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  {t.liveOutput}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("tests")}
                  className={`h-full border-b-2 px-3 text-sm font-semibold ${
                    activeTab === "tests"
                      ? "border-blue-700 text-blue-700 dark:text-blue-400"
                      : "border-transparent text-slate-500"
                  }`}
                >
                  {t.testResults}
                </button>
              </div>

              {activeTab === "preview" ? (
                <iframe
                  title="Exercise output"
                  srcDoc={preview}
                  sandbox="allow-scripts"
                  className="min-h-52 w-full flex-1 bg-white"
                />
              ) : (
                <div className="grid flex-1 content-start gap-3 p-4 sm:grid-cols-3">
                  <ResultCard label={t.passed} value="2" tone="green" />
                  <ResultCard label={t.totalTests} value="3" />
                  <ResultCard label={t.xpAvailable} value="20" tone="blue" />
                </div>
              )}
            </div>
          </div>
        </section>

        {assistantOpen && (
          <AssistantPanel onClose={() => setAssistantOpen(false)} />
        )}

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
            style={
              botPosition
                ? {
                    left: botPosition.x,
                    top: botPosition.y,
                  }
                : undefined
            }
            className={`group fixed z-40 grid size-16 touch-none cursor-grab place-items-center rounded-full border-4 border-white bg-linear-to-br from-blue-700 to-indigo-500 text-white shadow-xl hover:shadow-2xl active:cursor-grabbing dark:border-slate-800 ${
              isBotDragging
                ? "transition-none"
                : "transition-[left,top,box-shadow,transform] duration-300 ease-out"
            } ${botPosition ? "" : "right-6 bottom-6"}`}
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
          <button
            type="button"
            aria-label="Close instructions"
            onClick={() => setInstructionsOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
          />

          <ExerciseInstructions
            className="relative h-full w-[88%] max-w-sm overflow-y-auto bg-white shadow-2xl dark:bg-slate-900"
            onClose={() => setInstructionsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

function ExerciseInstructions({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const { lang } = useLanguage();
  const t = workspaceContent[lang];
  return (
    <aside className={`${className ?? ""} overflow-y-auto p-5`}>
      <div className="mb-5 flex items-center justify-between">
        <span className="text-base font-bold tracking-normal text-blue-700 dark:text-blue-400">
          {t.problem}
        </span>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close instructions"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <h2 className="text-2xl leading-tight font-bold">
        Build a semantic profile card
      </h2>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        Create a small profile card using meaningful HTML elements. Your result
        should introduce a developer and include a link to their portfolio.
      </p>

      <h3 className="mt-7 text-xs font-bold tracking-wider text-slate-500 uppercase">
        Your task
      </h3>

      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 dark:text-slate-300">
        <li>
          Use an <code>&lt;article&gt;</code> as the card container.
        </li>
        <li>Add one heading and one paragraph.</li>
        <li>Add a portfolio link with useful link text.</li>
      </ul>

      <div className="mt-7 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
        <div className="flex items-center gap-2 text-sm font-bold text-blue-900 dark:text-blue-200">
          <CircleHelp className="size-4" />
          Expected structure
        </div>

        <p className="mt-2 text-xs leading-5 text-blue-800 dark:text-blue-300">
          The page must contain an article, h1, paragraph, and anchor element.
        </p>
      </div>

      <h3 className="mt-7 text-xs font-bold tracking-wider text-slate-500 uppercase">
        Constraints
      </h3>

      <div className="mt-3 rounded-xl bg-slate-100 p-4 text-sm leading-6 dark:bg-slate-800">
        Do not use JavaScript for this exercise. Keep your content accessible
        and readable.
      </div>
    </aside>
  );
}

function AssistantPanel({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage();
  const t = workspaceContent[lang];
  const [activeSection, setActiveSection] = useState<
    "hints" | "tools" | "history"
  >("hints");

  const [hintStep, setHintStep] = useState(0);
  const [selectedHintStep, setSelectedHintStep] = useState(0);

  const handleGetHint = () => {
    if (hintStep >= 5) return;

    const nextStep = hintStep + 1;

    setHintStep(nextStep);
    setSelectedHintStep(nextStep);
  };

  return (
    <aside className="absolute inset-y-0 right-0 z-50 flex w-[92%] max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl sm:w-96 dark:border-slate-800 dark:bg-slate-900">
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

        <div className="min-w-0 flex-1">
          <h2 className="font-bold">{t.assistantTitle}</h2>
          <p className="truncate text-xs text-slate-500">
            {t.assistantDescription}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close AI Assistance Bot"
        >
          <X className="size-5" />
        </button>
      </div>

      <div
        className="grid grid-cols-3 border-b border-slate-200 px-2 dark:border-slate-800"
        role="tablist"
        aria-label="AI assistance sections"
      >
        {(["hints", "tools", "history"] as const).map((section) => (
          <button
            key={section}
            type="button"
            role="tab"
            aria-selected={activeSection === section}
            onClick={() => setActiveSection(section)}
            className={`border-b-2 px-2 py-3 text-xs font-bold transition-colors ${
              activeSection === section
                ? "border-primary-color text-primary-color dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {section === "hints"
              ? t.hints
              : section === "tools"
                ? t.aiTools
                : t.history}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        {activeSection === "hints" && (
          <HintsSection
            hintStep={hintStep}
            selectedHintStep={selectedHintStep}
            onSelectHint={setSelectedHintStep}
          />
        )}

        {activeSection === "tools" && <AiToolsSection hintStep={hintStep} />}
        {activeSection === "history" && <HistorySection />}

        <AssistantActions hintStep={hintStep} onGetHint={handleGetHint} />
      </div>
    </aside>
  );
}

function HintsSection({
  hintStep,
  selectedHintStep,
  onSelectHint,
}: {
  hintStep: number;
  selectedHintStep: number;
  onSelectHint: (step: number) => void;
}) {
  const { lang } = useLanguage();
  const t = workspaceContent[lang];

  const hints = [
    "Look closely at the HTML structure. Ask yourself whether every opening element has the correct closing element.",
    "Start with one semantic article element and place all profile content inside it.",
    "Your article needs a heading, a paragraph, and a portfolio link with descriptive text.",
    "Check that the heading uses h1 and that the link has a valid href attribute.",
    "Replace the card div with article, then verify the required h1, p, and a elements are nested inside it.",
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-violet-100 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/30">
        <h3 className="text-sm font-bold">{t.workStepByStep}</h3>

        <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
          {t.hintsDescription}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
        <div className="flex justify-between gap-3 text-xs">
          <span className="text-slate-500">{t.hintProgress}</span>

          <strong>
            {hintStep} / 5 {t.used}
          </strong>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="bg-primary-color h-full rounded-full transition-[width] duration-300 dark:bg-blue-500"
            style={{ width: `${hintStep * 20}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between">
          {[1, 2, 3, 4, 5].map((step) => {
            const isUnlocked = step <= hintStep;
            const isSelected = step === selectedHintStep;

            return (
              <button
                key={step}
                type="button"
                disabled={!isUnlocked}
                onClick={() => onSelectHint(step)}
                aria-label={`${t.hint} ${step}`}
                aria-pressed={isSelected}
                className={`grid size-7 place-items-center rounded-full border text-xs font-bold transition-colors ${
                  isSelected
                    ? "border-primary-color bg-primary-color text-white ring-2 ring-blue-200 dark:border-blue-500 dark:bg-blue-500 dark:ring-blue-900"
                    : isUnlocked
                      ? "text-primary-color border-primary-color cursor-pointer bg-blue-50 hover:bg-blue-100 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300"
                      : "cursor-not-allowed border-slate-200 text-slate-400 dark:border-slate-700"
                }`}
              >
                {step}
              </button>
            );
          })}
        </div>
      </div>

      {selectedHintStep > 0 && (
        <div className="rounded-xl border border-violet-100 bg-violet-50/60 p-4 dark:border-violet-900 dark:bg-violet-950/20">
          <div className="flex items-center justify-between">
            <strong className="text-primary-color text-xs dark:text-blue-400">
              {t.hint.toUpperCase()} {selectedHintStep}
            </strong>

            <span className="text-[11px] text-slate-400">07:00 PM</span>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
            {hints[selectedHintStep - 1]}
          </p>
        </div>
      )}
    </div>
  );
}

function AiToolsSection({ hintStep }: { hintStep: number }) {
  const [codeScope, setCodeScope] = useState<"whole" | "selected">("whole");
  const [scopeOpen, setScopeOpen] = useState(false);

  const scopeLabel = codeScope === "whole" ? "Whole document" : "Selected code";
  const isFixUnlocked = hintStep >= 5;
  return (
    <div className="space-y-4">
      <ToolCard
        title="Explain my code"
        description="Ask AI to explain the whole document, one element, or selected code."
      >
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div
            className="relative min-w-0"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setScopeOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setScopeOpen(false);
              }
            }}
          >
            <button
              type="button"
              onClick={() => setScopeOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={scopeOpen}
              className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-xs font-semibold shadow-sm transition hover:border-blue-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900"
            >
              <span>{scopeLabel}</span>

              <ChevronDown
                className={`size-4 text-slate-500 transition-transform ${
                  scopeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {scopeOpen && (
              <div
                role="listbox"
                aria-label="Choose code scope"
                className="absolute top-full right-0 left-0 z-50 mt-2 space-y-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
              >
                {[
                  { value: "whole" as const, label: "Whole document" },
                  { value: "selected" as const, label: "Selected code" },
                ].map((option) => {
                  const isSelected = codeScope === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setCodeScope(option.value);
                        setScopeOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                        isSelected
                          ? "bg-[#002455] text-white"
                          : "text-slate-700 hover:bg-blue-50 hover:text-[#002455] dark:text-slate-200 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                      }`}
                    >
                      {option.label}

                      {isSelected && <Check className="size-4" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            className="h-11 rounded-xl bg-primary-color px-4 text-xs font-bold text-white hover:opacity-90 dark:bg-blue-600"
          >
            Explain
          </button>
        </div>
      </ToolCard>

      <ToolCard
        title="Improve my code"
        description="Get suggestions for readability, structure, and accessibility without changing the task goal."
      >
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Suggest improvements
        </button>
      </ToolCard>

      <ToolCard
        title="Fix code"
        description={
          isFixUnlocked
            ? "All five hints have been used. The fixed-code option is now available."
            : `Locked until all five hints are used. ${5 - hintStep} remaining.`
        }
      >
        <button
          type="button"
          disabled={!isFixUnlocked}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${
            isFixUnlocked
              ? "cursor-pointer border-primary-color bg-primary-color text-white hover:opacity-90 dark:border-blue-500 dark:bg-blue-600"
              : "cursor-not-allowed border-slate-200 text-slate-400 dark:border-slate-700"
          }`}
        >
          {!isFixUnlocked && <LockKeyhole className="size-3.5" />}
          {isFixUnlocked ? "Fix my code" : "Fix my code"}
        </button>
      </ToolCard>
    </div>
  );
}

function ToolCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <h3 className="text-sm font-bold">{title}</h3>

      <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-3">{children}</div>
    </div>
  );
}

function HistorySection() {
  const entries = [
    [
      "IMPROVEMENT · Improve code",
      "Keep the document simple and use semantic elements that match the task requirements.",
    ],
    [
      "EXPLANATION · Code explanation",
      "The page begins with a document declaration, then groups its visible content inside the body.",
    ],
    [
      "HINT · Hint 1",
      "Look closely at the HTML structure and check whether every opening element is closed.",
    ],
  ];

  return (
    <div className="space-y-3">
      {entries.map(([title, body]) => (
        <div
          key={title}
          className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
        >
          <h3 className="text-xs font-bold">{title}</h3>

          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}

function AssistantActions({
  hintStep,
  onGetHint,
}: {
  hintStep: number;
  onGetHint: () => void;
}) {
  const { lang } = useLanguage();
  const t = workspaceContent[lang];

  const ordinals = ["first", "second", "third", "fourth", "fifth"];
  const remainingHints = 5 - hintStep;

  return (
    <div className="mt-4 space-y-2 pt-2">
      <button
        type="button"
        onClick={onGetHint}
        disabled={hintStep === 5}
        className="bg-primary-color inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white hover:opacity-90 disabled:cursor-default disabled:opacity-60 dark:bg-blue-600"
      >
        <Sparkles className="size-4" />

        {hintStep === 5
          ? t.allHintsUsed
          : lang === "km"
            ? `ទទួលគន្លឹះទី ${hintStep + 1}`
            : `Get ${ordinals[hintStep]} hint`}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        {remainingHints === 0
          ? t.fixUnlocked
          : lang === "km"
            ? `ប្រើគន្លឹះ ${remainingHints} ទៀត ដើម្បីបើកមុខងារ “កែកូដរបស់ខ្ញុំ”។`
            : `Use ${remainingHints} more ${
                remainingHints === 1 ? "hint" : "hints"
              } to unlock “Fix my code”.`}
      </p>
    </div>
  );
}

function ResultCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green" | "blue";
}) {
  const color =
    tone === "green"
      ? "text-emerald-600"
      : tone === "blue"
        ? "text-blue-700 dark:text-blue-400"
        : "";

  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-2 text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
