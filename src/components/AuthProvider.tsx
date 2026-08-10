"use client";

import { useEffect, useRef } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { logoutUser } from "@/lib/auth/logout";

function SessionErrorHandler() {
  const { data: session } = useSession();
  const signingOut = useRef(false);

  useEffect(() => {
    if (session?.error !== "RefreshAccessTokenError" || signingOut.current) return;

    signingOut.current = true;
    void logoutUser("/");
  }, [session?.error]);

  return null;
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider refetchOnWindowFocus>
      <SessionErrorHandler />
      {children}
    </SessionProvider>
  );
}
