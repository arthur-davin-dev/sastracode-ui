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
import { useRouter } from "next/navigation"
import { useGetPublicCoursesQuery } from "@/redux/api/course-api"
import { mapApiCourseToCourse } from "@/lib/course/course-adapter"

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
    <div className={`flex justify-center h-110 bg-surface py-6 transition-all duration-300 ease-in-out ${className}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0 dark:bg-slate-800 dark:border-slate-700 transition-all duration-300 ease-in-out  hover:shadow-[0_4px_12px_2px_rgba(34,211,238,0.5)]
  dark:hover:shadow-[0_4px_12px_2px_var(--color-cyan-500)] hover:scale-[1.02] dark:hover:shadow-slate-700/50 group flex flex-col">
        <div className="absolute inset-0 z-30 aspect-video dark:bg-black/1 transition-opacity duration-300 group-hover:opacity-75" />
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="relative z-20 aspect-video w-full brightness dark:brightness-60 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <CardHeader className="flex-1 flex flex-col">
          <CardAction>
            <Badge
              variant="secondary"
              className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 transition-all duration-300 hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-600"
            >
              {badge}
            </Badge>
          </CardAction>
          <CardTitle className="dark:text-white transition-colors duration-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
            {title}
          </CardTitle>
          <CardDescription className="dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-200 flex-1">
            {truncatedDescription}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto pt-4">
          <Button
            className="w-full dark:bg-primary-600 dark:hover:bg-primary-700 dark:text-white inline-flex items-center justify-center gap-2 rounded-xl bg-[#002455] px-4 py-3 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-900 active:scale-[0.98] hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/20"
            onClick={onView}
          >
            {buttonText}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

const documentationCards = [
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

// Main Component
export function HomePopularCourse() {
  const currentT = useTranslation();
  const router = useRouter();
  const { data, isLoading, error } = useGetPublicCoursesQuery({ sort: "POPULAR" });
  const courses = (data ?? []).slice(0, 8).map(mapApiCourseToCourse);

  React.useEffect(() => {
    if (isLoading) return;
    void import("preline/non-auto").then(({ HSStaticMethods }) => {
      HSStaticMethods.autoInit();
    });
  }, [isLoading, courses.length]);

  const handleViewCourse = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  }

  return (
    <section>
      {/* Title - nearly touching the carousel */}
      <h2 className="text-[24px] font-semibold text-slate-800 dark:text-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight">
        {currentT.popularCourse.title}
      </h2>

      {/* Carousel - pulled up to nearly touch */}
      <div
        id="hs-carousel"
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 -mt-3 pb-6 sm:pb-10 lg:pb-10"
        data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":4}}'
      >
        <div className="hs-carousel relative w-full min-h-110 overflow-hidden">
          {/* Carousel Body */}
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0 gap-1.5">
            {isLoading && [1, 2, 3, 4].map((item) => (
              <div key={item} className="hs-carousel-slide px-1">
                <div className="mx-auto my-6 h-96 w-full max-w-sm animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
            {!isLoading && !error && courses.map((course) => (
              <div key={course.id} className="hs-carousel-slide px-1">
                <CourseCard
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  badge={course.accessType === "PREMIUM" ? "Premium" : course.category}
                  buttonText="មើលវគ្គសិក្សា"
                  onView={() => handleViewCourse(course.id)}
                />
              </div>
            ))}
            {!isLoading && error && (
              <div className="hs-carousel-slide px-1">
                <div className="m-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300">
                  មិនអាចទាញយកវគ្គសិក្សាពេញនិយមពី API បាន។
                </div>
              </div>
            )}
          </div>
          {/* End Carousel Body */}
        </div>

        {/* Arrows */}
        <button
          type="button"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-layer dark:bg-slate-700 text-layer-foreground dark:text-white rounded-full shadow-2xs hover:bg-layer-hover dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
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
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-layer dark:bg-slate-700 text-layer-foreground dark:text-white rounded-full shadow-2xs hover:bg-layer-hover dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
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
      <h2 className="text-[24px] font-semibold dark:text-white mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-0 leading-tight">
        {currentT.popularDoc.title}
      </h2>

      {/* Carousel - pulled up to nearly touch */}
      <div
        id="hs-carousel"
        className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-4 -mt-3 pb-6 sm:pb-10 lg:pb-10"
        data-hs-carousel='{"loadingClasses": "opacity-0", "dotsItemClasses": "hs-carousel-active:bg-primary-active hs-carousel-active:border-primary-active size-3 border border-line-4 rounded-full cursor-pointer", "isDraggable": true, "slidesQty": {"xs": 1,"sm": 3, "lg":4}}'
      >
        <div className="hs-carousel relative w-full min-h-110 overflow-hidden">
          {/* Carousel Body */}
          <div className="px-6 hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 inset-s-0 transition-transform duration-700 -mx-1 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing opacity-0 gap-1.5">
            {documentationCards.map((course) => (
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
        <button
          type="button"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-layer dark:bg-slate-700 text-layer-foreground dark:text-white rounded-full shadow-2xs hover:bg-layer-hover dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
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
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-layer dark:bg-slate-700 text-layer-foreground dark:text-white rounded-full shadow-2xs hover:bg-layer-hover dark:hover:bg-slate-600 -translate-y-1/2 focus:outline-hidden transition-colors duration-200"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </button>
        {/* End Arrows */}
      </div>
    </section>
  )
}