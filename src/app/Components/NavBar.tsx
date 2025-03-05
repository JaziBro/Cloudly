"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from "next/image"

export function NavBar() {
  const { theme, setTheme } = useTheme()

  const lightLogo = "/light-logo.png" // Replace with your actual light mode logo path
  const darkLogo = "/dark-logo.png" // Replace with your actual dark mode logo path

  return (
    <header className="w-full py-2 px-6 fixed backdrop-blur-sm top-0 z-50">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        {/* Placeholder for logo - switches based on theme */}
        <div className="">
          <Image
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Site Logo"
            className="object-contain"
            width={100}
            height={100}
          />
        </div>

        {/* Theme toggle button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
