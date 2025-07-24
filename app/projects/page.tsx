import { ProjectsGrid } from "@/components/projects/projects-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Projects | Ritik Raghuwanshi",
  description:
    "Explore Ritik Raghuwanshi's portfolio of web applications, tools, and innovative projects built with modern technologies.",
}

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">My Projects</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          A collection of applications and tools I've built using modern web technologies.
        </p>
      </header>
      <ProjectsGrid />
    </div>
  )
}
