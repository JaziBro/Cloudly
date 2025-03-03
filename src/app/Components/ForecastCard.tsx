import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Cloud, Sun, CloudRain } from "lucide-react"

interface ForecastDay {
  date: string
  temperature: number
  condition: string
}

interface ForecastCardProps {
  forecast: ForecastDay[]
  unit: "celsius" | "fahrenheit"
}

export function ForecastCard({ forecast, unit }: ForecastCardProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Cloud className="h-8 w-8 text-blue-500" />
    }
  }

  const formatTemperature = (temp: number) => {
    if (unit === "fahrenheit") {
      return `${Math.round((temp * 9) / 5 + 32)}°F`
    }
    return `${temp}°C`
  }

  return (
    <Card className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full gap-4">
          {forecast.map((day) => (
            <div
              key={day.date}
              className="flex-none w-[150px] bg-white/50 dark:bg-gray-700/50 rounded-xl p-4 flex flex-col items-center gap-2"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">{day.date}</span>
              {getWeatherIcon(day.condition)}
              <span className="font-medium">{formatTemperature(day.temperature)}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{day.condition}</span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  )
}

