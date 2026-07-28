import { LessonPageAnchor } from "@/types/documentation";

export default function DocsToc({ anchors }: { anchors: LessonPageAnchor[] }) {
  if (!anchors.length) return null;
  return (
    <aside className="w-56 shrink-0 p-6 hidden lg:block">
      <div className="text-xs text-gray-400 mb-2">នៅក្នុងទំព័រនេះ</div>
      <ul className="space-y-2 text-sm text-gray-600">
        {anchors.map((a) => (
          <li key={a.id} className={a.active ? "font-medium text-[#002455]" : undefined}>
            {a.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}
