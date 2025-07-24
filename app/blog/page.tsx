import { BlogGrid } from "@/components/blog/blog-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Ritik Raghuwanshi",
  description: "Thoughts, tutorials, and insights about web development, AI, and technology.",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Blog</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Thoughts, tutorials, and insights about web development, AI, and technology.
        </p>
      </header>
      <BlogGrid />
    </div>
  )
}
