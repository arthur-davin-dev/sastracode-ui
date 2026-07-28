// data/features.ts

import {
  BookOpen,
  Code2,
  Brain,
  ClipboardCheck,
  PlayCircle,
  Map,
} from "lucide-react";

export const features = [
  {
    title: "Interactive Documentation",
    icon: BookOpen,
    description:
      "Learn programming through interactive documentation with live examples.",
    color: "from-cyan-100 to-blue-100",
  },
  {
    title: "Coding Playground",
    icon: Code2,
    description:
      "Practice directly inside the browser without installing anything.",
    color: "from-blue-100 to-indigo-100",
  },
  {
    title: "AI Code Coach",
    icon: Brain,
    description:
      "Ask AI questions, receive hints, explanations and debugging help.",
    color: "from-purple-100 to-pink-100",
  },
  {
    title: "Quiz & Assessment",
    icon: ClipboardCheck,
    description:
      "Test your knowledge with quizzes after every lesson.",
    color: "from-cyan-100 to-teal-100",
  },
  {
    title: "Video Learning",
    icon: PlayCircle,
    description:
      "Watch short tutorials before practicing.",
    color: "from-blue-100 to-sky-100",
  },
  {
    title: "Learning Roadmaps",
    icon: Map,
    description:
      "Structured learning paths from beginner to advanced.",
    color: "from-violet-100 to-purple-100",
  },
];