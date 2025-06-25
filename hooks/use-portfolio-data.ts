"use client"

import { useState, useEffect, useCallback } from "react"
import type { Database } from "@/lib/supabase/types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Experience = Database["public"]["Tables"]["experiences"]["Row"]
type Project = Database["public"]["Tables"]["projects"]["Row"]
type Technology = Database["public"]["Tables"]["technologies"]["Row"]

interface UseDataResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

interface UseDataArrayResult<T> {
  data: T[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProfile(): UseDataResult<Profile> {
  const [data, setData] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const { getProfile } = await import("@/lib/database/queries")
      const result = await getProfile()
      setData(result)
    } catch (err) {
      console.error("Error fetching profile:", err)
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useProjects(featured = false): UseDataArrayResult<any> {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const { getFeaturedProjects, getAllProjects } = await import("@/lib/database/queries")
      const result = featured ? await getFeaturedProjects() : await getAllProjects()
      setData(result)
    } catch (err) {
      console.error("Error fetching projects:", err)
      setError("Failed to load projects")
    } finally {
      setLoading(false)
    }
  }, [featured])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useExperiences(): UseDataArrayResult<any> {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const { getExperiences } = await import("@/lib/database/queries")
      const result = await getExperiences()
      setData(result)
    } catch (err) {
      console.error("Error fetching experiences:", err)
      setError("Failed to load experiences")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

export function useTechnologies(): UseDataArrayResult<any> {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const { getTechnologiesByCategory } = await import("@/lib/database/queries")
      const result = await getTechnologiesByCategory()
      setData(result)
    } catch (err) {
      console.error("Error fetching technologies:", err)
      setError("Failed to load technologies")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
