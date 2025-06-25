import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface LoadingSkeletonProps {
  lines?: number
  showHeader?: boolean
  className?: string
}

export function LoadingSkeleton({ lines = 3, showHeader = true, className = "" }: LoadingSkeletonProps) {
  return (
    <Card className={`shadow-md ${className}`}>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-muted animate-pulse rounded" />
            <div className="h-6 bg-muted animate-pulse rounded w-32" />
          </div>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-2">
          {[...Array(lines)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-muted animate-pulse rounded" />
              <div className="h-4 bg-muted animate-pulse rounded flex-1" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
