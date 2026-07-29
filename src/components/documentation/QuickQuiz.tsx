"use client";

import { useState } from "react";
import { LessonQuiz } from "@/types/documentation";

export default function QuickQuiz({ quiz }: { quiz: LessonQuiz }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!quiz.options.length) return null;

  return (
    <div className="bg-white border border-gray-200 p-5 mb-6" style={{ borderRadius: 16 }}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold" style={{ fontSize: 24 }}>
          សំណួរតេស្តខ្លីៗ
        </h3>
        <span
          className="text-xs px-2 py-1 text-white"
          style={{ background: "#002455", borderRadius: 16 }}
        >
          {quiz.levelLabel}
        </span>
      </div>
      <p className="mb-3" style={{ fontSize: 18 }}>
        {quiz.question}
      </p>
      <div className="space-y-2">
        {quiz.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className="w-full text-left px-4 py-2 text-[18px] border"
            style={{
              borderRadius: 16,
              borderColor: selected === opt.id ? "#002455" : "#E5E7EB",
              background: selected === opt.id ? "#EEF1F5" : "white",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 text-[18px] text-white"
        style={{ background: "#002455", borderRadius: 16 }}
      >
        បញ្ជូនចម្លើយ
      </button>
    </div>
  );
}
