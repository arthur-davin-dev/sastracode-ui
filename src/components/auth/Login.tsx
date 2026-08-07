"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      await signIn("keycloak", {
        redirectTo: "/",
      });
    } catch (error) {
      console.error("Failed to start Keycloak login", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isLoading}
      className="hidden md:inline-flex items-center justify-center rounded-full border border-[#002455] px-3 py-2 text-[14px] lg:text-[16px] font-semibold text-[#002455] transition-colors hover:text-[#DC0000] disabled:opacity-70"
    >
      {isLoading ? "Redirecting..." : "Login"}
    </button>
  );
}