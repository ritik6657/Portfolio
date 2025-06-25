"use client"

import { motion } from "framer-motion"
import { Code, Database, Cloud, Palette, Smartphone, Brain } from "lucide-react" // Example icons

const technologies = [
  { name: "React", icon: <Code className="h-10 w-10 text-blue-500" />, category: "Frontend" },
  { name: "Next.js", icon: <Code className="h-10 w-10 text-black dark:text-white" />, category: "Frontend" },
  { name: "TypeScript", icon: <Code className="h-10 w-10 text-blue-600" />, category: "Language" },
  { name: "Node.js", icon: <Code className="h-10 w-10 text-green-500" />, category: "Backend" },
  { name: "Supabase", icon: <Database className="h-10 w-10 text-green-400" />, category: "Backend" },
  { name: "PostgreSQL", icon: <Database className="h-10 w-10 text-blue-700" />, category: "Database" },
  { name: "Tailwind CSS", icon: <Palette className="h-10 w-10 text-teal-500" />, category: "Styling" },
  { name: "Framer Motion", icon: <Palette className="h-10 w-10 text-purple-500" />, category: "Animation" },
  { name: "Vercel", icon: <Cloud className="h-10 w-10 text-black dark:text-white" />, category: "Deployment" },
  { name: "Figma", icon: <Palette className="h-10 w-10 text-pink-500" />, category: "Design" },
  { name: "React Native", icon: <Smartphone className="h-10 w-10 text-blue-400" />, category: "Mobile" },
  { name: "AI/ML", icon: <Brain className="h-10 w-10 text-orange-500" />, category: "AI" },
]

export function TechStack() {
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 150,
        damping: 10,
      },
    }),
  }

  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Tech Stack</h2>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Technologies I love to work with and use in my projects.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              custom={index}
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-2">{tech.icon}</div>
              <p className="text-sm font-medium text-card-foreground">{tech.name}</p>
              <p className="text-xs text-muted-foreground">{tech.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
