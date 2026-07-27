import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const googleSans = localFont({
  src: [
    { path: "../../public/font/GoogleSans-VariableFont_GRAD,opsz,wght.ttf", style: "normal" },
    { path: "../../public/font/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf", style: "italic" },
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
  title: "Sastra Code",
  description: "Learn programming with Sastra Code",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="km" suppressHydrationWarning className={`${googleSans.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children} 
      </body>
    </html>
  );
}