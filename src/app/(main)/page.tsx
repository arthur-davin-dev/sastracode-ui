import Banner from "@/components/home/banner/Banner";
import CoreFeatures from "@/components/home/core-feature/CoreFeature";
import { RightWavyStack } from "@/components/home/technology-stack/WavyStack";
import Review from "@/components/home/review/Review";
import Resource from "@/components/home/resource/Resource";
import LandingCourses from "@/components/home/landing-courses/course";
import HomePopularDocumentation from "@/components/home/HomePopularDocumentation";
import ScrollReveal from "@/components/home/ScrollReveal";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Page() {
  return (
    <InteractiveBackground >
      <div className=" text-gray-900 dark:text-gray-100 min-h-screen">
        {/* <Hero /> */}
        <Banner />
        <ScrollReveal>
          <RightWavyStack />
        </ScrollReveal>
        {/* <Resource /> */}
        {/* <InteractiveGrid /> */}
        {/* <CoreFeatures /> */}
        <ScrollReveal>
          <LandingCourses />
        </ScrollReveal>
        {/* <HomePopularDoc />
      <HomePopularCourse /> */}
        {/* <HeroCharacter /> */}
        {/* <TechStackSection /> */}
        <ScrollReveal>
          <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
            <HomePopularDocumentation />
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <Review />
        </ScrollReveal>
      </div>
    </InteractiveBackground>
  );
}
