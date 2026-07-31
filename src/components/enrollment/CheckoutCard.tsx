"use client";

import {
  Heart,
  Lock,
  BookOpen,
  Clock,
  Award,
  Monitor,
  Infinity as InfinityIcon,
} from "lucide-react";
import Link from "next/link";
import { Course } from "@/lib/course/courses";

interface CheckoutCardProps {
  course: Course;
}

export function CheckoutCard({ course }: CheckoutCardProps) {
  const displayPrice = course.price && course.price > 0 ? course.price : 12;
  const hasDiscount =
    course.originalPrice && course.originalPrice > displayPrice;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 font-khmer transition-colors duration-300">
      
      {/* Price Header & Wishlist Button */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          {hasDiscount && (
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 line-through">
              ${course.originalPrice}.00
            </p>
          )}
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            ${displayPrice}.00
          </p>
        </div>
        <button
          type="button"
          aria-label="Save to wishlist"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 transition hover:border-slate-300 dark:hover:border-slate-700 hover:text-red-500 dark:hover:text-red-400"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Confirmation Button */}
      <Link
        href="/success"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98]"
      >
        <Lock className="h-4 w-4" />
        <span>បញ្ជាក់ការចុះឈ្មោះ</span>
      </Link>

      {/* Money Back Guarantee Badge */}
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
        <Award className="h-3.5 w-3.5" />
        <span>30-day money-back guarantee</span>
      </p>

      {/* Divider */}
      <div className="my-5 border-t border-slate-100 dark:border-slate-800" />

      {/* Features List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <BookOpen className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>{course.lessons} មេរៀន (Lessons)</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>{course.totalDuration ?? course.duration} រយៈពេលសរុប</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Award className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Monitor className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>អាចប្រើប្រាស់បាននៅលើទូរស័ព្ទ និងកុំព្យូទ័រ</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <InfinityIcon className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>ការចូលប្រើប្រាស់បានពេញមួយជីវិត</span>
        </div>
      </div>

      {/* Footer Legal Terms */}
      <p className="mt-5 text-center text-xs leading-relaxed text-slate-400 dark:text-slate-500">
        By enrolling, you agree to our{" "}
        <Link href="/terms" className="text-[#002455] dark:text-blue-400 font-medium hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-[#002455] dark:text-blue-400 font-medium hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

    </div>
  );
}