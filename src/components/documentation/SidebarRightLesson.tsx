'use client';

import React from 'react';

export default function SidebarRightLesson() {
  return (
    <aside className="hidden xl:block w-56 shrink-0 sticky top-24 h-fit space-y-4 text-xs font-medium">
      <h4 className="text-slate-400 uppercase tracking-wider font-bold">នៅក្នុងទំព័រនេះ</h4>
      <ul className="space-y-3 border-l border-slate-200 dark:border-slate-800 pl-3">
        {["តើ Java ជាអ្វី?", "កូដឧទាហរណ៍ដំបូង", "ស្វែងយល់ពី Data Types", "របៀបបម្លែងទិន្នន័យ"].map((heading, i) => (
          <li key={i}>
            <a href="#" className={`block transition-colors hover:text-indigo-500 ${i === 2 ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-500'}`}>
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}