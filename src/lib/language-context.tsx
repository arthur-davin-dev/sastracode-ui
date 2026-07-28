"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "km" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  toggleLanguage: () => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("km");
  const toggleLanguage = () => setLang((prev) => (prev === "km" ? "en" : "km"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage }}>
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