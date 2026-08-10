"use client";

import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Camera, Edit3 } from "lucide-react";
import { toast } from "sonner";

import type { UserProfile } from "@/types/profile";
import { useUploadMyAvatarMutation } from "@/redux/service/profile-api";

// import { useUploadMyAvatarMutation } from "@/redux/services/profile-api";

interface ProfileHeaderCardProps {
  profile: UserProfile;

  onEditClick?: () => void;
}

export function ProfileHeaderCard({
  profile,
  onEditClick,
}: ProfileHeaderCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [uploadAvatar, { isLoading: isUploadingAvatar }] =
    useUploadMyAvatarMutation();

  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>();

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  const fullName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    profile.username ||
    "User";

  const initial = (
    profile.firstName?.[0] ??
    profile.username?.[0] ??
    "U"
  ).toUpperCase();

  const avatarUrl = avatarPreviewUrl ?? profile.avatarUrl;

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("សូមជ្រើសរើសឯកសាររូបភាព។");

      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreviewUrl(previewUrl);

    try {
      const uploadedAvatar = await uploadAvatar(file).unwrap();

      // Switch from the temporary browser preview to the authenticated proxy.
      // This makes the uploaded avatar visible immediately, even while the
      // profile query is being refreshed in the background.
      if (uploadedAvatar.avatarFileId) {
        setAvatarPreviewUrl(
          `/api/profile/avatar/${encodeURIComponent(uploadedAvatar.avatarFileId)}?v=${Date.now()}`,
        );
      }

      toast.success("រូបភាពត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ។");
    } catch (error) {
      console.error("Upload avatar failed:", error);

      setAvatarPreviewUrl(undefined);

      toast.error("មិនអាចផ្លាស់ប្តូររូបភាពបានទេ។");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="absolute left-0 top-0 h-2 w-full" />

      <CardContent className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
        {/* User */}

        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          {/* Avatar */}

          <div className="relative shrink-0">
            <Avatar className="h-24 w-24">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}

              <AvatarFallback className="bg-yellow-400/20 text-2xl font-black text-red-600">
                {initial}
              </AvatarFallback>
            </Avatar>

            {/* Change avatar */}

            <button
              type="button"
              disabled={isUploadingAvatar}
              onClick={() => inputRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary-color text-white shadow-md transition hover:opacity-80 disabled:opacity-50"
              aria-label="Change avatar"
            >
              <Camera className="h-4 w-4" />
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </div>

          {/* Information */}

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold leading-tight text-primary-color">
              {fullName}
            </h2>

            {profile.username && (
              <p className="font-medium text-slate-500">@{profile.username}</p>
            )}

            {profile.email && (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {profile.email}
              </p>
            )}

            {profile.biography && (
              <p className="max-w-xl text-lg font-medium italic leading-relaxed text-primary-color opacity-80">
                &quot;
                {profile.biography}
                &quot;
              </p>
            )}
          </div>
        </div>

        {/* Edit */}

        <Button
          type="button"
          onClick={onEditClick}
          className="group flex h-14 w-full shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-primary-color px-6 text-lg font-bold text-white transition-all duration-300 hover:bg-primary-color/70 sm:w-auto"
        >
          <Edit3 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

          <span>កែប្រែព័ត៌មាន</span>
        </Button>
      </CardContent>
    </Card>
  );
}
