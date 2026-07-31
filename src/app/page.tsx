
import React from 'react'
import Banner from '@/components/home/banner/Banner'
import CoreFeatures from '@/components/home/core-feature/CoreFeature'
import HeroCharacter from '@/components/home/show-case/HeroCharacter'
import {LeftWavyStack, RightWavyStack} from '@/components/home/technology-stack/WavyStack'
import InteractiveGrid from '@/components/home/interactive-grid/InteractiveGrid'
import { courses, currentProgress, forumPosts, promoBanner } from "@/lib/data/courses";
import CourseGrid from '@/components/documentation/CourseGrid'
import { HomePopularCourse, HomePopularDoc } from '@/components/home/cards/HomePopularCourse'
import TechStackSection from '@/components/home/technology-stack/TechStackSection'
// import Hero from '@/components/home/hero-section/Hero'

export default function page() {
  return (
    <div className="dark:bg-gray-900">
      {/* <Hero /> */}
      <Banner />
      <RightWavyStack />
      {/* <InteractiveGrid /> */}
      <CoreFeatures />
      <HomePopularDoc />
      <HomePopularCourse />
      {/* <HeroCharacter /> */}
        {/* <TechStackSection /> */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8 mt-10">
        <CourseGrid title="ភាសាទាំងអស់" courses={courses} seeAllHref="/documentation/search" />
      </div>
    </div>
  )
}
