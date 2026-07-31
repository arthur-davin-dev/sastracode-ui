// "use client";

// import { useState } from "react";
// import Footer from "@/components/footer";
// import AppSidebar from "@/components/layout/AppSidebar";
// import SubNavbar from "@/components/layout/Sub-Navbar";

// export default function AchivementLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   return (
//     <div className="h-screen overflow-hidden bg-[#F0F2F9] dark:bg-slate-950 flex flex-col">
//       {/* Header: fixed height row, never scrolls, always on top */}
//       <header className="shrink-0 z-50 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm">
//         <SubNavbar onOpenSidebar={() => setIsMobileOpen(true)} />
//       </header>

//       {/* Body: takes remaining height, sidebar + main scroll independently */}
//       <div className="flex flex-1 min-h-0 relative">
//         {/* Mobile backdrop */}
//         {isMobileOpen && (
//           <div
//             onClick={() => setIsMobileOpen(false)}
//             className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           />
//         )}

//         {/* Sidebar drawer/column */}
//         <div
//           className={`
//             fixed lg:static inset-y-0 left-0 z-50 h-full
//             transition-transform duration-300
//             ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//           `}
//         >
//           <AppSidebar
//             isCollapsed={isCollapsed}
//             setIsCollapsed={setIsCollapsed}
//             closeMobile={() => setIsMobileOpen(false)}
//           />
//         </div>

//         {/* Main: only this scrolls */}
//         <main className="flex-1 min-w-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
//           <div className="mx-auto w-full max-w-7xl">
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// import Navbar from "@/components/nav-bar";
// import Footer from "@/components/footer";

// export default function MainLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <Navbar />
//       <main className="flex-1 pt-16">{children}</main>
//       <Footer />
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Footer from "@/components/footer";
import AppSidebar from "@/components/layout/AppSidebar";
import SubNavbar from "@/components/layout/Sub-Navbar";

export default function LayoutWithSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#F0F2F9] dark:bg-slate-950 flex flex-col">
      {/* Top Header */}
      <header className="shrink-0 z-50 border-b border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm">
        <SubNavbar onOpenSidebar={() => setIsMobileOpen(true)} />
      </header>

      {/* Body Area */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile Backdrop */}
        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0 z-50 h-full
            transition-transform duration-300
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <AppSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            closeMobile={() => setIsMobileOpen(false)}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}