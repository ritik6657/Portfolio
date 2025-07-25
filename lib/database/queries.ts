import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Experience = Database["public"]["Tables"]["experiences"]["Row"]
type Technology = Database["public"]["Tables"]["technologies"]["Row"]
type Project = Database["public"]["Tables"]["projects"]["Row"]
type FunFact = Database["public"]["Tables"]["fun_facts"]["Row"]
type Education = Database["public"]["Tables"]["education"]["Row"]
type Certification = Database["public"]["Tables"]["certifications"]["Row"]
type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]
type Connection = Database["public"]["Tables"]["connections"]["Row"]
type Review = Database["public"]["Tables"]["reviews"]["Row"]
type Feedback = Database["public"]["Tables"]["feedback"]["Row"]
type PortfolioStat = Database["public"]["Tables"]["portfolio_stats"]["Row"]

export interface ExperienceWithTechnologies extends Experience {
  technologies: Technology[]
}

export interface ProjectWithTechnologies extends Project {
  technologies: Technology[]
}

export interface FunFactsByCategory {
  category: string
  category_icon_name: string
  items: FunFact[]
}

export interface TechnologiesByCategory {
  category: string
  technologies: Technology[]
}

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

async function withRetry<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
      return withRetry(operation, retries - 1)
    }
    throw error
  }
}

// Profile queries
export async function getProfile(): Promise<Profile | null> {
  return withRetry(async () => {
    const { data, error } = await supabase.from("profiles").select("*").single()

    if (error) {
      if (error.code === "PGRST116") {
        // No rows returned
        return null
      }
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
  })
}

// Experience queries
export async function getExperiences(): Promise<ExperienceWithTechnologies[]> {
  return withRetry(async () => {
    const { data: experiences, error: experiencesError } = await supabase
      .from("experiences")
      .select("*")
      .order("sort_order", { ascending: true })

    if (experiencesError) {
      throw new Error(`Error fetching experiences: ${experiencesError.message}`)
    }

    // Fetch technologies for each experience
    const experiencesWithTech = await Promise.all(
      experiences.map(async (experience) => {
        const { data: techData, error: techError } = await supabase
          .from("experience_technologies")
          .select(`
            technologies (
              id,
              name,
              icon_name,
              category,
              created_at
            )
          `)
          .eq("experience_id", experience.id)

        if (techError) {
          console.error("Error fetching technologies for experience:", techError)
          return { ...experience, technologies: [] }
        }

        const technologies = techData.map((item) => item.technologies).filter(Boolean) as Technology[]

        return { ...experience, technologies }
      }),
    )

    return experiencesWithTech
  })
}

// Project queries - FIXED to use correct column names
export async function getFeaturedProjects(): Promise<ProjectWithTechnologies[]> {
  return withRetry(async () => {
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })

    if (projectsError) {
      throw new Error(`Error fetching featured projects: ${projectsError.message}`)
    }

    // Fetch technologies for each project
    const projectsWithTech = await Promise.all(
      projects.map(async (project) => {
        const { data: techData, error: techError } = await supabase
          .from("project_technologies")
          .select(`
            technologies (
              id,
              name,
              icon_name,
              category,
              created_at
            )
          `)
          .eq("project_id", project.id)

        if (techError) {
          console.error("Error fetching technologies for project:", techError)
          return { ...project, technologies: [] }
        }

        const technologies = techData.map((item) => item.technologies).filter(Boolean) as Technology[]

        return { ...project, technologies }
      }),
    )

    return projectsWithTech
  })
}

export async function getAllProjects(): Promise<ProjectWithTechnologies[]> {
  return withRetry(async () => {
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })

    if (projectsError) {
      throw new Error(`Error fetching all projects: ${projectsError.message}`)
    }

    // Fetch technologies for each project
    const projectsWithTech = await Promise.all(
      projects.map(async (project) => {
        const { data: techData, error: techError } = await supabase
          .from("project_technologies")
          .select(`
            technologies (
              id,
              name,
              icon_name,
              category,
              created_at
            )
          `)
          .eq("project_id", project.id)

        if (techError) {
          console.error("Error fetching technologies for project:", techError)
          return { ...project, technologies: [] }
        }

        const technologies = techData.map((item) => item.technologies).filter(Boolean) as Technology[]

        return { ...project, technologies }
      }),
    )

    return projectsWithTech
  })
}

// Fun facts queries
export async function getFunFactsByCategory(): Promise<FunFactsByCategory[]> {
  return withRetry(async () => {
    const { data: funFacts, error } = await supabase
      .from("fun_facts")
      .select("*")
      .order("category", { ascending: true })
      .order("sort_order", { ascending: true })

    if (error) {
      throw new Error(`Error fetching fun facts: ${error.message}`)
    }

    // Group by category
    const groupedFacts = funFacts.reduce((acc, fact) => {
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
    }, [] as FunFactsByCategory[])

    return groupedFacts
  })
}

// Technology queries
export async function getAllTechnologies(): Promise<Technology[]> {
  return withRetry(async () => {
    const { data, error } = await supabase.from("technologies").select("*").order("name", { ascending: true })

    if (error) {
      throw new Error(`Error fetching technologies: ${error.message}`)
    }

    return data
  })
}

export async function getTechnologiesByCategory(): Promise<TechnologiesByCategory[]> {
  return withRetry(async () => {
    const { data: technologies, error } = await supabase
      .from("technologies")
      .select("*")
      .order("category", { ascending: true })
      .order("name", { ascending: true })

    if (error) {
      throw new Error(`Error fetching technologies: ${error.message}`)
    }

    // Group by category
    const groupedTech = technologies.reduce((acc, tech) => {
      const category = tech.category || "Other"
      const existingCategory = acc.find((cat) => cat.category === category)

      if (existingCategory) {
        existingCategory.technologies.push(tech)
      } else {
        acc.push({
          category,
          technologies: [tech],
        })
      }

      return acc
    }, [] as TechnologiesByCategory[])

    return groupedTech
  })
}

// Education queries
export async function getEducation(): Promise<Education[]> {
  return withRetry(async () => {
    const { data, error } = await supabase.from("education").select("*").order("sort_order", { ascending: true })

    if (error) {
      throw new Error(`Error fetching education: ${error.message}`)
    }

    return data
  })
}

// Certification queries
export async function getCertifications(): Promise<Certification[]> {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })

    if (error) {
      throw new Error(`Error fetching certifications: ${error.message}`)
    }

    return data
  })
}

// Testimonial queries
export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("sort_order", { ascending: true })

    if (error) {
      throw new Error(`Error fetching testimonials: ${error.message}`)
    }

    return data
  })
}

// Contact form submission
export async function submitContactForm(formData: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  return withRetry(async () => {
    try {
      const { error } = await supabase.from("connections").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          status: "unread",
        },
      ])

      if (error) {
        throw new Error(`Error submitting contact form: ${error.message}`)
      }

      // Update connections count
      await updatePortfolioStat("total_connections", 1)

      return { success: true }
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      return { success: false, error: "Failed to submit form" }
    }
  })
}

// Admin queries
export async function getConnections(): Promise<Connection[]> {
  return withRetry(async () => {
    const { data, error } = await supabase.from("connections").select("*").order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Error fetching connections: ${error.message}`)
    }

    return data
  })
}

export async function getPendingReviews(): Promise<Review[]> {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Error fetching pending reviews: ${error.message}`)
    }

    return data
  })
}

export async function getFeedback(): Promise<Feedback[]> {
  return withRetry(async () => {
    const { data, error } = await supabase.from("feedback").select("*").order("created_at", { ascending: false })

    if (error) {
      throw new Error(`Error fetching feedback: ${error.message}`)
    }

    return data
  })
}

export async function updateConnectionStatus(id: string, status: string): Promise<boolean> {
  return withRetry(async () => {
    const { error } = await supabase
      .from("connections")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) {
      console.error("Error updating connection status:", error)
      return false
    }

    return true
  })
}

export async function approveReview(id: string): Promise<boolean> {
  return withRetry(async () => {
    const { error } = await supabase.from("reviews").update({ status: "approved" }).eq("id", id)

    if (error) {
      console.error("Error approving review:", error)
      return false
    }

    return true
  })
}

export async function deleteReview(id: string): Promise<boolean> {
  return withRetry(async () => {
    const { error } = await supabase.from("reviews").delete().eq("id", id)

    if (error) {
      console.error("Error deleting review:", error)
      return false
    }

    return true
  })
}

// Stats queries
export async function getPortfolioStats(): Promise<Record<string, number>> {
  return withRetry(async () => {
    const { data, error } = await supabase.from("portfolio_stats").select("metric_name, metric_value")

    if (error) {
      throw new Error(`Error fetching portfolio stats: ${error.message}`)
    }

    return data.reduce(
      (acc, stat) => {
        acc[stat.metric_name] = stat.metric_value
        return acc
      },
      {} as Record<string, number>,
    )
  })
}

export async function updatePortfolioStat(metricName: string, increment: number): Promise<void> {
  return withRetry(async () => {
    const { error } = await supabase.rpc("increment_stat", {
      metric_name: metricName,
      increment_by: increment,
    })

    if (error) {
      console.error("Error updating portfolio stat:", error)
    }
  })
}
