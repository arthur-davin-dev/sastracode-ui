import { LessonTip } from "@/types/documentation";

const VARIANT_STYLES: Record<LessonTip["variant"], string> = {
  info: "bg-yellow-50 border-yellow-200",
  success: "bg-green-50 border-green-200",
  warning: "bg-red-50 border-red-200",
  danger: "bg-blue-50 border-blue-200",
};

export default function TipsSection({ tips }: { tips: LessonTip[] }) {
  if (!tips.length) return null;
  return (
    <>
      <h3 className="font-semibold mb-3" style={{ fontSize: 24 }}>
        គន្លឹះ និងចំណាំ
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className={`border p-4 ${VARIANT_STYLES[tip.variant]}`}
            style={{ borderRadius: 16 }}
          >
            <div className="font-medium text-[18px] mb-1">{tip.title}</div>
            <div className="text-[16px] text-gray-700">{tip.body}</div>
          </div>
        ))}
      </div>
    </>
  );
}
