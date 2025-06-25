"use client"

import type React from "react"
import { motion } from "framer-motion"

interface CardGridProps {
  children: React.ReactNode
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  className?: string
}

export function CardGrid({ children, columns = { sm: 1, md: 2, lg: 3 }, className = "" }: CardGridProps) {
  const gridClasses = [
    "grid gap-6",
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.div className={gridClasses} variants={containerVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  )
}
