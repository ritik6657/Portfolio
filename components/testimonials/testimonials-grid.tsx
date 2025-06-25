"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, AlertCircle, RefreshCw } from "lucide-react"
import { getApprovedTestimonials } from "@/lib/database/queries"
import type { Database } from "@/lib/supabase/types"

type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]

export function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTestimonials = async () => {
    try {
      setError(null)
      const data = await getApprovedTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      setError("Failed to load testimonials")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
    ))
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button
          onClick={() => {
            setLoading(true)
            fetchTestimonials()
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
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted animate-pulse rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </div>
              </div>
              <div className="flex space-x-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-muted animate-pulse rounded" />
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No testimonials found.</p>
        <p className="text-sm text-muted-foreground">
          Testimonials will appear here once approved and added to the database.
        </p>
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
      {testimonials.map((testimonial, index) => (
        <motion.div key={testimonial.id} variants={cardVariants}>
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full"
          >
            <Card className="h-full transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/50 group relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-8 w-8 text-primary" />
              </div>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial.avatar_url || "/placeholder.svg?width=48&height=48&text=Avatar"}
                    alt={`${testimonial.name} avatar`}
                    width={48}
                    height={48}
                    className="rounded-full border bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>
                {testimonial.rating && <div className="flex space-x-1 mt-2">{renderStars(testimonial.rating)}</div>}
              </CardHeader>
              <CardContent>
                <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
