'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Send } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { mockTeamMembers, TeamMemberType } from '@/lib/mock-data/about-us/team-member';

// Simulated API Service function
async function fetchAllTeamMembers(): Promise<TeamMemberType[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTeamMembers;
}

export default function TeamMember() {
  const [members, setMembers] = useState<TeamMemberType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllTeamMembers()
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch team members:", err);
        setLoading(false);
      });
  }, []);

  // Filter members specifically with id from 1 to 8
  const filteredMembers = members.filter((member) => {
    const numericId = Number(member.id);
    return numericId >= 1 && numericId <= 8;
  });

  // Loading State Skeletons (8 cards)
  if (loading) {
    return (
      <section className="w-full py-12 px-4 sm:px-8 md:px-12 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-6 justify-items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="pt-20 pb-4 flex justify-center w-full">
                <div className="relative bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md pt-20 pb-6 px-6 w-full max-w-[280px] h-[280px] text-center flex flex-col items-center animate-pulse">
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 shadow-sm" />
                  <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-2 mt-2" />
                  <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-4" />
                  <div className="h-12 w-full bg-slate-200 dark:bg-slate-800 rounded mb-6" />
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-4 sm:px-8 md:px-12 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 sm:gap-6 justify-items-center">
          {filteredMembers.map((member) => (
            <div key={member.id} className="pt-20 pb-4 flex justify-center w-full">
              {/* Card Container */}
              <div className="group relative bg-slate-50 dark:bg-slate-900/90 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-md dark:shadow-none pt-20 pb-6 px-6 w-full max-w-[280px] text-center flex flex-col items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl dark:hover:border-slate-700">
                
                {/* Avatar Container with Animated Stroke Ring */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 flex items-center justify-center">
                  
                  {/* SVG Stroke Circle */}
                  <svg className="absolute -inset-1.5 w-[172px] h-[172px] rotate-90 pointer-events-none z-20">
                    <circle
                      cx="86"
                      cy="86"
                      r="78"
                      className="stroke-[#002455] dark:stroke-blue-500 fill-none stroke-[3] [stroke-dasharray:490] [stroke-dashoffset:-490] transition-all duration-1500 ease-in-out group-hover:[stroke-dashoffset:0]"
                    />
                  </svg>

                  {/* Profile Image Wrapper */}
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 shadow-sm z-10 transition-transform duration-500 ease-out group-hover:scale-95 bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Member Name */}
                <h3 className="font-bold text-[#002455] dark:text-slate-100 text-lg mb-1 mt-2 transition-colors duration-300 group-hover:text-red-500 dark:group-hover:text-blue-400">
                  {member.name}
                </h3>

                {/* Role / Tag */}
                <span className="text-xs font-semibold text-[#002455] dark:text-slate-400 mb-3">
                  {member.position}
                </span>

                {/* Description / Bio */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3 mt-auto">
                  {/* GitHub Icon */}
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center text-[#002455] dark:text-slate-200 hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-slate-900 transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </a>

                  {/* Telegram / Contact Icon */}
                  <a
                    href={member.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-blue-100/80 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 border border-transparent dark:border-blue-800/40"
                    aria-label="Telegram"
                  >
                    <Send className="w-4 h-4 -translate-x-0.5 translate-y-0.5" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}