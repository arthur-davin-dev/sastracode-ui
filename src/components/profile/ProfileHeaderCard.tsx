"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Edit3, Loader2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUploadMyAvatarMutation } from "@/redux/service/profile-api";
import type { UserProfile } from "@/types/profile";

interface ProfileHeaderCardProps {
  profile: UserProfile;
  isEditing?: boolean;
  onEditClick?: () => void;
}

export function ProfileHeaderCard({ profile, isEditing = false, onEditClick }: ProfileHeaderCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadMyAvatarMutation();

  useEffect(() => () => {
    if (avatarPreviewUrl?.startsWith("blob:")) URL.revokeObjectURL(avatarPreviewUrl);
  }, [avatarPreviewUrl]);

  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim() || profile.username || "User";
  const initials = fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const avatarUrl = avatarPreviewUrl ?? profile.avatarUrl;

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("The image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    setAvatarPreviewUrl(URL.createObjectURL(file));
    try {
      const result = await uploadAvatar(file).unwrap();
      if (result.avatarFileId) setAvatarPreviewUrl(`/api/profile/avatar/${encodeURIComponent(result.avatarFileId)}?v=${Date.now()}`);
      toast.success("Profile photo updated.");
    } catch (error) {
      console.error("Upload avatar failed:", error);
      setAvatarPreviewUrl(undefined);
      toast.error("Unable to update the profile photo.");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-color via-primary-color/80 to-primary-color px-6 py-7 text-white shadow-lg sm:px-10 sm:py-8">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -right-28 -top-40 size-[430px] rounded-full border border-white/20" />
        <div className="absolute -right-12 -top-24 size-[340px] rounded-full border border-white/15" />
        <div className="absolute right-1/3 top-8 size-1.5 rounded-full bg-violet-200" />
        <div className="absolute bottom-8 right-20 size-2 rounded-full bg-white/40" />
      </div>

      <div className="relative flex flex-col items-center gap-7 md:flex-row">
        <div className="relative shrink-0">
          <Avatar className="size-32 border-4 border-white bg-violet-100 shadow-xl sm:size-36">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
            <AvatarFallback className="bg-violet-100 text-3xl font-bold text-violet-700">{initials}</AvatarFallback>
          </Avatar>
          <button type="button" aria-label="Change profile photo" disabled={isUploadingAvatar} onClick={() => inputRef.current?.click()} className="absolute -bottom-1 -right-1 flex size-11 items-center justify-center rounded-full border-4 border-[#4938ca] bg-white text-violet-600 shadow-md transition hover:scale-105 disabled:opacity-60">
            {isUploadingAvatar ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-5" />}
          </button>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleAvatarChange} />
        </div>

        <div className="min-w-0 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{fullName}</h1>
            {profile.status && <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-white/25">{profile.status}</span>}
          </div>
          {profile.username && <p className="mt-1 !text-lg font-medium text-violet-100">@{profile.username}</p>}
          <p className="mt-2 !text-base font-medium text-white/90">{profile.workStudyType === "EMPLOYEE" ? "Professional learner" : "Student learner"}</p>
          {profile.institutionName && <p className="mt-1 flex items-center justify-center gap-1.5 !text-sm text-violet-100 md:justify-start"><MapPin className="size-4" />{profile.institutionName}</p>}
          <p className="mt-3 max-w-2xl !text-sm italic leading-6 text-white/80">“{profile.biography || "Learning today, building tomorrow."}”</p>
        </div>

        {!isEditing && <Button type="button" onClick={onEditClick} className="h-11 shrink-0 rounded-xl bg-white px-5 font-semibold text-[#172052] shadow-md hover:bg-violet-50"><Edit3 className="mr-2 size-4" />Edit profile</Button>}
      </div>
    </section>
  );
}
