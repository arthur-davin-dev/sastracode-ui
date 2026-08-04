"use client"
import React from 'react'
import Banner from '@/components/home/banner/Banner'
import CoreFeatures from '@/components/home/core-feature/CoreFeature'
import HeroCharacter from '@/components/home/show-case/HeroCharacter'
import { LeftWavyStack, RightWavyStack } from '@/components/home/technology-stack/WavyStack'
import InteractiveGrid from '@/components/home/interactive-grid/InteractiveGrid'
import { lessons, currentProgress, forumPosts, promoBanner } from "@/lib/data/courses";
import CourseGrid from '@/components/documentation/CourseGrid'
import { HomePopularCourse, HomePopularDoc } from '@/components/home/cards/HomePopularCourse'
import TechStackSection from '@/components/function/TechStackSection'
import Review from '@/components/home/review/Review'
import Resource from '@/components/home/resource/Resource'
import LogoLoop from '@/components/home/technology-stack/LogoLoop'
import { title } from 'process'
import { CustomLogoLoop } from '@/components/home/technology-stack/CustomLogoLoop'
import { logos } from '@/components/home/technology-stack/logo'
// import Hero from '@/components/home/hero-section/Hero'

export default function page() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* <Hero /> */}
      <Banner />
      <LogoLoop
        direction="right"
        className="p-10 fade-scale"
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
      />

      {/* <RightWavyStack /> */}
      <Resource />
      {/* <InteractiveGrid /> */}
      <CoreFeatures />
      <HomePopularDoc />
      {/* <PopularDoc /> */}
      <HomePopularCourse />
      {/* <HeroCharacter /> */}
      {/* <TechStackSection /> */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8 mt-10">
        <CourseGrid title="ភាសាទាំងអស់" courses={lessons} seeAllHref="/documentation/search" />
      </div>
      <Review />
    </div>
  )
}
