"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, ArrowRight } from "lucide-react";
import { MyCourse } from "@/types/course";

export function MyCourseCard({ course }: { course: MyCourse }) {
  return (
    <Card className="overflow-hidden  hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-32">
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
            className={
              course.status === "in_progress"
                ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                : " text-white bg-indigo-950 hover:bg-indigo-900"
            }
          >
            {course.status === "in_progress" ? "ឥតគិតថ្លៃ" : "ថ្នាក់បង់ថ្លៃ"}
          </Button>

          <a href="#" className="text-xs font-medium text-indigo-950 flex items-center gap-1 hover:underline">
            ចាប់ផ្តើមសិក្សា <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}