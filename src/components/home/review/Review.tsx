"use client";

import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslations";

const gradients = ["from-blue-500 to-purple-500", "from-green-500 to-teal-500", "from-purple-500 to-pink-500", "from-orange-500 to-red-500", "from-indigo-500 to-blue-500", "from-pink-500 to-rose-500"];

export default function Review() {
  const t = useTranslation().reviews;
  return <section className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
    <div className="mx-auto mb-12 max-w-7xl text-center">
      <span className="inline-block rounded-full border border-blue-600/15 bg-blue-100 px-5 py-2 text-sm font-bold uppercase text-navy dark:border-blue-400/20 dark:bg-blue-950/30 dark:text-blue-300">{t.badge}</span>
      <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
        <span className="text-[#0d1b3e] dark:text-white">{t.title} </span>
        <span className="gradient-features dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">{t.titleAccent}</span>
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-body dark:text-gray-400">{t.description}</p>
    </div>
    <div id="hs-carousel" className="relative px-8 pb-12 sm:px-12" data-hs-carousel='{"loadingClasses":"opacity-0","dotsItemClasses":"hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer","isAutoPlay":true,"slidesQty":{"xs":1,"sm":2,"lg":3}}'>
      <div className="hs-carousel relative min-h-96 w-full overflow-hidden"><div className="hs-carousel-body absolute inset-s-0 bottom-0 top-0 flex flex-nowrap opacity-0 transition-transform duration-700">
        {t.items.map((review, index) => <div className="hs-carousel-slide px-3" key={review.name}>
          <article className="flex h-full justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"><div className="flex h-full flex-col">
            <div className="mb-3 flex gap-1" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, star) => <Star key={star} className="h-5 w-5 fill-init-color text-init-color" />)}</div>
            <p className="flex-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">“{review.text}”</p>
            <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-gray-700">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${gradients[index]} text-lg font-bold text-white`}>{review.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</div>
              <div><p className="text-lg font-bold leading-snug text-gray-900 dark:text-white">{review.name}</p><p className="mt-1 text-base font-medium text-gray-500 dark:text-gray-400">{review.role}</p></div>
            </div>
          </div></article>
        </div>)}
      </div></div>
      <button type="button" aria-label={t.previous} className="hs-carousel-prev absolute top-1/2 -left-4 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg dark:bg-gray-800 sm:-left-6 md:-left-8 lg:-left-10"><span aria-hidden="true">‹</span></button>
      <button type="button" aria-label={t.next} className="hs-carousel-next absolute top-1/2 -right-4 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-lg dark:bg-gray-800 sm:-right-6 md:-right-8 lg:-right-10"><span aria-hidden="true">›</span></button>
      <div className="hs-carousel-pagination absolute inset-x-0 bottom-0 flex justify-center gap-x-3 pt-4" />
    </div>
  </section>;
}
