"use client";

import { useInitiateKeycloakLoginMutation } from "@/redux/api";

export default function Login() {
  const [initiateKeycloakLogin, { isLoading }] = useInitiateKeycloakLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await initiateKeycloakLogin().unwrap();
      window.location.assign(result.loginUrl);
    } catch (error) {
      console.error("Failed to start Keycloak login", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isLoading}
      className="hidden md:inline-flex items-center justify-center rounded-full border border-[#002455] px-3 py-2 text-[14px] lg:text-[16px] font-semibold text-[#002455] transition-colors hover:text-[#DC0000] dark:border-slate-700 dark:text-gray-200 dark:hover:bg-slate-800/50 disabled:opacity-70"
    >
      {isLoading ? "Redirecting..." : "Login"}
    </button>
  );
}
