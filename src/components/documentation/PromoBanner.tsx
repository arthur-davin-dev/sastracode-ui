import Image from "next/image";
import Link from "next/link";
import { PromoBannerData } from "@/types/course";

interface PromoBannerProps {
  data: PromoBannerData;
}

export default function PromoBanner({ data }: PromoBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-blue-950 px-6 py-8 sm:px-10 font-khmer">
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div className="flex flex-col items-start gap-3">
          <span className="rounded-full bg-red-500 px-3 py-1 text-[11px]  tracking-wide text-white">
            {data.badge}
          </span>
          <h2 className="text-xl  text-white sm:text-2xl">{data.title}</h2>
          <p className="max-w-md text-sm text-blue-100/80">{data.description}</p>
          <Link
            href={data.href}
            className="mt-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
          >
            {data.ctaLabel}
          </Link>
        </div>

        <div className="relative mx-auto hidden h-32 w-48 sm:block">
          <Image src={data.image} alt={data.title} fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}
