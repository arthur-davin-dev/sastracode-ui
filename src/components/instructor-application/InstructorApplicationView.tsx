"use client";

import { useCallback, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import { useSession } from "next-auth/react";

import Login from "@/components/auth/Login";

import { sastraApi } from "@/redux/api";
import { useAppDispatch } from "@/redux/hook";
import {
  useGetMyInstructorApplicationQuery,
  useGetProfileCompletenessQuery,
} from "@/redux/service/instructor-application-api";
import { useRealtimeSubscription } from "@/lib/realtime/use-realtime";

import { InstructorApplicationForm } from "@/components/instructor-application/InstructorApplicationForm";
import { InstructorApplicationStatusCard } from "@/components/instructor-application/InstructorApplicationStatusCard";
import { ProfileIncompleteCard } from "@/components/instructor-application/ProfileIncompleteCard";
import { getErrorStatus } from "@/components/instructor-application/instructor-application-utils";

function CenteredSpinner() {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-primary-color" />

        <p className="text-lg font-medium text-slate-500">កំពុងទាញយកព័ត៌មាន...</p>
      </div>
    </div>
  );
}

function ErrorCard({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-[500px] items-center justify-center ">
      <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-slate-950">
        <h2 className="text-xl font-bold text-red-500">មិនអាចទាញយកព័ត៌មានបាន</h2>

        <p className="mt-2 text-lg text-slate-500">សូមព្យាយាមម្ដងទៀត។</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-lg font-semibold text-white transition hover:bg-violet-700"
        >
          <RefreshCw className="h-4 w-4" />
          ព្យាយាមម្ដងទៀត
        </button>
      </div>
    </div>
  );
}

export function InstructorApplicationView() {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const isAuthenticated = status === "authenticated";

  const [isResubmitting, setIsResubmitting] = useState(false);

  const {
    data: completeness,
    isLoading: completenessLoading,
    isFetching: completenessFetching,
    error: completenessError,
    refetch: refetchCompleteness,
  } = useGetProfileCompletenessQuery(undefined, { skip: !isAuthenticated });

  const profileComplete = completeness?.complete === true;

  const {
    data: application,
    isLoading: applicationLoading,
    isFetching: applicationFetching,
    error: applicationError,
    refetch: refetchApplication,
  } = useGetMyInstructorApplicationQuery(undefined, {
    skip: !isAuthenticated || !profileComplete,
  });

  // Reuse the shared STOMP connection: when the backend pushes any per-user
  // notification (e.g. application approved/rejected), refresh this page's
  // application cache so the status updates without a manual reload.
  const onRealtimeMessage = useCallback(() => {
    dispatch(
      sastraApi.util.invalidateTags([
        { type: "InstructorApplication", id: "ME" },
      ]),
    );
  }, [dispatch]);

  useRealtimeSubscription(
    "/user/queue/notifications",
    onRealtimeMessage,
    isAuthenticated,
  );

  // --- Auth gate ---------------------------------------------------------
  if (status === "loading") return <CenteredSpinner />;

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-xl font-bold text-primary-color">
            សូមចូលគណនីជាមុនសិន
          </h2>

          <p className="mt-2 text-lg text-slate-500">
            អ្នកត្រូវចូលគណនីដើម្បីដាក់ពាក្យធ្វើជាគ្រូបង្រៀន។
          </p>

          <div className="mt-5 flex justify-center">
            <Login />
          </div>
        </div>
      </div>
    );
  }

  // --- Profile completeness gate --------------------------------------
  if (completenessLoading) return <CenteredSpinner />;

  if (completenessError) {
    return <ErrorCard onRetry={() => void refetchCompleteness()} />;
  }

  if (completeness && !profileComplete) {
    return (
      <ProfileIncompleteCard
        missingFields={completeness.missingFields ?? []}
        isRefreshing={completenessFetching}
        onRefresh={() => void refetchCompleteness()}
      />
    );
  }

  // --- Application state --------------------------------------------------
  if (applicationLoading) return <CenteredSpinner />;

  const applicationErrorStatus = getErrorStatus(applicationError);
  const hasNoApplication =
    applicationErrorStatus === 404 || application === null;

  if (applicationError && !hasNoApplication) {
    return <ErrorCard onRetry={() => void refetchApplication()} />;
  }

  const showCreateForm = !application || hasNoApplication;

  return (
    <div className="space-y-6">
      {showCreateForm ? (
        <InstructorApplicationForm
          mode="create"
          onSubmitted={() => void refetchApplication()}
        />
      ) : isResubmitting ? (
        <InstructorApplicationForm
          mode="resubmit"
          defaultExpertise={application.expertise}
          onCancel={() => setIsResubmitting(false)}
          onSubmitted={() => {
            setIsResubmitting(false);
            void refetchApplication();
          }}
        />
      ) : (
        <InstructorApplicationStatusCard
          application={application}
          onResubmit={
            application.status === "REJECTED"
              ? () => setIsResubmitting(true)
              : undefined
          }
        />
      )}

      {(applicationFetching || completenessFetching) && (
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-lg font-medium text-slate-400 shadow-sm dark:bg-slate-900">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            កំពុងធ្វើបច្ចុប្បន្នភាព...
          </div>
        </div>
      )}
    </div>
  );
}
