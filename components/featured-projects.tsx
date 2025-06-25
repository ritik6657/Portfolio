"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { useProjects } from "@/hooks/use-portfolio-data"
import { SectionHeading } from "@/components/ui/section-heading"
import { CardGrid } from "@/components/ui/card-grid"
import { LoadingCard } from "@/components/ui/loading-card"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { ErrorMessage } from "@/components/ui/error-message"

export function FeaturedProjects() {
  const { data: projects, loading, error, refetch } = useProjects(true)

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 50,
      },
    }),
  }

  return (
    <ErrorBoundary>
      <section className="py-12 md:py-24 lg:py-32 bg-muted dark:bg-background">
        <div className="container px-4 md:px-6">
          <SectionHeading title="Featured Projects" subtitle="Here are some of the projects I'm proud of." />

          {error ? (
            <ErrorMessage title="Failed to load projects" message={error} onRetry={refetch} />
          ) : loading ? (
            <CardGrid columns={{ sm: 1, md: 2, lg: 3 }}>
              {[...Array(3)].map((_, index) => (
                <LoadingCard key={index} showImage lines={2} />
              ))}
            </CardGrid>
          ) : projects.length === 0 ? (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No featured projects found.</p>
              <p className="text-sm text-muted-foreground">
                Featured projects will appear here once added to the database.
              </p>
            </div>
          ) : (
            <CardGrid columns={{ sm: 1, md: 2, lg: 3 }}>
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/20 group">
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden">
                          <Image
                            src={project.image_url || "/placeholder.svg?width=400&height=300&text=Project"}
                            alt={`${project.title} preview`}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 flex-grow">
                        <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {project.description}
                        </CardDescription>
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech.id} variant="outline" className="text-xs">
                                {tech.name}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{project.technologies.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <div className="flex gap-2 w-full">
                          {project.project_url && (
                            <Button asChild variant="outline" size="sm" className="flex-1 group/btn">
                              <Link href={project.project_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                Live Demo
                              </Link>
                            </Button>
                          )}
                          {project.github_url && (
                            <Button asChild variant="outline" size="sm" className="flex-1 group/btn">
                              <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                Code
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </CardGrid>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  )
}
