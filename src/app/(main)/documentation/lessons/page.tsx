import HeroSearchBar from "@/components/documentation/HeroSearchBar";
import CourseGrid from "@/components/documentation/CourseGrid";
import Backbutton from "@/components/documentation/Backbutton";
import { lessons } from "@/lib/data/courses";

export default function AllLessonsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        
        {/* Top Navigation & Search Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Backbutton />
          <div className="w-full sm:w-auto">
            <HeroSearchBar />
          </div>
        </div>
        
        {/* Course Grid Content */}
        <CourseGrid title="មេរៀនទាំងអស់" courses={lessons} />
        
      </div>
    </main>
  );
}
