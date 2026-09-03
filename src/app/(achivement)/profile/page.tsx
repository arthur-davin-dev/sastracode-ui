"use client";

import { useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";

import { ProfileHeaderCard } from "@/components/profile/ProfileHeaderCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileOverviewCards } from "@/components/profile/ProfileOverviewCards";
import Login from "@/components/auth/Login";
import InteractiveBackground from "@/components/InteractiveBackground";
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

          <p className="text-lg font-medium text-slate-500">
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

          <p className="mt-2 text-lg text-slate-500">
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

          <p className="mt-2 text-lg text-slate-500">
            សូមព្យាយាមម្ដងទៀត។
          </p>

          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-lg font-semibold text-white transition hover:bg-violet-700"
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
        <p className="text-lg font-medium text-slate-500">
          រកមិនឃើញព័ត៌មានប្រវត្តិរូប។
        </p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <InteractiveBackground speed={1} density={100} enableMouseGlow />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-lg font-medium text-slate-400 shadow-sm dark:bg-slate-900">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              កំពុងធ្វើបច្ចុប្បន្នភាព...
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
