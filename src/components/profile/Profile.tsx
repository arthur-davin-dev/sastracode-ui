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
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-xl font-bold text-indigo-950">ការកំណត់ប្រវត្តិរូប</h1>
        <p className="text-sm text-muted-foreground mt-1">
          រៀបចំព័ត៌មានផ្ទាល់ខ្លួន និងគណនីរបស់អ្នក
        </p>
      </div>

      <ProfileHeaderCard profile={profileData} />
      <ProfileForm profile={profileData} />
    </div>
  );
}