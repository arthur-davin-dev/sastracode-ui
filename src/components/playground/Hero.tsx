import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <div className="relative overflow-hidden rounded-3xl border border-border p-10">
        {/* soft gradient blob background, optional */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative grid md:grid-cols-2 gap-30 items-center">
          {/* Left side: text + buttons */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              សាកល្បងសរសេរកូដ
            </h1>
            <p className="text-muted-foreground mb-6">
              Choose a programming language and code directly in the browser.
              Build, test, and learn in a high-performance Khmer-focused
              environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="gap-2 w-full sm:w-55 py-6 text-base bg-primary-color transition-transform duration-200 hover:scale-105"
              >
                <Rocket className="h-4 w-4" />
                បើក Playground ថ្មី
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-55 py-6 text-base"
              >
                ស្វែងយល់បន្ថែម
              </Button>
            </div>
          </div>

          {/* Right side: fake code editor card */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-1.5 mb-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <pre className="text-sm font-mono leading-relaxed overflow-x-auto">
              <code>
                <span className="text-purple-500">function</span>{" "}
                <span className="text-blue-500">helloWorld</span>() {"{"}
                {"\n"} <span className="text-blue-500">console.log</span>(
                <span className="text-green-600">"សួស្តី​ពិភពលោក!"</span>);
                {"\n"}
                {"}"}
                {"\n\n"}
                <span className="text-blue-500">helloWorld</span>();
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
