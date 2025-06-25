"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GetIcon } from "@/lib/icons"
import { motion } from "framer-motion"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-message"

interface TimelineItem {
  id: string
  category: string
  title: string
  subtitle: string | null
  date_info: string | null
  description: string | null
  icon_name: string | null
}

interface TimelineCategory {
  category: string
  items: TimelineItem[]
}

interface TimelineSectionProps {
  timelineCategories: TimelineCategory[]
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function TimelineSection({ timelineCategories, loading, error, onRetry }: TimelineSectionProps) {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  }

  if (error) {
    return <ErrorMessage title="Failed to load timeline" message={error} onRetry={onRetry} />
  }

  if (loading) {
    return (
      <motion.section className="py-12 md:py-16" variants={sectionVariants} initial="hidden" animate="visible">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">My Journey</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <LoadingSkeleton key={index} lines={4} />
          ))}
        </div>
      </motion.section>
    )
  }

  if (timelineCategories.length === 0) {
    return (
      <motion.section
        className="py-12 md:py-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">My Journey</h2>
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No timeline data found.</p>
          <p className="text-sm text-muted-foreground">
            Timeline information will appear here once added to the database.
          </p>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="py-12 md:py-16"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-center mb-12">My Journey</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {timelineCategories.map((category) => (
          <motion.div key={category.category} variants={sectionVariants}>
            <Card className="h-full shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <GetIcon name={category.items[0]?.icon_name || "Lightbulb"} className="h-6 w-6 mr-3 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-primary/30"
                  >
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-background" />
                    <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
                    {item.subtitle && <p className="text-sm text-muted-foreground italic">{item.subtitle}</p>}
                    {item.date_info && <p className="text-xs text-primary font-medium my-1">{item.date_info}</p>}
                    {item.description && <p className="text-sm text-foreground/80">{item.description}</p>}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
