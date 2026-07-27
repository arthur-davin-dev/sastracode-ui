"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code2, Trophy, Map, Bot, FileText } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "ឆាយ គង្គា",
    email: "chhaykongkea9@gmail.com",
    password: "kongkea@123",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f17] flex flex-col justify-between mt-12 p-6 md:p-12 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto pt-10 lg:pt-0">
        
        {/* Left Side: Form Section */}
        <div className="flex flex-col justify-center max-w-md w-full mx-auto order-2 lg:order-1">
          {/* Header */}
          <div className="mb-6 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary-color dark:text-white font-khmer">
              បង្កើតគណនី
            </h1>
            <p className="text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100 text-sm pt-1 font-khmer">
              ដោះស្រាយបទពិសោធសាមញ្ញៗ និងចាប់ផ្តើមរៀនពីរថ្ងៃនេះ
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-primary-color dark:text-slate-300 mb-1">
                <span className="font-khmer">ឈ្មោះពេញ </span>
                <span className="text-secondary-color font-sans">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                className="w-full px-4 py-3 bg-[#f1f5f9] dark:bg-[#1e293b] border border-transparent dark:border-slate-700 rounded-xl text-primary-color dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color transition-all font-khmer"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-primary-color dark:text-slate-300 mb-1">
                <span className="font-khmer">អ៊ីម៉ែល </span>
                <span className="text-secondary-color font-sans">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 bg-[#f1f5f9] dark:bg-[#1e293b] border border-transparent dark:border-slate-700 rounded-xl text-primary-color dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color transition-all font-sans"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-primary-color dark:text-slate-300 mb-1">
                <span className="font-khmer">លេខសម្ងាត់ </span>
                <span className="text-secondary-color font-sans">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#f1f5f9] dark:bg-[#1e293b] border border-transparent dark:border-slate-700 rounded-xl text-primary-color dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-color dark:focus:ring-secondary-color transition-all font-sans"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-color hover:opacity-90 text-white font-medium py-3.5 rounded-xl transition-all shadow-md mt-4 font-khmer"
            >
              បង្កើតគណនី
            </button>

            {/* Divider Or */}
            <div className="relative my-6 text-center">
              <span className="bg-[#f8fafc] dark:bg-[#0b0f17] px-3 text-xs text-slate-400 dark:text-slate-500 font-khmer relative z-10">
                ឬ
              </span>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-sans shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-sans shadow-sm"
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Already have an account */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-4">
              <span className="text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100 font-khmer">
                មានគណនីរួចហើយមែនទេ?
              </span>
              <Link
                href="/login"
                className="text-secondary-color hover:underline font-medium font-khmer"
              >
                ចូលប្រើ
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side: Visual Feature Section */}
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-8 relative order-1 lg:order-2">
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

      </div>
    </div>
  );
}