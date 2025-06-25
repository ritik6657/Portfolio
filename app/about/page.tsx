"use client"

import { ProfileCard } from "@/components/about/profile-card"
import { FunFactsSection } from "@/components/about/fun-facts-section"
import { TimelineSection } from "@/components/about/timeline-section"
import { useProfile, useTimelineItems, useFunFactsCategories } from "@/hooks/use-about-data"

// Note: Since this is now a client component, we'll need to handle metadata differently
// You might want to move this to a server component wrapper or use next/head

export default function AboutPage() {
  const { profile, loading: profileLoading, error: profileError, refetch: refetchProfile } = useProfile()
  const {
    timelineCategories,
    loading: timelineLoading,
    error: timelineError,
    refetch: refetchTimeline,
  } = useTimelineItems()
  const {
    funFactsCategories,
    loading: funFactsLoading,
    error: funFactsError,
    refetch: refetchFunFacts,
  } = useFunFactsCategories()

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary mb-4">About Me</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get to know more about my background, interests, and the technologies I love working with.
        </p>
      </div>

      <div className="space-y-16">
        <ProfileCard profile={profile} loading={profileLoading} error={profileError} onRetry={refetchProfile} />

        <TimelineSection
          timelineCategories={timelineCategories}
          loading={timelineLoading}
          error={timelineError}
          onRetry={refetchTimeline}
        />

        <FunFactsSection
          funFactsCategories={funFactsCategories}
          loading={funFactsLoading}
          error={funFactsError}
          onRetry={refetchFunFacts}
        />
      </div>
    </div>
  )
}
