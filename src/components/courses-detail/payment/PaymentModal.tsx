"use client";

import { useState } from "react";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/lib/api/error";
import type { Course } from "@/lib/course/courses";

import { PaymentForm } from "./PaymentForm";
import { PaymentSuccess } from "./PaymentSuccess";
import { getCoursePricing } from "./payment-prcie";

interface PaymentModalProps {
  open: boolean;

  course: Course;

  onClose: () => void;

  onPurchaseSuccess: () => Promise<void>;

  onDone: () => void;
}

type PaymentStatus = "idle" | "processing" | "success";

export function PaymentModal({
  open,
  course,
  onClose,
  onPurchaseSuccess,
  onDone,
}: PaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  if (!open) {
    return null;
  }

  const { currency, originalPrice, finalPrice, discount, savedAmount } =
    getCoursePricing(course);

  const handleClose = () => {
    if (paymentStatus === "processing") {
      return;
    }

    setPaymentStatus("idle");

    onClose();
  };

  const handlePurchase = async () => {
    try {
      setPaymentStatus("processing");

      /*
       * Demo payment delay.
       *
       * Remove this when real payment
       * API is available.
       */
      await new Promise((resolve) => setTimeout(resolve, 1200));

      /*
       * REAL enrollment API
       * is called from PurchaseCard.
       */
      await onPurchaseSuccess();

      /*
       * Show success only when
       * enrollment succeeds.
       */
      setPaymentStatus("success");
    } catch (error) {
      console.error("Purchase failed:", error);

      setPaymentStatus("idle");

      toast.error(
        getApiErrorMessage(error, "មិនអាចទិញវគ្គសិក្សាបាន។ សូមព្យាយាមម្ដងទៀត។"),
      );
    }
  };

  const handleDone = () => {
    setPaymentStatus("idle");

    onClose();

    onDone();
  };

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60
        pt-16
        backdrop-blur-sm
    "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="
          mx-auto
          w-full max-w-lg
          max-h-[82vh]
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
          dark:bg-slate-900
        "
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {paymentStatus === "success" ? (
          <PaymentSuccess
            courseTitle={course.title}
            currency={currency}
            originalPrice={originalPrice}
            finalPrice={finalPrice}
            discount={discount}
            onDone={handleDone}
          />
        ) : (
          <PaymentForm
            courseTitle={course.title}
            currency={currency}
            originalPrice={originalPrice}
            finalPrice={finalPrice}
            discount={discount}
            savedAmount={savedAmount}
            isProcessing={paymentStatus === "processing"}
            onClose={handleClose}
            onSubmit={handlePurchase}
          />
        )}
      </div>
    </div>
  );
}
