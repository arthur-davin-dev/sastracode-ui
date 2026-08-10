// "use client";

// import { useMemo } from "react";
// import { useSession, signIn } from "next-auth/react";
// import { BookOpen, Clock, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";

// import type { Course } from "@/lib/course/courses";
// import { useEnrollCourseMutation } from "@/redux/api/course-api";

// interface PurchaseCardProps {
//   course: Course;
// }

// export function PurchaseCard({ course }: PurchaseCardProps) {
//   const { status } = useSession();
//   const [enroll, { isLoading }] = useEnrollCourseMutation();

//   const firstAvailableLesson = useMemo(
//     () => course.curriculum?.flatMap((chapter) => chapter.lessons).find((lesson) => !lesson.locked),
//     [course.curriculum],
//   );

//   const priceLabel =
//     course.accessType === "FREE"
//       ? "ឥតគិតថ្លៃ (Free)"
//       : course.accessType === "PRIVATE"
//         ? "Private access"
//         : `${course.currency ?? "USD"} ${(course.price ?? 0).toFixed(2)}`;

//   const handleAction = async () => {
//     if (status !== "authenticated") {
//       await signIn("keycloak", { redirectTo: `/courses/${course.id}` });
//       return;
//     }

//     if (course.hasFullAccess && firstAvailableLesson) {
//       window.location.href = `/courses/${course.id}/learn/${firstAvailableLesson.id}`;
//       return;
//     }

//     if (course.accessType === "PRIVATE") {
//       toast.info("វគ្គ PRIVATE ត្រូវការសិទ្ធិពីអ្នកគ្រប់គ្រង។");
//       return;
//     }

//     try {
//       await enroll(course.id).unwrap();
//       toast.success("ចុះឈ្មោះវគ្គសិក្សាបានជោគជ័យ");
//       if (firstAvailableLesson) {
//         window.location.href = `/courses/${course.id}/learn/${firstAvailableLesson.id}`;
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("មិនអាចចុះឈ្មោះវគ្គសិក្សាបាន");
//     }
//   };

//   return (
//     <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
//       <div className="mb-4 border-b border-slate-100 pb-4 dark:border-slate-800">
//         {course.originalPrice && course.originalPrice > (course.price ?? 0) && (
//           <p className="text-sm text-slate-400 line-through">{course.currency ?? "USD"} {course.originalPrice.toFixed(2)}</p>
//         )}
//         <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{priceLabel}</p>
//         <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{course.level ?? "Course"} · {course.accessType ?? "FREE"}</p>
//       </div>

//       <button onClick={handleAction} disabled={isLoading} className="flex w-full items-center justify-center rounded-xl bg-[#002455] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900 disabled:opacity-60">
//         {isLoading ? "កំពុងដំណើរការ..." : course.hasFullAccess ? "ចូលរៀនឥឡូវនេះ" : course.accessType === "PRIVATE" ? "សិទ្ធិឯកជន" : "ចុះឈ្មោះឥឡូវនេះ"}
//       </button>

//       <div className="mt-5 space-y-3 border-t border-slate-100 pt-4 dark:border-slate-800/80">
//         <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"><BookOpen className="h-4 w-4 text-[#002455] dark:text-blue-400" /><span>{course.lessons} មេរៀន · {course.duration}</span></div>
//         <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"><Clock className="h-4 w-4 text-[#002455] dark:text-blue-400" /><span>{course.totalDuration ?? course.duration}</span></div>
//         <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300"><ShieldCheck className="h-4 w-4 text-[#002455] dark:text-blue-400" /><span>សិទ្ធិចូលប្រើត្រូវបានគ្រប់គ្រងដោយ backend</span></div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  signIn,
  useSession,
} from "next-auth/react";

import {
  BookOpen,
  Clock,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import { toast } from "sonner";

import type { Course } from "@/lib/course/courses";

import { useEnrollCourseMutation } from "@/redux/api/course-api";

import { PaymentModal } from "./payment/PaymentModal";

interface PurchaseCardProps {
  course: Course;
}

export function PurchaseCard({
  course,
}: PurchaseCardProps) {
  const router = useRouter();

  const { status } = useSession();

  const [isPaymentOpen, setIsPaymentOpen] =
    useState(false);

  const [enroll, { isLoading }] =
    useEnrollCourseMutation();

  /*
   * =========================
   * FIRST AVAILABLE LESSON
   * =========================
   */

  const firstAvailableLesson =
    useMemo(() => {
      return course.curriculum
        ?.flatMap(
          (chapter) =>
            chapter.lessons,
        )
        .find(
          (lesson) =>
            !lesson.locked,
        );
    }, [course.curriculum]);

  /*
   * =========================
   * PRICE
   * =========================
   */

  const currency =
    course.currency ?? "USD";

  const price =
    course.price ?? 0;

  const priceLabel =
    course.accessType === "FREE"
      ? "ឥតគិតថ្លៃ (Free)"
      : course.accessType ===
          "PRIVATE"
        ? "Private access"
        : `${currency} ${price.toFixed(
            2,
          )}`;

  /*
   * =========================
   * COURSE ACTION
   * =========================
   */

  const handleAction = async () => {
    /*
     * LOGIN
     */
    if (
      status !== "authenticated"
    ) {
      await signIn("keycloak", {
        redirectTo: `/courses/${course.id}`,
      });

      return;
    }

    /*
     * ALREADY HAS ACCESS
     */
    if (course.hasFullAccess) {
      if (firstAvailableLesson) {
        router.push(
          `/courses/${course.id}/learn/${firstAvailableLesson.id}`,
        );

        return;
      }

      toast.info(
        "វគ្គសិក្សានេះមិនទាន់មានមេរៀនដែលអាចចូលរៀនបាន។",
      );

      return;
    }

    /*
     * PRIVATE
     */
    if (
      course.accessType ===
      "PRIVATE"
    ) {
      toast.info(
        "វគ្គ PRIVATE ត្រូវការសិទ្ធិពីអ្នកគ្រប់គ្រង។",
      );

      return;
    }

    /*
     * PREMIUM
     *
     * Open payment modal.
     */
    if (
      course.accessType ===
      "PREMIUM"
    ) {
      setIsPaymentOpen(true);

      return;
    }

    /*
     * FREE
     *
     * Enroll immediately.
     */
    await handleFreeEnrollment();
  };

  /*
   * =========================
   * FREE ENROLL
   * =========================
   */

  const handleFreeEnrollment =
    async () => {
      try {
        const response =
          await enroll(
            course.id,
          ).unwrap();

        console.log(
          "FREE ENROLL RESPONSE:",
          response,
        );

        toast.success(
          "ចុះឈ្មោះវគ្គសិក្សាបានជោគជ័យ",
        );

        /*
         * Reload/refetch course state.
         */
        router.refresh();
      } catch (error) {
        console.error(
          "Free enrollment error:",
          error,
        );

        toast.error(
          "មិនអាចចុះឈ្មោះវគ្គសិក្សាបាន",
        );

        throw error;
      }
    };

  /*
   * =========================
   * PREMIUM PURCHASE
   * =========================
   *
   * Called AFTER demo payment
   * processing finishes.
   */

  const handlePremiumPurchase =
    async () => {
      try {
        /*
         * REAL API
         *
         * POST:
         * /api/v1/courses/{courseId}/enroll
         */
        const response =
          await enroll(
            course.id,
          ).unwrap();

        console.log(
          "PREMIUM ENROLL RESPONSE:",
          response,
        );

        toast.success(
          "ទិញ និងចុះឈ្មោះវគ្គសិក្សាបានជោគជ័យ",
        );
      } catch (error) {
        console.error(
          "Premium enrollment error:",
          error,
        );

        /*
         * Important:
         *
         * Throw again so PaymentModal
         * knows purchase failed.
         */
        throw error;
      }
    };

  /*
   * =========================
   * PAYMENT DONE
   * =========================
   */

  const handlePaymentDone = () => {
    /*
     * Refresh data so the course
     * can return hasFullAccess=true.
     */
    router.refresh();
  };

  /*
   * =========================
   * BUTTON LABEL
   * =========================
   */

  const buttonLabel = () => {
    if (status === "loading") {
      return "កំពុងពិនិត្យ...";
    }

    if (isLoading) {
      return "កំពុងដំណើរការ...";
    }

    if (course.hasFullAccess) {
      return "ចូលរៀនឥឡូវនេះ";
    }

    if (
      course.accessType ===
      "PRIVATE"
    ) {
      return "សិទ្ធិឯកជន";
    }

    if (
      course.accessType ===
      "PREMIUM"
    ) {
      return "ទិញវគ្គសិក្សា";
    }

    return "ចុះឈ្មោះឥឡូវនេះ";
  };

  /*
   * =========================
   * ICON
   * =========================
   */

  const ActionIcon =
    course.accessType ===
      "PREMIUM" &&
    !course.hasFullAccess
      ? CreditCard
      : BookOpen;

  return (
    <>
      {/* =========================
          PURCHASE CARD
      ========================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

        {/* PRICE */}

        <div className="mb-5">
          {course.originalPrice &&
            course.originalPrice >
              price && (
              <p className="mb-1 text-sm text-slate-400 line-through">
                {currency}{" "}
                {course.originalPrice.toFixed(
                  2,
                )}
              </p>
            )}

          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {priceLabel}
          </p>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {course.level ??
              "Course"}{" "}
            ·{" "}
            {course.accessType ??
              "FREE"}
          </p>
        </div>

        {/* MAIN BUTTON */}

        <button
          type="button"
          onClick={handleAction}
          disabled={
            isLoading ||
            status === "loading"
          }
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
              {course.lessons} មេរៀន
              · {course.duration}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <Clock className="h-4 w-4 shrink-0 text-[#002455] dark:text-blue-400" />

            <span>
              {course.totalDuration ??
                course.duration}
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#002455] dark:text-blue-400" />

            <span>
              {course.accessType ===
                "FREE" &&
                "វគ្គសិក្សាឥតគិតថ្លៃ"}

              {course.accessType ===
                "PREMIUM" &&
                "ត្រូវទិញវគ្គសិក្សាមុនពេលចូលរៀន"}

              {course.accessType ===
                "PRIVATE" &&
                "ត្រូវការសិទ្ធិពីអ្នកគ្រប់គ្រង"}
            </span>
          </div>
        </div>
      </div>

      {/* =========================
          PAYMENT MODAL
      ========================== */}

      <PaymentModal
        open={isPaymentOpen}
        course={course}
        onClose={() =>
          setIsPaymentOpen(false)
        }
        onPurchaseSuccess={
          handlePremiumPurchase
        }
        onDone={
          handlePaymentDone
        }
      />
    </>
  );
}