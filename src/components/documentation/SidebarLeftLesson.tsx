'use client';

import React from 'react';
import { Layers } from 'lucide-react';

interface SidebarLeftProps {
  isOpen: boolean;
  darkMode: boolean;
}

const courseOutline = [
  {
    level: "កម្រិត៖ មូលដ្ឋានគ្រឹះ (Basics)",
    items: ["Java Syntax Basics", "Variables & Data Types", "Operators", "Control Flow", "Methods", "Arrays", "Basic Practice Projects"]
  },
  {
    level: "កម្រិត៖ មធ្យម (Intermediate)",
    items: ["Object-Oriented Programming", "Exception Handling", "Collections Framework", "File I/O"]
  }
];

export default function SidebarLeftLesson({ isOpen, darkMode }: SidebarLeftProps) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 transform lg:transform-none lg:opacity-100 lg:static transition-all duration-300 p-6 lg:p-0 overflow-y-auto shrink-0
      ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0'}
      ${darkMode ? 'bg-[#0f172a] lg:bg-transparent border-r border-slate-800 lg:border-none' : 'bg-white lg:bg-transparent border-r border-slate-200 lg:border-none'}`}
    >
      <div className="space-y-6">
        {courseOutline.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers size={12} />
              {section.level}
            </h4>
            <ul className="space-y-1 pl-2 border-l border-slate-200 dark:border-slate-800">
              {section.items.map((item, i) => (
                <li key={i}>
                  <a href="#" className={`block text-sm py-1.5 px-3 rounded-lg transition-all ${item === "Variables & Data Types" ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-medium' : 'hover:text-indigo-500'}`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}