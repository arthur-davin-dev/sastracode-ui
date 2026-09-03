"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { BookOpen, Clock, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api/error";
import type { Course } from "@/lib/course/courses";
import { useTranslation } from "@/hooks/useTranslations";
import { useEnrollCourseMutation } from "@/redux/api/course-api";
import { getCoursePricing } from "./payment/payment-prcie";
import { PaymentModal } from "./payment/PaymentModal";

interface PurchaseCardProps {
  course: Course;
}

export function PurchaseCard({ course }: PurchaseCardProps) {
  const router = useRouter();
  const t = useTranslation();
  const card = t.courses.card;
  const purchase = t.courses.detail.purchase;
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
      ? purchase.freePrice
      : course.accessType === "PRIVATE"
        ? purchase.privatePrice
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
      toast.info(purchase.noLessonAvailable);
      return;
    }

    if (course.accessType === "PRIVATE") {
      toast.info(purchase.privateNeedsPermission);
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
      toast.success(purchase.enrollSuccess);
      router.refresh();
    } catch (error) {
      console.error("Free enrollment error:", error);
      toast.error(getApiErrorMessage(error, purchase.enrollError));
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
      toast.success(purchase.purchaseSuccess);
    } catch (error) {
      console.error("Premium enrollment error:", error);
      throw error;
    }
  };

  const handlePaymentDone = () => {
    router.refresh();
  };

  const buttonLabel = () => {
    if (status === "loading") return purchase.checking;
    if (isLoading) return purchase.processing;
    if (course.hasFullAccess) return purchase.startLearning;
    if (course.accessType === "PRIVATE") return purchase.privateRight;
    if (course.accessType === "PREMIUM") return purchase.buyCourse;
    return purchase.enrollNow;
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
            {course.level ? card.level[course.level] : purchase.courseFallback} ·{" "}
            {course.accessType === "PREMIUM"
              ? card.access.premium
              : course.accessType === "PRIVATE"
                ? card.access.private
                : card.access.free}
          </p>
        </div>

        {/* MAIN BUTTON */}
        <button
          type="button"
          onClick={handleAction}
          disabled={isLoading || status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-color py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-color/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ActionIcon className="h-4 w-4" />
          {buttonLabel()}
        </button>

        {/* COURSE INFORMATION */}
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <BookOpen className="h-4 w-4 shrink-0 text-primary-color" />
            <span>
              {course.lessons} {card.lessonsUnit} · {course.duration}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <Clock className="h-4 w-4 shrink-0 text-primary-color" />
            <span>{course.totalDuration ?? course.duration}</span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary-color" />
            <span>
              {course.accessType === "FREE" && purchase.freeCourse}
              {course.accessType === "PREMIUM" && purchase.premiumNotice}
              {course.accessType === "PRIVATE" && purchase.privateNotice}
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