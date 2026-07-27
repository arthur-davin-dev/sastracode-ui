"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Users, Clock, ArrowRight } from "lucide-react";
import { BookmarkedCourse } from "@/types/course";
import { useState } from "react";

export function BookmarkCourseCard({ course }: { course: BookmarkedCourse }) {
  const [isBookmarked, setIsBookmarked] = useState(course.isBookmarked);

  return (
    <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48">
        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
      </div>

      <CardContent className="p-4 space-y-2">
        <Badge className="bg-pink-50 text-pink-600 hover:bg-pink-50 text-[10px]">
          {course.category}
        </Badge>

        <p className="font-bold text-sm text-indigo-950">{course.title}</p>
        <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" /> {course.studentsCount}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {course.duration}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="sm"
            variant={isBookmarked ? "default" : "outline"}
            className={isBookmarked ? " text-white bg-indigo-950 hover:bg-indigo-900" : "border-yellow-400 text-yellow-600 hover:bg-yellow-50"}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="h-3 w-3 mr-1" fill={isBookmarked ? "white" : "none"} />
            {isBookmarked ? "ព័ត៌មានលម្អិត" : "ដកចេញពីចំណាំ"}
          </Button>

          <a href="#" className="text-xs font-medium text-indigo-950 flex items-center gap-1 hover:underline">
            ចាប់ផ្តើមសិក្សា <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}