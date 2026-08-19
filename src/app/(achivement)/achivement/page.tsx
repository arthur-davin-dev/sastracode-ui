import Achievement from "@/components/achievement/Achievement";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AchievementPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/login/keycloak?callbackUrl=%2Fachivement");
  }

  return (
    <main>
      <Achievement />
    </main>
  );
}
