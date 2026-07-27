import Hero from "@/components/documentation/Hero";
import CourseProgressCard from "@/components/documentation/CourseProgressCard";
import CourseGrid from "@/components/documentation/CourseGrid";
import ForumPostList from "@/components/documentation/ForumPostList";
import PromoBanner from "@/components/documentation/PromoBanner";
import { courses, currentProgress, forumPosts, promoBanner } from "@/lib/data/courses";

export default function DocumentationHomePage() {
  return (
    <main className="bg-slate-50">
      <Hero />

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-base text-primary-color ">បន្តការសិក្សា</h2>
          <CourseProgressCard progress={currentProgress} />
        </section>

        <CourseGrid title="ភាសាទាំងអស់" courses={courses} seeAllHref="/documentation/search" />

        <ForumPostList title="ណែនាំសម្រាប់អ្នក" posts={forumPosts} />
        <PromoBanner data={promoBanner} />
      </div>
    </main>
  );
}
