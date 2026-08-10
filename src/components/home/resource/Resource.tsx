import { Layers, GitBranch, Server, Route, ShieldCheck, Rocket } from "lucide-react";

const resources = [
  {
    name: "Next.js",
    icon: Layers,
    // Dark gradient theme
    bgClass: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",
    borderClass: "border-gray-200 dark:border-gray-700",
    iconBgClass: "bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600",
    iconClass: "text-white",
    hoverClass: "hover:shadow-gray-300/50 dark:hover:shadow-gray-800/50",
    textClass: "text-gray-800 dark:text-white",
  },
  {
    name: "App Router",
    icon: GitBranch,
    bgClass: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20",
    borderClass: "border-blue-200 dark:border-blue-800",
    iconBgClass: "bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500",
    iconClass: "text-white",
    hoverClass: "hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30",
    textClass: "text-blue-700 dark:text-blue-300",
  },
  {
    name: "Server Components",
    icon: Server,
    bgClass: "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/40 dark:to-purple-900/20",
    borderClass: "border-purple-200 dark:border-purple-800",
    iconBgClass: "bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-500",
    iconClass: "text-white",
    hoverClass: "hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30",
    textClass: "text-purple-700 dark:text-purple-300",
  },
  {
    name: "API Routes",
    icon: Route,
    bgClass: "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/40 dark:to-green-900/20",
    borderClass: "border-green-200 dark:border-green-800",
    iconBgClass: "bg-gradient-to-br from-green-500 to-green-600 dark:from-green-400 dark:to-green-500",
    iconClass: "text-white",
    hoverClass: "hover:shadow-green-200/50 dark:hover:shadow-green-900/30",
    textClass: "text-green-700 dark:text-green-300",
  },
  {
    name: "Middleware",
    icon: ShieldCheck,
    bgClass: "bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/40 dark:to-pink-900/20",
    borderClass: "border-pink-200 dark:border-pink-800",
    iconBgClass: "bg-gradient-to-br from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500",
    iconClass: "text-white",
    hoverClass: "hover:shadow-pink-200/50 dark:hover:shadow-pink-900/30",
    textClass: "text-pink-700 dark:text-pink-300",
  },
  {
    name: "Deployment",
    icon: Rocket,
    bgClass: "bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/40 dark:to-orange-900/20",
    borderClass: "border-orange-200 dark:border-orange-800",
    iconBgClass: "bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500",
    iconClass: "text-white",
    hoverClass: "hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30",
    textClass: "text-orange-700 dark:text-orange-300",
  },
];

export default function NextjsResourceCards() {
  return (
    <div className="w-full flex items-start justify-center py-8 px-6 transition-colors duration-200 my-10">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#1E1B4B] dark:text-[#F5F6FA] mb-8 transition-colors duration-200">
          Free resources to learn Next.js
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {resources.map(({ 
            name, 
            icon: Icon, 
            iconClass, 
            iconBgClass,
            borderClass,
            bgClass,
            hoverClass,
            textClass
          }) => (
            <button
              key={name}
              className={`group flex items-center gap-3 rounded-xl px-4 py-4 text-left border
                ${bgClass} ${borderClass}
                ${hoverClass}
                transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
            >
              <span
                className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0
                  ${iconBgClass}`}
              >
                <Icon size={18} className={iconClass} strokeWidth={2.2} />
              </span>
              <span className={`font-semibold text-[15px] ${textClass} transition-colors duration-200`}>
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}