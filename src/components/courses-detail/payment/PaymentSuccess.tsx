"use client";

import { CheckCircle2 } from "lucide-react";

interface PaymentSuccessProps {
  courseTitle: string;

  currency: string;

  originalPrice: number;

  finalPrice: number;

  discount: number;

  onDone: () => void;
}

export function PaymentSuccess({
  courseTitle,
  currency,
  originalPrice,
  finalPrice,
  discount,
  onDone,
}: PaymentSuccessProps) {
  return (
    <div className="px-7 py-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10">
        <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      </div>

      <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
        ការទិញបានជោគជ័យ
      </h2>

      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
        អ្នកបានចុះឈ្មោះវគ្គសិក្សាដោយជោគជ័យ។
      </p>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-left dark:bg-slate-800/60">
        <p className="text-xs text-slate-500">វគ្គសិក្សា</p>

        <p className="mt-1 font-semibold text-slate-900 dark:text-white">
          {courseTitle}
        </p>

        {discount > 0 && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-slate-500">តម្លៃដើម</span>

            <span className="text-sm text-slate-400 line-through">
              {currency} {originalPrice.toFixed(2)}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">បញ្ចុះតម្លៃ</span>

            <span className="text-sm font-medium text-emerald-600">
              -{discount}%
            </span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-700">
          <span className="text-sm text-slate-500">តម្លៃសរុប</span>

          <span className="text-lg font-bold text-[#002455] dark:text-blue-400">
            {currency} {finalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="mt-5 w-full rounded-xl bg-[#002455] py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900"
      >
        រួចរាល់
      </button>
    </div>
  );
}
