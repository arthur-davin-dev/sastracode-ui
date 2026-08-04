import HeroSearchBar from "./HeroSearchBar";
import TechStackChips from "./TechStackChips";
import HeroVisual from "./HeroVisual";
import { techOptions } from "@/lib/data/courses";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold leading-tight text-[#002455] dark:text-slate-100 sm:text-5xl">
          <span className="text-[#cd0000]">សាស្ត្រា</span>កូដ
        </h1>

        <p className="max-w-lg text-[24px] text-primary-color dark:text-slate-200">
          រៀនកូដជាមួយវគ្គសិក្សាថ្មីៗ ជាមួយចំណេះដឹងជាក់ស្តែង
          ចូលរួមជាមួយសហគមន៍អ្នកសិក្សាកូដសាកល ដើម្បីជំរុញលទ្ធភាពវិជ្ជាជីវៈអ្នក
          និងស្វែងរកជំនាញថ្មីៗសម្រាប់អនាគតការងារកម្រិតខ្ពស់។
        </p>

        {/* <HeroSearchBar /> */}

        <TechStackChips options={techOptions} />
      </div>

      <div className="mx-auto">
        <HeroVisual />
      </div>
    </section>
  );
}
