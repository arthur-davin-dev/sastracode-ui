// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-8">
      <div className="space-y-6">
        <Badge variant="outline" className="px-3 py-1 rounded-full text-blue-600 border-blue-200 bg-blue-50">
          Learn to Code
        </Badge>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          រៀនសរសេរកូដ <br />
          <span className="text-blue-600">ជាមួយ Smart Code</span>
        </h1>

        <p className="text-slate-600 text-lg max-w-lg">
          អភិវឌ្ឍជំនាញសរសេរកូដរបស់អ្នកជាមួយមេរៀន និងលំហាត់ជាក់ស្តែង សម្រួលដល់ការសិក្សាប្រកបដោយប្រសិទ្ធភាព។
        </p>

        <div className="flex items-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            ចាប់ផ្តើមរៀន <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg">
            ស្វែងយល់បន្ថែម
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
          <div>
            <div className="text-2xl font-bold text-slate-900">10k+</div>
            <div className="text-sm text-slate-500">សិស្សសរុប</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">50+</div>
            <div className="text-sm text-slate-500">វគ្គសិក្សា</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">99%</div>
            <div className="text-sm text-slate-500">ការពេញចិត្ត</div>
          </div>
        </div>
      </div>

      {/* Code Card Illustration Placeholder */}
      <div className="relative flex justify-center">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl border border-slate-100 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <span className="w-3 h-3 bg-red-400 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-400 rounded-full" />
            <span className="text-xs text-slate-400 ml-auto font-mono">main.js</span>
          </div>
          <pre className="text-sm font-mono text-slate-700 bg-slate-900 text-emerald-400 p-4 rounded-lg overflow-x-auto">
            <code>{`function startCoding() {\n  return "Welcome to SmartCode!";\n}`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}