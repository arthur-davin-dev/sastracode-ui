"use client"

import { useTranslation } from "@/hooks/useTranslations";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

// Static per-card visuals — not language dependent
const cardStyles = [
  {
    iconBg: "border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30",
    icon: "/home/svg/doc.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/documentation",
  },
  {
    iconBg: "border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30",
    icon: "/home/svg/icon-playground.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/playground/editor/",
  },
  {
    iconBg: "border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30",
    icon: "/home/svg/icon-ai.svg",
    linkColor: "text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300",
    arrow: "assets/svg/home/arrow-purple.svg",
    href: "#3",
  },
  {
    iconBg: "border-cyan-500/15 dark:border-cyan-400/20 bg-[#e0f7fd] dark:bg-cyan-950/30",
    icon: "/home/svg/icon-quiz.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "assets/home/svg/arrow-blue.svg",
    href: "#4",
  },
  {
    iconBg: "border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30",
    icon: "/home/svg/icon-video.svg",
    linkColor: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300",
    arrow: "/home/svg/arrow-blue.svg",
    href: "/playlists",
  },
  {
    iconBg: "border-violet-600/15 dark:border-violet-400/20 bg-violet-100 dark:bg-violet-950/30",
    icon: "/home/svg/icon-roadmap.svg",
    linkColor: "text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300",
    arrow: "/home/svg/arrow-purple.svg",
    href: "#6",
  },
];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      duration: 0.5,
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.1,
    },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: 0.2,
    },
  },
};

// Subtle floating animation for icons
const iconFloatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -4, 0, 4, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.15,
    rotate: [0, -5, 5, -3, 3, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

// Subtle card float animation (different delays per card)
const cardFloatVariants: Variants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [0, -6, 0, 6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.3, // Stagger the floating
    },
  }),
};

const arrowVariants: Variants = {
  hover: {
    x: 6,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

// Subtle pulse for the CTA text
const ctaVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
};

export default function CoreFeatures() {
  const currentT = useTranslation();

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 sm:py-20 lg:pt-20 lg:pb-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <motion.span
            variants={badgeVariants}
            className="inline-block rounded-full border border-blue-600/15 dark:border-blue-400/20 bg-blue-100 dark:bg-blue-950/30 px-5 py-2 font-khmer text-sm font-bold uppercase text-primary-color dark:text-blue-300 transition-colors duration-300"
          >
            {currentT.coreFeature.badge}
          </motion.span>
          
          <motion.h2
            variants={titleVariants}
            className="mt-4 text-4xl font-black tracking-tight sm:text-5xl"
          >
            <span className="text-primary-color dark:text-white">{currentT.coreFeature.headingPrefix}</span>
            <span className="text-secondary-color gradient-features dark:bg-gradient-to-r dark:from-purple-400 dark:to-blue-400 dark:bg-clip-text dark:text-transparent">
              {currentT.coreFeature.headingHighlight}
            </span>
          </motion.h2>
          
          <motion.p
            variants={descriptionVariants}
            className="mx-auto mt-4 max-w-xl font-khmer text-primary-color leading-7 text-slate-body dark:text-gray-400 transition-colors duration-300"
          >
            {currentT.coreFeature.description}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {currentT.coreFeature.cards.map((card, i) => {
            const style = cardStyles[i];
            // Define colors for each card
            const cardColors = [
              { // Courses - Blue
                bg: 'bg-blue-50 dark:bg-blue-950/30',
                border: 'border-blue-200 dark:border-blue-800',
                iconBg: 'bg-blue-100 dark:bg-blue-900/50',
                iconColor: 'text-blue-600 dark:text-blue-400',
                titleColor: 'text-blue-700 dark:text-blue-300',
                linkColor: 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
                shadow: 'hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30'
              },
              { // Challenges - Purple
                bg: 'bg-purple-50 dark:bg-purple-950/30',
                border: 'border-purple-200 dark:border-purple-800',
                iconBg: 'bg-purple-100 dark:bg-purple-900/50',
                iconColor: 'text-purple-600 dark:text-purple-400',
                titleColor: 'text-purple-700 dark:text-purple-300',
                linkColor: 'text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300',
                shadow: 'hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30'
              },
              { // Events - Green
                bg: 'bg-green-50 dark:bg-green-950/30',
                border: 'border-green-200 dark:border-green-800',
                iconBg: 'bg-green-100 dark:bg-green-900/50',
                iconColor: 'text-green-600 dark:text-green-400',
                titleColor: 'text-green-700 dark:text-green-300',
                linkColor: 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300',
                shadow: 'hover:shadow-green-200/50 dark:hover:shadow-green-900/30'
              },
              { // Tools - Orange
                bg: 'bg-orange-50 dark:bg-orange-950/30',
                border: 'border-orange-200 dark:border-orange-800',
                iconBg: 'bg-orange-100 dark:bg-orange-900/50',
                iconColor: 'text-orange-600 dark:text-orange-400',
                titleColor: 'text-orange-700 dark:text-orange-300',
                linkColor: 'text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300',
                shadow: 'hover:shadow-orange-200/50 dark:hover:shadow-orange-900/30'
              }
            ];

            const colors = cardColors[i] || cardColors[0];

            return (
              <motion.article
                key={card.title}
                variants={cardVariants}
                custom={i}
                initial="initial"
                animate="animate"
                whileHover={{
                  scale: 1.03,
                  y: -10,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                }}
                className={`rounded-[22px] border ${colors.border} ${colors.bg} p-8 shadow-[0_4px_10px_rgba(13,27,62,0.07)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                  transition-all duration-300 hover:shadow-lg ${colors.shadow} cursor-pointer`}
              >
                <motion.div
                  variants={iconFloatVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className={`flex size-[52px] items-center justify-center rounded-[14px] border ${colors.border} ${colors.iconBg} transition-colors duration-300`}
                >
                  <img src={style.icon} alt="" className={`size-[22px] ${colors.iconColor}`} />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`mt-5 text-2xl font-extrabold ${colors.titleColor} transition-colors duration-300`}
                >
                  {card.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 font-khmer text-primary-color leading-6 text-slate-body dark:text-gray-400 transition-colors duration-300"
                >
                  {card.description}
                </motion.p>
                
                <motion.div
                  whileHover="hover"
                  variants={ctaVariants}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={style.href}
                    className={`mt-5 inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-300 ${colors.linkColor}`}
                  >
                    {currentT.coreFeature.cta}
                    <motion.img
                      variants={arrowVariants}
                      src={style.arrow}
                      alt=""
                      className={`size-[13px] ${colors.iconColor}`}
                    />
                  </Link>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
