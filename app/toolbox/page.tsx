import { ToolboxGrid } from "@/components/toolbox/toolbox-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Toolbox | Ritik Raghuwanshi",
  description:
    "Explore the technologies, frameworks, and tools I use to build modern web applications and solve complex problems.",
}

export default function ToolboxPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">My Toolbox</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          The technologies, frameworks, and tools I use to bring ideas to life.
        </p>
      </header>
      <ToolboxGrid />
    </div>
  )
}
