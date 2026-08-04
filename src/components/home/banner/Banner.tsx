"use client"
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Stats from './Stats'
import CodeWindow from './CodeWindow'
import { useTranslation } from '@/hooks/useTranslations'
import { LeftWavyStack } from '../technology-stack/WavyStack'
import {
  containerVariants,
  itemVariants,
  badgeVariants,
  pulseVariants,
  buttonVariants
} from './animations/bannerAnimations'
import { logos } from '../technology-stack/logo'
import { LogoLoop } from '../technology-stack/LogoLoop'

export default function Banner() {
  const currentT = useTranslation();

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-6 sm:py-20 lg:pt-20 lg:pb-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT */}
          <motion.div
            className="text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center rounded-full border px-3 sm:px-4 py-2 text-[10px] sm:text-xs tracking-wider text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 font-(family-name:--font-sans)"
              variants={badgeVariants}
              whileHover="hover"
            >
              <motion.span
                className="mr-2 h-2 w-2 rounded-full bg-purple-500"
                variants={pulseVariants}
                animate="animate"
              ></motion.span>
              {currentT.banner.badge}
            </motion.div>

            <motion.h1
              className="mt-6 sm:mt-8 text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight font-(family-name:--font-sans) line-clamp-2"
              variants={itemVariants}
            >
              <span className="text-[#0B2B66] dark:text-blue-400">
                {currentT.banner.title1}
              </span>
              <span className="text-[#0B2B66] dark:text-blue-400">
                {currentT.banner.title2}
              </span>
              <br />
              <span className="text-[#0B2B66] dark:text-blue-400">
                {currentT.banner.title3}
              </span>
              <span className="text-red-600 dark:text-red-400">
                {currentT.banner.title4}
              </span>
              <span className="ml-3 text-[#0B2B66] dark:text-blue-400">
                {currentT.banner.title5}
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 sm:mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-7 sm:leading-8 text-gray-500 dark:text-gray-400"
              variants={itemVariants}
            >
              {currentT.banner.description}
            </motion.p>

            <motion.div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  href="/register"
                  className="min-w-[12rem] lg:min-w-[16rem] rounded-[16px] bg-[#0B2B66] dark:bg-blue-600 px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-base font-semibold text-white hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors text-center inline-block"
                >
                  {currentT.banner.start}
                </Link>
              </motion.div>

              <motion.button
                className="min-w-[8rem] lg:min-w-[10rem] rounded-[16px] border border-gray-300 dark:border-gray-600 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {"</>"} {currentT.banner.explore}
              </motion.button>
            </motion.div>

            <Stats />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="flex justify-center lg:justify-end mt-5 lg:mt-0"
            variants={itemVariants}
          >
            <CodeWindow />
          </motion.div>
        </motion.div>
      </div>
      <LogoLoop
        direction="left"
        className="p-10 fade-slide-up"
        logos={logos}
        renderItem={(item, key) => (
          <div key={key} className="flex items-center gap-2">
            <img
              src={item.src}
              alt={item.alt || item.title}
              className="h-10 w-10"
            />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
        )}
        style={{
          backgroundColor: "#002455", // Primary background
          border: "2px solid #f1b012", // Border color
          borderRadius: "8px",         // Optional rounded corners
          padding: "20px",             // Optional spacing
          color: "white"
        }}
      />
      {/* <LeftWavyStack /> */}
    </section>
  )
}