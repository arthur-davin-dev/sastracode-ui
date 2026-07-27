import { AppSidebar } from "@/components/layout/AppSidebar";
import Footer from "@/components/layout/Footer";
import SubNavbar from "@/components/layout/Sub-Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AchivementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F0F2F9]">
      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-sm shadow-sm z-99">
        <SubNavbar />
      </header>

      <SidebarProvider>
        <div>
          <AppSidebar />
        </div>
        <SidebarInset>
          <main className="flex-1 min-h-[calc(100vh-6rem)] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
