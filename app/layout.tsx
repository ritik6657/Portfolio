import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PortfolioLayout from "@/components/portfolio-layout"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"), // Update with actual domain
  title: {
    default: "Harshit Lodhi - Full-Stack Developer & AI Enthusiast",
    template: "%s | Harshit Lodhi",
  },
  description:
    "Full-Stack Developer specializing in React, Next.js, and AI/ML. Building smart and scalable applications with modern technologies.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "AI", "Machine Learning", "Web Development", "Harshit Lodhi"],
  authors: [{ name: "Harshit Lodhi", url: "https://your-domain.com" }],
  creator: "Harshit Lodhi",
  publisher: "Harshit Lodhi",
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
    url: "https://your-domain.com",
    siteName: "Harshit Lodhi Portfolio",
    title: "Harshit Lodhi - Full-Stack Developer & AI Enthusiast",
    description:
      "Full-Stack Developer specializing in React, Next.js, and AI/ML. Building smart and scalable applications.",
    images: [
      {
        url: "/og-image.jpg", // Add this image to public folder
        width: 1200,
        height: 630,
        alt: "Harshit Lodhi - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshit Lodhi - Full-Stack Developer & AI Enthusiast",
    description: "Full-Stack Developer specializing in React, Next.js, and AI/ML.",
    images: ["/og-image.jpg"],
    creator: "@harshitlodhi", // Update with actual Twitter handle
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PortfolioLayout>{children}</PortfolioLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
