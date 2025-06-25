"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, AlertCircle, RefreshCw, Calendar } from "lucide-react"
import { getCertifications } from "@/lib/database/queries"
import type { Database } from "@/lib/supabase/types"

type Certification = Database["public"]["Tables"]["certifications"]["Row"]

export function CertificationsGrid() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCertifications = async () => {
    try {
      setError(null)
      const data = await getCertifications()
      setCertifications(data)
    } catch (error) {
      console.error("Error fetching certifications:", error)
      setError("Failed to load certifications")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCertifications()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button
          onClick={() => {
            setLoading(true)
            fetchCertifications()
          }}
          variant="outline"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted animate-pulse rounded" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full h-10 bg-muted animate-pulse rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (certifications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No certifications found.</p>
        <p className="text-sm text-muted-foreground">Certifications will appear here once added to the database.</p>
      </div>
    )
  }

  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {certifications.map((cert, index) => (
        <motion.div key={cert.id} variants={cardVariants}>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full"
          >
            <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/50 group">
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Image
                      src={cert.logo_url || "/placeholder.svg?width=48&height=48&text=Cert"}
                      alt={`${cert.platform} logo`}
                      width={48}
                      height={48}
                      className="rounded-lg border bg-muted"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {cert.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{cert.platform}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  {cert.issue_date && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Issued: {formatDate(cert.issue_date)}</span>
                    </div>
                  )}
                  {cert.expiry_date && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Expires: {formatDate(cert.expiry_date)}</span>
                      </div>
                      {isExpired(cert.expiry_date) && (
                        <Badge variant="destructive" className="text-xs">
                          Expired
                        </Badge>
                      )}
                    </div>
                  )}
                  {!cert.expiry_date && (
                    <Badge variant="secondary" className="text-xs">
                      No Expiration
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {cert.certificate_url ? (
                  <Button asChild className="w-full group/btn">
                    <Link href={cert.certificate_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      View Certificate
                    </Link>
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    Certificate Unavailable
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
