import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-14">
        {children}
      </main>
      <Footer />
    </>
  );
}