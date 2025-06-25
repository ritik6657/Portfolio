import type { LucideProps } from "lucide-react"
import type React from "react"
import {
  Briefcase,
  Code,
  DatabaseZap,
  Building,
  Globe,
  Server,
  Palette,
  Users,
  Settings,
  Zap,
  Brain,
  MessageSquare,
  ClipboardCheck,
  Bus,
  BedDouble,
  GraduationCap,
  Lightbulb,
  Smartphone,
  Cpu,
  Network,
  Bot,
  FileCode,
  CuboidIcon as Cube,
  Film,
  MessageCircle,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
} from "lucide-react"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

// Define interfaces for our data structures
export interface Technology {
  name: string
  iconName: string // Lucide icon name or a key for a custom SVG
}

export interface ExperienceItem {
  id: string
  title: string
  company: string
  logoUrl: string // URL to company logo or placeholder
  description: string
  duration: string
  technologies?: Technology[]
  roleIconName: string // Icon for the role/item itself
}

// Icon component map
const iconComponents: Record<string, React.FC<LucideProps>> = {
  Briefcase,
  Code,
  DatabaseZap,
  Building,
  Globe,
  Server,
  Palette,
  Users,
  Settings,
  Zap,
  Brain,
  MessageSquare,
  ClipboardCheck,
  Bus,
  BedDouble,
  GraduationCap,
  Lightbulb,
  Smartphone,
  Cpu,
  Network,
  Bot,
  FileCode,
  Cube,
  Film,
  MessageCircle,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  // Tech specific (can be improved with actual SVGs or more specific Lucide icons if desired)
  Nextjs: Code,
  Supabase: DatabaseZap,
  React: Code,
  NodeJs: Code,
  Python: Code,
  MongoDB: DatabaseZap,
  MySQL: DatabaseZap,
  Firebase: DatabaseZap,
  Stripe: Code,
  Sanity: Code,
  OpenAI: Brain,
  TailwindCSS: Palette,
  Cpp: FileCode,
  Android: Smartphone,
  Blender: Cube,
  AfterEffects: Film,
  // Default
  Default: Code,
}

export const GetIcon = ({ name, ...props }: { name: string } & LucideProps): JSX.Element => {
  const IconComponent = iconComponents[name] || iconComponents["Default"]
  return <IconComponent {...props} />
}

// Experience Data based on resume
export const experienceData: ExperienceItem[] = [
  {
    id: "acropolis-dev",
    title: "Project Developer (Institutional)",
    company: "Acropolis Institute of Technology and Research",
    logoUrl: "/placeholder.svg?width=50&height=50&text=AITR", // Placeholder logo
    description:
      "Developed diverse projects for institutional management and infrastructure. Currently leading the development of a web application for streamlined attendance tracking and marking, tailored to lecturers' requirements. Previously worked on a bus management app and a hostel booking app.",
    duration: "Ongoing",
    technologies: [
      { name: "Web Apps", iconName: "Globe" },
      { name: "Full-Stack Dev", iconName: "Server" },
      { name: "Project Management", iconName: "ClipboardCheck" },
    ],
    roleIconName: "Building",
  },
  {
    id: "oeeez-online",
    title: "Lead Developer & Founder",
    company: "oeeez.online",
    logoUrl: "/placeholder.svg?width=50&height=50&text=O", // Placeholder logo
    description:
      "Conceptualized and developed oeeez.online, a real-time chat platform. Engineered the application using Next.js for the frontend and Supabase for backend services, focusing on creating a seamless social communication experience.",
    duration: "Recent Project", // Resume says "developed"
    technologies: [
      { name: "Next.js", iconName: "Nextjs" },
      { name: "Supabase", iconName: "Supabase" },
      { name: "React", iconName: "React" },
      { name: "Real-time", iconName: "Zap" },
    ],
    roleIconName: "Globe",
  },
  {
    id: "beiyo-intern",
    title: "Full-Stack Intern",
    company: "beiyo.com",
    logoUrl: "/placeholder.svg?width=50&height=50&text=B", // Placeholder logo
    description:
      "Contributed to application development for the startup. Gained hands-on experience in a fast-paced environment, working on various aspects of the development lifecycle. (Specific tech used: Node.js, React.js, MongoDB, MySQL, Python - as per skills summary).",
    duration: "Previous Role", // Resume says "hired by the startup"
    technologies: [
      { name: "Node.js", iconName: "NodeJs" },
      { name: "React.js", iconName: "React" },
      { name: "MongoDB", iconName: "MongoDB" },
      { name: "MySQL", iconName: "MySQL" },
      { name: "Python", iconName: "Python" },
    ],
    roleIconName: "Briefcase",
  },
  {
    id: "llm-expert",
    title: "LLM & Distributed Systems Specialist",
    company: "Personal Expertise & Projects",
    logoUrl: "/placeholder.svg?width=50&height=50&text=AI",
    description:
      "Focused on custom training and deployment of Large Language Models (LLMs). Explored and implemented distributed systems and peer-to-peer compute solutions. Specialized in C++ for game engine customization and real-time memory inspection on Android for app/game analysis.",
    duration: "Ongoing Specialization",
    technologies: [
      { name: "LLMs", iconName: "Brain" },
      { name: "Distributed Systems", iconName: "Network" },
      { name: "C++", iconName: "Cpp" },
      { name: "Android", iconName: "Android" },
      { name: "Python", iconName: "Python" },
    ],
    roleIconName: "Cpu",
  },
]
