"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Camera, Edit3, Loader2, MapPin, X, Check } from "lucide-react";
import Cropper, { Point, Area } from "react-easy-crop";
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

/**
 * Utility to process crop coordinates on an image and return a cropped File object.
 */
async function getCroppedImg(imageSrc: string, pixelCrop: Area, fileName: string): Promise<File> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const file = new File([blob], fileName, { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg", 0.95);
  });
}

export function ProfileHeaderCard({
  profile,
  isEditing = false,
  onEditClick,
}: ProfileHeaderCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadMyAvatarMutation();

  // Cropper States
  const [selectedImageSrc, setSelectedImageSrc] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>("avatar.jpg");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => () => {
    if (avatarPreviewUrl?.startsWith("blob:")) URL.revokeObjectURL(avatarPreviewUrl);
  }, [avatarPreviewUrl]);

  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim() || profile.username || "User";
  const initials = fullName.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const avatarUrl = avatarPreviewUrl ?? profile.avatarUrl;

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("The selected file must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setOriginalFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const handleCancelCrop = () => {
    setSelectedImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleConfirmCropAndUpload = async () => {
    if (!selectedImageSrc || !croppedAreaPixels) return;

    try {
      const croppedFile = await getCroppedImg(selectedImageSrc, croppedAreaPixels, originalFileName);

      // Create local preview blob
      const previewUrl = URL.createObjectURL(croppedFile);
      setAvatarPreviewUrl(previewUrl);

      // Dismiss modal
      setSelectedImageSrc(null);

      // Upload API mutation
      const result = await uploadAvatar(croppedFile).unwrap();
      if (result.avatarFileId) {
        setAvatarPreviewUrl(`/api/profile/avatar/${encodeURIComponent(result.avatarFileId)}?v=${Date.now()}`);
      }
      toast.success("Profile photo updated successfully.");
    } catch (error) {
      console.error("Upload avatar failed:", error);
      setAvatarPreviewUrl(undefined);
      toast.error("Unable to update the profile photo.");
    }
  };

  return (
    <>
      {/* Header section with primary-color in light mode and bg-slate-900 in dark mode */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary-color via-primary-color/80 to-primary-color px-6 py-7 text-white shadow-lg dark:border dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 sm:px-10 sm:py-8">
        <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-10">
          <div className="absolute -right-28 -top-40 size-107.5 rounded-full border border-white/20" />
          <div className="absolute -right-12 -top-24 size-85 rounded-full border border-white/15" />
          <div className="absolute right-1/3 top-8 size-1.5 rounded-full bg-white" />
          <div className="absolute bottom-8 right-20 size-2 rounded-full bg-white/40" />
        </div>

        <div className="relative flex flex-col items-center gap-7 md:flex-row">
          <div className="relative shrink-0">
            <Avatar className="size-32 border-4 border-white bg-white/10 shadow-xl dark:border-slate-800 sm:size-36">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}
              <AvatarFallback className="bg-white/20 text-3xl font-bold text-white dark:bg-slate-800">{initials}</AvatarFallback>
            </Avatar>
            
            {/* Camera icon button border matches surrounding background */}
            <button
              type="button"
              aria-label="Change profile photo"
              disabled={isUploadingAvatar}
              onClick={() => inputRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex size-11 items-center justify-center rounded-full border-4 border-primary-color bg-white text-primary-color shadow-md transition hover:scale-105 disabled:opacity-60 dark:border-slate-900 dark:bg-slate-800 dark:text-white"
            >
              {isUploadingAvatar ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-5" />}
            </button>
            <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileSelect} />
          </div>

          <div className="min-w-0 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{fullName}</h1>
              {profile.status && <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold ring-1 ring-white/25 dark:bg-slate-800 dark:ring-slate-700">{profile.status}</span>}
            </div>
            {profile.username && <p className="mt-1 text-lg! font-medium text-white/90 dark:text-slate-300">@{profile.username}</p>}
            <p className="mt-2 text-base! font-medium text-white/80 dark:text-slate-400">{profile.workStudyType === "EMPLOYEE" ? "Professional learner" : "Student learner"}</p>
            {profile.institutionName && <p className="mt-1 flex items-center justify-center gap-1.5 text-sm! text-white/90 md:justify-start dark:text-slate-300"><MapPin className="size-4" />{profile.institutionName}</p>}
            <p className="mt-3 max-w-2xl text-sm! italic leading-6 text-white/80 dark:text-slate-400">“{profile.biography || "Learning today, building tomorrow."}”</p>
          </div>

          {!isEditing && (
            <Button type="button" onClick={onEditClick} className="h-11 shrink-0 rounded-xl bg-white px-5 font-semibold text-primary-color shadow-md hover:bg-white/90 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-800/80">
              <Edit3 className="mr-2 size-4" />Edit profile
            </Button>
          )}
        </div>
      </section>

      {/* Image Crop Modal Overlay */}
      {selectedImageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground dark:text-white">Crop Profile Photo</h3>
              <button
                type="button"
                onClick={handleCancelCrop}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative h-72 w-full overflow-hidden rounded-xl bg-slate-950">
              <Cropper
                image={selectedImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-semibold text-foreground dark:text-slate-300">Zoom</span>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-label="Zoom scale"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="h-1.5 w-full cursor-pointer accent-primary-color"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleCancelCrop} className="rounded-xl font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmCropAndUpload}
                className="rounded-xl bg-primary-color font-semibold text-white shadow-md transition-colors hover:bg-primary-color/90 active:bg-primary-color/80 focus-visible:ring-2 focus-visible:ring-primary-color"
              >
                <Check className="mr-2 size-4 stroke-[2.5]" />
                Crop & Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}