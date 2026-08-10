import Banner from "@/components/home/banner/Banner";
import CoreFeatures from "@/components/home/core-feature/CoreFeature";
import { RightWavyStack } from "@/components/home/technology-stack/WavyStack";
import Review from "@/components/home/review/Review";
import Resource from "@/components/home/resource/Resource";
import LandingCourses from "@/components/home/landing-courses/course";
import HomePopularDocumentation from "@/components/home/HomePopularDocumentation";

export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* <Hero /> */}
      <Banner />
      <RightWavyStack />
      <Resource />
      {/* <InteractiveGrid /> */}
      <CoreFeatures />
      <LandingCourses />
      {/* <HomePopularDoc />
      <HomePopularCourse /> */}
      {/* <HeroCharacter /> */}
      {/* <TechStackSection /> */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8 mt-10">
        <HomePopularDocumentation />
      </div>
      <Review />
    </div>
  );
}
