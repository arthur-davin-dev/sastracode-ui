// src/app/(dashboard)/certificates/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Download } from "lucide-react"

const certificates = [
  { id: 1, course: "Khmer Grammar Basics", issuedOn: "2026-04-20", fileUrl: "/certs/1.pdf" },
  { id: 2, course: "Intro to Web Development", issuedOn: "2026-06-15", fileUrl: "/certs/2.pdf" },
]

export default function CertificatesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">វិញ្ញាបនបត្រ</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((c) => (
          <Card key={c.id}>
            <CardHeader className="flex flex-row items-center gap-3">
              <Award className="text-primary" />
              <CardTitle className="text-base">{c.course}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Issued {c.issuedOn}</span>
              <Button size="sm" variant="outline" render={<a href={c.fileUrl} download />}>
                <Download className="mr-1 h-4 w-4" /> PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}