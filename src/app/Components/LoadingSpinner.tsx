import { Cloud } from "lucide-react"
import { Card } from "@/components/ui/card"

export function LoadingSpinner() {
  return (
    <Card className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 flex flex-col items-center gap-4">
      <Cloud className="h-12 w-12 text-blue-500 animate-bounce" />
      <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
    </Card>
  )
}

