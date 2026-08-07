// import Profile from "@/components/profile/Profile";

// export default function Page() {
//   return <Profile/>
// }

"use client";

import { ProfileHeaderCard } from "@/components/profile/ProfileHeaderCard";

import { ProfileForm } from "@/components/profile/ProfileForm";
import { useGetMyProfileQuery } from "@/redux/service/profile-api";

export default function Profile() {
  const {
    data: profile,

    isLoading,

    isFetching,

    isError,

    error,

    refetch,
  } = useGetMyProfileQuery();

  // ===================================
  // Loading
  // ===================================

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary-color" />

          <p className="text-lg font-semibold text-slate-500">
            កំពុងទាញយកព័ត៌មាន...
          </p>
        </div>
      </div>
    );
  }

  // ===================================
  // Error
  // ===================================

  if (isError) {
    console.error("Profile fetch error:", error);

    return (
      <div className="flex min-h-[500px] items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-500">
            មិនអាចទាញយកព័ត៌មានបាន
          </h2>

          <p className="mt-2 text-slate-500">សូមព្យាយាមម្ដងទៀត។</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-primary-color px-6 py-3 font-bold text-white transition hover:opacity-80"
          >
            ព្យាយាមម្ដងទៀត
          </button>
        </div>
      </div>
    );
  }

  // ===================================
  // No profile
  // ===================================

  if (!profile) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-lg font-medium text-slate-500">
          រកមិនឃើញព័ត៌មានប្រវត្តិរូប។
        </p>
      </div>
    );
  }

  // ===================================
  // Profile
  // ===================================

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}

        <div>
          <h1 className="text-3xl font-extrabold text-primary-color">
            ការកំណត់ប្រវត្តិរូប
          </h1>

          <p className="mt-2 text-lg text-slate-500">
            រៀបចំព័ត៌មានផ្ទាល់ខ្លួន និងគណនីរបស់អ្នក
          </p>
        </div>

        {/* Header Card */}

        <ProfileHeaderCard
          profile={profile}
          onEditClick={() => {
            const input = document.getElementById("firstName");

            input?.scrollIntoView({
              behavior: "smooth",

              block: "center",
            });

            input?.focus();
          }}
        />

        {/* Form */}

        <ProfileForm profile={profile} />

        {/* Background refresh */}

        {isFetching && !isLoading && (
          <p className="text-center text-sm font-medium text-slate-400">
            កំពុងធ្វើបច្ចុប្បន្នភាព...
          </p>
        )}
      </div>
    </div>
  );
}
