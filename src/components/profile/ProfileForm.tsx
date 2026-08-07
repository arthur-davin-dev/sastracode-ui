"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import {
  Building,
  CalendarDays,
  Info,
  KeyRound,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";

import type { Gender, UserProfile, WorkStudyType } from "@/types/profile";

import {
  useResetMyPasswordMutation,
  useUpdateMyProfileMutation,
} from "@/redux/service/profile-api";

interface ProfileFormProps {
  profile: UserProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  // ===================================
  // Form State
  // ===================================

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [biography, setBiography] = useState("");

  const [birthday, setBirthday] = useState("");

  const [gender, setGender] = useState<Gender | "">("");

  const [workStudyType, setWorkStudyType] = useState<WorkStudyType | "">("");

  const [institutionName, setInstitutionName] = useState("");

  const [locale, setLocale] = useState("");

  // ===================================
  // RTK Query
  // ===================================

  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateMyProfileMutation();

  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetMyPasswordMutation();

  // ===================================
  // Sync fetched API data
  // ===================================

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

  // ===================================
  // Save profile
  // ===================================

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await updateProfile({
        firstName: firstName.trim(),

        lastName: lastName.trim(),

        email: email.trim(),

        phoneNumber: phoneNumber.trim(),

        biography: biography.trim(),

        birthday: birthday || undefined,

        gender: gender || undefined,

        workStudyType: workStudyType || undefined,

        institutionName: institutionName.trim(),

        locale: locale.trim(),
      }).unwrap();

      alert("ព័ត៌មានត្រូវបានរក្សាទុកដោយជោគជ័យ។");
    } catch (error) {
      console.error("Update profile failed:", error);

      alert("មិនអាចរក្សាទុកព័ត៌មានបានទេ។");
    }
  };

  // ===================================
  // Reset password
  // ===================================

  const handleResetPassword = async () => {
    try {
      await resetPassword().unwrap();

      alert("សំណើប្ដូរលេខសម្ងាត់ត្រូវបានផ្ញើដោយជោគជ័យ។");
    } catch (error) {
      console.error("Reset password failed:", error);

      alert("មិនអាចប្ដូរលេខសម្ងាត់បានទេ។");
    }
  };

  return (
    <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 bg-white shadow-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}

      <CardHeader className="border-b border-slate-100 p-6 sm:p-8 dark:border-slate-800">
        <CardTitle className="flex items-center gap-3 text-2xl font-extrabold text-primary-color">
          <div className="flex items-center justify-center rounded-2xl border border-yellow-400/50 bg-yellow-400/20 p-3 text-red-600">
            <User className="h-7 w-7" />
          </div>

          <span>ព័ត៌មានទូទៅ</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8 p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-8">
          {/* ================================= */}
          {/* Personal Information */}
          {/* ================================= */}

          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <User className="h-6 w-6 text-secondary-color" />

              <h3 className="text-2xl font-extrabold text-primary-color">
                ព័ត៌មានផ្ទាល់ខ្លួន
              </h3>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
              {/* Username */}

              <div className="space-y-2">
                <Label className="text-lg font-bold text-primary-color">
                  Username
                </Label>

                <Input
                  value={profile.username ?? ""}
                  disabled
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-100 text-lg text-primary-color dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* Status */}

              <div className="space-y-2">
                <Label className="text-lg font-bold text-primary-color">
                  Status
                </Label>

                <Input
                  value={profile.status ?? ""}
                  disabled
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-100 text-lg text-primary-color dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* First Name */}

              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-lg font-bold text-primary-color"
                >
                  នាមខ្លួន
                </Label>

                <Input
                  id="firstName"
                  value={firstName}
                  maxLength={100}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* Last Name */}

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-lg font-bold text-primary-color"
                >
                  នាមត្រកូល
                </Label>

                <Input
                  id="lastName"
                  value={lastName}
                  maxLength={100}
                  onChange={(e) => setLastName(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* Email */}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-lg font-bold text-primary-color"
                >
                  <Mail className="h-5 w-5 text-red-600" />
                  អ៊ីមែល
                </Label>

                <Input
                  id="email"
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* Phone */}

              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="flex items-center gap-2 text-lg font-bold text-primary-color"
                >
                  <Phone className="h-5 w-5 text-red-600" />
                  លេខទូរស័ព្ទ
                </Label>

                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  pattern="\+?[0-9]{8,20}"
                  placeholder="+85512345678"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* Birthday */}

              <div className="space-y-2">
                <Label
                  htmlFor="birthday"
                  className="flex items-center gap-2 text-lg font-bold text-primary-color"
                >
                  <CalendarDays className="h-5 w-5 text-red-600" />
                  ថ្ងៃខែឆ្នាំកំណើត
                </Label>

                <Input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* Gender */}

              <div className="space-y-2">
                <Label
                  htmlFor="gender"
                  className="text-lg font-bold text-primary-color"
                >
                  ភេទ
                </Label>

                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender | "")}
                  className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 text-lg text-primary-color outline-none focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                >
                  <option value="">មិនបានកំណត់</option>

                  <option value="MALE">ប្រុស</option>

                  <option value="FEMALE">ស្រី</option>

                  <option value="OTHER">ផ្សេងៗ</option>
                </select>
              </div>
            </div>

            {/* Biography */}

            <div className="space-y-2">
              <Label
                htmlFor="biography"
                className="text-lg font-bold text-primary-color"
              >
                ប្រវត្តិសង្ខេប
              </Label>

              <textarea
                id="biography"
                value={biography}
                maxLength={255}
                onChange={(e) => setBiography(e.target.value)}
                placeholder="សរសេរអំពីខ្លួនអ្នក..."
                className="min-h-28 w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-lg text-primary-color outline-none transition focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
              />

              <p className="text-right text-sm text-slate-400">
                {biography.length}
                /255
              </p>
            </div>
          </div>

          {/* ================================= */}
          {/* Work / Study */}
          {/* ================================= */}

          <div className="space-y-6 border-t border-slate-100 pt-6 dark:border-slate-800">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <Building className="h-6 w-6 text-red-600" />

              <h3 className="text-2xl font-extrabold text-primary-color">
                ការសិក្សា និងការងារ
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Work Study Type */}

              <div className="space-y-2">
                <Label
                  htmlFor="workStudyType"
                  className="text-lg font-bold text-primary-color"
                >
                  ប្រភេទ
                </Label>

                <select
                  id="workStudyType"
                  value={workStudyType}
                  onChange={(e) =>
                    setWorkStudyType(e.target.value as WorkStudyType | "")
                  }
                  className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 text-lg text-primary-color outline-none focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                >
                  <option value="">មិនបានកំណត់</option>

                  <option value="STUDENT">និស្សិត</option>

                  <option value="EMPLOYEE">បុគ្គលិក</option>
                </select>
              </div>

              {/* Institution */}

              <div className="space-y-2">
                <Label
                  htmlFor="institutionName"
                  className="flex items-center gap-2 text-lg font-bold text-primary-color"
                >
                  <Building className="h-5 w-5 text-red-600" />
                  ស្ថាប័ន / សាកលវិទ្យាល័យ
                </Label>

                <Input
                  id="institutionName"
                  maxLength={200}
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              {/* Locale */}

              <div className="space-y-2">
                <Label
                  htmlFor="locale"
                  className="text-lg font-bold text-primary-color"
                >
                  ភាសា
                </Label>

                <Input
                  id="locale"
                  value={locale}
                  maxLength={10}
                  placeholder="km"
                  pattern="[a-zA-Z]{2,10}"
                  onChange={(e) => setLocale(e.target.value)}
                  className="h-14 rounded-2xl border-2 border-slate-200 bg-slate-50 text-lg text-primary-color focus:border-yellow-400 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>
            </div>
          </div>

          {/* Notice */}

          <div className="flex items-start gap-3 rounded-2xl border border-yellow-400/50 bg-yellow-400/15 p-4 text-primary-color">
            <Info className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />

            <p className="text-lg font-medium leading-relaxed">
              សូមប្រាកដថាព័ត៌មានរបស់អ្នកត្រឹមត្រូវ មុនពេលរក្សាទុក។
            </p>
          </div>

          {/* ================================= */}
          {/* Actions */}
          {/* ================================= */}

          <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-800">
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-14 flex-1 gap-2.5 rounded-2xl bg-secondary-color text-lg font-bold text-primary-color shadow-md hover:bg-secondary-color/70"
            >
              <Save className="h-6 w-6" />

              <span>{isUpdating ? "កំពុងរក្សាទុក..." : "រក្សាទុកព័ត៌មាន"}</span>
            </Button>

            <Button
              type="button"
              disabled={isResettingPassword}
              onClick={handleResetPassword}
              className="h-14 gap-2.5 rounded-2xl border-2 border-yellow-400/60 bg-yellow-400/20 px-8 text-lg font-bold text-primary-color hover:bg-yellow-400"
            >
              <KeyRound className="h-6 w-6 text-red-600" />

              <span>
                {isResettingPassword ? "កំពុងដំណើរការ..." : "ប្ដូរលេខសម្ងាត់"}
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
