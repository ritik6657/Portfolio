"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, AlertCircle, RefreshCw } from "lucide-react"
import { getAllProjects } from "@/lib/database/queries"
import type { ProjectWithTechnologies } from "@/lib/database/queries"

export function ProjectsGrid() {
  const [projects, setProjects] = useState<ProjectWithTechnologies[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setError(null)
      const data = await getAllProjects()
      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
      setError("Failed to load projects")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
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

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button
          onClick={() => {
            setLoading(true)
            fetchProjects()
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
          <Card key={index} className="flex flex-col h-full overflow-hidden">
            <div className="w-full h-48 bg-muted animate-pulse" />
            <CardContent className="p-6 flex-grow">
              <div className="space-y-2 mb-3">
                <div className="h-6 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              </div>
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded-full" />
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <div className="w-full h-10 bg-muted animate-pulse rounded" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No projects found.</p>
        <p className="text-sm text-muted-foreground">Projects will appear here once added to the database.</p>
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
      {projects.map((project, index) => (
        <motion.div key={project.id} variants={cardVariants}>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full"
          >
            <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/50 group">
              <CardHeader className="p-0 relative overflow-hidden">
                <div className="relative">
                  <Image
                    src={project.image_url || "/placeholder.svg?width=400&height=300&text=Project"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {project.is_featured && (
                    <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground">Featured</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </CardDescription>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech.id}
                        variant="secondary"
                        className="text-xs hover:bg-primary/10 transition-colors"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex gap-2 w-full">
                  {project.project_url && (
                    <Button asChild variant="default" className="flex-1 group/btn">
                      <Link href={project.project_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button asChild variant="outline" className="flex-1 group/btn">
                      <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {!project.project_url && !project.github_url && (
                    <Button disabled className="flex-1">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
