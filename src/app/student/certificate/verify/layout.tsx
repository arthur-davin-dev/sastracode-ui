import type { ReactNode } from "react";
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

/**
 * Standalone shell for the public certificate-verification pages.
 *
 * Deliberately NOT the app `Navbar`/sidebar: those assume a signed-in session
 * and pull in the full authenticated chrome. This route has to paint fast on a
 * cold phone browser for a logged-out visitor who just scanned a QR code, so it
 * ships only a lightweight branded header and footer.
 *
 * Caveat worth knowing: the root layout still mounts `InteractiveBackground`
 * (tsparticles), `SessionProvider`, `StoreProvider`, `PrelineClient` and
 * `Toaster` above this, so "lightweight" only goes so far. See the notes on
 * skipping the particle background for this path.
 */
export default function PublicVerifyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:py-10">
        {children}
      </main> */}
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-5 py-6 sm:px-4 sm:py-10 lg:px-16">
        {children}
      </main>

      <Footer />
    </div>
  );
}
