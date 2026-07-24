import React from 'react';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-primary-color font-sans text-sm pt-12 pb-6 px-6 md:px-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Upper Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {/* SastraCode logo */}
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src="/images/sastra_code_logo.png"
                  alt="SastraCode Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-xs text-primary-color leading-relaxed max-w-xs">
              SastraCode បង្កើតឡើងដើម្បីលើកកម្ពស់អ្នកអភិវឌ្ឍន៍ តាមរយៈមាតិកាបច្ចេកវិទ្យាដែលមានគុណភាព និងងាយយល់។
            </p>
          </div>

          {/* Column 2: Quick Links (តំណភ្ជាប់រហ័ស) */}
          <div>
            <h3 className="font-bold text-primary-color text-base mb-4">តំណភ្ជាប់រហ័ស</h3>
            <ul className="space-y-2.5 text-xs text-primary-color">
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors">
                  អំពីសាស្ត្រាកូដ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors">
                  ក្រុមការងារ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors">
                  ដៃគូសហការ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Study / Courses (ការសិក្សា) */}
          <div>
            <h3 className="font-bold text-primary-color text-base mb-4">ការសិក្សា</h3>
            <ul className="space-y-2.5 text-xs text-primary-color">
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors">
                  វិញ្ញាបនបត្រ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors">
                  Full-Stack Track
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors">
                  Data Science
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors">
                  System Design
                </a>
              </li>
            </ul>
          </div>
          {/* Column 4: Contact (ទំនាក់ទំនង) */}
          <div>
            <h3 className="font-bold text-primary-color text-base mb-4">ទំនាក់ទំនង</h3>
            <ul className="space-y-3 text-xs text-primary-color">
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-primary-color flex-shrink-0" />
                <a href="mailto:contact@sastracode.tech" className="hover:text-secondary-color transition-colors">
                  contact@sastracode.tech
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-primary-color flex-shrink-0 mt-0.5" />
                <span>ភូមិ ១៣, ផ្លូវលេខ ៥០, Street 273, Phnom Penh 12151</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section: Organized & Sponsored By */}
        <div className="pt-8 pb-10 border-t border-gray-100">
          <h4 className="text-center text-primary-color font-bold text-base mb-8">
            រៀបចំ និងឧបត្ថម្ភដោយ
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-y-12 gap-x-20 md:gap-x-32 lg:gap-x-60">
            {/* ISTAD Logo */}
            <div className="h-16 relative flex items-center justify-center">
              <Image
                src="/images/istad_logo.png"
                alt="ISTAD Logo"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>

            {/* MPTC Logo */}
            <div className="h-16 sm:h-20 relative flex items-center justify-center">
              <Image
                src="/images/mptc_logo.png"
                alt="Ministry of Post and Telecommunications Logo"
                width={260}
                height={80}
                className="object-contain scale-110 sm:scale-130 md:scale-150"
              />
            </div>

            {/* CBRD FUND Logo */}
            <div className="h-16 relative flex items-center justify-center">
              <Image
                src="/images/cbrd_logo.png"
                alt="CBRD Fund Logo"
                width={180}
                height={60}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-color gap-4">
          <div>
            រក្សាសិទ្ធិគ្រប់យ៉ាង © ២០២៦ SastraCode
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-secondary-color transition-colors">
              គោលការណ៍ឯកជនភាព
            </a>
            <a href="#" className="hover:text-secondary-color transition-colors">
              លក្ខខណ្ឌសេវាកម្ម
            </a>
            <a href="#" className="hover:text-secondary-color transition-colors">
              យុត្តិធម៌
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}