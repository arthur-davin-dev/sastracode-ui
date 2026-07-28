"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";
import { Edit3 } from "lucide-react";

interface ProfileHeaderCardProps {
  profile: UserProfile;
  onEditClick?: () => void;
}

export function ProfileHeaderCard({ profile, onEditClick }: ProfileHeaderCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-3xl  border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl">
      
      {/* Top Accent Ribbon */}
      <div className="absolute top-0 left-0 w-full h-2 " />

      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8">
        
        {/* User Avatar & Info Section */}
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          
          <div className="relative shrink-0">
            <Avatar className="h-20 w-20 ">
              <AvatarImage src={profile.avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} />
              <AvatarFallback className="bg-yellow-400/20 text-red-600 text-2xl font-black">
                {profile.firstName?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full  animate-pulse pointer-events-none" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-primary-color leading-tight">
              {profile.firstName} {profile.lastName}
            </h2>

            {profile.quote && (
              <p className="text-lg font-medium text-primary-color opacity-80 italic leading-relaxed">
                "{profile.quote}"
              </p>
            )}
          </div>

        </div>

        {/* Action Button - Scrolls and focuses on #firstName */}
        <Button
          onClick={onEditClick}
          className="w-full sm:w-auto h-14 px-6 rounded-2xl text-lg font-bold text-white bg-red-600 hover:bg-primary-color hover:text-white   shadow-md transition-all duration-300 gap-2.5 shrink-0 flex items-center justify-center border border-red-500/40 group"
        >
          <Edit3 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          <span>កែប្រែការផ្លាស់ប្តូរ</span>
        </Button>

      </CardContent>
    </Card>
  );
}