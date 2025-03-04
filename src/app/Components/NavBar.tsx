"use client"

import { Cloud, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function NavBar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full py-4 px-6 backdrop-blur-sm fixed top-0 z-50">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          <span className="font-bold text-xl text-gray-800 dark:text-gray-200">WeatherNow</span>
        </div>
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

