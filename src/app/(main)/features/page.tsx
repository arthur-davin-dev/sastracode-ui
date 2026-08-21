import TechStackSection from "@/components/function/TechStackSection";
import InteractiveDoc from "@/components/home/interactive-doc/InteractiveDoc";
import InteractiveGrid from "@/components/home/interactive-grid/InteractiveGrid";
import HeroCharacter from "@/components/home/show-case/HeroCharacter";
import Showcase from "@/components/home/show-case/Showcase";
import SupportTeam from "@/components/home/support-team/SupportTeam";

export default function Features(){
    return (
       <section>
            <HeroCharacter />
            <InteractiveGrid />
            <InteractiveDoc />
            <TechStackSection />
            <SupportTeam />
       </section>
    )
}