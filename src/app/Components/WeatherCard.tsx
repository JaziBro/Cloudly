import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  CloudSnow,
  CloudFog,
  CloudLightning,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherCardProps {
  weather: {
    city: string
    country: string
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    sunrise: string
    sunset: string
    feelsLike: number
  }
  unit: "celsius" | "fahrenheit"
}

export function WeatherCard({ weather, unit }: WeatherCardProps) {
  const getWeatherIcon = () => {
    switch (weather.condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-16 w-16 text-yellow-500" />
      case "cloudy":
      case "clouds":
        return <Cloud className="h-16 w-16 text-gray-500" />
      case "rainy":
      case "rain":
        return <CloudRain className="h-16 w-16 text-blue-500" />
      case "snow":
        return <CloudSnow className="h-16 w-16 text-blue-200" />
      case "fog":
      case "mist":
        return <CloudFog className="h-16 w-16 text-gray-400" />
      case "thunderstorm":
        return <CloudLightning className="h-16 w-16 text-purple-500" />
      default:
        return <Cloud className="h-16 w-16 text-blue-500" />
    }
  }

  const formatTemperature = (temp: number) => {
    if (unit === "fahrenheit") {
      return `${Math.round((temp * 9) / 5 + 32)}°F`
    }
    return `${Math.round(temp)}°C`
  }

  return (
    <Card className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow mt-10">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          <span>
            {weather.city}, {weather.country}
          </span>
          <div className="text-5xl font-bold">{formatTemperature(weather.temperature)}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon()}
              <span className="text-xl">{weather.condition}</span>
            </div>
            <span className="text-gray-600 dark:text-gray-400">Feels like {formatTemperature(weather.feelsLike)}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-xl flex flex-col items-center gap-2">
              <Wind className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</span>
              <span className="font-medium">{weather.windSpeed} km/h</span>
            </div>
            <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-xl flex flex-col items-center gap-2">
              <Droplets className="h-6 w-6 text-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Humidity</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-xl flex flex-col items-center gap-2">
              <Sunrise className="h-6 w-6 text-orange-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sunrise</span>
              <span className="font-medium">{weather.sunrise}</span>
            </div>
            <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-xl flex flex-col items-center gap-2">
              <Sunset className="h-6 w-6 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Sunset</span>
              <span className="font-medium">{weather.sunset}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

