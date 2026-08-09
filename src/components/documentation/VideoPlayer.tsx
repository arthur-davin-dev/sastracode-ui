'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoPlayer({ darkMode }: { darkMode: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative rounded-2xl overflow-hidden shadow-xl aspect-video max-w-2xl mx-auto border transition-all ${darkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 z-20">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono px-2 py-1 bg-slate-900/80 text-white rounded-md backdrop-blur-sm">Variables.java</span>
          <span className="text-xs text-white/80 bg-indigo-600 px-2 py-1 rounded-md">Video Lesson</span>
        </div>
        <div className="space-y-2 text-slate-700 dark:text-slate-300 font-mono text-sm sm:text-base bg-white/40 dark:bg-slate-950/40 p-4 rounded-xl backdrop-blur-md">
          <p><span className="text-purple-500">int</span> age = 20;</p>
          <p><span className="text-purple-500">double</span> price = 99.99;</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white drop-shadow-md">ការប្រើប្រាស់ Variable ក្នុង Java</h3>
          <p className="text-xs text-white/80 drop-shadow-sm">សិក្សាអំពីការប្រើប្រាស់ types</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center group-hover:bg-slate-950/50 transition-colors z-20">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl"
        >
          <Play size={28} className="fill-current translate-x-0.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}