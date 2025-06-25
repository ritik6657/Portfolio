import { CertificationsGrid } from "@/components/certifications/certifications-grid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Certifications | Harshit Lodhi",
  description: "Professional certifications and achievements in web development, cloud computing, and technology.",
}

export default function CertificationsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Certifications</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Professional certifications and achievements that validate my expertise in various technologies.
        </p>
      </header>
      <CertificationsGrid />
    </div>
  )
}
