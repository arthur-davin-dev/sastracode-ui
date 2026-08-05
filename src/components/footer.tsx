import React from "react";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 text-primary-color dark:text-slate-300 font-sans text-sm pt-6 pb-6 px-6 md:px-16 border-t border-gray-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Upper Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4 text-center md:text-left">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            <div className="flex items-center space-x-2">
              {/* SastraCode logo */}
              <div className="w-20 h-20 relative shrink-0">
                <Image
                  src="/images/sastra_code_logo.png"
                  alt="SastraCode Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-xs font-khmer text-primary-color dark:text-slate-300 leading-relaxed max-w-xs text-[18px]">
              <span className="font-sans text-[18px] text-primary-color dark:text-slate-100 font-semibold">
                SastraCode
              </span>{" "}
              បង្កើតឡើងដើម្បីលើកកម្ពស់អ្នកអភិវឌ្ឍន៍
              តាមរយៈមាតិកាបច្ចេកវិទ្យាដែលមានគុណភាព និងងាយយល់។
            </p>
          </div>

          {/* Column 2: Quick Links (តំណភ្ជាប់រហ័ស) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold font-khmer text-primary-color dark:text-slate-100 text-base mb-4 text-[22px]">
              តំណភ្ជាប់រហ័ស
            </h3>
            <ul className="space-y-2.5 text-xs text-primary-color dark:text-slate-300">
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-khmer text-[18px]"
                >
                  អំពីសាស្ត្រាកូដ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-khmer text-[18px]"
                >
                  ក្រុមការងារ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-khmer text-[18px]"
                >
                  ដៃគូសហការ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Study / Courses (ការសិក្សា) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-[22px] text-primary-color dark:text-slate-100 mb-4 font-khmer">
              ការសិក្សា
            </h3>
            <ul className="space-y-2.5 text-xs text-primary-color dark:text-slate-300">
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-khmer text-[18px]"
                >
                  វិញ្ញាបនបត្រ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  Full-Stack Track
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  Data Science
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  System Design
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (ទំនាក់ទំនង) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-primary-color dark:text-slate-100 mb-4 font-khmer text-[22px]">
              ទំនាក់ទំនង
            </h3>
            <ul className="space-y-3 text-xs text-primary-color dark:text-slate-300 w-full flex flex-col items-center md:items-start">
              {/* Email */}
              <li className="w-full flex justify-center md:justify-start">
                <a
                  href="mailto:contact@sastracode.tech"
                  className="inline-flex items-center gap-2.5 hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  <Mail className="w-4 h-4 text-primary-color dark:text-blue-400 shrink-0" />
                  <span>contact@sastracode.tech</span>
                </a>
              </li>

              {/* Location */}
              <li className="w-full flex justify-center md:justify-start">
                <div className="inline-flex items-start gap-2.5 max-w-70 sm:max-w-none text-left">
                  <MapPin className="w-4 h-4 text-primary-color dark:text-blue-400 shrink-0 mt-1.5" />
                  <span className="font-khmer text-[18px] leading-snug">
                    ភូមិ ១៣, ផ្លូវលេខ ៥០, Street 273, Phnom Penh 12151
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section: Organized & Sponsored By */}
        <div className="pt-6 pb-6 border-t border-gray-100 dark:border-slate-800/80">
          <h4 className="text-center text-primary-color dark:text-slate-100 font-bold font-khmer text-[22px] pb-6">
            រៀបចំ និងឧបត្ថម្ភដោយ
          </h4>

          {/* Responsive Sponsors Grid: 1 col on phone, 2 on tablet, 3 on desktop */}
          {/* Responsive Sponsors Grid: 1 col on phone, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-items-center">
            {/* ISTAD Logo */}
            <div className="h-16 flex items-center justify-center">
              {/* Light Mode Logo */}
              <Image
                src="/images/istad_white_logo.png"
                alt="ISTAD Logo"
                width={180}
                height={60}
                className="object-contain max-h-16 w-auto dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/istad_dark_logo.png"
                alt="ISTAD Logo"
                width={180}
                height={60}
                className="object-contain max-h-16 w-auto hidden dark:block"
              />
            </div>

            {/* MPTC Logo */}
            <div className="h-16 flex items-center justify-center">
              {/* Light Mode Logo */}
              <Image
                src="/images/mptc_white_logo.png"
                alt="Ministry of Post and Telecommunications Logo"
                width={260}
                height={80}
                className="object-contain max-h-16 w-auto dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/mptc_dark_logo.png"
                alt="Ministry of Post and Telecommunications Logo"
                width={260}
                height={80}
                className="object-contain max-h-16 w-auto hidden dark:block"
              />
            </div>

            {/* CBRD FUND Logo */}
            <div className="h-16 flex items-center justify-center md:col-span-2 lg:col-span-1">
              {/* Light Mode Logo */}
              <Image
                src="/images/cbrd_white_logo.png"
                alt="CBRD Fund Logo"
                width={180}
                height={60}
                className="object-contain max-h-16 w-auto dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/cbrd_dark_logo.png"
                alt="CBRD Fund Logo"
                width={180}
                height={60}
                className="object-contain max-h-16 w-auto hidden dark:block"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-primary-color dark:text-slate-400 gap-4 font-khmer text-[18px] text-center md:text-left">
          {/* Copyright Text */}
          <div className="w-full md:w-auto text-center md:text-left">
            រក្សាសិទ្ធិគ្រប់យ៉ាង © ២០២៦ SastraCode
          </div>

          {/* Policy Links */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            <a
              href="#"
              className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors text-[18px]"
            >
              គោលការណ៍ឯកជនភាព
            </a>
            <a
              href="#"
              className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors text-[18px]"
            >
              លក្ខខណ្ឌសេវាកម្ម
            </a>
            <a
              href="#"
              className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors text-[18px]"
            >
              យុត្តិធម៌
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
