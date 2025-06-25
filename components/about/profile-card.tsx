"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GetIcon } from "@/lib/icons"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorMessage } from "@/components/ui/error-message"

interface Profile {
  id: string
  name: string
  title: string
  bio: string
  image_url: string | null
  email: string
  phone: string | null
  location: string | null
}

interface ProfileCardProps {
  profile: Profile | null
  loading: boolean
  error: string | null
  onRetry: () => void
}

export function ProfileCard({ profile, loading, error, onRetry }: ProfileCardProps) {
  if (error) {
    return <ErrorMessage title="Failed to load profile" message={error} onRetry={onRetry} />
  }

  if (loading) {
    return (
      <Card className="w-full overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            <div className="w-full h-64 md:h-full bg-muted animate-pulse" />
          </div>
          <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
            <LoadingSkeleton lines={6} showHeader={false} />
          </div>
        </div>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="w-full overflow-hidden shadow-lg">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Profile not found. Please add your profile information.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full overflow-hidden shadow-lg">
      <div className="md:flex">
        <div className="md:w-1/3 relative">
          <Image
            src={profile.image_url || "/placeholder.svg?width=400&height=400&text=Profile"}
            alt={profile.name}
            width={400}
            height={400}
            className="object-cover w-full h-64 md:h-full"
          />
        </div>
        <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{profile.name}</CardTitle>
            <CardDescription className="text-lg text-muted-foreground">{profile.title}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-base text-foreground mb-6">{profile.bio}</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <GetIcon name="Mail" className="h-4 w-4 mr-2 text-primary" />
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
              </div>
              {profile.phone && (
                <div className="flex items-center">
                  <GetIcon name="Phone" className="h-4 w-4 mr-2 text-primary" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center">
                  <GetIcon name="MapPin" className="h-4 w-4 mr-2 text-primary" />
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  )
}
