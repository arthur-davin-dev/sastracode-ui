"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from "@/lib/language-context"
import {
  statsContainerVariants,
  statVariants,
  numberVariants,
  statHoverVariants,
  percentPulseVariants
} from './animations/statAnimations'

// Translations
const translations = {
  en: {
    stats: {
      lessons: "Lessons",
      like: "Likes",
      price: "price",
    }
  },
  km: {
    stats: {
      lessons: "មេរៀន",
      like: "ការពេញចិត្ត",
      price: "គិតថ្លៃ",
    }
  }
}

// Static values
const statsData = {
  lesson: "101+",
  percent: "99.9%",
  price: "0$",
}

// Stat item component
interface StatItemProps {
  value: string
  label: string
  index: number
  className?: string
  isPercent?: boolean
}

const StatItem: React.FC<StatItemProps> = ({ 
  value, 
  label, 
  index, 
  className = "",
  isPercent = false 
}) => {
  return (
    <motion.div 
      className={className}
      variants={statVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      {...statHoverVariants}
      whileHover="hover"
    >
      {isPercent ? (
        <motion.div
          variants={percentPulseVariants}
          animate="animate"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-red-500 dark:text-red-400">
            {value}
          </h3>
        </motion.div>
      ) : (
        <motion.h3 
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
          variants={numberVariants}
          initial="hidden"
          animate="visible"
        >
          {value}
        </motion.h3>
      )}
      <motion.p 
        className="text-sm sm:text-base text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.2 }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}

export default function Stats() {
  const { lang } = useLanguage()
  const t = translations[lang as keyof typeof translations] || translations.en

  return (
    <motion.div 
      className="mt-10 sm:mt-12 lg:mt-16 flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 lg:gap-16"
      variants={statsContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <StatItem
        value={statsData.lesson}
        label={t.stats.lessons}
        index={0}
        className="text-center lg:text-left min-w-[80px]"
      />
      
      <StatItem
        value={statsData.percent}
        label={t.stats.like}
        index={1}
        isPercent={true}
      />
      
      <StatItem
        value={statsData.price}
        label={t.stats.price}
        index={2}
      />
    </motion.div>
  )
}