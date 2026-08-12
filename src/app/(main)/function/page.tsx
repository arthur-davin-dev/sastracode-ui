import TechStackSection from "@/components/function/TechStackSection";
import CoreFeatures from "@/components/home/core-feature/CoreFeature";
import InteractiveDoc from "@/components/home/interactive-doc/InteractiveDoc";
import InteractiveGrid from "@/components/home/interactive-grid/InteractiveGrid";
import HeroCharacter from "@/components/home/show-case/HeroCharacter";
import SupportTeam from "@/components/home/support-team/SupportTeam";

export default function FunctionPage() {
  return (
    <section className="dark:bg-gray-900">
      <HeroCharacter />
      <CoreFeatures />
      <InteractiveGrid />
      <InteractiveDoc />
      <TechStackSection />
      <SupportTeam />
    </section>
  );
}
