'use client';

import React, { useState } from 'react';
import { Award } from 'lucide-react';

export default function QuizCard({ darkMode }: { darkMode: boolean }) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const options = [
    { id: 'A', text: 'float' },
    { id: 'B', text: 'int' },
    { id: 'C', text: 'Integer' },
    { id: 'D', text: 'num' }
  ];

  return (
    <div className={`p-6 rounded-2xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
        <Award size={20} />
        <h3>សំណួរវាយតម្លៃរហ័ស (Quick Quiz)</h3>
      </div>
      <p className="text-sm font-medium">តើ Keyword មួយណាត្រូវបានប្រើសម្រាប់ប្រកាសអថេរប្រភេទចំនួនគត់ (Integer Variable) ក្នុង Java?</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedQuiz(opt.id)}
            className={`p-3 rounded-xl border text-left text-sm transition-all flex items-center justify-between
              ${selectedQuiz === opt.id 
                ? opt.id === 'B' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-600 dark:text-rose-400'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'}`}
          >
            <span><strong>{opt.id}.</strong> {opt.text}</span>
            {selectedQuiz === opt.id && (
              <span className="text-xs font-bold">{opt.id === 'B' ? 'ត្រឹមត្រូវ!' : 'ខុសហើយ!'}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}