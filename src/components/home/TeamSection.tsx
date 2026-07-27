// components/TeamSection.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const team = [
  { name: "John Doe", role: "Frontend Developer", initials: "JD" },
  { name: "Jane Smith", role: "Backend Developer", initials: "JS" },
  { name: "Alex Johnson", role: "UI/UX Designer", initials: "AJ" },
  { name: "Sokha Chan", role: "Fullstack Instructor", initials: "SC" },
];

export default function TeamSection() {
  return (
    <section className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Experienced Support Team</h2>
        <p className="text-slate-500 text-sm mt-1">ក្រុមការងារដែលមានបទពិសោធន៍រង់ចាំគាំទ្រអ្នក</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 items-center">
        {team.map((member, i) => (
          <div key={i} className="flex flex-col items-center space-y-3">
            <Avatar className="w-20 h-20 border-2 border-blue-500 p-1 bg-white">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} />
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h4 className="font-semibold text-sm text-slate-800">{member.name}</h4>
              <p className="text-xs text-slate-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}