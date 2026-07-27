import React from 'react';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-20 w-full bg-white text-primary-color font-sans text-sm pt-6 pb-6 px-6 md:px-16 border-t border-gray-100">
      <div className="w-full px-4">
        {/* Upper Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4 text-center md:text-left">
          {/* Column 1: Brand Info */}
          <div className="space-y-2 flex flex-col items-center md:items-start">
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
            <p className="text-xs font-khmer text-primary-color leading-relaxed max-w-xs text-[18px]">
              <span className='font-sans text-[18px]'>SastraCode</span> បង្កើតឡើងដើម្បីលើកកម្ពស់អ្នកអភិវឌ្ឍន៍ តាមរយៈមាតិកាបច្ចេកវិទ្យាដែលមានគុណភាព និងងាយយល់។
            </p>
          </div>

          {/* Column 2: Quick Links (តំណភ្ជាប់រហ័ស) */}
          <div>
            <h3 className="font-bold font-khmer text-primary-color text-base mb-4 text-[22px]">តំណភ្ជាប់រហ័ស</h3>
            <ul className="space-y-2.5 text-xs text-primary-color">
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors font-khmer  text-[18px]">
                  អំពីសាស្ត្រាកូដ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors font-khmer  text-[18px]">
                  ក្រុមការងារ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors font-khmer  text-[18px]">
                  ដៃគូសហការ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Study / Courses (ការសិក្សា) */}
          <div>
            <h3 className="font-bold text-[22px] text-primary-color mb-4 font-khmer">ការសិក្សា</h3>
            <ul className="space-y-2.5 text-xs text-primary-color">
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors font-khmer  text-[18px]">
                  វិញ្ញាបនបត្រ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors font-sans  text-[18px]">
                  Full-Stack Track
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors font-sans  text-[18px]">
                  Data Science
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary-color transition-colors font-sans  text-[18px]">
                  System Design
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (ទំនាក់ទំនង) */}
          <div>
            <h3 className="font-bold text-primary-color mb-4 font-khmer text-[22px]">ទំនាក់ទំនង</h3>
            <ul className="space-y-3 text-xs text-primary-color">
              <li className="flex items-center justify-center md:justify-start space-x-2.5">
                <Mail className="w-4 h-4 text-primary-color shrink-0" />
                <a href="mailto:contact@sastracode.tech" className="hover:text-secondary-color transition-colors font-sans  text-[18px]">
                  contact@sastracode.tech
                </a>
              </li>
              <li className="flex items-center md:items-start justify-center md:justify-start space-x-2.5">
                <MapPin className="w-4 h-4 text-primary-color shrink-0 md:mt-0.5" />
                <span className='font-khmer  text-[18px]'>ភូមិ ១៣, ផ្លូវលេខ ៥០, Street 273, Phnom Penh 12151</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section: Organized & Sponsored By */}
        <div className="pt-4 pb-4 border-t border-gray-100">
          <h4 className="text-center text-primary-color font-bold font-khmer text-[22px]">
            រៀបចំ និងឧបត្ថម្ភដោយ
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-20 md:gap-x-32 lg:gap-x-60">
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
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-color gap-4 font-khmer text-[18px]">
          <div>
            រក្សាសិទ្ធិគ្រប់យ៉ាង © ២០២៦ SastraCode
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-secondary-color transition-colors text-[18px]">
              គោលការណ៍ឯកជនភាព
            </a>
            <a href="#" className="hover:text-secondary-color transition-colors text-[18px]">
              លក្ខខណ្ឌសេវាកម្ម
            </a>
            <a href="#" className="hover:text-secondary-color transition-colors text-[18px]">
              យុត្តិធម៌
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}