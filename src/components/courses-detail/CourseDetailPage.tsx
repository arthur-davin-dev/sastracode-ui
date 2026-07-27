"use client";

import Image from "next/image";
import { Course } from "@/lib/course/courses";
import { Play, Clock, BookOpen, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CourseDetailPageProps {
  course: Course;
}

export default function CourseDetailPage({ course }: CourseDetailPageProps) {
  const curriculum = course.curriculum || [];
  const instructor = course.instructor;
  const learningPoints = course.learningPoints || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Section */}
      <div className="relative h-100 w-full">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge className="mb-4">{course.category}</Badge>
            <h1 className="text-4xl font-bold text-white mb-2">
              {course.title}
            </h1>
            <p className="text-gray-200 max-w-2xl">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>{course.lessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{course.duration}</span>
              </div>
              {instructor?.rating && (
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>
                    {instructor.rating}{" "}
                    {instructor.reviewCount
                      ? `(${instructor.reviewCount} reviews)`
                      : ""}
                  </span>
                </div>
              )}
            </div>

            {/* What You Will Learn */}
            {learningPoints.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    What you will learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learningPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructor */}
            {instructor && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Instructor</h2>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full bg-muted overflow-hidden">
                      <Image
                        src={instructor.avatar}
                        alt={instructor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {instructor.name}
                      </h3>
                      {instructor.tags && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {instructor.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Curriculum */}
            {curriculum.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <Accordion type="multiple" className="w-full">
                  {curriculum.map((chapter) => (
                    <AccordionItem key={chapter.id} value={chapter.id}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-4 text-left w-full pr-4">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            Ch. {chapter.number}
                          </span>
                          <span className="font-semibold">{chapter.title}</span>
                          <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
                            {chapter.lessonCount} lessons •{" "}
                            {chapter.totalDuration}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pl-4">
                          {chapter.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="w-4 h-4 text-primary" />
                                <span
                                  className={
                                    lesson.locked
                                      ? "text-muted-foreground"
                                      : ""
                                  }
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-4">
                {course.price ? (
                  <div className="text-3xl font-bold">${course.price}</div>
                ) : (
                  <div className="text-3xl font-bold text-green-600">
                    Free
                  </div>
                )}
                <Button className="w-full" size="lg">
                  Enroll Now
                </Button>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lessons</span>
                    <span>{course.lessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chapters</span>
                    <span>{curriculum.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}