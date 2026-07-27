import AppSidebar from "@/components/playground/AppSidebar";
import Footer from "@/components/footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen w-full">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <main className="flex-1">{children}</main>
          </SidebarInset>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
}