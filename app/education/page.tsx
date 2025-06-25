import { EducationTimeline } from "@/components/education/education-timeline"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Education | Harshit Lodhi",
  description: "Academic background and educational journey of Harshit Lodhi in computer science and technology.",
}

export default function EducationPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Education</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          My academic journey and educational background in technology and computer science.
        </p>
      </header>
      <EducationTimeline />
    </div>
  )
}
