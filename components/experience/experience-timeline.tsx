"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GetIcon } from "@/lib/icons"
import { getExperiences } from "@/lib/database/queries"
import type { ExperienceWithTechnologies } from "@/lib/database/queries"
import { AlertCircle, RefreshCw } from "lucide-react"

export function ExperienceTimeline() {
  const [experiences, setExperiences] = useState<ExperienceWithTechnologies[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExperiences = async () => {
    try {
      setError(null)
      const data = await getExperiences()
      setExperiences(data)
    } catch (error) {
      console.error("Error fetching experiences:", error)
      setError("Failed to load experience data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
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

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button
          onClick={() => {
            setLoading(true)
            fetchExperiences()
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
      <div className="relative space-y-12 py-8">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 md:left-1/2 md:-translate-x-1/2" />
        {[...Array(3)].map((_, index) => (
          <div key={index} className="relative md:flex md:items-start">
            <div className="ml-12 w-full md:ml-0 md:pl-[calc(50%+2rem)]">
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted animate-pulse rounded-full" />
                    <div className="space-y-2">
                      <div className="h-6 bg-muted animate-pulse rounded w-48" />
                      <div className="h-4 bg-muted animate-pulse rounded w-32" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                  </div>
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (experiences.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No experience data found.</p>
        <p className="text-sm text-muted-foreground">
          Experience information will appear here once added to the database.
        </p>
      </div>
    )
  }

  return (
    <motion.div className="relative space-y-12 py-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* The vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 md:left-1/2 md:-translate-x-1/2" />

      {experiences.map((item, index) => (
        <motion.div key={item.id} variants={itemVariants} className="relative md:flex md:items-start">
          {/* Dot on the timeline and Icon */}
          <div
            className={`absolute left-6 top-2 h-4 w-4 -translate-x-[calc(50%-1px)] rounded-full border-2 border-background bg-primary 
                        md:left-1/2 md:-translate-x-1/2`}
          />
          <div
            className={`absolute left-6 top-10 -translate-x-[calc(50%-1px)] rounded-full bg-background p-1 shadow-md
                        md:left-1/2 md:-translate-x-1/2 md:top-2`}
          >
            <GetIcon name={item.role_icon_name} className="h-6 w-6 text-primary" />
          </div>

          {/* Card Content */}
          <div
            className={`ml-12 w-full md:ml-0 ${
              index % 2 === 0 ? "md:pl-[calc(50%+2rem)]" : "md:pr-[calc(50%+2rem)] md:text-right"
            }`}
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Card className="shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-700 hover:border-primary/50">
                <CardHeader className={`${index % 2 !== 0 && "md:text-right"}`}>
                  <div className={`flex items-center gap-3 ${index % 2 !== 0 && "md:flex-row-reverse"}`}>
                    <div className="relative">
                      <Image
                        src={item.logo_url || "/placeholder.svg?width=40&height=40&text=Logo"}
                        alt={`${item.company} logo`}
                        width={40}
                        height={40}
                        className="rounded-full border bg-muted shadow-sm"
                      />
                      {item.is_current && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground">{item.title}</CardTitle>
                      <CardDescription className="text-md flex items-center gap-2">
                        <span>{item.company}</span>
                        <span>&bull;</span>
                        <span>{item.duration}</span>
                        {item.is_current && (
                          <Badge variant="secondary" className="text-xs">
                            Current
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className={`${index % 2 !== 0 && "md:text-right"}`}>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  {item.technologies && item.technologies.length > 0 && (
                    <div className={`flex flex-wrap gap-2 ${index % 2 !== 0 && "md:justify-end"}`}>
                      {item.technologies.map((tech) => (
                        <Badge
                          key={tech.id}
                          variant="outline"
                          className="flex items-center gap-1 hover:bg-primary/10 transition-colors"
                        >
                          <GetIcon name={tech.icon_name} className="h-3 w-3" />
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
