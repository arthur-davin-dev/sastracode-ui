import type { Metadata } from "next";
import { Inter, Noto_Sans_Khmer } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const khmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  variable: "--font-khmer",
});

export const metadata: Metadata = {
  title: "Sastra Code",
  description: "Learn programming with Sastra Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${khmer.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-950 dark:text-white">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}