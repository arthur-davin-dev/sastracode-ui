import { Card } from "@/components/ui/card"

const languages = [
  {
    name: "HTML",
    desc: "Structure & Markup",
    icon: "🌐",
    bg: "bg-orange-100",
  },
  {
    name: "CSS",
    desc: "Styles & Layouts",
    icon: "🎨",
    bg: "bg-blue-100",
  },
  {
    name: "JavaScript",
    desc: "Logic & Interactivity",
    icon: "⚡",
    bg: "bg-yellow-100",
  },
  {
    name: "Python",
    desc: "Data & Automation",
    icon: "🐍",
    bg: "bg-green-100",
  },
  {
    name: "Java",
    desc: "Enterprise & Backend",
    icon: "☕",
    bg: "bg-red-100",
  },
]

export default function LanguageCards() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {languages.map((lang) => (
          <Card
            key={lang.name}
            className="p-4 flex flex-col gap-2 rounded-2xl hover:shadow-md transition-shadow cursor-pointer"
          >
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center text-lg ${lang.bg}`}
            >
              {lang.icon}
            </div>
            <h3 className="font-semibold">{lang.name}</h3>
            <p className="text-sm text-muted-foreground">{lang.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}