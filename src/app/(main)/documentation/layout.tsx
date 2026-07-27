import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      {/* Removed <Navbar /> from here */}
      {children}
    </div>
  );
}