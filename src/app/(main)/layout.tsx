import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
      <ScrollToTopButton />
    </>
  );
}
