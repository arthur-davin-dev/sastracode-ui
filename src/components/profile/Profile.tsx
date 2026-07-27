import { ProfileHeaderCard } from "@/components/profile/ProfileHeaderCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { UserProfile } from "@/types/profile";

const profileData: UserProfile = {
  firstName: "ដារីន",
  lastName: "ឆាយ",
  avatarUrl: "/images/mysql.jpg",
  quote: "រៀនរៀន រៀនរហូតធ្វើដល់ចេះ",
  email: "chhaydavin@gmail.com",
};

export default function Profile() {
  return (
    <div className="relative w-full min-h-screen bg-linear-to-b from-[#eaf4ff] via-[#f4f8fe] to-[#eaf4ff] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-950 dark:text-white transition-colors duration-300">
            ការកំណត់ប្រវត្តិរូប
          </h1>
          <p className="text-lg text-primary-color dark:text-slate-300 mt-1 transition-colors duration-300">
            រៀបចំព័ត៌មានផ្ទាល់ខ្លួន និងគណនីរបស់អ្នក
          </p>
        </div>

        <ProfileHeaderCard profile={profileData} />
        <ProfileForm profile={profileData} />
      </div>
    </div>
  );
}