import Banner from "@/components/home/banner/Banner";
import { RightWavyStack } from "@/components/home/technology-stack/WavyStack";
import Review from "@/components/home/review/Review";
import LandingCourses from "@/components/home/landing-courses/course";
import HomePopularDocumentation from "@/components/home/HomePopularDocumentation";
import ScrollReveal from "@/components/home/ScrollReveal";


export default function Page() {
  return (
    <main className="min-h-screen bg-transparent text-gray-900 transition-colors duration-300 dark:bg-transparent dark:text-gray-100">
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
    </main>
  );
}
