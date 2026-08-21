"use client";

import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslations";
import AIChatCard from "./AIChatCard";
import PreviewCard from "./PreviewCard";
import Link from "next/link";

export type SectionKey = "introduction" | "elements" | "attributes" | "semantic" | "forms" | "tables";

export default function InteractiveDoc() {
  const currentT = useTranslation();
  const [activeSection, setActiveSection] = useState<SectionKey>("introduction");

  const sectionContent: Record<SectionKey, { title: string; description: string; linkText: string; href: string }> = {
    introduction: {
      title: currentT.interactiveDoc.title,
      description: currentT.interactiveDoc.description,
      linkText: currentT.interactiveDoc.link,
      href: "/documentation",
    },
    elements: {
      title: "HTML Elements",
      description: "Learn about the foundation of web pages. Elements consist of a start tag, content, and an end tag.",
      linkText: "Explore HTML Elements",
      href: "/documentation/elements",
    },
    attributes: {
      title: "HTML Attributes",
      description: "Provide additional information about elements, such as classes, IDs, sources, and alternative text.",
      linkText: "Learn about Attributes",
      href: "/documentation/attributes",
    },
    semantic: {
      title: "Semantic HTML",
      description: "Use meaningful tags like <article>, <section>, and <nav> to improve accessibility and SEO.",
      linkText: "Discover Semantic Tags",
      href: "/documentation/semantic",
    },
    forms: {
      title: "HTML Forms",
      description: "Collect user input with interactive elements like text fields, checkboxes, radios, and submit buttons.",
      linkText: "Build Forms",
      href: "/documentation/forms",
    },
    tables: {
      title: "HTML Tables",
      description: "Organize data into rows and columns efficiently using <table>, <tr>, <th>, and <td> tags.",
      linkText: "View Table Guides",
      href: "/documentation/tables",
    },
  };

  const currentData = sectionContent[activeSection];

  const navItems: { key: SectionKey; label: string }[] = [
    { key: "introduction", label: "Introduction" },
    { key: "elements", label: "HTML Elements" },
    { key: "attributes", label: "Attributes" },
    { key: "semantic", label: "Semantic HTML" },
    { key: "forms", label: "Forms" },
    { key: "tables", label: "Tables" },
  ];

  return (
    <section className="py-3 sm:py-6 lg:py-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === item.key
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* LEFT */}
          <div className="text-center lg:text-left flex flex-col justify-between">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
                {currentData.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-500 dark:text-gray-400 leading-7 sm:leading-relaxed mb-5 sm:mb-6 transition-colors duration-300">
                {currentData.description}
              </p>

              <Link
                href={currentData.href}
                className="inline-flex items-center gap-2 text-sm sm:text-base text-slate-800 dark:text-white font-medium hover:text-slate-600 dark:hover:text-gray-300 transition-colors duration-300"
              >
                {currentData.linkText}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="mt-8 lg:mt-6 flex justify-center lg:justify-start">
              <PreviewCard activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center lg:justify-end mt-5 lg:mt-0">
            <AIChatCard />
          </div>
        </div>
      </div>
    </section>
  );
}