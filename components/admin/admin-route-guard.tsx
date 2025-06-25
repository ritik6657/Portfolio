"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/lib/auth/admin-auth"

interface AdminRouteGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export function AdminRouteGuard({ children, redirectTo = "/admin" }: AdminRouteGuardProps) {
  const { isAuthenticated, loading } = useAdminAuth()
  const router = useRouter()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
      } else {
        setShouldRender(true)
      }
    }
  }, [isAuthenticated, loading, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!shouldRender) {
    return null
  }

  return <>{children}</>
}
