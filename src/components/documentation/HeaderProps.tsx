'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export default function Headeralesson({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${darkMode ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
            <Terminal className="w-6 h-6 animate-pulse" />
            <span>SastraCode</span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm">
          {["HTML", "CSS", "JAVASCRIPT", "JAVA", "PYTHON"].map((lang) => (
            <a key={lang} href="#" className={`hover:text-indigo-500 transition-colors ${lang === 'JAVA' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}`}>
              {lang}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-amber-500 dark:text-indigo-400 transition-all duration-300"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <button className="hidden sm:block text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:brightness-110 transition-all">
            ដំឡើងគណនី Pro
          </button>
        </div>
      </div>
    </header>
  );
}