"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getPendingReviews, approveReview, deleteReview } from "@/lib/database/queries"
import type { Database } from "@/lib/supabase/types"
import { Eye, Check, X, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Review = Database["public"]["Tables"]["reviews"]["Row"]

export function ReviewsTable() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const data = await getPendingReviews()
      setReviews(data)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      const success = await approveReview(id)
      if (success) {
        setReviews((prev) => prev.filter((review) => review.id !== id))
        toast({
          title: "Review approved",
          description: "The review has been approved and is now live.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to approve review.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve review.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteReview(id)
      if (success) {
        setReviews((prev) => prev.filter((review) => review.id !== id))
        toast({
          title: "Review deleted",
          description: "The review has been permanently deleted.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete review.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete review.",
        variant: "destructive",
      })
    }
  }

  const renderStars = (rating: number | null) => {
    if (!rating) return null
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </TableCell>
                <TableCell>
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No pending reviews found.
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.name}</TableCell>
                <TableCell>
                  {review.role}
                  {review.company && ` at ${review.company}`}
                </TableCell>
                <TableCell>{renderStars(review.rating)}</TableCell>
                <TableCell>{format(new Date(review.created_at), "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedReview(review)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review from {selectedReview?.name}</DialogTitle>
                          <DialogDescription>
                            {selectedReview?.role}
                            {selectedReview?.company && ` at ${selectedReview.company}`} •
                            {selectedReview && format(new Date(selectedReview.created_at), "MMM dd, yyyy")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {selectedReview?.rating && (
                            <div>
                              <h4 className="font-semibold mb-2">Rating:</h4>
                              {renderStars(selectedReview.rating)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold mb-2">Review:</h4>
                            <p className="text-sm whitespace-pre-wrap">{selectedReview?.content}</p>
                          </div>
                          <div className="flex space-x-2 pt-4">
                            <Button
                              onClick={() => selectedReview && handleApprove(selectedReview.id)}
                              className="flex items-center"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => selectedReview && handleDelete(selectedReview.id)}
                              className="flex items-center"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" onClick={() => handleApprove(review.id)} className="flex items-center">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(review.id)}
                      className="flex items-center"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
