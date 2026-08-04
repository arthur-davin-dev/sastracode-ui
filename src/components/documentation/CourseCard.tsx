"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

interface CourseCardProps {
  course: {
    id?: number
    coverImage: string
    title: string
    description: string
    href: string
    ctaLabel: string
    isFree?: boolean
  }
  showPlayButton?: boolean
  onPlay?: () => void
}

export default function CourseCard({ course, showPlayButton = false, onPlay }: CourseCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onPlay) {
      onPlay()
    } else {
      console.log("Play video for:", course.title)
    }
  }

  return (
    <article 
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 font-khmer transition-all duration-300 ease-in-out hover:border-blue-200 dark:hover:border-blue-700 hover:bg-slate-50/30 dark:hover:bg-slate-700/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Top Media Section */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900 dark:bg-slate-800">
        <Image
          src={course.coverImage}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 brightness-100 dark:brightness-90"
        />
        
        {/* Play Button Overlay - Only for popular courses with videos */}
        {showPlayButton && (
          <div 
            className={`absolute inset-0 bg-black/40 dark:bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handlePlayClick}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 dark:bg-slate-200/90 hover:bg-white dark:hover:bg-slate-200 text-blue-600 dark:text-blue-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group/play"
              aria-label="Play video"
            >
              <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" />
            </button>
          </div>
        )}

        {/* Small video indicator - always visible for video courses */}
        {showPlayButton && (
          <div className="absolute bottom-3 right-3 bg-black/60 dark:bg-black/70 backdrop-blur-sm rounded-full p-1.5 transition-opacity duration-300">
            <Play className="w-3 h-3 text-white" fill="white" />
          </div>
        )}
        
        {/* Badge with subtle hover lifting - Dark mode support */}
        <span className="absolute left-3 top-3 z-10 rounded-lg bg-blue-600 dark:bg-blue-500 px-2.5 py-1 text-xs font-semibold text-white tracking-wide shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
          {course.isFree ? 'ឥតគិតថ្លៃ' : 'ពេញនិយម'}
        </span>
      </div>

      {/* Main Details Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Title with fluid color swap - Dark mode */}
        <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors duration-300 group-hover:text-blue-900 dark:group-hover:text-blue-400 line-clamp-1 mb-2">
          {course.title}
        </h3>
        
        {/* Description - Dark mode */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-5">
          {course.description}
        </p>

        {/* Action Button Link - Dark mode */}
        <Link
          href={course.href}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98] dark:shadow-blue-500/25 dark:hover:shadow-lg dark:hover:shadow-blue-400/20"
        >
          <span>{course.ctaLabel}</span>
          {/* Micro-arrow icon that glides rightwards on hover */}
          <svg 
            className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
      </div>
    </article>
  )
}