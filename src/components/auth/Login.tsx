"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      await signIn("keycloak", {
        redirectTo: "/",
      });
    } catch (error) {
      console.error(
        "Failed to start Keycloak login:",
        error,
      );

      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={isLoading}
      className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#002455] bg-white/30 px-3 py-1.5 text-[14px] font-medium text-[#002455] transition-colors hover:text-[#DC0000] disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-2 lg:text-[16px] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200 dark:hover:bg-slate-800/50 dark:hover:text-white"
    >
      {isLoading
        ? "Redirecting..."
        : "Login"}
    </button>
  );
}

// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async () => {
//     try {
//       setIsLoading(true);

//       await signIn("keycloak", {
//         redirectTo: "/",
//       });
//     } catch (error) {
//       console.error("Failed to start Keycloak login:", error);

//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleLogin}
//       disabled={isLoading}
//       className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#002455] bg-white/30 px-3 py-1.5 text-[14px] font-medium text-[#002455] transition-colors hover:text-[#DC0000] disabled:cursor-not-allowed disabled:opacity-70 sm:px-4 sm:py-2 lg:text-[16px] dark:border-slate-700 dark:bg-slate-900/30 dark:text-gray-200 dark:hover:bg-slate-800/50 dark:hover:text-white"
//     >
//       {isLoading ? "Redirecting..." : "Login"}
//     </button>
//   );
// }
