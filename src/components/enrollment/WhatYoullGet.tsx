// import {
//   PlayCircle,
//   Download,
//   Award,
//   MessageCircleQuestion,
//   Infinity as InfinityIcon,
//   Monitor,
//   LucideIcon,
// } from "lucide-react";
// import { Course, Benefit } from "@/lib/course/courses";

// interface WhatYoullGetProps {
//   course: Course;
// }

// const iconMap: Record<Benefit["icon"], LucideIcon> = {
//   video: PlayCircle,
//   download: Download,
//   certificate: Award,
//   qa: MessageCircleQuestion,
//   pace: InfinityIcon,
//   devices: Monitor,
// };

// const defaultBenefits: Benefit[] = [
//   { icon: "video", title: "Full access to video lessons", description: "and all course materials" },
//   { icon: "download", title: "Downloadable resources", description: "& code files" },
//   { icon: "certificate", title: "Course completion certificate", description: "upon finishing" },
//   { icon: "qa", title: "Q&A support in discussion", description: "with instructor" },
//   { icon: "pace", title: "Learn at your own pace", description: "lifetime access" },
//   { icon: "devices", title: "Access on all devices", description: "anytime, anywhere" },
// ];

// export function WhatYoullGet({ course }: WhatYoullGetProps) {
//   const benefits: Benefit[] = course.benefits ?? defaultBenefits;
// }
//   // ...rest unchanged