import Hero from "@/components/documentation/Hero";
import HeroSearchBar from "@/components/documentation/HeroSearchBar"; // 1. Imported the Search Bar
import CourseGrid from "@/components/documentation/CourseGrid";
import Backbutton from "@/components/documentation/Backbutton";
import { lessons, currentProgress, forumPosts, promoBanner } from "@/lib/data/courses";

export default function AllLessonsPage() {
  return (
    <main className="bg-slate-50 ">
         {/* 1. HORIZONTAL TRACK NAVIGATION TABS (PLACED AT THE VERY TOP) */}
        {/* <div className="flex items-center gap-8 mb-8 flex-wrap px-2  border-gray-200 ">
          {trackTabs.map((tab) => {
            const isActive = tab.slug === lesson.trackSlug;
            return (
              <Link
                key={tab.slug}
                href={tab.href}
                className={`text-sm font-extrabold tracking-wider uppercase transition-all duration-150 ${
                  isActive
                    ? "bg-[#002455] text-white px-5 py-2 rounded-full shadow-sm"
                    : "text-slate-500 hover:text-[#002455] py-2"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div> */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        {/* <div className="w-full flex justify-center -mt-14 mb-4 relative z-10">
          <HeroSearchBar />
        </div> */}
        <div className=" flex justify-between">
            <Backbutton/>
            <HeroSearchBar />
        </div>
        
        <CourseGrid title="មេរៀនទាំងអស់" courses={lessons}  />
      </div>
    </main>
  );
}