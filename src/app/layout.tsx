import Navbar from "@/components/nav-bar";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";

const googleSans = localFont({
  src: [
    {
      path: "./font/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "./font/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SastraCode",
  description: "Programming Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="km"
      suppressHydrationWarning
      className={`${googleSans.variable} ${inter.variable}`}
    >
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
