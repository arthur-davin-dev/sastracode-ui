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

// CourseCard Component
interface CourseCardProps {
  image: string
  title: string
  description: string
  badge?: string
  buttonText?: string
  onView?: () => void
  className?: string
  maxDescriptionLength?: number // Optional: customize truncation length
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
  // Truncate description if longer than maxDescriptionLength
  const truncatedDescription = description.length > maxDescriptionLength
    ? `${description.slice(0, maxDescriptionLength)}...`
    : description

  return (
    <div className={`flex justify-center h-auto bg-surface py-6 ${className}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={image}
          alt={title}
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{badge}</Badge>
          </CardAction>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{truncatedDescription}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={onView}>
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

const courses = [
  {
    id: 1,
    image: "https://avatar.vercel.sh/shadcn1",
    title: "Design systems meetup",
    description: "A practical talk on component APIs, accessibility, and shipping faster.",
    badge: "Featured",
    buttonText: "View Event"
  },
  {
    id: 2,
    image: "https://avatar.vercel.sh/shadcn2",
    title: "Advanced React patterns",
    description: "Learn advanced React patterns and best practices for scalable applications.",
    badge: "Popular",
    buttonText: "Learn More"
  },
  {
    id: 3,
    image: "https://avatar.vercel.sh/shadcn3",
    title: "UI/UX fundamentals",
    description: "Master the fundamentals of user interface and user experience design.",
    badge: "New",
    buttonText: "Start Course"
  },
  {
    id: 4,
    image: "https://avatar.vercel.sh/shadcn4",
    title: "TypeScript mastery",
    description: "Deep dive into TypeScript with practical examples and advanced types.",
    badge: "Advanced",
    buttonText: "View Course"
  },
  {
    id: 5,
    image: "https://avatar.vercel.sh/shadcn5",
    title: "Full-stack development",
    description: "Build complete web applications from frontend to backend.",
    badge: "Trending",
    buttonText: "Enroll Now"
  },
  {
    id: 6,
    image: "https://avatar.vercel.sh/shadcn6",
    title: "Cloud architecture",
    description: "Design and deploy scalable cloud-native applications.",
    badge: "Expert",
    buttonText: "View Course"
  }
]

// Main Component
export function HomePopularCourse() {
  const currentT = useTranslation();

  // Course data - replace with your actual data
  const handleViewCourse = (courseId: number) => {
    console.log("View course:", courseId)
    // Add your navigation logic here
  }

  return (
    <section>
      {/* Title - nearly touching the carousel */}
      <h2 className="text-[24px] font-semibold text-slate-800 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight">
        {currentT.popularDoc.title}
      </h2>

      {/* Carousel - pulled up to nearly touch */}
      <div
        id="hs-carousel"
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 -mt-3 pb-6 sm:pb-10 lg:pb-10"
        data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":3}}'
      >
        <div className="hs-carousel relative w-full min-h-110 overflow-hidden">
          {/* Carousel Body */}
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0">
            {courses.map((course) => (
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
          {/* End Carousel Body */}
        </div>

        {/* Arrows */}
        <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-layer text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden">
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-layer text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden">
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </span>
        </button>
        {/* End Arrows */}
      </div>
    </section>
  )
}

export function HomePopularDoc() {
  const currentT = useTranslation();

  // Course data - replace with your actual data
  const handleViewCourse = (courseId: number) => {
    console.log("View course:", courseId)
    // Add your navigation logic here
  }

  return (
    <section>
      {/* Title - nearly touching the carousel */}
      <h2 className="text-[24px] font-semibold text-slate-800 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight">
        {currentT.popularDoc.title}
      </h2>

      {/* Carousel - pulled up to nearly touch */}
      <div
        id="hs-carousel"
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 -mt-3 pb-6 sm:pb-10 lg:pb-10"
        data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":3}}'
      >
        <div className="hs-carousel relative w-full min-h-110 overflow-hidden">
          {/* Carousel Body */}
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0">
            {courses.map((course) => (
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
          {/* End Carousel Body */}
        </div>

        {/* Arrows */}
        <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-layer text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden">
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-layer text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden">
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </span>
        </button>
        {/* End Arrows */}
      </div>
    </section>
  )
}