import NavbarPage from "../../components/navbar-component-01/page";
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
      {children}
    </>
  );
}