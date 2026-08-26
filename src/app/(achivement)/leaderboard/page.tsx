import Leaderboard from "@/components/leaderboard/leaderboard";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Page() {
  return (
    <main>
      <InteractiveBackground
          speed={1}
          density={100}
          enableMouseGlow={true}
        />
    <Leaderboard />
    </main>
    
  )
}