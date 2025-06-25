"use client"

import type React from "react"
import { motion } from "framer-motion"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export function SectionHeading({ title, subtitle, className = "", children }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-xl">{subtitle}</p>}
      {children}
    </motion.div>
  )
}
