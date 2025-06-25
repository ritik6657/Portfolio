"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useRateLimit } from "@/hooks/use-rate-limit"
import { submitContactForm } from "@/lib/database/queries"
import { Send, Loader2, Shield } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Rate limiting: 3 submissions per 5 minutes
  const { checkRateLimit, isLimited } = useRateLimit({
    maxRequests: 3,
    windowMs: 300000, // 5 minutes
    action: "contact_form",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check rate limit before proceeding
    if (!checkRateLimit()) {
      return
    }

    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast({
          title: "Failed to send message",
          description: result.error || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Send me a message</CardTitle>
          <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Rate limited: 3 messages per 5 minutes</span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div className="space-y-2" whileFocus="focus" variants={inputVariants}>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>
              <motion.div className="space-y-2" whileFocus="focus" variants={inputVariants}>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>
            </div>
            <motion.div className="space-y-2" whileFocus="focus" variants={inputVariants}>
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </motion.div>
            <motion.div className="space-y-2" whileFocus="focus" variants={inputVariants}>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or just say hello..."
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </motion.div>
            <Button
              type="submit"
              disabled={
                !formData.name.trim() ||
                !formData.email.trim() ||
                !formData.subject.trim() ||
                !formData.message.trim() ||
                isSubmitting ||
                isLimited
              }
              className="w-full group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
