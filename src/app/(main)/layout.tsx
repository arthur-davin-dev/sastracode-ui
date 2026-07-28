import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { LanguageProvider } from "@/lib/language-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Navbar />

      <main className="flex-1 pt-14">
        {children}
      </main>

      <Footer />
    </LanguageProvider>
  );
}