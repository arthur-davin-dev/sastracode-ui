// Sidebar.tsx
export default function Sidebar() {
    return (
        <aside
            className="
                w-24
                sm:w-28
                md:w-40
                lg:w-52
                shrink-0
                border-r
                border-slate-200 dark:border-gray-700
                bg-white dark:bg-gray-800
                p-2
                sm:p-3
                lg:p-5
                transition-colors duration-300
            "
        >
            {/* Search */}
            <input
                type="text"
                placeholder="Search topics..."
                className="
                    mb-4
                    w-full
                    rounded-lg
                    border
                    border-indigo-100 dark:border-indigo-900
                    bg-indigo-50/50 dark:bg-indigo-950/30
                    px-3
                    py-2
                    text-xs
                    sm:text-sm
                    text-slate-800 dark:text-gray-200
                    placeholder-slate-400 dark:placeholder-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/20
                    transition-colors duration-300
                "
            />

            <nav className="flex flex-col gap-1 text-[10px] sm:text-xs lg:text-sm font-medium text-slate-600 dark:text-gray-400 transition-colors duration-300">
                <div className="rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    Introduction
                </div>

                <div className="flex items-center justify-between rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border-r-4 border-indigo-600 dark:border-indigo-400 px-2 py-1.5 transition-colors duration-300">
                    <span className="truncate">HTML Elements</span>
                    <span>›</span>
                </div>

                <div className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    HTML Attributes
                </div>

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        rounded-lg
                        px-3
                        py-2
                        hover:bg-slate-50 dark:hover:bg-gray-700
                        transition-colors duration-300
                        cursor-pointer
                    "
                >
                    <span className="min-w-0 break-words">Semantic HTML</span>
                    <span className="text-slate-400 dark:text-gray-500">›</span>
                </div>

                <div className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    Forms
                </div>

                <div className="rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
                    Tables
                </div>
            </nav>
        </aside>
    );
}