"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getFeedback } from "@/lib/database/queries"
import type { Database } from "@/lib/supabase/types"
import { Eye, Search, AlertTriangle, MessageCircle, Lightbulb } from "lucide-react"

type Feedback = Database["public"]["Tables"]["feedback"]["Row"]

export function FeedbackTable() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)

  useEffect(() => {
    fetchFeedback()
  }, [])

  useEffect(() => {
    const filtered = feedback.filter(
      (item) =>
        (item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (item.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredFeedback(filtered)
  }, [feedback, searchTerm])

  const fetchFeedback = async () => {
    try {
      const data = await getFeedback()
      setFeedback(data)
    } catch (error) {
      console.error("Error fetching feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "feedback":
        return (
          <Badge variant="default">
            <MessageCircle className="h-3 w-3 mr-1" />
            Feedback
          </Badge>
        )
      case "complaint":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Complaint
          </Badge>
        )
      case "suggestion":
        return (
          <Badge variant="secondary">
            <Lightbulb className="h-3 w-3 mr-1" />
            Suggestion
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "normal":
        return <Badge variant="secondary">Normal</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4" />
          <Input placeholder="Search feedback..." className="max-w-sm" disabled />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>
                    <div className="h-4 bg-muted animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4" />
        <Input
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeedback.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No feedback found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFeedback.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{getTypeBadge(item.type || "feedback")}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.subject || "No subject"}</TableCell>
                  <TableCell>{getPriorityBadge(item.priority || "normal")}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.status || "open"}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(item.created_at), "MMM dd, yyyy")}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedFeedback(item)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedFeedback?.type === "complaint"
                              ? "Complaint"
                              : selectedFeedback?.type === "suggestion"
                                ? "Suggestion"
                                : "Feedback"}
                          </DialogTitle>
                          <DialogDescription>
                            {selectedFeedback?.name &&
                              selectedFeedback?.email &&
                              `${selectedFeedback.name} (${selectedFeedback.email}) • `}
                            {selectedFeedback &&
                              format(new Date(selectedFeedback.created_at), "MMM dd, yyyy 'at' HH:mm")}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {selectedFeedback?.subject && (
                            <div>
                              <h4 className="font-semibold mb-2">Subject:</h4>
                              <p className="text-sm">{selectedFeedback.subject}</p>
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold mb-2">Content:</h4>
                            <p className="text-sm whitespace-pre-wrap">{selectedFeedback?.content}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div>
                              <span className="text-sm font-medium">Priority: </span>
                              {selectedFeedback && getPriorityBadge(selectedFeedback.priority || "normal")}
                            </div>
                            <div>
                              <span className="text-sm font-medium">Status: </span>
                              <Badge variant="outline">{selectedFeedback?.status || "open"}</Badge>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
