// "use client";

// import { useEffect, useRef, useState } from "react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import { Card, CardContent } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import { Camera, Edit3 } from "lucide-react";
// import { toast } from "sonner";

// import type { UserProfile } from "@/types/profile";
// import { useUploadMyAvatarMutation } from "@/redux/service/profile-api";

// // import { useUploadMyAvatarMutation } from "@/redux/services/profile-api";

// interface ProfileHeaderCardProps {
//   profile: UserProfile;

//   onEditClick?: () => void;
// }

// export function ProfileHeaderCard({
//   profile,
//   onEditClick,
// }: ProfileHeaderCardProps) {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [uploadAvatar, { isLoading: isUploadingAvatar }] =
//     useUploadMyAvatarMutation();

//   const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>();

//   useEffect(() => {
//     return () => {
//       if (avatarPreviewUrl?.startsWith("blob:")) {
//         URL.revokeObjectURL(avatarPreviewUrl);
//       }
//     };
//   }, [avatarPreviewUrl]);

//   const fullName =
//     [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
//     profile.username ||
//     "User";

//   const initial = (
//     profile.firstName?.[0] ??
//     profile.username?.[0] ??
//     "U"
//   ).toUpperCase();

//   const avatarUrl = avatarPreviewUrl ?? profile.avatarUrl;

//   const handleAvatarChange = async (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     if (!file.type.startsWith("image/")) {
//       toast.error("សូមជ្រើសរើសឯកសាររូបភាព។");

//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
//     setAvatarPreviewUrl(previewUrl);

//     try {
//       const uploadedAvatar = await uploadAvatar(file).unwrap();

//       // Switch from the temporary browser preview to the authenticated proxy.
//       // This makes the uploaded avatar visible immediately, even while the
//       // profile query is being refreshed in the background.
//       if (uploadedAvatar.avatarFileId) {
//         setAvatarPreviewUrl(
//           `/api/profile/avatar/${encodeURIComponent(uploadedAvatar.avatarFileId)}?v=${Date.now()}`,
//         );
//       }

//       toast.success("រូបភាពត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ។");
//     } catch (error) {
//       console.error("Upload avatar failed:", error);

//       setAvatarPreviewUrl(undefined);

//       toast.error("មិនអាចផ្លាស់ប្តូររូបភាពបានទេ។");
//     } finally {
//       event.target.value = "";
//     }
//   };

//   return (
//     <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
//       <div className="absolute left-0 top-0 h-2 w-full" />

//       <CardContent className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row sm:p-8">
//         {/* User */}

//         <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
//           {/* Avatar */}

//           <div className="relative shrink-0">
//             <Avatar className="h-24 w-24">
//               {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}

//               <AvatarFallback className="bg-yellow-400/20 text-2xl font-black text-red-600">
//                 {initial}
//               </AvatarFallback>
//             </Avatar>

//             {/* Change avatar */}

//             <button
//               type="button"
//               disabled={isUploadingAvatar}
//               onClick={() => inputRef.current?.click()}
//               className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary-color text-white shadow-md transition hover:opacity-80 disabled:opacity-50"
//               aria-label="Change avatar"
//             >
//               <Camera className="h-4 w-4" />
//             </button>

//             <input
//               ref={inputRef}
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleAvatarChange}
//             />
//           </div>

//           {/* Information */}

//           <div className="space-y-1">
//             <h2 className="text-2xl font-extrabold leading-tight text-primary-color">
//               {fullName}
//             </h2>

//             {profile.username && (
//               <p className="font-medium text-slate-500">@{profile.username}</p>
//             )}

//             {profile.email && (
//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 {profile.email}
//               </p>
//             )}

//             {profile.biography && (
//               <p className="max-w-xl text-lg font-medium italic leading-relaxed text-primary-color opacity-80">
//                 &quot;
//                 {profile.biography}
//                 &quot;
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Edit */}

//         <Button
//           type="button"
//           onClick={onEditClick}
//           className="group flex h-14 w-full shrink-0 items-center justify-center gap-2.5 rounded-2xl bg-primary-color px-6 text-lg font-bold text-white transition-all duration-300 hover:bg-primary-color/70 sm:w-auto"
//         >
//           <Edit3 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

//           <span>កែប្រែព័ត៌មាន</span>
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Camera,
  Edit3,
  Globe2,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { UserProfile } from "@/types/profile";
import { useUploadMyAvatarMutation } from "@/redux/service/profile-api";

interface ProfileHeaderCardProps {
  profile: UserProfile;
  isEditing?: boolean;
  onEditClick?: () => void;
}

function formatBirthday(value?: string | null) {
  if (!value) return "N/A";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ProfileHeaderCard({
  profile,
  isEditing = false,
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
    [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim() ||
    profile.username ||
    "User";

  const initials =
    [profile.firstName, profile.lastName]
      .filter(Boolean)
      .slice(0, 2)
      .map((name) => name?.[0])
      .join("")
      .toUpperCase() ||
    profile.username?.slice(0, 2).toUpperCase() ||
    "U";

  const avatarUrl = avatarPreviewUrl ?? profile.avatarUrl;

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("សូមជ្រើសរើសឯកសាររូបភាព។");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("រូបភាពត្រូវមានទំហំតិចជាង 5MB។");
      event.target.value = "";
      return;
    }

    const preview = URL.createObjectURL(file);

    setAvatarPreviewUrl(preview);

    try {
      const result = await uploadAvatar(file).unwrap();

      if (result.avatarFileId) {
        setAvatarPreviewUrl(
          `/api/profile/avatar/${encodeURIComponent(
            result.avatarFileId,
          )}?v=${Date.now()}`,
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
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
      {/* Cover */}

      <div className="relative h-[160px] overflow-hidden sm:h-[190px]">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-300" />

        <div className="absolute -bottom-24 -left-16 h-52 w-[420px] rotate-6 rounded-[50%] bg-indigo-900/30 blur-xl" />

        <div className="absolute -bottom-28 left-[25%] h-56 w-[500px] rounded-[50%] bg-violet-900/25 blur-xl" />

        <div className="absolute -bottom-24 right-[-80px] h-52 w-[450px] -rotate-6 rounded-[50%] bg-blue-900/25 blur-xl" />

        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/15 to-white/10" />
      </div>

      <div className="relative px-5 pb-6 sm:px-8 lg:px-10">
        <div className="-mt-[70px] flex flex-col gap-5 md:flex-row md:items-end">
          {/* Avatar */}

          <div className="relative w-fit shrink-0">
            <Avatar className="h-36 w-36 border-[6px] border-white bg-white shadow-xl dark:border-slate-900 sm:h-40 sm:w-40">
              {avatarUrl && <AvatarImage src={avatarUrl} alt={fullName} />}

              <AvatarFallback className="bg-violet-100 text-3xl font-bold text-violet-600">
                {initials}
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              disabled={isUploadingAvatar}
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-violet-600 text-white shadow-lg transition hover:scale-105 hover:bg-violet-700 disabled:opacity-50 dark:border-slate-900"
            >
              {isUploadingAvatar ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </button>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name */}

          <div className="min-w-0 flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                {fullName}
              </h1>

              {profile.status && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:ring-emerald-500/20">
                  {profile.status}
                </span>
              )}
            </div>

            {profile.username && (
              <p className="mt-1 font-semibold text-violet-600">
                @{profile.username}
              </p>
            )}

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              {profile.biography || "មិនទាន់មានប្រវត្តិសង្ខេប។"}
            </p>
          </div>

          {!isEditing && (
            <div className="pb-2">
              <Button
                type="button"
                variant="outline"
                onClick={onEditClick}
                className="h-11 rounded-xl border-slate-200 bg-white px-5 font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <Edit3 className="mr-2 h-4 w-4" />
                កែប្រែព័ត៌មាន
              </Button>
            </div>
          )}
        </div>

        {/* Quick info */}

        <div className="mt-7 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-5 dark:border-slate-800">
          <QuickInfo
            icon={<Mail />}
            label="Email"
            value={profile.email || "N/A"}
          />

          <QuickInfo
            icon={<Phone />}
            label="Phone"
            value={profile.phoneNumber || "N/A"}
          />

          <QuickInfo
            icon={<CalendarDays />}
            label="Birthday"
            value={formatBirthday(profile.birthday)}
          />

          <QuickInfo
            icon={<Globe2 />}
            label="Locale"
            value={(profile.locale || "N/A").toUpperCase()}
          />

          <QuickInfo
            icon={<ShieldCheck />}
            label="Status"
            value={profile.status || "N/A"}
            status
          />
        </div>
      </div>
    </section>
  );
}

function QuickInfo({
  icon,
  label,
  value,
  status = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 [&>svg]:h-[18px] [&>svg]:w-[18px] dark:bg-slate-800">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>

        <div className="mt-0.5 flex items-center gap-2">
          {status && <span className="h-2 w-2 rounded-full bg-emerald-500" />}

          <p
            title={value}
            className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100"
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
