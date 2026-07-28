"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/profile";
import { 
  User, 
  GraduationCap, 
  ShieldCheck, 
  KeyRound, 
  Save, 
  Info,
  Phone,
  Mail,
  Building,
  BookOpen,
  IdCard,
  X,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProfileForm({ profile }: { profile: UserProfile }) {
  // Personal Info State
  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [email, setEmail] = useState(profile.email || "");
  const [phone, setPhone] = useState(profile.phone || "");

  // Education & Verification State
  const [university, setUniversity] = useState(profile.university || "Royal University of Phnom Penh (RUPP)");
  const [major, setMajor] = useState(profile.major || "Computer Science");
  const [studentId, setStudentId] = useState(profile.studentId || "");
  const [nationalId, setNationalId] = useState(profile.nationalId || "");

  // Modal State for Password Popup
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile Data:", {
      firstName,
      lastName,
      email,
      phone,
      university,
      major,
      studentId,
      nationalId,
    });
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("លេខសម្ងាត់ថ្មីមិនត្រូវគ្នាទេ!");
      return;
    }
    console.log("Password changed successfully.");
    setIsPasswordModalOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Card className="relative overflow-hidden rounded-3xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl transition-all duration-300">
        
        {/* Top Accent Ribbon */}
        <div className="absolute top-0 left-0 w-full h-2 " />

        <CardHeader className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-2xl font-extrabold text-primary-color flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-yellow-400/20 border border-yellow-400/50 text-red-600 flex items-center justify-center">
              <User className="h-7 w-7" />
            </div>
            <span>ព័ត៌មានទូទៅ និងការផ្ទៀងផ្ទាត់</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 space-y-8">
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* SECTION 1: Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <User className="h-6 w-6 text-red-600" />
                <h3 className="text-2xl font-extrabold text-primary-color">
                  ព័ត៌មានផ្ទាល់ខ្លួន
                </h3>
              </div>

              {/* Grid with Aligned Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                
                {/* First Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-lg font-bold text-primary-color flex items-center gap-1.5 min-h-[28px]">
                    <span>នាមខ្លួន (First Name)</span>
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                    placeholder="ឧ. សុវណ្ណនី"
                  />
                </div>

                {/* Last Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-lg font-bold text-primary-color flex items-center gap-1.5 min-h-[28px]">
                    <span>នាមត្រកូល (Last Name)</span>
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                    placeholder="ឧ. ឆាត់"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg font-bold text-primary-color flex items-center gap-2 min-h-[28px]">
                    <Mail className="h-5 w-5 text-red-600" />
                    <span>អ៊ីមែល (Email)</span>
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                    placeholder="example@gmail.com"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-lg font-bold text-primary-color flex items-center gap-2 min-h-[28px]">
                    <Phone className="h-5 w-5 text-red-600" />
                    <span>លេខទូរស័ព្ទ (Phone Number)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                    placeholder="012 345 678"
                  />
                </div>

              </div>

              {/* Certificate Alert Notice */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-yellow-400/15 border border-yellow-400/50 text-primary-color">
                <Info className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                <p className="text-lg font-medium leading-relaxed">
                  ឈ្មោះពេញរបស់អ្នកនឹងត្រូវប្រកាស និងបោះពុម្ពនៅលើ <strong className="font-extrabold text-red-600">វិញ្ញាបនបត្រផ្លូវការ</strong> នៅពេលបញ្ចប់វគ្គសិក្សា។ សូមប្រាកដថាអក្ខរាវិរុទ្ធត្រឹមត្រូវ!
                </p>
              </div>
            </div>

            {/* SECTION 2: Education & Certificate Verification */}
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                <GraduationCap className="h-6 w-6 text-red-600" />
                <h3 className="text-2xl font-extrabold text-primary-color">
                  ព័ត៌មានអប់រំ និងការផ្ទៀងផ្ទាត់សញ្ញាបត្រ
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                
                {/* University Field */}
                <div className="space-y-2">
                  <Label htmlFor="university" className="text-lg font-bold text-primary-color flex items-center gap-2 min-h-[28px]">
                    <Building className="h-5 w-5 text-red-600" />
                    <span>គ្រឹះស្ថានសិក្សា / សាកលវិទ្យាល័យ</span>
                  </Label>
                  <Input
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                  />
                </div>

                {/* Major Field */}
                <div className="space-y-2">
                  <Label htmlFor="major" className="text-lg font-bold text-primary-color flex items-center gap-2 min-h-[28px]">
                    <BookOpen className="h-5 w-5 text-red-600" />
                    <span>ជំនាញសិក្សា (Major)</span>
                  </Label>
                  <Input
                    id="major"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                  />
                </div>

                {/* Student ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="studentId" className="text-lg font-bold text-primary-color flex items-center gap-2 min-h-[28px]">
                    <IdCard className="h-5 w-5 text-red-600" />
                    <span>អត្តលេខនិស្សិត (Student ID)</span>
                  </Label>
                  <Input
                    id="studentId"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                  />
                </div>

                {/* National ID Field */}
                <div className="space-y-2">
                  <Label htmlFor="nationalId" className="text-lg font-bold text-primary-color flex items-center gap-2 min-h-[28px]">
                    <ShieldCheck className="h-5 w-5 text-red-600" />
                    <span>អត្តសញ្ញាណប័ណ្ណ / លិខិតឆ្លងដែន</span>
                  </Label>
                  <Input
                    id="nationalId"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400 transition-all duration-300"
                  />
                </div>

              </div>
            </div>

            {/* SECTION 3: Action Buttons */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
              
              <Button
                type="submit"
                className="flex-1 h-14 rounded-2xl text-lg font-bold text-white bg-red-600 hover:bg-yellow-400 hover:text-slate-950 shadow-md transition-all duration-300 gap-2.5 border border-red-500/40"
              >
                <Save className="h-6 w-6" />
                <span>រក្សាទុកព័ត៌មាន</span>
              </Button>

              {/* Password Modal Trigger Button */}
              <Button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                className="h-14 px-8 rounded-2xl text-lg font-bold text-primary-color bg-yellow-400/20 hover:bg-yellow-400 border-2 border-yellow-400/60 transition-all duration-300 gap-2.5"
              >
                <KeyRound className="h-6 w-6 text-red-600" />
                <span>ប្ដូរលេខសម្ងាត់</span>
              </Button>

            </div>

          </form>
        </CardContent>
      </Card>

      {/* CHANGE PASSWORD POPUP MODAL CARD */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-yellow-400/20 border border-yellow-400/50 text-red-600">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-primary-color">
                    ប្ដូរលេខសម្ងាត់
                  </h3>
                </div>

                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Password Form */}
              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                
                <div className="space-y-2">
                  <Label className="text-lg font-bold text-primary-color">
                    លេខសម្ងាត់ចាស់ (Current Password)
                  </Label>
                  <Input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-bold text-primary-color">
                    លេខសម្ងាត់ថ្មី (New Password)
                  </Label>
                  <Input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="••••••••"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-bold text-primary-color">
                    បញ្ជាក់លេខសម្ងាត់ថ្មី (Confirm Password)
                  </Label>
                  <Input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-14 rounded-2xl text-lg text-primary-color bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="••••••••"
                  />
                </div>

                {/* Modal Buttons */}
                <div className="pt-4 flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="flex-1 h-14 rounded-2xl text-lg font-bold text-primary-color border-2 border-slate-200 dark:border-slate-800"
                  >
                    បោះបង់
                  </Button>

                  <Button
                    type="submit"
                    className="flex-1 h-14 rounded-2xl text-lg font-bold text-white bg-red-600 hover:bg-yellow-400 hover:text-slate-950 shadow-md transition-all duration-300"
                  >
                    រក្សាទុក
                  </Button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}