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
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mt-15">
      <div className="mb-4 flex items-start justify-between">
        <div>
          {hasDiscount && (
            <p className="text-sm text-gray-400 line-through">
              ${course.originalPrice}.00
            </p>
          )}
          <p className="text-3xl font-bold text-gray-900">${displayPrice}.00</p>
        </div>
        <button
          aria-label="Save to wishlist"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-gray-300 hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <Link
        href="/subscribe-enroll"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-color py-3 text-sm font-semibold text-white transition hover:bg-primary-color/90"
      >
        <Lock className="h-3.5 w-3.5" />
        បញ្ជាក់ការចុះឈ្មោះ
      </Link>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-sans">
        <Award className="h-3.5 w-3.5" />
        30-day money-back guarantee
      </p>

      <div className="my-5 border-t border-gray-100" />

      <div className="space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-gray-600 font-sans">
          <BookOpen className="h-4 w-4 text-gray-400" />
          {course.lessons} Lessons
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-600 font-sans">
          <Clock className="h-4 w-4 text-gray-400" />
          {course.totalDuration ?? course.duration} Total Length
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-600 font-sans">
          <Award className="h-4 w-4 text-gray-400" />
       វិញ្ញាបនបត្របញ្ជាក់ការបញ្ចប់
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-600 font-sans">
          <Monitor className="h-4 w-4 text-gray-400" />
        អាចប្រើប្រាស់បាននៅលើទូរស័ព្ទ និងកុំព្យូទ័រ
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-600 font-sans">
          <InfinityIcon className="h-4 w-4 text-gray-400" />
          ការចូលប្រើប្រាស់បានពេញមួយជីវិត
        </div>
      </div>

      <p className="mt-5 text-center text-xs leading-relaxed text-gray-400 font-sans">
        By enrolling, you agree to our{" "}
        <Link href="/terms" className="text-primary-color hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary-color hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
