import NavbarPage from "../../components/navbar-component-01/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarPage />
      <main>{children}</main>
    </>
  );
}
