
import Banner from '@/components/home/banner/Banner'
import CoreFeatures from '@/components/home/core-feature/CoreFeature'
import InteractiveDoc from '@/components/home/interactive-doc/InteractiveDoc'
import FeatureSection from '@/components/home/results-and-rewards/FeatureSection'
import Rewards from '@/components/home/results-and-rewards/Rewards'
// import Showcase from '@/components/home/show-case/Showcase'
import SupportTeam from '@/components/home/support-team/SupportTeam'
import TechStackSection from '@/components/home/technology-stack/TechStackSection'
import HeroCharacter from '@/components/home/show-case/HeroCharacter'

export default function page() {
  return (
    <div className="dark:bg-gray-900">
      <HeroCharacter />
      <Banner />
      {/* <Showcase /> */}
      <InteractiveDoc />
      <CoreFeatures />
      <TechStackSection />
      <FeatureSection />
      <Rewards />
      {/* <SupportTeam /> */}
    </div>
  )
}
