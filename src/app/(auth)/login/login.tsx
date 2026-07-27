"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Code2, Trophy, Map, Bot, FileText } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "ឆាយ គង្គា",
    email: "chhaykongkea9@gmail.com",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f17] flex flex-col justify-between p-6 mt-12 md:p-12 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
        <button
          type="button"
          className="flex items-center gap-2 bg-primary-color text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-md"
        >
          <ArrowLeft size={16} />
          <span className="font-khmer">ត្រឡប់ក្រោយ</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto pt-16 lg:pt-0">
        {/* Left Side: Hero / Feature Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 relative">
          {/* Main Title */}
          <div className="space-y-2 max-w-lg font-khmer">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-primary-color dark:text-white">
              ជំនាញកូដ
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-secondary-color">
              សម្រាប់ថ្ងៃស្អែក
            </h2>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-secondary-color">
              ដ៏ល្អប្រសើរ
            </h2>
          </div>

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
            <div className="bg-[#111827] dark:bg-[#1a2234] text-white rounded-2xl p-4 shadow-2xl w-full max-w-sm z-10 border border-slate-800 dark:border-slate-700 transition-colors">
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

        {/* Right Side: Form Section */}
        <div className="flex flex-col justify-center max-w-md w-full mx-auto">
          {/* Header */}
          <div className="mb-6 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-color dark:text-white">
              <span className="font-khmer">សូមស្វាគមន៍មកកាន់ </span>
              <span className="text-secondary-color font-sans">SastraCode</span>
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-color dark:text-white font-khmer">
              ចូលគណនី
            </h3>
            <p className="text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100 text-sm pt-1 font-khmer">
              សូមស្វាគមន៍ត្រឡប់មកវិញ! សូមចូលទៅក្នុងគណនីរបស់អ្នក
            </p>
          </div>

          {/* Login Form */}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-primary-color dark:text-slate-300">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-primary-color focus:ring-primary-color w-4 h-4"
                />
                <span className="text-xs sm:text-sm text-primary-color dark:text-slate-300 font-khmer">
                  ចងចាំខ្ញុំ
                </span>
              </label>
              <Link
                href="#"
                className="text-xs sm:text-sm text-secondary-color hover:underline font-medium font-khmer"
              >
                ភ្លេចពាក្យសម្ងាត់មែនទេ?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-color hover:opacity-90 text-white font-medium py-3.5 rounded-xl transition-all shadow-md mt-4 font-khmer"
            >
              ចូលគណនី
            </button>

            {/* Register Link */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-4">
              <span className="text-primary-color opacity-80 dark:text-slate-400 dark:opacity-100 font-khmer">
                មិនទាន់មានគណនីមែនទេ?
              </span>
              <Link
                href="#"
                className="text-secondary-color hover:underline font-medium font-khmer"
              >
                ចុះឈ្មោះ
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Right Logo Accent */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* Logo representation */}
          <div className="bg-primary-color text-white font-bold p-2 rounded-lg text-xs transform -rotate-6 border-2 border-secondary-color shadow-lg font-sans">
            S
          </div>
        </div>
      </div>
    </div>
  );
}