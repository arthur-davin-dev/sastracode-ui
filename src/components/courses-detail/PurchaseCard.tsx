"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { BookOpen, Clock, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api/error";
import type { Course } from "@/lib/course/courses";
import { useEnrollCourseMutation } from "@/redux/api/course-api";
import { getCoursePricing } from "./payment/payment-prcie";
import { PaymentModal } from "./payment/PaymentModal";

interface PurchaseCardProps {
  course: Course;
}

export function PurchaseCard({ course }: PurchaseCardProps) {
  const router = useRouter();
  const { status } = useSession();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [enroll, { isLoading }] = useEnrollCourseMutation();

  const firstAvailableLesson = useMemo(() => {
    return course.curriculum
      ?.flatMap((chapter) => chapter.lessons)
      .find((lesson) => !lesson.locked);
  }, [course.curriculum]);

  /*
   * =========================
   * PRICE
   * =========================
   */
  const { currency, originalPrice, finalPrice, discount } = useMemo(
    () => getCoursePricing(course),
    [course],
  );

  const priceLabel =
    course.accessType === "FREE"
      ? "ឥតគិតថ្លៃ"
      : course.accessType === "PRIVATE"
        ? "Private access"
        : `${currency} ${finalPrice.toFixed(2)}`;

  const showStrikethrough =
    course.accessType === "PREMIUM" && discount > 0 && originalPrice > finalPrice;

  /*
   * =========================
   * COURSE ACTION
   * =========================
   */
  const handleAction = async () => {
    const courseSlug = course.slug || course.id;

    if (status !== "authenticated") {
      await signIn("keycloak", { redirectTo: `/courses/${courseSlug}` });
      return;
    }

    if (course.hasFullAccess) {
      if (firstAvailableLesson) {
        router.push(`/courses/${courseSlug}/learn/${firstAvailableLesson.id}`);
        return;
      }
      toast.info("វគ្គសិក្សានេះមិនទាន់មានមេរៀនដែលអាចចូលរៀនបាន។");
      return;
    }

    if (course.accessType === "PRIVATE") {
      toast.info("វគ្គ PRIVATE ត្រូវការសិទ្ធិពីអ្នកគ្រប់គ្រង។");
      return;
    }

    if (course.accessType === "PREMIUM") {
      setIsPaymentOpen(true);
      return;
    }

    await handleFreeEnrollment();
  };

  const handleFreeEnrollment = async () => {
    try {
      await enroll(course.id).unwrap();
      toast.success("ចុះឈ្មោះវគ្គសិក្សាបានជោគជ័យ");
      router.refresh();
    } catch (error) {
      console.error("Free enrollment error:", error);
      toast.error(getApiErrorMessage(error, "មិនអាចចុះឈ្មោះវគ្គសិក្សាបាន"));
      throw error;
    }
  };

  /*
   * Called AFTER demo payment processing finishes (see PaymentModal).
   * Real enrollment API is called here, not inside the modal.
   */
  const handlePremiumPurchase = async () => {
    try {
      await enroll(course.id).unwrap();
      toast.success("ទិញ និងចុះឈ្មោះវគ្គសិក្សាបានជោគជ័យ");
    } catch (error) {
      console.error("Premium enrollment error:", error);
      throw error;
    }
  };

  const handlePaymentDone = () => {
    router.refresh();
  };

  const buttonLabel = () => {
    if (status === "loading") return "កំពុងពិនិត្យ...";
    if (isLoading) return "កំពុងដំណើរការ...";
    if (course.hasFullAccess) return "ចូលរៀនឥឡូវនេះ";
    if (course.accessType === "PRIVATE") return "សិទ្ធិឯកជន";
    if (course.accessType === "PREMIUM") return "ទិញវគ្គសិក្សា";
    return "ចុះឈ្មោះឥឡូវនេះ";
  };

  const ActionIcon =
    course.accessType === "PREMIUM" && !course.hasFullAccess ? CreditCard : BookOpen;

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* PRICE */}
        <div className="mb-5">
          {showStrikethrough && (
            <p className="mb-1 text-sm text-slate-400 line-through">
              {currency} {originalPrice.toFixed(2)}
            </p>
          )}
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{priceLabel}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {course.level ?? "Course"} · {course.accessType ?? "FREE"}
          </p>
        </div>

        {/* MAIN BUTTON */}
        <button
          type="button"
          onClick={handleAction}
          disabled={isLoading || status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#002455] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ActionIcon className="h-4 w-4" />
          {buttonLabel()}
        </button>

        {/* COURSE INFORMATION */}
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <BookOpen className="h-4 w-4 shrink-0 text-[#002455] dark:text-blue-400" />
            <span>
              {course.lessons} មេរៀន · {course.duration}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <Clock className="h-4 w-4 shrink-0 text-[#002455] dark:text-blue-400" />
            <span>{course.totalDuration ?? course.duration}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#002455] dark:text-blue-400" />
            <span>
              {course.accessType === "FREE" && "វគ្គសិក្សាឥតគិតថ្លៃ"}
              {course.accessType === "PREMIUM" && "ត្រូវទិញវគ្គសិក្សាមុនពេលចូលរៀន"}
              {course.accessType === "PRIVATE" && "ត្រូវការសិទ្ធិពីអ្នកគ្រប់គ្រង"}
            </span>
          </div>
        </div>
      </div>

      <PaymentModal
        open={isPaymentOpen}
        course={course}
        onClose={() => setIsPaymentOpen(false)}
        onPurchaseSuccess={handlePremiumPurchase}
        onDone={handlePaymentDone}
      />
    </>
  );
}