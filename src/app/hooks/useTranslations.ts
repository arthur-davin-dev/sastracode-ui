"use client";

import { useLanguage } from "@/app/Context";
import { en } from "../locale/en";
import { km } from "../locale/km";

export function useTranslation() {
  const { lang } = useLanguage();

  return lang === "km" ? km : en;
}