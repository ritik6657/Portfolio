import { StatsOverview } from "@/components/stats/stats-overview"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio Stats | Ritik Raghuwanshi",
  description: "Portfolio metrics and performance statistics.",
}

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Portfolio Statistics</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights and metrics about my portfolio performance and engagement.
        </p>
      </header>
      <StatsOverview />
    </div>
  )
}
