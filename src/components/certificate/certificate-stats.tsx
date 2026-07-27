import { GraduationCap, CheckCircle2, Hourglass, Lock, Award } from "lucide-react"
import { cn } from "@/lib/utils"

type StatCard = {
  icon: React.ElementType
  value: number
  label: string
  badge: string
  color: "blue" | "green" | "orange" | "gray"
}

const stats: StatCard[] = [
  { icon: GraduationCap, value: 12, label: "វិញ្ញាបនបត្រដែលទទួលបាន", badge: "សរុប", color: "blue" },
  { icon: CheckCircle2, value: 8, label: "គ្រូសិក្សាបានបញ្ចប់", badge: "ទទួលបានហើយ", color: "green" },
  { icon: Hourglass, value: 2, label: "គ្រូសិក្សាកំពុងបន្ត", badge: "កំពុងសិក្សា", color: "orange" },
  { icon: Lock, value: 2, label: "គ្រូសិក្សាជាប់សោ", badge: "មិនទាន់ចាប់ផ្តើម", color: "gray" },
]

const colorMap = {
  blue: {
    badge: "bg-blue-50 text-blue-600",
    bar: "bg-blue-500",
    iconBg: "bg-blue-50 text-blue-500",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
    iconBg: "bg-emerald-50 text-emerald-500",
  },
  orange: {
    badge: "bg-orange-50 text-orange-600",
    bar: "bg-orange-500",
    iconBg: "bg-orange-50 text-orange-500",
  },
  gray: {
    badge: "bg-slate-100 text-slate-500",
    bar: "bg-slate-300",
    iconBg: "bg-slate-100 text-slate-400",
  },
}

export function CertificateStats() {
  return (
    <section className="rounded-2xl bg-slate-50/60 p-6">
       
      <div>
        <h1 className="text-xl font-bold text-indigo-950 flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
            <Award className="h-4 w-4 text-blue-600" />
          </span>
          វិញ្ញាបនបត្រ
        </h1>
        <p className="text-sm text-muted-foreground mt-1 ml-9">
          មើល និងគ្រប់គ្រងវិញ្ញាបនបត្រនិងខ្លួនភាពសិក្សារបស់អ្នក
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const c = colorMap[s.color]
          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-full", c.iconBg)}>
                  <s.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", c.badge)}>
                  {s.badge}
                </span>
              </div>

              <div className="text-3xl font-bold text-slate-800">{s.value}</div>
              <div className="mt-1 text-sm text-slate-500">{s.label}</div>

        
              <span className={cn("absolute inset-x-0 bottom-0 h-1", c.bar)} />
            </div>
          )
        })}
      </div>
    </section>
  )
}