"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslations";

export default function Footer() {
  const currentT = useTranslation();

  return (
    <footer className="w-full bg-white dark:bg-slate-950 text-primary-color dark:text-slate-300 font-sans text-sm pt-6 pb-6 px-6 md:px-16 border-t border-gray-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Upper Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4 text-center md:text-left">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
            {/* SastraCode Logo */}
            <Link
              href="/"
              aria-label="Go to home"
              className="flex items-center"
            >
              {/* Increased size from w-20 h-20 (80px) to w-28 h-28 (112px) */}
              <div className="w-28 h-28 relative shrink-0">
                <Image
                  src="/images/sastraCode.png"
                  alt="SastraCode Logo"
                  width={112}
                  height={112}
                  className="object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
                />
              </div>
            </Link>

            {/* Description */}
            <p className="text-xs font-khmer text-primary-color dark:text-slate-300 leading-relaxed max-w-xs text-[18px]">
              <span className="font-sans text-[18px] text-primary-color dark:text-slate-100 font-semibold">
                SastraCode
              </span>{" "}
              {currentT.footer.description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold font-khmer text-primary-color dark:text-slate-100 text-base mb-4 text-[22px]">
              {currentT.footer.quickLinks.title}
            </h3>

            <ul className="space-y-2.5 text-xs text-primary-color dark:text-slate-300">
              <li>
                <a
                  href="/about-us"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-khmer text-[18px]"
                >
                  {currentT.footer.quickLinks.about}
                </a>
              </li>

              <li>
                <a
                  href="/courses"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-khmer text-[18px]"
                >
                  {currentT.footer.quickLinks.course}
                </a>
              </li>

              <li>
                <a
                  href="/about-us"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-khmer text-[18px]"
                >
                  {currentT.footer.quickLinks.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Study / Courses */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-[22px] text-primary-color dark:text-slate-100 mb-4 font-khmer">
              {currentT.footer.study.title}
            </h3>

            <ul className="space-y-2.5 text-xs text-primary-color dark:text-slate-300">
              <li>
                <a
                  href="/documentation"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  {currentT.footer.study.lesson}
                </a>
              </li>

              <li>
                <a
                  href="/playground"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  {currentT.footer.study.playground}
                </a>
              </li>

              <li>
                <a
                  href="/function"
                  className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  {currentT.footer.study.feature}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-primary-color dark:text-slate-100 mb-4 text-[22px]">
              {currentT.footer.contact.title}
            </h3>

            <ul className="space-y-3 text-xs text-primary-color dark:text-slate-300 w-full flex flex-col items-center md:items-start">
              {/* Email */}
              <li className="w-full flex justify-center md:justify-start">
                <a
                  href="mailto:sastracode.edu@gmail.com"
                  onClick={(e) => {
                    // Fallback: If user isn't on mobile and might not have a desktop app, open Gmail web directly
                    if (!/Mobi|Android/i.test(navigator.userAgent)) {
                      e.preventDefault();
                      window.open(
                        "https://mail.google.com/mail/?view=cm&fs=1&to=sastracode.edu@gmail.com",
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }
                  }}
                  className="group inline-flex items-center gap-2.5 text-primary-color hover:text-secondary-color dark:text-slate-300 dark:hover:text-blue-400 transition-colors font-sans text-[18px]"
                >
                  <Mail className="w-4 h-4 text-current shrink-0 transition-colors" />
                  <span>{currentT.footer.email}</span>
                </a>
              </li>

              {/* Location */}
              <li className="w-full flex justify-center md:justify-start">
                <a
                  href="https://maps.app.goo.gl/SsxxaxUPkSna5YVF7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2.5 max-w-70 sm:max-w-none text-left no-underline focus:outline-none hover:text-secondary-color dark:hover:text-blue-400 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary-color dark:text-slate-300 group-hover:text-secondary-color dark:group-hover:text-blue-400 shrink-0 mt-1.5 transition-colors" />

                  <span className="text-[18px] leading-snug">
                    {currentT.footer.contact.address}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section */}
        <div className="pt-6 pb-6 border-t border-gray-100 dark:border-slate-800/80">
          <h4 className="text-center text-primary-color dark:text-slate-100 font-bold font-khmer text-[22px] pb-6">
            {currentT.footer.sponsor}
          </h4>

          {/* Responsive Sponsors Grid: 1 col on phone, 2 on tablet, 3 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-items-center">
            {/* ISTAD Logo with Navigation */}
            <Link
              href="https://istad.co/"
              className="h-16 flex items-center justify-center transition-opacity hover:opacity-85"
            >
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
            </Link>

            {/* MPTC */}
            <Link
              href="http://mptc.gov.kh/en/"
              className="h-18 py-0.5 flex items-center justify-center transition-opacity hover:opacity-85"
            >
              {/* Light Mode Logo */}
              <Image
                src="/images/mptc_white_logo.png"
                alt="Ministry of Post and Telecommunications Logo"
                width={260}
                height={80}
                className="object-contain h-full w-auto dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/mptc_dark_logo.png"
                alt="Ministry of Post and Telecommunications Logo"
                width={260}
                height={80}
                className="object-contain h-full w-auto hidden dark:block"
              />
            </Link>

            {/* CBRD FUND */}
            <Link
              href="http://mptc.gov.kh/en/"
              className="h-16 flex items-center justify-center md:col-span-2 lg:col-span-1 transition-opacity hover:opacity-85"
            >
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
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-primary-color dark:text-slate-400 gap-4 font-khmer text-[18px] text-center md:text-left">
          {/* Copyright */}
          <div className="w-full md:w-auto text-center md:text-left">
            {currentT.footer.copyright}
          </div>

          {/* Policy Links */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            <Link
              href="/privacy-policy"
              className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors text-[18px]"
            >
              {currentT.footer.privacy}
            </Link>

            <Link
              href="/terms-of-service"
              className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors text-[18px]"
            >
              {currentT.footer.terms}
            </Link>

            <Link
              href="/legal"
              className="hover:text-secondary-color dark:hover:text-blue-400 transition-colors text-[18px]"
            >
              {currentT.footer.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
