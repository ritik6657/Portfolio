import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PortfolioLayout from "@/components/portfolio-layout"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://oeeez.online"),
  title: {
    default: "Ritik Raghuwanshi - Full-Stack Developer & AI Enthusiast",
    template: "%s | Ritik Raghuwanshi",
  },
  description:
    "Full-Stack Developer specializing in React, Next.js, and AI/ML. Building smart and scalable applications with modern technologies.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "AI",
    "Machine Learning",
    "Web Development",
    "Ritik Raghuwanshi"
  ],
  authors: [{ name: "Ritik Raghuwanshi", url: "https://Ritiklodhisportfolio.vercel.app" }],
  creator: "Ritik Raghuwanshi",
  publisher: "Ritik Raghuwanshi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oeeez.online",
    siteName: "Ritik Raghuwanshi Portfolio",
    title: "Ritik Raghuwanshi - Full-Stack Developer & AI Enthusiast",
    description:
      "Full-Stack Developer specializing in React, Next.js, and AI/ML. Building smart and scalable applications.",
    images: [
      {
        url: "https://drive.google.com/uc?id=1foz3FYIN-6ZhIpzE8goPyBtyQ-FDAtFT", // Direct view link from Google Drive
        width: 1200,
        height: 630,
        alt: "Ritik Raghuwanshi - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritik Raghuwanshi - Full-Stack Developer & AI Enthusiast",
    description: "Full-Stack Developer specializing in React, Next.js, and AI/ML.",
    images: ["https://drive.google.com/uc?id=1foz3FYIN-6ZhIpzE8goPyBtyQ-FDAtFT"],
    creator: "@Ritiklodhi",
  },
  alternates: {
    canonical: "https://oeeez.online",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Social Links for verification and SEO */}
        <link rel="me" href="https://github.com/Ritik16g" />
        <link rel="me" href="https://www.linkedin.com/in/Ritik-lodhi-5575b8314" />
      </head>
      <body className="font-inter antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PortfolioLayout>{children}</PortfolioLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}