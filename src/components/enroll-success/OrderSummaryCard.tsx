// src/components/checkout/OrderSummaryCard.tsx
import React from "react";
import { CreditCard } from "lucide-react";

interface OrderSummaryProps {
  courseTitle: string;
  instructor: string;
  price: number;
  invoiceNumber: string;
  date: string;
  cardLast4: string;
  status: string;
}

export default function OrderSummaryCard({
  courseTitle = "Java Programming Fundamentals",
  instructor = "លោកគ្រូ Chhay Davin",
  price = 149.00,
  invoiceNumber = "#AP-88234",
  date = "Oct 24, 2024",
  cardLast4 = "4242",
  status = "បានបង់ប្រាក់",
}: Partial<OrderSummaryProps>) {
  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-khmer mb-4">
          សេចក្តីសង្ខេបការទិញ
        </h3>

        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <span className="text-xs text-slate-400 font-khmer">វគ្គសិក្សា</span>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
             HTML & CSS Fundemental
            </h4>
            <p className="text-xs text-slate-500 font-khmer mt-1">
              បង្រៀនដោយ លោកគ្រូ Chhay Davin 
            </p>
          </div>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
           12.00$
          </span>
        </div>
      </div>

      <hr className="my-6 border-slate-100 dark:border-zinc-800" />

      <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs">
        <div>
          <span className="text-slate-400 font-khmer">លេខបញ្ជាទិញ</span>
          <p className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{invoiceNumber}</p>
        </div>
        <div>
          <span className="text-slate-400 font-khmer">កាលបរិច្ឆេទ</span>
          <p className="font-semibold text-slate-700 dark:text-slate-300 mt-0.5">{date}</p>
        </div>
        <div>
          <span className="text-slate-400 font-khmer">វិធីសាស្ត្រទូទាត់</span>
          <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 mt-0.5 font-semibold">
            <CreditCard className="w-3.5 h-3.5 text-slate-400" />
            <span>Visa •••• {cardLast4}</span>
          </div>
        </div>
        <div>
          <span className="text-slate-400 font-khmer">ស្ថានភាព</span>
          <div className="mt-0.5">
            <span className="inline-block bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-medium font-khmer text-[11px]">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
