"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code2, Trophy, Map, Bot, FileText } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password requested for:", email);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f17] flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto pt-10 lg:pt-0">
        
        {/* Left Side: Visual Feature Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 relative">
          {/* Code Editor Preview & Floating Cards Container */}
          <div className="relative w-full max-w-md my-8 flex justify-center items-center">
            {/* Curved dashed line background effect (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full text-slate-300 dark:text-slate-800 pointer-events-none transition-colors"
              viewBox="0 0 400 300"
              fill="none"
            >
              <path
                d="M 50 150 C 100 50, 300 50, 350 150 C 300 250, 100 250, 50 150"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>

            {/* Central Dark Code Window */}
            <div className="bg-[#111827] dark:bg-[#1a2234] text-white rounded-2xl p-4 shadow-2xl w-full max-w-sm z-10 border border-slate-800 dark:border-slate-700 transition-colors text-left">
              {/* Window Controls */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
              </div>

              {/* Code Display */}
              <div className="font-mono text-xs sm:text-sm leading-relaxed space-y-1 text-slate-300 pl-2">
                <div>
                  <span className="text-slate-500 mr-3">01</span>
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-blue-400">solveProblem</span>() &#123;
                </div>
                <div>
                  <span className="text-slate-500 mr-3">02</span>
                  <span className="pl-4 text-purple-400">let</span> learning ={" "}
                  <span className="text-amber-400">true</span>;
                </div>
                <div>
                  <span className="text-slate-500 mr-3">03</span>
                  <span className="pl-4 text-purple-400">while</span> (learning){" "}
                  &#123;
                </div>
                <div>
                  <span className="text-slate-500 mr-3">04</span>
                  <span className="pl-8 text-blue-300">practice</span>();
                </div>
                <div>
                  <span className="text-slate-500 mr-3">05</span>
                  <span className="pl-8 text-blue-300">buildProject</span>();
                </div>
                <div>
                  <span className="text-slate-500 mr-3">06</span>
                  <span className="pl-8 text-blue-300">becomeBetter</span>();
                </div>
                <div>
                  <span className="text-slate-500 mr-3">07</span>
                  <span className="pl-4">&#125;</span>
                </div>
                <div>
                  <span className="text-slate-500 mr-3">08</span>
                  <span className="pl-4 text-purple-400">return</span> success;
                </div>
                <div>
                  <span className="text-slate-500 mr-3">09</span>
                  &#125;
                </div>
              </div>
            </div>

            {/* Floating Badges / Cards */}

            {/* 1. Top - Documentation */}
            <div className="absolute -top-6 bg-white dark:bg-[#1e293b] rounded-xl shadow-lg dark:shadow-2xl p-2.5 flex items-center gap-2.5 z-20 border border-slate-100 dark:border-slate-700/60 min-w-[140px] font-sans transition-colors">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
                <FileText size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary-color dark:text-slate-100">Documentation</p>
                <p className="text-[10px] text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100">Learn Everything</p>
              </div>
            </div>

            {/* 2. Left - Playground */}
            <div className="absolute -left-6 bg-white dark:bg-[#1e293b] rounded-xl shadow-lg dark:shadow-2xl p-2.5 flex items-center gap-2.5 z-20 border border-slate-100 dark:border-slate-700/60 min-w-[130px] font-sans transition-colors">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg">
                <Code2 size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary-color dark:text-slate-100">Playground</p>
                <p className="text-[10px] text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100">Code & Practice</p>
              </div>
            </div>

            {/* 3. Bottom Left - Quiz & Test */}
            <div className="absolute -bottom-6 left-2 bg-white dark:bg-[#1e293b] rounded-xl shadow-lg dark:shadow-2xl p-2.5 flex items-center gap-2.5 z-20 border border-slate-100 dark:border-slate-700/60 min-w-[130px] font-sans transition-colors">
              <div className="p-2 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-lg">
                <Trophy size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary-color dark:text-slate-100">Quiz & Test</p>
                <p className="text-[10px] text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100">Track Progress</p>
              </div>
            </div>

            {/* 4. Bottom Right - Roadmap */}
            <div className="absolute -bottom-6 right-2 bg-white dark:bg-[#1e293b] rounded-xl shadow-lg dark:shadow-2xl p-2.5 flex items-center gap-2.5 z-20 border border-slate-100 dark:border-slate-700/60 min-w-[130px] font-sans transition-colors">
              <div className="p-2 bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 rounded-lg">
                <Map size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary-color dark:text-slate-100">Roadmap</p>
                <p className="text-[10px] text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100">Learn Step by Step</p>
              </div>
            </div>

            {/* 5. Right - AI Assistant */}
            <div className="absolute -right-6 bg-white dark:bg-[#1e293b] rounded-xl shadow-lg dark:shadow-2xl p-2.5 flex items-center gap-2.5 z-20 border border-slate-100 dark:border-slate-700/60 min-w-[130px] font-sans transition-colors">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-lg">
                <Bot size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary-color dark:text-slate-100">AI Assistant</p>
                <p className="text-[10px] text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100">Get Smart Help</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card Container */}
        <div className="flex flex-col justify-center max-w-lg w-full mx-auto">
          <div className="bg-white dark:bg-[#1e293b] border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-8 sm:p-10 shadow-xl dark:shadow-2xl transition-colors">
            
            {/* Header / Title */}
            <div className="text-center space-y-3 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary-color dark:text-white font-khmer">
                ភ្លេចពាក្យសម្ងាត់?
              </h1>

              {/* Decorative Accent Line */}
              <div className="flex items-center justify-center gap-2 my-2">
                <span className="h-[2px] w-12 bg-primary-color dark:bg-slate-600"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                <span className="h-[2px] w-12 bg-primary-color dark:bg-slate-600"></span>
              </div>

              <p className="text-primary-color opacity-80 dark:text-slate-300 dark:opacity-100 text-sm font-khmer leading-relaxed max-w-sm mx-auto">
                សូមបញ្ចូលអាសយដ្ឋានអ៊ីម៉ែលរបស់អ្នក ហើយយើងនឹងផ្ញើតំណ (<span className="font-sans">link</span>) ដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ។
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-bold text-primary-color dark:text-slate-200 mb-1.5 font-khmer">
                  អាសយដ្ឋានអ៊ីម៉ែល
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 bg-[#f8fafc] dark:bg-[#0b0f17] border border-slate-200 dark:border-slate-700 rounded-2xl text-primary-color dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color transition-all font-sans"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-primary-color hover:opacity-90 text-white font-medium py-3.5 rounded-2xl transition-all shadow-md font-khmer text-sm"
              >
                ផ្ញើអ៊ីម៉ែលកំណត់ឡើងវិញ
              </button>

              {/* Back to Login Link */}
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm pt-2">
                <span className="text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100 font-khmer">
                  ចាំពាក្យសម្ងាត់របស់អ្នកហើយមែនទេ?
                </span>
                <Link
                  href="/login"
                  className="text-secondary-color hover:underline font-bold font-khmer"
                >
                  ត្រឡប់ទៅទំព័រដើម
                </Link>
              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}