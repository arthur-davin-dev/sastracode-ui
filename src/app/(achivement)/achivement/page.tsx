import Achievement from "@/components/achievement/Achievement";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import InteractiveBackground from "@/components/InteractiveBackground";

export default async function AchievementPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/login/keycloak?callbackUrl=%2Fachivement");
  }

  return (
    <main className="relative min-h-screen">
          <InteractiveBackground
        />
        <div  className="relative z-10">
          <Achievement />
        </div>
      
    </main>
  );
}
