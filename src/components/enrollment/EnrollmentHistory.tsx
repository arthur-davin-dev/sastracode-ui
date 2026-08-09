import Image from "next/image";
import Link from "next/link";
import { EnrollmentHistoryItem } from "@/lib/course/enrollhistory";

interface EnrollmentHistoryProps {
  items: EnrollmentHistoryItem[];
}

export function EnrollmentHistory({ items }: EnrollmentHistoryProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 font-sans">
          ប្រវត្តិចុះឈ្មោះរបស់អ្នក
        </h2>
        <Link 
          href="/enrollments" 
          className="text-sm font-medium text-[#002455] dark:text-blue-400 hover:underline transition-colors"
        >
          មើលទាំងអស់ (View all)
        </Link>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {items.map((item) => (
          <Link key={item.historyId} href={`/courses/${item.historyId}`} className="group">
            <div className="relative mb-2 aspect-video overflow-hidden rounded-xl bg-gray-900">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                className="object-cover transition group-hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium text-gray-900 font-sans">
              {item.title}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                  item.status === "completed"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-blue-50 text-primary-color"
                }`}
              >
                {item.status === "completed" ? "Completed" : "In Progress"}
              </span>
            </div>

          </Link>
        ))}
      </div>

    </div>
  );
}