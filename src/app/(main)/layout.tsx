// src/app/(main)/layout.tsx
import SubNavbar from "@/components/layout/Sub-Navbar";
import Footer from "@/components/footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>

      <SidebarProvider className="flex-1">
        {/* <AppSidebar /> */}
        <SidebarInset>
          <main >{children}</main>
          <Footer /> 
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}