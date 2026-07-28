// PreviewCard.tsx
import Sidebar from "./Sidebar";

export default function PreviewCard() {
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
                transition-colors duration-300"
        >
            <Sidebar />
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
                            HTML Elements
                        </h1>

                        <p className="mt-2 text-[11px] sm:text-sm text-slate-600 dark:text-gray-400 transition-colors duration-300">
                            HTML elements are the building blocks of HTML pages.
                        </p>
                    </div>

                    {/* Code Block */}
                    <div
                        className="
                        rounded-xl
                        border
                        border-slate-200 dark:border-gray-700
                        bg-slate-50 dark:bg-gray-900
                        p-3
                        sm:p-4
                        font-mono
                        text-[10px]
                        sm:text-xs
                        whitespace-pre-wrap
                        break-all
                        transition-colors duration-300
                    "
                    >
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

                        <p>
                            <span className="text-pink-600 dark:text-pink-400">&lt;button&gt;</span>
                            <span className="text-slate-800 dark:text-gray-200">Get Started</span>
                            <span className="text-pink-600 dark:text-pink-400">&lt;/button&gt;</span>
                        </p>
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
                                className="
                                rounded-xl
                                border
                                border-indigo-100 dark:border-indigo-900
                                bg-indigo-50/40 dark:bg-indigo-950/30
                                p-3
                                sm:p-4
                                font-mono
                                text-[10px]
                                sm:text-xs
                                text-slate-700 dark:text-gray-300
                                min-h-24
                                sm:min-h-40
                                break-all
                                transition-colors duration-300
                            "
                            >
                                &lt;h1&gt;Hello SastraCode!&lt;/h1&gt;
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
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white transition-colors duration-300">
                                        Hello SastraCode!
                                    </h3>

                                    <p className="mt-1 text-[11px] text-slate-500 dark:text-gray-400 transition-colors duration-300">
                                        Awarded for completing your learning
                                        journey.
                                    </p>
                                </div>

                                <button
                                    className="
                                    mt-4
                                    w-fit
                                    rounded-md
                                    bg-blue-600 dark:bg-blue-500
                                    px-3
                                    py-2
                                    text-xs
                                    font-medium
                                    text-white
                                    transition-all
                                    hover:bg-blue-700 dark:hover:bg-blue-600
                                "
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>

                        <button
                            className="
                            rounded-lg
                            bg-indigo-600 dark:bg-indigo-500
                            px-5
                            py-2
                            text-xs
                            font-medium
                            text-white
                            transition-all
                            hover:bg-indigo-700 dark:hover:bg-indigo-600
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