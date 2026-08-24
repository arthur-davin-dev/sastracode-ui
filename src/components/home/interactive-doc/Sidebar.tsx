// Sidebar.tsx
import { SectionKey } from "./InteractiveDoc";

interface SidebarProps {
    activeSection: SectionKey;
    setActiveSection: (section: SectionKey) => void;
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
    const navItems: { key: SectionKey; label: string }[] = [
        { key: "introduction", label: "Introduction" },
        { key: "elements", label: "HTML Elements" },
        { key: "attributes", label: "HTML Attributes" },
        { key: "semantic", label: "Semantic HTML" },
        { key: "forms", label: "Forms" },
        { key: "tables", label: "Tables" },
    ];

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
                {navItems.map((item) => {
                    const isActive = activeSection === item.key;
                    return (
                        <div
                            key={item.key}
                            onClick={() => setActiveSection(item.key)}
                            className={`flex items-center justify-between rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 transition-colors duration-300 cursor-pointer ${
                                isActive
                                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border-r-4 border-indigo-600 dark:border-indigo-400"
                                    : "hover:bg-slate-50 dark:hover:bg-gray-700"
                            }`}
                        >
                            <span className="truncate">{item.label}</span>
                            <span className={isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-gray-500"}>
                                ›
                            </span>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}