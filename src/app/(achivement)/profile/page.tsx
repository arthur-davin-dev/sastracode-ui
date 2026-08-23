// // import Profile from "@/components/profile/Profile";

// // export default function Page() {
// //   return <Profile/>
// // }

// "use client";

// import { ProfileHeaderCard } from "@/components/profile/ProfileHeaderCard";

// import { ProfileForm } from "@/components/profile/ProfileForm";
// import { useGetMyProfileQuery } from "@/redux/service/profile-api";

// export default function Profile() {
//   const {
//     data: profile,

//     isLoading,

//     isFetching,

//     isError,

//     error,

//     refetch,
//   } = useGetMyProfileQuery();

//   // ===================================
//   // Loading
//   // ===================================

//   if (isLoading) {
//     return (
//       <div className="flex min-h-[500px] items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary-color" />

//           <p className="text-lg font-semibold text-slate-500">
//             កំពុងទាញយកព័ត៌មាន...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ===================================
//   // Error
//   // ===================================

//   if (isError) {
//     console.error("Profile fetch error:", error);

//     return (
//       <div className="flex min-h-[500px] items-center justify-center p-6">
//         <div className="max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-500">
//             មិនអាចទាញយកព័ត៌មានបាន
//           </h2>

//           <p className="mt-2 text-slate-500">សូមព្យាយាមម្ដងទៀត។</p>

//           <button
//             type="button"
//             onClick={() => refetch()}
//             className="mt-5 rounded-xl bg-primary-color px-6 py-3 font-bold text-white transition hover:opacity-80"
//           >
//             ព្យាយាមម្ដងទៀត
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ===================================
//   // No profile
//   // ===================================

//   if (!profile) {
//     return (
//       <div className="flex min-h-[500px] items-center justify-center">
//         <p className="text-lg font-medium text-slate-500">
//           រកមិនឃើញព័ត៌មានប្រវត្តិរូប។
//         </p>
//       </div>
//     );
//   }

//   // ===================================
//   // Profile
//   // ===================================

//   return (
//     <div className="w-full">
//       <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
//         {/* Page Header */}

//         <div>
//           <h1 className="text-3xl font-extrabold text-primary-color">
//             ការកំណត់ប្រវត្តិរូប
//           </h1>

//           <p className="mt-2 text-lg text-slate-500">
//             រៀបចំព័ត៌មានផ្ទាល់ខ្លួន និងគណនីរបស់អ្នក
//           </p>
//         </div>

//         {/* Header Card */}

//         <ProfileHeaderCard
//           profile={profile}
//           onEditClick={() => {
//             const input = document.getElementById("firstName");

//             input?.scrollIntoView({
//               behavior: "smooth",

//               block: "center",
//             });

//             input?.focus();
//           }}
//         />

//         {/* Form */}

//         <ProfileForm profile={profile} />

//         {/* Background refresh */}

//         {isFetching && !isLoading && (
//           <p className="text-center text-sm font-medium text-slate-400">
//             កំពុងធ្វើបច្ចុប្បន្នភាព...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";

import { ProfileHeaderCard } from "@/components/profile/ProfileHeaderCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileOverviewCards } from "@/components/profile/ProfileOverviewCards";
import Login from "@/components/auth/Login";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const { status } = useSession();

  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMyProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-9 w-9 animate-spin text-primary-color" />

          <p className="text-sm font-medium text-slate-500">
            កំពុងទាញយកព័ត៌មាន...
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[600px] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-primary-color">
            សូមចូលគណនីជាមុនសិន
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            អ្នកត្រូវចូលគណនីដើម្បីមើលព័ត៌មានប្រវត្តិរូប។
          </p>

          <div className="mt-5 flex justify-center">
            <Login />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("Profile fetch error:", error);

    return (
      <div className="flex min-h-[600px] items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-red-500">
            មិនអាចទាញយកព័ត៌មានបាន
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            សូមព្យាយាមម្ដងទៀត។
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <RefreshCw className="h-4 w-4" />
            ព្យាយាមម្ដងទៀត
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <p className="text-sm font-medium text-slate-500">
          រកមិនឃើញព័ត៌មានប្រវត្តិរូប។
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
        <ProfileHeaderCard
          profile={profile}
          isEditing={isEditing}
          onEditClick={() => setIsEditing(true)}
        />

        {isEditing ? (
          <ProfileForm
            profile={profile}
            isEditing
            onCancel={() => setIsEditing(false)}
            onSaved={() => {
              setIsEditing(false);
              void refetch();
            }}
          />
        ) : (
          <ProfileOverviewCards profile={profile} />
        )}

        {isFetching && !isLoading && (
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-400 shadow-sm dark:bg-slate-900">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              កំពុងធ្វើបច្ចុប្បន្នភាព...
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
