"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslation } from "@/hooks/useTranslations"
import { Play } from "lucide-react"

// Video Course Card Component - Specifically for popular courses with video
interface VideoCourseCardProps {
  image: string
  title: string
  description: string
  badge?: string
  buttonText?: string
  onView?: () => void
  onPlay?: () => void
  className?: string
  maxDescriptionLength?: number
}

function VideoCourseCard({
  image,
  title,
  description,
  badge = "Featured",
  buttonText = "View Event",
  onView,
  onPlay,
  className = "",
  maxDescriptionLength = 60
}: VideoCourseCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const truncatedDescription = description.length > maxDescriptionLength
    ? `${description.slice(0, maxDescriptionLength)}...`
    : description

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onPlay) {
      onPlay()
    } else {
      console.log("Play video for:", title)
    }
  }

  return (
    <div 
      className={`flex justify-center h-110 bg-surface dark:bg-slate-900 py-6 transition-all duration-300 ease-in-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative mx-auto w-full max-w-sm pt-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-all duration-300 ease-in-out hover:shadow-[0_4px_12px_2px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_4px_12px_2px_theme(colors.cyan.500)] hover:scale-[1.02] dark:hover:shadow-slate-700/50 group flex flex-col overflow-hidden">
        {/* Image Container with Video Overlay */}
        <div className="relative z-20 aspect-video w-full overflow-hidden bg-slate-900 dark:bg-slate-800">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover brightness-100 dark:brightness-90 transition-transform duration-500 ease-out group-hover:scale-105"
          />
          
          {/* Video Play Button Overlay - Appears on hover */}
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

          {/* Video indicator - small play icon always visible */}
          <div className="absolute bottom-3 right-3 bg-black/60 dark:bg-black/70 backdrop-blur-sm rounded-full p-1.5 transition-opacity duration-300">
            <Play className="w-3 h-3 text-white" fill="white" />
          </div>
        </div>

        {/* Card Content */}
        <CardHeader className="flex-1 flex flex-col">
          <CardAction>
            <Badge
              variant="secondary"
              className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              {badge}
            </Badge>
          </CardAction>
          <CardTitle className="text-slate-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 flex-1">
            {truncatedDescription}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto pt-4">
          <Button
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98] hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/20"
            onClick={onView}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Original CourseCard for documents (with enhanced dark mode)
interface CourseCardProps {
  image: string
  title: string
  description: string
  badge?: string
  buttonText?: string
  onView?: () => void
  className?: string
  maxDescriptionLength?: number
}

function CourseCard({
  image,
  title,
  description,
  badge = "Featured",
  buttonText = "View Event",
  onView,
  className = "",
  maxDescriptionLength = 60
}: CourseCardProps) {
  const truncatedDescription = description.length > maxDescriptionLength
    ? `${description.slice(0, maxDescriptionLength)}...`
    : description

  return (
    <div className={`flex justify-center h-110 bg-surface dark:bg-slate-900 py-6 transition-all duration-300 ease-in-out ${className}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 transition-all duration-300 ease-in-out hover:shadow-[0_4px_12px_2px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_4px_12px_2px_theme(colors.cyan.500)] hover:scale-[1.02] dark:hover:shadow-slate-700/50 group flex flex-col overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-900 dark:bg-slate-800">
          <img
            src={image}
            alt={title}
            className="relative z-20 w-full h-full object-cover brightness-100 dark:brightness-90 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <CardHeader className="flex-1 flex flex-col">
          <CardAction>
            <Badge
              variant="secondary"
              className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              {badge}
            </Badge>
          </CardAction>
          <CardTitle className="text-slate-800 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 flex-1">
            {truncatedDescription}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto pt-4">
          <Button
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 dark:hover:bg-blue-700 active:scale-[0.98] hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/20"
            onClick={onView}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// Popular Course Data with video indicator
const popularCourses = [
  {
    id: 1,
    image: "/images/html.png",
    title: "Design systems meetup",
    description: "A practical talk on component APIs, accessibility, and shipping faster.",
    badge: "Featured",
    buttonText: "View Event"
  },
  {
    id: 2,
    image: "/images/html.png",
    title: "Advanced React patterns",
    description: "Learn advanced React patterns and best practices for scalable applications.",
    badge: "Popular",
    buttonText: "Learn More"
  },
  {
    id: 3,
    image: "/images/html.png",
    title: "UI/UX fundamentals",
    description: "Master the fundamentals of user interface and user experience design.",
    badge: "New",
    buttonText: "Start Course"
  },
  {
    id: 4,
    image: "/images/html.png",
    title: "TypeScript mastery",
    description: "Deep dive into TypeScript with practical examples and advanced types.",
    badge: "Advanced",
    buttonText: "View Course"
  },
  {
    id: 5,
    image: "/images/html.png",
    title: "Full-stack development",
    description: "Build complete web applications from frontend to backend.",
    badge: "Trending",
    buttonText: "Enroll Now"
  },
  {
    id: 6,
    image: "/images/html.png",
    title: "Cloud architecture",
    description: "Design and deploy scalable cloud-native applications.",
    badge: "Expert",
    buttonText: "View Course"
  }
]

// Document Data (using same data but can be separate)
const docCourses = [
  {
    id: 1,
    image: "/images/html.png",
    title: "Design systems meetup",
    description: "A practical talk on component APIs, accessibility, and shipping faster.",
    badge: "Featured",
    buttonText: "View Event"
  },
  {
    id: 2,
    image: "/images/html.png",
    title: "Advanced React patterns",
    description: "Learn advanced React patterns and best practices for scalable applications.",
    badge: "Popular",
    buttonText: "Learn More"
  },
  // ... add more document courses
]

// Main Components
export function HomePopularCourse() {
  const currentT = useTranslation();

  const handleViewCourse = (courseId: number) => {
    console.log("View course:", courseId)
  }

  const handlePlayVideo = (courseId: number) => {
    console.log("Play video for course:", courseId)
  }

  return (
    <section className="relative">
      {/* Title - Add relative z-index to keep it above */}
      <h2 className="relative z-10 text-[24px] font-semibold text-slate-800 dark:text-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight">
        {currentT.popularCourse.title}
      </h2>

      {/* Carousel - Remove or reduce negative margin */}
      <div
        id="hs-carousel"
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 pb-6 sm:pb-10 lg:pb-10"
        data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":4}}'
      >
        <div className="hs-carousel relative w-full min-h-110 overflow-hidden">
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0 gap-1.5">
            {popularCourses.map((course) => (
              <div key={course.id} className="hs-carousel-slide px-1">
                <VideoCourseCard
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  badge={course.badge}
                  buttonText={course.buttonText}
                  onView={() => handleViewCourse(course.id)}
                  onPlay={() => handlePlayVideo(course.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>

        <button
          type="button"
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  )
}

export function HomePopularDoc() {
  const currentT = useTranslation();

  const handleViewCourse = (courseId: number) => {
    console.log("View course:", courseId)
  }

  return (
    <section className="relative">
      {/* Title - Add relative z-index to keep it above */}
      <h2 className="relative z-10 text-[24px] font-semibold text-slate-800 dark:text-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight">
        {currentT.popularDoc.title}
      </h2>

      {/* Carousel - Remove or reduce negative margin */}
      <div
        id="hs-carousel"
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 pb-6 sm:pb-10 lg:pb-10"
        data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":4}}'
      >
        <div className="hs-carousel relative w-full min-h-110 overflow-hidden">
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0 gap-1.5">
            {docCourses.map((course) => (
              <div key={course.id} className="hs-carousel-slide px-1">
                <CourseCard
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  badge={course.badge}
                  buttonText={course.buttonText}
                  onView={() => handleViewCourse(course.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>

        <button
          type="button"
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  )
}