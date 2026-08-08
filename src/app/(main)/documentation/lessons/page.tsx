import HeroSearchBar from "@/components/documentation/HeroSearchBar";
import Backbutton from "@/components/documentation/Backbutton";
import TutorialCatalogClient from "@/components/documentation/TutorialCatalogClient";

export default function AllLessonsPage() {
  return (
    <main className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <Backbutton />
          <div className="w-full sm:w-auto">
            <HeroSearchBar />
          </div>
        </div>

        <TutorialCatalogClient mode="all" />
      </div>
    </main>
  );
}
