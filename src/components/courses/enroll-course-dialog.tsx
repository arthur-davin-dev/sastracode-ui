"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  LockKeyhole,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface EnrollCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  course: {
    id: string;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    instructorName?: string;
    price: number;
    discount?: number;
    currency?: string;
  };

  onSuccess?: () => void;
}

export default function EnrollCourseDialog({
  open,
  onOpenChange,
  course,
  onSuccess,
}: EnrollCourseDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pricing = useMemo(() => {
    const price = Number(course.price ?? 0);
    const discount = Number(course.discount ?? 0);

    const discountAmount = price * (discount / 100);
    const total = Math.max(0, price - discountAmount);

    return {
      price,
      discount,
      discountAmount,
      total,
    };
  }, [course.price, course.discount]);

  const currency = course.currency ?? "USD";

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);

  async function handleEnroll() {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(
        `/api/backend/v1/courses/${course.id}/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ??
            "Unable to enroll in this course.",
        );
      }

      setIsSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    onOpenChange(false);

    setTimeout(() => {
      setIsSuccess(false);
      setError(null);
    }, 200);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
          return;
        }

        onOpenChange(value);
      }}
    >
      <DialogContent className="overflow-hidden p-0 sm:max-w-[580px]">
        {isSuccess ? (
          <div className="flex flex-col items-center px-8 py-12 text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
              <CheckCircle2 className="size-8 text-emerald-600" />
            </div>

            <h2 className="text-2xl font-bold">
              Enrollment successful
            </h2>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              You are now enrolled in{" "}
              <span className="font-medium text-foreground">
                {course.title}
              </span>
              . All premium lessons are now available.
            </p>

            <Button
              className="mt-7 w-full"
              onClick={handleClose}
            >
              Start Learning
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="px-6 pt-6">
              <DialogTitle className="text-xl">
                Complete your enrollment
              </DialogTitle>

              <DialogDescription>
                Review your course and payment details
                before enrolling.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 px-6 pb-6">
              {/* Course */}
              <div className="flex gap-4 rounded-xl border bg-muted/30 p-3">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <CreditCard className="size-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="line-clamp-2 font-semibold">
                    {course.title}
                  </h3>

                  {course.instructorName && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      By {course.instructorName}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <LockKeyhole className="size-3.5" />
                    Full course access
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <h3 className="font-semibold">
                  Order summary
                </h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Original price
                    </span>

                    <span>
                      {formatPrice(pricing.price)}
                    </span>
                  </div>

                  {pricing.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Discount ({pricing.discount}%)
                      </span>

                      <span className="text-emerald-600">
                        -
                        {formatPrice(
                          pricing.discountAmount,
                        )}
                      </span>
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between text-base font-bold">
                    <span>Total</span>

                    <span>
                      {formatPrice(pricing.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fake payment */}
              <div className="rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <CreditCard className="size-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Payment
                    </p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Payment simulation for the current
                      version of SastraCode.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                className="h-11 w-full"
                disabled={isSubmitting}
                onClick={handleEnroll}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Enroll Now ·{" "}
                    {formatPrice(pricing.total)}
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By enrolling, you will receive access to all
                lessons in this course.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}