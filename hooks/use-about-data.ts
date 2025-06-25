"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type TimelineItem = Database["public"]["Tables"]["timeline_items"]["Row"]
type FunFact = Database["public"]["Tables"]["fun_facts"]["Row"]

interface TimelineCategory {
  category: string
  items: TimelineItem[]
}

interface FunFactCategory {
  category: string
  category_icon_name: string
  items: FunFact[]
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = useCallback(async () => {
    try {
      setError(null)
      const { data, error } = await supabase.from("profiles").select("*").single()

      if (error) {
        if (error.code === "PGRST116") {
          setProfile(null)
        } else {
          throw error
        }
      } else {
        setProfile(data)
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err)
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  return { profile, loading, error, refetch: fetchProfile }
}

export function useTimelineItems() {
  const [timelineCategories, setTimelineCategories] = useState<TimelineCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTimeline = useCallback(async () => {
    try {
      setError(null)
      const { data, error } = await supabase.from("timeline_items").select("*").order("sort_order", { ascending: true })

      if (error) throw error

      // Group by category
      const grouped = data.reduce((acc, item) => {
        const existingCategory = acc.find((cat) => cat.category === item.category)
        if (existingCategory) {
          existingCategory.items.push(item)
        } else {
          acc.push({
            category: item.category,
            items: [item],
          })
        }
        return acc
      }, [] as TimelineCategory[])

      setTimelineCategories(grouped)
    } catch (err: any) {
      console.error("Error fetching timeline:", err)
      setError("Failed to load timeline")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTimeline()
  }, [fetchTimeline])

  return { timelineCategories, loading, error, refetch: fetchTimeline }
}

export function useFunFactsCategories() {
  const [funFactsCategories, setFunFactsCategories] = useState<FunFactCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFunFacts = useCallback(async () => {
    try {
      setError(null)
      const { data, error } = await supabase
        .from("fun_facts")
        .select("*")
        .order("category", { ascending: true })
        .order("sort_order", { ascending: true })

      if (error) throw error

      // Group by category
      const grouped = data.reduce((acc, fact) => {
        const existingCategory = acc.find((cat) => cat.category === fact.category)
        if (existingCategory) {
          existingCategory.items.push(fact)
        } else {
          acc.push({
            category: fact.category,
            category_icon_name: fact.category_icon_name,
            items: [fact],
          })
        }
        return acc
      }, [] as FunFactCategory[])

      setFunFactsCategories(grouped)
    } catch (err: any) {
      console.error("Error fetching fun facts:", err)
      setError("Failed to load fun facts")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFunFacts()
  }, [fetchFunFacts])

  return { funFactsCategories, loading, error, refetch: fetchFunFacts }
}
