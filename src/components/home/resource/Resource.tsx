import { Layers, GitBranch, Server, Route, ShieldCheck, Rocket } from "lucide-react";
import { motion } from "framer-motion";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.5,
    },
  },
};

// Subtle floating animation for icons
const iconFloatVariants = {
  initial: { y: 0, rotate: 0 },
  animate: (i: number) => ({
    y: [0, -3, 0, 3, 0],
    rotate: [0, 2, 0, -2, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.2,
    },
  }),
  hover: {
    scale: 1.2,
    rotate: [0, -5, 5, -3, 3, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// Subtle card float animation
const cardFloatVariants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [0, -4, 0, 4, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.25,
    },
  }),
};

// Text shimmer effect on hover
const textVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

// Container pulse effect
const containerPulseVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function NextjsResourceCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex items-start justify-center py-8 px-6 my-10"
    >
      <div className="w-full flex items-start justify-center py-8 px-6 transition-colors duration-200 my-10">
        <div className="w-full max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-extrabold text-[#1E1B4B] dark:text-[#F5F6FA] mb-8 transition-colors duration-200"
          >
            Free resources to learn Next.js
          </motion.h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {resources.map(({
              name,
              icon: Icon,
              iconClass,
              iconBgClass,
              borderClass,
              bgClass,
              hoverClass,
              textClass
            }, index) => (
              <motion.button
                key={name}
                variants={cardVariants}
                custom={index}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className={`group flex items-center gap-3 rounded-xl px-4 py-4 text-left border
                  ${bgClass} ${borderClass}
                  ${hoverClass}
                  transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden`}
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                  }}
                />
                
                <motion.span
                  variants={iconFloatVariants}
                  custom={index}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 relative z-10
                    ${iconBgClass}`}
                >
                  <Icon size={18} className={iconClass} strokeWidth={2.2} />
                </motion.span>
                
                <motion.span
                  variants={textVariants}
                  className={`font-semibold text-[15px] ${textClass} transition-colors duration-200 relative z-10`}
                >
                  {name}
                </motion.span>
                
                {/* Subtle shine effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: "100%",
                    transition: {
                      duration: 0.6,
                      ease: "easeInOut",
                    },
                  }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}