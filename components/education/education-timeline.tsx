"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GetIcon } from "@/lib/icons"
import { getEducation } from "@/lib/database/queries"
import type { Database } from "@/lib/supabase/types"
import { AlertCircle, RefreshCw } from "lucide-react"

type Education = Database["public"]["Tables"]["education"]["Row"]

export function EducationTimeline() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEducation = async () => {
    try {
      setError(null)
      const data = await getEducation()
      setEducation(data)
    } catch (error) {
      console.error("Error fetching education:", error)
      setError("Failed to load education data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEducation()
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    return new Date(dateString).getFullYear().toString()
  }

  const getDuration = (startDate: string | null, endDate: string | null, isCurrent: boolean) => {
    const start = startDate ? formatDate(startDate) : ""
    const end = isCurrent ? "Present" : endDate ? formatDate(endDate) : ""

    if (start && end) {
      return `${start} - ${end}`
    } else if (start) {
      return start
    } else if (end) {
      return end
    }
    return ""
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button
          onClick={() => {
            setLoading(true)
            fetchEducation()
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
      <div className="relative space-y-8 py-8">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />
        {[...Array(2)].map((_, index) => (
          <div key={index} className="relative pl-16">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="space-y-2">
                  <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    )
  }

  if (education.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No education data found.</p>
        <p className="text-sm text-muted-foreground">
          Education information will appear here once added to the database.
        </p>
      </div>
    )
  }

  return (
    <motion.div className="relative space-y-8 py-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* The vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30" />

      {education.map((item, index) => (
        <motion.div key={item.id} variants={itemVariants} className="relative pl-16">
          {/* Dot on the timeline and Icon */}
          <div className="absolute left-8 top-2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary" />
          <div className="absolute left-8 top-10 -translate-x-1/2 rounded-full bg-background p-1 shadow-md">
            <GetIcon name={item.icon_name || "GraduationCap"} className="h-6 w-6 text-primary" />
          </div>

          {/* Card Content */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Card className="shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-700 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-foreground">{item.degree}</CardTitle>
                    <CardDescription className="text-md text-muted-foreground mt-1">{item.institution}</CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {getDuration(item.start_date, item.end_date, item.is_current)}
                      </Badge>
                      {item.is_current && (
                        <Badge variant="default" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              {item.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
