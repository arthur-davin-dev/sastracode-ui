import FeaturesProcess from "@/components/feature-page/features-process";
import LearningShowcase from "@/components/function/LearningShowcase";
import TechStack from "@/components/function/tech-stack";
import TechStackSection from "@/components/function/TechStackSection";
import InteractiveDoc from "@/components/home/interactive-doc/InteractiveDoc";
import InteractiveGrid from "@/components/home/interactive-grid/InteractiveGrid";
import HeroCharacter from "@/components/home/show-case/HeroCharacter";
// import Showcase from "@/components/home/show-case/Showcase";
import SupportTeam from "@/components/home/support-team/SupportTeam";

export default function Features(){
    return (
       <section>
            <HeroCharacter />
            {/* <LearningShowcase /> */}
            <InteractiveGrid />
            <InteractiveDoc />
            <FeaturesProcess></FeaturesProcess>
            {/* <TechStackSection /> */}
            <TechStack></TechStack>
            <SupportTeam />
       </section>
    )
}