// "use client";

// import { useState } from "react";
// import { toast } from "sonner";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";

// import { Label } from "@/components/ui/label";

// import { Button } from "@/components/ui/button";

// import {
//   Building,
//   CalendarDays,
//   Info,
//   KeyRound,
//   Mail,
//   Phone,
//   Save,
//   User,
// } from "lucide-react";

// import type { Gender, UserProfile, WorkStudyType } from "@/types/profile";

// import {
//   useResetMyPasswordMutation,
//   useUpdateMyProfileMutation,
// } from "@/redux/service/profile-api";

// interface ProfileFormProps {
//   profile: UserProfile;
// }

// function getApiErrorMessage(error: unknown) {
//   if (!error || typeof error !== "object" || !("data" in error)) {
//     return null;
//   }

//   const data = error.data;

//   if (typeof data === "string") {
//     return data;
//   }

//   if (data && typeof data === "object" && "message" in data) {
//     return typeof data.message === "string" ? data.message : null;
//   }

//   return null;
// }

// export function ProfileForm({ profile }: ProfileFormProps) {
//   // ===================================
//   // Form State
//   // ===================================

//   const [firstName, setFirstName] = useState(profile.firstName ?? "");

//   const [lastName, setLastName] = useState(profile.lastName ?? "");

//   const [email, setEmail] = useState(profile.email ?? "");

//   const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber ?? "");

//   const [biography, setBiography] = useState(profile.biography ?? "");

//   const [birthday, setBirthday] = useState(profile.birthday ?? "");

//   const [gender, setGender] = useState<Gender | "">(profile.gender ?? "");

//   const [workStudyType, setWorkStudyType] = useState<WorkStudyType | "">(
//     profile.workStudyType ?? "",
//   );

//   const [institutionName, setInstitutionName] = useState(
//     profile.institutionName ?? "",
//   );

//   const [locale, setLocale] = useState(profile.locale ?? "");

//   // ===================================
//   // RTK Query
//   // ===================================

//   const [updateProfile, { isLoading: isUpdating }] =
//     useUpdateMyProfileMutation();

//   const [resetPassword, { isLoading: isResettingPassword }] =
//     useResetMyPasswordMutation();

//   // ===================================
//   // Save profile
//   // ===================================

//   const handleSave = async (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       await updateProfile({
//         firstName: firstName.trim(),

//         lastName: lastName.trim(),

//         email: email.trim(),

//         phoneNumber: phoneNumber.trim() || undefined,

//         biography: biography.trim() || undefined,

//         birthday: birthday || undefined,

//         gender: gender || undefined,

//         workStudyType: workStudyType || undefined,

//         institutionName: institutionName.trim() || undefined,

//         locale: locale.trim() || undefined,
//       }).unwrap();

//       toast.success("ព័ត៌មានត្រូវបានរក្សាទុកដោយជោគជ័យ។");
//     } catch (error) {
//       console.error("Update profile failed:", error);

//       toast.error(
//         getApiErrorMessage(error) ?? "មិនអាចរក្សាទុកព័ត៌មានបានទេ។",
//       );
//     }
//   };

//   // ===================================
//   // Reset password
//   // ===================================

//   const handleResetPassword = async () => {
//     try {
//       await resetPassword().unwrap();

//       toast.success("សំណើប្ដូរលេខសម្ងាត់ត្រូវបានផ្ញើដោយជោគជ័យ។");
//     } catch (error) {
//       console.error("Reset password failed:", error);

//       toast.error("មិនអាចប្ដូរលេខសម្ងាត់បានទេ។");
//     }
//   };

//   return (
//     <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900">
//       {/* Header */}

//       <CardHeader className="border-b border-slate-100 p-6 sm:p-8 dark:border-slate-800">
//         <CardTitle className="flex items-center gap-3 text-2xl font-extrabold text-primary-color">
//           <div className="flex items-center justify-center rounded-2xl border border-yellow-400/50 bg-yellow-400/20 p-3 text-red-600">
//             <User className="h-7 w-7" />
//           </div>

//           <span>ព័ត៌មានទូទៅ</span>
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="space-y-8 p-6 sm:p-8">
//         <form onSubmit={handleSave} className="space-y-8">
//           {/* ================================= */}
//           {/* Personal Information */}
//           {/* ================================= */}

//           <div className="space-y-6">
//             <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
//               <User className="h-6 w-6 text-secondary-color" />

//               <h3 className="text-2xl font-extrabold text-primary-color">
//                 ព័ត៌មានផ្ទាល់ខ្លួន
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
//               {/* Username */}

//               <div className="space-y-2">
//                 <Label className="text-lg font-bold text-primary-color">
//                   Username
//                 </Label>

//                 <Input
//                   value={profile.username ?? ""}
//                   disabled
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-100 text-lg text-primary-color dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* Status */}

//               <div className="space-y-2">
//                 <Label className="text-lg font-bold text-primary-color">
//                   Status
//                 </Label>

//                 <Input
//                   value={profile.status ?? ""}
//                   disabled
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-100 text-lg text-primary-color dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* First Name */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="firstName"
//                   className="text-lg font-bold text-primary-color"
//                 >
//                   នាមខ្លួន
//                 </Label>

//                 <Input
//                   id="firstName"
//                   value={firstName}
//                   maxLength={100}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* Last Name */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="lastName"
//                   className="text-lg font-bold text-primary-color"
//                 >
//                   នាមត្រកូល
//                 </Label>

//                 <Input
//                   id="lastName"
//                   value={lastName}
//                   maxLength={100}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* Email */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="email"
//                   className="flex items-center gap-2 text-lg font-bold text-primary-color"
//                 >
//                   <Mail className="h-5 w-5 text-red-600" />
//                   អ៊ីមែល
//                 </Label>

//                 <Input
//                   id="email"
//                   type="email"
//                   required
//                   maxLength={255}
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* Phone */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="phoneNumber"
//                   className="flex items-center gap-2 text-lg font-bold text-primary-color"
//                 >
//                   <Phone className="h-5 w-5 text-red-600" />
//                   លេខទូរស័ព្ទ
//                 </Label>

//                 <Input
//                   id="phoneNumber"
//                   type="tel"
//                   value={phoneNumber}
//                   pattern="\+?[0-9]{8,20}"
//                   placeholder="+85512345678"
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* Birthday */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="birthday"
//                   className="flex items-center gap-2 text-lg font-bold text-primary-color"
//                 >
//                   <CalendarDays className="h-5 w-5 text-red-600" />
//                   ថ្ងៃខែឆ្នាំកំណើត
//                 </Label>

//                 <Input
//                   id="birthday"
//                   type="date"
//                   value={birthday}
//                   onChange={(e) => setBirthday(e.target.value)}
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* Gender */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="gender"
//                   className="text-lg font-bold text-primary-color"
//                 >
//                   ភេទ
//                 </Label>

//                 <select
//                   id="gender"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value as Gender | "")}
//                   className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 text-lg text-primary-color outline-none focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 >
//                   <option value="">មិនបានកំណត់</option>

//                   <option value="MALE">ប្រុស</option>

//                   <option value="FEMALE">ស្រី</option>

//                   <option value="OTHER">ផ្សេងៗ</option>
//                 </select>
//               </div>
//             </div>

//             {/* Biography */}

//             <div className="space-y-2">
//               <Label
//                 htmlFor="biography"
//                 className="text-lg font-bold text-primary-color"
//               >
//                 ប្រវត្តិសង្ខេប
//               </Label>

//               <textarea
//                 id="biography"
//                 value={biography}
//                 maxLength={255}
//                 onChange={(e) => setBiography(e.target.value)}
//                 placeholder="សរសេរអំពីខ្លួនអ្នក..."
//                 className="min-h-28 w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-lg text-primary-color outline-none transition focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//               />

//               <p className="text-right text-sm text-slate-400">
//                 {biography.length}
//                 /255
//               </p>
//             </div>
//           </div>

//           {/* ================================= */}
//           {/* Work / Study */}
//           {/* ================================= */}

//           <div className="space-y-6 border-t border-slate-100 pt-6 dark:border-slate-800">
//             <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
//               <Building className="h-6 w-6 text-red-600" />

//               <h3 className="text-2xl font-extrabold text-primary-color">
//                 ការសិក្សា និងការងារ
//               </h3>
//             </div>

//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               {/* Work Study Type */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="workStudyType"
//                   className="text-lg font-bold text-primary-color"
//                 >
//                   ប្រភេទ
//                 </Label>

//                 <select
//                   id="workStudyType"
//                   value={workStudyType}
//                   onChange={(e) =>
//                     setWorkStudyType(e.target.value as WorkStudyType | "")
//                   }
//                   className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 text-lg text-primary-color outline-none focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 >
//                   <option value="">មិនបានកំណត់</option>

//                   <option value="STUDENT">និស្សិត</option>

//                   <option value="EMPLOYEE">បុគ្គលិក</option>
//                 </select>
//               </div>

//               {/* Institution */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="institutionName"
//                   className="flex items-center gap-2 text-lg font-bold text-primary-color"
//                 >
//                   <Building className="h-5 w-5 text-red-600" />
//                   ស្ថាប័ន / សាកលវិទ្យាល័យ
//                 </Label>

//                 <Input
//                   id="institutionName"
//                   maxLength={200}
//                   value={institutionName}
//                   onChange={(e) => setInstitutionName(e.target.value)}
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>

//               {/* Locale */}

//               <div className="space-y-2">
//                 <Label
//                   htmlFor="locale"
//                   className="text-lg font-bold text-primary-color"
//                 >
//                   ភាសា
//                 </Label>

//                 <Input
//                   id="locale"
//                   value={locale}
//                   maxLength={10}
//                   placeholder="km"
//                   pattern="[a-zA-Z]{2,10}"
//                   onChange={(e) => setLocale(e.target.value)}
//                   className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Notice */}

//           <div className="flex items-start gap-3 rounded-2xl border border-yellow-400/50 bg-yellow-400/15 p-4 text-primary-color">
//             <Info className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />

//             <p className="text-lg font-medium leading-relaxed">
//               សូមប្រាកដថាព័ត៌មានរបស់អ្នកត្រឹមត្រូវ មុនពេលរក្សាទុក។
//             </p>
//           </div>

//           {/* ================================= */}
//           {/* Actions */}
//           {/* ================================= */}

//           <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-800">
//             <Button
//               type="submit"
//               disabled={isUpdating}
//               className="h-14 flex-1 gap-2.5 rounded-2xl bg-secondary-color text-lg font-bold text-primary-color shadow-md hover:bg-secondary-color/70"
//             >
//               <Save className="h-6 w-6" />

//               <span>{isUpdating ? "កំពុងរក្សាទុក..." : "រក្សាទុកព័ត៌មាន"}</span>
//             </Button>

//             <Button
//               type="button"
//               disabled={isResettingPassword}
//               onClick={handleResetPassword}
//               className="h-14 gap-2.5 rounded-2xl border-2 border-yellow-400/60 bg-yellow-400/20 px-8 text-lg font-bold text-primary-color hover:bg-yellow-400"
//             >
//               <KeyRound className="h-6 w-6 text-red-600" />

//               <span>
//                 {isResettingPassword ? "កំពុងដំណើរការ..." : "ប្ដូរលេខសម្ងាត់"}
//               </span>
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Building2,
  CalendarDays,
  Globe2,
  GraduationCap,
  Info,
  KeyRound,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Gender, UserProfile, WorkStudyType } from "@/types/profile";

import {
  useResetMyPasswordMutation,
  useUpdateMyProfileMutation,
} from "@/redux/service/profile-api";

interface ProfileFormProps {
  profile: UserProfile;
  isEditing: boolean;
  onCancel?: () => void;
  onSaved?: () => void;
}

function getApiErrorMessage(error: unknown) {
  if (!error || typeof error !== "object" || !("data" in error)) {
    return null;
  }

  const data = error.data;

  if (typeof data === "string") {
    return data;
  }

  if (data && typeof data === "object" && "message" in data) {
    return typeof data.message === "string" ? data.message : null;
  }

  return null;
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

export function ProfileForm({
  profile,
  isEditing,
  onCancel,
  onSaved,
}: ProfileFormProps) {
  const inputClass =
  "h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";
  const [firstName, setFirstName] = useState(profile.firstName ?? "");

  const [lastName, setLastName] = useState(profile.lastName ?? "");

  const [email, setEmail] = useState(profile.email ?? "");

  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber ?? "");

  const [biography, setBiography] = useState(profile.biography ?? "");

  const [birthday, setBirthday] = useState(profile.birthday ?? "");

  const [gender, setGender] = useState<Gender | "">(profile.gender ?? "");

  const [workStudyType, setWorkStudyType] = useState<WorkStudyType | "">(
    profile.workStudyType ?? "",
  );

  const [institutionName, setInstitutionName] = useState(
    profile.institutionName ?? "",
  );

  const [locale, setLocale] = useState(profile.locale ?? "");

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetMyPasswordMutation();

  useEffect(() => {
    setFirstName(profile.firstName ?? "");
    setLastName(profile.lastName ?? "");
    setEmail(profile.email ?? "");
    setPhoneNumber(profile.phoneNumber ?? "");
    setBiography(profile.biography ?? "");
    setBirthday(profile.birthday ?? "");
    setGender(profile.gender ?? "");
    setWorkStudyType(profile.workStudyType ?? "");
    setInstitutionName(profile.institutionName ?? "");
    setLocale(profile.locale ?? "");
  }, [profile]);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim() || undefined,
        biography: biography.trim() || undefined,
        birthday: birthday || undefined,
        gender: gender || undefined,
        workStudyType: workStudyType || undefined,
        institutionName: institutionName.trim() || undefined,
        locale: locale.trim() || undefined,
      }).unwrap();

      toast.success("ព័ត៌មានត្រូវបានរក្សាទុកដោយជោគជ័យ។");

      onSaved?.();
    } catch (error) {
      console.error("Update profile failed:", error);

      toast.error(getApiErrorMessage(error) ?? "មិនអាចរក្សាទុកព័ត៌មានបានទេ។");
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword().unwrap();

      toast.success("សំណើប្ដូរលេខសម្ងាត់ត្រូវបានផ្ញើដោយជោគជ័យ។");
    } catch (error) {
      console.error("Reset password failed:", error);

      toast.error("មិនអាចប្ដូរលេខសម្ងាត់បានទេ។");
    }
  };

  /* ===============================
     VIEW MODE
  =============================== */

  if (!isEditing) {
    return (
      <div className="grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr_1fr]">
        {/* Personal Information */}

        <ProfileCard
          title="ព័ត៌មានផ្ទាល់ខ្លួន"
          icon={<User />}
          className="lg:row-span-2"
        >
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <InformationRow
              label="Username"
              value={profile.username || "N/A"}
            />

            <InformationRow
              label="First Name"
              value={profile.firstName || "N/A"}
            />

            <InformationRow
              label="Last Name"
              value={profile.lastName || "N/A"}
            />

            <InformationRow label="Email" value={profile.email || "N/A"} />

            <InformationRow
              label="Gender"
              value={profile.gender || "N/A"}
              badge
            />

            <InformationRow
              label="Birthday"
              value={formatBirthday(profile.birthday)}
            />

            <InformationRow
              label="Phone"
              value={profile.phoneNumber || "N/A"}
            />

            <InformationRow
              label="Locale"
              value={(profile.locale || "N/A").toUpperCase()}
            />
          </div>
        </ProfileCard>

        {/* Center */}

        <div className="space-y-6">
          <ProfileCard title="អំពីខ្ញុំ" icon={<BookOpen />}>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {profile.biography || "មិនទាន់មានប្រវត្តិសង្ខេប។"}
            </p>
          </ProfileCard>

          <ProfileCard title="ស្ថានភាពគណនី" icon={<ShieldCheck />}>
            <span
              className={`inline-flex rounded-lg px-4 py-2 text-xs font-bold ${
                profile.status === "ACTIVE"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {profile.status || "N/A"}
            </span>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              {profile.status === "ACTIVE"
                ? "គណនីរបស់អ្នកកំពុងដំណើរការធម្មតា។"
                : "ស្ថានភាពគណនីរបស់អ្នកត្រូវបានបង្ហាញខាងលើ។"}
            </p>

            <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                disabled={isResettingPassword}
                onClick={handleResetPassword}
                className="w-full rounded-xl"
              >
                <KeyRound className="mr-2 h-4 w-4" />

                {isResettingPassword ? "កំពុងដំណើរការ..." : "ប្ដូរលេខសម្ងាត់"}
              </Button>
            </div>
          </ProfileCard>
        </div>

        {/* Work / Study */}

        <ProfileCard
          title="ការសិក្សា និងការងារ"
          icon={<GraduationCap />}
          className="min-h-[430px]"
        >
          <div className="space-y-5">
            <WorkRow
              label="ប្រភេទ"
              value={profile.workStudyType || "N/A"}
              badge
            />

            <WorkRow label="ស្ថាប័ន" value={profile.institutionName || "N/A"} />

            <WorkRow
              label="ភាសា"
              value={(profile.locale || "N/A").toUpperCase()}
            />
          </div>

          <div className="mt-12 flex flex-col items-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-[30px] bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-600 dark:from-violet-500/10 dark:to-indigo-500/10">
              {profile.workStudyType === "EMPLOYEE" ? (
                <Building2 className="h-14 w-14" />
              ) : (
                <GraduationCap className="h-14 w-14" />
              )}
            </div>

            <div className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 p-4 text-center dark:from-violet-500/10 dark:to-indigo-500/10">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {profile.workStudyType === "EMPLOYEE"
                  ? "Keep building, keep growing."
                  : "Keep learning, keep growing."}
              </p>
            </div>
          </div>
        </ProfileCard>
      </div>
    );
  }

  /* ===============================
     EDIT MODE
  =============================== */

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-100 px-6 py-5 dark:border-slate-800 sm:px-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          កែប្រែព័ត៌មាន
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          រៀបចំព័ត៌មានផ្ទាល់ខ្លួន និងគណនីរបស់អ្នក
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 p-6 sm:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Username">
            <Input
              value={profile.username ?? ""}
              disabled
              className={inputClass}
            />
          </FormField>

          <FormField label="Status">
            <Input
              value={profile.status ?? ""}
              disabled
              className={inputClass}
            />
          </FormField>

          <FormField label="នាមខ្លួន" icon={<User />}>
            <Input
              id="firstName"
              value={firstName}
              maxLength={100}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </FormField>

          <FormField label="នាមត្រកូល">
            <Input
              value={lastName}
              maxLength={100}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
          </FormField>

          <FormField label="អ៊ីមែល" icon={<Mail />}>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </FormField>

          <FormField label="លេខទូរស័ព្ទ" icon={<Phone />}>
            <Input
              type="tel"
              value={phoneNumber}
              placeholder="+85512345678"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={inputClass}
            />
          </FormField>

          <FormField label="ថ្ងៃខែឆ្នាំកំណើត" icon={<CalendarDays />}>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className={inputClass}
            />
          </FormField>

          <FormField label="ភេទ">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender | "")}
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
            >
              <option value="">មិនបានកំណត់</option>
              <option value="MALE">ប្រុស</option>
              <option value="FEMALE">ស្រី</option>
              <option value="OTHER">ផ្សេងៗ</option>
            </select>
          </FormField>

          <FormField label="ប្រភេទការងារ / ការសិក្សា" icon={<GraduationCap />}>
            <select
              value={workStudyType}
              onChange={(e) =>
                setWorkStudyType(e.target.value as WorkStudyType | "")
              }
              className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
            >
              <option value="">មិនបានកំណត់</option>
              <option value="STUDENT">និស្សិត</option>
              <option value="EMPLOYEE">បុគ្គលិក</option>
            </select>
          </FormField>

          <FormField label="ស្ថាប័ន / សាកលវិទ្យាល័យ" icon={<Building2 />}>
            <Input
              value={institutionName}
              maxLength={200}
              onChange={(e) => setInstitutionName(e.target.value)}
              className={inputClass}
            />
          </FormField>

          <FormField label="ភាសា" icon={<Globe2 />}>
            <Input
              value={locale}
              maxLength={10}
              placeholder="km"
              onChange={(e) => setLocale(e.target.value)}
              className={inputClass}
            />
          </FormField>
        </div>

        <div>
          <Label
            htmlFor="biography"
            className="text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            ប្រវត្តិសង្ខេប
          </Label>

          <textarea
            id="biography"
            value={biography}
            maxLength={255}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="សរសេរអំពីខ្លួនអ្នក..."
            className="mt-2 min-h-32 w-full resize-none rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-800 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          <p className="mt-1 text-right text-xs text-slate-400">
            {biography.length}/255
          </p>
        </div>

        <div className="flex gap-3 rounded-2xl bg-violet-50 p-4 text-sm text-slate-600 dark:bg-violet-500/10 dark:text-slate-300">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />

          <p>សូមប្រាកដថាព័ត៌មានរបស់អ្នកត្រឹមត្រូវ មុនពេលរក្សាទុក។</p>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            disabled={isUpdating}
            onClick={onCancel}
            className="h-11 rounded-xl px-6"
          >
            <X className="mr-2 h-4 w-4" />
            បោះបង់
          </Button>

          <Button
            type="submit"
            disabled={isUpdating}
            className="h-11 rounded-xl bg-violet-600 px-6 text-white hover:bg-violet-700"
          >
            <Save className="mr-2 h-4 w-4" />

            {isUpdating ? "កំពុងរក្សាទុក..." : "រក្សាទុកព័ត៌មាន"}
          </Button>
        </div>
      </form>
    </section>
  );
}

/* =============================
   SMALL COMPONENTS
============================= */

function ProfileCard({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_6px_30px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 sm:p-6 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 [&>svg]:h-[18px] [&>svg]:w-[18px] dark:bg-violet-500/10">
          {icon}
        </div>

        <h2 className="font-bold text-slate-900 dark:text-white">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function InformationRow({
  label,
  value,
  badge = false,
}: {
  label: string;
  value: string;
  badge?: boolean;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm">
      <span className="text-slate-500">{label}</span>

      <div className="min-w-0 text-right">
        {badge ? (
          <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-500/10">
            {value}
          </span>
        ) : (
          <p
            title={value}
            className="truncate font-medium text-slate-800 dark:text-slate-200"
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function WorkRow({
  label,
  value,
  badge = false,
}: {
  label: string;
  value: string;
  badge?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-slate-500">{label}</p>

      {badge ? (
        <span className="rounded-lg bg-violet-100 px-3 py-1 text-xs font-bold text-violet-600 dark:bg-violet-500/10">
          {value}
        </span>
      ) : (
        <p className="max-w-[60%] truncate text-right text-sm font-semibold text-slate-800 dark:text-slate-200">
          {value}
        </p>
      )}
    </div>
  );
}

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        {icon && (
          <span className="text-slate-400 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        )}

        {label}
      </Label>

      {children}
    </div>
  );
}
