export default function KeyPoint({ summary }: { summary: string }) {
  if (!summary) return null;
  return (
    <div className="bg-white border border-gray-200 p-5 mb-6" style={{ borderRadius: 16 }}>
      <h3 className="font-semibold mb-2" style={{ fontSize: 24 }}>
        គន្លឹះសំខាន់
      </h3>
      <p className="leading-relaxed text-gray-700" style={{ fontSize: 18 }}>
        {summary}
      </p>
    </div>
  );
}
