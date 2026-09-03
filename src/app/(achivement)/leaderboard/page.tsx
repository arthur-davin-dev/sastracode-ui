import Leaderboard from "@/components/leaderboard/leaderboard";
import InteractiveBackground from "@/components/InteractiveBackground";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/login/keycloak?callbackUrl=%2Fleaderboard");
  }

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