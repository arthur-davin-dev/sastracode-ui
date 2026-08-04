// src/app/checkout/success/page.tsx
import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Download } from "lucide-react";
import OrderSummaryCard from "@/components/enroll-success/OrderSummaryCard";
import NextStepsCard from "@/components/enroll-success/NextStepsCard";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 py-12 md:py-20 animate-in fade-in duration-300">
      
      {/* 1. Header Banner Context */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
        <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-400 text-white shadow-lg shadow-emerald-200 dark:shadow-none animate-bounce">
          <Check className="w-7 h-7 stroke-[3px]" />
        </div>
        
        <h1 className="text-xl md:text-2xl font-black text-[#002455] dark:text-slate-100 font-khmer">
          ការទូទាត់បានជោគជ័យ!
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-khmer max-w-lg mx-auto leading-relaxed">
          ការចុះឈ្មោះរបស់អ្នកសម្រាប់វគ្គសិក្សា <span className="font-semibold text-slate-800 dark:text-slate-200">Java Programming Fundamentals</span> បានបញ្ចប់ដោយជោគជ័យ។
        </p>
      </div>

      {/* 2. Control Interactive Actions Layout */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-md mx-auto mb-12">
        <Link
          href="#"
          className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-[#002455] hover:bg-[#001b40] text-white px-6 py-3 rounded-xl text-sm font-semibold font-khmer transition-all shadow-md shadow-blue-900/10"
        >
          <span>ចាប់ផ្តើមរៀនឥឡូវនេះ</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <button
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl text-sm font-semibold font-khmer transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>ទាញយកវិក្កយបត្រ</span>
        </button>
      </div>

      {/* 3. Combined Split Cards Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto items-stretch">
        <OrderSummaryCard />
        <NextStepsCard />
      </div>

    </div>
  );
}
