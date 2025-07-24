import { ExperienceTimeline } from "@/components/experience/experience-timeline"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Experience | Ritik Raghuwanshi",
  description:
    "Explore Ritik Raghuwanshi's professional journey, roles, and contributions in various tech projects and internships.",
}

export default function ExperiencePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Professional Journey</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          A timeline of my key roles, projects, and learning experiences in software development.
        </p>
      </header>
      <ExperienceTimeline />
    </div>
  )
}
