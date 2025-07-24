import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Testimonials | Ritik Raghuwanshi",
  description:
    "What clients and colleagues say about working with Ritik Raghuwanshi on various projects and collaborations.",
}

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Testimonials</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          What clients and colleagues say about working with me on various projects and collaborations.
        </p>
      </header>
      <TestimonialsGrid />
    </div>
  )
}
