"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetIcon } from "@/lib/icons"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-message"

interface FunFact {
  id: string
  name: string
  icon_name: string
}

interface FunFactCategory {
  category: string
  category_icon_name: string
  items: FunFact[]
}

interface FunFactsSectionProps {
  funFactsCategories: FunFactCategory[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function FunFactsSection({ funFactsCategories, loading, error, onRetry }: FunFactsSectionProps) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  }

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-muted dark:bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">More About Me</h2>
          <ErrorMessage title="Failed to load personal information" message={error} onRetry={onRetry} />
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-muted dark:bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">More About Me</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <LoadingSkeleton key={index} lines={4} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (funFactsCategories.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-muted dark:bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">More About Me</h2>
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No personal information found.</p>
            <p className="text-sm text-muted-foreground">
              Fun facts and personal details will appear here once added to the database.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <motion.section
      className="py-12 md:py-16 bg-muted dark:bg-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">More About Me</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {funFactsCategories.map((category) => (
            <motion.div key={category.category} variants={cardVariants}>
              <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <GetIcon name={category.category_icon_name} className="h-5 w-5 mr-2 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((fact) => (
                      <li key={fact.id} className="flex items-center text-sm text-foreground">
                        <GetIcon name={fact.icon_name} className="h-4 w-4 mr-3 text-primary/80" />
                        {fact.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
