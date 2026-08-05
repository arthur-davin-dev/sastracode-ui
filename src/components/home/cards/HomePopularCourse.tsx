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
import { motion } from "framer-motion"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      duration: 0.5,
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

const cardFloatVariants = {
  initial: { y: 0 },
  animate: (index: number) => ({
    y: [0, -4, 0, 4, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.15,
    },
  }),
}

const imageVariants = {
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
}

const playButtonVariants = {
  initial: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
    },
  },
}

const badgeVariants = {
  hover: {
    scale: 1.08,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
}

const titleVariants = {
  hover: {
    scale: 1.02,
    color: "#2563EB",
    transition: {
      duration: 0.2,
    },
  },
}

const descriptionVariants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
}

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.1,
    },
  },
}

const arrowVariants = {
  hover: {
    scale: 1.1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      duration: 0.1,
    },
  },
}

const titleTextVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

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
  index?: number
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
  maxDescriptionLength = 60,
  index = 0
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
    <motion.div 
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex justify-center h-110 bg-surface dark:bg-slate-900 py-6 transition-all duration-300 ease-in-out ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative mx-auto w-full max-w-sm pt-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        whileHover={{
          boxShadow: "0 4px 24px 4px rgba(34,211,238,0.3)",
          transition: { duration: 0.3 },
        }}
        style={{
          boxShadow: isHovered 
            ? "0 4px 24px 4px rgba(34,211,238,0.3)" 
            : "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        {/* Image Container with Video Overlay */}
        <motion.div 
          className="relative z-20 aspect-video w-full overflow-hidden bg-slate-900 dark:bg-slate-800"
          variants={imageVariants}
          whileHover="hover"
        >
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover brightness-100 dark:brightness-90"
          />
          
          {/* Video Play Button Overlay - Appears on hover */}
          <motion.div 
            className={`absolute inset-0 bg-black/40 dark:bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <motion.button
              variants={playButtonVariants}
              initial="initial"
              animate={isHovered ? "visible" : "initial"}
              whileHover="hover"
              whileTap="tap"
              onClick={handlePlayClick}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 dark:bg-slate-200/90 hover:bg-white dark:hover:bg-slate-200 text-blue-600 dark:text-blue-500 flex items-center justify-center shadow-lg hover:shadow-xl"
              aria-label="Play video"
            >
              <Play className="w-6 h-6 md:w-7 md:h-7 ml-1" fill="currentColor" />
            </motion.button>
          </motion.div>

          {/* Video indicator - small play icon always visible */}
          <motion.div 
            className="absolute bottom-3 right-3 bg-black/60 dark:bg-black/70 backdrop-blur-sm rounded-full p-1.5"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Play className="w-3 h-3 text-white" fill="white" />
          </motion.div>
        </motion.div>

        {/* Card Content */}
        <CardHeader className="flex-1 flex flex-col">
          <CardAction>
            <motion.div variants={badgeVariants} whileHover="hover">
              <Badge
                variant="secondary"
                className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-colors duration-300"
              >
                {badge}
              </Badge>
            </motion.div>
          </CardAction>
          <motion.div variants={titleVariants} whileHover="hover">
            <CardTitle className="text-slate-800 dark:text-white transition-colors duration-300">
              {title}
            </CardTitle>
          </motion.div>
          <motion.div variants={descriptionVariants} whileHover="hover" className="flex-1">
            <CardDescription className="text-slate-500 dark:text-slate-300 transition-colors duration-300">
              {truncatedDescription}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardFooter className="mt-auto pt-4">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full"
          >
            <Button
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 dark:hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/20"
              onClick={onView}
            >
              {buttonText}
            </Button>
          </motion.div>
        </CardFooter>
      </motion.div>
    </motion.div>
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
  index?: number
}

function CourseCard({
  image,
  title,
  description,
  badge = "Featured",
  buttonText = "View Event",
  onView,
  className = "",
  maxDescriptionLength = 60,
  index = 0
}: CourseCardProps) {
  const truncatedDescription = description.length > maxDescriptionLength
    ? `${description.slice(0, maxDescriptionLength)}...`
    : description

  return (
    <motion.div 
      variants={cardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex justify-center h-110 bg-surface dark:bg-slate-900 py-6 transition-all duration-300 ease-in-out ${className}`}
    >
      <motion.div
        className="relative mx-auto w-full max-w-sm pt-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        whileHover={{
          boxShadow: "0 4px 24px 4px rgba(34,211,238,0.3)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div 
          className="relative aspect-video w-full overflow-hidden bg-slate-900 dark:bg-slate-800"
          variants={imageVariants}
          whileHover="hover"
        >
          <img
            src={image}
            alt={title}
            className="relative z-20 w-full h-full object-cover brightness-100 dark:brightness-90"
          />
        </motion.div>
        
        <CardHeader className="flex-1 flex flex-col">
          <CardAction>
            <motion.div variants={badgeVariants} whileHover="hover">
              <Badge
                variant="secondary"
                className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-colors duration-300"
              >
                {badge}
              </Badge>
            </motion.div>
          </CardAction>
          <motion.div variants={titleVariants} whileHover="hover">
            <CardTitle className="text-slate-800 dark:text-white transition-colors duration-300">
              {title}
            </CardTitle>
          </motion.div>
          <motion.div variants={descriptionVariants} whileHover="hover" className="flex-1">
            <CardDescription className="text-slate-500 dark:text-slate-300 transition-colors duration-300">
              {truncatedDescription}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardFooter className="mt-auto pt-4">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="w-full"
          >
            <Button
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] dark:bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 dark:hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/20"
              onClick={onView}
            >
              {buttonText}
            </Button>
          </motion.div>
        </CardFooter>
      </motion.div>
    </motion.div>
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
    <section className="relative overflow-hidden">
      {/* Background decorative element */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Title with animation */}
      <motion.h2
        variants={titleTextVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 text-[24px] font-semibold text-slate-800 dark:text-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight"
      >
        {currentT.popularCourses.title}
      </motion.h2>

      {/* Carousel with animated container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 pb-6 sm:pb-10 lg:pb-10"
      >
        <div
          id="hs-carousel"
          className="relative w-full min-h-110 overflow-hidden"
          data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":4}}'
        >
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0 gap-1.5">
            {popularCourses.map((course, index) => (
              <div key={course.id} className="hs-carousel-slide px-1">
                <VideoCourseCard
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  badge={course.badge}
                  buttonText={course.buttonText}
                  onView={() => handleViewCourse(course.id)}
                  onPlay={() => handlePlayVideo(course.id)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Animated Arrows */}
        <motion.button
          type="button"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200 z-20"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </motion.button>

        <motion.button
          type="button"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200 z-20"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </motion.button>
      </motion.div>
    </section>
  )
}

export function HomePopularDoc() {
  const currentT = useTranslation();

  const handleViewCourse = (courseId: number) => {
    console.log("View course:", courseId)
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background decorative element */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Title with animation */}
      <motion.h2
        variants={titleTextVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 text-[24px] font-semibold text-slate-800 dark:text-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight"
      >
        {currentT.popularDoc.title}
      </motion.h2>

      {/* Carousel with animated container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 pb-6 sm:pb-10 lg:pb-10"
      >
        <div
          id="hs-carousel"
          className="relative w-full min-h-110 overflow-hidden"
          data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":4}}'
        >
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0 gap-1.5">
            {docCourses.map((course, index) => (
              <div key={course.id} className="hs-carousel-slide px-1">
                <CourseCard
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  badge={course.badge}
                  buttonText={course.buttonText}
                  onView={() => handleViewCourse(course.id)}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Animated Arrows */}
        <motion.button
          type="button"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200 z-20"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </motion.button>

        <motion.button
          type="button"
          variants={arrowVariants}
          whileHover="hover"
          whileTap="tap"
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-white dark:bg-slate-700 text-slate-800 dark:text-white rounded-full shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200 z-20"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </motion.button>
      </motion.div>
    </section>
  )
}