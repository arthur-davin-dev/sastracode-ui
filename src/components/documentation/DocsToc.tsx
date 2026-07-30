const ITEMS = [
  "Java ជាអ្វី?",
  "ប្រវត្តិរបស់ Java",
  "Java អាចធ្វើអ្វីខ្លះ?",
  "ហេតុអ្វីត្រូវរៀន Java?",
  "របៀបដំឡើង Java",
  "កម្មវិធីសរសេរ Java (IDE)",
  "របៀបដំណើរការ Java",
];

export default function DocsToc() {
  return (
    <aside className="w-56 shrink-0 p-6 hidden lg:block">
      <div className="text-xs text-gray-400 mb-2">នៅក្នុងទំព័រនេះ</div>
      <ul className="space-y-2 text-sm text-gray-600">
        {ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
