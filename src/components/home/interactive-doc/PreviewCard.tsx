"use client";

import Sidebar from "./Sidebar";
import { SectionKey } from "./InteractiveDoc";
import { useTranslation } from "@/hooks/useTranslations";

interface PreviewCardProps {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
}

export default function PreviewCard({ activeSection, setActiveSection }: PreviewCardProps) {
  const currentT = useTranslation();
  const sections = currentT.interactiveDoc?.sections;

  // Font style for Consolas code rendering
  const consolasStyle = { fontFamily: "Consolas, 'Courier New', Monaco, monospace" };

  // Dynamic configurations for each section using translations
  const previewContent: Record<
    SectionKey,
    {
      title: string;
      description: string;
      codeMarkup: React.ReactNode;
      editorText: string;
      previewElement: React.ReactNode;
    }
  > = {
    introduction: {
      title: sections?.introduction?.title || "HTML Introduction",
      description: sections?.introduction?.description || "HTML is the standard markup language for creating Web pages.",
      codeMarkup: (
        <p style={consolasStyle}>
          <span className="text-pink-600 dark:text-pink-400">&lt;!DOCTYPE html&gt;</span>
          <br />
          <span className="text-pink-600 dark:text-pink-400">&lt;html&gt;</span>
          <br />
          &nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">&lt;body&gt;</span>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-800 dark:text-gray-200">Hello World</span>
          <br />
          &nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">&lt;/body&gt;</span>
          <br />
          <span className="text-pink-600 dark:text-pink-400">&lt;/html&gt;</span>
        </p>
      ),
      editorText: "<!DOCTYPE html>\n<html>\n  <body>Hello World</body>\n</html>",
      previewElement: (
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hello World</h3>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">Basic HTML document structure.</p>
        </div>
      ),
    },
    elements: {
      title: sections?.elements?.title || "HTML Elements",
      description: sections?.elements?.description || "HTML elements are the building blocks of HTML pages.",
      codeMarkup: (
        <div style={consolasStyle}>
          <p>
            <span className="text-pink-600 dark:text-pink-400">&lt;h1&gt;</span>
            <span className="text-slate-800 dark:text-gray-200">Hello SastraCode!</span>
            <span className="text-pink-600 dark:text-pink-400">&lt;/h1&gt;</span>
          </p>
          <p>
            <span className="text-pink-600 dark:text-pink-400">&lt;p&gt;</span>
            <span className="text-slate-800 dark:text-gray-200">Welcome to your learning journey.</span>
            <span className="text-pink-600 dark:text-pink-400">&lt;/p&gt;</span>
          </p>
        </div>
      ),
      editorText: "<h1>Hello SastraCode!</h1>\n<p>Welcome to your learning journey.</p>",
      previewElement: (
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hello SastraCode!</h3>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">Welcome to your learning journey.</p>
        </div>
      ),
    },
    attributes: {
      title: sections?.attributes?.title || "HTML Attributes",
      description: sections?.attributes?.description || "Attributes provide additional information about HTML elements.",
      codeMarkup: (
        <p style={consolasStyle}>
          <span className="text-pink-600 dark:text-pink-400">&lt;a</span>{" "}
          <span className="text-indigo-600 dark:text-indigo-400">href</span>=
          <span className="text-green-600 dark:text-green-400">&quot;https://sastracode.com&quot;</span>
          <span className="text-pink-600 dark:text-pink-400">&gt;</span>
          <span className="text-slate-800 dark:text-gray-200">Visit SastraCode</span>
          <span className="text-pink-600 dark:text-pink-400">&lt;/a&gt;</span>
        </p>
      ),
      editorText: '<a href="https://sastracode.com">Visit SastraCode</a>',
      previewElement: (
        <div>
          <span className="text-sm font-bold text-blue-600 underline cursor-pointer">Visit SastraCode</span>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">Demonstrating the href attribute.</p>
        </div>
      ),
    },
    semantic: {
      title: sections?.semantic?.title || "Semantic HTML",
      description: sections?.semantic?.description || "Semantic elements clearly describe their meaning to both browser and developer.",
      codeMarkup: (
        <p style={consolasStyle}>
          <span className="text-pink-600 dark:text-pink-400">&lt;article&gt;</span>
          <br />
          &nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">&lt;h2&gt;</span>
          <span className="text-slate-800 dark:text-gray-200">News Item</span>
          <span className="text-pink-600 dark:text-pink-400">&lt;/h2&gt;</span>
          <br />
          <span className="text-pink-600 dark:text-pink-400">&lt;/article&gt;</span>
        </p>
      ),
      editorText: "<article>\n  <h2>News Item</h2>\n</article>",
      previewElement: (
        <article className="border-l-2 border-indigo-500 pl-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">News Item</h3>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">Rendered inside a semantic article tag.</p>
        </article>
      ),
    },
    forms: {
      title: sections?.forms?.title || "HTML Forms",
      description: sections?.forms?.description || "Forms are used to collect user input.",
      codeMarkup: (
        <p style={consolasStyle}>
          <span className="text-pink-600 dark:text-pink-400">&lt;input</span>{" "}
          <span className="text-indigo-600 dark:text-indigo-400">type</span>=
          <span className="text-green-600 dark:text-green-400">&quot;text&quot;</span>{" "}
          <span className="text-indigo-600 dark:text-indigo-400">placeholder</span>=
          <span className="text-green-600 dark:text-green-400">&quot;Search...&quot;</span>
          <span className="text-pink-600 dark:text-pink-400">&gt;</span>
        </p>
      ),
      editorText: '<input type="text" placeholder="Search..." />',
      previewElement: (
        <div>
          <input
            type="text"
            placeholder="Type something..."
            className="w-full rounded border px-2 py-1 text-xs dark:bg-gray-700 dark:border-gray-600"
            readOnly
          />
          <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400">Interactive form text input.</p>
        </div>
      ),
    },
    tables: {
      title: sections?.tables?.title || "HTML Tables",
      description: sections?.tables?.description || "Tables allow web developers to arrange data into rows and columns.",
      codeMarkup: (
        <p style={consolasStyle}>
          <span className="text-pink-600 dark:text-pink-400">&lt;table&gt;</span>
          <br />
          &nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">&lt;tr&gt;&lt;th&gt;</span>Name
          <span className="text-pink-600 dark:text-pink-400">&lt;/th&gt;&lt;/tr&gt;</span>
          <br />
          <span className="text-pink-600 dark:text-pink-400">&lt;/table&gt;</span>
        </p>
      ),
      editorText: "<table>\n  <tr><th>Name</th></tr>\n</table>",
      previewElement: (
        <div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="pb-1">Header 1</th>
                <th className="pb-1">Header 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pt-1 text-slate-500 dark:text-gray-400">Data A</td>
                <td className="pt-1 text-slate-500 dark:text-gray-400">Data B</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  };

  const currentContent = previewContent[activeSection];

  return (
    <div
      className="
        flex
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-slate-200 dark:border-gray-700
        bg-white dark:bg-gray-800
        shadow-lg dark:shadow-gray-900/50
        transition-colors duration-300
        font-khmer"
    >
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 min-w-0">
        <main
          className="
            flex-1
            min-w-0
            w-full
            p-3
            sm:p-5
            lg:p-8
            space-y-4
            lg:space-y-6
          "
        >
          {/* Header */}
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
              {currentContent.title}
            </h1>

            <p className="mt-2 text-[11px] sm:text-sm text-slate-600 dark:text-gray-400 transition-colors duration-300">
              {currentContent.description}
            </p>
          </div>

          {/* Code Block */}
          <div
            style={consolasStyle}
            className="
              rounded-xl
              border
              border-slate-200 dark:border-gray-700
              bg-slate-50 dark:bg-gray-900
              p-3
              sm:p-4
              text-[10px]
              sm:text-xs
              whitespace-pre-wrap
              break-all
              transition-colors duration-300
            "
          >
            {currentContent.codeMarkup}
          </div>

          <hr className="border-slate-200 dark:border-gray-700 transition-colors duration-300" />

          {/* Interactive */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400 transition-colors duration-300">
              Try It Yourself
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Editor */}
              <div
                style={consolasStyle}
                className="
                  rounded-xl
                  border
                  border-indigo-100 dark:border-indigo-900
                  bg-indigo-50/40 dark:bg-indigo-950/30
                  p-3
                  sm:p-4
                  text-[10px]
                  sm:text-xs
                  text-slate-700 dark:text-gray-300
                  min-h-24
                  sm:min-h-40
                  break-all
                  whitespace-pre-wrap
                  transition-colors duration-300
                "
              >
                {currentContent.editorText}
              </div>

              {/* Preview */}
              <div
                className="
                  flex
                  min-h-24
                  sm:min-h-40
                  flex-col
                  justify-between
                  rounded-xl
                  border
                  border-slate-200 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  p-3
                  sm:p-4
                  transition-colors duration-300
                "
              >
                {currentContent.previewElement}

                <button
                  className="
                    mt-4
                    w-fit
                    rounded-full
                    bg-primary-color dark:bg-blue-500
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-white
                    transition-all
                    hover:bg-primary-color/80 dark:hover:bg-blue-600
                  "
                >
                  Action
                </button>
              </div>
            </div>

            <button
              className="
                rounded-full
                bg-primary-color dark:bg-blue-500
                px-5
                py-2
                text-xs
                font-medium
                text-white
                transition-all
                hover:bg-primary-color/80 dark:hover:bg-blue-600
              "
            >
              Run
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}