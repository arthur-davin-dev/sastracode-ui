import Banner from '@/components/home/Banner'
import CoreFeatures from '@/components/home/core-feature/CoreFeature'
import InteractiveDoc from '@/components/home/interactive-doc/InteractiveDoc'
import FeatureSection from '@/components/home/results-and-rewards/FeatureSection'
import Rewards from '@/components/home/results-and-rewards/Rewards'
import Showcase from '@/components/home/show-case/Showcase'
import SupportTeam from '@/components/home/support-team/SupportTeam'
import TechStackSection from '@/components/home/technology-stack/TechStackSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <Banner />
      <Showcase />
      <InteractiveDoc />
      <CoreFeatures />
      <TechStackSection />
      <FeatureSection />
      <Rewards />
      <SupportTeam />
    </div>
  )
}
