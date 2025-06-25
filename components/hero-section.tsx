"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TypingEffect } from "./typing-effect"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const subtexts = ["React Developer", "Supabase Expert", "UX-focused Engineer", "Next.js Enthusiast"]

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <motion.section
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4 py-12 md:py-24 lg:py-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-500 to-secondary"
        variants={itemVariants}
      >
        Hi, I&apos;m Harshit.
      </motion.h1>
      <motion.p
        className="mt-4 max-w-[700px] text-lg text-muted-foreground sm:text-xl md:text-2xl"
        variants={itemVariants}
      >
        I build smart and scalable apps.
      </motion.p>
      <motion.div className="mt-2 text-lg text-muted-foreground sm:text-xl md:text-2xl" variants={itemVariants}>
        I&apos;m a <TypingEffect texts={subtexts} />
      </motion.div>
      <motion.div className="mt-8" variants={itemVariants}>
        <Button asChild size="lg" className="group">
          <Link href="/projects">
            View My Work
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </motion.section>
  )
}
