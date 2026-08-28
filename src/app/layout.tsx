import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { LanguageProvider } from "@/lib/language-context";
import StoreProvider from "./StoreProvider";
import AuthProvider from "@/components/AuthProvider";
import { RealtimeProvider } from "@/lib/realtime/RealtimeProvider";
import PrelineClient from "./components/PrelineClient";
import { Toaster } from "@/components/ui/sonner";
import InteractiveBackground from "@/components/InteractiveBackground";
// import KhmerNumerals from "@/components/KhmerNumerals";

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

const siteUrl = "https://www.sastracode.tech";
const siteName = "SastraCode";
const brandNames = ["SastraCode", "Sastra Code", "សាស្ត្រាកូដ", "សាស្រ្តាកូដ"];
const siteDescription =
  "SastraCode (Sastra Code) is a programming learning platform offering interactive courses, coding playgrounds, quizzes, and certifications to help you learn to code.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Programming Learning Platform`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "SastraCode",
    "Sastra Code",
    "sastracode.tech",
    "សាស្ត្រាកូដ",
    "សាស្រ្តាកូដ",
    "learn programming",
    "learn to code",
    "coding courses",
    "online coding platform",
    "programming for beginners",
    "coding playground",
    "online compiler",
    "coding certification",
    "learn programming in Khmer",
    "coding platform Cambodia",
    "Khmer coding platform",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "education",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} — Programming Learning Platform`,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: "km_KH",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Programming Learning Platform`,
    description: siteDescription,
  },
  verification: {
    google: "eymXZsEKi8RHHpHz7Jwo4FCo3Ypwg0w6mMQdtLjTyrk",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  alternateName: brandNames.filter((name) => name !== siteName),
  url: siteUrl,
  logo: `${siteUrl}/images/sastra_code_logo.png`,
  description: siteDescription,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: brandNames.filter((name) => name !== siteName),
  url: siteUrl,
  inLanguage: ["en", "km"],
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
      className={googleSans.variable}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <InteractiveBackground speed={1.0} density={100} enableMouseGlow={true} />

        <div className="relative z-10">
          <AuthProvider>
            <StoreProvider>
              <RealtimeProvider>
                <LanguageProvider>
                  {children}

                  {/* <KhmerNumerals /> */}
                  <PrelineClient />
                  <Toaster position="top-right" richColors />
                </LanguageProvider>
              </RealtimeProvider>
            </StoreProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}