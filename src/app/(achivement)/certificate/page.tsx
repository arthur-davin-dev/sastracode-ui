import Certificate from "@/components/certificate/certificate";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Page() {
  return (
    <InteractiveBackground speed={1} density={100} enableMouseGlow>
      <Certificate />
    </InteractiveBackground>
  );
}

