"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAdminAuth } from "@/lib/auth/admin-auth"
import { Lock, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react"

export function AdminLogin() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const { login } = useAdminAuth()
  const { toast } = useToast()

  const MAX_ATTEMPTS = 3
  const isBlocked = attempts >= MAX_ATTEMPTS

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      toast({
        title: "Access blocked",
        description: "Too many failed attempts. Please refresh the page to try again.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate network delay for security
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const success = login(password)

    if (success) {
      toast({
        title: "Access granted",
        description: "Welcome to the admin dashboard.",
      })
      setAttempts(0)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      toast({
        title: "Access denied",
        description: `Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`,
        variant: "destructive",
      })
      setPassword("")

      if (newAttempts >= MAX_ATTEMPTS) {
        toast({
          title: "Account locked",
          description: "Too many failed attempts. Please refresh the page to try again.",
          variant: "destructive",
        })
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <CardDescription>Enter your admin credentials to access the portfolio dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {isBlocked && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm text-destructive">Account temporarily locked due to failed attempts</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    disabled={isBlocked}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isBlocked}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {attempts > 0 && !isBlocked && (
                <div className="text-sm text-muted-foreground text-center">
                  {MAX_ATTEMPTS - attempts} attempts remaining
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading || isBlocked}>
                {isLoading ? "Authenticating..." : isBlocked ? "Access Blocked" : "Access Dashboard"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Secure admin access with session management</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
