import Script from "next/script"

interface PersonStructuredDataProps {
  name: string
  jobTitle: string
  description: string
  url: string
  email: string
  location: string
  sameAs: string[]
}

export function PersonStructuredData({
  name,
  jobTitle,
  description,
  url,
  email,
  location,
  sameAs,
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: name,
    jobTitle: jobTitle,
    description: description,
    url: url,
    email: email,
    address: {
      "@type": "Place",
      name: location,
    },
    sameAs: sameAs,
    knowsAbout: ["Web Development", "React", "Next.js", "Node.js", "TypeScript", "AI/ML", "Full-Stack Development"],
  }

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export function WebsiteStructuredData({
  url,
  name,
  description,
}: {
  url: string
  name: string
  description: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: url,
    name: name,
    description: description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
