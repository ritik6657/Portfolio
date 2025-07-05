"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  return ctx
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true) // Prevent flash of unauthenticated UI
  const [error, setError] = useState<string | null>(null)

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/admin/verify", {
        method: "GET",
        credentials: "include"
      })

      if (response.ok) {
        const data = await response.json()
        setIsAuthenticated(Boolean(data.authenticated))
      } else {
        setIsAuthenticated(false)
      }
    } catch (e) {
      console.error("Auth check failed:", e)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (password: string): Promise<boolean> => {
    try {
      setError(null)
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password })
      })

      let data: any = null

      try {
        data = await response.json()
      } catch (parseError) {
        // Fallback if response is not JSON
        const raw = await response.text()
        console.error("Failed to parse JSON response:", parseError, "Raw response:", raw)
        setError("Unexpected server response")
        return false
      }

      if (response.ok && data?.success) {
        setIsAuthenticated(true)
        return true
      } else {
        setError(data?.error || "Authentication failed")
        return false
      }
    } catch (e) {
      console.error("Login error:", e)
      setError("Network error occurred")
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include"
      })
    } catch (e) {
      console.error("Logout error:", e)
    } finally {
      setIsAuthenticated(false)
    }
  }

  // Auto-check auth status every 5 minutes when authenticated
  useEffect(() => {
    if (!isAuthenticated) return

    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [isAuthenticated])

  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, error }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}