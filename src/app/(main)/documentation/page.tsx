import Hero from "@/components/documentation/Hero";
import CourseProgressCard from "@/components/documentation/CourseProgressCard";
import CourseGrid from "@/components/documentation/CourseGrid";
import ForumPostList from "@/components/documentation/ForumPostList";
import PromoBanner from "@/components/documentation/PromoBanner";
import { lessons, currentProgress, forumPosts, promoBanner } from "@/lib/data/courses";

export default function DocumentationHomePage() {
  
  // 1. FILTER: Grab courses tagged or sorted as "Latest" (e.g., sorting by recent or grabbing last 3)
  const latestCourses = lessons.slice(0, 3); 

  // 2. FILTER: Grab courses that fit "Recommended" (e.g., matching user preferences or featured flags)
  // If you don't have a flag yet, you can use .filter(c => c.isRecommended) or slice a different segment
  const recommendedCourses = lessons.slice(1, 4); 

  // 3. FILTER: Grab courses that are "Popular" (e.g., highest views or enrollment counts)
  // Example: lessons.filter(c => c.isPopular) or sorting them by an arbitrary value
  const popularCourses = [...lessons].reverse().slice(0, 3);

  return (
    <main className="bg-slate-50">
      <Hero />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
        
        {/* Continue Learning Area */}
        <section className="flex flex-col gap-4">
          <h2 className="text-[24px] font-semibold text-primary-color">បន្តការសិក្សា</h2>
          <CourseProgressCard progress={currentProgress} />
        </section>

        {/* Dynamic Category Blocks */}
        <CourseGrid title="ចុងក្រោយបំផុត" courses={latestCourses} seeAllHref="/documentation/lessons?category=latest" />
        <CourseGrid title="ណែនាំសម្រាប់អ្នក" courses={recommendedCourses} seeAllHref="/documentation/lessons?category=recommended" />
        <CourseGrid title="មេរៀនពេញនិយម" courses={popularCourses} seeAllHref="/documentation/lessons?category=popular" />
        
        {/* Fallback baseline listing everything */}
        <CourseGrid title="មេរៀនទាំងអស់" courses={lessons} seeAllHref="/documentation/lessons" />

        {/* <ForumPostList title="ណែនាំសម្រាប់អ្នក" posts={forumPosts} /> */}
        {/* <PromoBanner data={promoBanner} /> */}
      </div>
    </main>
  );
}