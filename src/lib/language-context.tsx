"use client";

import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

type Lang = "km" | "en";

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
