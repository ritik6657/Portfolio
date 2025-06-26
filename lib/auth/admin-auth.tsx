"use client"

import type React from "react"
import { useState, useEffect, createContext, useContext } from "react"

interface AdminAuthContextType {
  isAuthenticated: boolean
  login: (password: string) => boolean
  logout: () => void
  loading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// ———————————————————————————————————————————
// Production settings
// ———————————————————————————————————————————
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // ✔ secure prod password
const SESSION_DURATION = 60 * 60 * 1000 // 1 hour in ms
const AUTH_KEY = "portfolio_admin_auth"

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  return ctx
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // ── Load session on mount ─────────────────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY)
    if (raw) {
      try {
        const { authenticated, timestamp } = JSON.parse(raw)
        if (authenticated && Date.now() - timestamp < SESSION_DURATION) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem(AUTH_KEY)
        }
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setLoading(false)
  }, [])

  // ── Helpers ───────────────────────────────────────────────────────────
  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem(AUTH_KEY, JSON.stringify({ authenticated: true, timestamp: Date.now() }))
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_KEY)
  }

  // ── Auto-logout when session expires ─────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return
    const interval = setInterval(() => {
      const raw = localStorage.getItem(AUTH_KEY)
      if (!raw) return logout()

      try {
        const { timestamp } = JSON.parse(raw)
        if (Date.now() - timestamp >= SESSION_DURATION) logout()
      } catch {
        logout()
      }
    }, 60_000) // check every minute
    return () => clearInterval(interval)
  }, [isAuthenticated])

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  )
}
