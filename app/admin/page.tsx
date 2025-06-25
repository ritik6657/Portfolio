import { AdminDashboard } from "@/components/admin/admin-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Portfolio",
  description: "Admin dashboard for managing portfolio content and user interactions.",
}

export default function AdminPage() {
  return <AdminDashboard />
}
