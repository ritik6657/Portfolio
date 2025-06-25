"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { LoadingCard } from "@/components/ui/loading-card"
import { ErrorMessage } from "@/components/ui/error-message"
import { CardGrid } from "@/components/ui/card-grid"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  slug: string
  published_at: string
  reading_time: number
  tags: string[]
  is_published: boolean
}

export function BlogGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setError(null)
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error: any) {
      console.error("Error fetching blog posts:", error)
      setError("Failed to load blog posts")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (error) {
    return <ErrorMessage title="Failed to load blog posts" message={error} onRetry={fetchPosts} />
  }

  if (loading) {
    return (
      <CardGrid columns={{ sm: 1, md: 2, lg: 3 }}>
        {[...Array(6)].map((_, index) => (
          <LoadingCard key={index} lines={3} />
        ))}
      </CardGrid>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No blog posts found.</p>
        <p className="text-sm text-muted-foreground">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }}>
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`}>
            <Card className="h-full transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/20 hover:border-primary/50 group cursor-pointer">
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.reading_time} min read</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-primary group-hover:text-primary/80 transition-colors">
                  <span>Read more</span>
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </CardGrid>
  )
}
