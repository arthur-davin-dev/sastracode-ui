import { Card } from "@/components/ui/card";
import { Code2, LayoutTemplate, Sigma, Database } from "lucide-react";

const projects = [
  {
    title: "Sorting Algorithm Demo",
    desc: "កែសម្រួលកាលពី ២ ម៉ោងមុន",
    lang: "Python",
    icon: Code2,
  },
  {
    title: "Landing Page Prototype",
    desc: "កែសម្រួលកាលពី ៥ ម៉ោងមុន",
    lang: "HTML/CSS",
    icon: LayoutTemplate,
  },
  {
    title: "Calc Logic API",
    desc: "កែសម្រួលកាលពី ១ ថ្ងៃមុន",
    lang: "JavaScript",
    icon: Sigma,
  },
  {
    title: "Database Connector",
    desc: "កែសម្រួលកាលពី ២ ថ្ងៃមុន",
    lang: "Java",
    icon: Database,
  },
];

export default function ProjectsSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      {/* Header row */}
      <div className="flex justify-end mb-4">
        <a className="text-sm text-primary hover:underline cursor-pointer flex items-center gap-1">
          មើលទាំងអស់ →
        </a>
      </div>

      {/* Project cards grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {projects.map((project) => {
          const Icon = project.icon;
          return (
            <Card
              key={project.title}
              className="flex flex-row items-center gap-4 p-5 rounded-2xl hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.desc} •{" "}
                  <span className="text-primary">{project.lang}</span>
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Community banner */}
      <div className="rounded-3xl bg-primary/10 p-8 flex items-center justify-between">
        <p className="text-primary font-medium text-lg max-w-md">
          Join a community of 10,000+ Khmer developers building the future of
          the local tech ecosystem.
        </p>
        <div className="flex -space-x-3">
          <div className="h-10 w-10 rounded-full bg-orange-300 border-2 border-white" />
          <div className="h-10 w-10 rounded-full bg-blue-300 border-2 border-white" />
          <div className="h-10 w-10 rounded-full bg-gray-400 border-2 border-white" />
          <div className="h-10 w-10 rounded-full bg-primary text-white border-2 border-white flex items-center justify-center text-xs font-semibold">
            +2k
          </div>
        </div>
      </div>
    </section>
  );
}
