"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GetIcon } from "@/lib/icons"
import { getTechnologiesByCategory } from "@/lib/database/queries"
import type { TechnologiesByCategory } from "@/lib/database/queries"
import { AlertCircle, RefreshCw } from "lucide-react"

export function ToolboxGrid() {
  const [technologiesData, setTechnologiesData] = useState<TechnologiesByCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTechnologies = async () => {
    try {
      setError(null)
      const data = await getTechnologiesByCategory()
      setTechnologiesData(data)
    } catch (error) {
      console.error("Error fetching technologies:", error)
      setError("Failed to load technologies")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTechnologies()
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
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
            fetchTechnologies()
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
      <div className="space-y-8">
        {[...Array(4)].map((_, categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-48" />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(6)].map((_, techIndex) => (
                <Card key={techIndex} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted animate-pulse rounded" />
                    <div className="h-5 bg-muted animate-pulse rounded flex-1" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (technologiesData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No technologies found.</p>
        <p className="text-sm text-muted-foreground">Technologies will appear here once added to the database.</p>
      </div>
    )
  }

  return (
    <motion.div className="space-y-12" variants={containerVariants} initial="hidden" animate="visible">
      {technologiesData.map((categoryData) => (
        <motion.div key={categoryData.category} variants={categoryVariants}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{categoryData.category}</h2>
            <Badge variant="secondary" className="text-sm">
              {categoryData.technologies.length} {categoryData.technologies.length === 1 ? "tool" : "tools"}
            </Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoryData.technologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="p-4 h-full transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/20 hover:border-primary/50 cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <GetIcon name={tech.icon_name} className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tech.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
