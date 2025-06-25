"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  Home,
  User,
  FolderOpen,
  Briefcase,
  Mail,
  Search,
  Palette,
  Moon,
  Sun,
  Github,
  Linkedin,
  Coffee,
  Heart,
  Zap,
} from "lucide-react"
import { useTheme } from "next-themes"

interface CommandPaletteProps {
  trigger?: React.ReactNode
}

export function CommandPalette({ trigger }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const navigationItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "About", icon: User, href: "/about" },
    { name: "Projects", icon: FolderOpen, href: "/projects" },
    { name: "Experience", icon: Briefcase, href: "/experience" },
    { name: "Contact", icon: Mail, href: "/contact" },
    { name: "Toolbox", icon: Zap, href: "/toolbox" },
    { name: "Education", icon: User, href: "/education" },
    { name: "Certifications", icon: User, href: "/certifications" },
    { name: "Testimonials", icon: Heart, href: "/testimonials" },
  ]

  const themeItems = [
    { name: "Light Mode", icon: Sun, action: () => setTheme("light") },
    { name: "Dark Mode", icon: Moon, action: () => setTheme("dark") },
    { name: "System Theme", icon: Palette, action: () => setTheme("system") },
  ]

  const socialItems = [
    { name: "GitHub Profile", icon: Github, action: () => window.open("https://github.com", "_blank") },
    { name: "LinkedIn Profile", icon: Linkedin, action: () => window.open("https://linkedin.com", "_blank") },
  ]

  const easterEggs = [
    {
      name: "Hire Me! 🚀",
      icon: Coffee,
      action: () => {
        router.push("/contact")
        setTimeout(() => {
          const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement
          if (nameInput) {
            nameInput.focus()
            nameInput.value = "I found the easter egg! "
          }
        }, 500)
      },
    },
    {
      name: "Show Some Love ❤️",
      icon: Heart,
      action: () => {
        // Create floating hearts animation
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            const heart = document.createElement("div")
            heart.innerHTML = "❤️"
            heart.style.position = "fixed"
            heart.style.left = Math.random() * window.innerWidth + "px"
            heart.style.top = window.innerHeight + "px"
            heart.style.fontSize = "2rem"
            heart.style.zIndex = "9999"
            heart.style.pointerEvents = "none"
            heart.style.transition = "all 3s ease-out"
            document.body.appendChild(heart)

            setTimeout(() => {
              heart.style.top = "-100px"
              heart.style.opacity = "0"
            }, 100)

            setTimeout(() => {
              document.body.removeChild(heart)
            }, 3100)
          }, i * 200)
        }
      },
    },
  ]

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Search or jump to...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      )}

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {navigationItems.map((item) => (
              <CommandItem key={item.href} onSelect={() => runCommand(() => router.push(item.href))}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            {themeItems.map((item) => (
              <CommandItem key={item.name} onSelect={() => runCommand(item.action)}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
                {((item.name === "Light Mode" && theme === "light") ||
                  (item.name === "Dark Mode" && theme === "dark") ||
                  (item.name === "System Theme" && theme === "system")) && (
                  <span className="ml-auto text-xs text-muted-foreground">Active</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Social">
            {socialItems.map((item) => (
              <CommandItem key={item.name} onSelect={() => runCommand(item.action)}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Easter Eggs 🥚">
            {easterEggs.map((item) => (
              <CommandItem key={item.name} onSelect={() => runCommand(item.action)}>
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
