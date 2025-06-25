"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPortfolioStats } from "@/lib/database/queries"
import { FolderOpen, Star, Users, Code, MessageSquare, TrendingUp } from "lucide-react"

interface StatCard {
  title: string
  value: number
  description: string
  icon: React.ElementType
  color: string
}

export function StatsOverview() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const data = await getPortfolioStats()
      setStats(data)
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards: StatCard[] = [
    {
      title: "Total Projects",
      value: stats.total_projects || 0,
      description: "Completed projects",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Total Reviews",
      value: stats.total_reviews || 0,
      description: "Client testimonials",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Portfolio Visitors",
      value: stats.total_visitors || 0,
      description: "Unique visitors",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Technologies",
      value: stats.total_technologies || 0,
      description: "Tools & frameworks",
      icon: Code,
      color: "text-purple-600",
    },
    {
      title: "Connections",
      value: stats.total_connections || 0,
      description: "Contact form submissions",
      icon: MessageSquare,
      color: "text-orange-600",
    },
    {
      title: "Growth Rate",
      value: 15, // This could be calculated based on historical data
      description: "Monthly increase %",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const CounterAnimation = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)

        setCount(Math.floor(progress * value))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }, [value, duration])

    return <span>{count}</span>
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded w-24" />
                <div className="h-8 bg-muted animate-pulse rounded w-16" />
              </div>
              <div className="h-8 w-8 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted animate-pulse rounded w-32" />
            </CardContent>
          </Card>
        ))}
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
      {statCards.map((stat, index) => (
        <motion.div key={stat.title} variants={cardVariants}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Card className="shadow-lg transition-all duration-300 hover:shadow-xl dark:hover:shadow-primary/20 hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  <CounterAnimation value={stat.value} />
                  {stat.title === "Growth Rate" && "%"}
                </div>
                <CardDescription className="text-xs text-muted-foreground mt-1">{stat.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
