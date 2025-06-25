import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface LoadingCardProps {
  showImage?: boolean
  showHeader?: boolean
  lines?: number
  className?: string
}

export function LoadingCard({ showImage = false, showHeader = true, lines = 3, className = "" }: LoadingCardProps) {
  return (
    <Card className={`h-full ${className}`}>
      {showImage && <div className="w-full h-48 bg-muted animate-pulse" />}
      {showHeader && (
        <CardHeader>
          <div className="space-y-2">
            <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </CardHeader>
      )}
      <CardContent className={showHeader ? "pt-0" : "pt-6"}>
        <div className="space-y-2">
          {[...Array(lines)].map((_, i) => (
            <div key={i} className={`h-4 bg-muted animate-pulse rounded ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
