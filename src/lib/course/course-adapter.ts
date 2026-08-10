import type { CourseDetailResponse } from "@/redux/api/course-api";
import type { Course, Chapter } from "@/lib/course/courses";

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.ceil((seconds % 3600) / 60);
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export function toUiCourse(course: CourseDetailResponse): Course {
  const sections = [...(course.sections ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);
  const videos = sections.flatMap((section) => section.videos ?? []);
  const durationSeconds = videos.reduce((total, video) => total + (video.durationSeconds ?? 0), 0);
  const curriculum: Chapter[] = sections.map((section, index) => {
    const sectionVideos = [...(section.videos ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);
    return {
      id: section.id,
      number: String(index + 1),
      title: section.title,
      lessonCount: sectionVideos.length,
      totalDuration: formatDuration(sectionVideos.reduce((total, video) => total + (video.durationSeconds ?? 0), 0)),
      lessons: sectionVideos.map((video) => ({
        id: video.id,
        title: video.title,
        duration: formatDuration(video.durationSeconds ?? 0),
        locked: !video.isPreview && !course.hasFullAccess,
        videoUrl: video.embedUrl,
      })),
    };
  });
  const coverFileId = course.coverFileId?.trim() ?? "";
  const image = coverFileId
    ? `/api/files/${encodeURIComponent(coverFileId)}`
    : "/assets/images/HTML & CSS.jpg";

  return {
    id: course.id,
    category: course.categories?.[0]?.name ?? course.accessType,
    title: course.title,
    description: course.description ?? "",
    lessons: videos.length,
    duration: formatDuration(durationSeconds),
    totalDuration: formatDuration(durationSeconds),
    image,
    coverFileId,
    href: `/courses/${course.id}`,
    price: course.price,
    originalPrice: course.discount > 0 ? course.price / (1 - course.discount / 100) : undefined,
    locked: course.accessType === "PRIVATE" && !course.hasFullAccess,
    instructor: course.instructorId ? {
      name: course.instructorId.name,
      avatar: course.instructorId.avatarFileId
        ? `/api/profile/avatar/${course.instructorId.avatarFileId}`
        : "/assets/images/Davin.png",
      tags: course.tags?.map(({ name }) => name),
    } : undefined,
    curriculum,
  };
}
