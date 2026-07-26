import Link from "next/link";
import { TechOption } from "@/types/course";

interface TechStackChipsProps {
  options: TechOption[];
}

export default function TechStackChips({ options }: TechStackChipsProps) {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {options.map((option) => (
        <li key={option.id}>
          <Link
            href={`/documentation?tag=${option.label.toLowerCase()}`}
            className="flex items-center gap-2 rounded-full  font-khmer text-primary-color bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            {/* Swap for next/image once real icon assets are added */}
            <span aria-hidden className=" font-khmer text-primary-color h-6 w-6 rounded-sm bg-slate-100" />
            {option.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
