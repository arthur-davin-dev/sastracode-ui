import Image from "next/image";
import HeroSearchBar from "./HeroSearchBar";
import TechStackChips from "./TechStackChips";
import { techOptions } from "@/lib/data/courses";
import nareaImg from '../../assets/svg/narea.jpg';
export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold leading-tight text-blue-800 sm:text-5xl">
          សាស្ត្រាកូដ
        </h1>

        <p className="max-w-lg text-slate-500">
          រៀនកូដជាមួយវគ្គសិក្សាថ្មីៗ ជាមួយចំណេះដឹងជាក់ស្តែង
          ចូលរួមជាមួយសហគមន៍អ្នកសិក្សាកូដសាកល ដើម្បីជំរុញលទ្ធភាពវិជ្ជាជីវៈអ្នក
          និងស្វែងរកជំនាញថ្មីៗសម្រាប់អនាគតការងារកម្រិតខ្ពស់។
        </p>

        <HeroSearchBar />

        <TechStackChips options={techOptions} />
      </div>

      <div className="relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-100 to-blue-200" />
        {/* Replace src with the real mascot illustration asset */}
        <Image
          src={nareaImg}
          alt="សិស្សសាស្ត្រាកូដកំពុងកាន់កុំព្យូទ័រយួរដៃ"
          fill
          className="relative object-contain"
          priority
        />
      </div>
    </section>
  );
}
