"use client";

import { BookOpen, Clock, Infinity as InfinityIcon, Lock, Monitor } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";
import type { Course } from "@/lib/course/courses";
import { useEnrollCourseMutation } from "@/redux/api/course-api";
import { getCoursePricing } from "@/components/courses-detail/payment/payment-prcie";

interface CheckoutCardProps {
  course: Course;
}

export function CheckoutCard({ course }: CheckoutCardProps) {
  const { status } = useSession();
  const [enroll, { isLoading }] = useEnrollCourseMutation();

  const { currency, originalPrice, finalPrice, discount } = getCoursePricing(course);
  const showStrikethrough = course.accessType === "PREMIUM" && discount > 0 && originalPrice > finalPrice;

  const displayPrice =
    course.accessType === "FREE"
      ? "ឥតគិតថ្លៃ"
      : course.accessType === "PRIVATE"
        ? "Private access"
        : `${currency} ${finalPrice.toFixed(2)}`;

  const handleEnroll = async () => {
    if (status !== "authenticated") {
      await signIn("keycloak", { redirectTo: `/courses/${course.id}/enroll` });
      return;
    }
    try {
      await enroll(course.id).unwrap();
      toast.success("ចុះឈ្មោះវគ្គសិក្សាបានជោគជ័យ");
      window.location.href = `/courses/${course.id}`;
    } catch (error) {
      console.error(error);
      toast.error("មិនអាចចុះឈ្មោះវគ្គសិក្សាបាន");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        {showStrikethrough && (
          <p className="text-sm font-medium text-slate-400 line-through">
            {currency} {originalPrice.toFixed(2)}
          </p>
        )}
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{displayPrice}</p>
      </div>

      <button
        onClick={handleEnroll}
        disabled={isLoading || course.accessType === "PRIVATE"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002455] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 disabled:opacity-60"
      >
        <Lock className="h-4 w-4" />
        <span>
          {isLoading ? "កំពុងដំណើរការ..." : course.accessType === "PRIVATE" ? "Private access" : "បញ្ជាក់ការចុះឈ្មោះ"}
        </span>
      </button>

      <div className="my-5 border-t border-slate-100 dark:border-slate-800" />

      <div className="space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <BookOpen className="h-4 w-4 text-slate-400" />
          <span>{course.lessons} មេរៀន</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>{course.totalDuration ?? course.duration}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <Monitor className="h-4 w-4 text-slate-400" />
          <span>អាចប្រើប្រាស់បាននៅលើទូរស័ព្ទ និងកុំព្យូទ័រ</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
          <InfinityIcon className="h-4 w-4 text-slate-400" />
          <span>ការចូលប្រើប្រាស់បានពេញមួយជីវិត</span>
        </div>
      </div>
    </div>
  );
}
