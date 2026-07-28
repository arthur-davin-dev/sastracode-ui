export default function LearningGoals({ objectives }: { objectives: string[] }) {
  if (!objectives.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {objectives.map((goal) => (
        <div
          key={goal}
          className="bg-white border border-gray-200 p-4 text-sm"
          style={{ borderRadius: 16, fontSize: 18 }}
        >
          {goal}
        </div>
      ))}
    </div>
  );
}
