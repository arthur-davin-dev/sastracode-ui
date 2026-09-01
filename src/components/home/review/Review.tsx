"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslations";

const reviewImages = [
  "/images/chhay_davin.jpg",
  "/images/chhay_kongkea.jpg",
  "/images/ben_thona.jpg",
  "/images/meng_kimleap.jpg",
  "/images/vel_sothoun.jpg",
  "/images/vuth_vatana.jpg",
  "/images/mon_narea.jpg",
  "/images/soeurt_bomnorng.jpg",
  "/images/lot_los.jpg",
  "/images/chhat_sovanney.jpg",
];

export default function Review() {
  const translation = useTranslation();
  const t = translation.reviews;

  useEffect(() => {
    // Dynamically import preline/non-auto just like in HomePopularCourse.tsx
    const timer = setTimeout(() => {
      import("preline/non-auto").then(({ HSStaticMethods }) => {
        HSStaticMethods.autoInit();
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [t.badge]); // Triggers autoInit whenever the language changes

  return (
    <section
      key={t.badge} /* Forces React to destroy and recreate the DOM node on language change */
      className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8"
    >
      {/* Header */}
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <span className="font-khmer inline-block rounded-full border border-blue-600/15 bg-blue-100 px-5 py-2 text-sm font-bold text-blue-900 dark:border-blue-400/20 dark:bg-blue-950/30 dark:text-blue-300">
          {t.badge}
        </span>
        <h2 className="font-khmer mt-4 text-4xl font-black tracking-tight text-primary-color sm:text-5xl dark:text-white">
          {t.title} {t.titleAccent}
        </h2>
        <p className="font-khmer mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-gray-400">
          {t.description}
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div
        id="testimonial-carousel"
        className="relative px-8 pb-12 sm:px-12"
        data-hs-carousel='{"loadingClasses":"opacity-0","dotsItemClasses":"size-3 cursor-pointer rounded-full border border-slate-400 bg-transparent transition-all dark:border-slate-500","isAutoPlay":true,"slidesQty":{"xs":1,"sm":2,"lg":3}}'
      >
        <div className="hs-carousel relative min-h-80 w-full overflow-hidden">
          <div className="hs-carousel-body absolute inset-s-0 bottom-0 top-0 flex flex-nowrap transition-transform">
            {t.items.map((review, index) => (
              <div
                className="hs-carousel-slide w-full shrink-0 min-w-0 px-3 sm:w-1/2 lg:w-1/3"
                key={review.name}
              >
                <article className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex h-full min-w-0 flex-col">
                    {/* Author Details */}
                    <div className="mb-4 flex items-center gap-3 min-w-0">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 dark:ring-slate-700">
                        <Image
                          src={
                            "image" in review && typeof review.image === "string"
                              ? review.image
                              : reviewImages[index % reviewImages.length]
                          }
                          alt={`${review.name}'s profile`}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[18px]! font-bold leading-snug text-gray-900 dark:text-white">
                          {review.name}
                        </p>
                        <p className="mt-1 truncate text-[16px]! font-medium text-gray-500 dark:text-gray-400">
                          {review.role}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="mb-3 flex gap-1" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 shrink-0 fill-init-color text-init-color"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="mt-3 break-words whitespace-normal text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      “{review.text}”
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          aria-label={t.previous}
          className="hs-carousel-prev absolute top-1/2 -left-4 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg dark:bg-gray-800 sm:-left-6 md:-left-8 lg:-left-10"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          aria-label={t.next}
          className="hs-carousel-next absolute top-1/2 -right-4 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg dark:bg-gray-800 sm:-right-6 md:-right-8 lg:-right-10"
        >
          <span aria-hidden="true">›</span>
        </button>

        {/* Pagination Dots */}
        <div className="hs-carousel-pagination absolute inset-x-0 bottom-0 flex justify-center gap-x-3 pt-4 [&>span.active]:w-7 [&>span.active]:border-init-color [&>span.active]:bg-init-color [&>span.active]:shadow-[0_0_0_3px_rgba(255,215,0,0.15)] dark:[&>span.active]:border-init-color dark:[&>span.active]:bg-init-color" />
      </div>
    </section>
  );
}