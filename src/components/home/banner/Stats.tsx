"use client";

import { useTranslation } from "@/hooks/useTranslations";

export default function Stats() {
  const t = useTranslation();

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-8 sm:mt-12 sm:gap-12 lg:mt-16 lg:justify-start lg:gap-16">
      <h3 className="text-2xl font-bold text-primary-color sm:text-3xl">
        {t.banner.freeLearning}
      </h3>
    </div>
  );
}
