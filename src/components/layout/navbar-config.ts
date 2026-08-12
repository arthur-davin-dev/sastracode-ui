import {
  GraduationCap,
  Trophy,
  Award,
  Bell,
  Users,
  type LucideIcon,
} from "lucide-react";

export const pageConfig: Record<string, { title: string; icon: LucideIcon }> = {
  // "/achivement": { title: "ផ្ទាំងគ្រប់គ្រង", icon: LayoutGrid },
  "/achivement/": { title: "ព័ត៌មានលម្អិតអំពីមេដាយ", icon: Award }, 
  "/courses/private-courses": { title: "វគ្គសិក្សាឯកជន", icon: GraduationCap },
  "/courses/my-courses": { title: "វគ្គសិក្សារបស់ខ្ញុំ", icon: GraduationCap },
  "/courses/bookmark": { title: "ចំណាំ", icon: GraduationCap },
  "/leaderboard": { title: "សមិទ្ធិផល", icon: Trophy },
  "/certificate": { title: "វិញ្ញាបនបត្រ", icon: Award },
  "/notifications": { title: "ការរំលឹក", icon: Bell },
  "/profile": { title: "ប្រវត្តិរូប", icon: Users },
};
