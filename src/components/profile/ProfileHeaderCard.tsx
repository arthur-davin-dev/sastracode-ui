import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";

export function ProfileHeaderCard({ profile }: { profile: UserProfile }) {
  return (
    <Card className="dark:bg-slate-900/80 dark:border-slate-800 transition-colors duration-300 shadow-sm hover:shadow-md">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 dark:border dark:border-slate-700">
            <AvatarImage src={profile.avatarUrl} />
            <AvatarFallback className="dark:bg-slate-800 dark:text-white">
              {profile.firstName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg text-indigo-950 dark:text-white transition-colors duration-300">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-lg text-primary-color dark:text-slate-400 italic transition-colors duration-300">
              "{profile.quote}"
            </p>
          </div>
        </div>

        <Button className="text-white text-lg bg-indigo-950 hover:bg-indigo-900 dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-colors duration-300">
          កែប្រែការផ្លាស់ប្តូរ
        </Button>
      </CardContent>
    </Card>
  );
}