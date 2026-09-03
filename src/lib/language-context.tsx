"use client";

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

export type Lang = "km" | "en";

/**
 * Value stored on the user profile's `locale` field. The app language "km" is
 * persisted as "kh" (backend contract); English stays "en".
 */
export type ProfileLocale = "kh" | "en";

/** App language -> the `locale` string stored on the user profile. */
export function langToLocale(lang: Lang): ProfileLocale {
  return lang === "km" ? "kh" : "en";
}

/**
 * Stored `locale` -> app language. Accepts both "kh" and "km" for Khmer so a
 * legacy value still resolves. Returns null for anything unrecognised.
 */
export function localeToLang(locale?: string | null): Lang | null {
  const value = locale?.trim().toLowerCase();
  if (value === "kh" || value === "km") return "km";
  if (value === "en") return "en";
  return null;
}

type LanguageContextType = {
  lang: Lang;
  setLang: Dispatch<SetStateAction<Lang>>;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("km");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    const timeoutId = window.setTimeout(() => {
      if (savedLanguage === "en" || savedLanguage === "km") setLang(savedLanguage);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "km" ? "en" : "km"));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
