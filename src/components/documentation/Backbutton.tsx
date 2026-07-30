import React from 'react';
import Link from 'next/link'; // 1. Added Next.js Link import
import { ChevronLeft } from 'lucide-react'; // 2. Added Lucide icon import

export default function Backbutton() {
  return (
    <div>
      <Link 
        href="/documentation" 
        className="flex items-center gap-1 text-[16px] bg-white px-4 py-2 rounded-lg text-gray-500 mb-6 w-fit   transition-all duration-200 hover:scale-[1.02] active:scale-[0.99]"
      >
        <ChevronLeft size={16} /> ទំព័រដើម
      </Link>    
    </div>
  );
}