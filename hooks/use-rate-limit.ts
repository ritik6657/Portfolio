"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { getUserIdentifier } from "@/lib/rate-limit/rate-limiter"

interface RateLimitOptions {
  maxRequests: number
  windowMs: number
  action: string
}

export function useRateLimit({ maxRequests, windowMs, action }: RateLimitOptions) {
  const [isLimited, setIsLimited] = useState(false)
  const { toast } = useToast()

  const checkRateLimit = useCallback((): boolean => {
    const identifier = getUserIdentifier()
    const key = `${identifier}:${action}`

    // Get current count from localStorage
    const stored = localStorage.getItem(`rate_limit_${key}`)
    const now = Date.now()

    let data = stored ? JSON.parse(stored) : { count: 0, resetTime: now + windowMs }

    // Reset if window has passed
    if (now > data.resetTime) {
      data = { count: 0, resetTime: now + windowMs }
    }

    // Check if limit exceeded
    if (data.count >= maxRequests) {
      const remainingTime = Math.ceil((data.resetTime - now) / 1000)
      setIsLimited(true)

      toast({
        title: "Rate limit exceeded",
        description: `Please wait ${remainingTime} seconds before trying again.`,
        variant: "destructive",
      })

      return false
    }

    // Increment count
    data.count++
    localStorage.setItem(`rate_limit_${key}`, JSON.stringify(data))
    setIsLimited(false)

    return true
  }, [maxRequests, windowMs, action, toast])

  return { checkRateLimit, isLimited }
}
