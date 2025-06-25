import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Me | Harshit Lodhi",
  description:
    "Get in touch with Harshit Lodhi for collaboration opportunities, project inquiries, or just to say hello.",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">Get In Touch</h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  )
}
