import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";

export function ProfileHeaderCard({ profile }: { profile: UserProfile }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatarUrl} />
            <AvatarFallback>{profile.firstName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg text-indigo-950">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-lg text-primary-color italic">"{profile.quote}"</p>
          </div>
        </div>

        <Button className="​ text-white text-lg bg-indigo-950 hover:bg-indigo-900">
          កែប្រែការផ្លាស់ប្តូរ
        </Button>
      </CardContent>
    </Card>
  );
}