import React from "react";
import HeroSection from "./hero-section";
import Mission from "./mission";
import Timeline from "./timeline";
import Mentor from "./mentor";
import TeamLeader from "./team-leader";
import TeamMember from "./team-member";


export default function AboutUs() {
  return (
    <>
      <main>
        <HeroSection />
        <Mission />
        <Timeline />

        {/* Grouping related team sections for better document outline  */}
        <section aria-labelledby="team-section-heading">
          <Mentor />
          <TeamLeader />
          <TeamMember />
        </section>
      </main>
    </>
  );
}
