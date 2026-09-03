"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  CreditCard,
  Loader2,
  LockKeyhole,
  X,
} from "lucide-react";

import { toast } from "sonner";

import { useTranslation } from "@/hooks/useTranslations";

interface PaymentFormProps {
  courseTitle: string;

  currency: string;

  originalPrice: number;

  finalPrice: number;

  discount: number;

  savedAmount: number;

  isProcessing: boolean;

  onClose: () => void;

  onSubmit: () => Promise<void>;
}

export function PaymentForm({
  courseTitle,
  currency,
  originalPrice,
  finalPrice,
  discount,
  savedAmount,
  isProcessing,
  onClose,
  onSubmit,
}: PaymentFormProps) {
  const t = useTranslation();
  const pay = t.courses.detail.payment;

  const [cardName, setCardName] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const handleCardNumberChange = (
    value: string,
  ) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 16);

    const formatted = numbers.replace(
      /(\d{4})(?=\d)/g,
      "$1 ",
    );

    setCardNumber(formatted);
  };

  const handleExpiryChange = (
    value: string,
  ) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 4);

    if (numbers.length >= 3) {
      setExpiry(
        `${numbers.slice(0, 2)}/${numbers.slice(2)}`,
      );

      return;
    }

    setExpiry(numbers);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!cardName.trim()) {
      toast.error(pay.errorCardName);
      return;
    }

    const normalizedCard =
      cardNumber.replace(/\s/g, "");

    if (normalizedCard.length !== 16) {
      toast.error(pay.errorCardNumber);
      return;
    }

    if (expiry.length !== 5) {
      toast.error(pay.errorExpiry);
      return;
    }

    if (cvv.length !== 3) {
      toast.error(pay.errorCvv);
      return;
    }

    await onSubmit();
  };

  return (
    <>
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {pay.title}
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {pay.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Scrollable modal body */}

      <form
        onSubmit={handleSubmit}
        className="
          max-h-[calc(82vh-75px)]
          overflow-y-auto
          p-5
        "
      >
        {/* Order */}

        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {pay.orderSummary}
          </p>

          <p className="mt-2 line-clamp-2 font-semibold text-slate-900 dark:text-white">
            {courseTitle}
          </p>

          <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-3 dark:border-slate-800">

            {/* Original Price */}

            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {pay.originalPrice}
                </span>

                <span className="text-sm text-slate-500 line-through">
                  {currency}{" "}
                  {originalPrice.toFixed(2)}
                </span>
              </div>
            )}

            {/* Discount */}

            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {pay.discount}
                </span>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                  -{discount}%
                </span>
              </div>
            )}

            {/* Saving */}

            {savedAmount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {pay.youSave}
                </span>

                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  -{currency}{" "}
                  {savedAmount.toFixed(2)}
                </span>
              </div>
            )}

            {/* Total */}

            <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="font-semibold text-slate-900 dark:text-white">
                {pay.total}
              </span>

              <span className="text-xl font-bold text-primary-color">
                {currency}{" "}
                {finalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">
            {pay.method}
          </p>

          <div className="flex items-center gap-3 rounded-xl border-2 border-primary-color bg-primary-color/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-color text-white">
              <CreditCard className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {pay.cardOption}
              </p>

              <p className="text-xs text-slate-500">
                {pay.demoPayment}
              </p>
            </div>
          </div>
        </div>

        {/* Card Inputs */}

        <div className="mt-4 space-y-3">

          {/* Name */}

          <div>
            <label
              htmlFor="cardName"
              className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {pay.cardName}
            </label>

            <input
              id="cardName"
              value={cardName}
              onChange={(event) =>
                setCardName(event.target.value)
              }
              disabled={isProcessing}
              placeholder={pay.cardNamePlaceholder}
              className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color/10 dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          {/* Card Number */}

          <div>
            <label
              htmlFor="cardNumber"
              className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {pay.cardNumber}
            </label>

            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="cardNumber"
                value={cardNumber}
                onChange={(event) =>
                  handleCardNumberChange(
                    event.target.value,
                  )
                }
                disabled={isProcessing}
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color/10 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>

          {/* Expiry and CVV */}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="expiry"
                className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                {pay.expiry}
              </label>

              <input
                id="expiry"
                value={expiry}
                onChange={(event) =>
                  handleExpiryChange(
                    event.target.value,
                  )
                }
                disabled={isProcessing}
                inputMode="numeric"
                placeholder="MM/YY"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color/10 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                {pay.cvv}
              </label>

              <input
                id="cvv"
                type="password"
                value={cvv}
                onChange={(event) =>
                  setCvv(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 3),
                  )
                }
                disabled={isProcessing}
                inputMode="numeric"
                placeholder="123"
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-primary-color focus:ring-2 focus:ring-primary-color/10 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Notice */}

        <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-2.5 dark:bg-amber-950/20">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

          <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
            {pay.demoNotice}
          </p>
        </div>

        {/* Buy */}

        <button
          type="submit"
          disabled={isProcessing}
          className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary-color text-sm font-semibold text-white transition hover:bg-primary-color/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />

              {pay.buying}
            </>
          ) : (
            <>
              <LockKeyhole className="h-4 w-4" />

              {pay.buyNow} · {currency}{" "}
              {finalPrice.toFixed(2)}
            </>
          )}
        </button>
      </form>
    </>
  );
}