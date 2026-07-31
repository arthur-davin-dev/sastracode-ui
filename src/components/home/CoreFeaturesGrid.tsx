// components/CoreFeaturesGrid.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Terminal, Cpu, ShieldCheck, Zap, Globe } from "lucide-react";

const features = [
  { icon: Code, title: "Interactive Coding", desc: "រៀនសរសេរកូដផ្ទាល់នៅលើ Platform" },
  { icon: Terminal, title: "Practice Exercises", desc: "លំហាត់អនុវត្តកូដសម្បូរបែប" },
  { icon: Cpu, title: "AI Code Review", desc: "ពិនិត្យកូដស្វ័យប្រវត្តដោយ AI" },
  { icon: ShieldCheck, title: "Certificates", desc: "ទទួលសញ្ញាបត្របន្ទាប់ពីបញ្ចប់" },
  { icon: Zap, title: "Fast Learning", desc: "មេរៀនខ្លីៗ ងាយយល់" },
  { icon: Globe, title: "Community Support", desc: "សហគមន៍ជួយដោះស្រាយបញ្ហា" },
];

export default function CoreFeaturesGrid() {
  return (
    <section className="text-center space-y-8">
      <div>
        <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">
          Core Features
        </Badge>
        <h2 className="text-3xl font-bold mt-2">មុខងារចម្បងៗរបស់ Platform</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <Card key={idx} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <item.icon className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}