export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          title: string
          bio: string
          image_url: string | null
          email: string
          phone: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          bio: string
          image_url?: string | null
          email: string
          phone?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          bio?: string
          image_url?: string | null
          email?: string
          phone?: string | null
          location?: string | null
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          title: string
          company: string
          logo_url: string | null
          description: string
          duration: string
          role_icon_name: string
          start_date: string | null
          end_date: string | null
          is_current: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          logo_url?: string | null
          description: string
          duration: string
          role_icon_name?: string
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          logo_url?: string | null
          description?: string
          duration?: string
          role_icon_name?: string
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      technologies: {
        Row: {
          id: string
          name: string
          icon_name: string
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon_name: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon_name?: string
          category?: string | null
        }
      }
      experience_technologies: {
        Row: {
          id: string
          experience_id: string
          technology_id: string
          created_at: string
        }
        Insert: {
          id?: string
          experience_id: string
          technology_id: string
          created_at?: string
        }
        Update: {
          id?: string
          experience_id?: string
          technology_id?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string | null
          project_url: string | null
          github_url: string | null
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url?: string | null
          project_url?: string | null
          github_url?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string | null
          project_url?: string | null
          github_url?: string | null
          is_featured?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      project_technologies: {
        Row: {
          id: string
          project_id: string
          technology_id: string
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          technology_id: string
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          technology_id?: string
        }
      }
      fun_facts: {
        Row: {
          id: string
          category: string
          category_icon_name: string
          name: string
          icon_name: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          category_icon_name: string
          name: string
          icon_name: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          category_icon_name?: string
          name?: string
          icon_name?: string
          sort_order?: number
        }
      }
      education: {
        Row: {
          id: string
          degree: string
          institution: string
          description: string | null
          start_date: string | null
          end_date: string | null
          is_current: boolean
          icon_name: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          degree: string
          institution: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          icon_name?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          degree?: string
          institution?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          is_current?: boolean
          icon_name?: string
          sort_order?: number
          updated_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          name: string
          platform: string
          logo_url: string | null
          certificate_url: string | null
          issue_date: string | null
          expiry_date: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          platform: string
          logo_url?: string | null
          certificate_url?: string | null
          issue_date?: string | null
          expiry_date?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          platform?: string
          logo_url?: string | null
          certificate_url?: string | null
          issue_date?: string | null
          expiry_date?: string | null
          is_active?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          company: string | null
          avatar_url: string | null
          content: string
          rating: number | null
          is_approved: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          company?: string | null
          avatar_url?: string | null
          content: string
          rating?: number | null
          is_approved?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          company?: string | null
          avatar_url?: string | null
          content?: string
          rating?: number | null
          is_approved?: boolean
          sort_order?: number
          updated_at?: string
        }
      }
      connections: {
        Row: {
          id: string
          name: string
          email: string
          subject: string
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject: string
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string
          message?: string
          status?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          name: string
          email: string
          role: string | null
          company: string | null
          avatar_url: string | null
          content: string
          rating: number | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: string | null
          company?: string | null
          avatar_url?: string | null
          content: string
          rating?: number | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: string | null
          company?: string | null
          avatar_url?: string | null
          content?: string
          rating?: number | null
          status?: string
          updated_at?: string
        }
      }
      feedback: {
        Row: {
          id: string
          name: string | null
          email: string | null
          type: string
          subject: string | null
          content: string
          priority: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          type?: string
          subject?: string | null
          content: string
          priority?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          type?: string
          subject?: string | null
          content?: string
          priority?: string
          status?: string
          updated_at?: string
        }
      }
      portfolio_stats: {
        Row: {
          id: string
          metric_name: string
          metric_value: number
          last_updated: string
        }
        Insert: {
          id?: string
          metric_name: string
          metric_value?: number
          last_updated?: string
        }
        Update: {
          id?: string
          metric_name?: string
          metric_value?: number
          last_updated?: string
        }
      }
    }
  }
}
