// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import { Inter } from "next/font/google";
// import "./globals.css";

// import { LanguageProvider } from "@/lib/language-context";
// import PrelineScriptWrapper from "./components/PrelineScriptWrapper";
// import StoreProvider from "./StoreProvider";
// import AuthProvider from "@/components/AuthProvider";

// const googleSans = localFont({
//   src: [
//     {
//       path: "../../public/font/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
//       style: "normal",
//     },
//     {
//       path: "../../public/font/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
//       style: "italic",
//     },
//   ],
//   variable: "--font-google-sans",
//   display: "swap",
// });

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "SastraCode",
//   description: "Programming Learning Platform",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="km"
//       suppressHydrationWarning
//       className={`${googleSans.variable} ${inter.variable}`}
//     >
//       <body>
//         <AuthProvider>
//           <StoreProvider>
//             <LanguageProvider>
//               {children}

//               <PrelineScriptWrapper />
//             </LanguageProvider>
//           </StoreProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import { LanguageProvider } from "@/lib/language-context";
import StoreProvider from "./StoreProvider";
import AuthProvider from "@/components/AuthProvider";
import PrelineClient from "./components/PrelineClient";
import { Toaster } from "@/components/ui/sonner";
// import KhmerNumerals from "@/components/KhmerNumerals";

const googleSans = localFont({
  src: [
    {
      path: "../../public/font/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/font/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],

  variable: "--font-google-sans",
  display: "swap",
});

const siteUrl = "https://www.sastracode.tech";
const siteName = "SastraCode";
const siteDescription =
  "SastraCode is a programming learning platform offering interactive courses, coding playgrounds, quizzes, and certifications to help you learn to code.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Programming Learning Platform`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "SastraCode",
    "learn programming",
    "coding courses",
    "online coding platform",
    "programming for beginners",
    "coding playground",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Programming Learning Platform`,
    description: siteDescription,
  },
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
        <AuthProvider>
          <StoreProvider>
            <LanguageProvider>
              {children}

              {/* <KhmerNumerals /> */}
              <PrelineClient />
              <Toaster position="top-right" richColors />
            </LanguageProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
