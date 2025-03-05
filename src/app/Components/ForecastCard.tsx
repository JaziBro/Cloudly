"use client"

import type React from "react"
import { useState, useEffect, type Key } from "react"
import axios from "axios"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, CloudSnow, CloudFog, CloudLightning, Loader2 } from "lucide-react"

interface ForecastDay {
  id: Key | null | undefined
  date: string
  temperature: number
  condition: string
}

interface ForecastCardProps {
  city: string
  unit: "celsius" | "fahrenheit"
}

const ForecastCard: React.FC<ForecastCardProps> = ({ city, unit }) => {
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return

      setLoading(true)
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        const response = await axios.get(url)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = response.data.list.slice(0, 5).map((item: any, index: number) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(),
          temperature: item.main.temp,
          condition: item.weather[0].main,
          id: `${item.dt}-${index}`, // Unique key by combining timestamp and index
        }))

        setForecast(data)
      } catch (error) {
        console.error("Error fetching forecast data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [city])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="h-10 w-10 text-yellow-500 animate-pulse" />
      case "clouds":
        return <Cloud className="h-10 w-10 text-gray-500" />
      case "rain":
        return <CloudRain className="h-10 w-10 text-blue-500" />
      case "snow":
        return <CloudSnow className="h-10 w-10 text-blue-200" />
      case "fog":
      case "mist":
        return <CloudFog className="h-10 w-10 text-gray-400" />
      case "thunderstorm":
        return <CloudLightning className="h-10 w-10 text-purple-500" />
      default:
        return <Cloud className="h-10 w-10 text-blue-500" />
    }
  }

  const formatTemperature = (temp: number) => {
    if (unit === "fahrenheit") {
      return `${Math.round((temp * 9) / 5 + 32)}°F`
    }
    return `${Math.round(temp)}°C`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <Card className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg border-0 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">5-Day Forecast for {city}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading forecast...</span>
          </div>
        ) : (
          <ScrollArea className="w-full pb-4">
            <div className="flex w-full gap-4 py-2">
              {forecast.map((day) => (
                <div
                  key={day.id}
                  className="flex-none w-[160px] bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-5 
                  flex flex-col items-center gap-3 shadow-md hover:shadow-lg transition-all duration-300 
                  hover:translate-y-[-2px] border border-white/20 dark:border-gray-600/20"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatDate(day.date)}</span>
                  <div className="p-2 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                    {getWeatherIcon(day.condition)}
                  </div>
                  <span className="text-2xl font-bold text-gray-800 dark:text-white">
                    {formatTemperature(day.temperature)}
                  </span>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                    {day.condition}
                  </span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="h-2" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

export default ForecastCard

