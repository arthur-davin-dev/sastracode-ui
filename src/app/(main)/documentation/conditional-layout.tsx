// src/components/conditional-layout.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide Navbar and Footer on the documentation search page
  const isSearchPage = pathname === "/documentation/search";

  return (
    <>
      {!isSearchPage && <Navbar />}
      {children}
      {!isSearchPage && <Footer />}
    </>
  );
}