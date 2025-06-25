"use client"

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map()
  private readonly maxRequests: number
  private readonly windowMs: number

  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests
    this.windowMs = windowMs
  }

  private getKey(identifier: string, action: string): string {
    return `${identifier}:${action}`
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.storage.entries()) {
      if (now > entry.resetTime) {
        this.storage.delete(key)
      }
    }
  }

  isAllowed(identifier: string, action = "default"): boolean {
    this.cleanup()

    const key = this.getKey(identifier, action)
    const now = Date.now()
    const entry = this.storage.get(key)

    if (!entry) {
      this.storage.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      })
      return true
    }

    if (now > entry.resetTime) {
      this.storage.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      })
      return true
    }

    if (entry.count >= this.maxRequests) {
      return false
    }

    entry.count++
    return true
  }

  getRemainingRequests(identifier: string, action = "default"): number {
    const key = this.getKey(identifier, action)
    const entry = this.storage.get(key)

    if (!entry || Date.now() > entry.resetTime) {
      return this.maxRequests
    }

    return Math.max(0, this.maxRequests - entry.count)
  }

  getResetTime(identifier: string, action = "default"): number {
    const key = this.getKey(identifier, action)
    const entry = this.storage.get(key)

    if (!entry || Date.now() > entry.resetTime) {
      return 0
    }

    return entry.resetTime
  }
}

// Create rate limiter instances for different actions
export const contactFormLimiter = new RateLimiter(3, 300000) // 3 requests per 5 minutes
export const feedbackLimiter = new RateLimiter(5, 300000) // 5 requests per 5 minutes
export const adminActionLimiter = new RateLimiter(20, 60000) // 20 requests per minute
export const generalLimiter = new RateLimiter(50, 60000) // 50 requests per minute

// Helper function to get user identifier (IP simulation)
export function getUserIdentifier(): string {
  // In a real app, you'd get the actual IP address from the request
  // For client-side, we'll use a combination of user agent and timestamp
  if (typeof window !== "undefined") {
    let identifier = localStorage.getItem("user_identifier")
    if (!identifier) {
      identifier = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("user_identifier", identifier)
    }
    return identifier
  }
  return "anonymous"
}
